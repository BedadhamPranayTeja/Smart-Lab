import { NextRequest, NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";
import { z } from "zod";

const checkOutSchema = z.object({
  student_id: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { student_id } = checkOutSchema.parse(body);

    await migrate();
    await seedIfEmpty();

    const students = await sql<any[]>`SELECT * FROM students WHERE student_id = ${student_id};`;
    const student = students[0];
    if (!student) {
      return NextResponse.json(
        { status: "error", message: "Student not found" },
        { status: 404 }
      );
    }

    const activeLogs = await sql<any[]>`SELECT * FROM attendance_logs WHERE student_id = ${student_id} AND status = 'active' ORDER BY entry_time DESC LIMIT 1;`;
    const activeLog = activeLogs[0];
    if (!activeLog) {
      return NextResponse.json(
        { status: "error", message: "No active session for student" },
        { status: 409 }
      );
    }

    // Simulate hardware or processing delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Complete the log
    const exitTime = new Date();
    const entryTime = new Date(activeLog.entry_time);
    const durationMinutes = Math.max(
      1,
      Math.round((exitTime.getTime() - entryTime.getTime()) / 60000)
    );

    await sql`UPDATE attendance_logs SET exit_time = ${exitTime.toISOString()}, duration_minutes = ${durationMinutes}, status = 'completed' WHERE log_id = ${activeLog.log_id};`;
    await sql`UPDATE desks SET status = 'available' WHERE desk_id = ${activeLog.desk_id};`;

    return NextResponse.json({
      status: "ok",
      student_id,
      desk_id: activeLog.desk_id,
      exit_time: exitTime.toISOString(),
      duration_minutes: durationMinutes,
      message: `Goodbye ${student.name}!`,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Invalid request" },
      { status: 400 }
    );
  }
}

