import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Emblem() {
  const group = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d5a64e', metalness: 0.88, roughness: 0.2 }), [])
  const silver = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e7edf4', metalness: 0.92, roughness: 0.16 }), [])

  useFrame((state, delta) => {
    if (!group.current || !ring.current) return
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, (state.pointer.x * 0.16), 1 - Math.exp(-delta * 2.2))
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, (state.pointer.y * 0.12), 1 - Math.exp(-delta * 2.2))
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x + Math.sin(state.clock.elapsedTime * 0.22) * 0.08, 1 - Math.exp(-delta * 2))
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y, 1 - Math.exp(-delta * 2))
    ring.current.rotation.z += delta * 0.035
  })

  return (
    <group>
      <group ref={group}>
        <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.18}>
          <mesh position={[-0.08, 0.1, 0]} rotation={[0, 0, 0.12]} material={silver}>
            <torusKnotGeometry args={[0.78, 0.105, 180, 24, 2, 3]} />
          </mesh>
          <mesh position={[0.03, -0.05, 0.2]} rotation={[0, 0, -0.36]} material={gold}>
            <torusGeometry args={[0.82, 0.055, 20, 160, Math.PI * 1.18]} />
          </mesh>
          <mesh ref={ring} rotation={[Math.PI / 2.45, 0.18, 0.2]}>
            <torusGeometry args={[1.48, 0.012, 12, 180]} />
            <meshStandardMaterial color="#d8ad63" metalness={0.95} roughness={0.25} emissive="#6d4617" emissiveIntensity={0.22} />
          </mesh>
        </Float>
      </group>
      <Sparkles count={48} scale={3.7} size={1.7} speed={0.16} opacity={0.48} color="#e5c27f" />
      <Environment preset="city" />
    </group>
  )
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-label="Abstract three-dimensional metallic AXOR-inspired emblem" role="img">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 4]} intensity={2.1} color="#fff0d2" />
        <pointLight position={[-3, -1, 2]} intensity={1.8} color="#c38a35" />
        <Suspense fallback={null}><Emblem /></Suspense>
      </Canvas>
      <div className="scene-label"><span>AXOR / 001</span><span>INTELLIGENCE IN MOTION</span></div>
    </div>
  )
}
