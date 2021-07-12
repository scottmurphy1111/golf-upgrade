import React, { useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { useProductsStore } from '../../store/ProductsStore';
import Categories from '../Categories/Categories';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import ProductsList from './ProductsList';
import { useFetch } from '../../hooks/useFetch';
import { useFetchProducts } from '../../api';

const ProductsContainer = ({
  onAddToCart,

  setProductName,
  setBreadcrumbs,
}) => {
  // const products = useProductsStore((state) => state.products);
  const loading = useProductsStore((state) => state.loading);
  const setLoading = useProductsStore((state) => state.setLoading);
  const setProducts = useProductsStore((state) => state.setProducts);
  const selectedCats = useProductsStore((state) => state.selectedCats);

  const products = useFetchProducts();

  const renderProductList = () => {
    return <ProductsList {...products} setProductName={setProductName} />;
  };
  return <>{renderProductList()}</>;
};

export default ProductsContainer;
