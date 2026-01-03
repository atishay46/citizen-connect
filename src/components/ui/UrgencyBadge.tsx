import { cn } from "@/lib/utils";

interface UrgencyBadgeProps {
  urgency: 'high' | 'medium' | 'low';
  className?: string;
}

const urgencyConfig = {
  high: {
    label: 'High Priority',
    className: 'bg-accent text-accent-foreground',
  },
  medium: {
    label: 'Medium Priority',
    className: 'bg-secondary text-secondary-foreground',
  },
  low: {
    label: 'Low Priority',
    className: 'bg-muted text-muted-foreground',
  },
};

export function UrgencyBadge({ urgency, className }: UrgencyBadgeProps) {
  const config = urgencyConfig[urgency];
  
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
