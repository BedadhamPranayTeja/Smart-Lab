import { neon } from "@neondatabase/serverless";

// Use env var NEON_DATABASE_URL at runtime
const connectionString = process.env.NEON_DATABASE_URL;

if (!connectionString) {
  // In dev, it's okay to throw to surface missing config clearly
  // For production (Vercel), ensure the env var is set in project settings
  console.warn("NEON_DATABASE_URL is not set. API routes using DB will fail.");
}

export const sql = neon(connectionString || "");

export async function migrate() {
  await sql`CREATE TABLE IF NOT EXISTS students (
    student_id text primary key,
    name text not null,
    fingerprint_id text not null,
    enrolled_date date not null,
    active boolean not null default true
  );`;

  await sql`CREATE TABLE IF NOT EXISTS desks (
    desk_id text primary key,
    location text not null,
    led_pin integer not null,
    status text not null check (status in ('available','occupied','maintenance')),
    capacity integer not null
  );`;

  await sql`CREATE TABLE IF NOT EXISTS attendance_logs (
    log_id text primary key,
    student_id text not null references students(student_id),
    desk_id text not null references desks(desk_id),
    entry_time timestamptz not null,
    exit_time timestamptz,
    duration_minutes integer,
    status text not null check (status in ('active','completed','absent'))
  );`;
}

export async function seedIfEmpty() {
  const [{ count: studentCount }] = await sql<{ count: string }[]>`SELECT COUNT(*)::text as count FROM students;`;
  if (Number(studentCount) === 0) {
    await sql`INSERT INTO students (student_id,name,fingerprint_id,enrolled_date,active) VALUES
      ('S001','Arjun Reddy','FP_001','2025-09-15',true),
      ('S002','Priya Sharma','FP_002','2025-09-16',true),
      ('S003','Kiran Kumar','FP_003','2025-09-17',true),
      ('S004','Sneha Patel','FP_004','2025-09-18',false),
      ('S005','Rohit Singh','FP_005','2025-09-19',true)
    ;`;
  }

  const [{ count: deskCount }] = await sql<{ count: string }[]>`SELECT COUNT(*)::text as count FROM desks;`;
  if (Number(deskCount) === 0) {
    await sql`INSERT INTO desks (desk_id,location,led_pin,status,capacity) VALUES
      ('D001','Row1-Seat1',13,'available',1),
      ('D002','Row1-Seat2',12,'occupied',1),
      ('D003','Row1-Seat3',14,'maintenance',1),
      ('D004','Row2-Seat1',27,'available',1),
      ('D005','Row2-Seat2',26,'available',1)
    ;`;
  }

  const [{ count: logCount }] = await sql<{ count: string }[]>`SELECT COUNT(*)::text as count FROM attendance_logs;`;
  if (Number(logCount) === 0) {
    await sql`INSERT INTO attendance_logs (log_id,student_id,desk_id,entry_time,exit_time,duration_minutes,status) VALUES
      ('1','S001','D001','2025-09-28T09:00:00Z','2025-09-28T11:30:00Z',150,'completed'),
      ('2','S002','D002','2025-09-28T09:15:00Z',NULL,NULL,'active'),
      ('3','S003','D003','2025-09-28T10:00:00Z','2025-09-28T10:45:00Z',45,'completed')
    ;`;
  }
}

