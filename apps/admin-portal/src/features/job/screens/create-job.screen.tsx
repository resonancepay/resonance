"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";
import { Col, Row } from "antd";
import { JobFirstStep } from "../components/job-first-step";
import { JobSecondStep } from "../components/job-second-step";
import { useCreateJobScreen } from "../hooks/useCreateJobScreen";

export const CreateJobScreen = () => {
  useSetBreadcrumb([
    { label: "Jobs", href: "/jobs" },
    { label: "Create Job", href: "/jobs/create" },
  ]);

  const {
    step,
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
    toggleChecklistItem,
    handleSave,
    handleCancel,
  } = useCreateJobScreen();

  return (
    <Container>
      <Row justify={"center"}>
        <Col xs={10}>
          {step === 1 && (
            <JobFirstStep
              values={firstStepValues}
              errors={firstStepErrors}
              siteOptions={siteOptions}
              cleaners={cleaners}
              timeOptions={timeOptions}
              timezoneOptions={timezoneOptions}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              onConsumablesProvidedChange={handleConsumablesProvidedChange}
              onCancel={handleCancel}
              onContinue={handleContinue}
            />
          )}
          {step === 2 && (
            <JobSecondStep
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
