import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce';

const Categories = ({ categories }) => {
  console.log('cats', categories);
  return (
    <div className="categories-container">
      <ul>
        {categories
          ? categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Categories;
