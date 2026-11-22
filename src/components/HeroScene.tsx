import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function createZGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(-1.25, 0.82)
  shape.lineTo(1.25, 0.82)
  shape.lineTo(1.25, 0.35)
  shape.lineTo(-0.38, -0.35)
  shape.lineTo(1.25, -0.35)
  shape.lineTo(1.25, -0.82)
  shape.lineTo(-1.25, -0.82)
  shape.lineTo(-1.25, -0.35)
  shape.lineTo(0.38, 0.35)
  shape.lineTo(-1.25, 0.35)
  shape.closePath()

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.045,
    bevelThickness: 0.045,
    curveSegments: 8,
  })
}

function ZentaroStructure({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const geometry = useMemo(createZGeometry, [])
  const blue = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#087BFF',
    emissive: '#0648A7',
    emissiveIntensity: 0.16,
    metalness: 0.48,
    roughness: 0.3,
  }), [])
  const ice = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#DFF7FF',
    metalness: 0.54,
    roughness: 0.3,
  }), [])
  const cyan = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00C8F5',
    emissive: '#087BFF',
    emissiveIntensity: 0.2,
    metalness: 0.5,
    roughness: 0.3,
  }), [])

  useFrame((state, delta) => {
    if (reducedMotion || !group.current) return
    const time = state.clock.elapsedTime
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, state.pointer.y * 0.08, 1.7, delta)
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, state.pointer.x * 0.12, 1.7, delta)
    group.current.rotation.x = Math.sin(time * 0.25) * 0.035 + pointer.current.x
    group.current.rotation.y = time * 0.11 + pointer.current.y
    group.current.rotation.z = Math.sin(time * 0.18) * 0.018
    group.current.position.y = Math.sin(time * 0.62) * 0.045
  })

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={blue} rotation={[0.12, -0.22, 0.04]} />
      <mesh
        geometry={geometry}
        material={ice}
        position={[0.16, -0.04, -0.22]}
        rotation={[0.12, 0.26, Math.PI]}
        scale={[0.64, 0.64, 0.72]}
      />
      <mesh rotation={[0.65, 0.12, 0.36]} position={[0, 0, -0.05]} material={cyan}>
        <torusGeometry args={[1.72, 0.012, 10, 144]} />
      </mesh>
    </group>
  )
}

export default function HeroScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div
      className="hero-scene"
      role="img"
      aria-label="A dimensional Z-shaped structure in electric blue and ice blue, slowly rotating in space"
    >
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        fallback={<div className="hero-scene-static"><img src="/images/zentaro-mark.webp" alt="ZENTARO logo" /></div>}
      >
        <ambientLight intensity={0.74} />
        <directionalLight position={[3.5, 4, 5]} intensity={1.65} color="#FFFFFF" />
        <directionalLight position={[-3.5, -1.5, 2]} intensity={0.85} color="#A9E8FF" />
        <pointLight position={[0, 1.5, 3.5]} intensity={0.42} color="#00C8F5" />
        <ZentaroStructure reducedMotion={reducedMotion} />
      </Canvas>
      <div className="scene-label"><span>Zentaro / 001</span><span>Purpose-built geometry</span></div>
    </div>
  )
}
