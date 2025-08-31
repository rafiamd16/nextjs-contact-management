export interface Address {
  id: string
  street: string | null
  city: string | null
  province: string | null
  country: string
  postal_code: string
  contact?: {
    id?: string
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
  }
}
