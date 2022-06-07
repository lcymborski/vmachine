import { ProductInterface } from './state'

export type NewProduct = Omit<ProductInterface, 'sellerId' | 'id'>

export type ProductUpdate = Omit<ProductInterface, 'sellerId'>

export interface SignupInterface {
  username: string
  password: string
  role: number
}

export interface LoginInterface {
  username: string
  password: string
}

export interface UserUpdateInterface {
  id: number
  username: string
  password?: string
}

export interface BuyInterface {
  productId: number
  quantity: number
}
