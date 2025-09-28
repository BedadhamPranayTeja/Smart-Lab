export interface Student {
  student_id: string;
  name: string;
  fingerprint_id: string;
  enrolled_date: string;
  active: boolean;
}

export interface Desk {
  desk_id: string;
  location: string;
  led_pin: number;
  status: "available" | "occupied" | "maintenance";
  capacity: number;
}

export interface AttendanceLog {
  log_id: string;
  student_id: string;
  desk_id: string;
  entry_time: string;
  exit_time?: string;
  duration_minutes?: number;
  status: "active" | "completed" | "absent";
}

// Mock Data
export const mockStudents: Student[] = [
  {
    student_id: "S001",
    name: "Arjun Reddy",
    fingerprint_id: "FP_ARJ001",
    enrolled_date: "2025-01-15",
    active: true,
  },
  {
    student_id: "S002",
    name: "Priya Sharma",
    fingerprint_id: "FP_PRI002",
    enrolled_date: "2025-03-10",
    active: true,
  },
  {
    student_id: "S003",
    name: "Kiran Kumar",
    fingerprint_id: "FP_KIR003",
    enrolled_date: "2024-11-05",
    active: true,
  },
  {
    student_id: "S004",
    name: "Sneha Patel",
    fingerprint_id: "FP_SNE004",
    enrolled_date: "2025-07-01",
    active: true,
  },
  {
    student_id: "S005",
    name: "Rohit Singh",
    fingerprint_id: "FP_ROH005",
    enrolled_date: "2025-02-20",
    active: true,
  },
];

export const mockDesks: Desk[] = [
  {
    desk_id: "D001",
    location: "Row1-Seat1",
    led_pin: 13,
    status: "available",
    capacity: 1,
  },
  {
    desk_id: "D002",
    location: "Row1-Seat2",
    led_pin: 12,
    status: "available",
    capacity: 1,
  },
  {
    desk_id: "D003",
    location: "Row1-Seat3",
    led_pin: 14,
    status: "available",
    capacity: 1,
  },
  {
    desk_id: "D004",
    location: "Row2-Seat1",
    led_pin: 27,
    status: "available",
    capacity: 1,
  },
  {
    desk_id: "D005",
    location: "Row2-Seat2",
    led_pin: 26,
    status: "available",
    capacity: 1,
  },
];

export const mockAttendanceLogs: AttendanceLog[] = [
  {
    log_id: "L001",
    student_id: "S001",
    desk_id: "D001",
    entry_time: "2025-09-28T09:00:00Z",
    exit_time: "2025-09-28T10:30:00Z",
    duration_minutes: 90,
    status: "completed",
  },
  {
    log_id: "L002",
    student_id: "S002",
    desk_id: "D002",
    entry_time: "2025-09-28T09:00:00Z",
    exit_time: "2025-09-28T10:30:00Z",
    duration_minutes: 90,
    status: "completed",
  },
  {
    log_id: "L003",
    student_id: "S003",
    desk_id: "D003",
    entry_time: "2025-09-28T09:00:00Z",
    exit_time: "2025-09-28T10:30:00Z",
    duration_minutes: 90,
    status: "completed",
  },
  {
    log_id: "L004",
    student_id: "S004",
    desk_id: "D004",
    entry_time: "2025-09-28T09:00:00Z",
    exit_time: "2025-09-28T10:30:00Z",
    duration_minutes: 90,
    status: "completed",
  },
  {
    log_id: "L005",
    student_id: "S005",
    desk_id: "D005",
    entry_time: "2025-09-28T09:00:00Z",
    exit_time: "2025-09-28T10:30:00Z",
    duration_minutes: 90,
    status: "completed",
  },
];
