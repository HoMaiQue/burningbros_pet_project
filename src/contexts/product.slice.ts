import { StateCreator } from 'zustand'
import { GetProductsApiResponse } from '~/types/product.type'

export interface ProductState {
  productList: GetProductsApiResponse
  productListSearch: GetProductsApiResponse
  setList: (newProductList: GetProductsApiResponse) => void
  setProductListSearch: (newProductList: GetProductsApiResponse) => void
  updateProductName: ({ id, name }: ProductItem) => void
  isSearchProduct: boolean
  setIsSearchProduct: (isSearch: boolean) => void
}
type ProductItem = {
  id: number
  name: string
}
export const createProductSlice: StateCreator<ProductState> = (set) => ({
  productList: {
    products: [],
    total: 0,
    limit: 0,
    skip: 0
  },
  productListSearch: {
    products: [],
    total: 0,
    limit: 0,
    skip: 0
  },
  isSearchProduct: false,
  setIsSearchProduct: (isSearch: boolean) => set({ isSearchProduct: isSearch }),
  setList: (newData: GetProductsApiResponse) => set({ productList: { ...newData } }),
  setProductListSearch: (newData: GetProductsApiResponse) => set({ productListSearch: { ...newData } }),
  updateProductName: ({ id, name }: ProductItem) =>
    set((state) => {
      const products = state.productList.products
      const indexProductUpdate = products.findIndex((product) => product.id === id)
      if (indexProductUpdate !== -1) {
        const productAfterUpdate = { ...products[indexProductUpdate], title: name }
        const productListSearch = state.productListSearch.products
        if (state.isSearchProduct) {
          const indexProductUpdateSearch = productListSearch.findIndex((product) => product.id === id)
          productListSearch.splice(indexProductUpdateSearch, 1, productAfterUpdate)
        }
        products.splice(indexProductUpdate, 1, productAfterUpdate)
        return {
          productList: { ...state.productList, products },
          productListSearch: { ...state.productListSearch, products: productListSearch }
        }
      }
      return { productList: state.productList }
    })
})
