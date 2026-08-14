"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container, Text } from "@resonance/ui";
import { CleanerTab } from "../components/cleaner-tab";
import { useState } from "react";
import { CleanerDetails } from "../components/cleaner-details";
import { CleanerPerformance } from "../components/cleaner-performance";
import { useApprovedCleanerDetailsScreen } from "../hooks/useApprovedCleanerDetailsScreen";

const ApprovedCleanerDetailsScreen = () => {
  const { details, isLoading } = useApprovedCleanerDetailsScreen();
  const [showPerformance, setShowPerformance] = useState(true);

  useSetBreadcrumb(
    [
      { label: "Approved Cleaners", href: "/cleaners/approved-cleaners" },
      {
        label: details
          ? `${details.account_info.first_name} ${details.account_info.last_name}`
          : "…",
        href: "/cleaners/approved-cleaners",
      },
    ],
    details?.account_info.reference_code ?? "…",
  );

  if (isLoading || !details) {
    return (
      <Container>
        <Text variant="bodySmall" tone="secondary">
          Loading cleaner…
        </Text>
      </Container>
    );
  }

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
        {showPerformance && <CleanerPerformance performance={details.performance} />}
        {!showPerformance && <CleanerDetails details={details} />}
      </Container>
    </Container>
  );
};

export default ApprovedCleanerDetailsScreen;
