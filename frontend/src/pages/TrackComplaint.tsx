import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, Calendar, ClipboardCheck, MessageSquareCode, Clock, Star, Landmark, ChevronRight, Activity } from "lucide-react";
import axios from "axios";
import { Button, Card, Input, Badge, EmptyState } from "../components/common/CommonComponents";

export const TrackComplaint: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [ticket, setTicket] = useState<any>(null);

  // Feedback State
  const [rating, setRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // Parse ID from URL
  const queryId = searchParams.get("id");

  useEffect(() => {
    const fetchComplaint = async () => {
        if (!queryId) return;
        try {
            const response = await axios.post(
                "http://localhost:5678/webhook-test/track-status",
                {
                    complaint_id: queryId
                }
            );
            const data = response.data;
            setComplaints(data);
            if (data.length > 0) {
                setTicket(data[0]);
            } else {
                setTicket(null);
            }
        } catch (err) {
            console.error(err);
        }
    };
    fetchComplaint();
  }, [queryId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/track?id=${searchQuery}`);
  };

  const getStatusPercent = (status: string) => {
    switch (status) {
      case "Submitted":
        return 15;
      case "Assigned":
        return 35;
      case "Accepted":
        return 50;
      case "In Progress":
        return 70;
      case "Inspection":
        return 85;
      case "Completed":
        return 100;
      default:
        return 0;
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket) return;

    await axios.post(
        "http://localhost:5678/webhook-test/feedback",
        {
            complaint_id: ticket.id,
            rating,
            feedback: feedbackComment
        }
    );

    setFeedbackSubmitted(true);
    setFeedbackComment("");
  };

  return (
    <div id="track-complaint-page" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Search Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="space-y-1 text-left">
            <h1 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
              Audit Civic Ticket Progression
            </h1>
            <p className="text-xs text-slate-500 font-sans">
              Enter any complaint ID below (e.g. <span className="font-mono font-bold text-brand-blue-600">CC-9281-A</span>) to inspect live field logs.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2.5 w-full md:max-w-md">
            <Input
              id="search-id-input"
              type="text"
              placeholder="e.g. CC-9281-A"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
              className="py-2 px-3.5"
            />
            <Button id="search-submit-btn" type="submit" variant="primary">
              Audit
            </Button>
          </form>
        </div>

        {ticket ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* Left Side: Ticket Progression and Timeline */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Ticket Details summary */}
              <Card hoverEffect={false}>
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-5 mb-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Reference Node Ticket
                    </span>
                    <h2 className="font-display text-xl font-bold text-slate-900">
                      {ticket.id}
                    </h2>
                    <p className="text-xs text-slate-400 font-sans">
                      Logged via web client on {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge value={ticket.severity} type="severity" />
                    <Badge value={ticket.status} type="status" />
                  </div>
                </div>

                <div className="space-y-4 text-sm font-sans">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Reported Issue Type
                    </h4>
                    <p className="font-bold text-slate-800 text-base">{ticket.issueType}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Assigned Agency Pool
                    </h4>
                    <p className="font-medium text-slate-700 flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-slate-400" />
                      {ticket.department}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Description Narrative
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{ticket.description}</p>
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="border-t border-slate-100 pt-5 mt-5 space-y-2.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 font-mono">
                    <span>PROGRESS STATUS</span>
                    <span className="text-brand-blue-600 font-bold">{getStatusPercent(ticket.status)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getStatusPercent(ticket.status)}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-gradient-to-r from-brand-blue-500 to-brand-blue-600 h-2.5 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>ETA: {ticket.status === "Completed" ? "Resolved" : "Estimated 14 Hours"}</span>
                    <span>Dispatcher Latency: 2.1s</span>
                  </div>
                </div>
              </Card>

              {/* Progress Timeline nodes */}
              <Card hoverEffect={false}>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-6">
                  Workflow Milestones Trace
                </h3>

                <div className="relative pl-6 space-y-6">
                  {/* Spine bar */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200" />

                  {ticket.timeline.map((event: any, idx: number) => {
                    const isPassed = event.isCompleted || event.timestamp;
                    const isCurrent = ticket.status === event.status;

                    return (
                      <div key={event.status} className="relative flex items-start gap-4">
                        
                        {/* Dot indicator */}
                        <div
                          className={`absolute left-[-21px] w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isCurrent
                              ? "bg-brand-blue-500 text-white ring-4 ring-brand-blue-100"
                              : isPassed
                              ? "bg-brand-green-500 text-white"
                              : "bg-white border-2 border-slate-200"
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${isPassed ? "bg-white" : "bg-slate-300"}`} />
                        </div>

                        {/* Event details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4
                              className={`text-sm font-bold tracking-tight font-display ${
                                isCurrent
                                  ? "text-brand-blue-600"
                                  : isPassed
                                  ? "text-slate-800"
                                  : "text-slate-400"
                              }`}
                            >
                              {event.status}
                            </h4>
                            {event.timestamp && (
                              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs mt-1 leading-relaxed ${
                              isCurrent ? "text-slate-600 font-medium" : "text-slate-400"
                            }`}
                          >
                            {event.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Citizen feedback card (Available on Completion) */}
              {ticket.status === "Completed" && (
                <Card hoverEffect={false} className="border-brand-green-200 bg-brand-green-50/10">
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
                    <MessageSquareCode className="w-5.5 h-5.5 text-brand-green-600" />
                    How was your experience?
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mb-4">
                    Your evaluation helps tune routing priorities and agent weights.
                  </p>

                  {feedbackSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-brand-green-50 border border-brand-green-100 rounded-xl text-center text-sm font-semibold text-brand-green-800"
                    >
                      Thank you! Your feedback has been logged in our dispatch ledger.
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                      {/* Star ratings */}
                      <div className="flex gap-1.5 items-center justify-start py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(null)}
                            onClick={() => setRating(star)}
                            className="p-1 cursor-pointer transition-transform duration-100 active:scale-90"
                          >
                            <Star
                              className={`w-7 h-7 ${
                                (hoveredStar !== null ? star <= hoveredStar : star <= rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      <Input
                        id="feedback-comment"
                        type="text"
                        placeholder="e.g. Quick repair, road looks extremely clean!"
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        className="py-2"
                      />

                      <div className="flex justify-end">
                        <Button type="submit" variant="success" size="sm">
                          File Evaluation Log
                        </Button>
                      </div>
                    </form>
                  )}
                </Card>
              )}
            </div>

            {/* Right Side: Map & Activity Logs */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Premium Map Placeholder */}
              <Card hoverEffect={false} className="overflow-hidden p-0">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                  <span className="text-xs font-bold text-slate-800 font-display flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-blue-500" /> GPS Geolocation Lock
                  </span>
                  <span className="font-mono text-[10px] text-brand-green-600 bg-brand-green-50 px-2 py-0.5 rounded font-bold">
                    Active Pin
                  </span>
                </div>
                
                {/* Visual grid mockup representing GPS mapping */}
                <div className="h-64 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                  {/* Grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
                  
                  {/* Simple simulated vector elements */}
                  <div className="absolute w-full h-px bg-slate-800/80 top-1/2" />
                  <div className="absolute h-full w-px bg-slate-800/80 left-1/3" />
                  <div className="absolute h-full w-px bg-slate-800/80 left-2/3" />
                  
                  {/* Mock streets naming */}
                  <span className="absolute bottom-4 left-6 text-[9px] font-mono text-slate-500 font-semibold uppercase">
                    Divisadero St
                  </span>
                  <span className="absolute top-6 right-8 text-[9px] font-mono text-slate-500 font-semibold uppercase">
                    Geary Boulevard
                  </span>

                  {/* Pulsing Pin locator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute z-10 p-3 bg-brand-blue-500/25 rounded-full border border-brand-blue-500/40"
                  >
                    <div className="w-4 h-4 bg-brand-blue-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </motion.div>

                  {/* Lat/lng label overlay */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono text-slate-300 border border-slate-800">
                    LAT: {ticket.location.lat.toFixed(4)}, LNG: {ticket.location.lng.toFixed(4)}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 text-xs font-sans text-slate-500">
                  <p className="font-semibold text-slate-700 mb-0.5">Physical GPS Address:</p>
                  <p className="text-slate-600 leading-normal">{ticket.location.address}</p>
                </div>
              </Card>

              {/* Administrative Activity logs */}
              <Card hoverEffect={false}>
                <h3 className="font-display font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4.5 h-4.5 text-slate-400" />
                  Administrative Audit History
                </h3>

                <div className="space-y-4">
                  {ticket.history.map((log: any, index: number) => (
                    <div key={index} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-800">{log.action}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(log.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Agent: <span className="font-semibold text-slate-600">{log.user}</span>
                      </p>
                      {log.notes && (
                        <p className="text-[11px] text-slate-500 italic border-t border-slate-200/50 pt-1 mt-1">
                          "{log.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

          </div>
        ) : (
          <EmptyState
            title="Ticket ID not found"
            description="Our database registry was unable to locate that ticket number. Double check your typing."
            actionButton={
              <Button onClick={() => {
                if (complaints.length > 0) {
                  setSearchParams({ id: complaints[0].id });
                }
              }}>
                Load Example Ticket
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};