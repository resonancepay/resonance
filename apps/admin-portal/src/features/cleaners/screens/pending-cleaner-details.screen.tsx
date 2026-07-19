"use client";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";

import { CleanerDetails } from "../components/cleaner-details";

const PendingCleanerDetailsScreen = () => {
  useSetBreadcrumb(
    [
      { label: "Pending Cleaners", href: "/cleaners/pending-cleaners" },
      { label: "RC-2026-04827", href: "/cleaners/pending-cleaners" },
    ],
    "RC-2026-04827",
  );

  return <CleanerDetails />;
};

export default PendingCleanerDetailsScreen;
