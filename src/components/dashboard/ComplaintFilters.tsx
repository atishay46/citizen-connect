import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { COMPLAINT_CATEGORIES, type ComplaintFilters } from "@/services/api";
import { Filter, X } from "lucide-react";

interface ComplaintFiltersProps {
  filters: ComplaintFilters;
  onFiltersChange: (filters: ComplaintFilters) => void;
}

export function ComplaintFiltersComponent({ filters, onFiltersChange }: ComplaintFiltersProps) {
  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.category || filters.urgency || filters.status;

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      {/* Category Filter */}
      <Select
        value={filters.category || "all"}
        onValueChange={(value) => 
          onFiltersChange({ ...filters, category: value === "all" ? undefined : value })
        }
      >
        <SelectTrigger className="w-[160px] bg-card">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          <SelectItem value="all">All Categories</SelectItem>
          {COMPLAINT_CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Urgency Filter */}
      <Select
        value={filters.urgency || "all"}
        onValueChange={(value) => 
          onFiltersChange({ ...filters, urgency: value === "all" ? undefined : value })
        }
      >
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Urgency" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          <SelectItem value="all">All Urgency</SelectItem>
          <SelectItem value="high">High Priority</SelectItem>
          <SelectItem value="medium">Medium Priority</SelectItem>
          <SelectItem value="low">Low Priority</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={filters.status || "all"}
        onValueChange={(value) => 
          onFiltersChange({ ...filters, status: value === "all" ? undefined : value })
        }
      >
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
