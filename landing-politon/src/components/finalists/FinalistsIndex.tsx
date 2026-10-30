/**
 * FinalistsIndex.tsx — índice editorial de los equipos finalistas
 *
 * Cada fila es un link al proyecto. En desktop, al pasar el mouse la fila se
 * pinta desde el lado por donde entró el cursor, el nombre rueda y una portada
 * flotante sigue al mouse (las portadas se apilan una sobre otra).
 * En touch es una lista simple con miniatura.
 */
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { finalists } from '../../data/finalists'
import TeamCover from './TeamCover'

export type Origin = { top: number; left: number; width: number; height: number }

interface FinalistsIndexProps {
  onOpen: (slug: string, origin: Origin | null, trigger: HTMLElement) => void
}

const RollText: React.FC<{ text: string }> = ({ text }) => {
  const chars = [...text].map((char, i) => (
    <span key={i} style={{ '--i': i } as React.CSSProperties}>{char}</span>
  ))
  return (
    <span className="fin-roll">
      <span className="fin-roll-a">{chars}</span>
      <span className="fin-roll-b" aria-hidden="true">{chars}</span>
    </span>
  )
}

const toOrigin = (r: DOMRect): Origin => ({ top: r.top, left: r.left, width: r.width, height: r.height })

const FinalistsIndex: React.FC<FinalistsIndexProps> = ({ onOpen }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const coverRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeRef = useRef(-1)
  const layerRef = useRef(1)

  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const follow = canHover && !reduced

  /* El CSS esconde los rellenos con translateY(101%); GSAP lo leería en px,
     así que se normaliza a yPercent antes de animarlos */
  useLayoutEffect(() => {
    const fills = listRef.current?.querySelectorAll('.fin-row-fill')
    if (fills) gsap.set(fills, { y: 0, yPercent: 101 })
  }, [])

  /* Entrada: encabezado y filas en cascada, los filetes se dibujan */
  useEffect(() => {
    const section = sectionRef.current
    if (!section || reduced) return

    const ctx = gsap.context(() => {
      gsap.from('.fin-index-head > *', {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: '.fin-index-head', start: 'top 82%', once: true },
      })
      gsap.set('.fin-row', { y: 70, opacity: 0 })
      gsap.set('.fin-row-rule', { scaleX: 0 })
      ScrollTrigger.batch('.fin-row', {
        start: 'top 92%',
        once: true,
        onEnter: (rows) => {
          gsap.to(rows, { y: 0, opacity: 1, duration: 1, stagger: 0.09, ease: 'expo.out', clearProps: 'transform,opacity' })
          gsap.to(rows.map((row) => row.querySelector('.fin-row-rule')), { scaleX: 1, duration: 1.2, stagger: 0.09, ease: 'expo.inOut' })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  /* Portada flotante que sigue al cursor, con inclinación según la velocidad */
  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!follow || !list || !preview) return

    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 })
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.65, ease: 'power3' })
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.65, ease: 'power3' })
    const rTo = gsap.quickTo(preview, 'rotation', { duration: 0.9, ease: 'power3' })
    let lastX = 0
    let settle = 0

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.7))
      lastX = e.clientX
      window.clearTimeout(settle)
      settle = window.setTimeout(() => rTo(0), 90)
    }
    const onEnter = (e: PointerEvent) => {
      gsap.set(preview, { x: e.clientX, y: e.clientY })
      lastX = e.clientX
      gsap.to(preview, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.7)' })
    }
    const onLeave = () => {
      gsap.to(preview, { scale: 0.6, opacity: 0, duration: 0.35, ease: 'power3.in' })
      activeRef.current = -1
    }

    list.addEventListener('pointermove', onMove)
    list.addEventListener('pointerenter', onEnter)
    list.addEventListener('pointerleave', onLeave)
    return () => {
      list.removeEventListener('pointermove', onMove)
      list.removeEventListener('pointerenter', onEnter)
      list.removeEventListener('pointerleave', onLeave)
      window.clearTimeout(settle)
      gsap.killTweensOf(preview)
    }
  }, [follow])

  const showCover = (i: number) => {
    const cover = coverRefs.current[i]
    if (!follow || !cover || activeRef.current === i) return
    activeRef.current = i
    /* La tarjeta se acomoda a la orientación de la portada */
    previewRef.current?.classList.toggle('is-portrait', Boolean(finalists[i].cover.portrait))
    layerRef.current += 1
    gsap.set(cover, { zIndex: layerRef.current })
    gsap.fromTo(cover, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.out' })
    gsap.fromTo(cover.querySelector('.fin-cover-media'), { scale: 1.35 }, { scale: 1, duration: 1, ease: 'expo.out' })
  }

  /* El relleno de la fila entra y sale por el borde más cercano al cursor */
  const paintRow = (e: React.PointerEvent<HTMLAnchorElement>, entering: boolean) => {
    if (!canHover) return
    const row = e.currentTarget
    const rect = row.getBoundingClientRect()
    const fromTop = e.clientY < rect.top + rect.height / 2
    const fill = row.querySelector('.fin-row-fill')
    const duration = reduced ? 0 : 0.5
    if (entering) gsap.fromTo(fill, { yPercent: fromTop ? -101 : 101 }, { yPercent: 0, duration, ease: 'expo.out' })
    else gsap.to(fill, { yPercent: fromTop ? -101 : 101, duration, ease: 'expo.out' })
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string, i: number) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    const preview = previewRef.current
    const fromPreview = follow && preview && activeRef.current === i
    const origin = reduced ? null : toOrigin((fromPreview ? preview : e.currentTarget).getBoundingClientRect())
    if (preview) gsap.to(preview, { opacity: 0, duration: 0.2 })
    activeRef.current = -1
    onOpen(slug, origin, e.currentTarget)
  }

  return (
    <section ref={sectionRef} id="equipos" className="fin-index" aria-labelledby="fin-index-title">
      <div className="fin-index-inner">
        <header className="fin-index-head">
          <p className="fin-overline">✦ CONOCÉ SUS PROYECTOS ✦</p>
          <h2 id="fin-index-title">LOS <span>FINALISTAS</span></h2>
          <p className="fin-index-lead">Elegí un equipo y descubrí el camino que recorrió de la idea al producto.</p>
          <div className="fin-vote-call">¡Votá a cada equipo!</div>
        </header>

        <ul ref={listRef} className="fin-index-list">
          {finalists.map((team, i) => (
            <li key={team.slug}>
              <a
                className={`fin-row fin-tone-${i % 6}`}
                style={{ '--len': [...team.name].length } as React.CSSProperties}
                href={`/equipo/${team.slug}`}
                aria-label={`${team.name}, equipo finalista ${team.number}`}
                onPointerEnter={(e) => { paintRow(e, true); showCover(i) }}
                onPointerLeave={(e) => paintRow(e, false)}
                onClick={(e) => handleClick(e, team.slug, i)}
              >
                <span className="fin-row-fill" aria-hidden="true" />
                <span className="fin-row-rule" aria-hidden="true" />
                <span className="fin-row-num" aria-hidden="true">{team.number}</span>
                <span className="fin-row-name" aria-hidden="true"><RollText text={team.name} /></span>
                <span className="fin-row-thumb" aria-hidden="true"><TeamCover team={team} index={i} size="sm" /></span>
                <span className="fin-row-meta" aria-hidden="true">EQUIPO FINALISTA <ArrowUpRight size={22} strokeWidth={2.5} /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {follow ? (
        <div ref={previewRef} className="fin-preview" aria-hidden="true">
          {finalists.map((team, i) => (
            <div key={team.slug} ref={(el) => { coverRefs.current[i] = el }} className="fin-preview-layer">
              <TeamCover team={team} index={i} />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default FinalistsIndex
