"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface AttendanceLog {
  log_id: string;
  student_id: string;
  student_name: string;
  desk_id: string;
  entry_time: string;
  exit_time?: string;
  status: "active" | "completed" | "absent";
}

export function RecentActivity() {
  const { data, isLoading } = useQuery({
    queryKey: ["attendance-logs"],
    queryFn: async () => {
      const response = await fetch("/api/attendance/logs");
      return response.json();
    },
    refetchInterval: 5000,
  });

  const logs: AttendanceLog[] = data?.logs ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : logs.length === 0 ? (
          <div className="text-sm text-gray-500">No recent activity.</div>
        ) : (
          <ul className="space-y-3">
            {logs.slice(0, 8).map((log) => (
              <li
                key={log.log_id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="space-y-0.5">
                  <p className="font-medium">
                    {log.student_name} <span className="text-xs text-gray-500">({log.student_id})</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Desk {log.desk_id} • {new Date(log.entry_time).toLocaleTimeString()} {log.exit_time ? `- ${new Date(log.exit_time).toLocaleTimeString()}` : ""}
                  </p>
                </div>
                <span
                  className={
                    log.status === "active"
                      ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                      : log.status === "completed"
                      ? "rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                      : "rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700"
                  }
                >
                  {log.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

