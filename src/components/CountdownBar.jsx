import React from 'react'
import { useCountdown } from '../hooks/useCountdown'
import styles from './CountdownBar.module.css'

export default function CountdownBar() {
  const { h, m, s } = useCountdown()

  return (
    <div className={styles.bar}>
      <div className={styles.label}>
        <span>🔥</span> Oferta del día termina en:
      </div>
      <div className={styles.timer}>
        <span className={styles.box}>{h}</span>
        <span className={styles.sep}>:</span>
        <span className={styles.box}>{m}</span>
        <span className={styles.sep}>:</span>
        <span className={styles.box}>{s}</span>
      </div>
    </div>
  )
}
