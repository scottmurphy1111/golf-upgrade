import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useProductsStore } from '../../store/ProductsStore';

const HomeItem = ({ category }) => {
  const setSelectedCats = useProductsStore((state) => state.setSelectedCats);

  const history = useHistory();

  const handleCategorySelect = (slug) => {
    setSelectedCats([slug]);
    history.push(`/products/${slug}`);
  };

  return (
    <>
      <li
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/${category.image}')`,
        }}
        onClick={() => handleCategorySelect(category.slug)}
      >
        <div className="category__content">{category.name}</div>
      </li>
    </>
  );
};

export default HomeItem;
