import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardHeader } from "@/components/dashboard-header"
import { UsersTable } from "@/components/users-table"

export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
            <CardDescription>Visualize e gerencie todos os usuários do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
