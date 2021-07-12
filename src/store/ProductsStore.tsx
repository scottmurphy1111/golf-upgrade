import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { commerce } from '../lib/commerce';

export const store = (set: any, get: any) => ({
  loading: true,
  setLoading: (loading: boolean) =>
    set(() => ({
      loading,
    })),
  //breadcrumbs
  breadcrumbs: ['shop'],
  setBreadcrumbs: (breadcrumbs: String[] | null) =>
    set(() => ({
      breadcrumbs,
    })),

  //products
  products: [],
  product: {},
  setProducts: (products: Object[]) =>
    set(() => ({
      products,
    })),

  setProduct: (product: Object) =>
    set(() => ({
      product,
    })),

  fetchProductsByCategory: async (slugs = []) => {
    const { data } = await commerce.products.list({
      category_slug: slugs,
    });
    set({ products: data });
  },

  //categories
  categories: [],
  selectedCats: [],
  orderedCats: [],
  setCategories: (categories: Object[]) =>
    set(() => ({
      categories,
    })),
  setSelectedCats: (selectedCats: String[]) =>
    set(() => ({
      selectedCats,
    })),
  setOrderedCats: (orderedCats: Object[]) =>
    set(() => ({
      orderedCats,
    })),

  search: '',
});

export const useProductsStore = create(devtools(store));
