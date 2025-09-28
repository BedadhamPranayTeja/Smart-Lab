import { neon } from "@neondatabase/serverless";

const connectionString = process.env.NEON_DATABASE_URL;

if (!connectionString) {
  console.warn("NEON_DATABASE_URL is not set. API routes using DB will fail.");
}

export const sql = neon(connectionString || "");

// ⚡ Migrate schema (safe for dev/prototyping)
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

// ⚡ Seed data (with ON CONFLICT DO NOTHING)
export async function seedIfEmpty() {
  await sql`INSERT INTO students (student_id,name,fingerprint_id,enrolled_date,active) VALUES
      ('S001','Arjun Reddy','FP_001','2025-09-28',true),
      ('S002','Priya Sharma','FP_002','2025-09-28',true),
      ('S003','Kiran Kumar','FP_003','2025-09-28',true),
      ('S004','Sneha Patel','FP_004','2025-09-28',true),
      ('S005','Rohit Singh','FP_005','2025-09-28',true)
    ON CONFLICT (student_id) DO NOTHING;`;

  await sql`INSERT INTO desks (desk_id,location,led_pin,status,capacity) VALUES
      ('D001','Row1-Seat1',13,'available',1),
      ('D002','Row1-Seat2',12,'available',1),
      ('D003','Row1-Seat3',14,'available',1),
      ('D004','Row2-Seat1',27,'available',1),
      ('D005','Row2-Seat2',26,'available',1)
    ON CONFLICT (desk_id) DO NOTHING;`;

  await sql`INSERT INTO attendance_logs (log_id,student_id,desk_id,entry_time,exit_time,duration_minutes,status) VALUES
      ('1','S001','D001','2025-09-28T09:00:00Z','2025-09-28T11:30:00Z',150,'completed'),
      ('2','S002','D002','2025-09-28T09:00:00Z','2025-09-28T11:30:00Z',150,'completed'),
      ('3','S003','D003','2025-09-28T09:00:00Z','2025-09-28T11:30:00Z',150,'completed')
    ON CONFLICT (log_id) DO NOTHING;`;
}
