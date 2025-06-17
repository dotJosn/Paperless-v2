"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import { ProgramService } from "@/services/program-service"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle, Timer, Loader2, Download, Filter } from "lucide-react"

interface Statistics {
  total: number
  pending: number
  running: number
  completed: number
  cancelled: number
  totalHours: number
  completedHours: number
  efficiency: number
}

export default function ReportsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [programs, setPrograms] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadReportData()
  }, [])

  const loadReportData = async () => {
    try {
      setIsLoading(true)
      const [statsData, programsData] = await Promise.all([
        ProgramService.getStatistics(),
        ProgramService.getAllPrograms(),
      ])

      setStatistics(statsData)
      setPrograms(programsData)
    } catch (error) {
      console.error("Erro ao carregar dados do relatório:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do relatório.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Dados para gráficos
  const statusData = statistics
    ? [
        { name: "Aguardando", value: statistics.pending, color: "#fbbf24" },
        { name: "Em Execução", value: statistics.running, color: "#3b82f6" },
        { name: "Concluídos", value: statistics.completed, color: "#10b981" },
        { name: "Cancelados", value: statistics.cancelled, color: "#ef4444" },
      ]
    : []

  const priorityData = programs.reduce(
    (acc, program) => {
      acc[program.priority] = (acc[program.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const priorityChartData = Object.entries(priorityData).map(([priority, count]) => ({
    name: priority.charAt(0).toUpperCase() + priority.slice(1),
    value: count,
    color:
      priority === "urgent"
        ? "#ef4444"
        : priority === "high"
          ? "#f97316"
          : priority === "medium"
            ? "#3b82f6"
            : "#6b7280",
  }))

  const dailyProductivity = programs
    .filter((p) => p.completedAt)
    .reduce(
      (acc, program) => {
        const date = program.completedAt!.toISOString().split("T")[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const productivityData = Object.entries(dailyProductivity)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7) // Últimos 7 dias
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      programas: count,
    }))

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "programmer"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                Relatórios e Análises
              </h1>
              <p className="text-muted-foreground">Análise detalhada da produtividade e performance dos programas</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          {statistics && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Programas</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.total}</div>
                  <p className="text-xs text-muted-foreground">{statistics.totalHours.toFixed(1)}h estimadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.efficiency}%</div>
                  <p className="text-xs text-muted-foreground">
                    {statistics.completed} de {statistics.total} programas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Em Execução</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{statistics.running}</div>
                  <p className="text-xs text-muted-foreground">Programas ativos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Horas Concluídas</CardTitle>
                  <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{statistics.completedHours.toFixed(1)}h</div>
                  <p className="text-xs text-muted-foreground">De {statistics.totalHours.toFixed(1)}h totais</p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Gráfico de Status */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Status</CardTitle>
                <CardDescription>Status atual dos programas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Gráfico de Prioridades */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Prioridade</CardTitle>
                <CardDescription>Classificação de prioridade dos programas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={priorityChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Produtividade */}
          <Card>
            <CardHeader>
              <CardTitle>Produtividade Diária</CardTitle>
              <CardDescription>Programas concluídos nos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="programas" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabela de Resumo */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Detalhado</CardTitle>
              <CardDescription>Análise detalhada por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Aguardando</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">{statistics?.pending || 0}</div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {statistics?.total ? Math.round(((statistics.pending || 0) / statistics.total) * 100) : 0}% do
                      total
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Em Execução</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{statistics?.running || 0}</div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {statistics?.total ? Math.round(((statistics.running || 0) / statistics.total) * 100) : 0}% do
                      total
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Concluídos</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{statistics?.completed || 0}</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {statistics?.total ? Math.round(((statistics.completed || 0) / statistics.total) * 100) : 0}% do
                      total
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Cancelados</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{statistics?.cancelled || 0}</div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {statistics?.total ? Math.round(((statistics.cancelled || 0) / statistics.total) * 100) : 0}% do
                      total
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
