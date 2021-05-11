import React, { useState, useEffect } from 'react';
import { stripHtml } from 'string-strip-html';
import { commerce } from '../../lib/commerce';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../state/store';

const ProductItem = ({
  product,
  onAddToCart,
  setProductId,

  setProductName,
}) => {
  const setProduct = useStore((state) => state.setProduct);

  const [showOverlay, setShowOverlay] = useState(false);

  let history = useHistory();

  const { result } = stripHtml(product.description);

  const handleClick = (product) => {
    window.scrollTo(0, 0);
    setProduct(product);
    setProductName(product.name);
    localStorage.setItem('product-id', product.id);
    history.push(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  };

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };
  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  return (
    <div
      className="product-card"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="product__image">
        <img
          // src={product.media.source}
          src={`${process.env.PUBLIC_URL}/placeholder.png`}
          alt={product.name}
        />
      </div>
      <div className="product__info">
        <div className="product__heading">
          <h3 className="product__name">{product.name}</h3>
          {product.extra_fields.length > 0 && product.extra_fields[0].name && (
            <p className="product__brand">{product.extra_fields[0].name}</p>
          )}
        </div>

        <div className="product__details">
          <p className="product__description">{result}</p>
        </div>
      </div>
      <div className="product__actions">
        {product.inventory.available > 0 ? (
          <p>item in Stock</p>
        ) : (
          <p>out of stock!</p>
        )}
        <p className="product__price">{product.price.formatted_with_symbol}</p>
        <button
          name="product details"
          className="product__btn primary"
          onClick={() => handleClick(product)}
        >
          Product Details
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
