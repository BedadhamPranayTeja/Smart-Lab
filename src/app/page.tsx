import { DashboardStats } from "@/components/dashboard-stats";
import { RecentActivity } from "@/components/recent-activity";
import { ScanSimulator } from "@/components/scan-simulator";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            🧪 Smart Lab Dashboard
          </h1>
          <div className="text-sm text-gray-500">PoC - Real-time Updates</div>
        </div>

        <DashboardStats />

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <ScanSimulator />
        </div>
      </div>
    </div>
  );
}
