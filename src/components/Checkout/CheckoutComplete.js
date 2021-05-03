import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckoutComplete = (props) => {
  const receipt = JSON.parse(localStorage.getItem('receipt'));
  const [customerReceipt, setCustomerReceipt] = useState(receipt);

  useEffect(() => {
    props.setCheckout(true);
  }, [props]);

  console.log('receipt object parsed', customerReceipt);

  const removeReceipt = () => {
    localStorage.removeItem('receipt');
  };

  return (
    <>
      {/*
    TODO finish order complete
    */}
      <h1>Your order is complete</h1>
    </>
  );
};

export default CheckoutComplete;
