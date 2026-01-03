import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, CheckCircle2, FileText } from "lucide-react";
import { type Complaint } from "@/services/api";

interface DashboardStatsProps {
  complaints: Complaint[];
}

export function DashboardStats({ complaints }: DashboardStatsProps) {
  const totalComplaints = complaints.length;
  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
  const highPriorityCount = complaints.filter(c => c.aiUrgency === 'high').length;

  const stats = [
    {
      label: 'Total Complaints',
      value: totalComplaints,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'High Priority',
      value: highPriorityCount,
      icon: AlertTriangle,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'In Progress',
      value: inProgressCount,
      icon: Clock,
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
    },
    {
      label: 'Resolved',
      value: resolvedCount,
      icon: CheckCircle2,
      color: 'text-status-resolved',
      bgColor: 'bg-status-resolved/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border shadow-card">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center shrink-0`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
