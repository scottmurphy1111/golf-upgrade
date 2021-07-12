import React, { useState, useEffect, useMemo } from 'react';
import { useProductsStore } from '../../store/ProductsStore';

import ProductItem from './ProductItem';

import LoaderComponent from '../LoaderComponent/LoaderComponent';
import useIsMountedRef from '../../hooks/useIsMountedRef';

const ProductsList = ({ setProductName }: any) => {
  const loading = useProductsStore((state) => state.loading);
  const setLoading = useProductsStore((state) => state.setLoading);
  const products = useProductsStore<any>((state) => state.products);
  const fetchProductsByCategory = useProductsStore(
    (state) => state.fetchProductsByCategory
  );
  const setProducts = useProductsStore((state) => state.setProducts);
  const selectedCats = useProductsStore((state) => state.selectedCats);

  const [viewingProduct, setViewingProduct] = useState(false);
  const [productId, setProductId] = useState('');

  const isMountedRef = useIsMountedRef();

  const handleGetProducts = async () => {
    // const products = await fetchProductsByCategory(['shop-all']);
    // console.log('plist products', products);
  };

  // handleGetProducts();

  const handleProductSelect = (id: string) => {
    setProductId(id);
    setViewingProduct(true);
  };

  // fetch products by categories
  // useEffect(() => {
  //   const fetchProductsByCategory = async (slugs = ['shop-all']) => {
  //     console.log('passed slugs', slugs);
  //     try {
  //       const { data } = await commerce.products.list({
  //         category_slug: slugs,
  //       });
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log('There was an error fetch products by categories', error);
  //     }
  //   };

  //   fetchProductsByCategory(selectedCats);
  // }, [selectedCats, setProducts, setLoading]);

  return (
    <div className="products-list">
      {/* {!products && products.length < 1 ? (
        <LoaderComponent />
      ) : (
        // products.map((product: Object) => (
        //   // <ProductItem
        //   //   // key={(product.id!)}
        //   //   product={product}
        //   //   // setViewingProduct={setViewingProduct}
        //   //   setProductId={handleProductSelect}
        //   //   setProductName={setProductName}
        //   // />
        // ))
      )} */}
    </div>
  );
};

export default ProductsList;
