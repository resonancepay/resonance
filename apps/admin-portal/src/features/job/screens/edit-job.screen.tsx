"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { JobFirstStep } from "../components/job-first-step";
import { JobSecondStep } from "../components/job-second-step";
import { JobThirdStep } from "../components/job-third-step";
import { useEditJobScreen } from "../hooks/useEditJobScreen";

export const EditJobScreen = () => {
  const {
    isLoading,
    jobIdLabel,
    step,
    isPublished,
    firstStepValues,
    firstStepErrors,
    siteOptions,
    cleaners,
    timeOptions,
    timezoneOptions,
    checklist,
    checklistError,
    isPending,
    handleChange,
    handleSelectChange,
    handleConsumablesProvidedChange,
    handleContinue,
    assignmentStepValues,
    assignmentStepErrors,
    handleDeadlineDateChange,
    handleDeadlineTimeChange,
    handleEligibleRadiusChange,
    handleAssignedCleanerChange,
    handleConditionsContinue,
    toggleChecklistItem,
    handleSave,
    handleCancel,
  } = useEditJobScreen();

  useSetBreadcrumb([
    { label: "Jobs", href: "/jobs" },
    { label: jobIdLabel ?? "…", href: "/jobs" },
    { label: "Edit Job", href: "#" },
  ]);

  if (isLoading) {
    return (
      <Container>
        <Text variant="bodySmall" tone="secondary">
          Loading job…
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Row justify={"center"}>
        <Col xs={10}>
          {step === "details" && (
            <JobFirstStep
              values={firstStepValues}
              errors={firstStepErrors}
              siteOptions={siteOptions}
              timeOptions={timeOptions}
              timezoneOptions={timezoneOptions}
              heading="Edit job details"
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              onConsumablesProvidedChange={handleConsumablesProvidedChange}
              onCancel={handleCancel}
              onContinue={handleContinue}
            />
          )}
          {step === "conditions" && (
            <JobSecondStep
              lockedType={isPublished ? "publish" : "assign"}
              heading={
                isPublished ? "Edit publish conditions" : "Edit job assignment"
              }
              values={assignmentStepValues}
              errors={assignmentStepErrors}
              cleaners={cleaners}
              onAssignmentTypeChange={() => {}}
              onDeadlineDateChange={handleDeadlineDateChange}
              onDeadlineTimeChange={handleDeadlineTimeChange}
              onEligibleRadiusChange={handleEligibleRadiusChange}
              onAssignedCleanerChange={handleAssignedCleanerChange}
              onCancel={handleCancel}
              onContinue={handleConditionsContinue}
            />
          )}
          {step === "checklist" && (
            <JobThirdStep
              selected={checklist}
              error={checklistError}
              isPending={isPending}
              onToggle={toggleChecklistItem}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
