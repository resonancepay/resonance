"use client";

import { DataTable } from "@/components/generics/data-table";
import { TableStatus } from "@/components/generics/table/table-status";
import { Container, Text } from "@resonance/ui";
import { EyeOnIcon, MoreVerticalIcon, UserIcon } from "@resonance/ui/icons";
import { ColumnDef } from "@tanstack/react-table";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { JobTypeTag } from "../components/job-type-tag";

interface Job {
  jobId: string;
  siteName: string;
  address: string;
  cleanerName: string;
  jobType: string;
  date: string;
  time: string;
  status: "scheduled" | "in-progress" | "review" | "approved" | "cancelled";
}

const mockData: Job[] = [
  {
    jobId: "Job-1234",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Mary Abam",
    jobType: "Office",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "scheduled",
  },
  {
    jobId: "Job-1235",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Priscilla Iwalewa",
    jobType: "Home",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "approved",
  },
  {
    jobId: "Job-1236",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Mary Olaniyan",
    jobType: "Warehouse",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "in-progress",
  },
  {
    jobId: "Job-1237",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Margaret Obubra",
    jobType: "Public",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "approved",
  },
  {
    jobId: "Job-1238",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Grace Tukur",
    jobType: "Home",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "in-progress",
  },
  {
    jobId: "Job-1239",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Stephen Opuogbo",
    jobType: "Home",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "review",
  },
  {
    jobId: "Job-1240",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Grace Aliyu",
    jobType: "Hospital",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "cancelled",
  },
  {
    jobId: "Job-1241",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "John Maduabuchi",
    jobType: "Office",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "in-progress",
  },
  {
    jobId: "Job-1242",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Esther Amakiri",
    jobType: "Office",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "review",
  },
  {
    jobId: "Job-1243",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Samuel Aluko",
    jobType: "Office",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "scheduled",
  },
  {
    jobId: "Job-1244",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Hannah Wariboko",
    jobType: "Office",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "scheduled",
  },
  {
    jobId: "Job-1245",
    siteName: "Northgare Office - Floor 3",
    address: "12 Northgate Rd, London EC1",
    cleanerName: "Joshua Amakiri",
    jobType: "Office",
    date: "11 July 2026",
    time: "15:55 PM",
    status: "scheduled",
  },
];

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "jobId",
    header: "Job ID",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.jobId}
      </Text>
    ),
  },
  {
    accessorKey: "siteName",
    header: "Cleaning Site",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.siteName}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.address}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "cleanerName",
    header: "Cleaner",
    cell: ({ row }) => (
      <Container className="flex items-center gap-2">
        <Container className="size-6 rounded-full bg-brand-secondary-bg-light flex items-center justify-center shrink-0">
          <UserIcon size={14} className="text-brand-secondary-text-icons" />
        </Container>
        <Text variant="bodySmall" tone="primary">
          {row.original.cleanerName}
        </Text>
      </Container>
    ),
  },
  {
    accessorKey: "jobType",
    header: "Job Type",
    cell: ({ row }) => <JobTypeTag label={row.original.jobType} />,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.date}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.time}
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
    cell: () => {
      const items: MenuProps["items"] = [
        {
          key: "view",
          label: (
            <Link href={"/jobs/id"}>
              <Container className="flex items-center justify-between gap-8">
                <Text variant="bodyXSmall" tone="primary">
                  View
                </Text>
                <EyeOnIcon size={20} className="text-secondary" />
              </Container>
            </Link>
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

export const JobListTable = () => {
  return <DataTable columns={columns} data={mockData} />;
};
