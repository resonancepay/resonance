"use client";

import { Button, Container, Input, PhoneInput, Select, Text } from "@resonance/ui";
import { AddIcon, CloseIcon, NextIcon } from "@resonance/ui/icons";
import React from "react";
import { useStepThreeScreen } from "../../hooks/useOnboarding";
import {
  EmergencyContactEntry,
  QualificationEntry,
  RefereeEntry,
  StepThreeEmergencyErrors,
  StepThreeQualificationErrors,
  StepThreeRefereeErrors,
} from "../../types/onboarding.type";

const GRADE_OPTIONS = [
  { value: "distinction", label: "Distinction" },
  { value: "merit", label: "Merit" },
  { value: "pass", label: "Pass" },
  { value: "a_star", label: "A*" },
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
  { value: "other", label: "Other" },
];

interface StepThreeProps {
  onSuccess: () => void;
}

export const StepThree = ({ onSuccess }: StepThreeProps) => {
  const {
    qualifications,
    emergencyContacts,
    referees,
    qualificationErrors,
    emergencyErrors,
    refereeErrors,
    isPending,
    qualificationHandlers,
    emergencyHandlers,
    refereeHandlers,
    handleSubmit,
  } = useStepThreeScreen(onSuccess);

  return (
    <Container>
      <Text variant="h4" className="text-primary">
        Qualification, Credibility and Safety
      </Text>

      {/* Qualifications */}
      {qualifications.map((entry: QualificationEntry, index: number) => (
        <Container key={entry.id} className="mt-6 border-b border-border pb-6">
          <Container className="flex items-center justify-between mb-5">
            <Text variant="bodyLarge" className="text-primary">
              {index === 0 ? "Your Qualification" : `Qualification ${index + 1}`}
            </Text>
            {qualifications.length > 1 && (
              <Button
                variant="transparent"
                size="small"
                onClick={() => qualificationHandlers.handleRemove(entry.id)}
                leftIcon={<CloseIcon size={16} className="text-danger-text-icons" />}
              >
                <Text variant="buttonXS" className="text-danger-text-icons">Remove</Text>
              </Button>
            )}
          </Container>
          <Container className="mb-6">
            <Input
              required
              label="Qualification Title"
              placeholder="Enter your title"
              value={entry.qualification_title}
              onChange={(e) => qualificationHandlers.handleChange(entry.id, "qualification_title", e.target.value)}
              error={(qualificationErrors as StepThreeQualificationErrors)[index]?.qualification_title}
            />
          </Container>
          <Container className="mb-6">
            <Input
              required
              label="Institution"
              placeholder="Enter institution name"
              value={entry.institution}
              onChange={(e) => qualificationHandlers.handleChange(entry.id, "institution", e.target.value)}
              error={(qualificationErrors as StepThreeQualificationErrors)[index]?.institution}
            />
          </Container>
          <Container className="mb-6">
            <Input
              required
              label="Date Achieved"
              placeholder="Select date"
              type="date"
              value={entry.date_achieved}
              onChange={(e) => qualificationHandlers.handleChange(entry.id, "date_achieved", e.target.value)}
              error={(qualificationErrors as StepThreeQualificationErrors)[index]?.date_achieved}
            />
          </Container>
          <Container>
            <Select
              required
              label="Grade/Result"
              placeholder="Enter your grade/result"
              options={GRADE_OPTIONS}
              value={entry.grade}
              onChange={(val) => qualificationHandlers.handleChange(entry.id, "grade", val)}
              error={(qualificationErrors as StepThreeQualificationErrors)[index]?.grade}
            />
          </Container>
        </Container>
      ))}

      <Button
        className="w-full mt-4"
        variant="neutral"
        onClick={qualificationHandlers.handleAdd}
        rightIcon={<AddIcon className="text-primary" />}
      >
        Add qualification
      </Button>

      {/* Emergency Contact */}
      {emergencyContacts.map((entry: EmergencyContactEntry, index: number) => (
        <Container key={entry.id} className="mt-6 border-b border-border pb-6">
          <Container className="flex items-center justify-between mb-5">
            <Text variant="bodyLarge" className="text-primary">
              {index === 0 ? "Emergency Contact" : `Emergency Contact ${index + 1}`}
            </Text>
            {emergencyContacts.length > 1 && (
              <Button
                variant="transparent"
                size="small"
                onClick={() => emergencyHandlers.handleRemove(entry.id)}
                leftIcon={<CloseIcon size={16} className="text-danger-text-icons" />}
              >
                <Text variant="buttonXS" className="text-danger-text-icons">Remove</Text>
              </Button>
            )}
          </Container>
          <Container className="mb-6">
            <Input
              required
              label="Contact Name"
              placeholder="Enter contact name"
              value={entry.contact_name}
              onChange={(e) => emergencyHandlers.handleChange(entry.id, "contact_name", e.target.value)}
              error={(emergencyErrors as StepThreeEmergencyErrors)[index]?.contact_name}
            />
          </Container>
          <Container className="mb-6">
            <Input
              required
              label="Relationship"
              placeholder="What's your relationship"
              value={entry.relationship}
              onChange={(e) => emergencyHandlers.handleChange(entry.id, "relationship", e.target.value)}
              error={(emergencyErrors as StepThreeEmergencyErrors)[index]?.relationship}
            />
          </Container>
          <Container className="mb-6">
            <PhoneInput
              required
              label="Phone Number"
              value={entry.phone}
              onChange={(val) => emergencyHandlers.handleChange(entry.id, "phone", val)}
              error={(emergencyErrors as StepThreeEmergencyErrors)[index]?.phone}
            />
          </Container>
          <Container>
            <Input
              label="Email Address"
              placeholder="example@mail.com"
              type="email"
              value={entry.email}
              onChange={(e) => emergencyHandlers.handleChange(entry.id, "email", e.target.value)}
            />
          </Container>
        </Container>
      ))}

      <Button
        className="w-full mt-4"
        variant="neutral"
        onClick={emergencyHandlers.handleAdd}
        rightIcon={<AddIcon className="text-primary" />}
      >
        Add emergency contact
      </Button>

      {/* Referees */}
      {referees.map((entry: RefereeEntry, index: number) => (
        <Container key={entry.id} className="mt-6 border-b border-border pb-4">
          <Container className="flex items-center justify-between">
            <Text variant="bodyLarge" className="text-primary">
              {index + 1}. Reference
            </Text>
            {referees.length > 1 && (
              <Button
                variant="transparent"
                size="small"
                onClick={() => refereeHandlers.handleRemove(entry.id)}
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
                label="Name"
                placeholder="Enter referee's name"
                value={entry.name}
                onChange={(e) => refereeHandlers.handleChange(entry.id, "name", e.target.value)}
                error={(refereeErrors as StepThreeRefereeErrors)[index]?.name}
              />
            </Container>
            <Container className="mb-6">
              <Input
                required
                label="Company"
                placeholder="Enter referee's company"
                value={entry.company}
                onChange={(e) => refereeHandlers.handleChange(entry.id, "company", e.target.value)}
                error={(refereeErrors as StepThreeRefereeErrors)[index]?.company}
              />
            </Container>
            <Container className="mb-6">
              <Input
                required
                label="Job Title"
                placeholder="Enter job title"
                value={entry.job_title}
                onChange={(e) => refereeHandlers.handleChange(entry.id, "job_title", e.target.value)}
                error={(refereeErrors as StepThreeRefereeErrors)[index]?.job_title}
              />
            </Container>
            <Container className="mb-6">
              <PhoneInput
                required
                label="Phone Number"
                value={entry.phone}
                onChange={(val) => refereeHandlers.handleChange(entry.id, "phone", val)}
                error={(refereeErrors as StepThreeRefereeErrors)[index]?.phone}
              />
            </Container>
            <Container className="mb-6">
              <Input
                required
                label="Email Address"
                placeholder="example@mail.com"
                type="email"
                value={entry.email}
                onChange={(e) => refereeHandlers.handleChange(entry.id, "email", e.target.value)}
                error={(refereeErrors as StepThreeRefereeErrors)[index]?.email}
              />
            </Container>
            <Container className="mb-4">
              <Input
                required
                label="Relationship"
                placeholder="What's your relationship"
                value={entry.relationship}
                onChange={(e) => refereeHandlers.handleChange(entry.id, "relationship", e.target.value)}
                error={(refereeErrors as StepThreeRefereeErrors)[index]?.relationship}
              />
            </Container>
          </Container>
        </Container>
      ))}

      <Button
        className="w-full mt-4"
        variant="neutral"
        onClick={refereeHandlers.handleAdd}
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
