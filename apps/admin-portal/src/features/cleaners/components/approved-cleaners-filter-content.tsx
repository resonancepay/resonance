"use client";

import { Button, Container, Input, Select, Text } from "@resonance/ui";
import { DateIcon } from "@resonance/ui/icons";
import { useState } from "react";

interface ApprovedCleanersFilterContentProps {
  onCancel: () => void;
  onSave: () => void;
}

const availabilityOptions = [
  { label: "Available", value: "available" },
  { label: "Off", value: "off" },
  { label: "On a job", value: "on-a-job" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
];

export const ApprovedCleanersFilterContent = ({
  onCancel,
  onSave,
}: ApprovedCleanersFilterContentProps) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [scoreFrom, setScoreFrom] = useState("");
  const [scoreTo, setScoreTo] = useState("");
  const [jobsFrom, setJobsFrom] = useState("");
  const [jobsTo, setJobsTo] = useState("");
  const [availability, setAvailability] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  return (
    <Container className="w-55 p-4">
      <Text variant="button" tone="primary">
        Filter
      </Text>
      <Container className="h-px bg-border my-3" />

      <Container className="flex items-center justify-between mb-2">
        <Text variant="bodyXSmall" tone="primary">
          Date Approved
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
          Score Range
        </Text>
        <Container
          as="button"
          type="button"
          onClick={() => {
            setScoreFrom("");
            setScoreTo("");
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
          value={scoreFrom}
          onChange={(e) => setScoreFrom(e.target.value)}
        />
        <Input
          placeholder="To"
          variant2
          value={scoreTo}
          onChange={(e) => setScoreTo(e.target.value)}
        />
      </Container>

      <Container className="flex items-center justify-between mb-2">
        <Text variant="bodyXSmall" tone="primary">
          Job Count
        </Text>
        <Container
          as="button"
          type="button"
          onClick={() => {
            setJobsFrom("");
            setJobsTo("");
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
          value={jobsFrom}
          onChange={(e) => setJobsFrom(e.target.value)}
        />
        <Input
          placeholder="To"
          variant2
          value={jobsTo}
          onChange={(e) => setJobsTo(e.target.value)}
        />
      </Container>

      <Container className="flex items-center justify-between mb-2">
        <Text variant="bodyXSmall" tone="primary">
          Availability
        </Text>
        <Container
          as="button"
          type="button"
          onClick={() => setAvailability(undefined)}
        >
          <Text variant="bodyXSmall" tone="danger">
            Clear
          </Text>
        </Container>
      </Container>
      <Container className="mb-4">
        <Select
          variant2
          options={availabilityOptions}
          value={availability}
          onChange={setAvailability}
          placeholder="Select"
        />
      </Container>

      <Container className="flex items-center justify-between mb-2">
        <Text variant="bodyXSmall" tone="primary">
          Status
        </Text>
        <Container
          as="button"
          type="button"
          onClick={() => setStatus(undefined)}
        >
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
