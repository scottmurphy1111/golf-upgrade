import React, { useState, useEffect } from 'react';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

const Header = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  console.log('header started', { cart });
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
        <nav>
          <ul>
            <li>Apparel</li>
            <li>Shoes</li>
            <li>Clubs</li>
            <li>Balls</li>
            <li>Misc Equipment</li>
            <li className="cart-icon" onClick={() => setIsOpen(!isOpen)}>
              {cart.total_unique_items ? (
                <span className="cart-count">{cart.total_unique_items}</span>
              ) : null}
            </li>
          </ul>
        </nav>
      </header>
      {cart.id && (
        <Cart
          cart={cart}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onUpdateCartQty={onUpdateCartQty}
          onRemoveFromCart={onRemoveFromCart}
          onEmptyCart={onEmptyCart}
        />
      )}
    </div>
  );
};

export default Header;
