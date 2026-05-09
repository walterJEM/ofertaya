import React from 'react'
import styles from './Header.module.css'

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        OFERTA<span>YA</span>
      </div>
      <div className={styles.right}>
        <button className={styles.cartBtn} onClick={onCartClick} aria-label="Ver carrito">
          🛒 <span className={styles.cartBadge}>{cartCount}</span>
        </button>
        <div className={styles.location}>LIMA, PE</div>
      </div>
    </header>
  )
}
