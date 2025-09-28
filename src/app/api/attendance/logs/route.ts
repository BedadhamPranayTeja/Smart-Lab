import { NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";
import { mockAttendanceLogs, mockStudents } from "@/lib/data";
// ...existing code...

// ...existing code...

export async function GET() {
  try {
    await migrate();
    await seedIfEmpty();
    let rows;
    if (!sql) {
      rows = mockAttendanceLogs.map((l) => ({
        ...l,
        student_name:
          mockStudents.find((s) => s.student_id === l.student_id)?.name ||
          "Unknown",
      }));
    } else {
      rows = await sql`
        SELECT l.log_id, l.student_id, s.name as student_name, l.desk_id,
               l.entry_time, l.exit_time, l.duration_minutes, l.status
        FROM attendance_logs l
        JOIN students s ON s.student_id = l.student_id
        ORDER BY l.entry_time DESC
      `;
    }
    return NextResponse.json({
      status: "ok",
      logs: rows,
      total: rows.length,
    });
  } catch (err) {
    console.error("Attendance logs error", err);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
