export type UserRole = 'customer' | 'admin'

export interface UserSession {
  name: string
  email: string
  role: UserRole
}

export interface OrderItem {
  id: string
  productName: string
  image: string
  size: string
  quantity: number
  date: string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  price: string
}

export interface CustomerProfile {
  address: string
  phone: string
  memberTier: 'VIP Street Member' | 'Chapter 1 Founder' | 'Standard'
  points: number
}
