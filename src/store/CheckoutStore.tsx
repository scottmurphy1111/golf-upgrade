import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const store = (set, get) => ({
  checkout: {},
  orderComplete: {},
});

export const useCheckoutStore = create(store);
