import React, { useCallback, useMemo, useEffect } from 'react';
import { useProductsStore } from '../../store/ProductsStore';
import HomeItem from './HomeItem';
import { cats } from '../../utils/cats';

const Home = ({ orderedCats }) => {
  // const orderedCats = useProductsStore((state) => state.orderedCats);
  console.log('orderedCats', orderedCats);

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

export default Home;
