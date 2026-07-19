"use client";

import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";
import { ApprovedCleanersFilterContent } from "../components/approved-cleaners-filter-content";
import { ApprovedCleanersTable } from "../table/approved-cleaners.table";

export const ApprovedCleanersScreen = () => {
  useSetBreadcrumb([{ label: "Approved Cleaners", href: "/cleaners/approved-cleaners" }]);

  return (
    <Container className="h-full flex flex-col">
      <TableFilter
        title="All approved cleaners"
        count={12}
        renderFilterContent={({ onCancel, onSave }) => (
          <ApprovedCleanersFilterContent onCancel={onCancel} onSave={onSave} />
        )}
      />
      <Container className="flex-1 min-h-0">
        <ApprovedCleanersTable />
      </Container>
    </Container>
  );
};
