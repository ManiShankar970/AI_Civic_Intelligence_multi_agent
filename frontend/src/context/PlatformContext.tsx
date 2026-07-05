import React, { createContext, useContext, useState } from "react";

interface ComplaintResult {
  complaint_id: string;
  issue_type: string;
  confidence: number;
  severity: string;
  department: string;
  latitude: number;
  longitude: number;
  address: string;
  landmark: string;
  summary: string;
  complaint: string;
  recommended_action: string;
  expected_impact: string;
  status: string;
}

interface PlatformContextProps {

  reportingImage: File | null;
  setReportingImage: (file: File | null) => void;

  reportingDescription: string;
  setReportingDescription: (text: string) => void;

  reportingLocation: {
    latitude: number;
    longitude: number;
    address: string;
    landmark: string;
  };

  setReportingLocation: (
    location: {
      latitude: number;
      longitude: number;
      address: string;
      landmark: string;
    }
  ) => void;

  activeComplaint: ComplaintResult | null;

  setActiveComplaint: (
    complaint: ComplaintResult | null
  ) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  error: string;
  setError: (value: string) => void;
}

const PlatformContext =
createContext<PlatformContextProps | undefined>(
  undefined
);

export const PlatformProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [reportingImage, setReportingImage] =
    useState<File | null>(null);

  const [reportingDescription,
    setReportingDescription] =
    useState("");

  const [reportingLocation,
    setReportingLocation] =
    useState({

      latitude: 0,

      longitude: 0,

      address: "",

      landmark: ""

    });

  const [activeComplaint,
    setActiveComplaint] =
    useState<ComplaintResult | null>(null);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  return (

    <PlatformContext.Provider

      value={{

        reportingImage,
        setReportingImage,

        reportingDescription,
        setReportingDescription,

        reportingLocation,
        setReportingLocation,

        activeComplaint,
        setActiveComplaint,

        loading,
        setLoading,

        error,
        setError

      }}

    >

      {children}

    </PlatformContext.Provider>

  );

};

export const usePlatform = () => {

  const context =
    useContext(PlatformContext);

  if (!context) {

    throw new Error(
      "usePlatform must be used inside PlatformProvider"
    );

  }

  return context;

};