 import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, products, formatPrice } from "./data.js";
import ProductCard from "./components/ProductCard.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CartDrawer from "./components/cartDrawer.jsx";
import Checkout from "./components/Checkout.jsx";

const CART_KEY = "react-shop:cart";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

export default function App() {
  const [cart, setCart] = useState(loadCart); // { [productId]: qty }
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
    const sorted = [...list];
    if (sortBy === "low") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "high") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [query, category, sortBy]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: products.find((p) => p.id === Number(id)), qty }))
        .filter((i) => i.product),
    [cart]
  );
  const count = cartItems.reduce((n, i) => n + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  function addToCart(id) {
    const product = products.find((p) => p.id === id);
    setCart((c) => {
      const next = Math.min((c[id] || 0) + 1, product.stock);
      return { ...c, [id]: next };
    });
    setToast(`${product.name} added to cart`);
  }

  function setQty(id, qty) {
    const product = products.find((p) => p.id === id);
    setCart((c) => {
      const copy = { ...c };
      if (qty <= 0) delete copy[id];
      else copy[id] = Math.min(qty, product.stock);
      return copy;
    });
  }

  function removeItem(id) {
    setCart((c) => {
      const copy = { ...c };
      delete copy[id];
      return copy;
    });
  }

  function placeOrder(details) {
    const id = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrder({ id, ...details, count });
    setCart({});
    setCheckoutOpen(false);
    setCartOpen(false);
  }

  return (
    <>
      <header className="header">
        <div className="container header-in">
          <div className="logo">🛍️ Kerala Mart</div>
          <input
            className="search"
            type="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn primary cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart <span className="count">{count}</span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Fresh finds, delivered home</h1>
          <p>Free shipping on orders above {formatPrice(999)}.</p>
        </div>
      </section>

      <main className="container">
        <div className="filters">
          <div className="chips">
            {["All", ...CATEGORIES].map((c) => (
              <button key={c} className={`chip ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Sort: Featured</option>
            <option value="low">Price: Low to high</option>
            <option value="high">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <p className="empty">No products found.</p>
        ) : (
          <div className="grid-products">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} onOpen={setSelected} />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">© {new Date().getFullYear()} Kerala Mart · Demo store</footer>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />}

      {cartOpen && (
        <CartDrawer
          items={cartItems}
          total={subtotal}
          onClose={() => setCartOpen(false)}
          onQty={setQty}
          onRemove={removeItem}
          onCheckout={() => {
            setCheckoutOpen(true);
          }}
        />
      )}

      {checkoutOpen && (
        <Checkout
          items={cartItems}
          subtotal={subtotal}
          onClose={() => setCheckoutOpen(false)}
          onPlaceOrder={placeOrder}
        />
      )}

      {order && (
        <div className="overlay" onClick={() => setOrder(null)}>
          <div className="modal confirm" onClick={(e) => e.stopPropagation()}>
            <div className="big-emoji">✅</div>
            <h2>Order placed!</h2>
            <p>Thanks, {order.name}. Your order <strong>{order.id}</strong> for {formatPrice(order.total)} is confirmed.</p>
            <p className="muted">We'll send updates to {order.email}.</p>
            <button className="btn primary" onClick={() => setOrder(null)}>Continue shopping</button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}