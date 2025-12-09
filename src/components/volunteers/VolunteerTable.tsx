import { format } from 'date-fns';
import { MoreHorizontal, Pencil, Trash2, Mail, Phone } from 'lucide-react';
import { Volunteer } from '@/types';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface VolunteerTableProps {
  volunteers: Volunteer[];
  onEdit: (volunteer: Volunteer) => void;
  onDelete: (volunteer: Volunteer) => void;
}

export function VolunteerTable({ volunteers, onEdit, onDelete }: VolunteerTableProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Volunteer</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Contact</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Availability</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Join Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {volunteers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No volunteers found
              </TableCell>
            </TableRow>
          ) : (
            volunteers.map((volunteer) => (
              <TableRow key={volunteer.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                        {getInitials(volunteer.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{volunteer.fullName}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {volunteer.email}
                    </div>
                    {volunteer.phone && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {volunteer.phone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={volunteer.role === 'coordinator' ? 'default' : 'secondary'}>
                    {volunteer.role.charAt(0).toUpperCase() + volunteer.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {volunteer.availability || '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={volunteer.isActive ? 'active' : 'inactive'}>
                    {volunteer.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {format(new Date(volunteer.joinDate), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(volunteer)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(volunteer)} className="text-destructive">
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
