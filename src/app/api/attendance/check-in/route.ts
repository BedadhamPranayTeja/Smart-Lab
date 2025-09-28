import { NextRequest, NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";
import { mockStudents, mockDesks, mockAttendanceLogs } from "@/lib/data";
import { randomUUID } from "crypto";
import { z } from "zod";
// import type { Student, Desk, AttendanceLog } from "@/lib/types";

const checkInSchema = z.object({
  student_id: z.string(),
  hardware_type: z.enum(["webauthn", "esp32", "mock"]).default("mock"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { student_id, hardware_type } = checkInSchema.parse(body);

    await migrate();
    await seedIfEmpty();

    let student, availableDesk, alreadyCheckedIn;
    if (!sql) {
      student = mockStudents.find(
        (s) => s.student_id === student_id && s.active
      );
      alreadyCheckedIn = mockAttendanceLogs.find(
        (l) => l.student_id === student_id && l.status === "active"
      );
      availableDesk = mockDesks.find((d) => d.status === "available");
    } else {
      const studentRows =
        await sql`SELECT * FROM students WHERE student_id = ${student_id} AND active = true`;
      student = studentRows[0];
      const activeRows =
        await sql`SELECT * FROM attendance_logs WHERE student_id = ${student_id} AND status = 'active' LIMIT 1`;
      alreadyCheckedIn = activeRows[0];
      const deskRows =
        await sql`SELECT * FROM desks WHERE status = 'available' ORDER BY desk_id LIMIT 1`;
      availableDesk = deskRows[0];
    }
    if (!student) {
      console.error("Student not found or inactive", { student_id });
      return NextResponse.json(
        { status: "error", message: "Student not found or inactive" },
        { status: 404 }
      );
    }
    if (alreadyCheckedIn) {
      console.warn("Student already checked in", { student_id });
      return NextResponse.json(
        { status: "error", message: "Student already checked in" },
        { status: 409 }
      );
    }
    if (!availableDesk) {
      console.warn("No available desks");
      return NextResponse.json(
        { status: "error", message: "No available desks" },
        { status: 409 }
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (sql) {
      await sql`UPDATE desks SET status = 'occupied' WHERE desk_id = ${availableDesk.desk_id}`;
    }
    const entry_time = new Date().toISOString();
    const log_id = randomUUID();
    if (sql) {
      await sql`
        INSERT INTO attendance_logs (log_id, student_id, desk_id, entry_time, status)
        VALUES (${log_id}, ${student.student_id}, ${availableDesk.desk_id}, ${entry_time}, 'active')
      `;
    }
    return NextResponse.json({
      status: "ok",
      student_id: student.student_id,
      name: student.name,
      entry_time,
      desk_id: availableDesk.desk_id,
      present: true,
      hardware_type,
      actions: {
        led: "blink_green",
        desk_led_pin: availableDesk.led_pin,
        message: `Welcome ${student.name}!`,
      },
    });
  } catch (err) {
    console.error("Check-in error", err);
    return NextResponse.json(
      { status: "error", message: "Invalid request" },
      { status: 400 }
    );
  }
}
