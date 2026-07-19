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

interface ApprovedCleaner {
  cleanerId: string;
  cleanerName: string;
  cleanerEmail: string;
  availability: "available" | "off" | "on-a-job";
  jobs: string;
  score: string;
  dateApproved: string;
  timeApproved: string;
  status: "active" | "suspended";
}

const mockData: ApprovedCleaner[] = [
  {
    cleanerId: "CL-001",
    cleanerName: "Mary Abam",
    cleanerEmail: "ekitifountain@icloud.com",
    availability: "available",
    jobs: "100",
    score: "98%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Priscilla Iwalewa",
    cleanerEmail: "brooklynm@gmail.com",
    availability: "off",
    jobs: "23",
    score: "88%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "suspended",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Mary Olaniyan",
    cleanerEmail: "sophiak@yandex.com",
    availability: "available",
    jobs: "09",
    score: "79%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Margaret Obubra",
    cleanerEmail: "portharcourt@hotmail.com",
    availability: "off",
    jobs: "12",
    score: "88%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "suspended",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Grace Tukur",
    cleanerEmail: "davidw@outlook.com",
    availability: "available",
    jobs: "12",
    score: "98%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Stephen Opuogbo",
    cleanerEmail: "lukew@gmail.com",
    availability: "available",
    jobs: "98",
    score: "79%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Grace Aliyu",
    cleanerEmail: "calabarfinest@yandex.com",
    availability: "on-a-job",
    jobs: "45",
    score: "98%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "John Maduabuchi",
    cleanerEmail: "ekitifountain@gmail.com",
    availability: "on-a-job",
    jobs: "98",
    score: "79%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Esther Amakiri",
    cleanerEmail: "nasarawaminerals@gmail.com",
    availability: "on-a-job",
    jobs: "0",
    score: "98%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Samuel Aluko",
    cleanerEmail: "yobepride@outlook.com",
    availability: "on-a-job",
    jobs: "45",
    score: "88%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Hannah Wariboko",
    cleanerEmail: "kwaraharmony@yandex.com",
    availability: "on-a-job",
    jobs: "0",
    score: "79%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
  {
    cleanerId: "CL-001",
    cleanerName: "Joshua Amakiri",
    cleanerEmail: "naijaswag@gmail.com",
    availability: "on-a-job",
    jobs: "0",
    score: "88%",
    dateApproved: "11 July 2026",
    timeApproved: "15:55 PM",
    status: "active",
  },
];

const columns: ColumnDef<ApprovedCleaner>[] = [
  {
    accessorKey: "cleanerId",
    header: "Cleaner ID",
    cell: ({ row }) => (
      <Text variant="bodySmall" tone="primary">
        {row.original.cleanerId}
      </Text>
    ),
  },
  {
    accessorKey: "cleanerName",
    header: "Cleaner",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.cleanerName}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.cleanerEmail}
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
    accessorKey: "dateApproved",
    header: "Date Approved",
    cell: ({ row }) => (
      <Container className="flex flex-col gap-0.5">
        <Text variant="bodySmall" tone="primary">
          {row.original.dateApproved}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          {row.original.timeApproved}
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
            <Link href={"/cleaners/approved-cleaners/id"}>
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

export const ApprovedCleanersTable = () => {
  return <DataTable columns={columns} data={mockData} />;
};
