export const HERO_SLIDES = [
  {
    id: 1,
    tag: 'New Arrivals',
    title: 'Bring Nature\nInside Your Home',
    subtitle: 'Handpicked rare & exotic plants delivered fresh to your doorstep across India.',
    cta: 'Shop Now',
    offer: null,
    bg: 'linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 100%)',
    img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=700&q=80',
    accent: '#2e7d32',
  },
  {
    id: 2,
    tag: '🔥 Flash Sale',
    title: 'Up to 60% Off\nAll Fruit Plants',
    subtitle: 'Grafted mango, guava, lemon & more. Limited stock — order before they run out!',
    cta: 'Grab Deals',
    offer: '60% OFF',
    bg: 'linear-gradient(135deg,#fff8e1 0%,#ffe082 100%)',
    img: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=700&q=80',
    accent: '#f57f17',
  },
  {
    id: 3,
    tag: 'Free Delivery',
    title: 'Free Shipping\non Orders ₹699+',
    subtitle: 'Every plant is carefully packed and shipped with a 7-day live guarantee.',
    cta: 'Explore Plants',
    offer: 'FREE SHIP',
    bg: 'linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%)',
    img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700&q=80',
    accent: '#1565c0',
  },
];

export const CATEGORIES = [
  { id: 'all',    label: 'All Plants',         emoji: '🌿' },
  { id: 'fruit',  label: 'Fruit Plants',        emoji: '🍋' },
  { id: 'mango',  label: 'Mango',               emoji: '🥭' },
  { id: 'flower', label: 'Flower Plants',       emoji: '🌸' },
  { id: 'indoor', label: 'Indoor Plants',       emoji: '🪴' },
  { id: 'herb',   label: 'Herbs',               emoji: '🌱' },
  { id: 'rare',   label: 'Rare & Exotic',       emoji: '✨' },
];

