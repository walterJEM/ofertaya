import { useState, useCallback } from 'react'

export function useCart() {
  const [items, setItems] = useState([])
  const [toast, setToast] = useState(null)

  const addItem = useCallback((product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setToast(`✓ ${product.name} agregado — S/ ${product.price}`)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const count = items.reduce((acc, i) => acc + i.qty, 0)

  return { items, addItem, removeItem, total, count, toast }
}
