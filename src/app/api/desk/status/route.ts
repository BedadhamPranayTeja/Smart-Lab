import { NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";
import { mockDesks } from "@/lib/data";
// ...existing code...

export async function GET() {
  try {
    await migrate();
    await seedIfEmpty();
    let desks, stats;
    if (!sql) {
      desks = mockDesks;
      stats = {
        total: desks.length,
        available: desks.filter((d) => d.status === "available").length,
        occupied: desks.filter((d) => d.status === "occupied").length,
        maintenance: desks.filter((d) => d.status === "maintenance").length,
      };
    } else {
      desks =
        await sql`SELECT desk_id, location, led_pin, status, capacity FROM desks ORDER BY desk_id`;
      const totalResult = await sql`SELECT COUNT(*)::text as total FROM desks`;
      const availableResult =
        await sql`SELECT COUNT(*)::text as available FROM desks WHERE status = 'available'`;
      const occupiedResult =
        await sql`SELECT COUNT(*)::text as occupied FROM desks WHERE status = 'occupied'`;
      const maintenanceResult =
        await sql`SELECT COUNT(*)::text as maintenance FROM desks WHERE status = 'maintenance'`;

      // Debug log for SQL results
      console.log("Desk stats SQL results:", {
        totalResult,
        availableResult,
        occupiedResult,
        maintenanceResult,
      });

      const total = totalResult[0]?.total ?? "0";
      const available = availableResult[0]?.available ?? "0";
      const occupied = occupiedResult[0]?.occupied ?? "0";
      const maintenance = maintenanceResult[0]?.maintenance ?? "0";

      stats = {
        total: Number(total),
        available: Number(available),
        occupied: Number(occupied),
        maintenance: Number(maintenance),
      };
    }
    return NextResponse.json({
      status: "ok",
      desks,
      stats,
    });
  } catch (err) {
    console.error("Desk status error", err);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch desk status" },
      { status: 500 }
    );
  }
}
