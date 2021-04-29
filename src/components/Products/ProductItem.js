import React, { useState } from 'react';
import ProductOverlay from './ProductOverlay';

const ProductItem = ({ product, onAddToCart, setProductId }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  // const { result } = stripHtml(product.description);
  // console.log('result', result);

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  };

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };
  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  // const handleProductDetails = (id) => {
  //   console.log('id', id);
  //   setViewingProduct(true);
  //   setProductId(id);
  // };

  return (
    <div
      className="product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* product.media.source */}
      <>
        <div className="product__image">
          <img
            src={`${process.env.PUBLIC_URL}/blueprint-irons.png`}
            alt={product.name}
          />
        </div>
        <div className="product__info">
          <h4 className="product__name">{product.name}</h4>
          {/* <p className="product__description">
          {/* product description stripped of html tags */}
          {/* {result} */}
          {/*</p> */}
          <div className="product__details">
            <p className="product__price">
              {product.price.formatted_with_symbol}
            </p>
          </div>
        </div>
      </>
      <ProductOverlay
        showOverlay={showOverlay}
        id={product.id}
        setProductId={setProductId}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductItem;
