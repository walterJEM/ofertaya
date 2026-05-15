import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import ProductModal from '../components/ProductModal'
import { useCart } from '../hooks/useCart'

export default function Producto() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    async function loadProduct() {
      const nombre = slug.replace(/-/g, ' ')
      const { data } = await supabase
        .from('productos')
        .select('*, fotos:producto_fotos(url, orden)')
        .ilike('nombre', nombre)
        .eq('activo', true)
        .single()
      setProduct(data)
      setLoading(false)
    }
    loadProduct()
  }, [slug])

  if (loading) return <div style={{textAlign:'center',padding:'4rem',fontSize:'2rem'}}>⏳ Cargando...</div>
  if (!product) return <div style={{textAlign:'center',padding:'4rem'}}>
    <p>Producto no encontrado 😢</p>
    <button onClick={() => navigate('/')} style={{padding:'0.75rem 2rem',background:'#6c63ff',color:'white',border:'none',borderRadius:8,cursor:'pointer',marginTop:'1rem'}}>
      Ver todos los productos
    </button>
  </div>

  return (
    <div>
      <div style={{padding:'1rem',background:'#6c63ff'}}>
        <button onClick={() => navigate('/')} style={{background:'none',border:'none',color:'white',cursor:'pointer',fontSize:'1rem'}}>
          ← Volver a la tienda
        </button>
      </div>
      <ProductModal
        product={product}
        onAdd={addItem}
        onClose={() => navigate('/')}
        inline={true}
      />
    </div>
  )
}