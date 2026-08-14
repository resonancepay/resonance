"use client";

import { Button, Container, Modal, Text } from "@resonance/ui";
import { AddIcon, ChevronRightIcon, DeleteIcon } from "@resonance/ui/icons";
import { Damage } from "../../types/job.types";

interface DamagesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  damages: Damage[];
  isLoading?: boolean;
  onMakeNewReport: () => void;
  onViewDamage: (damage: Damage) => void;
  onDelete: (damageId: number) => void;
  isDeleting?: boolean;
  // Once a job is approved, damages are view-only — no new report, no delete.
  readOnly?: boolean;
}

export const DamagesListModal = ({
  isOpen,
  onClose,
  damages,
  isLoading,
  onMakeNewReport,
  onViewDamage,
  onDelete,
  isDeleting,
  readOnly,
}: DamagesListModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Damages Reported
        </Text>
      </Container>

      <Container className="px-2 flex flex-col gap-3 max-h-96 overflow-y-auto">
        {isLoading && (
          <Text variant="bodySmall" tone="secondary">
            Loading damages…
          </Text>
        )}

        {!isLoading && damages.length === 0 && (
          <Text variant="bodySmall" tone="secondary">
            No damages reported for this job yet.
          </Text>
        )}

        {!isLoading &&
          damages.map((damage) => (
            <Container
              key={damage.damage_id}
              className="flex items-center gap-2"
            >
              <Container
                as="button"
                type="button"
                onClick={() => onViewDamage(damage)}
                className="flex-1 bg-warning-bg-light rounded-xl px-3 py-2.5 flex items-center justify-between gap-2 min-w-0 text-left"
              >
                <Text
                  variant="bodySmall"
                  tone="primary"
                  className="flex-1 min-w-0"
                >
                  {damage.description}
                </Text>
                <Container className="flex items-center gap-1 shrink-0">
                  <Text variant="buttonXS" tone="warning">
                    {damage.images.length} image{damage.images.length === 1 ? "" : "s"}
                  </Text>
                  <ChevronRightIcon size={18} className="text-secondary" />
                </Container>
              </Container>
              {!readOnly && (
                <Container
                  as="button"
                  type="button"
                  disabled={isDeleting}
                  onClick={() => onDelete(damage.damage_id)}
                  className="p-2 rounded-full bg-danger-bg-light shrink-0 disabled:opacity-50"
                >
                  <DeleteIcon size={16} className="text-danger-text-icons" />
                </Container>
              )}
            </Container>
          ))}
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        {!readOnly && (
          <Button
            className="w-full"
            variant="primary"
            leftIcon={<AddIcon size={16} className="text-inverted" />}
            onClick={onMakeNewReport}
          >
            Make New Report
          </Button>
        )}
      </Container>
    </Modal>
  );
};
