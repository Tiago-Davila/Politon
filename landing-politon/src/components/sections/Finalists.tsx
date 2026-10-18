import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Play, Sparkles } from 'lucide-react'
import logo from '../../assets/logo-completo-nav.webp'
import polito from '../../assets/polito-hero.webp'
import { finalists, type FinalistMedia } from '../../data/finalists'
import './Finalists.css'

function getSelectedSlug() {
  const requested = new URLSearchParams(window.location.search).get('equipo')
  return finalists.some((team) => team.slug === requested) ? requested! : finalists[0].slug
}

function VideoCard({ media, label, index }: { media: FinalistMedia | null; label: string; index?: number }) {
  return (
    <article className="finalists-media-card">
      {media ? (
        <video controls preload="none" poster={media.poster} aria-label={media.title}>
          <source src={media.src} />
          Tu navegador no puede reproducir este video.
        </video>
      ) : (
        <div className="finalists-media-empty" aria-label={`${label} pendiente de publicación`}>
          <span className="finalists-play" aria-hidden="true"><Play fill="currentColor" size={27} /></span>
          <span>Video en preparación</span>
        </div>
      )}
      <div className="finalists-media-caption">
        <span>{index ? `${String(index).padStart(2, '0')} / ` : ''}{label}</span>
        <span aria-hidden="true">✦</span>
      </div>
    </article>
  )
}

