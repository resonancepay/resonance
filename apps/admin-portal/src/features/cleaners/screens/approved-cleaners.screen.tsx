"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";

export const ApprovedCleanersScreen = () => {
  useSetBreadcrumb([{ label: "Approved Cleaners", href: "/cleaners/approved-cleaners" }]);

  return <Container>Approved Cleaners</Container>;
};
