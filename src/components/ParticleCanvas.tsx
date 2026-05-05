import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 80

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Particles
    const count = 180
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60

      // Indigo to cyan gradient colors
      const t = Math.random()
      colors[i * 3] = 0.4 + t * 0.2       // R
      colors[i * 3 + 1] = 0.3 + t * 0.4   // G
      colors[i * 3 + 2] = 0.8 + t * 0.2   // B
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Connection lines
    const lineGeo = new THREE.BufferGeometry()
    const linePositions: number[] = []
    const maxDist = 35

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2]
        const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2]
        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2)
        if (dist < maxDist) {
          linePositions.push(ax, ay, az, bx, by, bz)
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.12 })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // Mouse parallax
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // Animate
    let frameId: number
    let elapsed = 0
    let lastTime = performance.now()
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const now = performance.now()
      elapsed += (now - lastTime) / 1000
      lastTime = now

      particles.rotation.y = elapsed * 0.04 + mouseX * 0.05
      particles.rotation.x = elapsed * 0.02 + mouseY * 0.03
      lines.rotation.y = particles.rotation.y
      lines.rotation.x = particles.rotation.x

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
