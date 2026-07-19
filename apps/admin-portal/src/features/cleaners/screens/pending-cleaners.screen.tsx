"use client";

import { FilterPopoverContent } from "@/components/generics/table/filter-popover-content";
import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";
import { PendingCleanersTable } from "../table/pending-cleaners.table";

export const PendingCleanersScreen = () => {
  useSetBreadcrumb([
    { label: "Pending Cleaners", href: "/cleaners/pending-cleaners" },
  ]);

  return (
    <Container className="h-full flex flex-col">
      <TableFilter
        title="All pending cleaners"
        count={12}
        renderFilterContent={({ onCancel, onSave }) => (
          <FilterPopoverContent onCancel={onCancel} onSave={onSave} />
        )}
      />
      <Container className="flex-1 min-h-0">
        <PendingCleanersTable />
      </Container>
    </Container>
  );
};
