import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'pending' | 'in_progress' | 'resolved';
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-status-pending/20 text-status-pending border border-status-pending/30',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-status-in-progress/20 text-status-in-progress border border-status-in-progress/30',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-status-resolved/20 text-status-resolved border border-status-resolved/30',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
