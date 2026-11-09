import { useState } from "react";
import { formatPrice } from "../data.js";

const FREE_SHIPPING_ABOVE = 999;
const SHIPPING_FEE = 60;

export default function Checkout({ items, subtotal, onClose, onPlaceOrder }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", payment: "cod" });
  const [error, setError] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.address.trim()) return setError("Name and address are required.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email address.");
    if (!/^\d{10}$/.test(form.phone)) return setError("Enter a 10-digit phone number.");
    onPlaceOrder({ ...form, subtotal, shipping, total });
  }

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h2>Checkout</h2>
        {error && <p className="error">{error}</p>}

        <label>Full name<input value={form.name} onChange={set("name")} autoFocus /></label>
        <div className="grid">
          <label>Email<input type="email" value={form.email} onChange={set("email")} /></label>
          <label>Phone<input inputMode="numeric" maxLength={10} value={form.phone} onChange={set("phone")} /></label>
        </div>
        <label>Delivery address<textarea rows="3" value={form.address} onChange={set("address")} /></label>
        <label>Payment method
          <select value={form.payment} onChange={set("payment")}>
            <option value="cod">Cash on delivery</option>
            <option value="upi">UPI (demo)</option>
            <option value="card">Card (demo)</option>
          </select>
        </label>

        <div className="summary">
          <div className="total-row"><span>Items ({items.reduce((n, i) => n + i.qty, 0)})</span><span>{formatPrice(subtotal)}</span></div>
          <div className="total-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
          <div className="total-row grand"><span>Total</span><strong>{formatPrice(total)}</strong></div>
        </div>

        <p className="muted">Demo store: no real payment is taken and no data leaves your browser.</p>

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Back</button>
          <button type="submit" className="btn primary">Place order</button>
        </div>
      </form>
    </div>
  );
}