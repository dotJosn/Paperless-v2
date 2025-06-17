import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { RecentPrograms } from "@/components/recent-programs"
import { ProgramsChart } from "@/components/programs-chart"
import { QuickActions } from "@/components/quick-actions"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DashboardHeader />
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="md:col-span-3">
            <StatsCards />
          </div>
          <div className="md:col-span-2">
            <ProgramsChart />
          </div>
          <div className="md:col-span-1">
            <QuickActions />
          </div>
          <div className="md:col-span-3">
            <RecentPrograms />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
