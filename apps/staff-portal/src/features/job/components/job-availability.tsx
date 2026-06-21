import { Container, Text } from "@resonance/ui";
import React from "react";

export const JobAvailability = () => {
  return (
    <Container className="bg-blue-100 px-3 py-1 rounded-lg inline-flex items-center w-fit">
      <Text variant="buttonXS" className="text-blue-500 font-semibold">
        Provided
      </Text>
    </Container>
  );
};
