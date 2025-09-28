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
      const [{ total }] = await sql`SELECT COUNT(*)::text as total FROM desks`;
      const [{ available }] =
        await sql`SELECT COUNT(*)::text as available FROM desks WHERE status = 'available'`;
      const [{ occupied }] =
        await sql`SELECT COUNT(*)::text as occupied FROM desks WHERE status = 'occupied'`;
      const [{ maintenance }] =
        await sql`SELECT COUNT(*)::text as maintenance FROM desks WHERE status = 'maintenance'`;
      stats = {
        total: Number(total.total),
        available: Number(available.available),
        occupied: Number(occupied.occupied),
        maintenance: Number(maintenance.maintenance),
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
