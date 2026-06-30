import { JobListScreen } from "@/features/job/screens/job-list.screen";
import { Container } from "@resonance/ui";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Jobs | Resonance Staff Portal",
};

function Jobs() {
  return <JobListScreen />;
}

export default Jobs;
