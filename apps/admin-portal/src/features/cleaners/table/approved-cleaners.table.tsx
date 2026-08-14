"use client";

import { DataTable } from "@/components/generics/data-table";
import { AvailabilityStatus } from "@/components/generics/table/availability-status";
import { TableStatus } from "@/components/generics/table/table-status";
import { Container, Text } from "@resonance/ui";
import {
  CheckIcon,
  CloseIcon,
  EyeOnIcon,
  MoreVerticalIcon,
  ScoreIcon,
} from "@resonance/ui/icons";
import { ColumnDef } from "@tanstack/react-table";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { ApprovedCleaner } from "../types/cleaner.type";

const columns: ColumnDef<ApprovedCleaner>[] = [
  {
    accessorKey: "cleaner_id_label",
    header: "Cleaner ID",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.cleaner_id_label}
      </Text>
    ),
  },
  {
    accessorKey: "full_name",
    header: "Cleaner",
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
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => <AvailabilityStatus status={row.original.availability} />,
  },
  {
    accessorKey: "jobs",
    header: "Jobs",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.jobs}
      </Text>
    ),
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => (
      <Container className="flex items-center gap-1.5">
        <ScoreIcon size={20} className="text-brand-text-icons" />
        <Text variant="bodySmall" tone="primary">
          {row.original.score}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "approved_date",
    header: "Date Approved",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.approved_date}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.approved_time}
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
      // Real status value is "Approved" (confirmed), not "active" as
      // originally guessed from mock data — "suspended" is still unconfirmed.
      const isActive = row.original.status.toLowerCase() !== "suspended";

      const items: MenuProps["items"] = [
        {
          key: "view",
          label: (
            <Link href={`/cleaners/approved-cleaners/${row.original.application_id}`}>
              <Container className="flex items-center justify-between gap-8">
                <Text variant="bodyXSmall" tone="primary">
                  View
                </Text>
                <EyeOnIcon size={20} className="text-secondary" />
              </Container>
            </Link>
          ),
        },
        isActive
          ? {
              key: "suspend",
              label: (
                <Container className="flex items-center justify-between gap-8">
                  <Text variant="bodyXSmall" tone="primary">
                    Suspend
                  </Text>
                  <CloseIcon size={20} className="text-danger-text-icons" />
                </Container>
              ),
            }
          : {
              key: "reactivate",
              label: (
                <Container className="flex items-center justify-between gap-8">
                  <Text variant="bodyXSmall" tone="primary">
                    Reactivate
                  </Text>
                  <CheckIcon
                    size={20}
                    className="text-brand-secondary-text-icons"
                  />
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

interface ApprovedCleanersTableProps {
  data: ApprovedCleaner[];
  isLoading?: boolean;
}

export const ApprovedCleanersTable = ({
  data,
  isLoading,
}: ApprovedCleanersTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyTitle={isLoading ? "Loading cleaners…" : "No records found"}
    />
  );
};
