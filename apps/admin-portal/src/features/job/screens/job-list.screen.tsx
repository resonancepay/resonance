"use client";

import { useBreadcrumbContext } from "@/context/breadcrumb-context";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";

export const JobListScreen = () => {
  useSetBreadcrumb(
    [
      { label: "Jobs", href: "/jobs" },
      { label: "Job Details", href: "/jobs" },
    ],
    "Jobs",
  );
  return <Container>JobList</Container>;
};
