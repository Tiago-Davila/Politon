/**
 * PolitoScene.tsx — POLITÓN 2026
 * Three.js billboard sprite de Polito.
 * Vuela de derecha a izquierda mientras el usuario scrollea el Hero.
 * La animación es reversible: al scrollear para arriba Polito regresa.
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import politoSrc from '../../assets/Polito.png'

interface PolitoSceneProps {
  /** ref al <section> del Hero — usado como trigger de ScrollTrigger */
  heroRef: React.RefObject<HTMLElement | null>
}

const PolitoScene: React.FC<PolitoSceneProps> = ({ heroRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* Respetar prefers-reduced-motion */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ─── RENDERER ─── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    /* ─── ESCENA + CÁMARA ─── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0, 5)

    const syncSize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    syncSize()

    /* ─── ESTADO ANIMADO POR GSAP ─── */
    // Estos valores son modificados por ScrollTrigger y leídos en el render loop.
    const st = {
      x:       2.4,   // posición inicial derecha
      y:      -0.2,
      scale:   1.0,
      rotY:    0.0,   // banking (giro en Y)
      rotX:    0.0,   // pitch (inclinar nariz)
      opacity: 1.0,
    }

    /* ─── MALLA ─── */
    let mesh: THREE.Mesh | null = null
    let stTrigger: ScrollTrigger | null = null
    let rafId = 0

    const loader = new THREE.TextureLoader()
    loader.load(politoSrc, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace

      /* Proporción real de la imagen */
      const imgAspect = tex.image.width / tex.image.height
      const H = 2.4
      const W = H * imgAspect

      const geo = new THREE.PlaneGeometry(W, H)
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.05,
        depthWrite: false,
        side: THREE.FrontSide,
      })

      mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(st.x, st.y, 0)
      scene.add(mesh)

      /* ─── SCROLL TRIGGER ─── */
      if (!reduced && heroRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,          // lag suave — el reverse es automático
          },
        })

        /*
         * Trayectoria del vuelo:
         *  Fase 1 (0–40%)  → despegue: sube y gira a la izquierda
         *  Fase 2 (40–85%) → vuelo horizontal: cruza el hero
         *  Fase 3 (85–100%)→ sale de pantalla + fade out
         */
        tl
          .to(st, {
            x: 0.3, y: 0.9,
            scale: 0.93,
            rotY: -0.22, rotX: -0.12,
            opacity: 1,
            duration: 0.4,
            ease: 'power1.inOut',
          })
          .to(st, {
            x: -3.0, y: 0.6,
            scale: 0.80,
            rotY: -0.35, rotX: -0.06,
            opacity: 1,
            duration: 0.45,
            ease: 'power1.inOut',
          })
          .to(st, {
            x: -5.5, y: 0.4,
            scale: 0.65,
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          })

        stTrigger = ScrollTrigger.getAll().at(-1) ?? null
      }
    })

    /* ─── RENDER LOOP ─── */
    const clock = new THREE.Clock()

    const render = () => {
      rafId = requestAnimationFrame(render)

      if (mesh) {
        const t = clock.getElapsedTime()

        /* Oscilación idle encima del estado GSAP */
        const idleY = Math.sin(t * 0.65) * 0.045
        const idleZ = Math.sin(t * 0.48) * 0.018

        mesh.position.x = st.x
        mesh.position.y = st.y + idleY
        mesh.rotation.y = st.rotY
        mesh.rotation.x = st.rotX
        mesh.rotation.z = idleZ
        mesh.scale.setScalar(st.scale)
        ;(mesh.material as THREE.MeshBasicMaterial).opacity = st.opacity
      }

      renderer.render(scene, camera)
    }

    render()

    /* ─── RESIZE ─── */
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)

    /* ─── CLEANUP ─── */
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      stTrigger?.kill()
      renderer.dispose()
      scene.clear()
    }
  }, [heroRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,   /* entre fondo (0) y texto (2) */
      }}
    />
  )
}

export default PolitoScene
