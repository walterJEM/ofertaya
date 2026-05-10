import React from 'react'
import styles from './ProductCard.module.css'

const TAG_COLORS = {
  HOT:   styles.tagHot,
  NUEVO: styles.tagNew,
  WOW:   styles.tagWow,
}

export default function ProductCard({ product, onAdd }) {
  const price = product.price ?? product.precio
  const was = product.was ?? product.precio_antes
  const discount = was ? Math.round((1 - price / was) * 100) : 0
  const tagClass = TAG_COLORS[product.tag] || styles.tagDefault

  return (
    <article className={styles.card}>
      <div className={styles.imgArea}>
        {product.tag && (
          <span className={`${styles.tag} ${tagClass}`}>{product.tag}</span>
        )}
        {/* When using real image: <img src={product.imagen} alt={product.name} /> */}
        <span className={styles.emoji}>{product.emoji}</span>
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.prices}>
          <span className={styles.price}>S/ {product.price}</span>
          <span className={styles.was}>S/ {product.was}</span>
          <span className={styles.save}>-{discount}%</span>
        </div>
        <button
          className={styles.btnAdd}
          onClick={() => onAdd(product)}
        >
          + Agregar
        </button>
      </div>
    </article>
  )
}
