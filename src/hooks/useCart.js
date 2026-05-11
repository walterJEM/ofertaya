import { useState, useCallback } from 'react'

export function useCart() {
  const [items, setItems] = useState([])
  const [toast, setToast] = useState(null)

  const addItem = useCallback((product) => {
    const name = product.nombre || product.name || ''
    const price = product.precio ?? product.price ?? 0

    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, name, price, qty: 1 }]
    })
    setToast(`✓ ${name} agregado — S/ ${price}`)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const count = items.reduce((acc, i) => acc + i.qty, 0)

  return { items, addItem, removeItem, total, count, toast }
}