export default function Finalists() {
  const [selectedSlug, setSelectedSlug] = useState(getSelectedSlug)
  const selectedIndex = finalists.findIndex((team) => team.slug === selectedSlug)
  const team = finalists[selectedIndex] ?? finalists[0]

  useEffect(() => {
    const onPopState = () => setSelectedSlug(getSelectedSlug())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.title = `${team.name} — Finalistas | POLITÓN 2026`
    return () => { document.title = 'POLITÓN 2026 — Hackatón IPM Buenos Aires' }
  }, [team.name])

  const selectTeam = (slug: string) => {
    if (slug === selectedSlug) return
    const url = new URL(window.location.href)
    url.searchParams.set('equipo', slug)
    window.history.pushState(null, '', url)
    setSelectedSlug(slug)
    document.getElementById('proyecto')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  const nextTeam = finalists[(selectedIndex + 1) % finalists.length]

  return (
    <main className="finalists-page">
      <header className="finalists-header">
        <a className="finalists-logo" href="/" aria-label="Volver al sitio principal de Politón">
          <img src={logo} alt="POLITÓN" />
        </a>
        <span className="finalists-header-tag">FASE 02 <span aria-hidden="true">✦</span> LA FINAL</span>
        <a className="finalists-back" href="/"><ArrowLeft size={17} /> Volver al inicio</a>
      </header>

      <section className="finalists-hero" aria-labelledby="finalists-title">
        <div className="finalists-hero-stars" aria-hidden="true">✦ <span>✧</span> ✦</div>
        <div className="finalists-hero-inner">
          <div className="finalists-hero-copy">
            <p className="finalists-kicker"><span className="finalists-kicker-line" /> POLITÓN 2026 · INSTITUTO POLITÉCNICO MODELO</p>
            <h1 id="finalists-title">LAS IDEAS QUE<br /><em>LLEGARON</em><br />A LA FINAL</h1>
            <p className="finalists-hero-text">Seis equipos. Seis proyectos. Una final para mostrar lo que construyeron. Conocé las ideas que siguieron en carrera.</p>
            <a className="finalists-hero-cta" href="#equipos">Conocé a los equipos <ArrowDown size={20} /></a>
          </div>
          <div className="finalists-hero-art" aria-hidden="true">
            <div className="finalists-rays" />
            <div className="finalists-hero-circle" />
            <img src={polito} alt="" fetchPriority="high" />
            <div className="finalists-seal"><span>06</span><small>EQUIPOS<br />FINALISTAS</small></div>
            <span className="finalists-art-sparkle finalists-art-sparkle-one">✦</span>
            <span className="finalists-art-sparkle finalists-art-sparkle-two">✦</span>
          </div>
        </div>
        <div className="finalists-ticker" aria-hidden="true"><span>✦ IDEAS QUE SE CONSTRUYEN ✦ POLITÓN 2026 ✦ IDEAS QUE SE CONSTRUYEN ✦ POLITÓN 2026 ✦</span></div>
      </section>

      <section id="equipos" className="finalists-content" aria-labelledby="teams-title">
        <div className="finalists-content-inner">
          <div className="finalists-section-head">
            <div>
              <p className="finalists-overline">✦ CONOCÉ SUS PROYECTOS ✦</p>
              <h2 id="teams-title">LOS <span>FINALISTAS</span></h2>
            </div>
            <p>Elegí un equipo y descubrí el camino que recorrió de la idea al producto.</p>
          </div>

          <nav className="finalists-tabs" aria-label="Equipos finalistas" id="proyecto">
            {finalists.map((item) => (
              <button key={item.slug} type="button" className={`finalists-tab${item.slug === team.slug ? ' is-active' : ''}`}
                onClick={() => selectTeam(item.slug)} aria-current={item.slug === team.slug ? 'page' : undefined}>
                <span>{item.number}</span>{item.name}
              </button>
            ))}
          </nav>

          <div className="finalists-project" key={team.slug}>
            <div className="finalists-project-banner">
              <div>
                <p>EXPEDIENTE Nº {team.number} <span aria-hidden="true">✦</span> EQUIPO FINALISTA</p>
                <h2>{team.name}</h2>
              </div>
              <div className="finalists-banner-stamp" aria-hidden="true"><Sparkles size={25} /><span>FASE<br />02</span></div>
            </div>

            <div className="finalists-story-grid">
              <article className="finalists-story-card">
                <span className="finalists-card-no">01 / LA HISTORIA</span>
                <h3>Resumen del<br /><em>proyecto</em></h3>
                <p>{team.summary}</p>
                <span className="finalists-card-ornament" aria-hidden="true">✦ ━ ✦</span>
              </article>
              <article className="finalists-story-card finalists-story-card-alt">
                <span className="finalists-card-no">02 / EL PROCESO</span>
                <h3>De la idea<br /><em>al producto</em></h3>
                <p>{team.product}</p>
                <span className="finalists-card-ornament" aria-hidden="true">✦ ━ ✦</span>
              </article>
            </div>

            <section className="finalists-media-section" aria-labelledby="demo-title">
              <div className="finalists-subhead"><span>03 / EN ACCIÓN</span><h3 id="demo-title">VIDEO <em>DEMO</em></h3></div>
              <VideoCard media={team.demo} label="Demo del proyecto" />
            </section>

            <section className="finalists-media-section" aria-labelledby="promos-title">
              <div className="finalists-subhead"><span>04 / PARA COMPARTIR</span><h3 id="promos-title">VIDEOS <em>PROMOCIONALES</em></h3></div>
              <div className="finalists-media-grid">
                {team.promos.length ? team.promos.map((media, index) => <VideoCard key={media.src} media={media} label={media.title} index={index + 1} />) : <VideoCard media={null} label="Video promocional" index={1} />}
              </div>
            </section>

            <section className="finalists-media-section" aria-labelledby="photos-title">
              <div className="finalists-subhead"><span>05 / DETRÁS DE ESCENA</span><h3 id="photos-title">FOTOS <em>EXTRA</em></h3></div>
              <div className="finalists-photo-grid">
                {team.photos.length ? team.photos.map((photo) => <figure className="finalists-photo" key={photo.src}><img src={photo.src} alt={photo.alt ?? photo.title} loading="lazy" /><figcaption>{photo.title}</figcaption></figure>) : (
                  <div className="finalists-photo-placeholder"><span aria-hidden="true">✦</span><strong>Próximamente</strong><p>Las fotos de {team.name} van a aparecer acá.</p></div>
                )}
              </div>
            </section>
          </div>

          <button className="finalists-next" onClick={() => selectTeam(nextTeam.slug)} type="button"><span>SEGUÍ EXPLORANDO <strong>{nextTeam.name}</strong></span><ArrowRight size={28} /></button>
        </div>
      </section>

      <footer className="finalists-footer"><span>POLITÓN 2026 <span aria-hidden="true">✦</span> FASE 02</span><p>Instituto Politécnico Modelo · #POLITÓN2026</p><a href="/">Volver al sitio principal <ArrowRight size={16} /></a></footer>
    </main>
  )
}
