import { JobListScreen } from "@/features/job/screens/job-list.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | Resonance Admin Portal",
};

function JobList() {
  return <JobListScreen />;
}

export default JobList;
