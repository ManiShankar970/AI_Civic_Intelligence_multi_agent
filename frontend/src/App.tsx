/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PlatformProvider } from "./context/PlatformContext";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";

// Pages
import SubmissionSuccess from "./pages/SubmissionSuccess";
import { Home } from "./pages/Home";
import { ReportIssue } from "./pages/ReportIssue";
import { AIProcessing } from "./pages/AIProcessing";
import { ComplaintGenerated } from "./pages/ComplaintGenerated";
import { TrackComplaint } from "./pages/TrackComplaint";
import { DepartmentDashboard } from "./pages/DepartmentDashboard";
import { Analytics } from "./pages/Analytics";


// Layout Wrapper to Conditionally Render Navbar & Footer
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Hide main citizen navbar & footer on administrative dashboard and processing screens
  const isDepartmentPortal = location.pathname.startsWith("/department");
  const isProcessingScreen = location.pathname.startsWith("/processing");
  const hideLayout = isDepartmentPortal || isProcessingScreen;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
};


export default function App() {
  return (
    <PlatformProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/processing" element={<AIProcessing />} />
            <Route path="/result" element={<ComplaintGenerated />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/department" element={<DepartmentDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/submitted" element={<SubmissionSuccess />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </PlatformProvider>
  );
}
