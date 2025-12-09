import { motion } from 'framer-motion';
import { GraduationCap, Users, CalendarCheck, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { StudentsPieChart } from '@/components/dashboard/StudentsPieChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/contexts/AuthContext';
import { 
  mockDashboardStats, 
  mockAttendanceTrends, 
  mockStudentsByStandard,
  mockStudentsByGender 
} from '@/data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user } = useAuth();
  
  const standardData = mockStudentsByStandard.map(s => ({
    name: `Std ${s.standard}`,
    value: s.count,
  }));

  const genderData = mockStudentsByGender.map(g => ({
    name: g.gender.charAt(0).toUpperCase() + g.gender.slice(1),
    value: g.count,
  }));

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="page-header">
          Welcome back, {user?.fullName?.split(' ')[0]}!
        </h1>
        <p className="page-subheader">
          Here's what's happening with your students and volunteers.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Students"
          value={mockDashboardStats.totalStudents}
          subtitle={`${mockDashboardStats.activeStudents} active`}
          icon={GraduationCap}
          color="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Volunteers"
          value={mockDashboardStats.activeVolunteers}
          subtitle={`of ${mockDashboardStats.totalVolunteers} total`}
          icon={Users}
          color="secondary"
        />
        <StatCard
          title="Attendance Rate"
          value={`${mockDashboardStats.attendanceThisMonth}%`}
          subtitle="This month"
          icon={CalendarCheck}
          color="success"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Sessions Held"
          value={mockDashboardStats.recentSessions}
          subtitle="This month"
          icon={TrendingUp}
          color="info"
        />
      </motion.div>

      {/* Charts Row */}
      <motion.div 
        variants={item}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AttendanceChart data={mockAttendanceTrends} />
        <StudentsPieChart data={standardData} title="Students by Standard" />
      </motion.div>

      {/* Bottom Row */}
      <motion.div 
        variants={item}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <StudentsPieChart data={genderData} title="Students by Gender" />
        <RecentActivity />
      </motion.div>
    </motion.div>
  );
}
