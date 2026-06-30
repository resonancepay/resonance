"use client";
import { PortalWrapper } from "@/shared/ui/portal-wrapper";
import { Col, Row } from "antd";
import { OnboardingSideImageWrapper } from "../components/onboarding-side-image-wrapper";
import { OnboardingSteps } from "../components/onbarding-steps";
import { useEffect, useRef, useState } from "react";
import { Container } from "@resonance/ui";
import { StepOne } from "../components/steps/step-one";
import { StepTwo } from "../components/steps/step-two";
import { StepThree } from "../components/steps/step-three";
import { StepFour } from "../components/steps/step-four";
import { OnboardingApproved } from "../components/onboarding-approved";
import { OnboardingDeclined } from "../components/onboarding-declined";
import { OnboardingAttention } from "../components/onboarding-attention";
import { OnboardingSubmitted } from "../components/onboarding-submitted";
import { useOnboardingScreen } from "../hooks/useOnboarding";

export const OnboardingScreen = () => {
  const {
    activeStep,
    setActiveStep,
    scrollRef,
    referenceCode,
    status,
    setReferenceCode,
    setStatus,
  } = useOnboardingScreen();

  return (
    <Row className="pt-18">
      <Col
        lg={8}
        xs={24}
        className="lg:h-[calc(100vh-208px)] lg:sticky lg:self-start lg:pr-4 mb-6 lg:mb-0"
      >
        <OnboardingSideImageWrapper />
      </Col>
      <Col xs={24} lg={16} className="pb-18" ref={scrollRef}>
        <Row justify={"center"}>
          <Col xs={24} lg={12}>
            {status ? (
              <>
                {status === "approved" && <OnboardingApproved />}
                {status === "declined" && (
                  <OnboardingDeclined referenceCode={referenceCode} />
                )}
                {status === "pending" && (
                  <OnboardingSubmitted referenceCode={referenceCode} />
                )}
                {status === "submitted" && (
                  <OnboardingSubmitted referenceCode={referenceCode} />
                )}
              </>
            ) : (
              <>
                <OnboardingSteps activeState={activeStep} />
                <Container>
                  {activeStep === 1 && (
                    <StepOne onSuccess={() => setActiveStep(2)} />
                  )}
                  {activeStep === 2 && (
                    <StepTwo onSuccess={() => setActiveStep(3)} />
                  )}
                  {activeStep === 3 && (
                    <StepThree onSuccess={() => setActiveStep(4)} />
                  )}
                  {activeStep === 4 && (
                    <StepFour
                      onSuccess={(code) => {
                        setReferenceCode(code);
                        setStatus("submitted");
                      }}
                    />
                  )}
                </Container>
              </>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
