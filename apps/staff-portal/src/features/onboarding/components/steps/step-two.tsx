"use client";

import {
  Button,
  Checkbox,
  Container,
  Input,
  Text,
  Textarea,
} from "@resonance/ui";
import { AddIcon, CloseIcon, NextIcon } from "@resonance/ui/icons";
import React from "react";
import { useStepTwoScreen } from "../../hooks/useOnboarding";

interface StepTwoProps {
  onSuccess: () => void;
}

export const StepTwo = ({ onSuccess }: StepTwoProps) => {
  const {
    entries,
    errors,
    isPending,
    handleAdd,
    handleRemove,
    handleChange,
    handleSubmit,
  } = useStepTwoScreen(onSuccess);

  return (
    <Container>
      <Text variant="h4" className="text-primary">
        Tell us your work experience
      </Text>

      {entries.map((entry, index) => (
        <Container key={entry.id} className="mt-6 border-b border-border pb-4">
          <Container className="flex items-center justify-between">
            <Text variant="bodyLarge" className="text-primary">
              {index + 1}. Employment History
            </Text>
            {entries.length > 1 && (
              <Button
                variant="transparent"
                size="small"
                onClick={() => handleRemove(entry.id)}
                leftIcon={<CloseIcon size={16} className="text-danger-text-icons" />}
              >
                <Text variant="buttonXS" className="text-danger-text-icons">Remove</Text>
              </Button>
            )}
          </Container>

          <Container className="mt-5">
            <Container className="mb-6">
              <Input
                required
                label="Employer"
                placeholder="Enter your employer's name"
                value={entry.employer_name}
                onChange={(e) => handleChange(entry.id, "employer_name", e.target.value)}
                error={errors[index]?.employer_name}
              />
            </Container>
            <Container className="mb-6">
              <Input
                required
                label="Job Title"
                placeholder="Enter your job title"
                value={entry.job_title}
                onChange={(e) => handleChange(entry.id, "job_title", e.target.value)}
                error={errors[index]?.job_title}
              />
            </Container>
            <Container className="mb-6">
              <Input
                required
                label="Start Date"
                placeholder="Select date"
                type="date"
                value={entry.start_date}
                onChange={(e) => handleChange(entry.id, "start_date", e.target.value)}
                error={errors[index]?.start_date}
              />
            </Container>
            <Container className="mb-6">
              <Input
                required
                label="End Date"
                placeholder="Select date"
                type="date"
                value={entry.end_date}
                onChange={(e) => handleChange(entry.id, "end_date", e.target.value)}
                error={errors[index]?.end_date}
                disabled={entry.currently_working}
              />
              <Container className="flex items-center gap-2 mt-3">
                <Checkbox
                  checked={entry.currently_working}
                  onChange={(checked) => handleChange(entry.id, "currently_working", checked)}
                />
                <Text variant="buttonXS" className="text-primary">
                  I still currently work here
                </Text>
              </Container>
            </Container>
            <Container className="mb-6">
              <Textarea
                label="Responsibilities"
                required
                placeholder="Enter your responsibilities"
                value={entry.responsibilities}
                onChange={(e) => handleChange(entry.id, "responsibilities", e.target.value)}
                error={errors[index]?.responsibilities}
              />
            </Container>
            <Container>
              <Textarea
                label="Reason for leaving"
                required={!entry.currently_working}
                placeholder="Enter your reasons"
                value={entry.reason_for_leave}
                onChange={(e) => handleChange(entry.id, "reason_for_leave", e.target.value)}
                error={errors[index]?.reason_for_leave}
                disabled={entry.currently_working}
              />
            </Container>
          </Container>
        </Container>
      ))}

      <Button
        className="w-full mt-4"
        variant="neutral"
        onClick={handleAdd}
        rightIcon={<AddIcon className="text-primary" />}
      >
        Add more
      </Button>

      <Button
        onClick={handleSubmit}
        loading={isPending}
        rightIcon={<NextIcon className="text-inverted" />}
        className="w-full my-5"
        variant="primary"
      >
        Continue
      </Button>
    </Container>
  );
};
