import React, { useState, useEffect } from 'react';
import { commerce } from '../lib/commerce';
import { useProductsStore } from '../store/ProductsStore';

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const selectedCats = useProductsStore((state) => state.selectedCats);

  return { products };
};
