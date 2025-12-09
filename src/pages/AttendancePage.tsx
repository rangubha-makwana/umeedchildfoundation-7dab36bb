import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Check, X, Clock, AlertCircle, Save, CheckCheck } from 'lucide-react';
import { Student, AttendanceStatus, StudentAttendance } from '@/types';
import { mockStudents, mockAttendance } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const statusOptions: { value: AttendanceStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'present', label: 'Present', icon: <Check className="w-4 h-4" />, color: 'text-success' },
  { value: 'absent', label: 'Absent', icon: <X className="w-4 h-4" />, color: 'text-destructive' },
  { value: 'late', label: 'Late', icon: <Clock className="w-4 h-4" />, color: 'text-warning' },
  { value: 'excused', label: 'Excused', icon: <AlertCircle className="w-4 h-4" />, color: 'text-info' },
];

export default function AttendancePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [sessionTitle, setSessionTitle] = useState('Sunday Class');
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Only show active students
  const activeStudents = useMemo(() => 
    mockStudents.filter(s => s.status === 'active'),
    []
  );

  // Initialize attendance for the selected date
  const existingAttendance = useMemo(() => {
    return mockAttendance.filter(a => 
      format(new Date(a.date), 'yyyy-MM-dd') === selectedDate
    );
  }, [selectedDate]);

  // Initialize state when date changes
  useState(() => {
    const initial: Record<string, AttendanceStatus> = {};
    const initialRemarks: Record<string, string> = {};
    
    existingAttendance.forEach(a => {
      initial[a.studentId] = a.status;
      if (a.remarks) initialRemarks[a.studentId] = a.remarks;
    });
    
    setAttendanceData(initial);
    setRemarks(initialRemarks);
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const newData: Record<string, AttendanceStatus> = {};
    activeStudents.forEach(s => {
      newData[s.id] = status;
    });
    setAttendanceData(newData);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Attendance saved',
      description: `Attendance for ${format(new Date(selectedDate), 'MMMM d, yyyy')} has been saved.`,
    });
    
    setIsSaving(false);
  };

  const markedCount = Object.keys(attendanceData).length;
  const presentCount = Object.values(attendanceData).filter(s => s === 'present').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Attendance</h1>
          <p className="page-subheader">Mark and manage student attendance</p>
        </div>
      </div>

      {/* Date & Session Selection */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Title</label>
              <Input
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                placeholder="e.g., Sunday Class - English"
              />
            </div>

            <div className="flex items-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleMarkAll('present')}
                className="flex-1"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark All Present
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold">{activeStudents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground">Marked</p>
            <p className="text-2xl font-bold">{markedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground">Present</p>
            <p className="text-2xl font-bold text-success">{presentCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground">Attendance %</p>
            <p className="text-2xl font-bold">
              {markedCount > 0 ? Math.round((presentCount / markedCount) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Attendance for {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Student</TableHead>
                  <TableHead className="font-semibold">Standard</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{student.fullName}</TableCell>
                    <TableCell>Std {student.standard}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {statusOptions.map((option) => (
                          <Button
                            key={option.value}
                            variant={attendanceData[student.id] === option.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleStatusChange(student.id, option.value)}
                            className={attendanceData[student.id] === option.value ? '' : option.color}
                          >
                            {option.icon}
                            <span className="hidden sm:inline ml-1">{option.label}</span>
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Input
                        placeholder="Optional remarks..."
                        value={remarks[student.id] || ''}
                        onChange={(e) => setRemarks(prev => ({ ...prev, [student.id]: e.target.value }))}
                        className="h-8 text-sm"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={handleSave}
          disabled={isSaving || markedCount === 0}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
