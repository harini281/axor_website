import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

type SceneVariant = 'intelligence' | 'architecture' | 'orbit'

function StaticStructure({ variant }: { variant: SceneVariant }) {
  const gold = '#1689ff'
  const steel = '#c9d1dc'
  return (
    <group>
      {variant === 'intelligence' && (
        <>
          <mesh rotation={[0.8, 0.3, 0.2]}>
            <torusGeometry args={[0.82, 0.055, 18, 128]} />
            <meshStandardMaterial color={steel} metalness={0.62} roughness={0.38} />
          </mesh>
          <mesh rotation={[-0.6, 0.45, -0.5]}>
            <torusGeometry args={[0.94, 0.045, 16, 128]} />
            <meshStandardMaterial color={gold} metalness={0.62} roughness={0.38} />
          </mesh>
        </>
      )}
      {variant === 'architecture' && (
        <group rotation={[0.25, 0.45, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[(i - 1) * 0.46, (i % 2) * 0.28, 0]}>
              <boxGeometry args={[0.38, 0.38, 0.38]} />
              <meshStandardMaterial color={i === 1 ? gold : steel} metalness={0.48} roughness={0.44} />
            </mesh>
          ))}
          <mesh rotation={[0.3, 0.6, 0.2]}>
            <torusGeometry args={[1.12, 0.016, 10, 128]} />
            <meshStandardMaterial color={gold} metalness={0.68} roughness={0.38} />
          </mesh>
        </group>
      )}
      {variant === 'orbit' && (
        <>
          <mesh rotation={[0.7, 0.2, 0]}>
            <torusKnotGeometry args={[0.62, 0.09, 128, 18, 2, 3]} />
            <meshStandardMaterial color={steel} metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh rotation={[-0.4, 0.8, 0.3]}>
            <torusGeometry args={[1.08, 0.022, 10, 128]} />
            <meshStandardMaterial color={gold} metalness={0.64} roughness={0.4} />
          </mesh>
        </>
      )}
    </group>
  )
}

export default function AmbientScene({ variant = 'intelligence', className = '' }: { variant?: SceneVariant; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '160px' })
    if (host.current) observer.observe(host.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={host} className={`ambient-scene ${className}`} aria-hidden="true">
      {visible && (
        <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 4.3], fov: 42 }} frameloop="demand" gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
          <ambientLight intensity={0.72} />
          <directionalLight position={[3, 4, 4]} intensity={1.6} color="#eef0f5" />
          <directionalLight position={[-3, -1, 2]} intensity={0.5} color="#a3a9b8" />
          <Environment preset="city" />
          <StaticStructure variant={variant} />
        </Canvas>
      )}
    </div>
  )
}
