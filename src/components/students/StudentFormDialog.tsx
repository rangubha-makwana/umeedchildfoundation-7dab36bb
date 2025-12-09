import { useState, useEffect } from 'react';
import { Student, Gender, StudentStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface StudentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
  onSave: (data: Partial<Student>) => Promise<void>;
}

export function StudentFormDialog({ open, onOpenChange, student, onSave }: StudentFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'male' as Gender,
    dateOfBirth: '',
    schoolName: '',
    standard: '',
    guardianName: '',
    guardianPhone: '',
    address: '',
    status: 'active' as StudentStatus,
    notes: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
        schoolName: student.schoolName || '',
        standard: student.standard,
        guardianName: student.guardianName || '',
        guardianPhone: student.guardianPhone || '',
        address: student.address || '',
        status: student.status,
        notes: student.notes || '',
      });
    } else {
      setFormData({
        fullName: '',
        gender: 'male',
        dateOfBirth: '',
        schoolName: '',
        standard: '',
        guardianName: '',
        guardianPhone: '',
        address: '',
        status: 'active',
        notes: '',
      });
    }
  }, [student, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave({
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: Gender) => setFormData(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="standard">Standard *</Label>
              <Select
                value={formData.standard}
                onValueChange={(value) => setFormData(prev => ({ ...prev, standard: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select standard" />
                </SelectTrigger>
                <SelectContent>
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((std) => (
                    <SelectItem key={std} value={std}>Standard {std}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                value={formData.schoolName}
                onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                placeholder="Enter school name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: StudentStatus) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardianName">Guardian Name</Label>
              <Input
                id="guardianName"
                value={formData.guardianName}
                onChange={(e) => setFormData(prev => ({ ...prev, guardianName: e.target.value }))}
                placeholder="Enter guardian name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardianPhone">Guardian Phone</Label>
              <Input
                id="guardianPhone"
                value={formData.guardianPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, guardianPhone: e.target.value }))}
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter address"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional notes..."
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.fullName || !formData.standard}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {student ? 'Update Student' : 'Add Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
