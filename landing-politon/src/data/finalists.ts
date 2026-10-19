export type FinalistMedia = {
  src: string
  alt?: string
  poster?: string
  title: string
}

/* Video de YouTube: sirve cualquier link (watch, youtu.be, shorts) */
export type FinalistVideo = {
  youtube: string
  title: string
}

export type Finalist = {
  slug: string
  name: string
  number: string
  summary: string
  product: string
  demo: FinalistVideo | null
  promos: FinalistVideo[]
  photos: FinalistMedia[]
  /* Informe final del proyecto (por ahora todos apuntan al PDF demo) */
  pdf: string
  /* Descarga del APK de la app, o null mientras no esté publicado */
  apk: string | null
}

/* Placeholder hasta tener los videos de cada equipo */
const DEMO_VIDEO = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'

// El contenido de los proyectos y sus archivos se completa acá. Los textos
// actuales indican qué falta, sin atribuirles ideas o productos no confirmados.
export const finalists: Finalist[] = [
  {
    slug: 'ecosmart', name: 'EcoSmart', number: '01',
    summary: 'El equipo EcoSmart va a contar acá qué problema eligió abordar, a quién afecta y por qué importa resolverlo.',
    product: 'Acá EcoSmart va a mostrar cómo convirtió su idea inicial en una propuesta concreta y qué aprendió durante el proceso.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/informe-demo.pdf', apk: null,
  },
  {
    slug: 'mindfirst', name: 'MindFirst', number: '02',
    summary: 'El equipo MindFirst va a presentar acá el desafío que investigó, su contexto y la oportunidad que encontró.',
    product: 'Acá MindFirst va a contar el recorrido desde los primeros bocetos hasta el producto que llegó a la final.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/informe-demo.pdf', apk: null,
  },
  {
    slug: 'nolonormalices', name: '#NoLoNormalices', number: '03',
    summary: 'El equipo #NoLoNormalices va a explicar acá qué situación decidió cuestionar y cuál es el foco de su proyecto.',
    product: 'Acá #NoLoNormalices va a mostrar las decisiones, pruebas y cambios que transformaron su idea en producto.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/informe-demo.pdf', apk: null,
  },
  {
    slug: 'bloqia', name: 'BloqIA', number: '04',
    summary: 'El equipo BloqIA va a describir acá el problema que trabajó y la solución que propone.',
    product: 'Acá BloqIA va a contar cómo desarrolló su propuesta, qué validó y cómo funciona el resultado.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/informe-demo.pdf', apk: null,
  },
  {
    slug: 'desconectados', name: '(des)conectado', number: '05',
    summary: 'El equipo (des)conectado va a compartir acá su mirada sobre el desafío elegido y las personas a las que busca llegar.',
    product: 'Acá (des)conectado va a recorrer las etapas que llevaron de la primera idea a su producto final.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/informe-demo.pdf', apk: null,
  },
  {
    slug: 'salimos', name: 'salimos', number: '06',
    summary: 'El equipo salimos va a presentar acá el problema real que lo impulsó y el objetivo de su propuesta.',
    product: 'Acá salimos va a mostrar su proceso de creación, las pruebas realizadas y el producto que presenta en la final.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
      { youtube: DEMO_VIDEO, title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/informe-demo.pdf', apk: null,
  },
]
