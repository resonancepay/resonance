import { Button, Container, Text } from "@resonance/ui";
import React from "react";
import { JobStatus } from "./job-status";
import Image from "next/image";
import { DurationIcon, NextIcon } from "@resonance/ui/icons";
import { JobType } from "../types/job.types";

export const JobCard = ({ status }: { status: JobType }) => {
  return (
    <Container className="border-[0.5px] p-3 border-border bg-surface rounded-2xl mb-4">
      <Container className="flex items-center justify-between gap-2 min-w-0">
        <JobStatus status={status} />
        <Container className="flex items-center gap-2 min-w-0">
          <Image
            width={16}
            height={16}
            src={"/assets/images/Round Pushpin.png"}
            alt="push pin"
            className="shrink-0"
          />
          <Text
            variant="bodyXSmall"
            tone="secondary"
            className="truncate"
            title="12 Northgate Rd, London EC1 12 Northgate Rd, London EC1"
          >
            12 Northgate Rd, London EC1
          </Text>
        </Container>
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
        <Container className="flex items-center gap-2 shrink-0">
          <DurationIcon size={16} className="text-secondary" />
          <Text variant="bodyXSmall" tone="secondary">
            08:00 - 10:30
          </Text>
        </Container>
      </Container>
      <Container className="py-3 flex items-center gap-1.5 border-b-[0.5px] border-border min-w-0">
        <Image
          src={"/assets/images/T Shirt.png"}
          alt="T-shirt"
          width={16}
          height={16}
          className="shrink-0"
        />
        <Text
          variant="bodyXSmall"
          tone="secondary"
          className="truncate"
          title="Navy uniform, rubber gloves"
        >
          Navy uniform, rubber gloves
        </Text>
      </Container>
      <Container className="pt-2 flex items-center justify-between">
        <Container
          as="span"
          className="bg-muted px-2 py-1 rounded-lg flex items-center justify-betweeen"
        >
          <Text variant="buttonXS" tone="primary">
            JOB-1235
          </Text>
        </Container>
        <Button rightIcon={<NextIcon />} variant="transparent">
          View Job
        </Button>
      </Container>
    </Container>
  );
};
