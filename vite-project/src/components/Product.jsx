import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onClick, isRecommended = false }) => {
  // Check if the image is a URL
  const isUrl = product.image.startsWith('http');

  return (
    <div 
      onClick={() => onClick(product)}
      className="product-card"
    >
      {isRecommended && (
        <div className="recommended-badge">
          <Sparkles size={12} />
          <span>Recommended</span>
        </div>
      )}

      {/* Image / Emoji */}
      <div className="product-image">
        {isUrl ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span className="emoji">{product.image}</span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-category">{product.category}</div>
        <div className="product-footer">
          <div className="product-rating">
            <Star size={14} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
          <div className="product-price">${product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
