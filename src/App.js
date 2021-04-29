import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import './styles/css/index.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, PrivateRoute } from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log('There was an error fetching the products', error);
    }
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [setCart]);

  return (
    <Router>
      <Header
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
        checkout={checkout}
        setCheckout={setCheckout}
      />

      <Switch>
        <Route
          exact
          path="/"
          component={
            loading
              ? () => <span>isloading still</span>
              : () => (
                  <Main
                    products={products}
                    onAddToCart={handleAddToCart}
                    setCheckout={setCheckout}
                  />
                )
          }
        />
        {/* <PrivateRoute 
        need to add back*/}
        <Route
          exact
          path={`/checkout/:id`}
          component={
            loading
              ? () => <span>isloading still</span>
              : () => <Checkout cart={cart} setCheckout={setCheckout} />
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
