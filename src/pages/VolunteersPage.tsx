import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Volunteer } from '@/types';
import { mockVolunteers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { VolunteerTable } from '@/components/volunteers/VolunteerTable';
import { VolunteerFormDialog } from '@/components/volunteers/VolunteerFormDialog';
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
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function VolunteersPage() {
  const { hasRole } = useAuth();
  const [volunteers, setVolunteers] = useState<Volunteer[]>(mockVolunteers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  
  const { toast } = useToast();

  // Check permissions
  if (!hasRole(['admin', 'coordinator'])) {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((volunteer) => {
      const matchesSearch = 
        volunteer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && volunteer.isActive) ||
        (statusFilter === 'inactive' && !volunteer.isActive);
      const matchesRole = roleFilter === 'all' || volunteer.role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [volunteers, searchQuery, statusFilter, roleFilter]);

  const handleEdit = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsFormOpen(true);
  };

  const handleDelete = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsDeleteOpen(true);
  };

  const handleSave = async (data: Partial<Volunteer>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (selectedVolunteer) {
      setVolunteers(prev => prev.map(v => 
        v.id === selectedVolunteer.id 
          ? { ...v, ...data, updatedAt: new Date() }
          : v
      ));
      toast({
        title: 'Volunteer updated',
        description: `${data.fullName} has been updated successfully.`,
      });
    } else {
      const newVolunteer: Volunteer = {
        id: `v${Date.now()}`,
        fullName: data.fullName!,
        email: data.email!,
        role: data.role || 'volunteer',
        isActive: data.isActive ?? true,
        joinDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      } as Volunteer;
      setVolunteers(prev => [newVolunteer, ...prev]);
      toast({
        title: 'Volunteer added',
        description: `${data.fullName} has been added successfully.`,
      });
    }
    setSelectedVolunteer(null);
  };

  const confirmDelete = () => {
    if (selectedVolunteer) {
      setVolunteers(prev => prev.filter(v => v.id !== selectedVolunteer.id));
      toast({
        title: 'Volunteer deleted',
        description: `${selectedVolunteer.fullName} has been removed.`,
      });
      setSelectedVolunteer(null);
      setIsDeleteOpen(false);
    }
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
          <h1 className="page-header">Volunteers</h1>
          <p className="page-subheader">Manage your volunteer team</p>
        </div>
        <Button onClick={() => { setSelectedVolunteer(null); setIsFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Volunteer
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="coordinator">Coordinator</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredVolunteers.length} of {volunteers.length} volunteers
      </p>

      {/* Table */}
      <VolunteerTable
        volunteers={filteredVolunteers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <VolunteerFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        volunteer={selectedVolunteer}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Volunteer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedVolunteer?.fullName}? This action cannot be undone.
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
