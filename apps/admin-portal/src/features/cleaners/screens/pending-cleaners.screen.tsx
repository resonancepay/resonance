"use client";

import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";
import { PendingCleanersTable } from "../table/pending-cleaners.table";

export const PendingCleanersScreen = () => {
  useSetBreadcrumb([
    { label: "Pending Cleaners", href: "/cleaners/pending-cleaners" },
  ]);

  return (
    <Container>
      <TableFilter />
      <PendingCleanersTable />
    </Container>
  );
};
