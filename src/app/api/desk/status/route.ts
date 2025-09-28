import { NextResponse } from "next/server";
import { mockDesks } from "@/lib/data";

export async function GET() {
  const stats = {
    total: mockDesks.length,
    available: mockDesks.filter((d) => d.status === "available").length,
    occupied: mockDesks.filter((d) => d.status === "occupied").length,
    maintenance: mockDesks.filter((d) => d.status === "maintenance").length,
  };

  return NextResponse.json({
    status: "ok",
    desks: mockDesks,
    stats,
  });
}
