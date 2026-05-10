import React from 'react'
import styles from './CartDrawer.module.css'

export default function CartDrawer({ items, total, onRemove, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={e => e.stopPropagation()}>
        <div className={styles.drawerHead}>
          <h2 className={styles.title}>Tu carrito</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>🛒</span>
            <p>Tu carrito está vacío</p>
            <p className={styles.emptyHint}>¡Agrega algo que te guste!</p>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {items.map(item => (
                <li key={item.id} className={styles.item}>
                  <span className={styles.itemEmoji}>{item.emoji}</span>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>S/ {item.price} × {item.qty}</p>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(item.id)}
                    aria-label={`Quitar ${item.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalAmt}>S/ {total}</span>
              </div>
              {/* 
                PAGO CON CULQI — cuando tengas tu API key:
                <CulqiCheckout amount={total * 100} onSuccess={handleSuccess} />
                
                O un botón de WhatsApp para coordinar:
              */}
              <a
                className={styles.btnCheckout}
                href={`https://wa.me/51998429841?text=${encodeURIComponent(
                  '¡Hola! Quiero comprar:\n' +
                  items.map(i => `- ${i.name} x${i.qty} (S/ ${i.price * i.qty})`).join('\n') +
                  `\n\nTotal: S/ ${total}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Pedir por WhatsApp
              </a>
              <p className={styles.hint}>También aceptamos Yape / Plin / Efectivo</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
