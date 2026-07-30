"use client";

import { Button, Container, Text } from "@resonance/ui";
import { CheckIcon, CloseIcon, JobIcon2 } from "@resonance/ui/icons";
import { useState } from "react";
import { CancelJobModal } from "./modal/cancel-job-modal";

export const JobControl = () => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  return (
    <>
      <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
        <Container className="flex items-center gap-1.5 mb-3">
          <JobIcon2 className="text-secondary" size={16} />
          <Text variant="bodySmall" tone="secondary">
            Job control
          </Text>
        </Container>
        <Container className="flex items-center gap-2.5">
          <Button
            className="flex-1"
            variant="primary"
            rightIcon={<CheckIcon size={16} className="text-inverted" />}
          >
            Edit Job
          </Button>
          <Button
            className="flex-1"
            variant="danger"
            rightIcon={<CloseIcon size={16} className="text-inverted" />}
            onClick={() => setCancelModalOpen(true)}
          >
            Cancel Job
          </Button>
        </Container>
      </Container>

      <CancelJobModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onCancelJob={() => setCancelModalOpen(false)}
      />
    </>
  );
};
