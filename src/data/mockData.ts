import { Student, Volunteer, StudentAttendance, Session, DashboardStats, AttendanceTrend, StudentsByStandard, StudentsByGender } from '@/types';

// Helper to generate dates
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 's1',
    fullName: 'Aarav Patel',
    gender: 'male',
    dateOfBirth: new Date('2012-05-15'),
    schoolName: 'Government Primary School',
    standard: '6',
    guardianName: 'Rajesh Patel',
    guardianPhone: '+91 9876543210',
    address: 'Sector 12, Ahmedabad',
    joinDate: daysAgo(180),
    status: 'active',
    notes: 'Excellent in mathematics',
    createdAt: daysAgo(180),
    updatedAt: daysAgo(2),
  },
  {
    id: 's2',
    fullName: 'Ananya Sharma',
    gender: 'female',
    dateOfBirth: new Date('2013-08-22'),
    schoolName: 'Municipal School No. 5',
    standard: '5',
    guardianName: 'Meera Sharma',
    guardianPhone: '+91 9876543211',
    address: 'Maninagar, Ahmedabad',
    joinDate: daysAgo(150),
    status: 'active',
    createdAt: daysAgo(150),
    updatedAt: daysAgo(5),
  },
  {
    id: 's3',
    fullName: 'Vikram Singh',
    gender: 'male',
    dateOfBirth: new Date('2011-03-10'),
    schoolName: 'Government High School',
    standard: '7',
    guardianName: 'Suresh Singh',
    guardianPhone: '+91 9876543212',
    address: 'Navrangpura, Ahmedabad',
    joinDate: daysAgo(365),
    status: 'active',
    notes: 'Interested in science projects',
    createdAt: daysAgo(365),
    updatedAt: daysAgo(1),
  },
  {
    id: 's4',
    fullName: 'Priya Desai',
    gender: 'female',
    dateOfBirth: new Date('2012-11-30'),
    schoolName: 'Government Primary School',
    standard: '6',
    guardianName: 'Amit Desai',
    guardianPhone: '+91 9876543213',
    address: 'Ellis Bridge, Ahmedabad',
    joinDate: daysAgo(200),
    status: 'active',
    createdAt: daysAgo(200),
    updatedAt: daysAgo(10),
  },
  {
    id: 's5',
    fullName: 'Rohit Kumar',
    gender: 'male',
    dateOfBirth: new Date('2010-07-18'),
    schoolName: 'Municipal School No. 3',
    standard: '8',
    guardianName: 'Sanjay Kumar',
    guardianPhone: '+91 9876543214',
    address: 'Sabarmati, Ahmedabad',
    joinDate: daysAgo(400),
    status: 'inactive',
    notes: 'Relocated to different area',
    createdAt: daysAgo(400),
    updatedAt: daysAgo(30),
  },
  {
    id: 's6',
    fullName: 'Sneha Gupta',
    gender: 'female',
    dateOfBirth: new Date('2013-01-25'),
    schoolName: 'Government Primary School',
    standard: '5',
    guardianName: 'Ramesh Gupta',
    guardianPhone: '+91 9876543215',
    joinDate: daysAgo(120),
    status: 'active',
    createdAt: daysAgo(120),
    updatedAt: daysAgo(3),
  },
  {
    id: 's7',
    fullName: 'Arjun Mehta',
    gender: 'male',
    dateOfBirth: new Date('2011-09-05'),
    schoolName: 'Government High School',
    standard: '7',
    guardianName: 'Deepak Mehta',
    guardianPhone: '+91 9876543216',
    address: 'Vastrapur, Ahmedabad',
    joinDate: daysAgo(280),
    status: 'active',
    createdAt: daysAgo(280),
    updatedAt: daysAgo(7),
  },
  {
    id: 's8',
    fullName: 'Kavya Joshi',
    gender: 'female',
    dateOfBirth: new Date('2012-04-12'),
    schoolName: 'Municipal School No. 5',
    standard: '6',
    guardianName: 'Nitin Joshi',
    guardianPhone: '+91 9876543217',
    joinDate: daysAgo(160),
    status: 'active',
    notes: 'Shows great improvement',
    createdAt: daysAgo(160),
    updatedAt: daysAgo(4),
  },
];

