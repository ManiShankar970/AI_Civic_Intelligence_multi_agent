import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const technologies = [
    { name: "React 19", url: "https://react.dev" },
    { name: "FastAPI", url: "https://fastapi.tiangolo.com" },
    { name: "AI Agents", url: "https://ai.google.dev" },
    { name: "n8n Workflows", url: "https://n8n.io" },
    { name: "Groq LLaMA", url: "https://groq.com" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  ];

  const quickLinks = [
    { name: "Report Issue", path: "/report" },
    { name: "Track Complaint", path: "/track" },
    { name: "Department Portal", path: "/department" },
    { name: "Analytics Dashboard", path: "/analytics" },
  ];

  return (
    <footer id="footer" className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-blue-500 shadow-lg shadow-brand-blue-500/10">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white tracking-tight">
                CIVIC <span className="text-brand-blue-500">INTELLIGENCE</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Smarter civic complaint management powered by Artificial Intelligence, Multi-Agent Systems, and Workflow Automation. Ensuring municipal transparency and rapid field dispatch.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans">
              Platform Sections
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    id={`footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    to={link.path}
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Blueprint */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <a
                  id={`tech-link-${tech.name.toLowerCase().replace(/\s+/g, "-")}`}
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer font-sans"
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {currentYear} AI Civic Intelligence Platform. Official Civil Infrastructure Sandbox.</p>
          <div className="flex gap-6">
            <span className="text-slate-500">FastAPI & n8n Native Integration ready</span>
            <span className="text-slate-500">v1.2.0-Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
