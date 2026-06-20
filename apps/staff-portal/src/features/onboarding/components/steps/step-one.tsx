"use client";

import { Button, Checkbox, Container, Input, Text } from "@resonance/ui";
import React from "react";
import { OnboardingUploadBox } from "../onboarding-upload-box";
import { useStepOneScreen } from "../../hooks/useOnboarding";
import { NextIcon } from "@resonance/ui/icons";

interface StepOneProps {
  onSuccess: () => void;
}

export const StepOne = ({ onSuccess }: StepOneProps) => {
  const {
    formData,
    errors,
    isPending,
    handleNinChange,
    handleWorkEligibilityChange,
    handleDbsConsentChange,
    handleRtwChange,
    handleCcdChange,
    handleSubmit,
  } = useStepOneScreen(onSuccess);

  return (
    <Container>
      <Text className="text-primary mb-5" variant="h4">
        UK legal eligibility & hiring requirements
      </Text>

      <Container className="mb-6">
        <Text className="text-primary mb-2" variant="bodySmall">
          Are you eligible to work in the UK?{" "}
          <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <Container className="bg-surface p-3 rounded-xl flex gap-3">
          <Checkbox
            checked={formData.work_eligibility}
            onChange={handleWorkEligibilityChange}
          />
          <Text variant="bodySmall" className="text-secondary">
            Yes, I am eligible to work in the UK in accordance with the
            Immigration, Asylum and Nationality Act 2006
          </Text>
        </Container>
        {errors.work_eligibility && (
          <Text variant="bodyXSmall" className="text-danger-text-icons mt-1">
            {errors.work_eligibility}
          </Text>
        )}
      </Container>

      <Container className="mb-4">
        <Input
          required
          label="National Insurance Number"
          placeholder="Enter insurance number"
          value={formData.nin}
          onChange={handleNinChange}
          error={errors.nin}
        />
      </Container>

      <Container className="mb-6">
        <Text className="text-primary mb-2" variant="bodySmall">
          Upload your right to work document{" "}
          <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <OnboardingUploadBox
          file={formData.rtw}
          onChange={handleRtwChange}
          error={errors.rtw}
        />
      </Container>

      <Container className="mb-6">
        <Text className="text-primary mb-2" variant="bodySmall">
          Criminal Convictions Declaration{" "}
          <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <OnboardingUploadBox
          file={formData.ccd}
          onChange={handleCcdChange}
          error={errors.ccd}
        />
      </Container>

      <Container className="flex gap-2 mb-8">
        <Checkbox
          checked={formData.dbs_consent}
          onChange={handleDbsConsentChange}
        />
        <Container>
          <Text variant="buttonXS" className="text-primary">
            I consent to a DBS (Disclosure and Barring Service) check being
            carried out
          </Text>
          {errors.dbs_consent && (
            <Text variant="bodyXSmall" className="text-danger-text-icons mt-1">
              {errors.dbs_consent}
            </Text>
          )}
        </Container>
      </Container>

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
