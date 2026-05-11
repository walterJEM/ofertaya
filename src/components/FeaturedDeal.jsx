import React, { useState } from 'react'
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

  const todasLasFotos = [
    ...(product.imagen_url ? [{ url: product.imagen_url }] : []),
    ...(product.fotos || []).sort((a, b) => a.orden - b.orden)
  ]

  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + todasLasFotos.length) % todasLasFotos.length)
  const next = () => setCurrent(c => (c + 1) % todasLasFotos.length)

  return (
    <div className={styles.card}>
      <div className={styles.badge}>⚡ OFERTA DEL DÍA</div>
      <div className={styles.imgArea} style={{position:'relative'}}>
        {todasLasFotos.length > 0 ? (
          <>
            <img src={todasLasFotos[current]?.url} alt={name}
              style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:12}} />
            {todasLasFotos.length > 1 && (
              <>
                <button onClick={prev} style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',background:'rgba(0,0,0,0.5)',color:'white',border:'none',borderRadius:'50%',width:32,height:32,fontSize:'1.1rem',cursor:'pointer'}}>‹</button>
                <button onClick={next} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'rgba(0,0,0,0.5)',color:'white',border:'none',borderRadius:'50%',width:32,height:32,fontSize:'1.1rem',cursor:'pointer'}}>›</button>
                <div style={{position:'absolute',bottom:8,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6}}>
                  {todasLasFotos.map((_, i) => (
                    <div key={i} onClick={() => setCurrent(i)} style={{width:8,height:8,borderRadius:'50%',background: i === current ? 'white' : 'rgba(255,255,255,0.5)',cursor:'pointer'}} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <span className={styles.emoji}>{product.emoji}</span>
        )}
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