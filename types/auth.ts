export type UserRole = "operator" | "programmer" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}
