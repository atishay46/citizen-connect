import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UrgencyBadge } from "@/components/ui/UrgencyBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { type Complaint } from "@/services/api";
import { MapPin, Building2 } from "lucide-react";

interface ComplaintTableProps {
  complaints: Complaint[];
  onStatusChange: (id: string, status: Complaint['status']) => void;
}

export function ComplaintTable({ complaints, onStatusChange }: ComplaintTableProps) {
  if (complaints.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">No complaints found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Complaint Summary</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold">AI Category</TableHead>
            <TableHead className="font-semibold">Urgency</TableHead>
            <TableHead className="font-semibold">Department</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint.id} className="hover:bg-muted/30">
              <TableCell className="max-w-[250px]">
                <p className="font-medium text-foreground line-clamp-2">
                  {complaint.description.length > 100 
                    ? `${complaint.description.substring(0, 100)}...` 
                    : complaint.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(complaint.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {complaint.location}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-foreground">
                  {complaint.aiCategory || complaint.category}
                </span>
              </TableCell>
              <TableCell>
                <UrgencyBadge urgency={complaint.aiUrgency} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  {complaint.assignedDepartment || 'Unassigned'}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={complaint.status} />
              </TableCell>
              <TableCell className="text-right">
                <Select
                  value={complaint.status}
                  onValueChange={(value) => 
                    onStatusChange(complaint.id, value as Complaint['status'])
                  }
                >
                  <SelectTrigger className="w-[130px] bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
