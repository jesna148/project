import { formatPrice } from "../data.js";

export default function CartDrawer({ items, total, onClose, onQty, onRemove, onCheckout }) {
  return (
    <div className="overlay right" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map(({ product, qty }) => (
                <li key={product.id}>
                  <span className="cart-emoji">{product.emoji}</span>
                  <div className="cart-info">
                    <strong>{product.name}</strong>
                    <span className="muted">{formatPrice(product.price)}</span>
                    <div className="qty">
                      <button onClick={() => onQty(product.id, qty - 1)} aria-label="Decrease">−</button>
                      <span>{qty}</span>
                      <button onClick={() => onQty(product.id, qty + 1)} aria-label="Increase">+</button>
                      <button className="link danger" onClick={() => onRemove(product.id)}>Remove</button>
                    </div>
                  </div>
                  <strong>{formatPrice(product.price * qty)}</strong>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="total-row">
                <span>Subtotal</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="btn primary block" onClick={onCheckout}>Proceed to checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}