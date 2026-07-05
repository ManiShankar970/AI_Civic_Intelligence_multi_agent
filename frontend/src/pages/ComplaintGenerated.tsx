import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, FileText, ArrowRight, Home, Printer, Download, Sparkles, MapPin, ShieldCheck } from "lucide-react";
import { usePlatform } from "../context/PlatformContext";
import { Button, Card, EmptyState, Badge } from "../components/common/CommonComponents";

export const ComplaintGenerated: React.FC = () => {
  const { activeComplaint, reportingImage } = usePlatform();
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);

  if (!activeComplaint) {
    return (
      <div className="min-h-screen py-16 px-4 bg-slate-50/50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <EmptyState
            title="No complaint active"
            description="You haven't reported an issue in this session. Please create a report first."
            actionButton={
              <Button onClick={() => navigate("/report")}>
                Create New Report
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Complaint ${activeComplaint?.complaint_id} downloaded successfully.`);
  };

  return (
    <div id="complaint-generated-page" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Banner */}
        <div className="text-center space-y-3 print:hidden">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="w-16 h-16 bg-brand-green-500/10 border border-brand-green-500/20 text-brand-green-600 rounded-full flex items-center justify-center mx-auto shadow-md"
          >
            <CheckCircle2 className="w-9 h-9" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
              Complaint Document Formulated Successfully
            </h1>
            <p className="text-sm text-slate-500 font-sans max-w-xl mx-auto">
              The neural pipeline has registered the ticket and processed dispatch coordinates. Print, download, or track your live report below.
            </p>
          </div>
        </div>

        {/* Official Report Card */}
        <Card ref={reportRef} hoverEffect={false} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg relative print:shadow-none print:border-none print:p-0">
          
          {/* Official Stamp Decorative */}
          <div className="absolute top-8 right-8 text-right hidden sm:block print:block opacity-75">
            <div className="border-2 border-brand-blue-600/30 text-brand-blue-600/80 rounded-xl px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest leading-tight select-none">
              AI Certified <br />
              <span className="text-[10px] text-slate-400">Dispatcher Approved</span>
            </div>
          </div>

          {/* Header information */}
          <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1 text-left">
              <span className="text-xs font-semibold text-brand-blue-600 uppercase tracking-widest font-mono">
                Municipal Core Dispatch Registry
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <FileText className="w-6.5 h-6.5 text-slate-400" />
                {activeComplaint.complaint_id}
              </h2>
              <p className="text-xs text-slate-400">
                Registered: {new Date().toLocaleString()}
              </p>
            </div>
            
            <div className="flex gap-2.5 flex-wrap print:hidden">
              <Badge value={activeComplaint.severity} type="severity" />
              <Badge value={activeComplaint.status} type="status" />
            </div>
          </div>

          {/* Grid Layout of parameters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
            
            {/* Visual preview and stats */}
            <div className="md:col-span-5 space-y-6">
              {/* Thumbnail */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm relative group">
                <img
                  src={
                    reportingImage
                      ? URL.createObjectURL(reportingImage as unknown as File)
                      : "/placeholder.jpg"
                  }
                  alt={activeComplaint.issue_type}
                  className="w-full h-48 object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
              </div>

              {/* Geographical tag */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2.5">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Coordinates Matching
                </span>
                <p className="text-xs font-semibold text-slate-700 leading-tight">
                  {activeComplaint.address}
                </p>
                {activeComplaint.landmark && (
                  <p className="text-[11px] text-slate-400">
                    Ref: {activeComplaint.landmark}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2 border-t border-slate-200/50 pt-2.5 text-[10px] font-mono text-slate-500">
                  <span>LAT: {activeComplaint.latitude}</span>
                  <span>LNG: {activeComplaint.longitude}</span>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="p-4 bg-brand-blue-50/50 border border-brand-blue-100/50 rounded-2xl text-left">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-brand-blue-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-blue-600" /> Confidence Score
                  </span>
                  <span className="font-mono text-xs font-bold text-brand-blue-600">
                    {activeComplaint.confidence}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-brand-blue-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-brand-blue-600 h-1.5 rounded-full"
                    style={{ width: `${activeComplaint.confidence}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  Calculated using pixel accuracy ratios and keyword density parameters.
                </p>
              </div>
            </div>

            {/* Document details */}
            <div className="md:col-span-7 space-y-6">
              {/* Issue Type */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">
                  Classification
                </h4>
                <p className="font-display font-bold text-lg text-slate-900">
                  {activeComplaint.issue_type}
                </p>
              </div>

              {/* Assigned Department */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">
                  Assigned Department
                </h4>
                <p className="font-sans font-semibold text-sm text-slate-800">
                  {activeComplaint.department}
                </p>
              </div>

              {/* AI Summary */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-400 uppercase">
                  AI Summary
                </h4>
                <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl">
                  {activeComplaint.summary}
                </p>
              </div>

              {/* Generated Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">
                  Formatted Narrative Complaint
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                  {activeComplaint.complaint}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">
                  Recommended Action
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {activeComplaint.recommended_action}
                </p>
              </div>

              {/* Expected Impact */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">
                  Expected Impact
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {activeComplaint.expected_impact}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-150 shadow-sm print:hidden">
          <div className="flex gap-2">
            <Button
              id="btn-return-home"
              variant="secondary"
              icon={<Home className="w-4 h-4" />}
              onClick={() => navigate("/")}
            >
              Return Home
            </Button>
            <Button
              id="btn-simulate-print"
              variant="ghost"
              icon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
            >
              Print
            </Button>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              id="btn-simulate-download"
              variant="glass"
              className="w-full sm:w-auto"
              icon={<Download className="w-4 h-4" />}
              onClick={handleDownload}
            >
              Download PDF Report
            </Button>
            <Button
              id="btn-nav-track"
              variant="primary"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate(`/track?id=${activeComplaint.complaint_id}`)}
            >
              Track Ticket Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};