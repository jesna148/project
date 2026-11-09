import { formatPrice } from "../data.js";

export default function ProductModal({ product, onClose, onAdd }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        <div className="big-emoji">{product.emoji}</div>
        <div>
          <span className="tag">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="rating">★ {product.rating}</div>
          <p>{product.description}</p>
          <p className="muted">{product.stock} in stock</p>
          <div className="card-foot">
            <strong className="big-price">{formatPrice(product.price)}</strong>
            <button
              className="btn primary"
              onClick={() => {
                onAdd(product.id);
                onClose();
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}