import React, { useState } from 'react'
import styles from './ProductCard.module.css'
import ProductModal from './ProductModal'

const TAG_COLORS = {
  HOT:   styles.tagHot,
  NUEVO: styles.tagNew,
  WOW:   styles.tagWow,
}

export default function ProductCard({ product, onAdd }) {
  const [showModal, setShowModal] = useState(false)
  const price = product.price ?? product.precio
  const was = product.was ?? product.precio_antes
  const discount = was ? Math.round((1 - price / was) * 100) : 0
  const tagClass = TAG_COLORS[product.tag] || styles.tagDefault

  return (
    <>
      <article className={styles.card} onClick={() => setShowModal(true)} style={{cursor:'pointer'}}>
        <div className={styles.imgArea}>
          {product.tag && (
            <span className={`${styles.tag} ${tagClass}`}>{product.tag}</span>
          )}
          {product.imagen_url
            ? <img src={product.imagen_url} alt={product.nombre || product.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:8}} />
            : <span className={styles.emoji}>{product.emoji}</span>
          }
        </div>
        <div className={styles.body}>
          <p className={styles.name}>{product.nombre || product.name}</p>
          <div className={styles.prices}>
            <span className={styles.price}>S/ {price}</span>
            {was && <span className={styles.was}>S/ {was}</span>}
            {discount > 0 && <span className={styles.save}>-{discount}%</span>}
          </div>
          <button
            className={styles.btnAdd}
            onClick={e => { e.stopPropagation(); onAdd(product) }}
          >
            + Agregar
          </button>
        </div>
      </article>

      {showModal && (
        <ProductModal
          product={product}
          onAdd={onAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}