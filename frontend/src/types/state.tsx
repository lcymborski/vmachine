export interface UserInterface {
  id: number
  username: string
  role: number
  deposit: number
}

export interface ProductInterface {
  id: number
  productName: string
  amountAvailable: number
  cost: number
  sellerId: number
}

export interface PurchaseInterface {
  total: number
  productId: number
  quantity: number
  change: number[]
}
