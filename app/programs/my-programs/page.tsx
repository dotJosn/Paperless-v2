"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Send, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ProgramService } from "@/services/program-service"
import { ProtectedRoute } from "@/components/protected-route"
import { useToast } from "@/hooks/use-toast"

const statusConfig = {
  pending: { label: "Aguardando", color: "bg-yellow-100 text-yellow-800" },
  running: { label: "Em Execução", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Concluído", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
}

const priorityConfig = {
  low: { label: "Baixa", color: "bg-gray-100 text-gray-800" },
  medium: { label: "Média", color: "bg-blue-100 text-blue-800" },
  high: { label: "Alta", color: "bg-orange-100 text-orange-800" },
  urgent: { label: "Urgente", color: "bg-red-100 text-red-800" },
}

export default function MyProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const loadPrograms = async () => {
      if (!user) return

      try {
        const data = await ProgramService.getProgramsByProgrammer(user.id)
        setPrograms(data || [])
      } catch (error) {
        console.error("Erro ao carregar programas:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os programas.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPrograms()
  }, [user, toast])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["programmer", "admin"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />

        <Card>
          <CardHeader>
            <CardTitle>Meus Programas</CardTitle>
            <CardDescription>Programas criados por você • Total: {programs.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum programa criado ainda.</p>
                  <Button className="mt-4" asChild>
                    <a href="/programs/create">Criar Primeiro Programa</a>
                  </Button>
                </div>
              ) : (
                programs.map((program) => {
                  const status = statusConfig[program.status as keyof typeof statusConfig]
                  const priority = priorityConfig[program.priority as keyof typeof priorityConfig]

                  return (
                    <div
                      key={program.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-medium">{program.name}</h3>
                          <Badge variant="secondary" className={status.color}>
                            {status.label}
                          </Badge>
                          <Badge variant="outline" className={priority.color}>
                            {priority.label}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>ID: {program.id.slice(0, 8)}...</span>
                          <span>Operador: {program.assigned_operator?.name || "Não atribuído"}</span>
                          {program.estimated_time_hours && <span>Tempo estimado: {program.estimated_time_hours}h</span>}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Criado em: {new Date(program.created_at).toLocaleDateString("pt-BR")}
                          {program.started_at && (
                            <span> • Iniciado em: {new Date(program.started_at).toLocaleString("pt-BR")}</span>
                          )}
                          {program.completed_at && (
                            <span> • Concluído em: {new Date(program.completed_at).toLocaleString("pt-BR")}</span>
                          )}
                        </p>

                        {program.signatures && program.signatures.length > 0 && (
                          <div className="text-xs text-green-600">
                            ✓ Assinado por {program.assigned_operator?.name} em{" "}
                            {new Date(program.signatures[0].signed_at).toLocaleString("pt-BR")}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/programs/${program.id}/view`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </a>
                        </Button>

                        {!program.assigned_operator_id && (
                          <Button size="sm" variant="secondary" asChild>
                            <a href={`/programs/${program.id}/assign`}>
                              <Send className="w-4 h-4 mr-2" />
                              Atribuir
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
