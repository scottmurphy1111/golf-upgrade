import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../../state/store';
import { cats, catTypes } from '../../utils/cats';
import CategoryItem from './CategoryItem';

const Categories = () => {
  const categories = useStore((state) => state.categories);
  const selectedCats = useStore((state) => state.selectedCats);

  const location = useLocation();

  const [displayedCats, setDisplayedCats] = useState([]);

  useEffect(() => {
    const handleSetDisplayedCats = () => {
      const catsBySelection =
        cats[
          catTypes[
            location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
          ]
        ];

      return categories.reduce((acc, category) => {
        catsBySelection.map((cat, i) => {
          return category.slug === cat ? (acc[i] = category) : null;
        });

        return acc;
      }, []);
    };
    setDisplayedCats(handleSetDisplayedCats);
  }, [location, categories]);

  console.log('selecteedddd', selectedCats);

  return (
    <div className="categories-container">
      <ul>
        {displayedCats && displayedCats.length > 0
          ? displayedCats.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Categories;
