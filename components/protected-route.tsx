"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/types/auth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthorized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Se não estiver carregando e não houver usuário, redireciona para login
    if (!isLoading && !user) {
      router.push("/auth/login")
      return
    }

    // Se houver usuário mas não tiver permissão, redireciona para dashboard
    if (!isLoading && user && allowedRoles && !isAuthorized(allowedRoles)) {
      router.push("/")
    }
  }, [isLoading, user, router, allowedRoles, isAuthorized])

  // Mostra loader enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Se não houver usuário ou não tiver permissão, não renderiza nada
  if (!user || (allowedRoles && !isAuthorized(allowedRoles))) {
    return null
  }

  // Se tiver permissão, renderiza o conteúdo
  return <>{children}</>
}
