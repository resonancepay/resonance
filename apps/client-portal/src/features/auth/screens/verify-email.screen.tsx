"use client";

import React from "react";
import { AuthWrapper } from "../components/wrappers/auth-wrapper";
import { Button, Container, OtpInput, Text } from "@resonance/ui";
import Image from "next/image";
import { TickIcon } from "@resonance/ui/icons";
import { useVerifyEmailScreen } from "../hooks/useAuth";

export const VerifyEmailScreen = () => {
  const {
    email,
    otp,
    setOtp,
    otpError,
    handleVerifyEmail,
    handleResendOtp,
    handleBack,
    isVerifying,
    isResending,
    resendCountdown,
  } = useVerifyEmailScreen();

  return (
    <AuthWrapper
      authLabel="Verify your email address"
      onBack={handleBack}
      subAuthLabel={
        <>
          Enter the 6-digit code sent to your email address{" "}
          <Text
            as="span"
            variant="bodySmall"
            className="text-brand-secondary-text-icons"
          >
            {email}
          </Text>
        </>
      }
    >
      <Container as="form" onSubmit={handleVerifyEmail}>
        <Container className="flex justify-center">
          <Image
            src="/assets/svgs/message-sent.svg"
            alt=""
            width={200}
            height={200}
          />
        </Container>
        <Container>
          <OtpInput
            value={otp}
            onChange={setOtp}
            error={otpError}
            disabled={isVerifying}
          />
        </Container>
        <Container className="mt-8">
          <Button
            rightIcon={<TickIcon size={20} />}
            type="submit"
            variant="primary"
            className="w-full"
            disabled={otp.length < 6 || isVerifying}
            loading={isVerifying}
          >
            Verify Account
          </Button>
        </Container>
        <Container className="mt-6">
          <Text className="text-center text-primary" variant="bodySmall">
            Yet to receive the code?{"  "}
            <Container as="span">
              {resendCountdown > 0 ? (
                <Text
                  as="span"
                  variant="button"
                  className="text-tertiary"
                >
                  Resend in {resendCountdown}s
                </Text>
              ) : (
                <Container
                  as="button"
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                >
                  <Text
                    variant="button"
                    className="text-brand-tertiary-text-icons"
                  >
                    {isResending ? "Resending..." : "Resend code"}
                  </Text>
                </Container>
              )}
            </Container>
          </Text>
        </Container>
      </Container>
    </AuthWrapper>
  );
};
