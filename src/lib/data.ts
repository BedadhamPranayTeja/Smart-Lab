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
    fingerprint_id: "FP_001",
    enrolled_date: "2025-09-15",
    active: true,
  },
  {
    student_id: "S002",
    name: "Priya Sharma",
    fingerprint_id: "FP_002",
    enrolled_date: "2025-09-16",
    active: true,
  },
  {
    student_id: "S003",
    name: "Kiran Kumar",
    fingerprint_id: "FP_003",
    enrolled_date: "2025-09-17",
    active: true,
  },
  {
    student_id: "S004",
    name: "Sneha Patel",
    fingerprint_id: "FP_004",
    enrolled_date: "2025-09-18",
    active: false,
  },
  {
    student_id: "S005",
    name: "Rohit Singh",
    fingerprint_id: "FP_005",
    enrolled_date: "2025-09-19",
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
    status: "occupied",
    capacity: 1,
  },
  {
    desk_id: "D003",
    location: "Row1-Seat3",
    led_pin: 14,
    status: "maintenance",
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
    log_id: "1",
    student_id: "S001",
    desk_id: "D001",
    entry_time: "2025-09-28T09:00:00Z",
    exit_time: "2025-09-28T11:30:00Z",
    duration_minutes: 150,
    status: "completed",
  },
  {
    log_id: "2",
    student_id: "S002",
    desk_id: "D002",
    entry_time: "2025-09-28T09:15:00Z",
    status: "active",
  },
  {
    log_id: "3",
    student_id: "S003",
    desk_id: "D003",
    entry_time: "2025-09-28T10:00:00Z",
    exit_time: "2025-09-28T10:45:00Z",
    duration_minutes: 45,
    status: "completed",
  },
];
