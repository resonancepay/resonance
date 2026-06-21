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
    <PortalWrapper className="h-full">
      <Row className="h-full pt-18">
        <Col xs={8} className="h-full pb-18">
          <OnboardingSideImageWrapper />
        </Col>
        <Col xs={16} className="h-full overflow-y-auto" ref={scrollRef}>
          <Row justify={"center"}>
            <Col xs={12}>
              {status ? (
                <>
                  {status === "approved" && <OnboardingApproved />}
                  {status === "declined" && <OnboardingDeclined referenceCode={referenceCode} />}
                  {status === "pending" && <OnboardingAttention />}
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
    </PortalWrapper>
  );
};
