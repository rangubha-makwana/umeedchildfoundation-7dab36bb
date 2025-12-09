import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Users, CalendarCheck } from 'lucide-react';
import { format, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { mockStudents, mockAttendance, mockVolunteers } from '@/data/mockData';

export default function ReportsPage() {
  const { hasRole } = useAuth();
  const { toast } = useToast();
  
  const [dateFrom, setDateFrom] = useState(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
  const [dateTo, setDateTo] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [reportType, setReportType] = useState('attendance');

  if (!hasRole(['admin', 'coordinator'])) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleExportStudents = () => {
    const csv = [
      ['ID', 'Name', 'Standard', 'Gender', 'School', 'Guardian Name', 'Guardian Phone', 'Status', 'Join Date'],
      ...mockStudents.map(s => [
        s.id,
        s.fullName,
        s.standard,
        s.gender,
        s.schoolName || '',
        s.guardianName || '',
        s.guardianPhone || '',
        s.status,
        format(new Date(s.joinDate), 'yyyy-MM-dd'),
      ])
    ].map(row => row.join(',')).join('\n');

    downloadCSV(csv, 'students_report.csv');
  };

  const handleExportVolunteers = () => {
    const csv = [
      ['ID', 'Name', 'Email', 'Phone', 'Role', 'Availability', 'Active', 'Join Date'],
      ...mockVolunteers.map(v => [
        v.id,
        v.fullName,
        v.email,
        v.phone || '',
        v.role,
        v.availability || '',
        v.isActive ? 'Yes' : 'No',
        format(new Date(v.joinDate), 'yyyy-MM-dd'),
      ])
    ].map(row => row.join(',')).join('\n');

    downloadCSV(csv, 'volunteers_report.csv');
  };

  const handleExportAttendance = () => {
    const filteredAttendance = mockAttendance.filter(a => {
      const date = new Date(a.date);
      return date >= new Date(dateFrom) && date <= new Date(dateTo);
    });

    const csv = [
      ['Date', 'Student ID', 'Student Name', 'Status', 'Remarks'],
      ...filteredAttendance.map(a => {
        const student = mockStudents.find(s => s.id === a.studentId);
        return [
          format(new Date(a.date), 'yyyy-MM-dd'),
          a.studentId,
          student?.fullName || 'Unknown',
          a.status,
          a.remarks || '',
        ];
      })
    ].map(row => row.join(',')).join('\n');

    downloadCSV(csv, `attendance_report_${dateFrom}_to_${dateTo}.csv`);
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Report exported',
      description: `${filename} has been downloaded.`,
    });
  };

  const summaryStats = {
    totalStudents: mockStudents.length,
    activeStudents: mockStudents.filter(s => s.status === 'active').length,
    totalVolunteers: mockVolunteers.length,
    activeVolunteers: mockVolunteers.filter(v => v.isActive).length,
    totalAttendanceRecords: mockAttendance.length,
    averageAttendance: 82,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="page-header">Reports</h1>
        <p className="page-subheader">Generate and export reports</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">{summaryStats.activeStudents} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalVolunteers}</div>
            <p className="text-xs text-muted-foreground">{summaryStats.activeVolunteers} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Students Report */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Students Report</CardTitle>
                <CardDescription>Export all student data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Download a complete list of all students with their details including contact information, standard, and status.
            </p>
            <Button onClick={handleExportStudents} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Students CSV
            </Button>
          </CardContent>
        </Card>

        {/* Volunteers Report */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Volunteers Report</CardTitle>
                <CardDescription>Export volunteer data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Download a complete list of all volunteers including their contact details, role, and availability.
            </p>
            <Button onClick={handleExportVolunteers} variant="secondary" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Volunteers CSV
            </Button>
          </CardContent>
        </Card>

        {/* Attendance Report */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10 text-success">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Attendance Report</CardTitle>
                <CardDescription>Export attendance records</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">From</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">To</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>
            <Button onClick={handleExportAttendance} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Attendance CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
