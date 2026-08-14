import { Button, Container, Text } from "@resonance/ui";
import React from "react";
import { JobStatus } from "./job-status";
import { NextIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";
import { JobTimer } from "./job-timer";
import { JobUniform } from "./job-uniform";
import { JobLocation } from "./job-location";
import { JobId } from "./job-id";
import { Job } from "../types/job.types";

const formatTimeRange = (start: string, end: string) => {
  const format = (iso: string) =>
    new Date(iso).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

  try {
    return `${format(start)} - ${format(end)}`;
  } catch {
    return "";
  }
};

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();
  return (
    <Container className="border-[0.5px] p-3 border-border bg-surface rounded-2xl mb-4">
      <Container className="flex items-center justify-between gap-2 min-w-0">
        <JobStatus status={job.status} />
        <JobLocation address={job.address} />
      </Container>
      <Container className="mt-3 flex items-center justify-between gap-2 min-w-0">
        <Text
          variant="button"
          tone="primary"
          className="truncate"
          title={job.site_name}
        >
          {job.site_name}
        </Text>
        <JobTimer timeRange={formatTimeRange(job.scheduled_start, job.scheduled_end)} />
      </Container>
      <Container className="border-b-[0.5px] border-border py-3">
        <JobUniform uniform={job.uniform_guidelines} />
      </Container>
      <Container className="pt-2 flex items-center justify-between">
        <JobId jobId={job.job_id_display} />
        <Button
          onClick={() => {
            router.push(`/jobs/${job.job_id}`);
          }}
          rightIcon={<NextIcon />}
          variant="transparent"
        >
          View Job
        </Button>
      </Container>
    </Container>
  );
};
