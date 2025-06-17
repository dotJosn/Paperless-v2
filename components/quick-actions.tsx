"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, PenTool, BarChart3, Users, ClipboardList, Play, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/types/auth"

const actionsByRole: Record<
  UserRole,
  Array<{
    title: string
    description: string
    icon: React.ElementType
    href: string
  }>
> = {
  admin: [
    {
      title: "Novo Programa",
      description: "Criar um novo programa",
      icon: FileText,
      href: "/programs/create",
    },
    {
      title: "Relatórios",
      description: "Gerar relatórios",
      icon: BarChart3,
      href: "/reports",
    },
    {
      title: "Usuários",
      description: "Gerenciar usuários",
      icon: Users,
      href: "/users",
    },
    {
      title: "Todos Programas",
      description: "Ver todos os programas",
      icon: ClipboardList,
      href: "/programs/all",
    },
  ],
  programmer: [
    {
      title: "Novo Programa",
      description: "Criar um novo programa",
      icon: FileText,
      href: "/programs/create",
    },
    {
      title: "Assinaturas",
      description: "Ver assinaturas pendentes",
      icon: PenTool,
      href: "/programs/pending-signatures",
    },
    {
      title: "Meus Programas",
      description: "Ver meus programas",
      icon: ClipboardList,
      href: "/programs/my-programs",
    },
    {
      title: "Relatórios",
      description: "Gerar relatórios",
      icon: BarChart3,
      href: "/reports",
    },
  ],
  operator: [
    {
      title: "Meus Programas",
      description: "Ver programas designados",
      icon: ClipboardList,
      href: "/programs/assigned",
    },
    {
      title: "Em Execução",
      description: "Ver programas em execução",
      icon: Play,
      href: "/programs/status/running",
    },
    {
      title: "Concluídos",
      description: "Ver programas concluídos",
      icon: CheckCircle,
      href: "/programs/status/completed",
    },
    {
      title: "Assinaturas",
      description: "Minhas assinaturas",
      icon: PenTool,
      href: "/programs/my-signatures",
    },
  ],
}

export function QuickActions() {
  const { user } = useAuth()

  if (!user) return null

  const actions = actionsByRole[user.role as UserRole]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Button key={action.title} variant="outline" className="w-full justify-start h-auto p-4" asChild>
            <a href={action.href}>
              <action.icon className="mr-3 h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
