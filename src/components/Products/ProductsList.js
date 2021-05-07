import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { AppContext } from '../../state/AppContext';
import Categories from '../Categories/Categories';
import ProductItem from './ProductItem';
import ProductPage from './ProductPage';
import { useHistory } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMountedRef';

const ProductsList = ({
  products,
  onAddToCart,
  setSingleProduct,
  categories,
  setProductName,
  setBreadcrumbs,
}) => {
  const [viewingProduct, setViewingProduct] = useState(false);
  const [productId, setProductId] = useState('');

  // breadcrumbs = ['shop', ...breadcrumbs];
  // console.log('bcs', breadcrumbs);

  // useEffect(() => {
  //   if (isMountedRef.current) {
  //     setBreadcrumbs(() => ({
  //       type: 'updateBreadcrumbs',
  //       payload: breadcrumbs,
  //     }));
  //   }
  //   // return () => {
  //   //   isMountedRef.current = false;
  //   // };
  // }, [breadcrumbs, setBreadcrumbs, isMountedRef]);

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
              setProductName={setProductName}
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
