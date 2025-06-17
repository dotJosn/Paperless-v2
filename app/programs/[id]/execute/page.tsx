"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SignaturePad } from "@/components/signature-pad"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { ProgramService, type Program } from "@/services/program-service"
import { SignatureService } from "@/services/signature-service"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Clock, User, Loader2, Play, ArrowLeft, AlertTriangle } from "lucide-react"

export default function ExecuteProgramPage() {
  const params = useParams()
  const router = useRouter()
  const programId = params.id as string
  const [program, setProgram] = useState<Program | null>(null)
  const [signatures, setSignatures] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
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

    setIsStarting(true)
    try {
      const updatedProgram = await ProgramService.startProgram(program.id)
      if (updatedProgram) {
        setProgram(updatedProgram)
        toast({
          title: "Programa Iniciado",
          description: "O programa foi marcado como em execução. Agora você pode executar as instruções.",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível iniciar o programa.",
        variant: "destructive",
      })
    } finally {
      setIsStarting(false)
    }
  }

  const handleSignature = async (signatureData: string) => {
    // Recarregar dados após assinatura
    await loadProgramData()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
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
      default:
        return "Aguardando"
    }
  }

  // Verificar permissões
  const canExecute = user?.role === "admin" || (user?.role === "operator" && program?.assignedOperatorId === user.id)
  const isCompleted = program?.status === "completed"
  const isPending = program?.status === "pending"
  const isRunning = program?.status === "running"
  const hasUserSignature = signatures.some((sig) => sig.operatorId === user?.id)

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

  if (!canExecute) {
    return (
      <ProtectedRoute allowedRoles={["admin", "operator"]}>
        <div className="flex h-screen w-full items-center justify-center">
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                Acesso Negado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Você não tem permissão para executar este programa. Este programa está atribuído a outro operador.
              </p>
              <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "operator"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />

        <div className="grid gap-6">
          {/* Navegação */}
          <div className="flex items-center gap-2">
            <Button onClick={() => router.back()} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>

          {/* Cabeçalho do Programa */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {program.name}
                    <Badge variant="secondary" className={getStatusColor(program.status)}>
                      {getStatusIcon(program.status)}
                      <span className="ml-1">{getStatusText(program.status)}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    ID: {program.id} • Programador: {program.programmerName}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Operador</p>
                  <p className="font-medium flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {program.assignedOperatorName || "Não atribuído"}
                  </p>
                </div>
              </div>

              {isPending && (
                <div className="pt-4">
                  <Button onClick={handleStartProgram} disabled={isStarting}>
                    {isStarting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Iniciando...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar Programa
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Instruções do Programa */}
          <Card>
            <CardHeader>
              <CardTitle>Instruções do Programa</CardTitle>
              <CardDescription>
                Siga as etapas abaixo conforme especificado pelo programador
                {user?.role === "operator" && (
                  <span className="block mt-1 text-amber-600 font-medium">
                    ⚠️ Modo somente leitura - Apenas a assinatura pode ser alterada
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg border"
                dangerouslySetInnerHTML={{ __html: program.htmlContent }}
              />
            </CardContent>
          </Card>

          {/* Sistema de Assinatura */}
          {isRunning && !hasUserSignature && (
            <SignaturePad programId={programId} onSignature={handleSignature} disabled={user?.role !== "operator"} />
          )}

          {/* Programa Aguardando */}
          {isPending && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <Clock className="w-5 h-5" />
                  Aguardando Início
                </CardTitle>
                <CardDescription>
                  Este programa ainda não foi iniciado. Clique em "Iniciar Programa" para começar a execução.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* Programa Concluído */}
          {isCompleted && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  Programa Concluído
                </CardTitle>
                <CardDescription>Este programa foi finalizado e assinado.</CardDescription>
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
      </div>
    </ProtectedRoute>
  )
}
