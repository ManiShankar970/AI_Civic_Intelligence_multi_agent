export interface Location {
  lat: number;
  lng: number;
  address?: string;
  landmark?: string;
}

export type SeverityType = "Low" | "Medium" | "High" | "Critical";

export type ComplaintStatus =
  | "Submitted"
  | "Assigned"
  | "Accepted"
  | "In Progress"
  | "Inspection"
  | "Completed";

export interface TimelineEvent {
  status: ComplaintStatus | "Citizen Feedback";
  timestamp: string;
  description: string;
  isCompleted: boolean;
}

export interface ActivityLog {
  action: string;
  date: string;
  user: string;
  notes?: string;
}

export interface Complaint {
  id: string;
  image: string;
  description: string;
  location: Location;
  issueType: string;
  severity: SeverityType;
  department: string;
  status: ComplaintStatus;
  createdAt: string;
  confidenceScore: number;
  recommendedAction: string;
  expectedImpact: string;
  timeline: TimelineEvent[];
  history: ActivityLog[];
}

export interface AgentStatus {
  id: string;
  name: string;
  description: string;
  status: "waiting" | "running" | "completed" | "failed";
  output?: string;
}

export interface DashboardStats {
  total: number;
  resolved: number;
  pending: number;
  avgResolutionTime: string; // e.g. "14.2 Hours"
  aiAccuracy: string; // e.g. "98.4%"
  satisfaction: string; // e.g. "4.8/5"
}
