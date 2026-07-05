import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Camera, MapPin, Upload, FileImage, ShieldCheck, HelpCircle } from "lucide-react";
import { usePlatform } from "../context/PlatformContext";
import { Button, Card, Input, TextArea } from "../components/common/CommonComponents";
import { complaintService } from "../services/complaintService";

// Preset test images
const PRESET_MOCK_IMAGES = [
  {
    name: "Road Pothole",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='400' height='250' fill='%23334155'/><circle cx='200' cy='130' r='50' fill='%231e293b'/><circle cx='240' cy='150' r='30' fill='%230f172a'/><path d='M120 180 L280 180' stroke='%23f1f5f9' stroke-width='4' stroke-dasharray='10 10'/></svg>",
    desc: "A very deep asphalt pothole in the center of the lane. Dangerous for motorcyclists and cars.",
    lat: 37.7739,
    lng: -122.4312,
    address: "1850 Divisadero St, San Francisco, CA 94115",
    landmark: "Directly opposite the public transit shelter",
  },
  {
    name: "Water Main Leak",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='400' height='250' fill='%230284c7'/><path d='M100 200 C150 150 250 150 300 200' fill='none' stroke='%2338bdf8' stroke-width='8'/><path d='M50 220 C150 170 250 170 350 220' fill='none' stroke='%23e0f2fe' stroke-width='6'/><circle cx='200' cy='100' r='20' fill='%23e0f2fe'/></svg>",
    desc: "High pressure drinking water leaking onto the sidewalk sidewalk. Flooding pedestrian crossing.",
    lat: 37.7885,
    lng: -122.4074,
    address: "299 Geary St, San Francisco, CA 94102",
    landmark: "Directly in front of Union Square Park entrance",
  },
  {
    name: "Curb Waste",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='400' height='250' fill='%231e293b'/><path d='M120 220 L150 80 L250 80 L280 220 Z' fill='%2364748b'/><rect x='100' y='60' width='200' height='20' rx='5' fill='%23475569'/><path d='M160 110 L160 190 M200 110 L200 190 M240 110 L240 190' stroke='%23334155' stroke-width='4'/></svg>",
    desc: "Large piles of trash bags, electronic waste and heavy mattresses dumped over the sidewalk.",
    lat: 37.7511,
    lng: -122.4132,
    address: "2498 Mission St, San Francisco, CA 94110",
    landmark: "Beside the public library alleyway entrance",
  },
  {
    name: "Broken Streetlight",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='400' height='250' fill='%230f172a'/><path d='M200 40 L200 150' stroke='%2364748b' stroke-width='8'/><path d='M170 40 L230 40 L200 20 Z' fill='%23475569'/><polygon points='200,150 100,250 300,250' fill='%23fef08a' fill-opacity='0.2'/><circle cx='200' cy='150' r='15' fill='%23fef08a'/></svg>",
    desc: "Streetlight is completely black and dark. Double poles are broken. Sidewalk is hazardous.",
    lat: 37.8012,
    lng: -122.4278,
    address: "950 Lombard St, San Francisco, CA 94133",
    landmark: "Near Lombard Crooked Street viewpoint",
  }
];

