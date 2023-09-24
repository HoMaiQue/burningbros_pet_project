import { GetProductsApiResponse } from '~/types/product.type'
import http from '~/utils/http'

const URL_PRODUCT = '/products'
export const productApi = {
  getProduct({
    limit = 0,
    skip = 0,
    select = 'title,price,thumbnail,stock,category'
  }: {
    limit?: number
    skip?: number
    select?: string
  }) {
    return http.get<GetProductsApiResponse>(`${URL_PRODUCT}?limit=${limit}&skip=${skip}&select=${select}`)
  },
  searchProduct({ query, select = 'title,price,thumbnail,stock,category' }: { query: string; select?: string }) {
    return http.get<GetProductsApiResponse>(`${URL_PRODUCT}/search?q=${query}&select=${select}`)
  }
}
