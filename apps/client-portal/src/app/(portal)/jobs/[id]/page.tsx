import { JobDetailsScreen } from "@/features/job/screens/job-details.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Details | Resonance Client Portal",
};

function JobDetails() {
  return <JobDetailsScreen />;
}

export default JobDetails;
