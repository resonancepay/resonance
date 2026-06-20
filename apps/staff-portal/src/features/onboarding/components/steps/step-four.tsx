"use client";

import { Button, Checkbox, Container, Radio, Select, Text } from "@resonance/ui";
import { CheckIcon } from "@resonance/ui/icons";
import React from "react";
import { useStepFourScreen } from "../../hooks/useOnboarding";
import { StepFourAvailability } from "../../types/onboarding.type";

const DAYS: { key: keyof StepFourAvailability; label: string }[] = [
  { key: "mondays", label: "Mondays" },
  { key: "tuesdays", label: "Tuesdays" },
  { key: "wednesdays", label: "Wednesdays" },
  { key: "thursdays", label: "Thursdays" },
  { key: "fridays", label: "Fridays" },
  { key: "saturdays", label: "Saturdays" },
  { key: "sundays", label: "Sundays" },
];

const UNIFORM_SIZES = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
];

interface StepFourProps {
  onSuccess: (referenceCode: string) => void;
}

export const StepFour = ({ onSuccess }: StepFourProps) => {
  const {
    availability,
    uniformSize,
    reliableTransport,
    workOnHolidays,
    termsAndPolicy,
    errors,
    isPending,
    toggleDay,
    handleUniformSizeChange,
    handleReliableTransportChange,
    handleWorkOnHolidaysChange,
    handleTermsChange,
    handleSubmit,
  } = useStepFourScreen(onSuccess);

  return (
    <Container>
      <Text variant="h4" className="text-primary">
        Job Suitability
      </Text>

      {/* Availability */}
      <Container className="mt-6 mb-6">
        <Text className="text-primary mb-3" variant="bodySmall">
          Availability (select days){" "}
          <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <Container className="grid grid-cols-2 gap-2">
          {DAYS.map(({ key, label }) => (
            <Container
              key={key}
              className="flex items-center gap-3 bg-surface rounded-2xl px-4 py-3"
            >
              <Checkbox
                checked={availability[key]}
                onChange={() => toggleDay(key)}
              />
              <Text variant="bodySmall" className="text-secondary">
                {label}
              </Text>
            </Container>
          ))}
        </Container>
        {errors.availability && (
          <Text variant="bodyXSmall" className="text-danger-text-icons mt-2">
            {errors.availability}
          </Text>
        )}
      </Container>

      {/* Uniform Size */}
      <Container className="mb-6">
        <Select
          required
          label="Uniform Size"
          placeholder="Select your size"
          options={UNIFORM_SIZES}
          value={uniformSize}
          onChange={handleUniformSizeChange}
          error={errors.uniform_size}
        />
      </Container>

      {/* Reliable Transport */}
      <Container className="mb-6">
        <Text className="text-primary mb-3" variant="bodySmall">
          Do you have reliable transport?{" "}
          <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <Container className="flex gap-2">
          <Radio
            label="Yes"
            checked={reliableTransport === true}
            onChange={() => handleReliableTransportChange(true)}
          />
          <Radio
            label="No"
            checked={reliableTransport === false}
            onChange={() => handleReliableTransportChange(false)}
          />
        </Container>
        {errors.reliable_transport && (
          <Text variant="bodyXSmall" className="text-danger-text-icons mt-2">
            {errors.reliable_transport}
          </Text>
        )}
      </Container>

      {/* Work on Holidays */}
      <Container className="mb-6">
        <Text className="text-primary mb-3" variant="bodySmall">
          Can you work on holidays?{" "}
          <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <Container className="flex gap-2">
          <Radio
            label="Yes, I can"
            checked={workOnHolidays === true}
            onChange={() => handleWorkOnHolidaysChange(true)}
          />
          <Radio
            label="No, I can't"
            checked={workOnHolidays === false}
            onChange={() => handleWorkOnHolidaysChange(false)}
          />
        </Container>
        {errors.work_on_holidays && (
          <Text variant="bodyXSmall" className="text-danger-text-icons mt-2">
            {errors.work_on_holidays}
          </Text>
        )}
      </Container>

      {/* Terms */}
      <Container className="flex items-start gap-3 mt-2">
        <Checkbox
          checked={termsAndPolicy}
          onChange={handleTermsChange}
        />
        <Text variant="bodySmall" className="text-primary">
          I have read and agree to the{" "}
          <Container as="span" className="text-brand-tertiary-text-icons cursor-pointer">
            Terms of Use
          </Container>{" "}
          and{" "}
          <Container as="span" className="text-brand-tertiary-text-icons cursor-pointer">
            Privacy Policy
          </Container>
        </Text>
      </Container>
      {errors.terms_and_policy && (
        <Text variant="bodyXSmall" className="text-danger-text-icons mt-2">
          {errors.terms_and_policy}
        </Text>
      )}

      <Button
        onClick={handleSubmit}
        loading={isPending}
        rightIcon={<CheckIcon className="text-inverted" />}
        className="w-full my-5"
        variant="primary"
      >
        Submit Application
      </Button>
    </Container>
  );
};
