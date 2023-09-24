export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  images: string[]
}

export type GetProductsApiResponse = {
  products: ProductType[]
  total: number
  limit: number
  skip: number
}
