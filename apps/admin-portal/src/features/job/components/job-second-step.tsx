"use client";

import { Button, Checkbox, Container, Input, Text } from "@resonance/ui";
import { CheckIcon, SearchIcon } from "@resonance/ui/icons";
import { useMemo, useState } from "react";
import { CHECKLIST_OPTIONS } from "../utils/job-form-options";

interface JobSecondStepProps {
  selected: string[];
  error?: string;
  isPending?: boolean;
  onToggle: (id: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const JobSecondStep = ({
  selected,
  error,
  isPending,
  onToggle,
  onCancel,
  onSave,
}: JobSecondStepProps) => {
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return CHECKLIST_OPTIONS;
    return CHECKLIST_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <Container>
      <Container className="flex items-center gap-1.5 mb-8">
        <Container className="h-1 flex-1 rounded-full bg-brand-secondary-bg-bold" />
        <Container className="h-1 flex-1 rounded-full bg-brand-secondary-bg-bold" />
      </Container>

      <Container className="mb-8">
        <Text tone="primary" variant="h4">
          Choose the required and appropriate checklists for this job
        </Text>
      </Container>

      <Input
        placeholder="Search checklist"
        value={search}
        variant2
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<SearchIcon className="text-secondary" size={18} />}
      />

      <Container className="flex flex-col gap-3 mt-6">
        {filteredOptions.map((option) => (
          <Container
            key={option.id}
            onClick={() => onToggle(option.id)}
            className="bg-background rounded-xl px-2 py-2.5 flex items-center gap-3 text-left cursor-pointer"
          >
            <Checkbox
              checked={selected.includes(option.id)}
              onChange={() => onToggle(option.id)}
            />
            <Text variant="bodySmall" tone="primary">
              {option.label}
            </Text>
          </Container>
        ))}

        {filteredOptions.length === 0 && (
          <Text
            variant="bodySmall"
            tone="secondary"
            className="text-center py-6"
          >
            No checklist items match your search
          </Text>
        )}
      </Container>

      {error && (
        <Text variant="bodyXSmall" className="text-danger-text-icons mt-3">
          {error}
        </Text>
      )}

      <Container className="h-px bg-border my-8" />

      <Container className="flex items-center gap-3">
        <Button variant="neutral" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          rightIcon={<CheckIcon className="text-inverted" size={18} />}
          onClick={onSave}
          disabled={isPending}
          loading={isPending}
        >
          Save
        </Button>
      </Container>
    </Container>
  );
};
