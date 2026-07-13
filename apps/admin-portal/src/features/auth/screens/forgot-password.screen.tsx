"use client";

import { Button, Container, Input, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export const ForgotPasswordScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <Container className="mb-5">
        <Text tone="primary" variant="h4">
          Recover your account
        </Text>
        <Text tone="secondary" variant="bodySmall" className="mt-2">
          Enter your email address. We will send you a password reset link.
        </Text>
      </Container>
      <Container
        as="form"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          router.push("/reset-password");
        }}
      >
        <Container className="mb-5">
          <Input
            variant2
            placeholder="example@mail.com"
            label="Email Address"
            required
          />
        </Container>
        <Button
          type="submit"
          className="w-full"
          variant="primary"
          rightIcon={<NextIcon />}
        >
          Confirm Email
        </Button>
      </Container>
    </Container>
  );
};
