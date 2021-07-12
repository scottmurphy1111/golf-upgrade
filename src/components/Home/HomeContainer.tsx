import React, { useState, useEffect, useCallback } from 'react';
import shallow from 'zustand/shallow';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { useProductsStore } from '../../store/ProductsStore';
import { cats } from '../../utils/cats';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import Home from './Home';
import HomeItem from './HomeItem';

const HomeContainer = () => {
  const categories = useProductsStore((state) => state.categories, shallow);
  const loading = useProductsStore((state) => state.loading, shallow);
  const setLoading = useProductsStore((state) => state.setLoading, shallow);
  const orderedCats = useProductsStore((state) => state.orderedCats);
  const setOrderedCats = useProductsStore((state) => state.setOrderedCats);
  const [localCats, setLocalCats] = useState(orderedCats);

  useEffect(() => {
    setLocalCats(orderedCats);
  }, [orderedCats]);

  console.log('getttttt', localCats);

  const isMountedRef = useIsMountedRef();

  // setLoading(false);

  return (
    <div className="home-container">
      <h2>Pick A Category To Get Started!</h2>
      <ul>
        {orderedCats &&
          orderedCats.map((category) => (
            <HomeItem key={category.id} category={category} />
          ))}
      </ul>
    </div>
  );
};

export default HomeContainer;
