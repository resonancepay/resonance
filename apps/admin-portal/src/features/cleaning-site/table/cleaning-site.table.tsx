"use client";

import { DataTable } from "@/components/generics/data-table";
import { TableStatus } from "@/components/generics/table/table-status";
import { JobTypeTag } from "@/features/job/components/job-type-tag";
import { Container, Text } from "@resonance/ui";
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  EyeOnIcon,
  MoreVerticalIcon,
} from "@resonance/ui/icons";
import { ColumnDef } from "@tanstack/react-table";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { Site } from "../types/site.type";

const columns: ColumnDef<Site>[] = [
  {
    accessorKey: "site_name",
    header: "Cleaning Site",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.site_name}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.site_address}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "client_name",
    header: "Client",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.client_name}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.client_email}
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
    accessorKey: "jobs",
    header: "Jobs",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.jobs}
      </Text>
    ),
  },
  {
    accessorKey: "uniforms",
    header: "Uniforms",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.uniforms}
      </Text>
    ),
  },
  {
    accessorKey: "date_added",
    header: "Date Added",
    cell: ({ row }) => {
      const [date, time] = row.original.date_added.split(" . ");
      return (
        <Container className="flex flex-col gap-0.5">
          <Text variant="bodySmall" tone="primary">
            {date}
          </Text>
          {time && (
            <Text variant="bodyXSmall" tone="secondary">
              {time}
            </Text>
          )}
        </Container>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <TableStatus status={row.original.is_active ? "active" : "suspended"} />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const isActive = row.original.is_active;

      const items: MenuProps["items"] = [
        {
          key: "view",
          label: (
            <Link href={`/cleaning-sites/${row.original.site_id}`}>
              <Container className="flex items-center justify-between gap-8">
                <Text variant="bodyXSmall" tone="primary">
                  View Site
                </Text>
                <EyeOnIcon size={20} className="text-secondary" />
              </Container>
            </Link>
          ),
        },
        {
          key: "edit",
          label: (
            <Container className="flex items-center justify-between gap-8">
              <Text variant="bodyXSmall" tone="primary">
                Edit Site
              </Text>
              <EditIcon size={20} className="text-secondary" />
            </Container>
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

interface CleaningSiteTableProps {
  data: Site[];
  isLoading?: boolean;
}

export const CleaningSiteTable = ({
  data,
  isLoading,
}: CleaningSiteTableProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyTitle={isLoading ? "Loading sites…" : "No records found"}
    />
  );
};
