import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ComplaintFiltersComponent } from "@/components/dashboard/ComplaintFilters";
import { ComplaintTable } from "@/components/dashboard/ComplaintTable";
import { useToast } from "@/hooks/use-toast";
import { 
  getComplaints, 
  updateComplaintStatus, 
  type Complaint, 
  type ComplaintFilters 
} from "@/services/api";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for demonstration (will be replaced by API data)
const mockComplaints: Complaint[] = [
  {
    id: '1',
    fullName: 'Rajesh Kumar',
    location: 'Sector 21, Noida',
    category: 'Infrastructure',
    description: 'Large pothole on main road causing accidents. Multiple vehicles have been damaged. Immediate repair needed before monsoon season.',
    aiCategory: 'Roads & Transport',
    aiUrgency: 'high',
    assignedDepartment: 'Public Works',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    fullName: 'Priya Sharma',
    location: 'MG Road, Bangalore',
    category: 'Water Supply',
    description: 'No water supply for the past 3 days in our apartment complex. Over 200 families affected. Tanker supply requested multiple times.',
    aiCategory: 'Water Supply',
    aiUrgency: 'high',
    assignedDepartment: 'Water Board',
    status: 'in_progress',
    createdAt: '2024-01-14T08:15:00Z',
  },
  {
    id: '3',
    location: 'Connaught Place, Delhi',
    category: 'Sanitation',
    description: 'Garbage not collected for a week. Overflowing bins causing health hazard and bad smell in the commercial area.',
    aiCategory: 'Sanitation',
    aiUrgency: 'medium',
    assignedDepartment: 'Municipal Corporation',
    status: 'pending',
    createdAt: '2024-01-13T14:45:00Z',
  },
  {
    id: '4',
    fullName: 'Amit Patel',
    location: 'Andheri West, Mumbai',
    category: 'Electricity',
    description: 'Frequent power cuts in residential area. 4-5 hours of outage daily affecting work from home employees and students.',
    aiCategory: 'Electricity',
    aiUrgency: 'medium',
    assignedDepartment: 'Electricity Board',
    status: 'in_progress',
    createdAt: '2024-01-12T16:20:00Z',
  },
  {
    id: '5',
    location: 'Salt Lake, Kolkata',
    category: 'Environmental',
    description: 'Illegal dumping of construction waste in public park. Green space being destroyed. Need enforcement action.',
    aiCategory: 'Environmental',
    aiUrgency: 'low',
    assignedDepartment: 'Environment Agency',
    status: 'resolved',
    createdAt: '2024-01-10T09:00:00Z',
  },
  {
    id: '6',
    fullName: 'Sunita Devi',
    location: 'Banjara Hills, Hyderabad',
    category: 'Public Health',
    description: 'Stray dog menace in the locality. Multiple incidents of dog bites reported. Sterilization drive needed urgently.',
    aiCategory: 'Public Health',
    aiUrgency: 'high',
    assignedDepartment: 'Health Department',
    status: 'pending',
    createdAt: '2024-01-11T11:30:00Z',
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [filters, setFilters] = useState<ComplaintFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch complaints from API
  // In production, this would call the actual API
  const fetchComplaints = async () => {
    setIsLoading(true);
    try {
      // API call would go here: const data = await getComplaints(filters);
      // For demo, using mock data
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      setComplaints(mockComplaints);
    } catch (error) {
      // Fallback to mock data for demo
      setComplaints(mockComplaints);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Apply filters locally (in production, filters would be sent to API)
  useEffect(() => {
    let result = [...complaints];
    
    if (filters.category) {
      result = result.filter(c => c.aiCategory === filters.category || c.category === filters.category);
    }
    if (filters.urgency) {
      result = result.filter(c => c.aiUrgency === filters.urgency);
    }
    if (filters.status) {
      result = result.filter(c => c.status === filters.status);
    }
    
    setFilteredComplaints(result);
  }, [complaints, filters]);

  // Handle status update
  // In production, this would call PATCH /api/complaints/:id
  const handleStatusChange = async (id: string, status: Complaint['status']) => {
    try {
      // API call would go here: await updateComplaintStatus(id, status);
      
      // Update local state optimistically
      setComplaints(prev => 
        prev.map(c => c.id === id ? { ...c, status } : c)
      );
      
      toast({
        title: "Status Updated",
        description: `Complaint status changed to ${status.replace('_', ' ')}.`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update complaint status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12 bg-background">
        <div className="container space-y-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Authority Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and resolve citizen complaints efficiently
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={fetchComplaints}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Stats Overview */}
          <DashboardStats complaints={complaints} />

          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            <ComplaintFiltersComponent 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
          </div>

          {/* Complaints Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading complaints...</span>
            </div>
          ) : (
            <ComplaintTable 
              complaints={filteredComplaints} 
              onStatusChange={handleStatusChange} 
            />
          )}

          {/* Results Count */}
          {!isLoading && (
            <p className="text-sm text-muted-foreground text-center">
              Showing {filteredComplaints.length} of {complaints.length} complaints
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
