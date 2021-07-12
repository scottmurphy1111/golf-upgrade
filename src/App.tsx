import React, { useState, useEffect, useCallback } from 'react';
import { commerce } from './lib/commerce';
import { Route, Switch } from 'react-router-dom';

//Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import PrivateRoute from './utils/PrivateRoute';
import PrivateRouteReceipt from './utils/PrivateRouteReceipt';
import CheckoutComplete from './components/Checkout/CheckoutComplete';
import CheckoutContainer from './components/Checkout/CheckoutContainer';
import ProductPage from './components/Products/ProductPage';
import Home from './components/Home/Home';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import { useProductsStore } from './store/ProductsStore';
import ProductsContainer from './components/Products/ProductsContainer';
import Categories from './components/Categories/Categories';
import shallow from 'zustand/shallow';
import HomeContainer from './components/Home/HomeContainer';
import { cats } from './utils/cats';
import LoaderComponent from './components/LoaderComponent/LoaderComponent';
import {
  // handleUpdateCartQty,
  // handleRemoveFromCart,
  // handleEmptyCart,
  // handleSetFilteredProducts,
  // useHandleAddToCart,
  useFetchCart,
} from './api';

const App = () => {
  const categories = useProductsStore((state) => state.categories, shallow);
  const loading = useProductsStore((state) => state.loading, shallow);
  const orderedCats = useProductsStore((state) => state.orderedCats, shallow);
  const setLoading = useProductsStore((state) => state.setLoading, shallow);
  const setOrderedCats = useProductsStore((state) => state.setOrderedCats);

  const products = useProductsStore(useCallback((state) => state.products, []));
  const setProducts = useProductsStore((state) => state.setProducts);

  const product = useProductsStore((state) => state.product);
  const setProduct = useProductsStore((state) => state.setProduct);

  const setCategories = useProductsStore((state) => state.setCategories);

  const selectedCats = useProductsStore((state) => state.selectedCats);

  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);
  const [productId, setProductId] = useState(null);

  const [productName, setProductName] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategorySlugs, setFilterCategorySlugs] = useState([]);

  // useEffect(() => {
  //   fetchCart();
  // }, [setCart]);

  // useEffect(() => {
  //   const reOrderCats = categories.reduce((acc, category) => {
  //     cats.mainCats.map((cat, i) => {
  //       return category.slug === cat
  //         ? ((acc[i] = category), (acc[i]['image'] = 'placeholder.png'))
  //         : null;
  //     });

  //     return acc;
  //   }, []);
  //   setLoading(false);
  //   setOrderedCats(reOrderCats);

  //   // if (isMountedRef.current) {
  // }, [categories, orderedCats, setLoading, setOrderedCats]);

  console.log('useStorye', useProductsStore());
  console.log('store ordered cats', orderedCats);

  return (
    <>
      {/* <Header
        cart={cart}
        // onUpdateCartQty={handleUpdateCartQty}
        // onRemoveFromCart={handleRemoveFromCart}
        // onEmptyCart={handleEmptyCart}
        // checkout={checkout}
        setCheckout={setCheckout}
      /> */}
      <Breadcrumbs productName={productName} />
      {/* <Main
        setCheckout={setCheckout}
        categories={categories}
        // handleSetFilterCategorySlugs={handleSetFilteredProducts}
        filterCategorySlugs={filterCategorySlugs}
        setFilteredProducts={setFilteredProducts}
      /> */}
      <div className="main-container container">
        <Route exact path="/products/*" component={() => <Categories />} />
        <Switch>
          <Route
            exact
            path="/products"
            component={() => (
              <>
                {/* <ProductsContainer
                  // {...props}
                  products={products}
                  setProduct={setProduct}
                  categories={categories}
                  setProductName={setProductName}
                  // handleSetFilterCategorySlugs={handleSetFilteredProducts}
                  filterCategorySlugs={filterCategorySlugs}
                  setFilteredProducts={setFilteredProducts}
                /> */}
              </>
            )}
          />
          <Route
            exact
            path="/products/:slug"
            component={() => (
              <>
                {/* <ProductsContainer
                  {...props}
                  products={filteredProducts}
                  setProduct={setProduct}
                  categories={categories}
                  setProductName={setProductName}
                  // handleSetFilterCategorySlugs={handleSetFilteredProducts}
                  filterCategorySlugs={filterCategorySlugs}
                  setFilteredProducts={setFilteredProducts}
                /> */}
              </>
            )}
          />

          <Route
            exact
            path={`/product/:id`}
            component={() => (
              <>
                {/* <ProductPage
                {...props}
                product={product}
                // onAddToCart={handleAddToCart}
                // onUpdateCartQty={handleUpdateCartQty}
              /> */}
              </>
            )}
          />

          {/* <PrivateRoute
            exact
            path={`/checkout/:id`}
            component={(props) => (
              <CheckoutContainer
                {...props}
                cart={cart}
                setCheckout={setCheckout}
                setCart={setCart}
                setReceipt={setReceipt}
              />
            )}
          /> */}
          <PrivateRouteReceipt
            component={CheckoutComplete}
            path={`/order-complete/:checkoutToken/:orderId`}
            setCheckout={setCheckout}
          />
          <Route exact path="/*" component={() => <HomeContainer />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
