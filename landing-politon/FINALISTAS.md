# Sitio de finalistas

Los finalistas están en la home, en la sección `#equipos` (el sticker
«¡Mirá la fase 2!» del hero lleva ahí). Cada equipo tiene su página en
`/equipo/<slug>`, por ejemplo `/equipo/ecosmart`.
Los links viejos a `/segunda-fase` redirigen a `/#equipos` y
`/segunda-fase?equipo=x` a `/equipo/x`.
El código está en `src/components/finalists/`.

## Completar los proyectos

Editá `src/data/finalists.ts`. Cada equipo tiene la misma estructura:

- `summary`: texto del resumen del proyecto.
- `product`: texto de «De la idea al producto».
- `demo`: un video o `null`.
- `promos`: uno o varios videos.
- `photos`: una o varias fotos.
- `pdf`: ruta al PDF descargable con más información, o `null`.

Guardá los medios en `public/finalistas/<equipo>/` y usá rutas como
`/finalistas/ecosmart/demo.mp4`. Los videos admiten `poster` opcional y las
fotos necesitan `alt` descriptivo. Por ejemplo:

```ts
demo: {
  src: '/finalistas/ecosmart/demo.mp4',
  poster: '/finalistas/ecosmart/demo-portada.jpg',
  title: 'Demo de EcoSmart',
},
promos: [
  { src: '/finalistas/ecosmart/promo-1.mp4', title: 'Presentación de EcoSmart' },
],
photos: [
  { src: '/finalistas/ecosmart/equipo.jpg', title: 'El equipo', alt: 'Integrantes de EcoSmart durante la final' },
],
```

Mientras no se carguen los medios, la página muestra tarjetas de
«Video en preparación» y «Próximamente». Los textos actuales son provisionales:
indican qué información corresponde en cada bloque, sin inventar datos de los
proyectos.

## Subir los PDF

Cada proyecto tiene un botón «Descargar PDF del proyecto». Mientras `pdf` sea
`null`, el botón aparece como «PDF en preparación». Para activarlo, guardá el
archivo en `public/finalistas/<equipo>/` y completá la ruta:

```ts
pdf: '/finalistas/ecosmart/ecosmart.pdf',
```

## Probar localmente

Desde `landing-politon/`: `npm run dev`. Abrí la URL que muestra Vite y abrí la home o
`/equipo/<slug>`.
