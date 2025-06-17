"use client"
import {
  BarChart3,
  FileText,
  Home,
  PenTool,
  Settings,
  Users,
  ClipboardList,
  Activity,
  CheckCircle,
  Clock,
  Play,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserProfile } from "@/components/user-profile"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/types/auth"

const menuItems = {
  operator: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Meus Programas",
      url: "/programs/assigned",
      icon: ClipboardList,
    },
    {
      title: "Em Execução",
      url: "/programs/status/running",
      icon: Play,
    },
    {
      title: "Concluídos",
      url: "/programs/status/completed",
      icon: CheckCircle,
    },
  ],
  programmer: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Criar Programa",
      url: "/programs/create",
      icon: FileText,
    },
    {
      title: "Meus Programas",
      url: "/programs/my-programs",
      icon: ClipboardList,
    },
    {
      title: "Assinaturas Pendentes",
      url: "/programs/pending-signatures",
      icon: PenTool,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Todos os Programas",
      url: "/programs/all",
      icon: ClipboardList,
    },
    {
      title: "Relatórios",
      url: "/reports",
      icon: BarChart3,
    },
    {
      title: "Usuários",
      url: "/users",
      icon: Users,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
    },
  ],
}

const statusItems = [
  {
    title: "Aguardando",
    url: "/programs/status/pending",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Em Execução",
    url: "/programs/status/running",
    icon: Activity,
    color: "text-blue-600",
  },
  {
    title: "Concluídos",
    url: "/programs/status/completed",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export function AppSidebar() {
  const { user, isLoading } = useAuth()

  // Se estiver carregando ou não houver usuário, não renderiza a sidebar
  if (isLoading || !user) {
    return null
  }

  const userRole = user.role as UserRole
  const items = menuItems[userRole]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Paperless</span>
            <span className="truncate text-xs text-muted-foreground">Sistema Digital</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(userRole === "admin" || userRole === "programmer") && (
          <SidebarGroup>
            <SidebarGroupLabel>Status dos Programas</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {statusItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className={item.color} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
