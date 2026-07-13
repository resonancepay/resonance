import { RevenueScreen } from "@/features/financials/screens/revenue.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue | Resonance Admin Portal",
};

function Revenue() {
  return <RevenueScreen />;
}

export default Revenue;
