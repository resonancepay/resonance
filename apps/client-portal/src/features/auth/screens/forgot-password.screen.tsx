"use client";

import React from "react";
import { AuthWrapper } from "../components/wrappers/auth-wrapper";
import { Button, Container, Input } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import { LoginInfo } from "../components/login-info";
import { useForgotPasswordScreen } from "../hooks/useAuth";

export const ForgotPasswordScreen = () => {
  const { email, emailError, handleEmailChange, handleForgotPassword, isPending } =
    useForgotPasswordScreen();

  return (
    <AuthWrapper
      authLabel="Recover your account"
      subAuthLabel="Enter your email address. We will send you a password reset link."
    >
      <Container as="form" onSubmit={handleForgotPassword}>
        <Container className="mb-4">
          <Input
            label="Email Address"
            required
            placeholder="example@mail.com"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
          />
        </Container>

        <Container className="mt-8 w-full">
          <Button
            rightIcon={<NextIcon />}
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isPending}
            loading={isPending}
          >
            Confirm Email
          </Button>
        </Container>
      </Container>

      <Container className="mt-8">
        <LoginInfo />
      </Container>
    </AuthWrapper>
  );
};
