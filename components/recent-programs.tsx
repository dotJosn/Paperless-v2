import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Play, CheckCircle } from "lucide-react"

const recentPrograms = [
  {
    id: "PGM-001",
    name: "Usinagem Peça A-123",
    programmer: "Carlos Santos",
    operator: "João Silva",
    status: "completed",
    createdAt: "2024-01-15",
    completedAt: "2024-01-15 14:30",
  },
  {
    id: "PGM-002",
    name: "Fresamento Bloco B-456",
    programmer: "Ana Costa",
    operator: "Pedro Lima",
    status: "running",
    createdAt: "2024-01-15",
    startedAt: "2024-01-15 13:00",
  },
  {
    id: "PGM-003",
    name: "Torneamento Eixo C-789",
    programmer: "Carlos Santos",
    operator: "-",
    status: "pending",
    createdAt: "2024-01-15",
  },
  {
    id: "PGM-004",
    name: "Furação Placa D-012",
    programmer: "Ana Costa",
    operator: "Maria Oliveira",
    status: "running",
    createdAt: "2024-01-14",
    startedAt: "2024-01-15 15:00",
  },
]

const statusConfig = {
  pending: { label: "Aguardando", color: "bg-yellow-100 text-yellow-800", icon: null },
  running: { label: "Em Execução", color: "bg-blue-100 text-blue-800", icon: Play },
  completed: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

export function RecentPrograms() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programas Recentes</CardTitle>
        <CardDescription>Últimos programas criados e executados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPrograms.map((program) => {
            const status = statusConfig[program.status as keyof typeof statusConfig]
            const StatusIcon = status.icon

            return (
              <div key={program.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{program.name}</p>
                    <Badge variant="secondary" className={status.color}>
                      {StatusIcon && <StatusIcon className="w-3 h-3 mr-1" />}
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>ID: {program.id}</span>
                    <span>Programador: {program.programmer}</span>
                    {program.operator !== "-" && <span>Operador: {program.operator}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Criado em: {new Date(program.createdAt).toLocaleDateString("pt-BR")}
                    {program.completedAt && <span> • Concluído em: {program.completedAt}</span>}
                    {program.startedAt && !program.completedAt && <span> • Iniciado em: {program.startedAt}</span>}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalhes
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
