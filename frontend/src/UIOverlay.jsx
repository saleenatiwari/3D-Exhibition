import styles from './UIOverlay.module.css'

const projects = [
  { id: '1', label: 'Project 1' },
  { id: '2', label: 'Project 2' },
]

export default function UIOverlay({ menuOpen, onToggleMenu, onSelectProject }) {
  return (
    <div className={styles.overlay}>
      <button
        type="button"
        className={styles.hamburger}
        onClick={onToggleMenu}
        aria-expanded={menuOpen}
        aria-label="Open menu"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      <div
        className={`${styles.scrim} ${menuOpen ? styles.scrimVisible : ''}`}
        onClick={onToggleMenu}
        aria-hidden={!menuOpen}
      />

      <aside
        className={`${styles.panel} ${menuOpen ? styles.panelOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <p className={styles.panelTitle}>Menu</p>
        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={styles.panelItem}
                onClick={() => {
                  console.log('Selected:', p.label)
                  onSelectProject?.(p)
                }}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.bottomBar}>
        <button type="button" className={styles.glassBtn}>
          Back
        </button>
        <button type="button" className={styles.glassBtn}>
          Next
        </button>
      </div>
    </div>
  )
}
