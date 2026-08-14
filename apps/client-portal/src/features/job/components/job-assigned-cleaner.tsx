"use client";

import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { useState } from "react";

interface JobAssignedCleanerProps {
  cleanerName: string;
  cleanerId: string;
}

export const JobAssignedCleaner = ({ cleanerName, cleanerId }: JobAssignedCleanerProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Container className="border-b border-border">
      <Container
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text variant="bodySmall" tone="primary">
          Assigned Cleaner
        </Text>
        <ChevronDownIcon
          className="text-primary transition-transform duration-200"
          size={20}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </Container>
      {open && (
        <Container className="flex items-center justify-between bg-surface p-3.5 my-2 rounded-xl">
          <Text variant="bodyXSmall" tone="secondary">
            Cleaner:
          </Text>
          <Container className="flex flex-col items-end">
            <Text variant="bodyXSmall" tone="primary">
              {cleanerName || "N/A"}
            </Text>
            <Text variant="bodyXSmall" tone="secondary">
              {cleanerId}
            </Text>
          </Container>
        </Container>
      )}
    </Container>
  );
};
