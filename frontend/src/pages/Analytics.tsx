import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "motion/react";
import { BarChart3, TrendingUp, PieChart as PieIcon, Map, Eye, Calendar, Sparkles, Clock } from "lucide-react";
import { usePlatform } from "../context/PlatformContext";
import { Card, Badge } from "../components/common/CommonComponents";

export const Analytics: React.FC = () => {
  const {} = usePlatform();
  const stats = {
  total: 0,
  resolved: 0,
  pending: 0,
  avgResolutionTime: "12 Hours",
  aiAccuracy: "92.2%",
  satisfaction: "4.8 / 5",
  };
  const complaints: any[] = [];

  // 1. Calculate Issue Distribution dynamically
  const issueDistributionData = useMemo(() => {
    const counts: Record<string, number> = {};
    complaints.forEach((c) => {
      // Shorten name slightly for chart readability
      const shortName = c.issueType.split(" & ")[0].split(" - ")[0];
      counts[shortName] = (counts[shortName] || 0) + 1;
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  }, [complaints]);

  // 2. Calculate Severity Distribution
  const severityDistributionData = useMemo(() => {
    const counts: Record<string, number> = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    complaints.forEach((c) => {
      if (counts[c.severity] !== undefined) {
        counts[c.severity]++;
      }
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  }, [complaints]);

  // 3. Department Performance index
  const departmentPerformanceData = useMemo(() => {
    const data: Record<string, { total: number; resolved: number }> = {};
    complaints.forEach((c) => {
      const shortDept = c.department.split(" - ")[0];
      if (!data[shortDept]) {
        data[shortDept] = { total: 0, resolved: 0 };
      }
      data[shortDept].total++;
      if (c.status === "Completed") {
        data[shortDept].resolved++;
      }
    });

    return Object.keys(data).map((key) => ({
      department: key,
      "Active Backlog": data[key].total - data[key].resolved,
      "Resolved Tickets": data[key].resolved,
    }));
  }, [complaints]);

  // 4. Monthly Trend (simulated trend with dynamic tail based on total size)
  const monthlyTrendData = [
    { month: "Jan", complaints: 45, resolved: 38 },
    { month: "Feb", complaints: 52, resolved: 45 },
    { month: "Mar", complaints: 68, resolved: 60 },
    { month: "Apr", complaints: 74, resolved: 65 },
    { month: "May", complaints: 89, resolved: 80 },
    { month: "Jun", complaints: 110 + complaints.length, resolved: 95 + (complaints.filter(c => c.status === "Completed").length) },
  ];

  // Colors for charts
  const COLORS_SEVERITY = {
    Low: "#94a3b8", // Slate
    Medium: "#0ea5e9", // Sky Blue
    High: "#f59e0b", // Amber
    Critical: "#ef4444", // Red
  };

  const COLORS_PALETTE = ["#0284c7", "#10b981", "#6366f1", "#a855f7", "#ec4899", "#f59e0b"];

  // Heatmap static parameters
  const sectorHeatmap = [
    { sector: "Sector 1 (Presidio)", density: "Low", value: 12, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { sector: "Sector 2 (Marina)", density: "Medium", value: 34, color: "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100" },
    { sector: "Sector 3 (North Beach)", density: "High", value: 58, color: "bg-amber-50 text-amber-700 border-amber-200" },
    { sector: "Sector 4 (SOMA)", density: "Critical", value: 89, color: "bg-red-50 text-red-700 border-red-200" },
    { sector: "Sector 5 (Mission)", density: "Critical", value: 92, color: "bg-red-50 text-red-700 border-red-200" },
    { sector: "Sector 6 (Castro)", density: "High", value: 61, color: "bg-amber-50 text-amber-700 border-amber-200" },
    { sector: "Sector 7 (Haight)", density: "Medium", value: 42, color: "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100" },
    { sector: "Sector 8 (Sunset)", density: "Low", value: 18, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { sector: "Sector 9 (Richmond)", density: "Medium", value: 29, color: "bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100" },
  ];

  return (
    <div id="analytics-page" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center md:text-left mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Civic Telemetric Analysis</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Administrative Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-sans max-w-3xl">
            Real-time visual charting of complaint distributions, department resolution efficiency rates, monthly trends, and geographical density matrices.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                Total Logs
              </span>
              <p className="font-display text-2xl font-extrabold text-slate-900">
                {stats.total}
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-brand-blue-50 text-brand-blue-600">
              <Eye className="w-5 h-5" />
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                Average KPI
              </span>
              <p className="font-display text-2xl font-extrabold text-slate-900">
                {stats.avgResolutionTime}
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Clock className="w-5 h-5" />
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                AI Dispatch Precision
              </span>
              <p className="font-display text-2xl font-extrabold text-slate-900">
                {stats.aiAccuracy}
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <Sparkles className="w-5 h-5" />
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                Audit Satisfaction
              </span>
              <p className="font-display text-2xl font-extrabold text-slate-900">
                {stats.satisfaction}
              </p>
            </div>
            <span className="p-2.5 rounded-xl bg-brand-green-50 text-brand-green-600">
              <TrendingUp className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Monthly Trend Area Chart */}
          <div className="lg:col-span-8">
            <Card hoverEffect={false}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-blue-500" />
                  Monthly Ticket Volume & Resolution Trends
                </h3>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Live Streamed
                </span>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "12px", fontFamily: "sans-serif", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="complaints" name="Complaints Filed" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorComplaints)" />
                    <Area type="monotone" dataKey="resolved" name="Complaints Resolved" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorResolved)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Severity Distribution Pie Chart */}
          <div className="lg:col-span-4">
            <Card hoverEffect={false}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-brand-blue-500" />
                  Severity Splitting
                </h3>
              </div>

              <div className="h-64 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {severityDistributionData.map((entry) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={COLORS_SEVERITY[entry.name as keyof typeof COLORS_SEVERITY] || "#cbd5e1"}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "12px", fontFamily: "sans-serif", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center text */}
                <div className="absolute text-center">
                  <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    Total
                  </p>
                  <p className="font-display text-2xl font-extrabold text-slate-800 leading-tight">
                    {stats.total}
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs font-sans mt-2 border-t border-slate-50 pt-4">
                {severityDistributionData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS_SEVERITY[entry.name as keyof typeof COLORS_SEVERITY] }}
                    />
                    <span className="text-slate-500 font-medium">
                      {entry.name}: <strong className="text-slate-800">{entry.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Department Performance Bar Chart */}
          <div className="lg:col-span-6">
            <Card hoverEffect={false}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-blue-500" />
                  Department Backlog vs. Resolution
                </h3>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="department" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "12px", fontFamily: "sans-serif", fontSize: "12px" }} />
                    <Bar dataKey="Resolved Tickets" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
                    <Bar dataKey="Active Backlog" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Issue Class Distribution Pie Chart */}
          <div className="lg:col-span-6">
            <Card hoverEffect={false}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-blue-500" />
                  Visual Ingestion Classification Ratios
                </h3>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={issueDistributionData} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} tickLine={false} width={100} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "12px", fontFamily: "sans-serif", fontSize: "11px" }} />
                    <Bar dataKey="value" name="Reports Count" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Sector Density Heatmap Section */}
          <div className="lg:col-span-12">
            <Card hoverEffect={false}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
                  <Map className="w-5 h-5 text-brand-blue-500" />
                  San Francisco Sector Density Heatmap Matrix
                </h3>
                <span className="text-xs text-slate-400 font-sans font-medium">
                  Sector-based Spatial Grid Allocation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sectorHeatmap.map((item) => (
                  <div
                    key={item.sector}
                    className="p-4 border rounded-2xl bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <span className="font-display font-bold text-slate-800 text-sm block">
                        {item.sector}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider block">
                        Index: {item.value} active reports
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.color}`}>
                      {item.density}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 justify-end items-center text-xs font-mono text-slate-400">
                <span>Density scale:</span>
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> <span>Low</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-blue-500" /> <span>Medium</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> <span>High</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> <span>Critical</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};
