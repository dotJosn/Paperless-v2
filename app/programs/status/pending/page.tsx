"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { ProgramService, type Program } from "@/services/program-service"
import { useToast } from "@/hooks/use-toast"
import { Clock, Eye, Play, User, Calendar, Timer, Loader2, AlertCircle } from "lucide-react"

export default function PendingProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      setIsLoading(true)
      const programsData = await ProgramService.getProgramsByStatus("pending")
      setPrograms(programsData)
    } catch (error) {
      console.error("Erro ao carregar programas:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os programas pendentes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewProgram = (programId: string) => {
    router.push(`/programs/${programId}`)
  }

  const handleExecuteProgram = (programId: string) => {
    router.push(`/programs/${programId}/execute`)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "programmer", "operator"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                Programas Aguardando
              </h1>
              <p className="text-muted-foreground">
                Programas que ainda não foram iniciados • Total: {programs.length}
              </p>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2">
              {programs.length} Pendentes
            </Badge>
          </div>

          {programs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum programa pendente</h3>
                <p className="text-muted-foreground text-center">
                  Todos os programas foram iniciados ou não há programas cadastrados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {programs.map((program) => (
                <Card key={program.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{program.name}</CardTitle>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Aguardando
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(program.priority)}>
                            {program.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">{program.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Programador: {program.programmerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Criado: {program.createdAt.toLocaleDateString("pt-BR")}
                          </span>
                          {program.estimatedTimeHours && (
                            <span className="flex items-center gap-1">
                              <Timer className="w-4 h-4" />
                              {program.estimatedTimeHours}h estimadas
                            </span>
                          )}
                        </div>
                        {program.assignedOperatorName && (
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600">Atribuído a: {program.assignedOperatorName}</span>
                          </div>
                        )}
                        {!program.assignedOperatorName && (
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <span className="text-amber-600">Aguardando atribuição de operador</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => handleViewProgram(program.id)} variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        {((user?.role === "operator" && program.assignedOperatorId === user.id) ||
                          user?.role === "admin") && (
                          <Button onClick={() => handleExecuteProgram(program.id)} size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
