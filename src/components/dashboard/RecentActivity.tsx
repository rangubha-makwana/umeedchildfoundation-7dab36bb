import { formatDistanceToNow } from 'date-fns';
import { ClipboardCheck, UserPlus, Calendar } from 'lucide-react';

interface Activity {
  id: string;
  type: 'attendance' | 'student' | 'session';
  title: string;
  description: string;
  date: Date;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'attendance',
    title: 'Attendance Marked',
    description: 'Sunday Class - English & Craft (7 students)',
    date: new Date(),
  },
  {
    id: '2',
    type: 'student',
    title: 'New Student Enrolled',
    description: 'Kavya Joshi joined Standard 6',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'session',
    title: 'Session Completed',
    description: 'Mathematics workshop conducted',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'attendance',
    title: 'Attendance Marked',
    description: 'Sunday Class - Mathematics (7 students)',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    type: 'student',
    title: 'Student Updated',
    description: 'Aarav Patel moved to Standard 7',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

const iconMap = {
  attendance: ClipboardCheck,
  student: UserPlus,
  session: Calendar,
};

const colorMap = {
  attendance: 'bg-success/10 text-success',
  student: 'bg-primary/10 text-primary',
  session: 'bg-info/10 text-info',
};

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-md border border-border/50">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div key={activity.id} className="flex gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${colorMap[activity.type]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(activity.date, { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
