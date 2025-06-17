"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Seg",
    concluidos: 12,
    emExecucao: 3,
    aguardando: 8,
  },
  {
    name: "Ter",
    concluidos: 15,
    emExecucao: 2,
    aguardando: 6,
  },
  {
    name: "Qua",
    concluidos: 18,
    emExecucao: 4,
    aguardando: 9,
  },
  {
    name: "Qui",
    concluidos: 14,
    emExecucao: 3,
    aguardando: 7,
  },
  {
    name: "Sex",
    concluidos: 16,
    emExecucao: 5,
    aguardando: 12,
  },
  {
    name: "Sáb",
    concluidos: 8,
    emExecucao: 1,
    aguardando: 3,
  },
  {
    name: "Dom",
    concluidos: 4,
    emExecucao: 0,
    aguardando: 2,
  },
]

export function ProgramsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programas por Dia</CardTitle>
        <CardDescription>Visão geral dos programas executados na última semana</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="concluidos" stackId="a" fill="#22c55e" name="Concluídos" />
            <Bar dataKey="emExecucao" stackId="a" fill="#3b82f6" name="Em Execução" />
            <Bar dataKey="aguardando" stackId="a" fill="#eab308" name="Aguardando" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
