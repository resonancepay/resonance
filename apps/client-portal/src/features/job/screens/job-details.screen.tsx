"use client";

import { PageBack } from "@/shared/ui/page-back";
import { Container, Text } from "@resonance/ui";
import { useParams } from "next/navigation";
import { useGetJob } from "../hooks/jobs.hook";

export const JobDetailsScreen = () => {
  const params = useParams<{ id: string }>();
  const { data: job } = useGetJob(params.id);

  return (
    <Container className="pb-4">
      <Container className="flex items-center gap-2.5 pb-5 mb-3">
        <PageBack />
        <Text tone="secondary" variant="h4">
          Job Details
        </Text>
      </Container>
      {/* TODO: replace with real job details UI */}
    </Container>
  );
};
