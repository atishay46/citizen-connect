// API Service Layer
// All API calls are centralized here for easy backend integration
// Backend endpoints: Express.js + Python Flask NLP service + Supabase

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface Complaint {
  id: string;
  fullName?: string;
  location: string;
  category: string;
  description: string;
  aiCategory?: string;
  aiUrgency: 'high' | 'medium' | 'low';
  assignedDepartment?: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
}

export interface ComplaintSubmission {
  fullName?: string;
  location: string;
  category?: string;
  description: string;
}

export interface ComplaintFilters {
  category?: string;
  urgency?: string;
  status?: string;
}

// POST /api/complaints - Submit a new complaint
// Backend will process with AI/NLP for categorization and urgency
export async function submitComplaint(data: ComplaintSubmission): Promise<{ success: boolean; id?: string; message: string }> {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit complaint');
  }
  
  return response.json();
}

// GET /api/complaints - Fetch all complaints with optional filters
// Used by authority dashboard
export async function getComplaints(filters?: ComplaintFilters): Promise<Complaint[]> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.urgency) params.append('urgency', filters.urgency);
  if (filters?.status) params.append('status', filters.status);
  
  const queryString = params.toString();
  const url = `${API_BASE_URL}/complaints${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch complaints');
  }
  
  return response.json();
}

// PATCH /api/complaints/:id - Update complaint status
// Used by authorities to update complaint progress
export async function updateComplaintStatus(
  id: string, 
  status: Complaint['status']
): Promise<Complaint> {
  const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update complaint status');
  }
  
  return response.json();
}

// GET /api/complaints/:id - Fetch single complaint details
export async function getComplaintById(id: string): Promise<Complaint> {
  const response = await fetch(`${API_BASE_URL}/complaints/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch complaint');
  }
  
  return response.json();
}

// Categories for dropdown - can be fetched from API later
export const COMPLAINT_CATEGORIES = [
  'Infrastructure',
  'Public Health',
  'Sanitation',
  'Water Supply',
  'Electricity',
  'Roads & Transport',
  'Education',
  'Law & Order',
  'Environmental',
  'Other',
] as const;

export const DEPARTMENTS = [
  'Public Works',
  'Health Department',
  'Municipal Corporation',
  'Water Board',
  'Electricity Board',
  'Transport Authority',
  'Education Board',
  'Police Department',
  'Environment Agency',
  'General Administration',
] as const;
