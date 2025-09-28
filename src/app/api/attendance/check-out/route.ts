import { NextRequest, NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";
import { mockStudents, mockAttendanceLogs } from "@/lib/data";
import { z } from "zod";
// ...existing code...

const checkOutSchema = z.object({
  student_id: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { student_id } = checkOutSchema.parse(body);

    await migrate();
    await seedIfEmpty();

    let student, activeLog;
    if (!sql) {
      student = mockStudents.find((s) => s.student_id === student_id);
      activeLog = mockAttendanceLogs.find(
        (l) => l.student_id === student_id && l.status === "active"
      );
    } else {
      const students =
        await sql`SELECT * FROM students WHERE student_id = ${student_id}`;
      student = students[0];
      const activeLogs =
        await sql`SELECT * FROM attendance_logs WHERE student_id = ${student_id} AND status = 'active' ORDER BY entry_time DESC LIMIT 1`;
      activeLog = activeLogs[0];
    }
    if (!student) {
      console.error("Student not found", { student_id });
      return NextResponse.json(
        { status: "error", message: "Student not found" },
        { status: 404 }
      );
    }
    if (!activeLog) {
      console.warn("No active session for student", { student_id });
      return NextResponse.json(
        { status: "error", message: "No active session for student" },
        { status: 409 }
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    const exitTime = new Date();
    const entryTime = new Date(activeLog.entry_time);
    const durationMinutes = Math.max(
      1,
      Math.round((exitTime.getTime() - entryTime.getTime()) / 60000)
    );
    if (sql) {
      await sql`
        UPDATE attendance_logs
        SET exit_time = ${exitTime.toISOString()}, duration_minutes = ${durationMinutes}, status = 'completed'
        WHERE log_id = ${activeLog.log_id}
      `;
      await sql`UPDATE desks SET status = 'available' WHERE desk_id = ${activeLog.desk_id}`;
    }
    return NextResponse.json({
      status: "ok",
      student_id,
      desk_id: activeLog.desk_id,
      exit_time: exitTime.toISOString(),
      duration_minutes: durationMinutes,
      message: `Goodbye ${student.name}!`,
    });
  } catch (err) {
    console.error("Check-out error", err);
    return NextResponse.json(
      { status: "error", message: "Invalid request" },
      { status: 400 }
    );
  }
}
