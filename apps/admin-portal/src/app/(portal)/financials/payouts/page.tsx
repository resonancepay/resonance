import { PayoutsScreen } from "@/features/financials/screens/payouts.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payouts | Resonance Admin Portal",
};

function Payouts() {
  return <PayoutsScreen />;
}

export default Payouts;
