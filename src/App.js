import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import './styles/css/index.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  console.log('cart', cart);

  const fetchProducts = () => {
    console.log('fetching products');
    commerce.products
      .list()
      .then((products) => {
        console.log('prodssss', products);
        setProducts(products.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('There was an error fetching the products', error);
      });
  };

  const fetchCart = () => {
    console.log('fetching cart');
    commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart);
      })
      .catch((error) => {
        console.error('There was an error fetching the cart', error);
      });
  };

  const handleAddToCart = (productId, quantity) => {
    commerce.cart
      .add(productId, quantity)
      .then((item) => {
        setCart(item.cart);
      })
      .catch((error) => {
        console.error('There was an error adding the item to the cart', error);
      });
  };

  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart
      .update(lineItemId, { quantity })
      .then((resp) => {
        console.log('resp', resp);
        console.log('cart', cart);
        setCart(resp.cart);
      })
      .catch((error) => {
        console.log('There was an error updating the cart items', error);
      });
  };

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart
      .remove(lineItemId)
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) =>
        console.error(
          'There was an error removing the item from the cart',
          error
        )
      );
  };

  const handleEmptyCart = () => {
    commerce.cart
      .empty()
      .then((resp) => {
        setCart(resp.cart);
      })
      .catch((error) => {
        console.error('There was an error emptying the cart', error);
      });
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
      />

      <Switch>
        <Route
          exact
          path="/"
          component={
            loading
              ? () => <span>isloading still</span>
              : () => <Main products={products} onAddToCart={handleAddToCart} />
          }
        ></Route>
      </Switch>
    </Router>
  );
};

export default App;
