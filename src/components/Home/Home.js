import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../state/store';
import { cats } from '../../utils/cats';

const Home = () => {
  const categories = useStore((state) => state.categories);
  const setSelectedCats = useStore((state) => state.setSelectedCats);

  const [loading, setLoading] = useState(true);
  const [orderedCats, setOrderedCats] = useState();

  const history = useHistory();

  const handleCategorySelect = (slug) => {
    setSelectedCats(slug);
    history.push(`/products/${slug}`);
  };

  useEffect(() => {
    const orderCats = categories.reduce((acc, category) => {
      cats.mainCats.map((cat, i) => {
        return category.slug === cat
          ? ((acc[i] = category), (acc[i]['image'] = 'placeholder.png'))
          : null;
      });

      return acc;
    }, []);

    setOrderedCats(orderCats);
    setLoading(false);
  }, [categories]);

  return (
    <div className="home-container">
      <h2>Pick A Category To Get Started!</h2>
      <ul>
        {!loading &&
          orderedCats &&
          orderedCats.map((category) => (
            <li
              key={category.id}
              style={{
                backgroundImage: `url('${process.env.PUBLIC_URL}/${category.image}')`,
              }}
              onClick={() => handleCategorySelect(category.slug)}
            >
              <div className="category__content">{category.name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
