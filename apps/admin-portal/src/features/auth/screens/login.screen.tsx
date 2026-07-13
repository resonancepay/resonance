"use client";
import { Button, Container, Input, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";

export const LoginScreen = () => {
  const router = useRouter();
  return (
    <Container>
      <Container className="mb-5">
        <Text tone="primary" variant="h4">
          Welcome back! 😎
        </Text>
      </Container>
      <Container as="form">
        <Container className="mb-4">
          <Input
            variant2
            placeholder="example@mail.com"
            label="Email Address"
            required
          />
        </Container>
        <Container className="mb-5">
          <Input variant2 label="Password" type="password" required />
          <Container className="text-right mt-3.5 flex justify-end">
            <Container
              as="button"
              type="button"
              onClick={() => {
                router.push("/forgot-password");
              }}
            >
              <Text variant="button" className="text-brand-tertiary-text-icons">
                Forgot password
              </Text>
            </Container>
          </Container>
        </Container>
        <Button className="w-full" variant="primary" rightIcon={<NextIcon />}>
          Login
        </Button>
      </Container>
    </Container>
  );
};
