import React, { useEffect } from 'react';
import { X, Star, ShoppingBag } from 'lucide-react';
import './Productdetail.css';

const ProductDetailModal = ({ product, onClose, onAddToViewed }) => {
  useEffect(() => {
    onAddToViewed(product.id);
  }, [product.id, onAddToViewed]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        <div className="modal-body">
          <div className="modal-image">{product.image}</div>
          <div className="modal-details">
            <div className="modal-category">{product.category}</div>
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-description">{product.description}</p>
            <div className="modal-tags">
              {product.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
            <div className="modal-meta">
              <div className="modal-rating">
                <Star size={20} fill="currentColor" />
                <span>{product.rating} / 5.0</span>
              </div>
              <div className="modal-price">${product.price}</div>
            </div>
            <button className="btn-primary">
              <ShoppingBag size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;