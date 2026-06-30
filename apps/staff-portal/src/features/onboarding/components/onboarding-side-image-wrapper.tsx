import { Container, Text } from "@resonance/ui";
import React from "react";
import Image from "next/image";

export const OnboardingSideImageWrapper = () => {
  return (
    <Container className="relative h-full w-full overflow-hidden  bg-brand-secondary-bg-light rounded-2xl">
      {/* Gradient overlay — uses token so it flips with dark/light mode */}
      <Container className="absolute top-0 right-0 bottom-0 left-0 h-full">
        <Image
          fill
          className="object-cover"
          src={"/assets/images/Frame\ 2087326797.png"}
          alt=""
        />
      </Container>
      <Container className="absolute inset-0 bg-brand-secondary-bg-light/80" />
      {/* Content sits above the overlay */}
      <Container className="relative z-10 lg:pt-16 lg:px-10 p-4">
        <Text className="text-primary" variant="h2">
          One More Step Before Jobs Start Rolling In
        </Text>
        <Text className="text-primary mt-8" variant="bodyRegular">
          Submit your application for review and, once approved, you&apos;ll be
          eligible to receive cleaning job assignments.
        </Text>
      </Container>
    </Container>
  );
};
