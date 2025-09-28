"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  MonitorSpeaker,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface DeskStats {
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
}

export function DashboardStats() {
  const { data: deskData } = useQuery({
    queryKey: ["desk-status"],
    queryFn: async () => {
      const response = await fetch("/api/desk/status");
      return response.json();
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { data: logsData } = useQuery({
    queryKey: ["attendance-logs"],
    queryFn: async () => {
      const response = await fetch("/api/attendance/logs");
      return response.json();
    },
    refetchInterval: 5000,
  });

  const stats: DeskStats = deskData?.stats || {
    total: 0,
    available: 0,
    occupied: 0,
    maintenance: 0,
  };
  const activeStudents =
    logsData?.logs?.filter((log: any) => log.status === "active")?.length || 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {activeStudents}
          </div>
          <p className="text-xs text-muted-foreground">Currently in lab</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Desks</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {stats.available}/{stats.total}
          </div>
          <p className="text-xs text-muted-foreground">Ready for use</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupied Desks</CardTitle>
          <MonitorSpeaker className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {stats.occupied}
          </div>
          <p className="text-xs text-muted-foreground">In use</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.maintenance}
          </div>
          <p className="text-xs text-muted-foreground">Needs attention</p>
        </CardContent>
      </Card>
    </div>
  );
}
