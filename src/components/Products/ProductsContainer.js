import React from 'react';
import { useStore } from '../../state/store';
import Categories from '../Categories/Categories';
import ProductsList from './ProductsList';

const ProductsContainer = ({
  onAddToCart,

  setProductName,
  setBreadcrumbs,
}) => {
  const products = useStore((state) => state.products);

  const renderProductList = () => {
    return <ProductsList products={products} setProductName={setProductName} />;
  };
  return <>{renderProductList()}</>;
};

export default ProductsContainer;
