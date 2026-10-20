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
    demo: { youtube: 'https://youtube.com/shorts/5ncNUnp5eSI?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/FBN5INpaWrk?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/fbpHYMmTdKI?feature=share', title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/Informe-EcoSmart.pdf', apk: null,
  },
  {
    slug: 'mindfirst', name: 'MindFirst', number: '02',
    summary: 'El equipo MindFirst va a presentar acá el desafío que investigó, su contexto y la oportunidad que encontró.',
    product: 'Acá MindFirst va a contar el recorrido desde los primeros bocetos hasta el producto que llegó a la final.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/rdBqDSyheCI?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/C3dV93ZghWk?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/y5WAOrL0TsQ?feature=share', title: 'Reel promocional' },

    ],
    photos: [], pdf: '/informes/Informe-MindFirst.pdf', apk: 'https://mindfirst.policloudservices.ipm.edu.ar/',
  },
  {
    slug: 'nolonormalices', name: '#NoLoNormalices', number: '03',
    summary: 'El equipo #NoLoNormalices va a explicar acá qué situación decidió cuestionar y cuál es el foco de su proyecto.',
    product: 'Acá #NoLoNormalices va a mostrar las decisiones, pruebas y cambios que transformaron su idea en producto.',
    demo: { youtube: 'https://youtu.be/sN2tUU4By5s', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/1lFqA8A5AOg?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/-9IHXzCgIKA?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/I8eynT5QzJE?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/rx6VRW6x6qk?feature=share', title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/Informe-#NoLoNormalices.pdf', apk: 'https://www.instagram.com/nolonormalices.ipm',
  },
  {
    slug: 'bloqia', name: 'BloqIA', number: '04',
    summary: 'El equipo BloqIA va a describir acá el problema que trabajó y la solución que propone.',
    product: 'Acá BloqIA va a contar cómo desarrolló su propuesta, qué validó y cómo funciona el resultado.',
    demo: { youtube: 'https://youtube.com/shorts/BlX0FK0uSJw?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/Qx-hjN7l_pg?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtu.be/ko6X3IEO5w0', title: 'Reel promocional' },
    ],
    photos: [], pdf: '/informes/Informe-BloqIA.pdf', apk: 'https://bloqia.policloudservices.ipm.edu.ar/',
  },
  {
    slug: 'desconectados', name: '(des)conectado', number: '05',
    summary: 'El equipo (des)conectado va a compartir acá su mirada sobre el desafío elegido y las personas a las que busca llegar.',
    product: 'Acá (des)conectado va a recorrer las etapas que llevaron de la primera idea a su producto final.',
    demo: { youtube: 'https://youtube.com/shorts/DMgND5f4-Qc?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/hiMon3LvyRk?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/Sx1N9PuABwU?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/gltuG5VmmLY?feature=share', title: 'Reel promocional' },

    ],
    photos: [], pdf: '/informes/Informe-(DES)CONECTADO.pdf', apk: null,
  },
  {
    slug: 'salimos', name: 'salimos', number: '06',
    summary: 'El equipo salimos va a presentar acá el problema real que lo impulsó y el objetivo de su propuesta.',
    product: 'Acá salimos va a mostrar su proceso de creación, las pruebas realizadas y el producto que presenta en la final.',
    demo: { youtube: 'https://youtube.com/shorts/unAoEF4ua2s?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/0CNRymGkyWI?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/I0LuEZfoPpY?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/icNDqOLZMkg?feature=share', title: 'Reel promocional' },

    ],
    photos: [], pdf: '/informes/Informe-Salimos.pdf', apk: 'https://salimos-ten.vercel.app/login',
  },
]
