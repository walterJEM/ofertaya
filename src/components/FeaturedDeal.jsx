import React from 'react'
import styles from './FeaturedDeal.module.css'

export default function FeaturedDeal({ product, onAdd }) {
  const name = product.nombre || product.name || ''
  const desc = product.descripcion || product.desc || ''
  const price = product.precio ?? product.price ?? 0
  const was = product.precio_antes ?? product.was ?? 0
  const discount = was ? Math.round((1 - price / was) * 100) : 0
  const stock = product.stock || 0
  const maxStock = product.stock_max || product.maxStock || 40
  const stockPct = Math.round((stock / maxStock) * 100)

  return (
    <div className={styles.card}>
      <div className={styles.badge}>⚡ OFERTA DEL DÍA</div>
      <div className={styles.imgArea}>
        {product.imagen_url
          ? <img src={product.imagen_url} alt={name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:12}} />
          : <span className={styles.emoji}>{product.emoji}</span>
        }
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.priceRow}>
          <span className={styles.priceNow}>S/ {price}</span>
          {was > 0 && <span className={styles.priceWas}>S/ {was}</span>}
          {discount > 0 && <span className={styles.discPill}>-{discount}%</span>}
        </div>
        <button className={styles.btnBuy} onClick={() => onAdd(product)}>
          Quiero esto ahora
        </button>
        <div className={styles.stockBar}>
          <div className={styles.stockLabel}>
            <span>Stock disponible</span>
            <span className={styles.stockAlert}>¡Solo {stock} quedan!</span>
          </div>
          <div className={styles.stockTrack}>
            <div className={styles.stockFill} style={{ width: `${stockPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}