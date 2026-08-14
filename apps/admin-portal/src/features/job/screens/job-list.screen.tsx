"use client";

import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Button, Container } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import { JobFilterContent } from "../components/job-filter-content";
import { JobStatusTabs } from "../components/job-status-tabs";
import { JobListTable } from "../table/job-list.table";
import { useRouter } from "next/navigation";
import { useJobListScreen } from "../hooks/useJobList";

export const JobListScreen = () => {
  useSetBreadcrumb([{ label: "Jobs", href: "/jobs" }]);
  const router = useRouter();
  const {
    jobs,
    isLoading,
    count,
    approveModalOpen,
    openApproveModal,
    closeApproveModal,
    handleApprove,
    isApproving,
  } = useJobListScreen();

  return (
    <Container className="h-full flex flex-col">
      <JobStatusTabs
        tabs={[
          { label: "All", action: () => {} },
          { label: "Pending", action: () => {} },
          { label: "Scheduled", action: () => {} },
          { label: "In Progress", action: () => {} },
          { label: "Under Review", action: () => {} },
          { label: "Paid", action: () => {} },
          { label: "Cancelled", action: () => {} },
        ]}
      />
      <TableFilter
        title="All jobs"
        count={count}
        renderFilterContent={({ onCancel, onSave }) => (
          <JobFilterContent onCancel={onCancel} onSave={onSave} />
        )}
        extraAction={
          <Button
            onClick={() => {
              router.push("/jobs/create");
            }}
            leftIcon={<AddIcon className="text-inverted" size={16} />}
          >
            Create Job
          </Button>
        }
      />
      <Container className="flex-1 min-h-0">
        <JobListTable
          data={jobs}
          isLoading={isLoading}
          approveModalOpen={approveModalOpen}
          onOpenApprove={openApproveModal}
          onCloseApprove={closeApproveModal}
          onApprove={handleApprove}
          isApproving={isApproving}
        />
      </Container>
    </Container>
  );
};
