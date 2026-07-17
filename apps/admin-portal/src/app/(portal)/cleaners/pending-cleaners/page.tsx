import { PendingCleanersScreen } from "@/features/cleaners/screens/pending-cleaners.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Cleaners | Resonance Admin Portal",
};

function PendingCleaners() {
  return <PendingCleanersScreen />;
}

export default PendingCleaners;