export const PRODUCTS = [
  { id:1,  name:'Alphonso Mango Grafted Plant',          category:'mango',  price:899,  mrp:1999, rating:4.8, reviews:342, stock:12, img:'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=500&q=80',  tag:'Bestseller', delivery:'3–5 days', desc:'The king of mangoes, grafted for early fruiting. Produces sweet Alphonso mangoes within 2–3 years. Comes in a 6-inch pot, 1.5–2 ft height.' },
  { id:2,  name:'Money Plant Golden Pothos',             category:'indoor', price:199,  mrp:449,  rating:4.9, reviews:891, stock:50, img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&q=80',  tag:'Top Rated',  delivery:'2–4 days', desc:'The classic air-purifying indoor plant. Trails beautifully from shelves and pots. Extremely low maintenance and hard to kill.' },
  { id:3,  name:'Rambutan Hybrid Fruit Plant',           category:'fruit',  price:999,  mrp:2998, rating:4.7, reviews:57,  stock:5,  img:'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&q=80',  tag:'Rare',       delivery:'4–6 days', desc:'A tropical exotic fruit plant grafted for home gardens. Produces juicy red rambutan fruits. Height 1.5–2 ft, ready to fruit in 2 years.' },
  { id:4,  name:'Adenium Desert Rose – Double Petal',   category:'flower', price:349,  mrp:799,  rating:4.9, reviews:201, stock:20, img:'https://images.unsplash.com/photo-1490750967868-88df5691cc48?w=500&q=80',  tag:'Flash Sale', delivery:'3–5 days', desc:'Stunning double-petal blooms in vibrant pink and red. Extremely drought-tolerant, perfect for balcony gardens. Grafted for prolific flowering.' },
  { id:5,  name:'Tulsi Holy Basil (Pack of 2)',          category:'herb',   price:149,  mrp:349,  rating:4.8, reviews:289, stock:80, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',  tag:'Value Pack', delivery:'2–3 days', desc:'Sacred and medicinal Tulsi plant. Two healthy plants per pack. Repels mosquitoes, purifies air, and has countless Ayurvedic uses.' },
  { id:6,  name:'Hybrid Guava Taiwan Pink',              category:'fruit',  price:449,  mrp:999,  rating:4.5, reviews:112, stock:15, img:'https://images.unsplash.com/photo-1536591375667-f539fa91cfc6?w=500&q=80',  tag:'50% Off',    delivery:'3–5 days', desc:'Sweet pink-fleshed guava that fruits 3–4 times a year. Grafted for dwarf growth, perfect for pots and terraces.' },
  { id:7,  name:'Fiddle Leaf Fig – Indoor Statement',   category:'indoor', price:699,  mrp:1499, rating:4.6, reviews:78,  stock:8,  img:'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',  tag:'Trending',   delivery:'3–5 days', desc:'The internet\'s favourite statement plant. Large glossy fiddle-shaped leaves. Comes 3–4 ft tall in a ceramic-style pot.' },
  { id:8,  name:'Bougainvillea Paper Flower – Red',     category:'flower', price:279,  mrp:599,  rating:4.7, reviews:165, stock:25, img:'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500&q=80',  tag:'Popular',    delivery:'2–4 days', desc:'Brilliant red bracts that bloom year-round in sunny spots. Perfect for fences, trellises, and balcony railings.' },
  { id:9,  name:'Kaffir Lime Hybrid Plant',             category:'fruit',  price:549,  mrp:1199, rating:4.6, reviews:63,  stock:10, img:'https://images.unsplash.com/photo-1590502160462-58b41354f588?w=500&q=80',  tag:'New',        delivery:'3–5 days', desc:'Aromatic kaffir lime with distinctive double leaves. Fruits heavily in pots. Leaves used in cooking, fruits for juice and medicinal use.' },
  { id:10, name:'Snake Plant Sansevieria Laurentii',    category:'indoor', price:399,  mrp:849,  rating:5.0, reviews:512, stock:35, img:'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500&q=80',  tag:'Top Rated',  delivery:'2–4 days', desc:'NASA-approved air purifier. Releases oxygen at night, making it perfect for bedrooms. Thrives on neglect — water once a week.' },
  { id:11, name:'Hibiscus Rosa Sinensis – Yellow',      category:'flower', price:229,  mrp:499,  rating:4.4, reviews:94,  stock:18, img:'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80',  tag:'Seasonal',   delivery:'3–5 days', desc:'Large cheerful yellow blooms used in hair care, tea, and religious offerings. Blooms daily in warm weather.' },
  { id:12, name:'Dwarf Chili Bonsai Plant',             category:'rare',   price:799,  mrp:1799, rating:4.8, reviews:41,  stock:6,  img:'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&q=80',  tag:'Rare',       delivery:'4–6 days', desc:'A stunning ornamental chili plant trained as a bonsai. Produces hundreds of tiny hot chillies. Conversation-starter for any space.' },
];

export const TESTIMONIALS = [
  { id:1, name:'Priya Sharma',    city:'Mumbai',    rating:5, text:'Got my mango plant within 4 days, packed perfectly. Already seeing new leaves. 10/10 service!',             avatar:'https://i.pravatar.cc/60?img=47' },
  { id:2, name:'Rahul Verma',     city:'Delhi',     rating:5, text:'Ordered 5 indoor plants. All arrived healthy and lush. The packaging was absolutely secure.',             avatar:'https://i.pravatar.cc/60?img=12' },
  { id:3, name:'Ananya Das',      city:'Kolkata',   rating:5, text:'The Adenium plant is blooming within a month of purchase! HGreenQ quality is unmatched.',                avatar:'https://i.pravatar.cc/60?img=32' },
  { id:4, name:'Kiran Patel',     city:'Bangalore', rating:4, text:'Great variety and fast delivery. The tulsi plants were big and healthy. Will definitely order again.',    avatar:'https://i.pravatar.cc/60?img=21' },
  { id:5, name:'Suresh Nair',     city:'Chennai',   rating:5, text:'7-day live guarantee gave me confidence. Plants were exactly as described. Highly recommend HGreenQ.',    avatar:'https://i.pravatar.cc/60?img=55' },
];

export const NAV_LINKS = [
  { id:'home',    label:'Home' },
  { id:'shop',    label:'Shop' },
  { id:'about',   label:'About' },
  { id:'contact', label:'Contact' },
];

export const DELIVERY_CITIES = ['Mumbai','Delhi','Kolkata','Bangalore','Chennai','Hyderabad','Pune','Ahmedabad','Jaipur','Lucknow'];
