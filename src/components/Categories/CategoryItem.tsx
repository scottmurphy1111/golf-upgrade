import React, { useState, useCallback } from 'react';

const CategoryItem = ({ category }) => {
  const handleToggleCategory = (slug) => {
    console.log('slug', slug);
    // setCategories();
    // handleSetFilterCategorySlugs(slug);
    // setCategories(category.slug);
  };

  return (
    <li
      data-active={category.active}
      onClick={() => handleToggleCategory(category.slug)}
    >
      {category.name}
    </li>
  );
};

export default CategoryItem;
