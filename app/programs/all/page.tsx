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
import { CheckCircle, Clock, Play, Eye, Loader2, AlertCircle, Calendar, User } from "lucide-react"

export default function AssignedProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    loadPrograms()
  }, [user])

  const loadPrograms = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      let programsData: Program[] = []

      if (user.role === "operator") {
        programsData = await ProgramService.getProgramsByOperator(user.id)
      } else if (user.role === "admin") {
        programsData = await ProgramService.getAllPrograms()
      }

      setPrograms(programsData)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      case "running":
        return <Play className="w-3 h-3" />
      case "cancelled":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "running":
        return "Em Execução"
      case "cancelled":
        return "Cancelado"
      default:
        return "Aguardando"
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
    <ProtectedRoute allowedRoles={["operator", "admin"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {user?.role === "operator" ? "Meus Programas" : "Todos os Programas"}
            </h1>
            <p className="text-muted-foreground">
              {user?.role === "operator"
                ? "Programas atribuídos a você para execução"
                : "Todos os programas do sistema"}
            </p>
          </div>

          {programs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum programa encontrado</h3>
                <p className="text-muted-foreground text-center">
                  {user?.role === "operator"
                    ? "Você não tem programas atribuídos no momento."
                    : "Não há programas cadastrados no sistema."}
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
                          <Badge variant="secondary" className={getStatusColor(program.status)}>
                            {getStatusIcon(program.status)}
                            <span className="ml-1">{getStatusText(program.status)}</span>
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
                            {program.createdAt.toLocaleDateString("pt-BR")}
                          </span>
                          {program.estimatedTimeHours && <span>Tempo estimado: {program.estimatedTimeHours}h</span>}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => handleViewProgram(program.id)} variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {program.assignedOperatorName && (
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>Atribuído a: {program.assignedOperatorName}</span>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
