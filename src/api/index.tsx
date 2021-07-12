import React, { useState, useEffect, useCallback } from 'react';
import shallow from 'zustand/shallow';
import { commerce } from '../lib/commerce';
import { useProductsStore } from '../store/ProductsStore';

// fetch products
export const useFetchProducts = () => {
  const setProducts = useProductsStore((state) => state.setProducts, shallow);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list();
        setProducts(data);
      } catch (error) {
        console.log('There was an error fetching the products', error);
      }
    };
    fetchProducts();
  }, [setProducts]);
};

// //fetch single product
// useEffect(() => {
//   const pId = localStorage.getItem('product-id');
//   if (pId) {
//     commerce.products
//       .retrieve(pId)
//       .then((res) => {
//         setProduct(res);
//       })

//       .catch((error) => {
//         console.error(`Cannot get product ${pId}`, error);
//       });

//     return () => {
//       localStorage.removeItem('product-id');
//     };
//   }
// }, [setProduct]);

// // fetch products by categories
// useEffect(() => {
//   if (!selectedCats.length) return;
//   const fetchProductsByCategory = async (slugs = []) => {
//     setLoading(true);
//     try {
//       const { data } = await commerce.products.list({
//         category_slug: slugs,
//       });
//       setProducts(data);
//       setLoading(false);
//     } catch (error) {
//       console.log('There was an error fetch products by categories', error);
//       setLoading(false);
//     }
//   };

//   fetchProductsByCategory(selectedCats);
// }, [selectedCats, setLoading, setProducts]);

// //fetch cats
// useEffect(() => {
//   setLoading(true);
//   const fetchCategories = async () => {
//     try {
//       const { data } = await commerce.categories.list();

//       const catData = data.map((category) => ({
//         ...category,
//         active: false,
//       }));
//       setCategories(catData);
//       setLoading(false);
//     } catch (error) {
//       console.log('There was an error fetching categories', error);
//     }
//   };

//   fetchCategories();
// }, [setCategories]);
export const useFetchCart = () => {
  const [cart, setCart] = useState({});

  const fetchCart = async () => {
    try {
      const response = await commerce.cart.retrieve();
      setCart(response);
    } catch (error) {
      console.error('There was an error fetching the cart', error);
    }
  };
};

// export const useHandleAddToCart = () => {
//   const [cart, setCart] = useState({});

//   const handleAddToCart = async (productId, quantity) => {
//     try {
//       const { cart } = await commerce.cart.add(productId, quantity);
//       setCart(cart);
//     } catch (error) {
//       console.error('There was an error adding the item to the cart', error);
//     }
//   };
// };
// export const handleUpdateCartQty = async (lineItemId, quantity) => {
//   try {
//     const { cart } = await commerce.cart.update(lineItemId, { quantity });
//     setCart(cart);
//   } catch (error) {
//     console.log('There was an error updating the cart items', error);
//   }
// };

// export const handleRemoveFromCart = async (lineItemId) => {
//   try {
//     const { cart } = await commerce.cart.remove(lineItemId);
//     setCart(cart);
//   } catch (error) {
//     console.error('There was an error removing the item from the cart', error);
//   }
// };

// export const handleEmptyCart = async () => {
//   try {
//     const { cart } = await commerce.cart.empty();
//     setCart(cart);
//   } catch (error) {
//     console.error('There was an error emptying the cart', error);
//   }
// };

// export const handleSetFilteredProducts = (slug) => {
//   if (!filterCategorySlugs.includes(slug)) {
//     setFilterCategorySlugs([...filterCategorySlugs, slug]);
//   } else {
//     setFilterCategorySlugs(filterCategorySlugs.filter((cat) => cat !== slug));
//   }
// };
