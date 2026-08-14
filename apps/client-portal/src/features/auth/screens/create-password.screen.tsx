"use client";

import React, { useState } from "react";
import { AuthWrapper } from "../components/wrappers/auth-wrapper";
import { PasswordRequirement } from "../components/pword-requirement";
import { TermsPolicy } from "../components/terms-policy";
import { Button, Container, Input, Text } from "@resonance/ui";
import { EyeOffIcon, EyeOnIcon, NextIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";
import { useCreatePasswordScreen } from "../hooks/useAuth";

export const CreatePasswordScreen = () => {
  const router = useRouter();
  const {
    password,
    passwordError,
    agreedToTerms,
    setAgreedToTerms,
    requirements,
    allRequirementsMet,
    handlePasswordChange,
    handleCreatePassword,
    isPending,
  } = useCreatePasswordScreen();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthWrapper authLabel="Choose a secure password to access your account.">
      <Container as="form" onSubmit={handleCreatePassword}>
        <Container className="mb-4">
          <Input
            label="Password"
            required
            placeholder="Enter your password"
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

        <TermsPolicy checked={agreedToTerms} onChange={setAgreedToTerms} />

        <Container className="mt-8 w-full">
          <Button
            rightIcon={<NextIcon />}
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!agreedToTerms || !allRequirementsMet || isPending}
            loading={isPending}
          >
            Create Access
          </Button>
        </Container>

        <Container className="mt-6">
          <Text className="text-center text-primary" variant="bodySmall">
            Already have an account?{"  "}
            <Container as="span">
              <Container
                as="button"
                type="button"
                onClick={() => router.push("/login")}
              >
                <Text
                  variant="button"
                  className="text-brand-secondary-text-icons"
                >
                  Log In
                </Text>
              </Container>
            </Container>
          </Text>
        </Container>
      </Container>
    </AuthWrapper>
  );
};
