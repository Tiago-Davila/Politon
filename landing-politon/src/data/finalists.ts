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
  /* Portada del hover y del caso; casi todas son horizontales */
  cover: { src: string; portrait?: boolean }
  /* Informe final del proyecto (por ahora todos apuntan al PDF demo) */
  pdf: string
  /* Link de la app o página del proyecto, o null mientras no esté publicado */
  apk: string | null
  /* 'apk' = descarga de archivo, 'pagina' = visita a sitio web (sin download) */
  linkType: 'apk' | 'pagina'
}

/* Placeholder hasta tener los videos de cada equipo */
const DEMO_VIDEO = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'

// El contenido de los proyectos y sus archivos se completa acá. Los textos
// actuales indican qué falta, sin atribuirles ideas o productos no confirmados.
export const finalists: Finalist[] = [
  {
    slug: 'ecosmart', name: 'EcoSmart', number: '01',
    summary: 'Identificamos el problema de la contaminación diaria, que nos afecta a todos pero que decidimos abordar pensando en adolescentes y estudiantes, a partir de nuestra propia experiencia. Diseñamos EcoSmart, una aplicación móvil que incentiva el cuidado del medio ambiente con acciones como caminar, reciclar y reutilizar: verifica cada acción con los sensores del celular o con fotos tomadas en el momento, otorga puntos y permite canjearlos por recompensas, además de ofrecer información ambiental y un seguimiento del progreso. Lo que nos distingue es que combina tecnología, sensores e inteligencia artificial con un sistema de puntos y premios que motiva a incorporar hábitos sustentables en la vida diaria.',
    product: 'Al principio pensamos en crear un dispositivo para ayudar a cuidar el medio ambiente, pero vimos que una aplicación era más práctica y podía llegar a más personas. También habíamos pensado en una versión Kids, pero la dejamos afuera para enfocarnos en personas de 16 años en adelante, ya que las recompensas, como descuentos y promociones, podían resultarles más útiles. Fuimos sumando funciones según lo que considerábamos más valioso para cumplir el objetivo: una parte informativa para concientizar sobre el cuidado del ambiente, una inteligencia artificial para responder las dudas de los usuarios (el apartado está presente, pero la IA todavía no está incorporada en su totalidad) y un mapa para encontrar puntos verdes donde reciclar y desechar residuos.\n\nCreemos que el sistema de puntos y recompensas es la parte que mejor responde al problema original. Muchas veces las personas saben que deberían cuidar más el planeta, pero les cuesta llevarlo a la práctica; por eso, ofrecer puntos, descuentos y promociones les da un incentivo concreto para incorporar estos hábitos a su vida cotidiana.',
    demo: { youtube: 'https://youtube.com/shorts/5ncNUnp5eSI?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/FBN5INpaWrk?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/fbpHYMmTdKI?feature=share', title: 'Reel promocional' },
    ],
    cover: { src: '/equipos/ecosmart.webp' },
    photos: [], pdf: '/informes/Informe-EcoSmart.pdf', apk: 'https://politecnicomodelo-my.sharepoint.com/:u:/g/personal/martin_barbieri_ipm_edu_ar/IQCTT95_yHf8SIn0m38YjE3EATD0Jn49mz-ocgLgfUI6mks?e=0PEGm8', linkType: 'apk',
  },
  {
    slug: 'mindfirst', name: 'MindFirst', number: '02',
    summary: 'Identificamos que cada vez más gente delega sus tareas en la inteligencia artificial y se vuelve dependiente de ella, sobre todo los jóvenes estudiantes, que piensan menos por sí mismos al usarla para resolver sus trabajos. Nuestra solución es una herramienta que te obliga a involucrarte: participás en la planificación, respondés preguntas y armás borradores en conjunto con la IA, así entendés qué entregás y cómo se hizo. Se diferencia de las IA convencionales porque no te da la respuesta tan fácilmente: no busca prohibir su uso, sino aprovecharla mejor sin perder autonomía ni dejar de estimular el cerebro.',
    product: 'Cuando arrancamos en la Politón, la idea era mucho más grande que la actual. Además de la herramienta que hace participar al usuario, pensamos una sección de premios y recompensas para motivar su uso y una sección de entrenamiento, con modelos y planes de trabajo con IA que nos parecían buenos. Ni se nos había cruzado que la herramienta pudiera entregar el resultado en un PDF u otro tipo de archivo.\n\nDespués de la Politón nos reunimos de nuevo y ese encuentro fue el momento clave: repasamos todo lo hecho y debatimos cosa por cosa cuáles eran necesarias y tenían sentido para el problema. Así definimos el MVP, una primera versión simple pero que funcione de verdad. Sacamos del todo los premios y el entrenamiento, porque complicaban el producto y nos desviaban de lo importante: que la persona piense y participe. Sumamos el manejo de PDFs y archivos en las dos direcciones: el usuario carga su material (una consigna, un apunte) y la IA trabaja sobre eso, y al terminar puede llevarse el trabajo en ese formato, listo para entregar.\n\nHoy la página ya está desplegada y funcionando, con una sección de chats donde el usuario resuelve sus problemas con la IA y un apartado de analytics para ver cómo avanza. Es una primera versión que puede seguir mejorando. Lo que mejor responde al problema es que conserva el corazón de la idea: la IA no te resuelve todo, tenés que poner algo de tu parte. Sigue siendo una ayuda real, pero no reemplaza tu cabeza, así que la podés usar sin volverte dependiente.',
    demo: { youtube: DEMO_VIDEO, title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/rdBqDSyheCI?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/C3dV93ZghWk?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/y5WAOrL0TsQ?feature=share', title: 'Reel promocional' },

    ],
    cover: { src: '/equipos/MindFirst.webp' },
    photos: [], pdf: '/informes/Informe-MindFirst.pdf', apk: 'https://mindfirst.policloudservices.ipm.edu.ar/', linkType: 'pagina',
  },
  {
    slug: 'nolonormalices', name: '#NoLoNormalices', number: '03',
    summary: 'Identificamos que muchos adolescentes y las redes sociales normalizan ciertas actitudes sin reconocer cómo pueden afectar emocionalmente a las personas. Creamos la campaña #NoLoNormalices para redes sociales, que busca informar, generar conciencia tanto en quienes las ejercen como en quienes las viven, y cuestionar estas actitudes: con ella se pueden reconocer sus señales, reflexionar, aprender a poner límites y compartir la propia experiencia. Combinamos publicaciones informativas con videos que representan situaciones cotidianas y permiten identificarse, y hablamos desde nuestra experiencia como adolescentes y desde las historias que las personas nos mandan.',
    product: 'Al principio, la idea era principalmente informar a los adolescentes sobre actitudes poco empáticas en las redes sociales. Después decidimos que era buena idea que pudieran identificarse con nuestros videos, y ese fue el giro que dio forma al resto del proyecto.\n\nA partir de ahí pensamos cómo iba a ser la campaña y su contenido: publicaciones informativas y videos virales (chats, trends de redes sociales) sobre distintos temas, como Ghosting, Love Bombing, Breadcrumbing, Benching y Hate. También definimos en qué redes subiríamos el contenido y, por último, ideamos flyers para promocionar la campaña y una página web.\n\nCreemos que los videos virales son la parte que mejor responde al problema, porque muestran ejemplos específicos con los que los adolescentes pueden identificarse y ayudan a reconocer señales que quizás vivieron y que muchas veces se normalizan sin cuestionarlas.',
    demo: { youtube: 'https://youtu.be/sN2tUU4By5s', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/1lFqA8A5AOg?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/-9IHXzCgIKA?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/rx6VRW6x6qk?feature=share', title: 'Reel promocional' },
    ],
    cover: { src: '/equipos/nolonormalices.webp', portrait: true },
    photos: [], pdf: '/informes/Informe-NoLoNormalices.pdf', apk: 'https://www.instagram.com/nolonormalices.ipm', linkType: 'pagina',
  },
  {
    slug: 'bloqia', name: 'BloqIA', number: '04',
    summary: 'En la Politón identificamos un problema relacionado con el mal uso de la inteligencia artificial: la dependencia que puede generar y que hace perder autonomía al tomar decisiones en la vida cotidiana. Creamos BloqIA, una aplicación con su propia IA que identifica y limita las preguntas personales, como "¿Me queda mejor la remera rosa o la blanca?" o "¿Qué le respondo a esta persona?". Funciona como cualquier otra IA, pero en lugar de responder esas preguntas busca estimular al usuario a encontrar sus propias respuestas, y además tiene límites de uso para fomentar una relación más equilibrada con la tecnología.',
    product: 'De todas las problemáticas planteadas, la que más nos llamó la atención fue la dependencia de la IA y la pérdida del factor humano. Pensamos que una buena solución sería ayudar a reconocer esa dependencia y fomentar que cada persona resuelva ciertas situaciones por sus propios medios, con limitaciones de tiempo, de cantidad de preguntas y bloqueos. Al principio imaginamos un recordatorio visual tipo semáforo (verde al abrir la app, amarillo con el paso del tiempo y rojo al acercarse al límite) y un tope de tres repeticiones de la misma pregunta para evitar rutinas de dependencia.\n\nMás adelante cambiamos el enfoque y nos centramos en restringir las preguntas personales: mantuvimos un límite de tres, pero la IA no las responde, sino que orienta al usuario a buscar la solución por otros medios (ante un dolor de cabeza, por ejemplo, le indica que consulte a un profesional de la salud). Al llegar a la tercera, la app se bloquea 24 horas. Sumamos también un límite de tres horas de uso diario, incluso para preguntas académicas, con el mismo bloqueo de 24 horas.\n\nEn la fase 2 desarrollamos nuestra propia IA. Incorporamos un inicio de sesión donde el usuario indica a qué se dedica (estudiante, universitario, chef) para contextualizar sus preguntas y clasificarlas mejor. Agregamos además un tercer tipo, la pregunta "personal informativa": la IA sí puede responderla, pero la suma igualmente al contador, y antes de responder le avisa al usuario, que decide si quiere continuar. Así se limita la dependencia sin cerrar el acceso a información útil.\n\nLa característica que mejor responde al problema original es no contestar directamente las preguntas personales, porque incentiva a reflexionar, tomar decisiones propias y buscar soluciones por uno mismo, en lugar de delegarlas en la inteligencia artificial.',
    demo: { youtube: 'https://youtube.com/shorts/BlX0FK0uSJw?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/Qx-hjN7l_pg?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtu.be/ko6X3IEO5w0', title: 'Reel promocional' },
    ],
    cover: { src: '/equipos/bloquia.webp' },
    photos: [], pdf: '/informes/Informe-BloqIA.pdf', apk: 'https://bloqia.policloudservices.ipm.edu.ar/', linkType: 'pagina',
  },
  {
    slug: 'desconectados', name: '(des)conectado', number: '05',
    summary: 'Encontramos que las personas, especialmente los jóvenes, pasan mucho tiempo frente a sus celulares en lugar de conectar con su alrededor y estar presentes. Diseñamos una aplicación que premia la desconexión: la persona se propone desafíos, en solitario o acompañada, para dejar de estar tanto tiempo frente a la pantalla, y a cambio recibe recompensas. Lo particular es que no prohíbe el uso del celular, sino que motiva a elegir desafíos y desconectarse mediante un mecanismo de beneficios, para que los usuarios presten más atención a su entorno.',
    product: 'Los primeros días buscamos una idea sobre las redes sociales y el uso excesivo de la tecnología, y llegamos a la pregunta: "¿Cómo podríamos dejar de basar nuestra vida y relaciones en las redes sociales?". Pensamos en una joven que pierde su capacidad de vincularse por su adicción a las redes y diseñamos una solución para que reconozca su aislamiento. El desafío era ofrecer algo que no resultara hostil ni molesto: no buscamos obligar a dejar el celular, sino que cada persona se lo proponga. Así surgió un sistema de desafíos y recompensas, con notificaciones que motivan a elegir un desafío, puntos al cumplirlo y una tienda para canjearlos por beneficios (descuentos, comida, ropa), con posible sincronización con relojes inteligentes.\n\nEn la fase 2 sumamos ideas como la foto al comienzo y al final del desafío, amistades y ranking, vencimiento de puntos, mapa y avatar, y permisos de monitoreo para detectar si se usa una app de ocio y cancelar el desafío. Quedan para más adelante las fotos, las misiones personalizadas, los amigos y el ranking, y los beneficios por fuera de la app; por ahora no incluimos la sincronización con reloj ni el mapa.\n\nLa parte que mejor responde al problema original es el permiso de monitoreo. Aunque casi no se ve, es fundamental: influye en el comportamiento del usuario, que decide entre seguir con su adicción a la pantalla o cambiar sus hábitos por otros más sanos, aunque sea por los beneficios, y así conectar con su entorno y formar vínculos reales. La app no bloquea el celular ni obliga a nada: quiere que cada persona se proponga el desafío y empiece a depender menos de la pantalla.',
    demo: { youtube: 'https://youtube.com/shorts/DMgND5f4-Qc?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/hiMon3LvyRk?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/Sx1N9PuABwU?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/gltuG5VmmLY?feature=share', title: 'Reel promocional' },

    ],
    cover: { src: '/equipos/desconectado.webp' },
    photos: [], pdf: '/informes/Informe-(DES)CONECTADO.pdf', apk: 'https://politecnicomodelo-my.sharepoint.com/:u:/g/personal/martin_barbieri_ipm_edu_ar/IQDN6TZ6HW7ESrqCq1DAEmGVAXpGVCkTSwrp-8gWnIDAa38?e=CHc8fA', linkType: 'apk',
  },
  {
    slug: 'salimos', name: 'salimos', number: '06',
    summary: 'Durante la Politón aprendimos sobre la Paradoja de la Conexión: tenemos más herramientas que nunca para comunicarnos, pero nos sentimos más aislados. Desarrollamos Salimos, una aplicación de planes para quienes tienen pocos amigos, no conocen a mucha gente o nunca salen con quienes conocen: cualquiera puede crear un plan, unirse a otros, chatear con los miembros antes de la juntada y ver por mapa qué hay cerca. No es un simple "Tinder de amigos": nos enfocamos en la repetición, porque buscamos que la gente forme vínculos reales y duraderos y no que se junte una sola vez.',
    product: 'En la charla sobre Conexiones Digitales del primer día de la Fase 1, nuestra psicopedagoga nos habló de la Paradoja de la Conexión y nos pareció un punto de partida interesante. Entre varias ideas nos inclinamos por una aplicación donde las personas se conozcan y se junten en la vida real. Discutimos si solo la app debía crear las juntadas y decidimos que las hicieran los usuarios.\n\nEn la Fase 2 nos emparejaron con Santiago Ritter, de sexto año de Computación, que construyó las bases y fue desarrollando la app según las entregas de los profesores. Probamos varios enfoques hasta dar con el diseño estilo Apple. Quedó afuera la idea de anfitriones para las juntadas y sumamos mejoras en el perfil, el mapa, el modo Explorar, compartir juntadas y ver con quiénes te juntás antes de conocerlos. Usarla es intuitivo: creás tu cuenta y tu perfil con fotos y nuestro toque de polaroids, encontrás un plan por el mapa, el modo Explorar al estilo reels o el buscador, o creás el tuyo, y te sumás con un clic. Como juntarse con alguien con quien nunca hablaste es incómodo, armamos un chat con preguntas para romper el hielo. Después de la juntada llega la encuesta, nuestra clave para lograr el objetivo: calificás el plan y elegís con quién repetirías.\n\nLa seguridad fue un objetivo desde el principio. Salimos es solo para mayores de 18, y para sumarte a un plan necesitás tener foto, barrio e intereses cargados, así no hay perfiles vacíos.\n\n Con motion graphics hechos con inteligencia artificial explicamos las funciones en nuestro TikTok @BajateSalimos. Estamos muy orgullosos de lo que logramos: muestra el valor que se puede crear cuando todos empujan para un mismo lado y saben resolver sus diferencias por un bien mayor.\n\nLo que más nos acerca a resolver el problema que identificamos es la encuesta post juntada, porque nos ayuda a conseguir esa repetición que puede dar lugar a las amistades reales que buscamos. Al terminar un plan, elegís con quién te gustaría repetir y de ahí se forma un grupo para armar la próxima, y la próxima, y la próxima…',
    demo: { youtube: 'https://youtube.com/shorts/unAoEF4ua2s?feature=share', title: 'Demo del proyecto' },
    promos: [
      { youtube: 'https://youtube.com/shorts/0CNRymGkyWI?feature=share', title: 'Reel primera fase' },
      { youtube: 'https://youtube.com/shorts/I0LuEZfoPpY?feature=share', title: 'Reel promocional' },
      { youtube: 'https://youtube.com/shorts/icNDqOLZMkg?feature=share', title: 'Reel promocional' },

    ],
    cover: { src: '/equipos/salimos.webp' },
    photos: [], pdf: '/informes/Informe-Salimos.pdf', apk: 'https://salimos-ten.vercel.app/login', linkType: 'pagina',
  },
]
