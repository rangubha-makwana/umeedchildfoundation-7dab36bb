// User & Auth Types
export type UserRole = 'admin' | 'coordinator' | 'volunteer';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  volunteerId?: string;
  createdAt: Date;
}

// Student Types
export type Gender = 'male' | 'female' | 'other';
export type StudentStatus = 'active' | 'inactive' | 'dropped';

export interface Student {
  id: string;
  fullName: string;
  gender: Gender;
  dateOfBirth?: Date;
  schoolName?: string;
  standard: string;
  guardianName?: string;
  guardianPhone?: string;
  address?: string;
  joinDate: Date;
  status: StudentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Volunteer Types
export type VolunteerRole = 'volunteer' | 'coordinator';

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: VolunteerRole;
  joinDate: Date;
  availability?: string;
  isActive: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Session Types
export interface Session {
  id: string;
  date: Date;
  title: string;
  description?: string;
  createdAt: Date;
}

// Attendance Types
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface StudentAttendance {
  id: string;
  studentId: string;
  student?: Student;
  sessionId?: string;
  session?: Session;
  date: Date;
  status: AttendanceStatus;
  markedByVolunteerId?: string;
  markedByVolunteer?: Volunteer;
  remarks?: string;
  createdAt: Date;
}

export interface VolunteerAttendance {
  id: string;
  volunteerId: string;
  volunteer?: Volunteer;
  sessionId?: string;
  session?: Session;
  date: Date;
  status: AttendanceStatus;
  remarks?: string;
  createdAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalVolunteers: number;
  activeVolunteers: number;
  attendanceThisMonth: number;
  recentSessions: number;
}

export interface AttendanceTrend {
  week: string;
  attendance: number;
  total: number;
}

export interface StudentsByStandard {
  standard: string;
  count: number;
}

export interface StudentsByGender {
  gender: Gender;
  count: number;
}
