/**
 * api/votos.ts — POLITÓN 2026 (Vercel Function)
 *
 * POST /api/votos  { slug, votante }  → suma un voto. Nunca devuelve totales.
 * GET  /api/votos  con "Authorization: Bearer <VOTOS_ADMIN_TOKEN>" → totales.
 *
 * Los votos viven en Upstash Redis (integración de Vercel Marketplace), así
 * nadie los puede ver desde el navegador. El límite de toques seguidos también
 * se controla acá: el del front es solo para mostrar el aviso.
 */
import { timingSafeEqual } from 'node:crypto'

/* Mismos slugs que src/data/finalists.ts */
const TEAMS = new Set(['ecosmart', 'mindfirst', 'nolonormalices', 'bloqia', 'desconectados', 'salimos'])

const VOTES_KEY = 'politon:votos'

/* Toques seguidos por persona y equipo; la racha se corta tras 5 s sin apretar */
const STREAK_LIMIT = 10
const STREAK_PAUSE_S = 5
/* Tope por IP y equipo cada 5 s: alto porque toda la escuela sale por la misma IP */
const IP_LIMIT = 60
const IP_WINDOW_S = 5

const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
const ADMIN_TOKEN = process.env.VOTOS_ADMIN_TOKEN

type RedisReply = { result?: unknown; error?: string }

/* Varios comandos en una sola llamada a la API REST de Upstash */
async function redis(commands: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    body: JSON.stringify(commands),
  })
  if (!res.ok) throw new Error(`Upstash respondió ${res.status}`)
  const replies = (await res.json()) as RedisReply[]
  return replies.map((r) => {
    if (r.error) throw new Error(r.error)
    return r.result
  })
}

const reply = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

const sameToken = (a: string, b: string) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b))

export async function POST(request: Request) {
  if (!REDIS_URL || !REDIS_TOKEN) return reply(503, { error: 'Votación no configurada' })

  let slug: unknown
  let votante: unknown
  try {
    ;({ slug, votante } = (await request.json()) as { slug?: unknown; votante?: unknown })
  } catch {
    return reply(400, { error: 'JSON inválido' })
  }
  if (typeof slug !== 'string' || !TEAMS.has(slug)) return reply(400, { error: 'Equipo inválido' })
  if (typeof votante !== 'string' || !/^[\w-]{8,64}$/.test(votante)) return reply(400, { error: 'Votante inválido' })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'sin-ip'
  const streakKey = `politon:racha:${slug}:${votante}`
  const ipKey = `politon:ip:${slug}:${ip}`

  try {
    /* La racha se renueva con cada toque (aunque esté frenado): hay que soltar 5 s.
       La ventana por IP es fija: arranca con el primer voto y dura 5 s. */
    const [streak, , ipCount] = (await redis([
      ['INCR', streakKey],
      ['EXPIRE', streakKey, STREAK_PAUSE_S],
      ['INCR', ipKey],
      ['EXPIRE', ipKey, IP_WINDOW_S, 'NX'],
    ])) as number[]

    if (streak > STREAK_LIMIT || ipCount > IP_LIMIT) return reply(429, { error: 'Pará un toque' })

    await redis([['HINCRBY', VOTES_KEY, slug, 1]])
    return reply(204)
  } catch (err) {
    console.error('[votos]', err)
    return reply(502, { error: 'No se pudo registrar el voto' })
  }
}

export async function GET(request: Request) {
  const auth = request.headers.get('authorization') ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!ADMIN_TOKEN || !sameToken(token, ADMIN_TOKEN)) return reply(401, { error: 'No autorizado' })
  if (!REDIS_URL || !REDIS_TOKEN) return reply(503, { error: 'Votación no configurada' })

  try {
    const [flat] = (await redis([['HGETALL', VOTES_KEY]])) as string[][]
    const totals: Record<string, number> = Object.fromEntries([...TEAMS].map((t) => [t, 0]))
    for (let i = 0; i < flat.length; i += 2) totals[flat[i]] = Number(flat[i + 1])
    return reply(200, totals)
  } catch (err) {
    console.error('[votos]', err)
    return reply(502, { error: 'No se pudieron leer los votos' })
  }
}
