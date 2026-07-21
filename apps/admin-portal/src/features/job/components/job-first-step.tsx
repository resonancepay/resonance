"use client";

import { Button, Checkbox, Container, Input, Select, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import { useState } from "react";

const CLEANING_SITE_OPTIONS = [
  { label: "Northgare Office - Floor 3", value: "northgare-office-floor-3" },
  { label: "Ikeja Business Hub", value: "ikeja-business-hub" },
  { label: "Lekki Residence", value: "lekki-residence" },
  { label: "Victoria Island Office", value: "victoria-island-office" },
];

const CLEANER_OPTIONS = [
  { label: "Mary Abam", value: "mary-abam" },
  { label: "Priscilla Iwalewa", value: "priscilla-iwalewa" },
  { label: "Mary Olaniyan", value: "mary-olaniyan" },
  { label: "Margaret Obubra", value: "margaret-obubra" },
];

const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hour24 = Math.floor(index / 2);
  const minute = index % 2 === 0 ? "00" : "30";
  const period = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const value = `${String(hour24).padStart(2, "0")}:${minute}`;
  const label = `${hour12}:${minute} ${period}`;
  return { label, value };
});

export interface JobFirstStepValues {
  cleaningSite?: string;
  jobPay: string;
  cleanerPay: string;
  consumables: string;
  consumablesProvidedByCustomer: boolean;
  date: string;
  startTime?: string;
  endTime?: string;
  cleaner?: string;
}

interface JobFirstStepProps {
  onCancel: () => void;
  onContinue: (values: JobFirstStepValues) => void;
}

export const JobFirstStep = ({ onCancel, onContinue }: JobFirstStepProps) => {
  const [cleaningSite, setCleaningSite] = useState<string | undefined>();
  const [jobPay, setJobPay] = useState("");
  const [cleanerPay, setCleanerPay] = useState("");
  const [consumables, setConsumables] = useState("");
  const [consumablesProvidedByCustomer, setConsumablesProvidedByCustomer] =
    useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState<string | undefined>();
  const [endTime, setEndTime] = useState<string | undefined>();
  const [cleaner, setCleaner] = useState<string | undefined>();

  const handleContinue = () => {
    onContinue({
      cleaningSite,
      jobPay,
      cleanerPay,
      consumables,
      consumablesProvidedByCustomer,
      date,
      startTime,
      endTime,
      cleaner,
    });
  };

  return (
    <Container>
      <Container className="flex items-center gap-1.5 mb-8">
        <Container className="h-1 flex-1 rounded-full bg-brand-secondary-bg-bold" />
        <Container className="h-1 flex-1 rounded-full bg-muted" />
      </Container>

      <Container className="mb-8">
        <Text tone="primary" variant="h4">
          Create a job and assign a cleaner to the job
        </Text>
      </Container>

      <Container className="flex flex-col gap-6">
        <Select
          options={CLEANING_SITE_OPTIONS}
          value={cleaningSite}
          onChange={setCleaningSite}
          label="Cleaning Site"
          placeholder="Select site"
          required
          variant2
        />

        <Container className="grid grid-cols-2 gap-4">
          <Input
            label="Job Pay"
            required
            variant2
            placeholder="£0.00"
            value={jobPay}
            onChange={(e) => setJobPay(e.target.value)}
          />
          <Input
            label="Cleaner's Pay"
            required
            variant2
            placeholder="£0.00"
            value={cleanerPay}
            onChange={(e) => setCleanerPay(e.target.value)}
          />
        </Container>

        <Container>
          <Input
            label="Consumables"
            required
            variant2
            placeholder="Enter consumables"
            value={consumables}
            disabled={consumablesProvidedByCustomer}
            onChange={(e) => setConsumables(e.target.value)}
          />
          <Container className="flex items-center gap-2 mt-3">
            <Checkbox
              checked={consumablesProvidedByCustomer}
              onChange={(checked) => {
                setConsumablesProvidedByCustomer(checked);
                if (checked) setConsumables("");
              }}
            />
            <Text variant="bodySmall" tone="primary">
              Consumables provided by customer
            </Text>
          </Container>
        </Container>

        <Input
          label="Date"
          required
          variant2
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Container className="grid grid-cols-2 gap-4">
          <Select
            options={TIME_OPTIONS}
            value={startTime}
            onChange={setStartTime}
            label="Start Time"
            placeholder="Select time"
            required
            variant2
          />
          <Select
            options={TIME_OPTIONS}
            value={endTime}
            onChange={setEndTime}
            label="End Time"
            placeholder="Select time"
            required
            variant2
          />
        </Container>

        <Select
          options={CLEANER_OPTIONS}
          value={cleaner}
          onChange={setCleaner}
          label="Assign Cleaner"
          placeholder="Select cleaner"
          required
          variant2
        />
      </Container>

      <Container className="h-px bg-border my-8" />

      <Container className="flex items-center gap-3">
        <Button variant="neutral" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          rightIcon={<NextIcon className="text-inverted" size={18} />}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Container>
    </Container>
  );
};
