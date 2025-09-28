import { NextRequest, NextResponse } from "next/server";
import { mockStudents, mockDesks, mockAttendanceLogs } from "@/lib/data";
import { z } from "zod";

const checkOutSchema = z.object({
  student_id: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { student_id } = checkOutSchema.parse(body);

    const student = mockStudents.find((s) => s.student_id === student_id);
    if (!student) {
      return NextResponse.json(
        { status: "error", message: "Student not found" },
        { status: 404 }
      );
    }

    const activeLog = mockAttendanceLogs.find(
      (l) => l.student_id === student_id && l.status === "active"
    );
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

    activeLog.exit_time = exitTime.toISOString();
    activeLog.duration_minutes = durationMinutes;
    activeLog.status = "completed";

    // Free the desk
    const desk = mockDesks.find((d) => d.desk_id === activeLog.desk_id);
    if (desk) {
      desk.status = "available";
    }

    return NextResponse.json({
      status: "ok",
      student_id,
      desk_id: activeLog.desk_id,
      exit_time: activeLog.exit_time,
      duration_minutes: activeLog.duration_minutes,
      message: `Goodbye ${student.name}!`,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Invalid request" },
      { status: 400 }
    );
  }
}

