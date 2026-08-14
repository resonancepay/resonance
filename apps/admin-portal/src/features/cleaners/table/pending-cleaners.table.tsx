"use client";

import { DataTable } from "@/components/generics/data-table";
import { TableStatus } from "@/components/generics/table/table-status";
import { Container, Text } from "@resonance/ui";
import {
  CheckIcon,
  CloseIcon,
  EyeOnIcon,
  MoreVerticalIcon,
} from "@resonance/ui/icons";
import { ColumnDef } from "@tanstack/react-table";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { useState } from "react";
import { ApproveCleanerModal } from "../components/modal/approve-cleaner-modal";
import { RejectCleanerModal } from "../components/modal/reject-cleaner-modal";
import { PendingCleaner } from "../types/cleaner.type";

const getColumns = (
  onApprove: (applicationId: number) => void,
  onReject: (applicationId: number) => void,
): ColumnDef<PendingCleaner>[] => [
  {
    accessorKey: "reference_no",
    header: "Reference No",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.reference_no}
      </Text>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Applicant",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.full_name}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.email}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "dob",
    header: "DOB",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.dob}
      </Text>
    ),
  },
  {
    accessorKey: "submitted_date",
    header: "Date Applied",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.submitted_date}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.submitted_time}
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
      const items: MenuProps["items"] = [
        {
          key: "view",
          label: (
            <Link href={`/cleaners/pending-cleaners/${row.original.application_id}`}>
              <Container className="flex items-center justify-between gap-8">
                <Text variant="bodyXSmall" tone="primary">
                  View
                </Text>
                <EyeOnIcon size={20} className="text-secondary" />
              </Container>
            </Link>
          ),
        },
        {
          key: "approve",
          onClick: () => onApprove(row.original.application_id),
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
        {
          key: "reject",
          onClick: () => onReject(row.original.application_id),
          label: (
            <Container className="flex items-center justify-between gap-8">
              <Text variant="bodyXSmall" tone="primary">
                Reject
              </Text>
              <CloseIcon size={20} className="text-danger-text-icons" />
            </Container>
          ),
        },
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

interface PendingCleanersTableProps {
  data: PendingCleaner[];
  isLoading?: boolean;
  onApprove: (applicationId: number) => void;
  onReject: (applicationId: number, data: { reason: string; description: string }) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
}

export const PendingCleanersTable = ({
  data,
  isLoading,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: PendingCleanersTableProps) => {
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [rejectingId, setRejectingId] = useState<number | null>(null);

  return (
    <>
      <DataTable
        columns={getColumns(
          (applicationId) => setApprovingId(applicationId),
          (applicationId) => setRejectingId(applicationId),
        )}
        data={data}
        emptyTitle={isLoading ? "Loading cleaners…" : "No records found"}
      />
      <ApproveCleanerModal
        isOpen={approvingId !== null}
        onClose={() => setApprovingId(null)}
        isPending={isApproving}
        onApprove={() => {
          if (approvingId !== null) onApprove(approvingId);
          setApprovingId(null);
        }}
      />
      <RejectCleanerModal
        isOpen={rejectingId !== null}
        onClose={() => setRejectingId(null)}
        isPending={isRejecting}
        onReject={(data) => {
          if (rejectingId !== null) onReject(rejectingId, data);
          setRejectingId(null);
        }}
      />
    </>
  );
};
