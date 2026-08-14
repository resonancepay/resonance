"use client";

import { Button, Container, Modal, Select, Text, Textarea } from "@resonance/ui";
import { CheckIcon, WarningIcon } from "@resonance/ui/icons";
import { useState } from "react";
import { ApproveJobFormData } from "../../hooks/useJobApproval";

const PERCENTAGE_OPTIONS = Array.from({ length: 11 }, (_, i) => String(i * 10)).map(
  (value) => ({ label: `${value}%`, value }),
);

interface ApproveJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (data: ApproveJobFormData) => void;
  isPending?: boolean;
}

export const ApproveJobModal = ({
  isOpen,
  onClose,
  onApprove,
  isPending,
}: ApproveJobModalProps) => {
  const [checklistCompletion, setChecklistCompletion] = useState("0");
  const [ontimeArrival, setOntimeArrival] = useState("0");
  const [flagged, setFlagged] = useState(false);
  const [flaggedReason, setFlaggedReason] = useState("");
  const [reasonError, setReasonError] = useState<string | undefined>();

  // Modal unmounts its children ~200ms after closing (see @resonance/ui's
  // Modal), so this state resets naturally on the next open — no manual
  // reset effect needed.

  const handleApprove = () => {
    if (flagged && !flaggedReason.trim()) {
      setReasonError("Please enter a reason.");
      return;
    }
    onApprove({
      checklistCompletion: Number(checklistCompletion),
      ontimeArrival: Number(ontimeArrival),
      flagged,
      flaggedReason: flagged ? flaggedReason.trim() : "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Job Performance
        </Text>
      </Container>

      <Container className="px-2 flex flex-col gap-3">
        <Container className="flex items-center justify-between">
          <Text variant="bodySmall" tone="primary">
            Checklist Completion
          </Text>
          <Container className="w-24">
            <Select
              variant2
              options={PERCENTAGE_OPTIONS}
              value={checklistCompletion}
              onChange={setChecklistCompletion}
            />
          </Container>
        </Container>

        <Container className="flex items-center justify-between">
          <Text variant="bodySmall" tone="primary">
            On-Time Arrival
          </Text>
          <Container className="w-24">
            <Select
              variant2
              options={PERCENTAGE_OPTIONS}
              value={ontimeArrival}
              onChange={setOntimeArrival}
            />
          </Container>
        </Container>

        <Container className="h-px bg-border my-1" />

        <Container
          as="button"
          type="button"
          onClick={() => setFlagged(false)}
          className={[
            "rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 text-left transition-colors",
            !flagged ? "bg-success-bg-light" : "bg-muted",
          ].join(" ")}
        >
          <Container className="flex items-center gap-2.5">
            <Container
              className={[
                "h-4 w-4 rounded-full border-2 shrink-0",
                !flagged ? "border-success-border bg-success-border" : "border-border",
              ].join(" ")}
            />
            <Text variant="bodySmall" tone="primary">
              Job well done!
            </Text>
          </Container>
          <Container className="h-6 w-6 rounded-full bg-success-bg-light flex items-center justify-center shrink-0">
            <CheckIcon size={14} className="text-success-text-icons" />
          </Container>
        </Container>

        <Container
          as="button"
          type="button"
          onClick={() => setFlagged(true)}
          className={[
            "rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 text-left transition-colors",
            flagged ? "bg-success-bg-light" : "bg-muted",
          ].join(" ")}
        >
          <Container className="flex items-center gap-2.5">
            <Container
              className={[
                "h-4 w-4 rounded-full border-2 shrink-0",
                flagged ? "border-success-border bg-success-border" : "border-border",
              ].join(" ")}
            />
            <Text variant="bodySmall" tone="primary">
              Flag this job
            </Text>
          </Container>
          <Container className="h-6 w-6 rounded-full bg-warning-bg-light flex items-center justify-center shrink-0">
            <WarningIcon size={14} className="text-warning-text-icons" />
          </Container>
        </Container>

        {flagged && (
          <Textarea
            label="Reason"
            required
            variant2
            placeholder="Enter reason"
            value={flaggedReason}
            onChange={(e) => {
              setFlaggedReason(e.target.value);
              if (reasonError) setReasonError(undefined);
            }}
            error={reasonError}
          />
        )}
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="primary"
          rightIcon={<CheckIcon size={16} className="text-inverted" />}
          onClick={handleApprove}
          disabled={isPending}
          loading={isPending}
        >
          Approve
        </Button>
      </Container>
    </Modal>
  );
};
