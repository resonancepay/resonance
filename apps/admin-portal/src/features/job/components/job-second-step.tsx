"use client";

import { Button, Checkbox, Container, Input, Text } from "@resonance/ui";
import { CheckIcon, SearchIcon } from "@resonance/ui/icons";
import { useMemo, useState } from "react";

const CHECKLIST_OPTIONS = [
  { id: "clean-lobby-glass", label: "Clean lobby glass" },
  { id: "vacuum-hallway-carpet", label: "Vacuum hallway carpet" },
  { id: "polish-lift-interior", label: "Polish lift interior" },
  { id: "dust-artificial-flowers", label: "Dust all artificial flowers" },
  {
    id: "clean-coffee-stain-reception-couch",
    label: "Clean coffee stain on reception couch",
  },
  { id: "clean-underneath-tables", label: "Clean underneath the tables" },
  { id: "clear-office-pantry", label: "Clear out the office pantry" },
  { id: "clean-kitchen-cabinets", label: "Clean kitchen cabinets" },
  { id: "dust-artworks", label: "Dust the artworks" },
  { id: "dust-chandeliers", label: "Dust the chandeliers" },
  { id: "polish-leather-chairs", label: "Polish the leather chairs" },
];

interface JobSecondStepProps {
  onCancel: () => void;
  onSave: (selectedChecklistIds: string[]) => void;
}

export const JobSecondStep = ({ onCancel, onSave }: JobSecondStepProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return CHECKLIST_OPTIONS;
    return CHECKLIST_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [search]);

  const toggleOption = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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
            as="button"
            type="button"
            onClick={() => toggleOption(option.id)}
            className="bg-background rounded-xl px-2 py-2.5 flex items-center gap-3 text-left"
          >
            <Checkbox
              checked={selected.has(option.id)}
              onChange={() => toggleOption(option.id)}
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

      <Container className="h-px bg-border my-8" />

      <Container className="flex items-center gap-3">
        <Button variant="neutral" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          rightIcon={<CheckIcon className="text-inverted" size={18} />}
          onClick={() => onSave(Array.from(selected))}
        >
          Save
        </Button>
      </Container>
    </Container>
  );
};
