"use client";

import { useEffect, useState } from "react";
import { Button, Container, Input, Modal, Select, Text } from "@resonance/ui";
import { AddIcon, CloseIcon, TickIcon } from "@resonance/ui/icons";
import {
  AvailabilityEntry,
  NewAvailabilityEntry,
} from "@/features/auth/types/auth.type";

export const DAY_OPTIONS = [
  { value: "mondays", label: "Mondays" },
  { value: "tuesdays", label: "Tuesdays" },
  { value: "wednesdays", label: "Wednesdays" },
  { value: "thursdays", label: "Thursdays" },
  { value: "fridays", label: "Fridays" },
  { value: "saturdays", label: "Saturdays" },
  { value: "sundays", label: "Sundays" },
];

const formatTime12h = (time: string) => {
  const [hoursStr, minutes] = time.split(":");
  const hours = Number(hoursStr);
  if (Number.isNaN(hours)) return time;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${String(displayHours).padStart(2, "0")}:${minutes} ${period}`;
};

// Local editing shape — a "dayLabel" for display on top of the raw values
// the API deals in. availabilityId is set only for entries already saved
// server-side; entries just added in this session don't have one yet.
export interface AvailabilityDraftEntry {
  id: string;
  availabilityId?: number;
  day: string;
  dayLabel: string;
  startTime: string;
  endTime: string;
}

interface SetupAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Only the newly-added entries — already-persisted ones are removed via
  // onRemoveExisting instead, since /setup has no id to reconcile against.
  onSubmit: (entries: NewAvailabilityEntry[]) => void;
  onRemoveExisting: (availabilityId: number) => void;
  initialEntries?: AvailabilityDraftEntry[];
  isPending?: boolean;
  isRemoving?: boolean;
}

// Wire shape (day/start_time/end_time) -> local editing shape (adds a
// friendly dayLabel for display and carries the availability_id through).
export const toAvailabilityDraftEntries = (
  entries: AvailabilityEntry[],
): AvailabilityDraftEntry[] =>
  entries.map((entry) => ({
    id: String(entry.availability_id),
    availabilityId: entry.availability_id,
    day: entry.day,
    dayLabel: DAY_OPTIONS.find((option) => option.value === entry.day)?.label ?? entry.day,
    startTime: entry.start_time,
    endTime: entry.end_time,
  }));

export const SetupAvailabilityModal = ({
  isOpen,
  onClose,
  onSubmit,
  onRemoveExisting,
  initialEntries,
  isPending,
  isRemoving,
}: SetupAvailabilityModalProps) => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [entries, setEntries] = useState<AvailabilityDraftEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setDay("");
      setStartTime("");
      setEndTime("");
      setEntries(initialEntries ?? []);
    }
  }, [isOpen, initialEntries]);

  const canAdd = !!day && !!startTime && !!endTime;

  const handleAdd = () => {
    if (!canAdd) return;
    const dayLabel = DAY_OPTIONS.find((option) => option.value === day)?.label ?? day;
    setEntries((prev) => [
      ...prev,
      { id: `${day}-${Date.now()}`, day, dayLabel, startTime, endTime },
    ]);
    setDay("");
    setStartTime("");
    setEndTime("");
  };

  // A persisted entry (has availabilityId) is removed via the real delete
  // endpoint — the list re-syncs from `initialEntries` once that succeeds
  // and the profile refetches. A just-added draft entry only exists
  // locally, so it's dropped from state directly.
  const handleRemove = (entry: AvailabilityDraftEntry) => {
    if (entry.availabilityId !== undefined) {
      onRemoveExisting(entry.availabilityId);
      return;
    }
    setEntries((prev) => prev.filter((e) => e.id !== entry.id));
  };

  const handleSave = () => {
    const newEntries: NewAvailabilityEntry[] = entries
      .filter((entry) => entry.availabilityId === undefined)
      .map((entry) => ({
        day: entry.day,
        start_time: entry.startTime,
        end_time: entry.endTime,
      }));

    if (newEntries.length === 0) {
      onClose();
      return;
    }
    onSubmit(newEntries);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={460}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Setup Availability
        </Text>
      </Container>
      <Container className="h-px bg-border" />

      <Container className="px-2 mt-4">
        <Select
          variant2
          label="Day(S)"
          required
          placeholder="Select day"
          options={DAY_OPTIONS}
          value={day}
          onChange={setDay}
        />
      </Container>

      <Container className="px-2 mt-4">
        <Text variant="bodySmall" className="text-primary mb-1">
          Time Range <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <Container className="flex items-center gap-2">
          <Input
            variant2
            type="time"
            placeholder="Start time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            variant2
            type="time"
            placeholder="End time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Container>
      </Container>

      <Container className="px-2 mt-3">
        <Button
          size="small"
          variant="neutral"
          disabled={!canAdd}
          rightIcon={<AddIcon size={16} className="text-primary" />}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Container>

      {entries.length > 0 && (
        <Container className="px-2 mt-4 flex flex-wrap gap-2">
          {entries.map((entry) => (
            <Container
              key={entry.id}
              className="relative bg-brand-tertiary-bg-light border border-brand-tertiary-border rounded-xl py-1 px-2.5 pr-7"
            >
              <Text variant="bodySmall" tone="primary">
                {entry.dayLabel}
              </Text>
              <Text variant="bodyXSmall" tone="secondary">
                {formatTime12h(entry.startTime)} - {formatTime12h(entry.endTime)}
              </Text>
              <Container
                as="button"
                type="button"
                disabled={isRemoving}
                onClick={() => handleRemove(entry)}
                className="absolute top-1.5 right-1.5 disabled:opacity-50"
              >
                <CloseIcon size={14} className="text-danger-text-icons" />
              </Container>
            </Container>
          ))}
        </Container>
      )}

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="primary"
          rightIcon={<TickIcon size={16} className="text-inverted" />}
          disabled={entries.length === 0}
          loading={isPending}
          onClick={handleSave}
        >
          Save
        </Button>
      </Container>
    </Modal>
  );
};
