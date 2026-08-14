"use client";
import { Button, Container, Input, Text } from "@resonance/ui";
import { EyeOffIcon, EyeOnIcon, NextIcon } from "@resonance/ui/icons";
import { AuthWrapper } from "../components/wrappers/auth-wrapper";
import { LoginInfo } from "../components/login-info";
import { useLoginScreen } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const LoginScreen = () => {
  const router = useRouter();
  const {
    step,
    formData,
    errors,
    serverError,
    handleChange,
    handleLogin,
    isPending,
  } = useLoginScreen();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthWrapper
      authLabel={
        step === "email"
          ? "Enter your email to access your cleaning jobs."
          : "Welcome back! Enter your password to continue."
      }
    >
      <Container
        as="form"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {step === "email" && (
          <Container className="mb-4">
            <Input
              label="Email Address"
              required
              placeholder="example@mail.com"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={errors.email}
            />
          </Container>
        )}
        {step === "password" && (
          <Container className="mb-4">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange("password")}
              error={errors.password}
              autoFocus
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
            <Container className="flex justify-center mt-3">
              <Container
                as="button"
                type="button"
                onClick={() => router.push("/forgot-password")}
              >
                <Text variant="button" className="text-brand-secondary-text-icons">
                  Forgot password?
                </Text>
              </Container>
            </Container>
          </Container>
        )}
        {serverError && (
          <Text variant="bodySmall" className="text-danger-text-icons mb-2">
            {serverError}
          </Text>
        )}

        <Container className="mt-8 w-full">
          <Button
            type="button"
            rightIcon={<NextIcon />}
            onClick={handleLogin}
            variant="primary"
            className="w-full"
            disabled={isPending}
            loading={isPending}
          >
            {step === "email" ? "Continue" : "Log In"}
          </Button>
        </Container>
      </Container>

      <Container className="mt-8">
        <LoginInfo />
      </Container>
    </AuthWrapper>
  );
};
