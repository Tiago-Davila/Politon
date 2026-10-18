# Sitio de finalistas

La segunda fase está disponible en `/segunda-fase`. La landing original sigue en `/`.
Cuando se agregue el modal en la página principal, su enlace puede apuntar a
`/segunda-fase` (o a `/segunda-fase?equipo=ecosmart` para abrir un equipo).

## Completar los proyectos

Editá `src/data/finalists.ts`. Cada equipo tiene la misma estructura:

- `summary`: texto del resumen del proyecto.
- `product`: texto de «De la idea al producto».
- `demo`: un video o `null`.
- `promos`: uno o varios videos.
- `photos`: una o varias fotos.

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

## Probar localmente

Desde `landing-politon/`: `npm run dev`. Abrí la URL que muestra Vite y sumá
`/segunda-fase` al final.
