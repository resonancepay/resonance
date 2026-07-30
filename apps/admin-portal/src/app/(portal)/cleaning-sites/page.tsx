import { CleaningSiteScreen } from "@/features/cleaning-site/screens/cleaning-site.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Sites | Resonance Admin Portal",
};

function CleaningSites() {
  return <CleaningSiteScreen />;
}

export default CleaningSites;
