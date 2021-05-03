import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';

const Header = ({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
  setCheckout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   window.addEventListener(
  //     'click',
  //     (e) => {
  //       setIsOpen(!isOpen);
  //     },
  //     []
  //   );

  //   return () => {
  //     window.removeEventListener('click', () => {});
  //   };
  // }, []);

  return (
    <div className="header">
      <header>
        <div className="logo">
          <Link to="/"></Link>
        </div>
        <div className="cart-container">
          <Form>
            <Input icon="search" size="huge" placeholder="Search..." />
          </Form>
          <div
            className={`cart-item ${
              cart.total_unique_items ? 'has-items' : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="cart-icon"></div>
            {cart.total_unique_items ? (
              <span className="cart-count">{cart.total_unique_items}</span>
            ) : null}
          </div>
        </div>
        {/* <nav>
          <ul>
            <li>Apparel</li>
            <li>Shoes</li>
            <li>Clubs</li>
            <li>Balls</li>
            <li>Misc Equipment</li>
            <li
              className={`cart-li ${
                cart.total_unique_items ? 'has-items' : ''
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="cart-icon"></div>
              {cart.total_unique_items ? (
                <span className="cart-count">{cart.total_unique_items}</span>
              ) : null}
            </li>
          </ul>
        </nav> */}
      </header>
      {cart.id && (
        <Cart
          cart={cart}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setCheckout={setCheckout}
          onUpdateCartQty={onUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
          onEmptyCart={onEmptyCart}
        />
      )}
    </div>
  );
};

export default Header;
