// =============================================
// PRODUCTOS — Edita aquí para agregar/quitar
// =============================================
// Para agregar un producto nuevo solo copia un
// objeto y cambia los valores. ¡Así de fácil!
// =============================================

export const FEATURED = {
  id: 'feat-1',
  emoji: '🎧',
  name: 'Audífonos Bluetooth Pro Max',
  desc: 'Sonido envolvente 360°, 30h de batería, cancelación de ruido activa. No necesitas gastar de más para escuchar increíble.',
  price: 49,
  was: 139,
  stock: 7,
  maxStock: 40,
  // imagen: '/images/audifonos.jpg'  ← cuando tengas foto real, usa esto
}

export const PRODUCTS = [
  {
    id: 'p1',
    emoji: '🔦',
    name: 'Linterna táctica recargable',
    price: 18,
    was: 45,
    tag: 'HOT',
    cat: ['menos20'],
    // imagen: '/images/linterna.jpg'
  },
  {
    id: 'p2',
    emoji: '🧴',
    name: 'Set de 5 cremas hidratantes',
    price: 22,
    was: 58,
    tag: 'NUEVO',
    cat: ['regalo'],
  },
  {
    id: 'p3',
    emoji: '🖥️',
    name: 'Soporte plegable para laptop',
    price: 35,
    was: 80,
    tag: null,
    cat: ['tech'],
  },
  {
    id: 'p4',
    emoji: '🌡️',
    name: 'Termómetro digital de frente',
    price: 19,
    was: 49,
    tag: 'HOT',
    cat: ['menos20'],
  },
  {
    id: 'p5',
    emoji: '🧲',
    name: 'Cable magnético 3 en 1',
    price: 15,
    was: 39,
    tag: 'HOT',
    cat: ['menos20', 'tech'],
  },
  {
    id: 'p6',
    emoji: '🪴',
    name: 'Mini invernadero de escritorio',
    price: 28,
    was: 65,
    tag: 'WOW',
    cat: ['wao'],
  },
  {
    id: 'p7',
    emoji: '🔌',
    name: 'Regleta USB 6 puertos',
    price: 32,
    was: 75,
    tag: null,
    cat: ['hogar', 'tech'],
  },
  {
    id: 'p8',
    emoji: '🎮',
    name: 'Control inalámbrico gamepad',
    price: 45,
    was: 99,
    tag: 'HOT',
    cat: ['tech'],
  },
  {
    id: 'p9',
    emoji: '💡',
    name: 'Foco LED inteligente RGB',
    price: 12,
    was: 30,
    tag: '⏰',
    cat: ['hogar', 'menos20'],
  },
  {
    id: 'p10',
    emoji: '👜',
    name: 'Organizador de cartera portátil',
    price: 17,
    was: 40,
    tag: null,
    cat: ['regalo', 'menos20'],
  },
  {
    id: 'p11',
    emoji: '🧊',
    name: 'Mini ventilador USB silencioso',
    price: 20,
    was: 48,
    tag: 'NUEVO',
    cat: ['menos20'],
  },
  {
    id: 'p12',
    emoji: '📦',
    name: 'Set sellador al vacío para ropa',
    price: 25,
    was: 60,
    tag: 'WOW',
    cat: ['wao', 'hogar'],
  },
]

export const CATEGORIES = [
  { id: 'all',     label: 'Todo' },
  { id: 'menos20', label: 'Menos de S/20' },
  { id: 'wao',     label: '😱 No puede ser real' },
  { id: 'regalo',  label: '🎁 Para regalar' },
  { id: 'hogar',   label: '🏠 Hogar' },
  { id: 'tech',    label: '📱 Tech' },
]
