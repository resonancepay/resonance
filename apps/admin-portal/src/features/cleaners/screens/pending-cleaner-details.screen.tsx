"use client";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container, Text } from "@resonance/ui";

import { CleanerDetails } from "../components/cleaner-details";
import { usePendingCleanerDetailsScreen } from "../hooks/usePendingCleanerDetailsScreen";

const PendingCleanerDetailsScreen = () => {
  const { details, isLoading, handleApprove, handleReject, isApproving, isRejecting } =
    usePendingCleanerDetailsScreen();

  useSetBreadcrumb(
    [
      { label: "Pending Cleaners", href: "/cleaners/pending-cleaners" },
      {
        label: details?.account_info.reference_code ?? "…",
        href: "/cleaners/pending-cleaners",
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
    <CleanerDetails
      details={details}
      showPendingBanner
      onApprove={handleApprove}
      onReject={handleReject}
      isApproving={isApproving}
      isRejecting={isRejecting}
    />
  );
};

export default PendingCleanerDetailsScreen;
