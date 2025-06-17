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
import { CheckCircle, Eye, User, Calendar, Timer, Loader2, Clock } from "lucide-react"

export default function CompletedProgramsPage() {
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
      const programsData = await ProgramService.getProgramsByStatus("completed")
      setPrograms(programsData)
    } catch (error) {
      console.error("Erro ao carregar programas:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os programas concluídos.",
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

  const getExecutionTime = (startedAt?: Date, completedAt?: Date) => {
    if (!startedAt || !completedAt) return "N/A"
    const elapsed = completedAt.getTime() - startedAt.getTime()
    const hours = Math.floor(elapsed / (1000 * 60 * 60))
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const handleViewProgram = (programId: string) => {
    router.push(`/programs/${programId}`)
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
                <CheckCircle className="h-8 w-8 text-green-600" />
                Programas Concluídos
              </h1>
              <p className="text-muted-foreground">
                Programas que foram finalizados e assinados • Total: {programs.length}
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-lg px-4 py-2">
              {programs.length} Concluídos
            </Badge>
          </div>

          {programs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum programa concluído</h3>
                <p className="text-muted-foreground text-center">Ainda não há programas finalizados no sistema.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {programs.map((program) => (
                <Card key={program.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{program.name}</CardTitle>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Concluído
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(program.priority)}>
                            {program.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">{program.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Operador: {program.assignedOperatorName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Concluído: {program.completedAt?.toLocaleDateString("pt-BR")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            Estimado: {program.estimatedTimeHours}h
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-medium">
                              Tempo real: {getExecutionTime(program.startedAt, program.completedAt)}
                            </span>
                          </div>
                          {program.startedAt && program.completedAt && program.estimatedTimeHours && (
                            <div className="flex items-center gap-2">
                              {getExecutionTime(program.startedAt, program.completedAt) <=
                              `${program.estimatedTimeHours}h 0m` ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  No Prazo
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  Atrasado
                                </Badge>
                              )}
                            </div>
                          )}
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
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
