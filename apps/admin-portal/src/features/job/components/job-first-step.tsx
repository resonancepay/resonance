"use client";

import { Button, Checkbox, Container, Input, Select, Text } from "@resonance/ui";
import { ChevronDownIcon, NextIcon } from "@resonance/ui/icons";
import { ChangeEvent, useState } from "react";
import { JobFirstStepValues } from "../hooks/useCreateJobScreen";
import { getTodayDateString } from "../types/job.schema";
import { SelectCleanerModal } from "./modal/select-cleaner-modal";
import { ApprovedCleaner } from "@/features/cleaners/types/cleaner.type";

interface Option {
  label: string;
  value: string;
}

type TextField = "jobPay" | "cleanerPay" | "consumables" | "date";
type SelectField = "cleaningSite" | "startTime" | "endTime" | "cleaner" | "timezone";

interface JobFirstStepProps {
  values: JobFirstStepValues;
  errors: Partial<Record<keyof JobFirstStepValues, string>>;
  siteOptions: Option[];
  cleaners: ApprovedCleaner[];
  timeOptions: Option[];
  timezoneOptions: Option[];
  heading?: string;
  onChange: (field: TextField) => (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: SelectField) => (value?: string) => void;
  onConsumablesProvidedChange: (checked: boolean) => void;
  onCancel: () => void;
  onContinue: () => void;
}

export const JobFirstStep = ({
  values,
  errors,
  siteOptions,
  cleaners,
  timeOptions,
  timezoneOptions,
  heading = "Create a job and assign a cleaner to the job",
  onChange,
  onSelectChange,
  onConsumablesProvidedChange,
  onCancel,
  onContinue,
}: JobFirstStepProps) => {
  const [cleanerModalOpen, setCleanerModalOpen] = useState(false);
  const selectedCleaner = cleaners.find(
    (cleaner) => String(cleaner.cleaner_id) === values.cleaner,
  );

  return (
    <Container>
      <Container className="flex items-center gap-1.5 mb-8">
        <Container className="h-1 flex-1 rounded-full bg-brand-secondary-bg-bold" />
        <Container className="h-1 flex-1 rounded-full bg-muted" />
      </Container>

      <Container className="mb-8">
        <Text tone="primary" variant="h4">
          {heading}
        </Text>
      </Container>

      <Container className="flex flex-col gap-6">
        <Select
          options={siteOptions}
          value={values.cleaningSite}
          onChange={onSelectChange("cleaningSite")}
          label="Cleaning Site"
          placeholder="Select site"
          required
          variant2
          error={errors.cleaningSite}
        />

        <Container className="grid grid-cols-2 gap-4">
          <Input
            label="Job Pay"
            required
            variant2
            placeholder="£0.00"
            value={values.jobPay}
            onChange={onChange("jobPay")}
            error={errors.jobPay}
          />
          <Input
            label="Cleaner's Pay"
            required
            variant2
            placeholder="£0.00"
            value={values.cleanerPay}
            onChange={onChange("cleanerPay")}
            error={errors.cleanerPay}
          />
        </Container>

        <Container>
          <Input
            label="Consumables"
            required
            variant2
            placeholder="Enter consumables"
            value={values.consumables}
            disabled={values.consumablesProvidedByCustomer}
            onChange={onChange("consumables")}
            error={errors.consumables}
          />
          <Container className="flex items-center gap-2 mt-3">
            <Checkbox
              checked={values.consumablesProvidedByCustomer}
              onChange={onConsumablesProvidedChange}
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
          min={getTodayDateString()}
          value={values.date}
          onChange={onChange("date")}
          error={errors.date}
        />

        <Container className="grid grid-cols-2 gap-4">
          <Select
            options={timeOptions}
            value={values.startTime}
            onChange={onSelectChange("startTime")}
            label="Start Time"
            placeholder="Select time"
            required
            variant2
            error={errors.startTime}
          />
          <Select
            options={timeOptions}
            value={values.endTime}
            onChange={onSelectChange("endTime")}
            label="End Time"
            placeholder="Select time"
            required
            variant2
            error={errors.endTime}
          />
        </Container>

        <Select
          options={timezoneOptions}
          value={values.timezone}
          onChange={onSelectChange("timezone")}
          label="Timezone"
          placeholder="Select timezone"
          required
          variant2
          error={errors.timezone}
        />

        <Container className="flex flex-col gap-1">
          <Container as="label" className="flex items-center gap-0.5 mb-1">
            <Text variant="bodySmall" className="text-primary">
              Assign Cleaner
            </Text>
            <Text variant="bodySmall" className="text-danger-text-icons">
              *
            </Text>
          </Container>

          <Container
            as="button"
            type="button"
            onClick={() => setCleanerModalOpen(true)}
            className={[
              "w-full h-10 rounded-2xl border outline-none px-4 text-base sm:text-xs font-sans transition-colors",
              "flex items-center gap-2 cursor-pointer bg-muted text-primary",
              errors.cleaner ? "border-danger-border" : "border-transparent",
            ].join(" ")}
          >
            <span
              className={[
                "flex-1 text-left truncate",
                !selectedCleaner ? "text-secondary" : "",
              ].join(" ")}
            >
              {selectedCleaner ? selectedCleaner.full_name : "Select cleaner"}
            </span>
            <ChevronDownIcon size={16} className="shrink-0 text-secondary" />
          </Container>

          {errors.cleaner && (
            <Text variant="bodySmall" className="text-danger-text-icons">
              {errors.cleaner}
            </Text>
          )}
        </Container>
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
          onClick={onContinue}
        >
          Continue
        </Button>
      </Container>

      <SelectCleanerModal
        isOpen={cleanerModalOpen}
        onClose={() => setCleanerModalOpen(false)}
        cleaners={cleaners}
        selectedCleanerId={values.cleaner}
        onSelect={(cleanerId) => onSelectChange("cleaner")(cleanerId)}
      />
    </Container>
  );
};
