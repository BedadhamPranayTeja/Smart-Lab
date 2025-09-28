"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fingerprint, CheckCircle, AlertCircle, Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DEMO_STUDENTS = ["S001", "S002", "S003", "S004", "S005"];

export function ScanSimulator() {
  const [selectedStudent, setSelectedStudent] = useState(DEMO_STUDENTS[0]);
  const [lastResult, setLastResult] = useState<any>(null);
  const queryClient = useQueryClient();

  const scanMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const response = await fetch("/api/attendance/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          hardware_type: "mock",
        }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setLastResult(data);
      // Invalidate queries to refresh dashboard
      queryClient.invalidateQueries({ queryKey: ["desk-status"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-logs"] });
    },
    onError: (error) => {
      setLastResult({ status: "error", message: "Scan failed" });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const response = await fetch("/api/attendance/check-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setLastResult(data);
      queryClient.invalidateQueries({ queryKey: ["desk-status"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-logs"] });
    },
    onError: () => {
      setLastResult({ status: "error", message: "Check-out failed" });
    },
  });

  const handleScan = () => {
    scanMutation.mutate(selectedStudent);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="h-5 w-5" />
          Scan Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Select Student ID:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            {DEMO_STUDENTS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleScan} disabled={scanMutation.isPending} className="w-full">
          {scanMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Fingerprint className="mr-2 h-4 w-4" />
              Simulate Scan
            </>
          )}
        </Button>

        <Button
          onClick={() => checkoutMutation.mutate(selectedStudent)}
          disabled={checkoutMutation.isPending}
          className="w-full"
          variant="secondary"
        >
          {checkoutMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking out...
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Simulate Check-out
            </>
          )}
        </Button>

        {lastResult && (
          <div
            className={`p-3 rounded-md ${
              lastResult.status === "ok"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {lastResult.status === "ok" ? (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <div>
                  <p className="font-medium">{lastResult.actions?.message || lastResult.message}</p>
                  <p className="text-sm">Desk: {lastResult.desk_id}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <p>{lastResult.message}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
