import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function EngineeringModel({ reducedMotion }: { reducedMotion: boolean }) {
  const orbit = useRef<THREE.Mesh>(null)
  const centerCube = useRef<THREE.Mesh>(null)
  const sideCubes = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (reducedMotion) return
    const time = state.clock.elapsedTime

    if (orbit.current) {
      orbit.current.rotation.y += delta * 0.22
      orbit.current.rotation.x = 0.34 + Math.sin(time * 0.28) * 0.045
    }

    if (centerCube.current) {
      centerCube.current.position.y = 0.12 + Math.sin(time * 0.72) * 0.045
      centerCube.current.rotation.y = Math.sin(time * 0.32) * 0.08
    }

    if (sideCubes.current) {
      sideCubes.current.position.y = Math.sin(time * 0.55 + 0.6) * 0.025
    }
  })

  return (
    <group>
      <mesh ref={orbit} rotation={[0.34, 0, 0.65]}>
        <torusGeometry args={[1.18, 0.018, 12, 160]} />
        <meshStandardMaterial color="#1689ff" emissive="#075fc7" emissiveIntensity={0.12} metalness={0.58} roughness={0.28} />
      </mesh>

      <group ref={sideCubes}>
        <mesh position={[-0.57, -0.08, 0]}>
          <boxGeometry args={[0.48, 0.48, 0.48]} />
          <meshStandardMaterial color="#b9c2cf" metalness={0.28} roughness={0.42} />
        </mesh>
        <mesh position={[0.57, -0.08, 0]}>
          <boxGeometry args={[0.48, 0.48, 0.48]} />
          <meshStandardMaterial color="#b9c2cf" metalness={0.28} roughness={0.42} />
        </mesh>
      </group>

      <mesh ref={centerCube} position={[0, 0.12, 0.08]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0878e9" emissive="#075fc7" emissiveIntensity={0.16} metalness={0.38} roughness={0.32} />
      </mesh>
    </group>
  )
}

export default function AmbientScene({ reducedMotion = false, className = '' }: { reducedMotion?: boolean; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = host.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, { rootMargin: '180px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={host} className={`ambient-scene ${className}`} aria-hidden="true">
      {visible && (
        <Canvas
          dpr={[1, 1.35]}
          camera={{ position: [0, 0, 4.35], fov: 39 }}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        >
          <ambientLight intensity={0.78} />
          <directionalLight position={[3, 4, 4]} intensity={1.65} color="#eef0f5" />
          <directionalLight position={[-3, -1, 2]} intensity={0.65} color="#8ad5ff" />
          <Environment preset="city" />
          <EngineeringModel reducedMotion={reducedMotion} />
        </Canvas>
      )}
    </div>
  )
}
