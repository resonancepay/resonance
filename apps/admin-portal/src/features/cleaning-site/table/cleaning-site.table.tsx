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

interface CleaningSite {
  siteName: string;
  address: string;
  clientName: string;
  clientEmail: string;
  jobType: string;
  jobs: number;
  uniforms: number;
  dateAdded: string;
  timeAdded: string;
  status: "active" | "suspended";
}

const mockData: CleaningSite[] = [
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Samuel Nwanze",
    clientEmail: "micheal@mail.com",
    jobType: "Office",
    jobs: 1,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Naomi Abam",
    clientEmail: "brooklynm@gmail.com",
    jobType: "Home",
    jobs: 3,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Ruth Fubara",
    clientEmail: "sophiak@yandex.com",
    jobType: "Home",
    jobs: 3,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Margaret Wokoma",
    clientEmail: "portharcourt@hotmail.com",
    jobType: "Office",
    jobs: 0,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Philip Olanrewaju",
    clientEmail: "davidw@outlook.com",
    jobType: "Office",
    jobs: 0,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Priscilla Omisore",
    clientEmail: "lukew@gmail.com",
    jobType: "Warehouse",
    jobs: 3,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Elizabeth Ogunleye",
    clientEmail: "calabarfinest@yandex.com",
    jobType: "Warehouse",
    jobs: 3,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "James Inatimi",
    clientEmail: "ekitifountain@gmail.com",
    jobType: "Offices",
    jobs: 3,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Margaret Pepple",
    clientEmail: "nasarawaminerals@gmail.com",
    jobType: "Offices",
    jobs: 3,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Hannah Anigbogu",
    clientEmail: "yobepride@outlook.com",
    jobType: "Offices",
    jobs: 0,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "active",
  },
  {
    siteName: "London Office 5",
    address: "12, London Park, London",
    clientName: "Paul Iwalewa",
    clientEmail: "kwaraharmony@yandex.com",
    jobType: "Offices",
    jobs: 0,
    uniforms: 3,
    dateAdded: "11 July 2026",
    timeAdded: "15:55 PM",
    status: "suspended",
  },
];

const columns: ColumnDef<CleaningSite>[] = [
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
    accessorKey: "clientName",
    header: "Client",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.clientName}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.clientEmail}
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
    accessorKey: "dateAdded",
    header: "Date Added",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.dateAdded}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.timeAdded}
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
      const isActive = row.original.status === "active";

      const items: MenuProps["items"] = [
        {
          key: "view",
          label: (
            <Link href={"/cleaning-sites/id"}>
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
                  <CheckIcon size={20} className="text-brand-secondary-text-icons" />
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

export const CleaningSiteTable = () => {
  return <DataTable columns={columns} data={mockData} />;
};
