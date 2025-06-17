"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { UserRole, AuthState } from "@/types/auth"
import { useToast } from "@/hooks/use-toast"
import { AuthService } from "@/services/auth-service"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthorized: (allowedRoles?: UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUserId = localStorage.getItem("paperless_user_id")
        if (storedUserId) {
          const user = await AuthService.getUserById(storedUserId)
          if (user) {
            setState({ user, isLoading: false, error: null })
          } else {
            localStorage.removeItem("paperless_user_id")
            setState({ user: null, isLoading: false, error: null })
          }
        } else {
          setState({ user: null, isLoading: false, error: null })
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        localStorage.removeItem("paperless_user_id")
        setState({ user: null, isLoading: false, error: null })
      }
    }

    checkAuth()
  }, [])

  // Redirecionar usuários não autenticados para a página de login
  useEffect(() => {
    if (!state.isLoading && !state.user && !pathname.startsWith("/auth")) {
      router.push("/auth/login")
    }
  }, [state.isLoading, state.user, pathname, router])

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = await AuthService.login(email, password)

      // Armazenar ID do usuário no localStorage
      localStorage.setItem("paperless_user_id", user.id)

      setState({
        user,
        isLoading: false,
        error: null,
      })

      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${user.name}!`,
      })

      // Redirecionar para a página inicial
      router.push("/")
    } catch (error: any) {
      setState({
        user: null,
        isLoading: false,
        error: error.message || "Erro ao fazer login",
      })

      toast({
        title: "Erro de autenticação",
        description: error.message || "Erro ao fazer login",
        variant: "destructive",
      })
    }
  }

  const logout = () => {
    localStorage.removeItem("paperless_user_id")
    setState({ user: null, isLoading: false, error: null })
    router.push("/auth/login")

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })
  }

  const isAuthorized = (allowedRoles?: UserRole[]) => {
    if (!state.user) return false
    if (!allowedRoles) return true
    return allowedRoles.includes(state.user.role)
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
