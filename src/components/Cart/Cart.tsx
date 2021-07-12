import React from 'react';
import CartItem from './CartItem';
import { useHistory } from 'react-router-dom';

const Cart = (
  {
    // cart,
    // onUpdateCartQty,
    // onRemoveFromCart,
    // onEmptyCart,
    // isOpen,
    // setIsOpen,
    // setCheckout,
  }
) => {
  let history = useHistory();

  // const goToCheckout = (e) => {
  //   history.push(`/checkout/${cart.id}`);
  //   localStorage.setItem('cart-id', cart.id);
  //   setIsOpen(false);
  //   setCheckout(true);
  // };

  // const renderEmptyCart = () => {
  //   if (cart.total_unique_items > 0) {
  //     return;
  //   }

  //   return (
  //     <>
  //       <p className="cart__none">
  //         You have no items in your shopping cart, start adding some!
  //       </p>
  //       <button onClick={() => setIsOpen(!isOpen)}>Close Cart</button>
  //     </>
  //   );
  // };

  // const renderCart = () => {
  //   if (cart.total_unique_items === 0) {
  //     return;
  //   }

  //   return (
  //     <>
  //       {cart.line_items.map((lineItem) => (
  //         <CartItem
  //           item={lineItem}
  //           key={lineItem.id}
  //           onUpdateCartQty={onUpdateCartQty}
  //           onRemoveFromCart={onRemoveFromCart}
  //           className="cart__inner"
  //         />
  //       ))}
  //       <div className="cart__total">
  //         <p className="cart__total-title">Subtotal:</p>
  //         <p className="cart__total-price">
  //           {cart.subtotal.formatted_with_symbol}
  //         </p>
  //       </div>
  //       <button className="cart__btn-empty" onClick={handleEmptyCart}>
  //         Empty cart
  //       </button>
  //       <button onClick={goToCheckout}>Checkout</button>
  //       <button onClick={() => setIsOpen(!isOpen)}>Close Cart</button>
  //     </>
  //   );
  // };

  // const handleEmptyCart = () => {
  //   onEmptyCart();
  // };

  // return (
  //   <div className="cart" data-active={isOpen}>
  //     <h4 className="cart__heading">Your Shopping Cart</h4>
  //     {renderEmptyCart()}
  //     {renderCart()}
  //   </div>
  // );
};

export default Cart;
