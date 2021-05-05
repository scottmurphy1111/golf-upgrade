import React, { useState, useEffect } from 'react';
import Categories from '../Categories/Categories';
import ProductItem from './ProductItem';
import ProductPage from './ProductPage';

const ProductsList = ({
  products,
  onAddToCart,
  setSingleProduct,
  categories,
}) => {
  const [viewingProduct, setViewingProduct] = useState(false);
  const [productId, setProductId] = useState('');

  const handleProductSelect = (id) => {
    // console.log('product selected', id);
    setProductId(id);
    setViewingProduct(true);
  };

  const renderViewingProductList = () => {
    return (
      <>
        <Categories categories={categories} />
        <div className="products-list">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              setViewingProduct={setViewingProduct}
              setProductId={handleProductSelect}
              setSingleProduct={setSingleProduct}
            />
          ))}
        </div>
      </>
    );
  };

  // const renderViewingSingleProduct = () => {
  //   return <ProductPage product={singleProduct} onAddToCart={onAddToCart} />;
  // };

  return renderViewingProductList(); // ? renderViewingSingleProduct()
};

export default ProductsList;
