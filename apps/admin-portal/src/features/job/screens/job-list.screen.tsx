"use client";

import { TableFilter } from "@/components/generics/table/table-filter";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Button, Container } from "@resonance/ui";
import { AddIcon } from "@resonance/ui/icons";
import { JobFilterContent } from "../components/job-filter-content";
import { JobStatusTabs } from "../components/job-status-tabs";
import { JobListTable } from "../table/job-list.table";

export const JobListScreen = () => {
  useSetBreadcrumb([{ label: "Jobs", href: "/jobs" }]);

  return (
    <Container className="h-full flex flex-col">
      <JobStatusTabs
        tabs={[
          { label: "All", action: () => {} },
          { label: "Scheduled", action: () => {} },
          { label: "In Progress", action: () => {} },
          { label: "Review", action: () => {} },
          { label: "Approved", action: () => {} },
        ]}
      />
      <TableFilter
        title="All jobs"
        count={12}
        renderFilterContent={({ onCancel, onSave }) => (
          <JobFilterContent onCancel={onCancel} onSave={onSave} />
        )}
        extraAction={
          <Button leftIcon={<AddIcon className="text-inverted" size={16} />}>
            Create Job
          </Button>
        }
      />
      <Container className="flex-1 min-h-0">
        <JobListTable />
      </Container>
    </Container>
  );
};
