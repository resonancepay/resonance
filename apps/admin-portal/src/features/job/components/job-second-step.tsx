"use client";

import { Button, Container, Input, Radio, Text } from "@resonance/ui";
import { ChevronDownIcon, ClockIcon, DateIcon, NextIcon } from "@resonance/ui/icons";
import { useState } from "react";
import { getTodayDateString } from "../types/job.schema";
import { ELIGIBLE_RADIUS_OPTIONS } from "../utils/job-form-options";
import { JobAssignmentStepProps } from "../types/job.type";
import { JobTypeCard } from "./cards/job-type-card";
import { SelectCleanerModal } from "./modal/select-cleaner-modal";

export const JobSecondStep = ({
  values,
  errors,
  cleaners,
  heading = "Set up job assignment",
  onAssignmentTypeChange,
  onDeadlineDateChange,
  onDeadlineTimeChange,
  onEligibleRadiusChange,
  onAssignedCleanerChange,
  onCancel,
  onContinue,
}: JobAssignmentStepProps) => {
  const [cleanerModalOpen, setCleanerModalOpen] = useState(false);
  const selectedCleaner = cleaners.find(
    (cleaner) => String(cleaner.cleaner_id) === values.assignedCleaner,
  );

  return (
    <Container>
      <Container className="flex items-center gap-1.5 mb-8">
        <Container className="h-1 flex-1 rounded-full bg-brand-secondary-bg-bold" />
        <Container className="h-1 flex-1 rounded-full bg-brand-secondary-bg-bold" />
        <Container className="h-1 flex-1 rounded-full bg-muted" />
      </Container>

      <Container className="mb-8">
        <Text tone="primary" variant="h4">
          {heading}
        </Text>
      </Container>

      <Container className="flex flex-col gap-4">
        <JobTypeCard
          active={values.assignmentType === "publish"}
          mainText="Publish Job"
          subText="Job will be open to claim by cleaners"
          setActive={() => onAssignmentTypeChange("publish")}
        />
        <JobTypeCard
          active={values.assignmentType === "assign"}
          mainText="Assign a cleaner"
          subText="Give the job directly to a cleaner of choice"
          setActive={() => onAssignmentTypeChange("assign")}
        />
      </Container>

      <Container className="h-px bg-border my-8" />

      <Container className="mb-6">
        <Text tone="primary" variant="h5">
          Assignment conditions
        </Text>
      </Container>

      <Container className="flex flex-col gap-6">
        {values.assignmentType === "publish" && (
          <>
            <Container>
              <Container as="label" className="flex items-center gap-0.5 mb-1">
                <Text variant="bodySmall" className="text-primary">
                  Deadline
                </Text>
                <Text variant="bodySmall" className="text-danger-text-icons">
                  *
                </Text>
              </Container>
              <Container className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  variant2
                  placeholder="Set date"
                  min={getTodayDateString()}
                  value={values.deadlineDate}
                  onChange={onDeadlineDateChange}
                  error={errors.deadlineDate}
                  rightIcon={<DateIcon size={18} className="text-secondary" />}
                />
                <Input
                  type="time"
                  variant2
                  placeholder="Set time"
                  value={values.deadlineTime}
                  onChange={onDeadlineTimeChange}
                  error={errors.deadlineTime}
                  rightIcon={<ClockIcon size={18} className="text-secondary" />}
                />
              </Container>
            </Container>

            <Container>
              <Container as="label" className="flex items-center gap-0.5 mb-3">
                <Text variant="bodySmall" className="text-primary">
                  Eligible Cleaners
                </Text>
                <Text variant="bodySmall" className="text-danger-text-icons">
                  *
                </Text>
              </Container>
              <Container className="flex flex-col gap-3">
                {ELIGIBLE_RADIUS_OPTIONS.map((option) => (
                  <Container
                    key={option.id}
                    className="bg-muted py-2.5 px-3 rounded-xl"
                  >
                    <Radio
                      label={option.label}
                      showBackground={false}
                      checked={values.eligibleRadius === option.id}
                      onChange={() => onEligibleRadiusChange(option.id)}
                    />
                  </Container>
                ))}
              </Container>
              {errors.eligibleRadius && (
                <Text
                  variant="bodyXSmall"
                  className="text-danger-text-icons mt-2"
                >
                  {errors.eligibleRadius}
                </Text>
              )}
            </Container>
          </>
        )}

        {values.assignmentType === "assign" && (
          <Container>
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
                errors.assignedCleaner ? "border-danger-border" : "border-transparent",
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

            {errors.assignedCleaner && (
              <Text variant="bodySmall" className="text-danger-text-icons mt-1">
                {errors.assignedCleaner}
              </Text>
            )}
          </Container>
        )}
      </Container>

      <SelectCleanerModal
        isOpen={cleanerModalOpen}
        onClose={() => setCleanerModalOpen(false)}
        cleaners={cleaners}
        selectedCleanerId={values.assignedCleaner}
        onSelect={onAssignedCleanerChange}
      />

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
