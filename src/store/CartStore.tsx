import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const store = (set: any, get: any) => ({
  cart: {},
});

export const useCartStore = create(devtools(store));