// Mock Volunteers
export const mockVolunteers: Volunteer[] = [
  {
    id: 'v1',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 9988776655',
    role: 'coordinator',
    joinDate: daysAgo(500),
    availability: 'Sundays 10 AM - 1 PM',
    isActive: true,
    notes: 'Lead coordinator for weekend sessions',
    createdAt: daysAgo(500),
    updatedAt: daysAgo(1),
  },
  {
    id: 'v2',
    fullName: 'Rahul Kumar',
    email: 'rahul.kumar@email.com',
    phone: '+91 9988776656',
    role: 'volunteer',
    joinDate: daysAgo(300),
    availability: 'Saturdays & Sundays',
    isActive: true,
    notes: 'Teaching English and Art',
    createdAt: daysAgo(300),
    updatedAt: daysAgo(2),
  },
  {
    id: 'v3',
    fullName: 'Anjali Verma',
    email: 'anjali.verma@email.com',
    phone: '+91 9988776657',
    role: 'volunteer',
    joinDate: daysAgo(200),
    availability: 'Sundays 2 PM - 5 PM',
    isActive: true,
    createdAt: daysAgo(200),
    updatedAt: daysAgo(5),
  },
  {
    id: 'v4',
    fullName: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 9988776658',
    role: 'volunteer',
    joinDate: daysAgo(150),
    availability: 'Saturdays',
    isActive: false,
    notes: 'On leave for 3 months',
    createdAt: daysAgo(150),
    updatedAt: daysAgo(20),
  },
  {
    id: 'v5',
    fullName: 'Neha Singh',
    email: 'neha.singh@email.com',
    phone: '+91 9988776659',
    role: 'coordinator',
    joinDate: daysAgo(400),
    availability: 'Weekends',
    isActive: true,
    notes: 'Handles documentation and reports',
    createdAt: daysAgo(400),
    updatedAt: daysAgo(3),
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: 'ses1',
    date: daysAgo(0),
    title: 'Sunday Class - English & Craft',
    description: 'Weekly English vocabulary and craft activities',
    createdAt: daysAgo(0),
  },
  {
    id: 'ses2',
    date: daysAgo(7),
    title: 'Sunday Class - Mathematics',
    description: 'Basic arithmetic and problem solving',
    createdAt: daysAgo(7),
  },
  {
    id: 'ses3',
    date: daysAgo(14),
    title: 'Sunday Class - Science & Fun',
    description: 'Science experiments and educational games',
    createdAt: daysAgo(14),
  },
];

// Mock Attendance
export const mockAttendance: StudentAttendance[] = [
  // Today's attendance
  { id: 'a1', studentId: 's1', sessionId: 'ses1', date: daysAgo(0), status: 'present', markedByVolunteerId: 'v1', createdAt: daysAgo(0) },
  { id: 'a2', studentId: 's2', sessionId: 'ses1', date: daysAgo(0), status: 'present', markedByVolunteerId: 'v1', createdAt: daysAgo(0) },
  { id: 'a3', studentId: 's3', sessionId: 'ses1', date: daysAgo(0), status: 'late', markedByVolunteerId: 'v1', remarks: 'Arrived 15 mins late', createdAt: daysAgo(0) },
  { id: 'a4', studentId: 's4', sessionId: 'ses1', date: daysAgo(0), status: 'absent', markedByVolunteerId: 'v1', createdAt: daysAgo(0) },
  { id: 'a5', studentId: 's6', sessionId: 'ses1', date: daysAgo(0), status: 'present', markedByVolunteerId: 'v1', createdAt: daysAgo(0) },
  { id: 'a6', studentId: 's7', sessionId: 'ses1', date: daysAgo(0), status: 'present', markedByVolunteerId: 'v1', createdAt: daysAgo(0) },
  { id: 'a7', studentId: 's8', sessionId: 'ses1', date: daysAgo(0), status: 'excused', markedByVolunteerId: 'v1', remarks: 'Family event', createdAt: daysAgo(0) },
  
  // Last week's attendance
  { id: 'a8', studentId: 's1', sessionId: 'ses2', date: daysAgo(7), status: 'present', markedByVolunteerId: 'v2', createdAt: daysAgo(7) },
  { id: 'a9', studentId: 's2', sessionId: 'ses2', date: daysAgo(7), status: 'present', markedByVolunteerId: 'v2', createdAt: daysAgo(7) },
  { id: 'a10', studentId: 's3', sessionId: 'ses2', date: daysAgo(7), status: 'present', markedByVolunteerId: 'v2', createdAt: daysAgo(7) },
  { id: 'a11', studentId: 's4', sessionId: 'ses2', date: daysAgo(7), status: 'present', markedByVolunteerId: 'v2', createdAt: daysAgo(7) },
  { id: 'a12', studentId: 's6', sessionId: 'ses2', date: daysAgo(7), status: 'absent', markedByVolunteerId: 'v2', createdAt: daysAgo(7) },
  { id: 'a13', studentId: 's7', sessionId: 'ses2', date: daysAgo(7), status: 'present', markedByVolunteerId: 'v2', createdAt: daysAgo(7) },
  { id: 'a14', studentId: 's8', sessionId: 'ses2', date: daysAgo(7), status: 'present', markedByVolunteerId: 'v2', createdAt: daysAgo(7) },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalStudents: mockStudents.length,
  activeStudents: mockStudents.filter(s => s.status === 'active').length,
  totalVolunteers: mockVolunteers.length,
  activeVolunteers: mockVolunteers.filter(v => v.isActive).length,
  attendanceThisMonth: 78,
  recentSessions: mockSessions.length,
};

// Attendance Trends (last 8 weeks)
export const mockAttendanceTrends: AttendanceTrend[] = [
  { week: 'Week 1', attendance: 72, total: 100 },
  { week: 'Week 2', attendance: 85, total: 100 },
  { week: 'Week 3', attendance: 78, total: 100 },
  { week: 'Week 4', attendance: 90, total: 100 },
  { week: 'Week 5', attendance: 82, total: 100 },
  { week: 'Week 6', attendance: 88, total: 100 },
  { week: 'Week 7', attendance: 75, total: 100 },
  { week: 'Week 8', attendance: 85, total: 100 },
];

// Students by Standard
export const mockStudentsByStandard: StudentsByStandard[] = [
  { standard: '5', count: 2 },
  { standard: '6', count: 3 },
  { standard: '7', count: 2 },
  { standard: '8', count: 1 },
];

// Students by Gender
export const mockStudentsByGender: StudentsByGender[] = [
  { gender: 'male', count: 4 },
  { gender: 'female', count: 4 },
];
