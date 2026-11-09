import { formatPrice } from "../data.js";

export default function ProductCard({ product, onAdd, onOpen }) {
  return (
    <article className="card">
      <button className="card-img" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        <span>{product.emoji}</span>
      </button>
      <div className="card-body">
        <span className="tag">{product.category}</span>
        <h3 onClick={() => onOpen(product)}>{product.name}</h3>
        <div className="rating">★ {product.rating}</div>
        <div className="card-foot">
          <strong>{formatPrice(product.price)}</strong>
          <button className="btn primary small" onClick={() => onAdd(product.id)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}