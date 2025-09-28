import { NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";

export async function GET() {
  await migrate();
  await seedIfEmpty();

  const rows = await sql<any[]>`
    SELECT l.log_id, l.student_id, s.name as student_name, l.desk_id, l.entry_time, l.exit_time, l.duration_minutes, l.status
    FROM attendance_logs l
    JOIN students s ON s.student_id = l.student_id
    ORDER BY l.entry_time DESC
  `;

  return NextResponse.json({
    status: "ok",
    logs: rows,
    total: rows.length,
  });
}
