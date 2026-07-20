"use client";

import { Button, Container, Input, Select, Text } from "@resonance/ui";
import { DateIcon } from "@resonance/ui/icons";
import { useState } from "react";

interface JobFilterContentProps {
  onCancel: () => void;
  onSave: () => void;
}

const statusOptions = [
  { label: "Scheduled", value: "scheduled" },
  { label: "In Progress", value: "in-progress" },
  { label: "Review", value: "review" },
  { label: "Approved", value: "approved" },
  { label: "Cancelled", value: "cancelled" },
];

export const JobFilterContent = ({ onCancel, onSave }: JobFilterContentProps) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);

  return (
    <Container className="w-55 p-4">
      <Text variant="button" tone="primary">
        Filter
      </Text>
      <Container className="h-px bg-border my-3" />

      <Container className="flex items-center justify-between mb-2">
        <Text variant="bodyXSmall" tone="primary">
          Date Scheduled
        </Text>
        <Container
          as="button"
          type="button"
          onClick={() => {
            setDateFrom("");
            setDateTo("");
          }}
        >
          <Text variant="bodyXSmall" tone="danger">
            Clear
          </Text>
        </Container>
      </Container>
      <Container className="flex items-center gap-2 mb-4">
        <Input
          placeholder="From"
          variant2
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          rightIcon={<DateIcon size={18} className="text-secondary" />}
        />
        <Input
          placeholder="To"
          variant2
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          rightIcon={<DateIcon size={18} className="text-secondary" />}
        />
      </Container>

      <Container className="flex items-center justify-between mb-2">
        <Text variant="bodyXSmall" tone="primary">
          Status
        </Text>
        <Container as="button" type="button" onClick={() => setStatus(undefined)}>
          <Text variant="bodyXSmall" tone="danger">
            Clear
          </Text>
        </Container>
      </Container>
      <Container className="mb-4">
        <Select
          variant2
          options={statusOptions}
          value={status}
          onChange={setStatus}
          placeholder="Select"
        />
      </Container>

      <Container className="h-px bg-border mb-4" />

      <Container className="flex items-center gap-2">
        <Button variant="neutral" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" onClick={onSave}>
          Save
        </Button>
      </Container>
    </Container>
  );
};
