import React from 'react';
import ProductsList from '../Products/ProductsList';

const Main = ({ products, onAddToCart }) => {
  return (
    <div className="main">
      <h1>Maple Chase Golf &amp; Country Club </h1>
      <h2>Golf Shop</h2>
      <ProductsList products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Main;
