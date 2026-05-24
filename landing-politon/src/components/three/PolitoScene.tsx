/**
 * PolitoScene.tsx — POLITÓN 2026
 *
 * Carga polito3D.glb con GLTFLoader.
 * - Mouse tracking: Polito gira suavemente hacia el cursor
 * - Idle float: bobbing y rotation sin parar
 * - Reproduce animaciones propias del GLB si existen
 * - Entrada con GSAP (scale + opacity desde 0)
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from '../../lib/gsap'
import polito3DSrc from '../../assets/polito3D.glb'

interface PolitoSceneProps {
  heroRef: React.RefObject<HTMLElement | null>
}

const PolitoScene: React.FC<PolitoSceneProps> = ({ heroRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* ── Respetar prefers-reduced-motion ── */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ── RENDERER ── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = false
    renderer.outputColorSpace = THREE.SRGBColorSpace

    /* ── ESCENA + CÁMARA ── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200)
    camera.position.set(0, 0, 8)
    camera.lookAt(0, -0.2, 0)

    /* ── ILUMINACIÓN ── */
    // Luz ambiente cálida — tono vintage / crema
    const ambientLight = new THREE.AmbientLight(0xf5edcf, 1.4)
    scene.add(ambientLight)

    // Luz direccional principal desde arriba-derecha
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)
    dirLight.position.set(4, 6, 5)
    scene.add(dirLight)

    // Luz de relleno dorada suave desde la izquierda
    const fillLight = new THREE.DirectionalLight(0xe8a020, 0.8)
    fillLight.position.set(-3, 2, 3)
    scene.add(fillLight)

    // Luz de rebote suave desde abajo
    const bounceLight = new THREE.DirectionalLight(0xede0bc, 0.4)
    bounceLight.position.set(0, -4, 2)
    scene.add(bounceLight)

    /* ── SYNC SIZE ── */
    const syncSize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    syncSize()

    /* ── ESTADO MOUSE ── */
    // Posición normalizada del cursor: [-1, 1] en ambos ejes
    const mouse = { x: 0, y: 0 }
    // Target suavizado (lerp target)
    const smoothMouse = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      const hero = heroRef.current
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      // Normalizar a [-1, 1] relativo al hero
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    window.addEventListener('mousemove', onMouseMove)

    /* ── MODELO GLB ── */
    let modelRoot: THREE.Group | null = null
    let mixer: THREE.AnimationMixer | null = null
    let rafId = 0
    const timer = new THREE.Timer()
    // Posición y rotación base del modelo (calculada al cargar, usada por el float idle)
    const modelBase = { x: 0, y: 0, z: 0, rotZ: 0, rotX: 0 }

    const loader = new GLTFLoader()

    loader.load(
      polito3DSrc,
      (gltf) => {
        modelRoot = gltf.scene

        /* ── Centrar y escalar con auto-fit al frustum ── */
        // Aplicar rotación inicial "volando" para que el brazo baje al canvas
        modelRoot.rotation.z = -0.30  // inclinar levemente en Z (lean forward)
        modelRoot.rotation.x = 0.5  // pitch ligero para pose dinámica

        // Recalcular el bounding box DESPUÉS de la rotación inicial
        const box = new THREE.Box3().setFromObject(modelRoot)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        // Calcular dimensiones del frustum en el plano Z=0
        const fovRad = (camera.fov * Math.PI) / 180
        const camDist = camera.position.z
        const frustumH = 2 * Math.tan(fovRad / 2) * camDist
        const frustumW = frustumH * camera.aspect

        // Escalar para que el modelo (incluyendo brazo) quepa al 110% de la altura visible
        const scaleH = (frustumH * 1.10) / size.y
        const scaleW = (frustumW * 1.10) / size.x
        const scale = Math.min(scaleH, scaleW)

        modelRoot.scale.setScalar(scale)

        // Centrar horizontalmente
        modelRoot.position.x = -center.x * scale

        // Centrar verticalmente con leve desplazamiento hacia arriba para compensar el tamaño
        modelRoot.position.y = -(center.y * scale) + (frustumH * 0.05)
        modelRoot.position.z = 0

        // Guardar posición y rotación base para el float idle en el render loop
        modelBase.x = modelRoot.position.x
        modelBase.y = modelRoot.position.y
        modelBase.z = 0
        modelBase.rotZ = modelRoot.rotation.z
        modelBase.rotX = modelRoot.rotation.x

        /* Sombras soft en cada mesh */
        modelRoot.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = false
            mesh.receiveShadow = false
            // Mejorar materiales si son MeshStandardMaterial
            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.roughness = 0.7
              mesh.material.metalness = 0.1
            }
          }
        })

        scene.add(modelRoot)

        /* Animaciones del GLB */
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(modelRoot)
          // Reproducir la primera animación (idle, por lo general)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }

        /* Entrada: escala desde 0 con GSAP */
        if (!reduced) {
          modelRoot.scale.setScalar(0)
          gsap.to(modelRoot.scale, {
            x: scale,
            y: scale,
            z: scale,
            duration: 0.9,
            ease: 'back.out(1.8)',
            delay: 0.6,
          })
        }

        /* Canvas visible */
        gsap.to(canvas, {
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
        })
      },
      undefined,
      (err) => {
        console.error('[PolitoScene] Error al cargar polito3D.glb:', err)
      }
    )

    /* ── RENDER LOOP con pausa por visibilidad ── */
    let isVisible = true

    const render = () => {
      if (!isVisible) return
      rafId = requestAnimationFrame(render)
      const delta = timer.getDelta()
      const elapsed = timer.getElapsed()

      if (modelRoot) {
        /* 1. Idle float — bobbing en Y + leve roll */
        const floatY = Math.sin(elapsed * 0.8) * 0.12
        const floatRoll = Math.sin(elapsed * 0.6) * 0.03
        const floatPitch = Math.cos(elapsed * 0.5) * 0.02

        /* 2. Mouse tracking — suavizar con lerp */
        if (!reduced) {
          const lerpSpeed = 0.05
          smoothMouse.x += (mouse.x - smoothMouse.x) * lerpSpeed
          smoothMouse.y += (mouse.y - smoothMouse.y) * lerpSpeed
        }

        /* Eje Y (yaw): mira izq/der según cursor (reducida sensibilidad) */
        const targetYaw = smoothMouse.x * 0.20
        /* Eje X (pitch): mira arriba/abajo según cursor + base lean (reducida sensibilidad) */
        const targetPitch = smoothMouse.y * 0.12

        modelRoot.rotation.y = targetYaw
        // Base lean rotations + mouse + idle float
        modelRoot.rotation.x = modelBase.rotX + targetPitch + floatPitch
        modelRoot.rotation.z = modelBase.rotZ + floatRoll

        /* Posición: float en Y alrededor del baseY guardado */
        modelRoot.position.y = modelBase.y + floatY
      }

      /* Actualizar mixer (animaciones propias del GLB) */
      if (mixer) mixer.update(delta)

      renderer.render(scene, camera)
    }

    const startRender = () => {
      if (!isVisible) {
        isVisible = true
        rafId = requestAnimationFrame(render)
      }
    }

    const stopRender = () => {
      isVisible = false
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    rafId = requestAnimationFrame(render)

    /* Pausar cuando el canvas sale del viewport */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startRender()
        else stopRender()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    /* Pausar cuando la tab está en background */
    const onVisibility = () => {
      if (document.hidden) stopRender()
      else startRender()
    }
    document.addEventListener('visibilitychange', onVisibility)

    /* ── RESIZE ── */
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)

    /* ── CLEANUP ── */
    return () => {
      stopRender()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      mixer?.stopAllAction()
      renderer.dispose()
      scene.clear()
    }
  }, [heroRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="polito-canvas"
    />
  )
}

export default PolitoScene
