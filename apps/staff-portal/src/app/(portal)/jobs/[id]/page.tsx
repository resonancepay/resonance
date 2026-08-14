import { JobDetailsScreen } from "@/features/job/screens/job-details.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Job Details | Resonance Staff Portal",
};

function JobDetails() {
  return <JobDetailsScreen />;
}

export default JobDetails;
