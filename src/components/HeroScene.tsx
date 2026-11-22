import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function InterconnectedStructure({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const steel = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9d1dc', metalness: 0.72, roughness: 0.34 }), [])
  const brass = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c49a5b', metalness: 0.68, roughness: 0.32 }), [])

  useFrame((state, delta) => {
    if (reducedMotion || !group.current) return
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, state.pointer.y * 0.10, 2.0, delta)
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, state.pointer.x * 0.14, 2.0, delta)
    group.current.rotation.x = pointer.current.x
    group.current.rotation.y = pointer.current.y
  })

  return (
    <group ref={group}>
      <mesh rotation={[0.72, 0.22, 0.18]} material={steel}>
        <torusGeometry args={[0.84, 0.12, 32, 144]} />
      </mesh>
      <mesh position={[0.12, 0.04, 0.05]} rotation={[-0.62, 0.48, -0.52]} material={brass}>
        <torusGeometry args={[0.88, 0.095, 28, 144]} />
      </mesh>
      <mesh position={[-0.02, 0, -0.04]} rotation={[0.12, 0.92, 0.62]}>
        <torusGeometry args={[1.18, 0.018, 12, 160]} />
        <meshStandardMaterial color="#9ca8b7" metalness={0.58} roughness={0.42} />
      </mesh>
    </group>
  )
}

export default function HeroScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div className="hero-scene" aria-label="Interconnected steel and brass rings representing connected engineering systems" role="img">
      <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 4.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 4]} intensity={1.8} color="#f3ead9" />
        <directionalLight position={[-3, -1, 2]} intensity={0.65} color="#aebccc" />
        <pointLight position={[0, -2, 3]} intensity={0.35} color="#c49a5b" />
        <Environment preset="city" />
        <InterconnectedStructure reducedMotion={reducedMotion} />
      </Canvas>
      <div className="scene-label"><span>Zentaro / 001</span><span>Connected engineering</span></div>
    </div>
  )
}
