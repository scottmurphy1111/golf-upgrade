import React, { useState, useEffect } from 'react';

const Home = ({ categories, setCategoryView }) => {
  const [loading, setLoading] = useState(true);
  const [orderedCats, setOrderedCats] = useState();
  useEffect(() => {
    const order = {
      0: 'Shop All',
      1: 'Mens',
      2: 'Womens',
      3: 'Juniors',
      4: 'Equipment',
      5: 'Sale',
    };

    const orderCats = categories.reduce((acc, category) => {
      Object.keys(order).map((key) => {
        return category.name === order[key]
          ? ((acc[key] = category), (acc[key]['image'] = 'placeholder.png'))
          : null;
      });

      return acc;
    }, []);

    setOrderedCats(orderCats);
    setLoading(false);
  }, [categories]);

  console.log('ordered', orderedCats);
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
              onClick={() => setCategoryView(category.slug)}
            >
              <div className="category__content">{category.name}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
