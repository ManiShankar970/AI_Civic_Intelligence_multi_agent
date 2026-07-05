import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  Camera,
  AlertTriangle,
  GitBranch,
  FileText,
  Clock,
  Cpu,
  ArrowRight,
  Database,
  BarChart2,
  CheckCircle,
  HelpCircle,
  Activity,
  Heart,
  Zap,
} from "lucide-react";
import { usePlatform } from "../context/PlatformContext";
import { Button, Card } from "../components/common/CommonComponents";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Floating decoration animations
  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const slowPulse = {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const features = [
    {
      title: "AI Image Recognition",
      description: "Neural Vision Models automatically identify asphalt damage, water leaks, hazardous blockages, and trash instantly upon image upload.",
      icon: <Camera className="w-6 h-6 text-brand-blue-600" />,
      color: "bg-brand-blue-50 border-brand-blue-100",
    },
    {
      title: "Severity Detection",
      description: "Platform scores issue severity based on safety risks to vehicles, pedestrian density, and urgency levels dynamically.",
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-50 border-amber-100",
    },
    {
      title: "Department Routing",
      description: "Heuristics-driven agents immediately route verified reports to corresponding water, public works, or light maintenance dispatchers.",
      icon: <GitBranch className="w-6 h-6 text-indigo-600" />,
      color: "bg-indigo-50 border-indigo-100",
    },
    {
      title: "AI Complaint Generation",
      description: "Large Language Models structure a professional, complete civil engineering complaint summary fit for rapid administrative processing.",
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "Real-time Tracking",
      description: "Allows citizens to audit precise field steps - from supervisor workorder acceptances to final camera-verified inspection seals.",
      icon: <Clock className="w-6 h-6 text-cyan-600" />,
      color: "bg-cyan-50 border-cyan-100",
    },
    {
      title: "Workflow Automation",
      description: "Integrates directly with n8n triggers, executing notification signals, supervisor emails, and dispatch system webhooks automatically.",
      icon: <Cpu className="w-6 h-6 text-brand-green-600" />,
      color: "bg-brand-green-50 border-brand-green-200",
    },
  ];

  const workflowSteps = [
    { step: "1", title: "Upload Image", desc: "Citizen uploads an image of the civic issue via mobile or web." },
    { step: "2", title: "AI Detects Issue", desc: "Computer vision scans the pixels to define what type of issue is pictured." },
    { step: "3", title: "Severity Analysis", desc: "Multi-parameter risk heuristics establish danger profiles." },
    { step: "4", title: "Complaint Generation", desc: "AI builds formal engineering summaries and recommended repair actions." },
    { step: "5", title: "Department Assignment", desc: "Work order is automatically pushed to the correct team's workspace." },
    { step: "6", title: "Complaint Tracking", desc: "Progress metrics, GPS coordinates, and crew state are open for citizens." },
    { step: "7", title: "Issue Resolved", desc: "The team uploads verification, and the ticket closes automatically." },
  ];

  const dashboardStats = [

    {
      title: "Total Complaints",
      value: "1000+",
      label: "Platform Lifetime Reports",
      icon: <Database className="w-5 h-5 text-brand-blue-600" />
    },

    {
      title: "Resolved Complaints",
      value: "850+",
      label: "Repair Actions Closed",
      icon: <CheckCircle className="w-5 h-5 text-brand-green-600" />
    },

    {
      title: "Pending Complaints",
      value: "150",
      label: "Active Field Operations",
      icon: <Activity className="w-5 h-5 text-amber-500" />
    },

    {
      title: "Average Resolution Time",
      value: "12 Hours",
      label: "Target: under 18 hours",
      icon: <Clock className="w-5 h-5 text-indigo-500" />
    },

    {
      title: "AI Accuracy",
      value: "92.2%",
      label: "Vision Matching Confidence",
      icon: <Sparkles className="w-5 h-5 text-purple-500" />
    },

    {
      title: "Citizen Satisfaction",
      value: "4.8 / 5",
      label: "Post-resolution Ratings",
      icon: <Heart className="w-5 h-5 text-red-500" />
    }

];

  return (
    <div id="home-page" className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-brand-blue-50/40 via-white to-slate-50/50">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-[400px] h-[400px] bg-brand-green-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 text-xs font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Municipal Operations Framework</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-[1.1]"
              >
                AI Civic <br className="hidden sm:inline" />
                <span className="text-brand-blue-600 bg-gradient-to-r from-brand-blue-600 to-brand-blue-800 bg-clip-text text-transparent">
                  Intelligence Platform
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Smarter Civic Complaint Management powered by Artificial Intelligence, Multi-Agent Systems, and Workflow Automation.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-slate-500 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Citizens can upload an image of a civic issue. Artificial Intelligence automatically detects the issue type, identifies severity, routes the complaint to the correct department, generates a professional complaint and enables real-time tracking until resolution.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              >
                <Button
                  id="hero-report-btn"
                  variant="primary"
                  size="lg"
                  icon={<Camera className="w-5 h-5" />}
                  onClick={() => navigate("/report")}
                >
                  Report Civic Issue
                </Button>
                <Button
                  id="hero-track-btn"
                  variant="glass"
                  size="lg"
                  icon={<Clock className="w-5 h-5" />}
                  onClick={() => navigate("/track")}
                >
                  Track Existing Ticket
                </Button>
              </motion.div>
            </div>

            {/* Hero AI Illustration */}
            <div className="lg:col-span-5 flex justify-center relative">
              <motion.div
                variants={floatingAnimation}
                animate="animate"
                className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-slate-100"
              >
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-green-500 animate-pulse" />
                    <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Agent Orchestrator
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-500 font-bold">
                    Active
                  </span>
                </div>

                {/* Simulated Workflow Visualizer */}
                <div className="space-y-4">
                  <motion.div
                    variants={slowPulse}
                    animate="animate"
                    className="p-3 bg-brand-blue-50/50 border border-brand-blue-100 rounded-2xl flex items-start gap-3"
                  >
                    <div className="p-2 bg-brand-blue-600 text-white rounded-xl">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-brand-blue-900">Neural Vision Pipeline</h4>
                      <p className="text-[11px] text-slate-500">Detecting asphalt anomalies on Latitude 37.77...</p>
                      <div className="mt-1.5 flex gap-1 items-center">
                        <span className="text-[10px] bg-brand-blue-100 text-brand-blue-700 px-1.5 py-0.5 rounded font-mono font-bold">
                          98.7% match
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-start gap-3">
                    <div className="p-2 bg-indigo-500 text-white rounded-xl">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-slate-800">Autonomous Routing Engine</h4>
                      <p className="text-[11px] text-slate-500">Routing payload to Public Works dispatcher...</p>
                      <div className="mt-1.5 flex gap-1 items-center">
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          Channel PW-Roads
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-start gap-3">
                    <div className="p-2 bg-brand-green-500 text-white rounded-xl">
                      <Zap className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-slate-800">n8n Automation Dispatch</h4>
                      <p className="text-[11px] text-slate-500">Executing administrative workflow integrations...</p>
                    </div>
                  </div>
                </div>

                {/* Dashboard mock background indicator */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tr from-brand-blue-600 to-cyan-400 rounded-full blur-2xl opacity-10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Enterprise AI Multi-Agent Features
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-sans">
              Designed to optimize municipal response latencies and eliminate manual dispatch friction using self-correcting neural pipelines.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {features.map((feat, index) => (
              <motion.div
                id={`feature-card-${index}`}
                variants={itemVariants}
                key={feat.title}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-brand-blue-100 rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className={`p-3.5 rounded-2xl border w-fit ${feat.color} mb-5 group-hover:scale-105 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works-section" className="py-20 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Platform Workflow Blueprint
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-sans">
              From raw mobile citizen photographs to verified physical closure in seven sequential operational milestones.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line (for desktop) */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2" />

            <div className="space-y-12">
              {workflowSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    id={`how-it-works-step-${step.step}`}
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`flex flex-col md:flex-row items-stretch md:items-center relative ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-2 border-brand-blue-500 flex items-center justify-center -translate-x-1/2 z-10 shadow-sm">
                      <span className="text-xs font-mono font-bold text-brand-blue-600">
                        {step.step}
                      </span>
                    </div>

                    {/* Content Block */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 text-left">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-brand-blue-100 transition-colors">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue-600">
                            Milestone 0{step.step}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span className="text-xs text-slate-400 font-sans">Automated Node</span>
                        </div>
                        <h4 className="font-display font-bold text-slate-900 text-base mb-1.5">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Empty placeholder to balance on other side (only on desktop) */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Live Network Metrics
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-sans">
              Empirical data compiled directly from active civil infrastructure works, agent matching rates, and citizen satisfaction audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {dashboardStats.map((st, idx) => (
              <motion.div
                id={`stat-card-${idx}`}
                whileHover={{ y: -3 }}
                key={st.title}
                className="bg-white border border-slate-100 shadow-sm hover:shadow-md rounded-2xl p-6 flex flex-col justify-between transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    {st.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Telemetrics
                  </span>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {st.title}
                  </h4>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-none mb-2">
                    {st.value}
                  </p>
                  <p className="text-xs text-slate-500 font-sans border-t border-slate-50 pt-2">
                    {st.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Prompt CTA card */}
          <div className="mt-16 bg-slate-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl text-left space-y-6">
              <span className="text-xs font-mono font-bold text-brand-blue-500 uppercase tracking-widest">
                Citizen Portal Core
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                Identify a local hazard? Put AI dispatchers to work.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                Report road damage, broken utility connections, illegal dumping, or safety issues in your sector and track the response step-by-step.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  id="cta-report-btn"
                  variant="white"
                  icon={<Camera className="w-4 h-4 text-brand-blue-600" />}
                  onClick={() => navigate("/report")}
                >
                  Report Issue Now
                </Button>
                <Button
                  id="cta-analytics-btn"
                  variant="ghost"
                  className="text-slate-300 hover:text-white"
                  icon={<BarChart2 className="w-4 h-4" />}
                  onClick={() => navigate("/analytics")}
                >
                  View System Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
