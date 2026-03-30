import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import Scene from './Scene'
import UIOverlay from './UIOverlay'
import styles from './Exhibition.module.css'

export default function Exhibition() {
  const rootRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 1.1, ease: 'power2.out' },
    )
  }, [])

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={`${styles.canvasHost} ${menuOpen ? styles.canvasHostBlurred : ''}`}>
        <Canvas
          shadows
          camera={{ position: [0, 1.5, 4.5], fov: 48, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Scene />
        </Canvas>
      </div>

      <UIOverlay
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onSelectProject={() => {}}
      />
    </div>
  )
}
