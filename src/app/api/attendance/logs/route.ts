import { NextResponse } from "next/server";
import { mockAttendanceLogs, mockStudents } from "@/lib/data";

export async function GET() {
  // Enrich logs with student names
  const enrichedLogs = mockAttendanceLogs.map((log) => {
    const student = mockStudents.find((s) => s.student_id === log.student_id);
    return {
      ...log,
      student_name: student?.name || "Unknown",
    };
  });

  return NextResponse.json({
    status: "ok",
    logs: enrichedLogs,
    total: enrichedLogs.length,
  });
}
