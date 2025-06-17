import type { User, UserRole } from "@/types/auth"

// Usuários de demonstração em memória
const DEMO_USERS = [
  {
    id: "admin-001",
    name: "Admin User",
    email: "admin@paperless.com",
    password: "admin123",
    role: "admin" as UserRole,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "prog-001",
    name: "Carlos Santos",
    email: "programador@paperless.com",
    password: "prog123",
    role: "programmer" as UserRole,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "op-001",
    name: "João Silva",
    email: "operador@paperless.com",
    password: "op123",
    role: "operator" as UserRole,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Buscar usuário nos dados mock
      const userData = DEMO_USERS.find((user) => user.email === email)

      if (!userData) {
        throw new Error("Usuário não encontrado")
      }

      // Verificar senha
      if (userData.password !== password) {
        throw new Error("Senha incorreta")
      }

      // Retornar dados do usuário (sem a senha)
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
      }

      return user
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 200))

      const userData = DEMO_USERS.find((user) => user.id === id)

      if (!userData) {
        return null
      }

      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
      }

      return user
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
      return null
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 300))

      return DEMO_USERS.map((userData) => ({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
      }))
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
      throw error
    }
  }

  static async getOperators(): Promise<User[]> {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 200))

      const operators = DEMO_USERS.filter((user) => user.role === "operator")

      return operators.map((userData) => ({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
      }))
    } catch (error) {
      console.error("Erro ao buscar operadores:", error)
      throw error
    }
  }

  static async getProgrammers(): Promise<User[]> {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 200))

      const programmers = DEMO_USERS.filter((user) => user.role === "programmer")

      return programmers.map((userData) => ({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
      }))
    } catch (error) {
      console.error("Erro ao buscar programadores:", error)
      throw error
    }
  }
}
