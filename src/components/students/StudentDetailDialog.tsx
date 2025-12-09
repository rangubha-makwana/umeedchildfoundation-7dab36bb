import { format } from 'date-fns';
import { Student } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Pencil, Phone, MapPin, School, Calendar, User } from 'lucide-react';

interface StudentDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onEdit: () => void;
}

export function StudentDetailDialog({ open, onOpenChange, student, onEdit }: StudentDetailDialogProps) {
  if (!student) return null;

  const getStatusBadge = (status: Student['status']) => {
    const variants = {
      active: 'active',
      inactive: 'inactive',
      dropped: 'destructive',
    } as const;
    
    return (
      <Badge variant={variants[status]} className="text-sm">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{student.fullName}</DialogTitle>
              <p className="text-muted-foreground mt-1">
                Standard {student.standard} • {student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
              </p>
            </div>
            {getStatusBadge(student.status)}
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            {student.dateOfBirth && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{format(new Date(student.dateOfBirth), 'MMM d, yyyy')}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{format(new Date(student.joinDate), 'MMM d, yyyy')}</p>
              </div>
            </div>
          </div>

          {/* School */}
          {student.schoolName && (
            <div className="flex items-start gap-3">
              <School className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">School</p>
                <p className="font-medium">{student.schoolName}</p>
              </div>
            </div>
          )}

          {/* Guardian Info */}
          {(student.guardianName || student.guardianPhone) && (
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Guardian Information</p>
              {student.guardianName && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{student.guardianName}</span>
                </div>
              )}
              {student.guardianPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{student.guardianPhone}</span>
                </div>
              )}
            </div>
          )}

          {/* Address */}
          {student.address && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{student.address}</p>
              </div>
            </div>
          )}

          {/* Notes */}
          {student.notes && (
            <div className="p-4 bg-accent rounded-lg">
              <p className="text-sm font-medium text-accent-foreground mb-1">Notes</p>
              <p className="text-sm text-muted-foreground">{student.notes}</p>
            </div>
          )}

          {/* Attendance Summary Placeholder */}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium text-muted-foreground mb-2">Attendance Summary</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">85%</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Sessions Attended</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
