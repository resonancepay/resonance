import { Button, Container, Text } from "@resonance/ui";
import React from "react";
import { JobStatus } from "./job-status";
import { NextIcon } from "@resonance/ui/icons";
import { JobType } from "../types/job.types";
import { useRouter } from "next/navigation";
import { JobTimer } from "./job-timer";
import { JobUniform } from "./job-uniform";
import { JobLocation } from "./job-location";
import { JobId } from "./job-id";

export const JobCard = ({ status }: { status: JobType }) => {
  const router = useRouter();
  return (
    <Container className="border-[0.5px] p-3 border-border bg-surface rounded-2xl mb-4">
      <Container className="flex items-center justify-between gap-2 min-w-0">
        <JobStatus status={status} />
        <JobLocation />
      </Container>
      <Container className="mt-3 flex items-center justify-between gap-2 min-w-0">
        <Text
          variant="button"
          tone="primary"
          className="truncate"
          title="Northgate Office -Floor 3 Northgate Office -Floor 3"
        >
          Northgate Office -Floor 3
        </Text>
        <JobTimer />
      </Container>
      <Container className="border-b-[0.5px] border-border py-3">
        <JobUniform />
      </Container>
      <Container className="pt-2 flex items-center justify-between">
        <JobId />
        <Button
          onClick={() => {
            router.push("/jobs/JOB-1235");
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
