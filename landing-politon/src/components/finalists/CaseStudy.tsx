/**
 * CaseStudy.tsx — proyecto de un equipo, a pantalla completa
 *
 * Se abre recortado desde la portada o la fila que se clickeó y se expande
 * hasta cubrir la pantalla. Tiene su propio scroll (Lenis queda en pausa) y
 * "Seguí explorando" pasa al siguiente equipo sin cerrar.
 */
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowRight, Download, FileText, Play, Sparkles, X } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import type { Finalist, FinalistMedia } from '../../data/finalists'
import CircularText from '../ui/CircularText'
import TeamCover from './TeamCover'
import type { Origin } from './FinalistsIndex'

interface CaseStudyProps {
  team: Finalist
  index: number
  next: Finalist
  origin: Origin | null
  closing: boolean
  onClose: () => void
  onExited: () => void
  onNext: () => void
}

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const insetFrom = (r: Origin) =>
  `inset(${r.top}px ${window.innerWidth - r.left - r.width}px ${window.innerHeight - r.top - r.height}px ${r.left}px)`

function VideoCard({ media, label, index }: { media: FinalistMedia | null; label: string; index?: number }) {
  return (
    <article className="fin-media">
      {media ? (
        <video controls preload="none" poster={media.poster} aria-label={media.title}>
          <source src={media.src} />
          Tu navegador no puede reproducir este video.
        </video>
      ) : (
        <div className="fin-media-empty" aria-label={`${label} pendiente de publicación`}>
          <span className="fin-media-play" aria-hidden="true"><Play fill="currentColor" size={30} /></span>
          <span>Video en preparación</span>
        </div>
      )}
      <div className="fin-media-caption">
        <span>{index ? `${String(index).padStart(2, '0')} / ` : ''}{label}</span>
        <span aria-hidden="true">✦</span>
      </div>
    </article>
  )
}

