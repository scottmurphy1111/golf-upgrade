import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Route, useHistory } from 'react-router-dom';

//Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import PrivateRoute from './utils/PrivateRoute';
import PrivateRouteReceipt from './utils/PrivateRouteReceipt';
import CheckoutComplete from './components/Checkout/CheckoutComplete';
import CheckoutContainer from './components/Checkout/CheckoutContainer';
import ProductPage from './components/Products/ProductPage';
import ProductsList from './components/Products/ProductsList';
import Home from './components/Home/Home';

const App = () => {
  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [singleProduct, setSingleProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryView, setCategoryView] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list();
        console.log('data', data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log('There was an error fetching the products', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('firing fsp');
    const productId = localStorage.getItem('product-id');
    if (productId) {
      commerce.products
        .retrieve(productId)
        .then((product) => {
          setSingleProduct(product);
        })

        .catch((error) => {
          console.error(`Cannot get product ${productId}`, error);
        });

      // return () => {
      //   localStorage.removeItem('product-id');
      // };
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await commerce.categories.list();

        console.log('res', res);
        setCategories(res.data);
      } catch (error) {
        console.log('There was an error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await commerce.cart.retrieve();
      setCart(response);
    } catch (error) {
      console.error('There was an error fetching the cart', error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    console.log('fired');
    console.log('pid', productId, quantity);
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

  const handleCategorySelect = (slug) => {
    setCategoryView(slug);
    history.push(`/products/${slug}`);
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
      <Main setCheckout={setCheckout} />
      <div className="main-container container">
        <Route
          exact
          path="/"
          component={
            loading
              ? () => <span>loading</span>
              : (props) => (
                  <Home
                    {...props}
                    categories={categories}
                    setCategories={setCategories}
                    setCategoryView={handleCategorySelect}
                  />
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
                  <ProductsList
                    {...props}
                    products={products}
                    setSingleProduct={setSingleProduct}
                    categories={categories}
                  />
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
                    product={singleProduct}
                    onAddToCart={handleAddToCart}
                    onUpdateCartQty={handleUpdateCartQty}
                  />
                )
          }
        />
      </div>

      {/* <PrivateRoute 
        need to add back*/}
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
      <Footer />
    </>
  );
};

export default App;
