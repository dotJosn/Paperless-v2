import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckCircle, Clock, FileText } from "lucide-react"

const stats = [
  {
    title: "Total de Programas",
    value: "156",
    description: "+12% em relação ao mês passado",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Em Execução",
    value: "8",
    description: "Programas sendo executados agora",
    icon: Activity,
    color: "text-orange-600",
  },
  {
    title: "Aguardando",
    value: "23",
    description: "Programas na fila de execução",
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Concluídos Hoje",
    value: "12",
    description: "+3 em relação a ontem",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
