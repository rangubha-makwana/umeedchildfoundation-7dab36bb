import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { Student } from '@/types';
import { mockStudents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentTable } from '@/components/students/StudentTable';
import { StudentFormDialog } from '@/components/students/StudentFormDialog';
import { StudentDetailDialog } from '@/components/students/StudentDetailDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [standardFilter, setStandardFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const { toast } = useToast();

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesStandard = standardFilter === 'all' || student.standard === standardFilter;
      const matchesGender = genderFilter === 'all' || student.gender === genderFilter;
      
      return matchesSearch && matchesStatus && matchesStandard && matchesGender;
    });
  }, [students, searchQuery, statusFilter, standardFilter, genderFilter]);

  const uniqueStandards = useMemo(() => {
    const standards = [...new Set(students.map(s => s.standard))];
    return standards.sort((a, b) => parseInt(a) - parseInt(b));
  }, [students]);

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const handleSave = async (data: Partial<Student>) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API
    
    if (selectedStudent) {
      setStudents(prev => prev.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, ...data, updatedAt: new Date() }
          : s
      ));
      toast({
        title: 'Student updated',
        description: `${data.fullName} has been updated successfully.`,
      });
    } else {
      const newStudent: Student = {
        id: `s${Date.now()}`,
        fullName: data.fullName!,
        gender: data.gender!,
        standard: data.standard!,
        status: data.status || 'active',
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      } as Student;
      setStudents(prev => [newStudent, ...prev]);
      toast({
        title: 'Student added',
        description: `${data.fullName} has been added successfully.`,
      });
    }
    setSelectedStudent(null);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      setStudents(prev => prev.filter(s => s.id !== selectedStudent.id));
      toast({
        title: 'Student deleted',
        description: `${selectedStudent.fullName} has been removed.`,
      });
      setSelectedStudent(null);
      setIsDeleteOpen(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Standard', 'Gender', 'School', 'Guardian Name', 'Guardian Phone', 'Status', 'Join Date'],
      ...filteredStudents.map(s => [
        s.fullName,
        s.standard,
        s.gender,
        s.schoolName || '',
        s.guardianName || '',
        s.guardianPhone || '',
        s.status,
        new Date(s.joinDate).toLocaleDateString(),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Export complete',
      description: 'Students data has been exported to CSV.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header">Students</h1>
          <p className="page-subheader">Manage and track all enrolled students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => { setSelectedStudent(null); setIsFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={standardFilter} onValueChange={setStandardFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Standard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Standards</SelectItem>
              {uniqueStandards.map(std => (
                <SelectItem key={std} value={std}>Std {std}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gender</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredStudents.length} of {students.length} students
      </p>

      {/* Table */}
      <StudentTable
        students={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Form Dialog */}
      <StudentFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        student={selectedStudent}
        onSave={handleSave}
      />

      {/* Detail Dialog */}
      <StudentDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        student={selectedStudent}
        onEdit={() => {
          setIsDetailOpen(false);
          setIsFormOpen(true);
        }}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedStudent?.fullName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
