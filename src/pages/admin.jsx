import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const PASSWORD = 'ofertaya123'

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio: '', precio_antes: '',
    emoji: '', tag: '', stock: '', activo: true, destacado: false
  })
  const [editId, setEditId] = useState(null)
  const [foto, setFoto] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [fotosExtra, setFotosExtra] = useState([])

  useEffect(() => { if (auth) loadProducts() }, [auth])

  async function loadProducts() {
    const { data } = await supabase.from('productos').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
  }

  function startEdit(p) {
    setEditId(p.id)
    setForm({
      nombre: p.nombre || '',
      descripcion: p.descripcion || '',
      precio: p.precio || '',
      precio_antes: p.precio_antes || '',
      emoji: p.emoji || '',
      tag: p.tag || '',
      stock: p.stock || '',
      activo: p.activo,
      destacado: p.destacado,
    })
    setMsg('')
    window.scrollTo(0, 0)
  }

  function cancelEdit() {
    setEditId(null)
    setForm({ nombre: '', descripcion: '', precio: '', precio_antes: '', emoji: '', tag: '', stock: '', activo: true, destacado: false })
    setFoto(null)
    setMsg('')
  }

  async function saveProduct(e) {
    e.preventDefault()
    setLoading(true)
    let imagen_url = undefined

    if (foto) {
      const ext = foto.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('productos').upload(fileName, foto)
      if (uploadError) { setMsg('Error subiendo foto: ' + uploadError.message); setLoading(false); return }
      const { data: urlData } = supabase.storage.from('productos').getPublicUrl(fileName)
      imagen_url = urlData.publicUrl
    }

    const payload = {
    ...form,
    precio: parseFloat(form.precio) || 0,
    precio_antes: form.precio_antes ? parseFloat(form.precio_antes) : null,
    stock: parseInt(form.stock) || 0,
    }
    if (imagen_url !== undefined) payload.imagen_url = imagen_url

    let error, savedId = editId
    if (editId) {
      ({ error } = await supabase.from('productos').update(payload).eq('id', editId))
    } else {
      const { data: newData, error: insertError } = await supabase.from('productos').insert([{ ...payload, imagen_url: imagen_url || '' }]).select()
      error = insertError
      if (newData && newData[0]) savedId = newData[0].id
    }

    if (error) { setMsg('Error: ' + error.message); setLoading(false); return }

    // Subir fotos adicionales
    if (fotosExtra.length > 0 && savedId) {
      for (const f of fotosExtra) {
        const ext = f.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()}.${ext}`
        const { error: upErr } = await supabase.storage.from('productos').upload(fileName, f)
        if (!upErr) {
          const { data: urlData } = supabase.storage.from('productos').getPublicUrl(fileName)
          await supabase.from('producto_fotos').insert([{ producto_id: savedId, url: urlData.publicUrl, orden: 0 }])
        }
      }
      setFotosExtra([])
    }

    setMsg(editId ? '✅ Producto actualizado!' : '✅ Producto agregado!')
    cancelEdit()
    setLoading(false)
    loadProducts()
  }

  async function deleteProduct(id) {
    if (!confirm('¿Eliminar este producto?')) return
    await supabase.from('productos').delete().eq('id', id)
    loadProducts()
  }

  async function toggleActive(id, activo) {
    await supabase.from('productos').update({ activo: !activo }).eq('id', id)
    loadProducts()
  }

  if (!auth) return (
    <div style={{maxWidth:400,margin:'4rem auto',padding:'2rem',fontFamily:'sans-serif'}}>
      <h2>🔐 Admin OfertaYa</h2>
      <input type="password" placeholder="Contraseña" value={pass} onChange={e => setPass(e.target.value)}
        style={{width:'100%',padding:'0.5rem',marginBottom:'1rem',fontSize:'1rem'}} />
      <button onClick={() => pass === PASSWORD ? setAuth(true) : setMsg('❌ Contraseña incorrecta')}
        style={{width:'100%',padding:'0.75rem',background:'#6c63ff',color:'white',border:'none',borderRadius:8,fontSize:'1rem',cursor:'pointer'}}>
        Entrar
      </button>
      {msg && <p style={{color:'red',marginTop:'1rem'}}>{msg}</p>}
    </div>
  )

  return (
    <div style={{maxWidth:800,margin:'2rem auto',padding:'1rem',fontFamily:'sans-serif'}}>
      <h2>🛠️ Panel Admin</h2>

      <form onSubmit={saveProduct} style={{background: editId ? '#fff3e0' : '#f5f5f5',padding:'1.5rem',borderRadius:12,marginBottom:'2rem',border: editId ? '2px solid #ff9800' : 'none'}}>
        <h3>{editId ? '✏️ Editando Producto' : '➕ Agregar Producto'}</h3>
        {[['nombre','Nombre'],['descripcion','Descripción'],['emoji','Emoji'],['tag','Tag (HOT/NUEVO/WOW)'],['precio','Precio S/'],['precio_antes','Precio antes S/'],['stock','Stock']].map(([key, label]) => (
          <div key={key} style={{marginBottom:'0.75rem'}}>
            <label style={{display:'block',marginBottom:4}}>{label}</label>
            <input value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
              style={{width:'100%',padding:'0.5rem',borderRadius:6,border:'1px solid #ccc',fontSize:'1rem'}} />
          </div>
        ))}
        <div style={{marginBottom:'0.75rem'}}>
          <label style={{display:'block',marginBottom:4}}>📷 Foto del producto</label>
          <input type="file" accept="image/*" onChange={e => setFoto(e.target.files[0])}
            style={{width:'100%',padding:'0.5rem',borderRadius:6,border:'1px solid #ccc',fontSize:'1rem'}} />
          {foto && <p style={{fontSize:'0.85rem',color:'green',marginTop:4}}>✅ {foto.name}</p>}
        </div>
        {editId && (
        <div style={{marginBottom:'0.75rem'}}>
            <label style={{display:'block',marginBottom:4}}>📷 Fotos adicionales</label>
            <input type="file" accept="image/*" multiple onChange={e => setFotosExtra(Array.from(e.target.files))}
            style={{width:'100%',padding:'0.5rem',borderRadius:6,border:'1px solid #ccc',fontSize:'1rem'}} />
            {fotosExtra.length > 0 && <p style={{fontSize:'0.85rem',color:'green',marginTop:4}}>✅ {fotosExtra.length} foto(s) seleccionada(s)</p>}
        </div>
        )}



        <div style={{display:'flex',gap:'1rem',marginBottom:'0.75rem'}}>
          <label><input type="checkbox" checked={form.destacado} onChange={e => setForm({...form, destacado: e.target.checked})} /> Destacado</label>
          <label><input type="checkbox" checked={form.activo} onChange={e => setForm({...form, activo: e.target.checked})} /> Activo</label>
        </div>
        <div style={{display:'flex',gap:'0.75rem'}}>
          <button type="submit" disabled={loading}
            style={{padding:'0.75rem 2rem',background: editId ? '#ff9800' : '#6c63ff',color:'white',border:'none',borderRadius:8,fontSize:'1rem',cursor:'pointer'}}>
            {loading ? 'Guardando...' : editId ? 'Actualizar' : 'Agregar Producto'}
          </button>
          {editId && (
            <button type="button" onClick={cancelEdit}
              style={{padding:'0.75rem 2rem',background:'#888',color:'white',border:'none',borderRadius:8,fontSize:'1rem',cursor:'pointer'}}>
              Cancelar
            </button>
          )}
        </div>
        {msg && <p style={{marginTop:'0.5rem',color: msg.includes('✅') ? 'green' : 'red'}}>{msg}</p>}
      </form>

      <h3>📦 Productos ({products.length})</h3>
      {products.map(p => (
        <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem',background:p.activo?'white':'#eee',borderRadius:8,marginBottom:'0.5rem',border:'1px solid #ddd'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
            {p.imagen_url ? <img src={p.imagen_url} alt={p.nombre} style={{width:50,height:50,objectFit:'cover',borderRadius:6}} /> : <span style={{fontSize:'1.5rem'}}>{p.emoji}</span>}
            <div>
              <strong>{p.nombre}</strong>
              <span style={{marginLeft:'0.5rem',color:'#888'}}>S/ {p.precio}</span>
              {p.destacado && <span style={{marginLeft:'0.5rem',background:'gold',padding:'2px 8px',borderRadius:4,fontSize:'0.75rem'}}>⭐</span>}
            </div>
          </div>
          <div style={{display:'flex',gap:'0.5rem'}}>
            <button onClick={() => startEdit(p)}
              style={{padding:'0.4rem 0.75rem',borderRadius:6,border:'none',cursor:'pointer',background:'#2196f3',color:'white'}}>
              Editar
            </button>
            <button onClick={() => toggleActive(p.id, p.activo)}
              style={{padding:'0.4rem 0.75rem',borderRadius:6,border:'none',cursor:'pointer',background: p.activo ? '#ff9800' : '#4caf50',color:'white'}}>
              {p.activo ? 'Ocultar' : 'Mostrar'}
            </button>
            <button onClick={() => deleteProduct(p.id)}
              style={{padding:'0.4rem 0.75rem',borderRadius:6,border:'none',cursor:'pointer',background:'#f44336',color:'white'}}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}