import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

type SceneVariant = 'intelligence' | 'architecture' | 'orbit'

function AnimatedStructure({ variant }: { variant: SceneVariant }) {
  const root = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!root.current || !inner.current) return
    const targetX = state.pointer.y * 0.13
    const targetY = state.pointer.x * 0.18
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, targetX, 2.2, delta)
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, targetY, 2.2, delta)
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.current.x + Math.sin(state.clock.elapsedTime * 0.25) * 0.04, 2, delta)
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.y + state.clock.elapsedTime * 0.07, 2, delta)
    inner.current.rotation.z += delta * (variant === 'architecture' ? 0.11 : 0.16)
    if (ringA.current) ringA.current.rotation.z -= delta * 0.12
    if (ringB.current) ringB.current.rotation.x += delta * 0.08
  })

  const gold = '#d9ad62'
  const silver = '#dce5ef'

  return (
    <group ref={root}>
      <Float speed={1.1} floatIntensity={0.16} rotationIntensity={0.08}>
        {variant === 'intelligence' && (
          <>
            <mesh ref={inner}>
              <icosahedronGeometry args={[0.78, 1]} />
              <meshPhysicalMaterial color={silver} metalness={0.82} roughness={0.22} wireframe />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[0.53, 2]} />
              <meshPhysicalMaterial color={gold} metalness={0.9} roughness={0.18} transmission={0.12} thickness={0.6} />
            </mesh>
            <mesh ref={ringA} rotation={[1.15, 0.2, 0.2]}>
              <torusGeometry args={[1.12, 0.018, 12, 140]} />
              <meshStandardMaterial color={gold} metalness={0.95} roughness={0.2} emissive="#704b1b" emissiveIntensity={0.35} />
            </mesh>
            <mesh ref={ringB} rotation={[0.3, 1.15, 0.5]}>
              <torusGeometry args={[1.32, 0.009, 8, 140]} />
              <meshStandardMaterial color={silver} metalness={0.85} roughness={0.25} />
            </mesh>
          </>
        )}
        {variant === 'architecture' && (
          <>
            <group ref={inner}>
              {[0, 1, 2, 3].map((i) => (
                <mesh key={i} position={[(i - 1.5) * 0.34, (i % 2) * 0.3 - 0.15, (i % 3) * 0.19 - 0.2]} rotation={[0.3 * i, 0.5 * i, 0.2]}>
                  <boxGeometry args={[0.34, 0.34, 0.34]} />
                  <meshPhysicalMaterial color={i % 2 ? gold : silver} metalness={0.82} roughness={0.22} />
                </mesh>
              ))}
            </group>
            <mesh ref={ringA} rotation={[1.2, 0.2, 0.3]}>
              <torusGeometry args={[1.18, 0.018, 10, 140]} />
              <meshStandardMaterial color={gold} metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh ref={ringB} rotation={[0.3, 0.7, 0.2]}>
              <torusGeometry args={[0.88, 0.012, 8, 140]} />
              <meshStandardMaterial color={silver} metalness={0.9} roughness={0.2} />
            </mesh>
          </>
        )}
        {variant === 'orbit' && (
          <>
            <mesh ref={inner}>
              <torusKnotGeometry args={[0.62, 0.12, 160, 20, 2, 3]} />
              <meshPhysicalMaterial color={silver} metalness={0.9} roughness={0.18} />
            </mesh>
            <mesh ref={ringA} rotation={[1.1, 0.2, 0]}>
              <torusGeometry args={[1.18, 0.025, 12, 150]} />
              <meshStandardMaterial color={gold} metalness={0.95} roughness={0.16} emissive="#79511e" emissiveIntensity={0.32} />
            </mesh>
            <mesh ref={ringB} rotation={[0.1, 1.15, 0.4]}>
              <torusGeometry args={[1.38, 0.009, 8, 150]} />
              <meshStandardMaterial color={silver} metalness={0.8} roughness={0.25} />
            </mesh>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <mesh key={i} position={[Math.cos(i * Math.PI / 3) * 1.03, Math.sin(i * Math.PI / 3) * 1.03, 0]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.5} />
              </mesh>
            ))}
          </>
        )}
      </Float>
      <Sparkles count={variant === 'architecture' ? 24 : 36} scale={3.5} size={1.5} speed={0.18} opacity={0.38} color="#e7c98e" />
    </group>
  )
}

export default function AmbientScene({ variant = 'intelligence', className = '' }: { variant?: SceneVariant; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const onChange = () => setReducedMotion(media.matches)
    media.addEventListener?.('change', onChange)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '160px' })
    if (host.current) observer.observe(host.current)
    return () => {
      observer.disconnect()
      media.removeEventListener?.('change', onChange)
    }
  }, [])

  return (
    <div ref={host} className={`ambient-scene ${className}`} aria-hidden="true">
      {visible && (
        <Canvas
          dpr={[1, 1.35]}
          camera={{ position: [0, 0, 4.3], fov: 42 }}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        >
          <ambientLight intensity={0.62} />
          <directionalLight position={[3, 4, 4]} intensity={1.8} color="#fff0d4" />
          <pointLight position={[-3, -1, 2]} intensity={1.5} color="#bd8435" />
          <pointLight position={[1, 2, -3]} intensity={0.8} color="#a9c8ed" />
          <Environment preset="city" />
          <AnimatedStructure variant={variant} />
        </Canvas>
      )}
    </div>
  )
}
