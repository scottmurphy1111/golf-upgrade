import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { commerce } from '../../lib/commerce';

const ProductsList = ({ products, onAddToCart }) => {
  const [viewingProduct, setViewingProduct] = useState(false);
  const [productId, setProductId] = useState('');
  const [singleProduct, setSingleProduct] = useState({});

  const fetchSingleProduct = async (id) => {
    try {
      const product = await commerce.products.retrieve(id);
      setSingleProduct(product);
    } catch (error) {
      console.error(`Cannot get product ${id}`, error);
    }

    // commerce.products.retrieve(id).then((product) => setSingleProduct(product));
  };

  const handleProductSelect = (id) => {
    console.log('product selected', id);
    setProductId(id);
    setViewingProduct(true);
  };

  useEffect(() => {
    console.log('fetching product');
    fetchSingleProduct(productId);
  }, [productId]);

  const renderViewingProductList = () => {
    return (
      <div className="products-list">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            // setViewingProduct={setViewingProduct}
            setProductId={handleProductSelect}
          />
        ))}
      </div>
    );
  };

  const renderViewingSingleProduct = () => {
    return <h2>{singleProduct.name}</h2>;
  };

  return viewingProduct
    ? renderViewingSingleProduct()
    : renderViewingProductList();
};

export default ProductsList;
