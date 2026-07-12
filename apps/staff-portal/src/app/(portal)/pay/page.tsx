import { PayScreen } from "@/features/pay/services/pay.screen";
import { Container } from "@resonance/ui";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Payments & Earnings | Resonance Staff Portal",
};

function Pay() {
  return <PayScreen />;
}

export default Pay;
