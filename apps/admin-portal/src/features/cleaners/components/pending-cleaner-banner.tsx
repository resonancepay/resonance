"use client";

import { Button, Container, Text } from "@resonance/ui";
import {
  CheckIcon,
  CleanerIcon,
  CloseIcon,
  MinusIcon,
} from "@resonance/ui/icons";
import { useState } from "react";
import { ApproveCleanerModal } from "./modal/approve-cleaner-modal";
import { ArchiveCleanerModal } from "./modal/archive-cleaner-modal";
import { RejectCleanerModal } from "./modal/reject-cleaner-modal";

export const PendingCleanerBanner = () => {
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);

  return (
    <>
      <Container className="bg-brand-secondary-bg-light w-full py-4 px-5 rounded-xl flex items-center justify-between">
        <Container className="flex items-center gap-4">
          <Container className="w-14 h-14 rounded-full bg-brand-bg-bold items-center justify-center flex">
            <CleanerIcon className="text-inverted" size={32} />
          </Container>
          <Container>
            <Text tone="primary" variant="h5">
              Mary Abram
            </Text>
            <Text tone="secondary" variant="bodySmall">
              ekitifountain@icloud.com
            </Text>
          </Container>
        </Container>
        <Container className="flex items-center gap-3">
          <Button
            variant="warning"
            rightIcon={<MinusIcon className="text-inverted" size={20} />}
            onClick={() => setArchiveModalOpen(true)}
          >
            Archive
          </Button>
          <Button
            variant="danger"
            rightIcon={<CloseIcon className="text-inverted" size={20} />}
            onClick={() => setRejectModalOpen(true)}
          >
            Reject
          </Button>
          <Button
            variant="green"
            rightIcon={<CheckIcon className="text-inverted" size={20} />}
            onClick={() => setApproveModalOpen(true)}
          >
            Approve
          </Button>
        </Container>
      </Container>

      <RejectCleanerModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onReject={() => setRejectModalOpen(false)}
      />

      <ApproveCleanerModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        onApprove={() => setApproveModalOpen(false)}
      />

      <ArchiveCleanerModal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onArchive={() => setArchiveModalOpen(false)}
      />
    </>
  );
};
