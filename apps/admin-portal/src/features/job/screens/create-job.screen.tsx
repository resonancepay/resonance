"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container } from "@resonance/ui";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JobFirstStep, JobFirstStepValues } from "../components/job-first-step";
import { JobSecondStep } from "../components/job-second-step";

export const CreateJobScreen = () => {
  useSetBreadcrumb([
    { label: "Jobs", href: "/jobs" },
    { label: "Create Job", href: "/jobs/create" },
  ]);

  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [firstStepValues, setFirstStepValues] = useState<JobFirstStepValues | null>(
    null,
  );

  return (
    <Container>
      <Row justify={"center"}>
        <Col xs={10}>
          {step === 1 && (
            <JobFirstStep
              onCancel={() => router.push("/jobs")}
              onContinue={(values) => {
                setFirstStepValues(values);
                setStep(2);
              }}
            />
          )}
          {step === 2 && firstStepValues && (
            <JobSecondStep
              onCancel={() => router.push("/jobs")}
              onSave={() => router.push("/jobs")}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};
