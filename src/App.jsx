import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import CountdownBar from './components/CountdownBar'
import FeaturedDeal from './components/FeaturedDeal'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import { useCart } from './hooks/useCart'
import { CATEGORIES } from './data/products'
import { supabase } from './supabase'
import styles from './App.module.css'

export default function App() {
  const { items, addItem, removeItem, total, count, toast } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase
        console.log('datos de supabase:', data)
        .from('productos')
        .select('*')
        .eq('activo', true)
        .order('created_at', { ascending: false })

      if (data) {
        const feat = data.find(p => p.destacado)
        setFeatured(feat || data[0])
        setProducts(data.filter(p => !p.destacado))
      }
      setLoading(false)
    }
    loadProducts()
  }, [])

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.categoria?.includes(activeCategory))

  if (loading) return <div style={{textAlign:'center',padding:'4rem',fontSize:'2rem'}}>⏳ Cargando...</div>

  return (
    <>
      <Header cartCount={count} onCartClick={() => setCartOpen(true)} />
      <CountdownBar />
      <main className={styles.main}>
        {featured && <FeaturedDeal product={featured} onAdd={addItem} />}
        <section aria-label="Filtrar productos">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Explorar por vibe</h2>
          </div>
          <div className={styles.cats}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.catPill} ${activeCategory === cat.id ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>
        <section aria-label="Productos en oferta">
          <div className={styles.grid}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onAdd={addItem} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className={styles.noResults}>No hay productos aún. 🛒</p>
          )}
        </section>
        <div className={styles.bannerSurprise} role="banner">
          <div>
            <h3 className={styles.bannerTitle}>Caja Sorpresa</h3>
            <p className={styles.bannerSub}>3 productos al azar por solo S/ 35 🎲</p>
          </div>
          <span className={styles.bannerEmoji}>🎁</span>
        </div>
        <footer className={styles.footer}>
          <p>© 2025 Chapala.pe · Lima, Perú</p>
          <div className={styles.footerLinks}>
            <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://instagram.com/chapala.pe" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com/@chapala.pe" target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </footer>
      </main>
      {cartOpen && (
        <CartDrawer items={items} total={total} onRemove={removeItem} onClose={() => setCartOpen(false)} />
      )}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  )
}