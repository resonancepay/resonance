import { EditJobScreen } from "@/features/job/screens/edit-job.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Job | Resonance Admin Portal",
};

function EditJob() {
  return <EditJobScreen />;
}

export default EditJob;
