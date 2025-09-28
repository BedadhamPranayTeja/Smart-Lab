import { NextRequest, NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";
import { z } from "zod";

const checkInSchema = z.object({
  student_id: z.string(),
  hardware_type: z.enum(["webauthn", "esp32", "mock"]).default("mock"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { student_id, hardware_type } = checkInSchema.parse(body);

    await migrate();
    await seedIfEmpty();

    // Find student
    const studentRows = await sql<any[]>`SELECT * FROM students WHERE student_id = ${student_id} AND active = true;`;
    const student = studentRows[0];
    if (!student) {
      return NextResponse.json(
        {
          status: "error",
          message: "Student not found or inactive",
        },
        { status: 404 }
      );
    }

    // Ensure student does not already have an active session
    const activeRows = await sql<any[]>`SELECT 1 FROM attendance_logs WHERE student_id = ${student_id} AND status = 'active' LIMIT 1;`;
    if (activeRows.length > 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "Student already checked in",
        },
        { status: 409 }
      );
    }

    // Find available desk
    const deskRows = await sql<any[]>`SELECT * FROM desks WHERE status = 'available' ORDER BY desk_id LIMIT 1;`;
    const availableDesk = deskRows[0];
    if (!availableDesk) {
      return NextResponse.json(
        {
          status: "error",
          message: "No available desks",
        },
        { status: 409 }
      );
    }

    // Simulate hardware response time
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mark desk as occupied
    await sql`UPDATE desks SET status = 'occupied' WHERE desk_id = ${availableDesk.desk_id};`;

    // Create attendance log entry
    const entry_time = new Date().toISOString();
    const log_id = Date.now().toString();
    await sql`INSERT INTO attendance_logs (log_id, student_id, desk_id, entry_time, status) VALUES (${log_id}, ${student.student_id}, ${availableDesk.desk_id}, ${entry_time}, 'active');`;

    // Mock successful check-in response
    const response = {
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
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid request",
      },
      { status: 400 }
    );
  }
}
