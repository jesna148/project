export const CATEGORIES = ["Groceries", "Kitchen", "Electronics", "Fashion", "Home"];

export const products = [
  { id: 1, name: "Malabar Black Pepper 250g", category: "Groceries", price: 349, rating: 4.7, emoji: "🌶️", stock: 40, description: "Bold, aromatic Tellicherry-grade peppercorns, sun-dried and packed fresh." },
  { id: 2, name: "Green Cardamom 100g", category: "Groceries", price: 499, rating: 4.8, emoji: "🌿", stock: 25, description: "Plump, fragrant cardamom pods from the Idukki hills." },
  { id: 3, name: "Cold-Pressed Coconut Oil 1L", category: "Groceries", price: 389, rating: 4.6, emoji: "🥥", stock: 30, description: "Traditional wood-pressed oil, ideal for cooking and hair care." },
  { id: 4, name: "Cast Iron Kadai", category: "Kitchen", price: 1299, rating: 4.5, emoji: "🍳", stock: 12, description: "Pre-seasoned 10-inch kadai that gets better with every use." },
  { id: 5, name: "Stainless Steel Pressure Cooker 5L", category: "Kitchen", price: 1899, rating: 4.4, emoji: "🥘", stock: 18, description: "Induction-friendly cooker with a safety valve and gasket release." },
  { id: 6, name: "Wireless Earbuds", category: "Electronics", price: 1799, rating: 4.2, emoji: "🎧", stock: 50, description: "Bluetooth 5.3, 24-hour battery with the charging case." },
  { id: 7, name: "Smart LED Bulb (Pack of 2)", category: "Electronics", price: 699, rating: 4.3, emoji: "💡", stock: 60, description: "16 million colours, voice-assistant compatible, 9W." },
  { id: 8, name: "Handloom Cotton Mundu", category: "Fashion", price: 899, rating: 4.7, emoji: "👘", stock: 20, description: "Soft Kuthampully-style cotton with a traditional kasavu border." },
  { id: 9, name: "Canvas Tote Bag", category: "Fashion", price: 349, rating: 4.1, emoji: "👜", stock: 70, description: "Sturdy everyday tote with an inner zip pocket." },
  { id: 10, name: "Brass Nilavilakku Lamp", category: "Home", price: 1499, rating: 4.9, emoji: "🪔", stock: 9, description: "Hand-finished traditional lamp, 12 inches tall." },
  { id: 11, name: "Coir Door Mat", category: "Home", price: 249, rating: 4.0, emoji: "🧽", stock: 80, description: "Natural coir fibre mat, durable and eco-friendly." },
  { id: 12, name: "Bamboo Storage Basket Set", category: "Home", price: 599, rating: 4.4, emoji: "🧺", stock: 35, description: "Set of three woven baskets for neat, stylish storage." },
];

export const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);