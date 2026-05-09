# 🛒 Chapala.pe

> **Chápala antes que se acabe.** Tienda de descubrimiento de ofertas hecha para peruanos.

Chapala.pe es una tienda online de ofertas al estilo "impulse shopping" — el producto te encuentra a ti, no al revés. Inspirada en la Cachina de La Victoria y los mercados de pulgas, pero en versión digital y moderna.

---

## ¿Qué es Chapala.pe?

La idea es simple: compramos productos en oferta (1 o 2 unidades de cada cosa) de Temu, AliExpress, tiendas locales o cualquier lugar donde haya un buen precio, y los publicamos en la tienda. El cliente hace scroll, descubre algo que no sabía que quería, y lo compra al toque.

**No es una tienda de categorías. Es una tienda de descubrimiento.**

---

## ¿Cómo funciona el modelo de negocio?

1. Encuentras un producto en oferta (ej. algo que en Temu cuesta S/5)
2. Lo publicas en Chapala.pe con un precio razonable (ej. S/18 con envío)
3. El cliente lo ve, le llama la atención, y te escribe por WhatsApp
4. Coordinas el pago por Yape / Plin / Efectivo
5. Compras el producto y lo envías

Stock mínimo — primero vendes, luego recompras si funciona.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Estilos | CSS Modules |
| Pagos | WhatsApp + Yape/Plin (por ahora) |
| Hosting | Vercel (gratis) |
| Repositorio | GitHub |

Sin backend propio por ahora — todo corre en el frontend y los pedidos llegan por WhatsApp.

---

## Estructura del proyecto

```
chapala.pe/
├── src/
│   ├── components/
│   │   ├── Header.jsx           ← barra superior con carrito
│   │   ├── CountdownBar.jsx     ← timer de cuenta regresiva
│   │   ├── FeaturedDeal.jsx     ← oferta del día destacada
│   │   ├── ProductCard.jsx      ← tarjeta de producto en grilla
│   │   └── CartDrawer.jsx       ← carrito lateral + checkout WhatsApp
│   ├── hooks/
│   │   ├── useCart.js           ← lógica del carrito
│   │   └── useCountdown.js      ← lógica del timer
│   ├── data/
│   │   └── products.js          ← ⭐ EDITA AQUÍ TUS PRODUCTOS
│   ├── App.jsx                  ← componente principal
│   └── index.css                ← variables CSS globales
├── public/
│   └── images/                  ← fotos de productos
├── index.html
└── package.json
```

---

## Cómo correrlo localmente

```bash
# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:5173
```

---

## Cómo agregar un producto

Edita `src/data/products.js` y agrega un objeto nuevo:

```js
{
  id: 'p13',               // ID único, no repetir
  emoji: '🎒',             // Emoji temporal (reemplazar con foto)
  name: 'Mochila anti-robo impermeable',
  price: 55,               // Tu precio de venta en soles
  was: 120,                // Precio original (para mostrar el descuento)
  tag: 'NUEVO',            // HOT | NUEVO | WOW | null
  cat: ['regalo', 'tech'], // Categorías del producto
  // imagen: '/images/mochila.jpg'  ← cuando tengas foto real
}
```

---

## Cómo agregar fotos reales

1. Guarda la foto en `public/images/nombre-producto.jpg`
2. En el producto agrega: `imagen: '/images/nombre-producto.jpg'`
3. En `ProductCard.jsx` descomenta la línea del `<img>`

---

## Cómo recibir pedidos por WhatsApp

En `src/components/CartDrawer.jsx` cambia el número:

```js
https://wa.me/51TU_NUMERO_AQUI
```

El mensaje se arma automáticamente con todos los productos del carrito.

---

## Cómo publicar en internet (gratis)

### Vercel — recomendado
```bash
npm install -g vercel
vercel
```
En 2 minutos tienes tu tienda en línea con HTTPS incluido.

### Netlify
```bash
npm run build
# Arrastra la carpeta dist/ a netlify.com/drop
```

---

## Roadmap

- [x] Tienda base con scroll de productos
- [x] Oferta del día con countdown timer
- [x] Carrito con checkout por WhatsApp
- [x] Filtros por categoría / vibe
- [ ] Fotos reales de productos
- [ ] Dominio chapala.pe conectado
- [ ] Pagos con Culqi (tarjetas)
- [ ] Panel admin para agregar productos sin tocar código
- [ ] Integración con Supabase para base de datos
- [ ] Reseñas con fotos de clientes
- [ ] Notificaciones por WhatsApp automáticas

---

## Canales de venta

El tráfico principal viene de redes sociales:

- **TikTok** `@chapala.pe` — videos mostrando productos ("¿sabías que esto existe?")
- **Instagram** `@chapala.pe` — reels de unboxing y ofertas del día
- **WhatsApp** — lista de difusión con la oferta del día

---

## Contacto

- 📱 WhatsApp: +51 998429841
- 📸 Instagram: [@chapala.pe](https://instagram.com/chapala.pe)
- 🎵 TikTok: [@chapala.pe](https://tiktok.com/@chapala.pe)
- 🌐 Web: [chapala.pe](https://chapala.pe)

---

