import create from 'zustand';

export const store = (set) => ({
  //breadcrumbs
  breadcrumbs: ['shop'],
  setBreadcrumbs: (breadcrumbs) =>
    set(() => ({
      breadcrumbs,
    })),

  //products
  products: [],
  product: {},
  setProducts: (products) =>
    set(() => ({
      products,
    })),

  setProduct: (product) =>
    set(() => ({
      product,
    })),

  //categories
  categories: [],
  selectedCats: [],
  setCategories: (categories) =>
    set(() => ({
      categories,
    })),
  setSelectedCats: (selectedCats) =>
    set(() => ({
      selectedCats,
    })),

  search: '',
  cart: {},
  checkout: {},
  orderComplete: {},
});

export const useStore = create(store);
