import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Play, CheckCircle, Clock } from "lucide-react"

interface Program {
  id: string
  name: string
  programmer: string
  status: string
  priority: string
  estimatedTime: string
  createdAt: string
  startedAt?: string
  completedAt?: string
}

interface ProgramsListProps {
  title: string
  description: string
  programs: Program[]
  showActions?: boolean
}

const statusConfig = {
  pending: { label: "Aguardando", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  running: { label: "Em Execução", color: "bg-blue-100 text-blue-800", icon: Play },
  completed: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

const priorityConfig = {
  low: { label: "Baixa", color: "bg-gray-100 text-gray-800" },
  medium: { label: "Média", color: "bg-blue-100 text-blue-800" },
  high: { label: "Alta", color: "bg-orange-100 text-orange-800" },
  urgent: { label: "Urgente", color: "bg-red-100 text-red-800" },
}

export function ProgramsList({ title, description, programs, showActions = false }: ProgramsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {programs.map((program) => {
            const status = statusConfig[program.status as keyof typeof statusConfig]
            const priority = priorityConfig[program.priority as keyof typeof priorityConfig]
            const StatusIcon = status.icon

            return (
              <div
                key={program.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-medium">{program.name}</h3>
                    <Badge variant="secondary" className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                    <Badge variant="outline" className={priority.color}>
                      {priority.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>ID: {program.id}</span>
                    <span>Programador: {program.programmer}</span>
                    <span>Tempo estimado: {program.estimatedTime}h</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Criado em: {new Date(program.createdAt).toLocaleDateString("pt-BR")}
                    {program.startedAt && <span> • Iniciado em: {program.startedAt}</span>}
                    {program.completedAt && <span> • Concluído em: {program.completedAt}</span>}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>

                  {showActions && program.status === "pending" && (
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  )}

                  {showActions && program.status === "running" && (
                    <Button size="sm" variant="destructive">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Finalizar
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
