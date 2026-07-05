import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShieldCheck, Menu, X, Landmark, Compass, HelpCircle } from "lucide-react";
import { Button, Modal } from "../components/common/CommonComponents";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Track Complaint", path: "/track" },
    { name: "Department Portal", path: "/department" },
    { name: "Analytics System", path: "/analytics" },
  ];

  return (
    <>
      <nav id="navbar" className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link id="nav-logo" to="/" className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-blue-600 shadow-sm shadow-brand-blue-500/20">
                  <ShieldCheck className="w-5.5 h-5.5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-slate-900 tracking-tight text-sm sm:text-base">
                    CIVIC <span className="text-brand-blue-600 font-extrabold">INTELLIGENCE</span>
                  </span>
                  <span className="font-mono text-[9px] text-brand-green-600 font-semibold tracking-wider uppercase leading-none">
                    Multi-Agent Core
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "text-brand-blue-600 bg-brand-blue-50/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="h-4 w-px bg-slate-200 mx-2" />

              <button
                id="nav-about-btn"
                onClick={() => setShowAbout(true)}
                className="px-3.5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                About
              </button>
              <button
                id="nav-contact-btn"
                onClick={() => setShowContact(true)}
                className="px-3.5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={toggleMenu}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div id="mobile-nav-menu" className="md:hidden border-b border-slate-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  id={`mobile-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? "text-brand-blue-600 bg-brand-blue-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="border-t border-slate-100 my-2 pt-2 px-3 flex gap-4">
                <button
                  id="mobile-about-btn"
                  onClick={() => {
                    setIsOpen(false);
                    setShowAbout(true);
                  }}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-900 py-1"
                >
                  About
                </button>
                <button
                  id="mobile-contact-btn"
                  onClick={() => {
                    setIsOpen(false);
                    setShowContact(true);
                  }}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-900 py-1"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* About Platform Modal */}
      <Modal id="about-modal" isOpen={showAbout} onClose={() => setShowAbout(false)} title="About AI Civic Intelligence Platform">
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 p-4 bg-brand-blue-50/50 rounded-2xl border border-brand-blue-100/50 mb-4">
            <Landmark className="w-6 h-6 text-brand-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-800">State-of-the-Art Civic Service</h4>
              <p className="text-xs text-slate-500">Bridging local municipal departments with cutting-edge AI Agent systems.</p>
            </div>
          </div>
          <p>
            The <strong>AI Civic Intelligence Platform</strong> redefines standard public complaint management by replacing outdated forms with automated, intelligent agents. When a citizen uploads an image, the system utilizes advanced vision pipelines to detect issues, establish priority scores, match coordinates, write administrative-grade reports, and assign them directly to the appropriate field engineering departments instantly.
          </p>
          <p>
            Developed on modern React, Tailwind CSS, and Framer Motion, it features seamless visual indicators, real-time progression timelines, and responsive control dashboards for civic supervisors and administrators to manage issues from dispatch to resolution.
          </p>
          <div className="border-t border-slate-100 pt-4 mt-6">
            <h5 className="font-semibold text-slate-800 mb-2">Key Features</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Neural Network Vision analysis to determine issue type instantly</li>
              <li>Calculated severity levels minimizing pedestrian risk</li>
              <li>Autonomous department routing utilizing geographical heuristics</li>
              <li>Structured tracking log showing field crew updates and certifications</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Contact Support Modal */}
      <Modal id="contact-modal" isOpen={showContact} onClose={() => setShowContact(false)} title="Contact Administrative Division">
        <div className="space-y-4 text-slate-600 text-sm">
          <div className="flex items-center gap-3 p-4 bg-brand-green-50 text-brand-green-800 rounded-2xl border border-brand-green-200/50">
            <Compass className="w-6 h-6 text-brand-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-800">Platform Help Desk</h4>
              <p className="text-xs text-slate-500">Available 24/7 for civil assistance and system escalations.</p>
            </div>
          </div>
          <p className="text-slate-500">
            For issues regarding platform integrations, API credentials, or municipal department configuration, contact our team:
          </p>
          <div className="space-y-2 border-y border-slate-100 py-3 my-4">
            <div className="flex justify-between">
              <span className="font-semibold text-slate-800">Administrative Email:</span>
              <span className="font-mono text-xs">gov-support@civicintelligence.gov</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-800">Technical Hotline:</span>
              <span className="font-mono text-xs">+1 (555) 019-2831</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-800">Headquarters:</span>
              <span className="text-right text-xs">Municipal Hall Suite 402, Civic Center, CA</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" size="sm" onClick={() => setShowContact(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowContact(false)}>
              Send Email
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
