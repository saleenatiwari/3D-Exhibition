import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.stars} aria-hidden />
      <div className={styles.vignette} aria-hidden />

      <main className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.lineLarge}>
            <span className={styles.flicker}>Welcome</span>
            <span className={styles.rest}> to </span>
          </span>
          <span className={styles.lineLarge}>
            <span className={styles.flicker}>Saleena&rsquo;s 3D Exhibition</span>
          </span>
          <span className={styles.lineSmall}>
            <span className={styles.with}>with Blender</span>
          </span>
        </h1>

        <button
          type="button"
          className={styles.cta}
          onClick={() => navigate('/exhibition')}
        >
          Start Experience
        </button>

        <p className={styles.note}>
          Note: Please use Chrome on desktop for best experience. Performance may vary depending on
          your device.
        </p>
      </main>
    </div>
  )
}
