import { NextRequest, NextResponse } from "next/server";
import { mockStudents, mockDesks, mockAttendanceLogs } from "@/lib/data";
import { z } from "zod";

const checkInSchema = z.object({
  student_id: z.string(),
  hardware_type: z.enum(["webauthn", "esp32", "mock"]).default("mock"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { student_id, hardware_type } = checkInSchema.parse(body);

    // Find student
    const student = mockStudents.find((s) => s.student_id === student_id);
    if (!student || !student.active) {
      return NextResponse.json(
        {
          status: "error",
          message: "Student not found or inactive",
        },
        { status: 404 }
      );
    }

    // Find available desk
    const availableDesk = mockDesks.find((d) => d.status === "available");
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

    // Mock successful check-in
    const response = {
      status: "ok",
      student_id: student.student_id,
      name: student.name,
      entry_time: new Date().toISOString(),
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
