import { create } from 'zustand'
import { ProductState, createProductSlice } from './product.slice'
export const useBoundStore = create<ProductState>((...a) => ({
  ...createProductSlice(...a)
}))
