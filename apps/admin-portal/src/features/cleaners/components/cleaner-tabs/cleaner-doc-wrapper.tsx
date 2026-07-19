import { DocTypeWrapper } from "@/components/generics/doc-type-wrapper";
import { Container, Text } from "@resonance/ui";
import React from "react";

export const CleanerDocWrapper = () => {
  return (
    <Container className="flex flex-col justify-center">
      <DocTypeWrapper />
      <Container className=" mt-1">
        <Text variant="bodyXSmall" tone="brand">
          right_to.pdf
        </Text>
      </Container>
    </Container>
  );
};
