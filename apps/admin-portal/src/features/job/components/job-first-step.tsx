"use client";

import { Button, Checkbox, Container, Input, Select, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import { getTodayDateString } from "../types/job.schema";
import { JobFirstStepProps } from "../types/job.type";



export const JobFirstStep = ({
  values,
  errors,
  siteOptions,
  timeOptions,
  timezoneOptions,
  heading = "Create a job details",
  onChange,
  onSelectChange,
  onConsumablesProvidedChange,
  onCancel,
  onContinue,
}: JobFirstStepProps) => {
  return (
    <Container>
      <Container className="flex items-center gap-1.5 mb-8">
        <Container className="h-1 flex-1 rounded-full bg-brand-secondary-bg-bold" />
        <Container className="h-1 flex-1 rounded-full bg-muted" />
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
    </Container>
  );
};
