import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function SubmissionSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const complaintId = location.state?.complaintId || "Not Available";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const copyComplaintId = () => {
    if (complaintId !== "Not Available") {
      navigator.clipboard.writeText(complaintId);
      alert("Complaint ID copied.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full">

        <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-5" />

        <h1 className="text-3xl font-bold mb-3">
          Complaint Submitted Successfully
        </h1>

        <p className="text-slate-600">
          Your complaint has been analyzed by AI,
          assigned to the appropriate department,
          and registered successfully.
        </p>

        <div className="mt-8">
          <p className="text-gray-500">
            Your Complaint ID
          </p>

          <div className="text-3xl font-bold text-blue-600 mt-2">
            {complaintId}
          </div>

          <button
            onClick={copyComplaintId}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copy Complaint ID
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Save this Complaint ID to track your complaint later.
          </p>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Redirecting to Home in 5 seconds...
        </p>

      </div>
    </div>
  );
}