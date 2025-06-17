"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { ProgramService, type Program } from "@/services/program-service"
import { SignatureService } from "@/services/signature-service"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle,
  Clock,
  User,
  Calendar,
  AlertCircle,
  Play,
  Edit,
  Trash2,
  Loader2,
  FileText,
  Timer,
} from "lucide-react"

export default function ProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const programId = params.id as string
  const [program, setProgram] = useState<Program | null>(null)
  const [signatures, setSignatures] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    loadProgramData()
  }, [programId])

  const loadProgramData = async () => {
    try {
      setIsLoading(true)
      const [programData, signatureData] = await Promise.all([
        ProgramService.getProgramById(programId),
        SignatureService.getSignaturesByProgram(programId),
      ])

      if (!programData) {
        toast({
          title: "Programa não encontrado",
          description: "O programa solicitado não existe.",
          variant: "destructive",
        })
        router.push("/")
        return
      }

      setProgram(programData)
      setSignatures(signatureData)
    } catch (error) {
      console.error("Erro ao carregar programa:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do programa.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartProgram = async () => {
    if (!program) return

    try {
      const updatedProgram = await ProgramService.startProgram(program.id)
      if (updatedProgram) {
        setProgram(updatedProgram)
        toast({
          title: "Programa Iniciado",
          description: "O programa foi marcado como em execução.",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível iniciar o programa.",
        variant: "destructive",
      })
    }
  }

  const handleExecuteProgram = () => {
    router.push(`/programs/${programId}/execute`)
  }

  const handleEditProgram = () => {
    router.push(`/programs/${programId}/edit`)
  }

  const handleDeleteProgram = async () => {
    if (!program || !confirm("Tem certeza que deseja excluir este programa?")) return

    try {
      await ProgramService.deleteProgram(program.id)
      toast({
        title: "Programa Excluído",
        description: "O programa foi excluído com sucesso.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o programa.",
        variant: "destructive",
      })
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

  const canEdit = user?.role === "admin" || (user?.role === "programmer" && program?.programmerId === user.id)
  const canExecute = user?.role === "admin" || (user?.role === "operator" && program?.assignedOperatorId === user.id)
  const canStart = program?.status === "pending" && (user?.role === "admin" || user?.role === "operator")

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Programa não encontrado</p>
      </div>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "programmer", "operator"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />

        <div className="grid gap-6">
          {/* Cabeçalho do Programa */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">{program.name}</CardTitle>
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
                      <FileText className="w-4 h-4" />
                      ID: {program.id}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Criado: {program.createdAt.toLocaleDateString("pt-BR")}
                    </span>
                    {program.estimatedTimeHours && (
                      <span className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        Tempo estimado: {program.estimatedTimeHours}h
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {canStart && (
                    <Button onClick={handleStartProgram} size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  )}
                  {canExecute && (
                    <Button onClick={handleExecuteProgram} size="sm">
                      Executar Programa
                    </Button>
                  )}
                  {canEdit && (
                    <>
                      <Button onClick={handleEditProgram} variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button onClick={handleDeleteProgram} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Informações do Programa */}
            <div className="md:col-span-2 space-y-6">
              {/* Instruções */}
              <Card>
                <CardHeader>
                  <CardTitle>Instruções do Programa</CardTitle>
                  <CardDescription>Instruções detalhadas para execução do programa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg border"
                    dangerouslySetInnerHTML={{ __html: program.htmlContent }}
                  />
                </CardContent>
              </Card>

              {/* Assinaturas */}
              {signatures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Assinaturas</CardTitle>
                    <CardDescription>Histórico de assinaturas deste programa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {signatures.map((signature) => (
                        <div key={signature.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-medium">{signature.operatorName}</p>
                              <p className="text-sm text-muted-foreground">
                                Assinado em {signature.signedAt.toLocaleString("pt-BR")}
                              </p>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Concluído
                            </Badge>
                          </div>
                          <img
                            src={signature.signatureData || "/placeholder.svg"}
                            alt={`Assinatura de ${signature.operatorName}`}
                            className="border border-gray-200 rounded max-w-xs h-20 object-contain bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar com informações */}
            <div className="space-y-6">
              {/* Responsáveis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Responsáveis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Programador</p>
                    <p className="flex items-center mt-1">
                      <User className="w-4 h-4 mr-2" />
                      {program.programmerName}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Operador Atribuído</p>
                    <p className="flex items-center mt-1">
                      <User className="w-4 h-4 mr-2" />
                      {program.assignedOperatorName || "Não atribuído"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Criado</p>
                        <p className="text-xs text-muted-foreground">{program.createdAt.toLocaleString("pt-BR")}</p>
                      </div>
                    </div>

                    {program.startedAt && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Iniciado</p>
                          <p className="text-xs text-muted-foreground">{program.startedAt.toLocaleString("pt-BR")}</p>
                        </div>
                      </div>
                    )}

                    {program.completedAt && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Concluído</p>
                          <p className="text-xs text-muted-foreground">{program.completedAt.toLocaleString("pt-BR")}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
