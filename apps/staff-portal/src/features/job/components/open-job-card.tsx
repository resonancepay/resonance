import { Button, Container, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";
import { JobTimer } from "./job-timer";
import { JobUniform } from "./job-uniform";
import { JobLocation } from "./job-location";
import { JobId } from "./job-id";
import { JobDistance } from "./job-distance";
import { OpenJobStatus } from "./open-job-status";
import { OpenJob } from "../types/job.types";

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

interface OpenJobCardProps {
  job: OpenJob;
}

export const OpenJobCard = ({ job }: OpenJobCardProps) => {
  const router = useRouter();
  return (
    <Container className="border-[0.5px] p-3 border-border bg-surface rounded-2xl mb-4">
      <Container className="flex items-center justify-between gap-2 min-w-0">
        <OpenJobStatus />
        <JobDistance distance={job.distance} />
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
        <JobTimer
          timeRange={formatTimeRange(job.scheduled_start, job.scheduled_end)}
        />
      </Container>
      <Container className="border-b-[0.5px] border-border py-3 flex flex-col gap-2">
        <JobLocation address={job.address} />
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
