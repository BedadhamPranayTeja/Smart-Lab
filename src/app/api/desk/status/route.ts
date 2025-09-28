import { NextResponse } from "next/server";
import { migrate, seedIfEmpty, sql } from "@/lib/db";

export async function GET() {
  await migrate();
  await seedIfEmpty();

  const desks = await sql<any[]>`SELECT desk_id, location, led_pin, status, capacity FROM desks ORDER BY desk_id`;
  const [{ total }] = await sql<{ total: string }[]>`SELECT COUNT(*)::text as total FROM desks;`;
  const [{ available }] = await sql<{ available: string }[]>`SELECT COUNT(*)::text as available FROM desks WHERE status = 'available';`;
  const [{ occupied }] = await sql<{ occupied: string }[]>`SELECT COUNT(*)::text as occupied FROM desks WHERE status = 'occupied';`;
  const [{ maintenance }] = await sql<{ maintenance: string }[]>`SELECT COUNT(*)::text as maintenance FROM desks WHERE status = 'maintenance';`;

  return NextResponse.json({
    status: "ok",
    desks,
    stats: {
      total: Number(total),
      available: Number(available),
      occupied: Number(occupied),
      maintenance: Number(maintenance),
    },
  });
}
