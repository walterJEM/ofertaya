import React from 'react'
import styles from './FeaturedDeal.module.css'

export default function FeaturedDeal({ product, onAdd }) {
  const discount = Math.round((1 - product.price / product.was) * 100)
  const stockPct = Math.round((product.stock / product.maxStock) * 100)

  return (
    <div className={styles.card}>
      <div className={styles.badge}>⚡ OFERTA DEL DÍA</div>

      <div className={styles.imgArea}>
        {/* Cuando tengas imagen real: <img src={product.imagen} alt={product.name} /> */}
        <span className={styles.emoji}>{product.emoji}</span>
      </div>

      <div className={styles.body}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.desc}>{product.desc}</p>

        <div className={styles.priceRow}>
          <span className={styles.priceNow}>S/ {product.price}</span>
          <span className={styles.priceWas}>S/ {product.was}</span>
          <span className={styles.discPill}>-{discount}%</span>
        </div>

        <button
          className={styles.btnBuy}
          onClick={() => onAdd(product)}
        >
          Quiero esto ahora
        </button>

        <div className={styles.stockBar}>
          <div className={styles.stockLabel}>
            <span>Stock disponible</span>
            <span className={styles.stockAlert}>¡Solo {product.stock} quedan!</span>
          </div>
          <div className={styles.stockTrack}>
            <div className={styles.stockFill} style={{ width: `${stockPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
