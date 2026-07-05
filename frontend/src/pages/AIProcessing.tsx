import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, BrainCircuit, ShieldAlert, GitMerge, FileCheck, HardDriveDownload, AlertCircle } from "lucide-react";
import { usePlatform } from "../context/PlatformContext";
import { Button } from "../components/common/CommonComponents";
import { useNavigate, useLocation } from "react-router-dom";

interface AgentStep {
  id: string;
  name: string;
  role: string;
  status: "waiting" | "running" | "completed" | "failed";
  icon: React.ReactNode;
  log: string;
}

export const AIProcessing: React.FC = () => {
  const {
    reportingImage,
    reportingDescription,
    activeComplaint,
  } = usePlatform();

  const navigate = useNavigate();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const [steps, setSteps] = useState<AgentStep[]>([
    {
      id: "detect",
      name: "Issue Detection Agent",
      role: "Vision Pipeline v4 (CNN-ViT)",
      status: "running",
      icon: <BrainCircuit className="w-5 h-5" />,
      log: "Analyzing image dimensions, mapping density fields, matching pixel weights...",
    },
    {
      id: "severity",
      name: "Severity Analysis Agent",
      role: "Heuristic Risk Evaluator",
      status: "waiting",
      icon: <ShieldAlert className="w-5 h-5" />,
      log: "Awaiting image analysis. Standing by...",
    },
    {
      id: "routing",
      name: "Department Routing Agent",
      role: "Spatial GNN Dispatch",
      status: "waiting",
      icon: <GitMerge className="w-5 h-5" />,
      log: "Standing by for severity index parameters...",
    },
    {
      id: "generation",
      name: "Complaint Generation Agent",
      role: "Llama-3-70B-Structured",
      status: "waiting",
      icon: <FileCheck className="w-5 h-5" />,
      log: "Awaiting final routing assignment to synthesize report...",
    },
    {
      id: "saving",
      name: "Durable Ingest Engine",
      role: "Database Agent",
      status: "waiting",
      icon: <HardDriveDownload className="w-5 h-5" />,
      log: "Awaiting compiled file write sequence...",
    }
  ]);
  const location = useLocation();

  const complaintId = location.state?.complaintId;

  // Security check: Redirect if there is no backend result
  useEffect(() => {
    if (!activeComplaint) {
      navigate("/report");
    }
  }, [activeComplaint, navigate]);

  useEffect(() => {
    if (currentStepIdx >= steps.length) {
      // Completed all steps! Navigate to result page with complaint ID
      navigate("/submitted", {
        state: {
            complaintId
        }
      });
      return;
    }

    // Faster step progression timing
    const stepDuration = 1200;
    const interval = setTimeout(() => {
      // 1. Mark current step as completed and set logs
      setSteps((prevSteps) => {
        const nextSteps = [...prevSteps];
        
        // Finalize current running step
        if (nextSteps[currentStepIdx]) {
          nextSteps[currentStepIdx].status = "completed";
          nextSteps[currentStepIdx].log = getFinalLog(nextSteps[currentStepIdx].id);
        }

        // Trigger next running step
        const nextIdx = currentStepIdx + 1;
        if (nextSteps[nextIdx]) {
          nextSteps[nextIdx].status = "running";
          nextSteps[nextIdx].log = getRunningLog(nextSteps[nextIdx].id, reportingDescription || "", activeComplaint?.address || "");
        }

        return nextSteps;
      });

      setCurrentStepIdx((idx) => idx + 1);
    }, stepDuration);

    return () => clearTimeout(interval);
  }, [currentStepIdx, steps.length, reportingImage, reportingDescription, activeComplaint, navigate]);

  // Log outputs dynamically modified based on user input
  const getRunningLog = (id: string, desc: string, addr: string) => {
    switch (id) {
      case "severity":
        return `Scanning keyword vectors: "${desc.slice(0, 30)}..." assessing pedestrian impact ratios...`;
      case "routing":
        return `Hashing geographical index on coordinates matching: ${addr.slice(0, 35)}...`;
      case "generation":
        return `Synthesizing administrative civil engineer narrative. Organizing action guidelines...`;
      case "saving":
        return `Compiling secure ledger record and pushing notification triggers to n8n workflow core...`;
      default:
        return "Thinking...";
    }
  };

  const getFinalLog = (id: string) => {
    switch (id) {
      case "detect":
        return `Scan Complete. Matched Class: [${activeComplaint?.issue_type}] with ${activeComplaint?.confidence || 98.4}% confidence.`;
      case "severity":
        return `Risk Assessment Complete. Severity classified as [${activeComplaint?.severity}].`;
      case "routing":
        return `Department assigned: [${activeComplaint?.department}].`;
      case "generation":
        return `Structural request written. Action checklist compiled. Standardized civil formatting verified.`;
      case "saving":
        return `Record written in 24ms. Dispatch webhooks pushed successfully. Transmitting ticket ID.`;
      default:
        return "Complete.";
    }
  };

  return (
    <div id="ai-processing-page" className="min-h-screen py-16 px-4 bg-slate-900 text-slate-100 flex items-center justify-center relative overflow-hidden">
      {/* Background neon grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto rounded-2xl bg-brand-blue-600/10 border border-brand-blue-500/20 flex items-center justify-center mb-4 shadow-xl shadow-brand-blue-500/5"
          >
            <Sparkles className="w-8 h-8 text-brand-blue-500" />
          </motion.div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            AI Multi-Agent Execution Engine
          </h1>
          <p className="text-slate-400 font-sans text-sm max-w-lg mx-auto leading-relaxed">
            Five specialized autonomous agents are analyzing your payload, generating the civic complaint, and writing the dispatch order in real-time.
          </p>
        </div>

        {/* Agent Workflow Card */}
        <div className="dark-glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-800">
          {/* Active workflow line indicator */}
          <div className="absolute left-[37px] sm:left-[41px] top-10 bottom-10 w-0.5 bg-slate-800 z-0" />

          {errorOccurred ? (
            <div className="text-center py-6 space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
              <h3 className="font-display font-bold text-lg text-white">Pipeline Execution Interrupted</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                The GNN node failed to route due to an edge connection timed out. Please retry the ingestion flow.
              </p>
              <Button variant="danger" size="sm" onClick={() => navigate("/report")}>
                Return to Intake
              </Button>
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              {steps.map((step, idx) => {
                const isWaiting = step.status === "waiting";
                const isRunning = step.status === "running";
                const isCompleted = step.status === "completed";

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
                      isRunning
                        ? "bg-brand-blue-500/5 border border-brand-blue-500/15"
                        : "border border-transparent"
                    }`}
                  >
                    {/* Circle Icon Node */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all z-10 ${
                        isCompleted
                          ? "bg-brand-green-600/20 border border-brand-green-500 text-brand-green-500 shadow-lg shadow-brand-green-500/10"
                          : isRunning
                          ? "bg-brand-blue-600/20 border-2 border-brand-blue-500 text-brand-blue-400 shadow-lg shadow-brand-blue-500/25 animate-pulse"
                          : "bg-slate-850 border border-slate-800 text-slate-500"
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div>
                          <h4
                            className={`font-display text-sm font-bold tracking-tight ${
                              isRunning ? "text-brand-blue-400" : isCompleted ? "text-brand-green-500" : "text-slate-400"
                            }`}
                          >
                            {step.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                            {step.role}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              isCompleted
                                ? "bg-brand-green-950 text-brand-green-500"
                                : isRunning
                                ? "bg-brand-blue-950 text-brand-blue-400 animate-pulse"
                                : "bg-slate-850 text-slate-500"
                            }`}
                          >
                            {step.status}
                          </span>
                        </div>
                      </div>

                      {/* Log output */}
                      <div className="bg-slate-950/80 rounded-lg p-2.5 mt-2 border border-slate-800">
                        <p className={`font-mono text-[11px] leading-relaxed break-words ${
                          isRunning ? "text-brand-blue-300" : isCompleted ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {isRunning && <span className="inline-block w-1.5 h-3 bg-brand-blue-500 animate-ping mr-1" />}
                          {step.log}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};