export const ReportIssue: React.FC = () => {
  const {
    reportingImage,
    setReportingImage,
    reportingDescription,
    setReportingDescription,
    reportingLocation,
    setReportingLocation,
    setActiveComplaint,
    loading,
    setLoading,
    setError
  } = usePlatform();

  const [landmark, setLandmark] = useState(reportingLocation.landmark || "");
  const [address, setAddress] = useState(reportingLocation.address || "");
  const [lat, setLat] = useState<number | string>(reportingLocation.lat || "");
  const [lng, setLng] = useState<number | string>(reportingLocation.lng || "");
  const [isDragging, setIsDragging] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors(prev => ({
        ...prev,
        image: "Only image files are permitted."
      }));
      return;
    }

    setReportingImage(file);

    setErrors(prev => ({
      ...prev,
      image: ""
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const selectPreset = (preset: typeof PRESET_MOCK_IMAGES[0]) => {
    // Note: If reportingImage is now strongly typed as File in context,
    // you may need to update the mock implementation to handle Blob/File creation.
    setReportingImage(preset.image as any); 
    setReportingDescription(preset.desc);
    setAddress(preset.address);
    setLat(preset.lat);
    setLng(preset.lng);
    setLandmark(preset.landmark);
    setErrors({});
  };

  const fetchGeolocation = () => {
    if (!navigator.geolocation) {
      setErrors((prev) => ({ ...prev, location: "Geolocation is not supported by your browser." }));
      return;
    }

    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(latitude.toFixed(6));
        setLng(longitude.toFixed(6));
        
        // Reverse geocoding simulation with high-quality addresses
        setTimeout(() => {
          setAddress(`Civic Lane ${Math.floor(100 + Math.random() * 900)}, Sector 4, San Francisco, CA`);
          setFetchingLocation(false);
        }, 1200);
      },
      (error) => {
        // Fallback or user denied permission
        setFetchingLocation(false);
        setErrors((prev) => ({
          ...prev,
          location: "Location access denied. Using standard municipal coordinates."
        }));
        setLat(37.7749);
        setLng(-122.4194);
        setAddress("1024 Market St, San Francisco, CA 94102");
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!reportingImage) {
      newErrors.image = "An image of the civic issue is required.";
    }
    if (!reportingDescription || reportingDescription.trim().length < 10) {
      newErrors.description = "Please describe the issue in at least 10 characters.";
    }
    if (!address || address.trim() === "") {
      newErrors.address = "An address location description is required.";
    }
    if (lat === "" || isNaN(Number(lat))) {
      newErrors.lat = "Valid latitude is required.";
    }
    if (lng === "" || isNaN(Number(lng))) {
      newErrors.lng = "Valid longitude is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setReportingLocation({
      latitude: Number(lat),
      longitude: Number(lng),
      address,
      landmark
    });

    try {
      setLoading(true);

      const result = await complaintService.submitComplaint({
        image: reportingImage!,
        description: reportingDescription,
        latitude: Number(lat),
        longitude: Number(lng),
        address,
        landmark
      });
      console.log("RESULT FROM BACKEND:", result);
      console.log("Complaint =", result);
      setActiveComplaint(result);

      navigate("/processing", {state: {  complaintId: result.Complaint_id    }});
    } catch(error) {
      console.error(error);
      setError("Unable to submit complaint.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCurrentLocation = () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
    }

    setFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(

        (position) => {

            setLat(position.coords.latitude.toFixed(6));
            setLng(position.coords.longitude.toFixed(6));

            setFetchingLocation(false);

        },

        (error) => {

            setFetchingLocation(false);

            switch (error.code) {

                case error.PERMISSION_DENIED:
                    alert("Please allow location permission.");
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert("Location unavailable.");
                    break;

                case error.TIMEOUT:
                    alert("Location request timed out.");
                    break;

                default:
                    alert("Unable to fetch location.");
            }

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

};

  return (
    <div id="report-issue-page" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center md:text-left mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>AI Autonomous Ingestion</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Report Civic Infrastructure Issue
          </h1>
          <p className="text-sm text-slate-500 font-sans max-w-2xl">
            Upload an image of the hazard. Our Multi-Agent Orchestrator automatically detects the category, grades severity, routes the ticket, and updates the dispatch schedule.
          </p>
        </div>

        {/* Preset Selector Banner */}
        <div className="mb-8 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-blue-600 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
              Sandboxed Testing: Select a preset civic hazard photo to test instantly
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRESET_MOCK_IMAGES.map((p) => (
              <button
                id={`preset-btn-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                key={p.name}
                type="button"
                onClick={() => selectPreset(p)}
                className="group flex flex-col items-center justify-center p-2.5 border border-slate-100 rounded-xl bg-slate-50/50 hover:bg-brand-blue-50/40 hover:border-brand-blue-100 transition-all text-center cursor-pointer"
              >
                <div className="w-full h-12 rounded-lg overflow-hidden bg-slate-200 mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-blue-700">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <form id="report-issue-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Upload Image */}
          <div className="lg:col-span-6 space-y-6">
            <Card hoverEffect={false} className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-1">
                  1. Visual Evidence Ingestion
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-5">
                  Drag and drop your image, or select a file. Maximum size 10MB.
                </p>

                {/* Upload Container */}
                <div
                  id="drag-drop-zone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px] transition-all duration-200 ${
                    isDragging
                      ? "border-brand-blue-600 bg-brand-blue-50/40 scale-[0.99]"
                      : "border-slate-200 hover:border-brand-blue-400 bg-slate-50/30"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {reportingImage ? (
                    <div id="image-upload-preview" className="space-y-4 w-full h-full flex flex-col items-center justify-center">
                      <div className="relative rounded-xl overflow-hidden shadow-sm max-h-[220px] w-full flex items-center justify-center bg-slate-100 border border-slate-100">
                        <img
                          src={typeof reportingImage === "string" ? reportingImage : URL.createObjectURL(reportingImage as unknown as File)}
                          alt="Uploaded Civic Hazard"
                          className="max-h-[220px] w-auto object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex gap-2.5 items-center justify-center">
                        <span className="text-xs font-semibold text-brand-green-600 bg-brand-green-50 border border-brand-green-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <FileImage className="w-3.5 h-3.5" />
                          Ready for AI vision scan
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReportingImage(null);
                          }}
                          className="text-xs font-semibold text-slate-500 hover:text-red-500"
                        >
                          Change photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div id="empty-upload-prompt" className="space-y-4">
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-brand-blue-600 w-14 h-14 mx-auto flex items-center justify-center">
                        <Upload className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Click to browse files, or drop photo here
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Supports PNG, JPG, JPEG formats
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p id="error-image" className="text-xs text-red-500 mt-2 font-sans font-semibold">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Safety notice */}
              <div className="mt-8 p-3.5 bg-brand-blue-50/40 border border-brand-blue-100/50 rounded-2xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-normal font-sans">
                  <strong>Civil Privacy Standards:</strong> License plates, public faces, and potential personal identifiers are automatically anonymized server-side by routing filters before department assignment.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Side: Geolocation and Details */}
          <div className="lg:col-span-6 space-y-6">
            <Card hoverEffect={false}>
              <h3 className="font-display font-bold text-slate-900 text-lg mb-1">
                2. Complaint Logs & Location Coordinates
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-5">
                Detailed textual observations and latitude/longitude matching.
              </p>

              <div className="space-y-5">
                {/* Description */}
                <TextArea
                  id="form-description"
                  label="Describe the issue"
                  placeholder="Provide details about size, hazards, transit effects, or safety concerns. Our AI will scan this for routing tags..."
                  value={reportingDescription}
                  onChange={(e) => setReportingDescription(e.target.value)}
                  error={errors.description}
                  required
                />

                {/* Coordinates Row */}
                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">
                      Geographical Mapping
                    </span>
                    <Button
                      id="btn-fetch-location"
                      type="button"
                      variant="glass"
                      size="sm"
                      onClick={fetchGeolocation}
                      loading={fetchingLocation}
                      icon={<MapPin className="w-3.5 h-3.5" />}
                    >
                      Use GPS Location
                    </Button>
                  </div>
                  <Button type="button" onClick={fetchCurrentLocation}>📍 Generate Current Location</Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      id="form-lat"
                      label="Latitude"
                      type="text"
                      placeholder="e.g. 37.7749"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                      error={errors.lat}
                      required
                    />
                    <Input
                      id="form-lng"
                      label="Longitude"
                      type="text"
                      placeholder="e.g. -122.4194"
                      value={lng}
                      onChange={(e) => setLng(e.target.value)}
                      error={errors.lng}
                      required
                    />
                  </div>

                  {errors.location && (
                    <p id="error-location" className="text-xs text-amber-600 font-semibold font-sans">
                      {errors.location}
                    </p>
                  )}

                  <Input
                    id="form-address"
                    label="Current Address Location"
                    type="text"
                    placeholder="e.g. 1024 Market St, San Francisco, CA"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={errors.address}
                    icon={<MapPin className="w-4 h-4 text-slate-400" />}
                    required
                  />

                  <Input
                    id="form-landmark"
                    label="Optional Landmark / Reference"
                    type="text"
                    placeholder="e.g. Next to sector grocery cafe, opposite subway"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>

                {/* Submission CTA */}
                <div className="border-t border-slate-100 pt-6 mt-6 flex justify-end gap-3">
                  <Button
                    id="btn-cancel"
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setReportingImage(null);
                      setReportingDescription("");
                      setAddress("");
                      setLat("");
                      setLng("");
                      setLandmark("");
                      navigate("/");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    id="btn-submit-report"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    variant="primary"
                    icon={<ShieldCheck className="w-4.5 h-4.5" />}
                  >
                    {loading ? "Submitting..." : "Submit to AI Pipeline"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};