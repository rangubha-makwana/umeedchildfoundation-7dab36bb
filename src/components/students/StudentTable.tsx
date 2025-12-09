import { useState } from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import { Student } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  onView: (student: Student) => void;
}

export function StudentTable({ students, onEdit, onDelete, onView }: StudentTableProps) {
  const getStatusBadge = (status: Student['status']) => {
    const variants = {
      active: 'active',
      inactive: 'inactive',
      dropped: 'destructive',
    } as const;
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Standard</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">School</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Guardian Phone</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Join Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow 
                key={student.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onView(student)}
              >
                <TableCell className="font-medium">{student.fullName}</TableCell>
                <TableCell>Std {student.standard}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {student.schoolName || '-'}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {student.guardianPhone || '-'}
                </TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {format(new Date(student.joinDate), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(student); }}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(student); }}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); onDelete(student); }}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