const CaseStudy: React.FC<CaseStudyProps> = ({ team, index, next, origin, closing, onClose, onExited, onNext }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const firstSlugRef = useRef(team.slug)

  /* Apertura: el recorte crece desde el origen hasta la pantalla completa */
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    closeRef.current?.focus({ preventScroll: true })
    if (prefersReduced()) return

    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo(root,
          { clipPath: origin ? insetFrom(origin) : 'inset(100% 0% 0% 0%)' },
          { clipPath: origin ? 'inset(0px 0px 0px 0px)' : 'inset(0% 0% 0% 0%)', duration: origin ? 0.95 : 0.8, ease: 'expo.inOut', clearProps: 'clipPath' })
        .from('.fin-cs-title .fin-char', { yPercent: 115, opacity: 0, duration: 0.9, stagger: 0.03, ease: 'expo.out' }, '-=0.35')
        .from('.fin-cs-intro', { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, '<0.1')
        .from('.fin-cs-head-art', { scale: 0.85, rotate: -4, opacity: 0, duration: 1, ease: 'back.out(1.6)' }, '<')
    }, root)
    return () => ctx.revert()
    // Solo al montar: los cambios de equipo tienen su propia transición
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Cambio de equipo: vuelve arriba y el contenido entra de nuevo */
  useLayoutEffect(() => {
    const root = rootRef.current
    const content = contentRef.current
    if (!root || !content || firstSlugRef.current === team.slug) return
    firstSlugRef.current = ''
    root.scrollTop = 0
    if (!prefersReduced()) gsap.fromTo(content, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' })
  }, [team.slug])

  /* Bloques que aparecen al scrollear dentro del overlay */
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReduced()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fin-cs-reveal').forEach((el) => {
        gsap.from(el, { y: 70, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, scroller: root, start: 'top 90%', once: true } })
      })
      gsap.fromTo('.fin-cs-demo .fin-media', { scale: 0.86 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.fin-cs-demo', scroller: root, start: 'top bottom', end: 'top 25%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [team.slug])

  /* Cierre */
  useEffect(() => {
    if (!closing) return
    const root = rootRef.current
    if (!root || prefersReduced()) { onExited(); return }
    const tween = gsap.fromTo(root, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: 'expo.inOut', onComplete: onExited })
    return () => { tween.kill() }
  }, [closing, onExited])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const goNext = () => {
    const content = contentRef.current
    if (!content || prefersReduced()) { onNext(); return }
    gsap.to(content, { y: -60, opacity: 0, duration: 0.45, ease: 'power3.in', onComplete: onNext })
  }

  return (
    <div
      ref={rootRef}
      className={`fin-cs fin-tone-${index % 6}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fin-cs-title"
      data-lenis-prevent
    >
      <div className="fin-cs-bar">
        <p><span>{team.number}</span> {team.name}</p>
        <button ref={closeRef} type="button" className="fin-cs-close" onClick={onClose} aria-label="Cerrar proyecto">
          <X size={20} strokeWidth={2.5} /> <span>Cerrar</span>
        </button>
      </div>

      <div ref={contentRef} className="fin-cs-content">
        <header className="fin-cs-head" style={{ '--len': [...team.name].length } as React.CSSProperties}>
          <div className="fin-cs-head-copy">
            <p className="fin-cs-intro fin-cs-kicker">EXPEDIENTE Nº {team.number} <span aria-hidden="true">✦</span> EQUIPO FINALISTA</p>
            <h2 id="fin-cs-title" className="fin-cs-title" aria-label={team.name}>
              {[...team.name].map((char, i) => <span className="fin-char" aria-hidden="true" key={i}>{char}</span>)}
            </h2>
            {team.pdf ? (
              <a className="fin-cs-intro fin-cs-pdf" href={team.pdf} download>
                <Download size={20} strokeWidth={2.5} aria-hidden="true" /> Descargar PDF del proyecto
              </a>
            ) : (
              <span className="fin-cs-intro fin-cs-pdf is-pending" aria-disabled="true">
                <FileText size={20} strokeWidth={2.5} aria-hidden="true" /> PDF en preparación
              </span>
            )}
          </div>
          <div className="fin-cs-head-art">
            <TeamCover team={team} index={index} />
            <CircularText className="fin-cs-stamp" text="FASE 02 ✦ FASE 02 ✦ FASE 02 ✦ " duration={16}>
              <Sparkles size={26} strokeWidth={2.2} aria-hidden="true" />
            </CircularText>
          </div>
        </header>

        <div className="fin-cs-story">
          <article className="fin-cs-block fin-cs-reveal">
            <span className="fin-cs-ghost" aria-hidden="true">01</span>
            <span className="fin-cs-label">01 / LA HISTORIA</span>
            <h3>Resumen del <em>proyecto</em></h3>
            <p>{team.summary}</p>
          </article>
          <article className="fin-cs-block fin-cs-block-alt fin-cs-reveal">
            <span className="fin-cs-ghost" aria-hidden="true">02</span>
            <span className="fin-cs-label">02 / EL PROCESO</span>
            <h3>De la idea <em>al producto</em></h3>
            <p>{team.product}</p>
          </article>
        </div>

        <section className="fin-cs-section fin-cs-demo" aria-labelledby="fin-demo-title">
          <div className="fin-cs-subhead fin-cs-reveal"><span>03 / EN ACCIÓN</span><h3 id="fin-demo-title">VIDEO <em>DEMO</em></h3></div>
          <VideoCard media={team.demo} label="Demo del proyecto" />
        </section>

        <section className="fin-cs-section" aria-labelledby="fin-promos-title">
          <div className="fin-cs-subhead fin-cs-reveal"><span>04 / PARA COMPARTIR</span><h3 id="fin-promos-title">VIDEOS <em>PROMOCIONALES</em></h3></div>
          <div className="fin-cs-promos fin-cs-reveal">
            {team.promos.length
              ? team.promos.map((media, i) => <VideoCard key={media.src} media={media} label={media.title} index={i + 1} />)
              : <VideoCard media={null} label="Video promocional" index={1} />}
          </div>
        </section>

        <section className="fin-cs-section" aria-labelledby="fin-photos-title">
          <div className="fin-cs-subhead fin-cs-reveal"><span>05 / DETRÁS DE ESCENA</span><h3 id="fin-photos-title">FOTOS <em>EXTRA</em></h3></div>
          {team.photos.length ? (
            <div className="fin-cs-photos">
              {team.photos.map((photo) => (
                <figure className="fin-cs-photo fin-cs-reveal" key={photo.src}>
                  <img src={photo.src} alt={photo.alt ?? photo.title} loading="lazy" />
                  <figcaption>{photo.title}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="fin-cs-photo-empty fin-cs-reveal">
              <span aria-hidden="true">✦</span>
              <strong>Próximamente</strong>
              <p>Las fotos de {team.name} van a aparecer acá.</p>
            </div>
          )}
        </section>

        <button type="button" className="fin-cs-next" onClick={goNext}>
          <span className="fin-cs-next-label">SEGUÍ EXPLORANDO</span>
          <strong>{next.name}</strong>
          <ArrowRight className="fin-cs-next-arrow" size={56} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default CaseStudy
