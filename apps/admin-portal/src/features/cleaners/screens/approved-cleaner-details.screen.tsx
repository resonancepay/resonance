"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";
import { CleanerTab } from "../components/cleaner-tab";
import { useState } from "react";
import { CleanerDetails } from "../components/cleaner-details";
import { CleanerPerformance } from "../components/cleaner-performance";

const ApprovedCleanerDetailsScreen = () => {
  useSetBreadcrumb([
    { label: "Approved Cleaners", href: "/cleaners/approved-cleaners" },
    { label: "CL-001", href: "/cleaners/approved-cleaners" },
  ]);
  const [showPerformance, setShowPerformance] = useState(true);

  return (
    <Container>
      <CleanerTab
        tabs={[
          {
            label: "Performance",
            action: () => {
              setShowPerformance(true);
            },
          },
          {
            label: "Cleaner Profile",
            action: () => {
              setShowPerformance(false);
            },
          },
        ]}
      />

      <Container>
        {showPerformance && <CleanerPerformance />}
        {!showPerformance && <CleanerDetails />}
      </Container>
    </Container>
  );
};

export default ApprovedCleanerDetailsScreen;
