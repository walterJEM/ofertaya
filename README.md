# OfertaYa 🔥

Tienda de descubrimiento de ofertas. Scroll infinito, oferta del día, carrito y checkout por WhatsApp.

## Stack
- **React + Vite** — frontend rápido y moderno
- **CSS Modules** — estilos organizados por componente
- **Sin backend** — para empezar no necesitas servidor

---

## Cómo correrlo localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

---

## Cómo agregar productos

Edita el archivo `src/data/products.js`. Solo copia un objeto y cambia los valores:

```js
{
  id: 'p13',              // ID único
  emoji: '🎒',            // Emoji del producto
  name: 'Mochila anti-robo',
  price: 55,              // Precio de venta (S/)
  was: 120,               // Precio original (tachado)
  tag: 'NUEVO',           // HOT | NUEVO | WOW | null
  cat: ['regalo', 'tech'], // Categorías (ver CATEGORIES)
  // imagen: '/images/mochila.jpg'  ← foto real cuando la tengas
}
```

---

## Cómo agregar fotos reales

1. Pon tus fotos en la carpeta `public/images/`
2. En el producto, agrega: `imagen: '/images/tu-foto.jpg'`
3. En `ProductCard.jsx`, el `<img>` ya está listo, solo descomenta la línea

---

## Cómo conectar WhatsApp

En `CartDrawer.jsx`, cambia el número:
```
https://wa.me/51999999999  ← reemplaza con tu número
```

---

## Cómo subir a internet (GRATIS)

### Opción 1 — Vercel (recomendado)
```bash
npm install -g vercel
vercel
```
En 2 minutos tienes tu tienda en internet con dominio propio.

### Opción 2 — Netlify
1. Corre `npm run build`
2. Arrastra la carpeta `dist/` a netlify.com/drop

---

## Próximas mejoras sugeridas

- [ ] Conectar Culqi para pagos con tarjeta en Perú
- [ ] Agregar Supabase para manejar productos desde un panel
- [ ] Página de detalle de producto
- [ ] Filtro por precio
- [ ] Búsqueda de productos
- [ ] Sistema de reviews con fotos

---

## Estructura del proyecto

```
ofertaya/
├── src/
│   ├── components/
│   │   ├── Header.jsx          ← barra superior con carrito
│   │   ├── CountdownBar.jsx    ← timer de cuenta regresiva
│   │   ├── FeaturedDeal.jsx    ← oferta del día grande
│   │   ├── ProductCard.jsx     ← tarjeta de producto en grilla
│   │   └── CartDrawer.jsx      ← carrito lateral con WhatsApp
│   ├── hooks/
│   │   ├── useCart.js          ← lógica del carrito
│   │   └── useCountdown.js     ← lógica del timer
│   ├── data/
│   │   └── products.js         ← ← EDITA AQUÍ TUS PRODUCTOS
│   ├── App.jsx                 ← componente principal
│   └── index.css               ← variables CSS globales
├── public/
│   └── images/                 ← pon aquí tus fotos
├── index.html
└── package.json
```
