"use client";

import { DataTable } from "@/components/generics/data-table";
import { TableStatus } from "@/components/generics/table/table-status";
import { Container, Text } from "@resonance/ui";
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  EyeOnIcon,
  MoreVerticalIcon,
  UserIcon,
} from "@resonance/ui/icons";
import { ColumnDef } from "@tanstack/react-table";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { ApproveJobFormData } from "../hooks/useJobApproval";
import { ApproveJobModal } from "../components/modal/approve-job-modal";
import { JobTypeTag } from "../components/job-type-tag";
import { Job } from "../types/job.type";

const buildColumns = (onApprove: (jobId: number) => void): ColumnDef<Job>[] => [
  {
    accessorKey: "job_id_label",
    header: "Job ID",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.job_id_label}
      </Text>
    ),
  },
  {
    accessorKey: "site_name",
    header: "Cleaning Site",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.site_name}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.address}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "cleaner_name",
    header: "Cleaner",
    cell: ({ row }) => (
      <Container className="flex items-center gap-2">
        <Container className="size-6 rounded-full bg-brand-secondary-bg-light flex items-center justify-center shrink-0">
          <UserIcon size={14} className="text-brand-secondary-text-icons" />
        </Container>
        <Text variant="bodySmall" tone="primary">
          {row.original.cleaner_name}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "job_type",
    header: "Job Type",
    cell: ({ row }) => <JobTypeTag label={row.original.job_type} />,
  },
  {
    accessorKey: "job_date",
    header: "Date",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.job_date}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.job_time}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <TableStatus status={row.original.status} />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      // API sends Title Case with spaces (e.g. "Under Review"), so normalize
      // before comparing rather than checking against the raw value.
      const status = row.original.status.trim().toLowerCase().replace(/\s+/g, "-");
      const isEditable = status === "pending" || status === "scheduled";
      const isUnderReview = status === "under-review";

      const items: MenuProps["items"] = [
        {
          key: "view",
          label: (
            <Link href={`/jobs/${row.original.job_id}`}>
              <Container className="flex items-center justify-between gap-8">
                <Text variant="bodyXSmall" tone="primary">
                  View
                </Text>
                <EyeOnIcon size={20} className="text-secondary" />
              </Container>
            </Link>
          ),
        },
        ...(isEditable
          ? [
              {
                key: "edit",
                label: (
                  <Link href={`/jobs/${row.original.job_id}/edit`}>
                    <Container className="flex items-center justify-between gap-8">
                      <Text variant="bodyXSmall" tone="primary">
                        Edit
                      </Text>
                      <EditIcon size={20} className="text-secondary" />
                    </Container>
                  </Link>
                ),
              },
              {
                key: "cancel",
                label: (
                  <Container className="flex items-center justify-between gap-8">
                    <Text variant="bodyXSmall" tone="primary">
                      Cancel
                    </Text>
                    <CloseIcon size={20} className="text-danger-text-icons" />
                  </Container>
                ),
              },
            ]
          : []),
        ...(isUnderReview
          ? [
              {
                key: "approve",
                onClick: () => onApprove(row.original.job_id),
                label: (
                  <Container className="flex items-center justify-between gap-8">
                    <Text variant="bodyXSmall" tone="primary">
                      Approve
                    </Text>
                    <CheckIcon
                      size={20}
                      className="text-brand-secondary-text-icons"
                    />
                  </Container>
                ),
              },
            ]
          : []),
      ];

      return (
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{
            items,
            className:
              "!p-0 !bg-surface !rounded-xl border border-border !shadow-lg overflow-hidden divide-y divide-border min-w-[143px]",
          }}
          classNames={{
            root: "!p-0",
            item: "!mx-0 !my-0 !rounded-none !px-4 !py-3",
          }}
        >
          <Container as="button" type="button" className="p-1">
            <MoreVerticalIcon size={20} className="text-primary" />
          </Container>
        </Dropdown>
      );
    },
  },
];

interface JobListTableProps {
  data: Job[];
  isLoading?: boolean;
  approveModalOpen: boolean;
  onOpenApprove: (jobId: number) => void;
  onCloseApprove: () => void;
  onApprove: (data: ApproveJobFormData) => void;
  isApproving?: boolean;
}

export const JobListTable = ({
  data,
  isLoading,
  approveModalOpen,
  onOpenApprove,
  onCloseApprove,
  onApprove,
  isApproving,
}: JobListTableProps) => {
  return (
    <>
      <DataTable
        columns={buildColumns(onOpenApprove)}
        data={data}
        emptyTitle={isLoading ? "Loading jobs…" : "No records found"}
      />

      <ApproveJobModal
        isOpen={approveModalOpen}
        onClose={onCloseApprove}
        onApprove={onApprove}
        isPending={isApproving}
      />
    </>
  );
};
