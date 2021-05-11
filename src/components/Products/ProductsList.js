import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { AppContext, useStore } from '../../state/store';
import Categories from '../Categories/Categories';
import ProductItem from './ProductItem';
import ProductPage from './ProductPage';
import { useHistory } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMountedRef';

const ProductsList = ({
  onAddToCart,

  categories,
  setProductName,
  setBreadcrumbs,
  handleSetFilterCategorySlugs,
  filterCategorySlugs,
  setFilteredProducts,
}) => {
  const products = useStore((state) => state.products);
  const [viewingProduct, setViewingProduct] = useState(false);
  const [productId, setProductId] = useState('');

  const handleProductSelect = (id) => {
    setProductId(id);
    setViewingProduct(true);
  };

  return (
    <div className="products-list">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            setViewingProduct={setViewingProduct}
            setProductId={handleProductSelect}
            setProductName={setProductName}
          />
        ))
      ) : (
        <p>Sorry, No products match that criteria!</p>
      )}
    </div>
  );
};

export default ProductsList;
