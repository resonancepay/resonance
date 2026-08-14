"use client";

import { FilterPopoverContent } from "@/components/generics/table/filter-popover-content";
import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";
import { PendingCleanersTable } from "../table/pending-cleaners.table";
import { usePendingCleanersScreen } from "../hooks/usePendingCleanersScreen";

export const PendingCleanersScreen = () => {
  useSetBreadcrumb([
    { label: "Pending Cleaners", href: "/cleaners/pending-cleaners" },
  ]);
  const {
    cleaners,
    isLoading,
    count,
    handleApprove,
    handleReject,
    isApproving,
    isRejecting,
  } = usePendingCleanersScreen();

  return (
    <Container className="h-full flex flex-col">
      <TableFilter
        title="All pending cleaners"
        count={count}
        renderFilterContent={({ onCancel, onSave }) => (
          <FilterPopoverContent onCancel={onCancel} onSave={onSave} />
        )}
      />
      <Container className="flex-1 min-h-0">
        <PendingCleanersTable
          data={cleaners}
          isLoading={isLoading}
          onApprove={handleApprove}
          onReject={handleReject}
          isApproving={isApproving}
          isRejecting={isRejecting}
        />
      </Container>
    </Container>
  );
};
