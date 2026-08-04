import { JobListScreen } from "@/features/job/screens/job-list.screen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Jobs | Resonance Client Portal",
};

function Jobs() {
  return <JobListScreen />;
}

export default Jobs;
