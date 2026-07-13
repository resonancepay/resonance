"use client";

import { Button, Container, Input, Text } from "@resonance/ui";
import { CloseIcon, TickIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const passwordRequirements = [
  { label: "Uppercase", passed: false },
  { label: "Lowercase", passed: true },
  { label: "Number", passed: true },
  { label: "Special character", passed: true },
  { label: "6 characters", passed: true },
];

export const ResetPasswordScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <Container className="mb-5">
        <Text tone="primary" variant="h4">
          Reset your account password
        </Text>
        <Text tone="secondary" variant="bodySmall" className="mt-2">
          Enter your email address. We will send you a password reset link.
        </Text>
      </Container>
      <Container
        as="form"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          router.push("/reset-success");
        }}
      >
        <Container className="mb-4">
          <Input
            variant2
            placeholder="Enter your new password"
            label="New Password"
            type="password"
            required
          />
        </Container>
        <Container className="mb-5 flex items-center gap-2 flex-wrap">
          {passwordRequirements.map((requirement) => (
            <Container
              key={requirement.label}
              as="span"
              className={[
                "flex items-center border px-2 py-1 rounded-4xl gap-2",
                requirement.passed
                  ? "bg-brand-tertiary-bg-light border-brand-tertiary-border"
                  : "bg-muted border-border",
              ].join(" ")}
            >
              <Text
                variant="bodyXSmall"
                className={
                  requirement.passed ? "text-primary" : "text-secondary"
                }
              >
                {requirement.label}
              </Text>
              {requirement.passed ? (
                <TickIcon size={12} className="text-primary" />
              ) : (
                <CloseIcon size={12} className="text-secondary" />
              )}
            </Container>
          ))}
        </Container>
        <Button
          type="submit"
          className="w-full"
          variant="primary"
          rightIcon={<TickIcon size={20} />}
        >
          Save Password
        </Button>
      </Container>
    </Container>
  );
};
