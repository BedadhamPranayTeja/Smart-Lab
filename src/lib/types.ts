// Student row
export type Student = {
  student_id: string;
  name: string;
  fingerprint_id: string;
  enrolled_date: string; // stored as DATE in DB, returned as string
  active: boolean;
};

// Desk row
export type Desk = {
  desk_id: string;
  location: string;
  led_pin: number;
  status: "available" | "occupied" | "maintenance";
  capacity: number;
};

// Attendance log row
export type AttendanceLog = {
  log_id: string;
  student_id: string;
  desk_id: string;
  entry_time: string; // timestamptz stored as ISO string
  exit_time: string | null;
  duration_minutes: number | null;
  status: "active" | "completed" | "absent";
};
