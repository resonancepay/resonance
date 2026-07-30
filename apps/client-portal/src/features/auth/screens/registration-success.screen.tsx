import React from "react";
import { AuthWrapper } from "../components/wrappers/auth-wrapper";
import { Button, Container, Text } from "@resonance/ui";
import { NextIcon, SuccessIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";

export const RegistrationSuccessScreen = () => {
  const router = useRouter();
  return (
    <AuthWrapper authLabel="" subAuthLabel="">
      <Container className="flex items-center justify-center flex-col">
        <SuccessIcon size={120} className="text-success-text-icons" />
        <Container className="mt-18">
          <Text variant="h3" className="text-primary text-center">
            Account Created <br /> Successfully
          </Text>
          <Text
            variant="bodySmall"
            className="w-4/5 mt-2 mx-auto text-secondary text-center"
          >
            Welcome onboard! You can now log in and start booking cleaning
            services.
          </Text>
        </Container>
        <Container className="w-full mt-6">
          <Button
            rightIcon={<NextIcon />}
            type="submit"
            variant="primary"
            className="w-full"
            onClick={() => {
              router.push("/login");
            }}
          >
            Go to Login
          </Button>
        </Container>
      </Container>
    </AuthWrapper>
  );
};
