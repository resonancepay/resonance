"use client";
import { Button, Container, Input, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";
import { useLoginScreen } from "../hooks/useAuth";

export const LoginScreen = () => {
  const router = useRouter();
  const { formData, errors, handleChange, handleLogin, isPending } =
    useLoginScreen();

  return (
    <Container>
      <Container className="mb-5">
        <Text tone="primary" variant="h4">
          Welcome back! 😎
        </Text>
      </Container>
      <Container as="form" onSubmit={handleLogin}>
        <Container className="mb-4">
          <Input
            variant2
            placeholder="example@mail.com"
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
          />
        </Container>
        <Container className="mb-5">
          <Input
            variant2
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
          />
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
        <Button
          type="submit"
          className="w-full"
          variant="primary"
          rightIcon={<NextIcon />}
          disabled={isPending}
          loading={isPending}
        >
          Login
        </Button>
      </Container>
    </Container>
  );
};
