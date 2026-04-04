import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'
import gsap from 'gsap'
import mugUrl from './assets/Mug1_self.glb'
import pinBoardUrl from './assets/PinBoard1.glb'

// ── Camera entrance (unchanged) ───────────────────────────────────────
function CameraEntrance() {
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
    })
  }, [camera])

  return null
}

// ── Project 1 — Mug ──────────────────────────────────────────────────
function MugScene() {
  const { scene } = useGLTF(mugUrl)

  return (
    <>
      {/* Ambient — ensures no face is completely black */}
      <ambientLight intensity={1.2} />

      {/* Key light — directly in front and slightly above, main illumination */}
      <directionalLight position={[1, 3, 5]} intensity={3.5} />

      {/* Fill light — front-left, softer, opens up shadow side */}
      <directionalLight position={[-3, 1, 4]} intensity={1.8} />

      {/* Top light — adds definition to the top surface */}
      <directionalLight position={[0, 5, 1]} intensity={1.0} />

      <group>
        <Center>
          <primitive object={scene} scale={2} />
        </Center>
      </group>
    </>
  )
}

// ── Project 2 — Pin Board ────────────────────────────────────────────
function PinBoardScene() {
  const { scene } = useGLTF(pinBoardUrl)

  return (
    <>
      {/* Ambient — ensures no face is completely black */}
      <ambientLight intensity={1.2} />

      {/* Key light — directly in front and slightly above, main illumination */}
      <directionalLight position={[1, 3, 5]} intensity={3.5} />

      {/* Fill light — front-left, softer, opens up shadow side */}
      <directionalLight position={[-3, 1, 4]} intensity={1.8} />

      {/* Top light — adds definition to the top surface */}
      <directionalLight position={[0, 5, 1]} intensity={1.0} />

      <group>
        <Center>
          <primitive object={scene} scale={2} />
        </Center>
      </group>
    </>
  )
}

// ── Root scene component ─────────────────────────────────────────────
export default function Scene({ projectId = 1 }) {
  return (
    <>
      <color attach="background" args={['#050508']} />

{projectId === 1 && <MugScene />}
      {projectId === 2 && <PinBoardScene />}

      <CameraEntrance />

      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={2.5}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 - 0.08}
      />
    </>
  )
}

// Eager-load both models so they're ready before user navigates to them
useGLTF.preload(mugUrl)
useGLTF.preload(pinBoardUrl)
