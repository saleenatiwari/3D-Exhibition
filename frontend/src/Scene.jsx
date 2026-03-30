import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'

function CameraEntrance({ onComplete }) {
  const { camera } = useThree()
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    const end = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    }
    camera.position.set(end.x + 0.55, end.y - 0.35, end.z + 1.05)

    gsap.to(camera.position, {
      x: end.x,
      y: end.y,
      z: end.z,
      duration: 2.4,
      ease: 'power3.out',
      onComplete: () => onComplete?.(),
    })
  }, [camera, onComplete])

  return null
}

export default function Scene() {
  const [orbitEnabled, setOrbitEnabled] = useState(false)

  return (
    <>
      <color attach="background" args={['#050508']} />

      <ambientLight intensity={0.45} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.15}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.85} metalness={0.15} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshStandardMaterial
          color="#1a1a22"
          emissive="#ff1493"
          emissiveIntensity={0.08}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      <CameraEntrance onComplete={() => setOrbitEnabled(true)} />

      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={2.5}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 - 0.08}
        enabled={orbitEnabled}
      />
    </>
  )
}
