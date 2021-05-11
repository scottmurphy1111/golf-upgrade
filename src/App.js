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
import { useStore } from './state/store';
import ProductsContainer from './components/Products/ProductsContainer';
import Categories from './components/Categories/Categories';
import shallow from 'zustand/shallow';

const App = () => {
  const products = useStore(useCallback((state) => state.products, []));
  const setProducts = useStore((state) => state.setProducts);

  const product = useStore((state) => state.product);
  const setProduct = useStore((state) => state.setProduct);

  const categories = useStore((state) => state.categories, shallow);
  const setCategories = useStore((state) => state.setCategories);

  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);
  const [productId, setProductId] = useState(null);

  const [productName, setProductName] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategorySlugs, setFilterCategorySlugs] = useState([]);

  //fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log('There was an error fetching the products', error);
      }
    };
    fetchProducts();
  }, [setProducts]);
  console.log('useStorye', useStore());

  //fetch single product
  useEffect(() => {
    const pId = localStorage.getItem('product-id');
    if (pId) {
      commerce.products
        .retrieve(pId)
        .then((res) => {
          setProduct(res);
        })

        .catch((error) => {
          console.error(`Cannot get product ${pId}`, error);
        });

      return () => {
        localStorage.removeItem('product-id');
      };
    }
  }, [setProduct]);

  //fetch cats
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await commerce.categories.list();

        const catData = data.map((category) => ({
          ...category,
          active: false,
        }));
        setCategories(catData);
      } catch (error) {
        console.log('There was an error fetching categories', error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  // fetch products by categories
  useEffect(() => {
    const fetchProductsByCategory = async (slugs = []) => {
      console.log('passed slugs', slugs);
      try {
        const { data } = await commerce.products.list({
          category_slug: slugs,
        });

        setFilteredProducts(data);
        // setProducts(res.data);
      } catch (error) {
        console.log('There was an error fetch products by categories', error);
      }
    };

    fetchProductsByCategory(filterCategorySlugs);
  }, [filterCategorySlugs]);

  const fetchCart = async () => {
    try {
      const response = await commerce.cart.retrieve();
      setCart(response);
    } catch (error) {
      console.error('There was an error fetching the cart', error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (error) {
      console.error('There was an error adding the item to the cart', error);
    }
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    try {
      const { cart } = await commerce.cart.update(lineItemId, { quantity });
      setCart(cart);
    } catch (error) {
      console.log('There was an error updating the cart items', error);
    }
  };

  const handleRemoveFromCart = async (lineItemId) => {
    try {
      const { cart } = await commerce.cart.remove(lineItemId);
      setCart(cart);
    } catch (error) {
      console.error(
        'There was an error removing the item from the cart',
        error
      );
    }
  };

  const handleEmptyCart = async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      console.error('There was an error emptying the cart', error);
    }
  };

  const handleSetFilteredProducts = (slug) => {
    if (!filterCategorySlugs.includes(slug)) {
      setFilterCategorySlugs([...filterCategorySlugs, slug]);
    } else {
      setFilterCategorySlugs(filterCategorySlugs.filter((cat) => cat !== slug));
    }
  };

  useEffect(() => {
    fetchCart();
  }, [setCart]);

  return (
    <>
      <Header
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
        checkout={checkout}
        setCheckout={setCheckout}
      />
      <Breadcrumbs productName={productName} />
      <Main
        setCheckout={setCheckout}
        categories={categories}
        handleSetFilterCategorySlugs={handleSetFilteredProducts}
        filterCategorySlugs={filterCategorySlugs}
        setFilteredProducts={setFilteredProducts}
      />
      <div className="main-container container">
        <Route exact path="/products/*" component={(props) => <Categories />} />
        <Switch>
          <Route
            exact
            path="/products"
            component={
              loading
                ? () => <span>loading</span>
                : (props) => (
                    <>
                      <ProductsContainer
                        {...props}
                        products={products}
                        setProduct={setProduct}
                        categories={categories}
                        setProductName={setProductName}
                        handleSetFilterCategorySlugs={handleSetFilteredProducts}
                        filterCategorySlugs={filterCategorySlugs}
                        setFilteredProducts={setFilteredProducts}
                      />
                    </>
                  )
            }
          />
          <Route
            exact
            path="/products/:slug"
            component={
              loading
                ? () => <span>loading</span>
                : (props) => (
                    <>
                      <ProductsContainer
                        {...props}
                        products={filteredProducts}
                        setProduct={setProduct}
                        categories={categories}
                        setProductName={setProductName}
                        handleSetFilterCategorySlugs={handleSetFilteredProducts}
                        filterCategorySlugs={filterCategorySlugs}
                        setFilteredProducts={setFilteredProducts}
                      />
                    </>
                  )
            }
          />

          <Route
            exact
            path={`/product/:id`}
            component={
              loading
                ? () => <span>loading...</span>
                : (props) => (
                    <ProductPage
                      {...props}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onUpdateCartQty={handleUpdateCartQty}
                    />
                  )
            }
          />

          <PrivateRoute
            exact
            path={`/checkout/:id`}
            component={
              loading
                ? () => <span>isloading still</span>
                : (props) => (
                    <CheckoutContainer
                      {...props}
                      cart={cart}
                      setCheckout={setCheckout}
                      setCart={setCart}
                      setReceipt={setReceipt}
                    />
                  )
            }
          />
          <PrivateRouteReceipt
            component={CheckoutComplete}
            path={`/order-complete/:checkoutToken/:orderId`}
            setCheckout={setCheckout}
          />
          <Route
            exact
            path="/*"
            component={
              loading
                ? () => <span>loading</span>
                : (props) => <Home {...props} />
            }
          />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
