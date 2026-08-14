"use client";

import React, { useState } from "react";
import { AuthWrapper } from "../components/wrappers/auth-wrapper";
import { PasswordRequirement } from "../components/pword-requirement";
import { LoginInfo } from "../components/login-info";
import { Button, Container, Input } from "@resonance/ui";
import { EyeOffIcon, EyeOnIcon, TickIcon } from "@resonance/ui/icons";
import { useResetPasswordScreen } from "../hooks/useAuth";

export const ResetPasswordScreen = () => {
  const {
    password,
    passwordError,
    requirements,
    allRequirementsMet,
    handlePasswordChange,
    handleResetPassword,
    isPending,
  } = useResetPasswordScreen();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthWrapper authLabel="Reset your account password">
      <Container as="form" onSubmit={handleResetPassword}>
        <Container className="mb-4">
          <Input
            label="New Password"
            required
            placeholder="Enter your new password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            rightIcon={
              <Container
                as="button"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} className="text-secondary" />
                ) : (
                  <EyeOnIcon size={18} className="text-secondary" />
                )}
              </Container>
            }
          />
        </Container>

        <Container className="flex items-center gap-2 flex-wrap mb-6">
          {requirements.map((req) => (
            <PasswordRequirement
              key={req.label}
              passed={req.passed}
              requirement={req.label}
            />
          ))}
        </Container>

        <Container className="mt-8 w-full">
          <Button
            rightIcon={<TickIcon size={20} />}
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!allRequirementsMet || isPending}
            loading={isPending}
          >
            Save Password
          </Button>
        </Container>
      </Container>

      <Container className="mt-8">
        <LoginInfo />
      </Container>
    </AuthWrapper>
  );
};
