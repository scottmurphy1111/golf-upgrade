import React from 'react';
import ProductsList from '../Products/ProductsList';
import SidePanel from '../SidePanel/SidePanel';

const Main = ({ products, onAddToCart }) => {
  return (
    <div className="main">
      <h1>Maple Chase Golf &amp; Country Club </h1>
      <h2>Golf Shop</h2>
      <div className="main-container">
        <div className="products-container">
          <ProductsList products={products} onAddToCart={onAddToCart} />
        </div>
        <div className="side-panel-container">
          <SidePanel />
        </div>
      </div>
    </div>
  );
};

export default Main;
