"use client";

import { AuthWrapper } from "../components/wrappers/auth-wrapper";
import { Button, Container, Text } from "@resonance/ui";
import { NextIcon, SuccessIcon } from "@resonance/ui/icons";
import { useRouter } from "next/navigation";

const confettiPieces = [
  "top-0 left-6 bg-warning-bg-bold rotate-12",
  "top-4 left-24 bg-moss-green-bg-bold -rotate-12",
  "top-2 left-44 bg-pink-bg-bold rotate-45",
  "top-10 left-64 bg-blue-bg-bold -rotate-6",
  "top-0 right-20 bg-purple-bg-bold rotate-12",
  "top-14 right-4 bg-persian-red-bg-bold -rotate-12",
  "top-24 left-2 bg-blue-bg-bold rotate-6",
  "top-28 left-36 bg-yinmn-blue-bg-bold -rotate-45",
  "top-20 right-40 bg-pink-bg-bold rotate-12",
  "top-32 right-10 bg-moss-green-bg-bold rotate-45",
];

export const SuccessConfirmationScreen = () => {
  const router = useRouter();

  return (
    <AuthWrapper authLabel="" subAuthLabel="">
      <Container className="relative flex items-center justify-center flex-col overflow-hidden">
        {confettiPieces.map((piece, index) => (
          <Container
            key={index}
            className={`absolute size-2.5 rounded-xs ${piece}`}
          />
        ))}

        <SuccessIcon size={110} className="text-success-text-icons" />

        <Container className="mt-8 text-center">
          <Text variant="h3" tone="primary">
            You&apos;re All Set!
          </Text>
          <Text
            variant="bodySmall"
            tone="secondary"
            className="mt-2 mx-auto w-4/5 text-center"
          >
            Your account has been created successfully. You can now view your
            completed jobs and leave feedback.
          </Text>
        </Container>

        <Container className="w-full mt-6">
          <Button
            rightIcon={<NextIcon />}
            variant="primary"
            className="w-full"
            onClick={() => router.push("/dashboard")}
          >
            Get Started
          </Button>
        </Container>
      </Container>
    </AuthWrapper>
  );
};
