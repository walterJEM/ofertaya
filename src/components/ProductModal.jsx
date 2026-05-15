import React, { useState } from 'react'

export default function ProductModal({ product, onClose, onAdd, inline }) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const fotos = product.fotos?.length > 0 
    ? [{ url: product.imagen_url }, ...product.fotos.sort((a,b) => a.orden - b.orden)]
    : product.imagen_url ? [{ url: product.imagen_url }] : []

  const content = (
    <div style={{background:'white',borderRadius: inline ? 0 : 16,maxWidth: inline ? '100%' : 500,width:'100%',maxHeight: inline ? 'none' : '90vh',overflowY:'auto'}}>
      
      {/* Foto principal */}
      <div style={{position:'relative'}}>
        {fotos.length > 0 ? (
          <img src={fotos[currentPhoto]?.url} alt={product.nombre}
            style={{width:'100%',height:300,objectFit:'cover',borderRadius: inline ? 0 : '16px 16px 0 0'}} />
        ) : (
          <div style={{width:'100%',height:300,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'5rem',background:'#f5f5f5'}}>
            {product.emoji}
          </div>
        )}
        {!inline && (
          <button onClick={onClose} style={{position:'absolute',top:12,right:12,background:'rgba(0,0,0,0.5)',color:'white',border:'none',borderRadius:'50%',width:32,height:32,fontSize:'1.2rem',cursor:'pointer'}}>✕</button>
        )}
        {product.tag && (
          <span style={{position:'absolute',top:12,left:12,background:'#ff4444',color:'white',padding:'4px 10px',borderRadius:20,fontSize:'0.8rem',fontWeight:'bold'}}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Miniaturas */}
      {fotos.length > 1 && (
        <div style={{display:'flex',gap:'0.5rem',padding:'0.75rem',overflowX:'auto'}}>
          {fotos.map((f, i) => (
            <img key={i} src={f.url} alt={i} onClick={() => setCurrentPhoto(i)}
              style={{width:60,height:60,objectFit:'cover',borderRadius:8,cursor:'pointer',border: i === currentPhoto ? '3px solid #6c63ff' : '3px solid transparent'}} />
          ))}
        </div>
      )}

      {/* Info */}
      <div style={{padding:'1.25rem'}}>
        <h2 style={{margin:'0 0 0.5rem',fontSize:'1.3rem'}}>{product.nombre}</h2>
        <p style={{color:'#666',margin:'0 0 1rem',lineHeight:1.5}}>{product.descripcion}</p>
        
        <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1.25rem'}}>
          <span style={{fontSize:'1.5rem',fontWeight:'bold',color:'#6c63ff'}}>S/ {product.precio}</span>
          {product.precio_antes && (
            <span style={{textDecoration:'line-through',color:'#aaa',fontSize:'1rem'}}>S/ {product.precio_antes}</span>
          )}
          {product.precio_antes && (
            <span style={{background:'#ff4444',color:'white',padding:'2px 8px',borderRadius:20,fontSize:'0.8rem'}}>
              -{Math.round((1 - product.precio / product.precio_antes) * 100)}%
            </span>
          )}
        </div>

        <button onClick={() => { onAdd(product); if (!inline) onClose() }}
          style={{width:'100%',padding:'0.9rem',background:'#6c63ff',color:'white',border:'none',borderRadius:10,fontSize:'1rem',fontWeight:'bold',cursor:'pointer'}}>
          🛒 Agregar al carrito
        </button>
      </div>
    </div>
  )

  if (inline) return content

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}}>
      <div onClick={e => e.stopPropagation()}>
        {content}
      </div>
    </div>
  )
}