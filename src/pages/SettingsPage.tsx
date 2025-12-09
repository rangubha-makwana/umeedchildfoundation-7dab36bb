import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Shield, Bell, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function SettingsPage() {
  const { hasRole, user } = useAuth();
  const { toast } = useToast();
  
  const [orgName, setOrgName] = useState('Umeed Child Foundation');
  const [orgEmail, setOrgEmail] = useState('contact@umeedchildfoundation.org');
  const [orgPhone, setOrgPhone] = useState('+91 9876543210');
  const [orgAddress, setOrgAddress] = useState('Ahmedabad, Gujarat, India');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [attendanceReminders, setAttendanceReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  if (!hasRole(['admin'])) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully.',
    });
    
    setIsSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="page-header">Settings</h1>
        <p className="page-subheader">Manage your organization settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>Basic information about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgEmail">Contact Email</Label>
                  <Input
                    id="orgEmail"
                    type="email"
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgPhone">Contact Phone</Label>
                  <Input
                    id="orgPhone"
                    value={orgPhone}
                    onChange={(e) => setOrgPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgAddress">Address</Label>
                <Textarea
                  id="orgAddress"
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Settings</CardTitle>
              <CardDescription>Configure default session parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Session Day</Label>
                  <Input value="Sunday" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Default Session Time</Label>
                  <Input value="10:00 AM - 1:00 PM" readOnly className="bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you receive</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Attendance Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminders to mark attendance</p>
                </div>
                <Switch
                  checked={attendanceReminders}
                  onCheckedChange={setAttendanceReminders}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                </div>
                <Switch
                  checked={weeklyReports}
                  onCheckedChange={setWeeklyReports}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage security preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">Current User</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {user?.fullName}</p>
                  <p><span className="text-muted-foreground">Email:</span> {user?.email}</p>
                  <p><span className="text-muted-foreground">Role:</span> {user?.role}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Change Password</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                </div>
                <Button variant="outline" className="mt-2">Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10 text-info">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your data and backups</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Export all your data or request a backup. This includes all students, volunteers, and attendance records.
              </p>
              <div className="flex gap-2">
                <Button variant="outline">Export All Data</Button>
                <Button variant="outline">Request Backup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
