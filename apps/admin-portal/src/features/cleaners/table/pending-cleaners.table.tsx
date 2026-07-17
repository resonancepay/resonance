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

interface PendingCleaner {
  referenceNo: string;
  applicantName: string;
  applicantEmail: string;
  dob: string;
  dateApplied: string;
  timeApplied: string;
  status: "pending" | "rejected";
}

const mockData: PendingCleaner[] = [
  {
    referenceNo: "RC-2026-04827",
    applicantName: "Mary Abam",
    applicantEmail: "ekitifountain@icloud.com",
    dob: "06 June 1996",
    dateApplied: "11 July 2026",
    timeApplied: "15:55 PM",
    status: "pending",
  },
  {
    referenceNo: "RC-2026-04827",
    applicantName: "Priscilla Iwalewa",
    applicantEmail: "brooklynm@gmail.com",
    dob: "06 June 1996",
    dateApplied: "11 July 2026",
    timeApplied: "15:55 PM",
    status: "rejected",
  },
];

const columns: ColumnDef<PendingCleaner>[] = [
  {
    accessorKey: "referenceNo",
    header: "Reference No",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.referenceNo}
      </Text>
    ),
  },
  {
    accessorKey: "applicantName",
    header: "Applicant",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.applicantName}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.applicantEmail}
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
    accessorKey: "dateApplied",
    header: "Date Applied",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.dateApplied}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.timeApplied}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <TableStatus status="pending" />;
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => {
      const items: MenuProps["items"] = [
        {
          key: "view",
          label: (
            <Container className="flex items-center justify-between gap-8">
              <Text variant="bodyXSmall" tone="primary">
                View
              </Text>
              <EyeOnIcon size={20} className="text-secondary" />
            </Container>
          ),
        },
        {
          key: "approve",
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

export const PendingCleanersTable = () => {
  return <DataTable columns={columns} data={mockData} />;
};
