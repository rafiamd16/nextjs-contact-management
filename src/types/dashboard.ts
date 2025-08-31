export interface UserDashboard {
  contacts: {
    total: number
    recentThisWeek: number
    growth: number
    recentContacts: {
      id?: string
      first_name?: string
      last_name?: string
      email?: string
      phone?: string
      addresses?: {
        id?: string
        city?: string
      }[]
      createdAt?: Date
    }[]
  }
  addresses: {
    total: number
    newThisWeek: number
  }
}

export interface AdminDashboard {
  users: {
    total: number
    growth: number
    activeLast30Days: number
    newThisWeek: number
    all: {
      id: string
      name: string
      email: string
      role: string
      image: string
      _count: { contacts: number }
      lastLogin: Date
      createdAt: Date
    }[]
    recent: {
      id: string
      name: string
      email: string
      image: string
      createdAt: Date
    }[]
  }
  contacts: {
    total: number
    growth: number
  }
}
