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
        {product.imagen_url 
          ? <img src={product.imagen_url} alt={product.nombre || product.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:8}} />
          : <span className={styles.emoji}>{product.emoji}</span>
        }
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{product.name ?? product.nombre}</p>
        <div className={styles.prices}>
          <span className={styles.price}>S/ {price}</span>
          <span className={styles.was}>S/ {was}</span>
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
