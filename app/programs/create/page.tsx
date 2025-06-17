"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ProtectedRoute } from "@/components/protected-route"
import { ProgramService } from "@/services/program-service"
import { useAuth } from "@/contexts/auth-context"

export default function CreateProgramPage() {
  const [htmlContent, setHtmlContent] = useState("")
  const { toast } = useToast()
  const { user } = useAuth()
  const [operators, setOperators] = useState<any[]>([])
  const [selectedOperator, setSelectedOperator] = useState<string>("")
  const [priority, setPriority] = useState<string>("medium")
  const [estimatedTime, setEstimatedTime] = useState<string>("")
  const [programName, setProgramName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    // Carregar operadores do serviço mock
    const loadOperators = async () => {
      try {
        // Obter todos os usuários que são operadores
        const allUsers = await ProgramService.getOperators()
        setOperators(allUsers)
      } catch (error) {
        console.error("Erro ao carregar operadores:", error)
      }
    }

    loadOperators()
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/html") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setHtmlContent(content)
        toast({
          title: "Arquivo carregado",
          description: "O arquivo HTML foi carregado com sucesso.",
        })
      }
      reader.readAsText(file)
    } else {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo HTML válido.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!user) return

    try {
      await ProgramService.createProgram({
        name: programName,
        description: description,
        htmlContent: htmlContent,
        programmerId: user.id,
        programmerName: user.name, // Add programmerName from user context
        assignedOperatorId: selectedOperator,
        priority: priority as any,
        estimatedTimeHours: Number.parseFloat(estimatedTime) || 1,
        status: "running", // Or another default status as required by your Program type
      })

      toast({
        title: "Programa criado",
        description: "O programa foi criado e enviado ao operador designado.",
      })

      // Limpar formulário
      setProgramName("")
      setDescription("")
      setHtmlContent("")
      setSelectedOperator("")
      setPriority("medium")
      setEstimatedTime("")
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o programa.",
        variant: "destructive",
      })
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "programmer"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Programa</CardTitle>
              <CardDescription>Importe um programa do PowerMill e configure os detalhes</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Programa</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Usinagem Peça A-123"
                      required
                      value={programName}
                      onChange={(e) => setProgramName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operator">Operador Designado</Label>
                    <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um operador" />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map((operator) => (
                          <SelectItem key={operator.id} value={operator.id}>
                            {operator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva os detalhes do programa..."
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="html-file">Arquivo HTML do PowerMill</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="html-file"
                      type="file"
                      accept=".html"
                      onChange={handleFileUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                    />
                    <Button type="button" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  {htmlContent && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-700 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Arquivo HTML carregado com sucesso
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimated-time">Tempo Estimado (horas)</Label>
                    <Input
                      id="estimated-time"
                      type="number"
                      placeholder="Ex: 2.5"
                      step="0.1"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Criar Programa
                  </Button>
                  <Button type="button" variant="outline">
                    Salvar como Rascunho
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {htmlContent && (
            <Card>
              <CardHeader>
                <CardTitle>Pré-visualização do Programa</CardTitle>
                <CardDescription>Visualização do conteúdo HTML importado do PowerMill</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
