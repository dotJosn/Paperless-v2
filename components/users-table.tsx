"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, UserPlus } from "lucide-react"
import type { UserRole } from "@/types/auth"

// Dados simulados de usuários
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@paperless.com",
    role: "admin" as UserRole,
    status: "active",
    lastLogin: "2024-06-10 09:30",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "programador@paperless.com",
    role: "programmer" as UserRole,
    status: "active",
    lastLogin: "2024-06-09 14:15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "João Silva",
    email: "operador@paperless.com",
    role: "operator" as UserRole,
    status: "active",
    lastLogin: "2024-06-10 08:45",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@paperless.com",
    role: "programmer" as UserRole,
    status: "inactive",
    lastLogin: "2024-06-05 11:20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Pedro Lima",
    email: "pedro.lima@paperless.com",
    role: "operator" as UserRole,
    status: "active",
    lastLogin: "2024-06-08 16:30",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const roleConfig = {
  admin: { label: "Administrador", color: "bg-purple-100 text-purple-800" },
  programmer: { label: "Programador", color: "bg-blue-100 text-blue-800" },
  operator: { label: "Operador", color: "bg-green-100 text-green-800" },
}

const statusConfig = {
  active: { label: "Ativo", color: "bg-green-100 text-green-800" },
  inactive: { label: "Inativo", color: "bg-gray-100 text-gray-800" },
}

export function UsersTable() {
  const [users] = useState(mockUsers)

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Usuários</h2>
          <p className="text-sm text-muted-foreground">Total de {users.length} usuários no sistema</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={roleConfig[user.role].color}>
                    {roleConfig[user.role].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusConfig[user.status as keyof typeof statusConfig].color}>
                    {statusConfig[user.status as keyof typeof statusConfig].label}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
