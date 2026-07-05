import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShieldCheck,
  Search,
  Filter,
  Layers,
  MapPin,
  ShieldAlert,
  FileBadge2,
  LogOut,
  Trash2,
  Calendar
} from "lucide-react";
import { Button, Card, Badge, Input, EmptyState } from "../components/common/CommonComponents";
import { Complaint, ComplaintStatus } from "../types";

export const DepartmentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Navigation / Filter States
  const departments = [
    "Sanitation Department",
    "Road Maintenance",
    "Water Supply",
    "Drainage",
    "Electricity"
  ];
  
  const [activeDepartment, setActiveDepartment] = useState<string>(departments[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [auditNotes, setAuditNotes] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
      "http://localhost:5678/webhook-test/get-department",
      {
          params:{
              department:activeDepartment
          }
      }
      );
      const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
      setComplaints(data);
      
      // Auto-select first complaint of the active department if none selected
      const departmentData = data.filter((c: any) => c.department === activeDepartment || !c.department);
      if (departmentData.length > 0) {
        setSelectedComplaint(departmentData[0]);
      } else {
        setSelectedComplaint(null);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDepartment]);

  const handleUpdateStatus = async (
    id: string,
    nextStatus: ComplaintStatus
  ) => {

    try {

      const response = await axios.post(
        "http://localhost:5678/webhook-test/update-status",
        {
          complaint_id: id,
          status: nextStatus,
        }
      );

      // Only update UI if backend succeeded
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, status: nextStatus }
            : c
        )
      );

      if (selectedComplaint?.id === id) {
        setSelectedComplaint({
          ...selectedComplaint,
          status: nextStatus,
        });
      }

    } catch (err) {

      console.error(err);

      alert("Status update failed");

    }

  };

  const handleLogout = () => {
    navigate("/");
  };

  // Filter complaints based on active department, search, and severity
  // Assuming the API either returns complaints for all or we filter locally based on a 'department' field
  // If the dataset inherently lacks a department field mapped exactly, we fallback to showing fetched data 
  // but ideally `c.department` matches `activeDepartment`.
  const departmentComplaints = complaints.filter(
    (c: any) => c.department === activeDepartment || c.assignedDepartment === activeDepartment
  );

  const filteredComplaints = departmentComplaints.filter((c: any) => {

    const matchesSearch =
      (c.id ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.issueType ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.location?.address ?? "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      severityFilter === "all" ||
      (c.severity ?? "").toLowerCase() === severityFilter.toLowerCase();

    return matchesSearch && matchesSeverity;

  });

  // Calculate Real Analytics from filtered data
  const activeBacklog = departmentComplaints.filter((c) => c.status !== "Completed").length;
  const unassignedReports = departmentComplaints.filter((c) => c.status === "Submitted").length;
  const completedRepairs = departmentComplaints.filter((c) => c.status === "Completed").length;
  const totalReports = departmentComplaints.length;

  return (
    <div id="department-dashboard" className="min-h-screen bg-slate-50/50 flex flex-col md:flex-row text-left">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-400 p-6 flex flex-col justify-between border-r border-slate-800">
        <div className="space-y-8">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-5">
            <div className="p-1.5 rounded-lg bg-brand-blue-600 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white tracking-tight text-sm">
                GOV PORTAL v1.2
              </h2>
              <p className="font-mono text-[9px] text-slate-500 uppercase">
                Department Workspace
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase pl-3">
                Departments
              </span>
              <div className="space-y-1">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setActiveDepartment(dept);
                      setSearchQuery("");
                      const deptData = complaints.filter((c: any) => c.department === dept || c.assignedDepartment === dept);
                      setSelectedComplaint(deptData.length > 0 ? deptData[0] : null);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      activeDepartment === dept
                        ? "bg-slate-800 text-white shadow-sm shadow-black/10 border-l-2 border-brand-blue-500"
                        : "hover:bg-slate-850 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{dept}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-4 border-t border-slate-800/50">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase pl-3">
                Audit Controls
              </span>
              <div className="space-y-1 text-xs font-semibold">
                <button
                  onClick={() => navigate("/analytics")}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-850 hover:text-slate-200 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Interactive Charts</span>
                </button>
                <button
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-850 hover:text-slate-200 cursor-pointer"
                >
                  <FileBadge2 className="w-4 h-4" />
                  <span>Compliance Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 mt-8 space-y-4">
          <div className="flex items-center gap-2.5 pl-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-green-500 animate-pulse" />
            <span className="font-mono text-[10px] text-slate-500 font-bold tracking-wider">
              SYSTEM: ONLINE
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl cursor-pointer transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Workstation</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto max-h-screen">
        
        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Active Backlog
            </span>
            <p className="font-display text-2xl font-extrabold text-slate-900 mt-1">
              {loading ? "-" : activeBacklog}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Unassigned Reports
            </span>
            <p className="font-display text-2xl font-extrabold text-brand-blue-600 mt-1">
              {loading ? "-" : unassignedReports}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Completed Repairs
            </span>
            <p className="font-display text-2xl font-extrabold text-brand-green-600 mt-1">
              {loading ? "-" : completedRepairs}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Total Reports
            </span>
            <p className="font-display text-2xl font-extrabold text-slate-900 mt-1">
              {loading ? "-" : totalReports}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Center Table of complaints */}
          <div className="lg:col-span-7 space-y-6">
            <Card hoverEffect={false} className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Input
                    id="table-search-input"
                    type="text"
                    placeholder="Search ID, issue, address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-4 h-4 text-slate-400" />}
                    className="py-1.5 px-3"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="text-xs bg-white border border-slate-200 py-2.5 px-3 rounded-xl outline-none text-slate-600 focus:border-brand-blue-500 font-sans font-semibold cursor-pointer"
                  >
                    <option value="all">All Severities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                {loading ? (
                  <div className="p-12 text-center text-slate-500 text-sm font-semibold">
                    Loading department data...
                  </div>
                ) : filteredComplaints.length > 0 ? (
                  <table className="min-w-full divide-y divide-slate-100 text-left text-xs font-sans">
                    <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3.5">Ticket ID</th>
                        <th className="px-4 py-3.5">Issue Details</th>
                        <th className="px-4 py-3.5">Date</th>
                        <th className="px-4 py-3.5">Severity</th>
                        <th className="px-4 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                      {filteredComplaints.map((c) => {
                        const isSelected = selectedComplaint?.id === c.id;
                        return (
                          <tr
                            key={c.id}
                            onClick={() => {
                              setSelectedComplaint(c);
                              setAuditNotes("");
                            }}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "bg-brand-blue-50/40 hover:bg-brand-blue-50/50" : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-4 py-4 font-mono font-bold text-slate-900">
                              {c.id}
                            </td>
                            <td className="px-4 py-4 max-w-[180px] truncate">
                              <span className="font-semibold text-slate-900 block">{c.issueType}</span>
                              <span className="text-slate-400 text-[10px] block truncate">{c.location.address}</span>
                            </td>
                            <td className="px-4 py-4 text-slate-500">
                              {c.date || new Date().toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4">
                              <Badge value={c.severity} type="severity" />
                            </td>
                            <td className="px-4 py-4">
                              <Badge value={c.status} type="status" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-12">
                    <EmptyState 
                      title="No tickets found." 
                      description="No records match your current department and filter criteria." 
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right side Detailed Control Panel */}
          <div className="lg:col-span-5">
            {selectedComplaint ? (
              <Card hoverEffect={false} className="space-y-6">
                
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Detail Control Board
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-lg">
                      {selectedComplaint.id}
                    </h3>
                  </div>
                  <Badge value={selectedComplaint.status} type="status" />
                </div>

                {selectedComplaint.image && (
                  <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100 h-40">
                    <img
                      src={selectedComplaint.image}
                      alt={selectedComplaint.issueType}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Ingestion Classification
                    </h4>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedComplaint.issueType}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Filing Date
                    </h4>
                    <p className="font-medium text-slate-600 mt-0.5 flex items-start gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {selectedComplaint.date || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Physical Location
                    </h4>
                    <p className="font-medium text-slate-600 mt-0.5 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {selectedComplaint.location.address}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Citizen Description
                    </h4>
                    <p className="text-slate-500 leading-relaxed italic bg-slate-50 p-3 rounded-xl mt-1">
                      "{selectedComplaint.description}"
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 mt-5 space-y-4">
                  <h4 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Milestone Transition Actions
                  </h4>

                  <Input
                    id="admin-notes-input"
                    label="Supervisor log comments"
                    type="text"
                    placeholder="Enter dispatch truck, team ID, or safety code..."
                    value={auditNotes}
                    onChange={(e) => setAuditNotes(e.target.value)}
                    className="py-1.5"
                  />

                  <div className="grid grid-cols-2 gap-3.5">
                    <Button
                      variant="glass"
                      size="sm"
                      disabled={selectedComplaint.status === "Accepted" || selectedComplaint.status === "In Progress" || selectedComplaint.status === "Inspection" || selectedComplaint.status === "Completed"}
                      onClick={() => handleUpdateStatus(selectedComplaint.id, "Accepted")}
                    >
                      Accept
                    </Button>

                    <Button
                      variant="glass"
                      size="sm"
                      disabled={selectedComplaint.status === "In Progress" || selectedComplaint.status === "Inspection" || selectedComplaint.status === "Completed"}
                      onClick={() => handleUpdateStatus(selectedComplaint.id, "In Progress")}
                    >
                      In Progress
                    </Button>

                    <Button
                      variant="glass"
                      size="sm"
                      disabled={selectedComplaint.status === "Inspection" || selectedComplaint.status === "Completed"}
                      onClick={() => handleUpdateStatus(selectedComplaint.id, "Inspection")}
                    >
                      Inspection
                    </Button>

                    <Button
                      variant="success"
                      size="sm"
                      disabled={selectedComplaint.status === "Completed"}
                      onClick={() => handleUpdateStatus(selectedComplaint.id, "Completed")}
                    >
                      Completed
                    </Button>
                  </div>
                </div>

              </Card>
            ) : (
              <Card hoverEffect={false} className="p-12 text-center">
                <ShieldAlert className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Select a ticket row to execute action keys.</p>
              </Card>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};