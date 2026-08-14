import { Container, Text } from "@resonance/ui";
import React from "react";

interface JobAvailabilityProps {
  provided?: boolean;
}

export const JobAvailability = ({ provided = true }: JobAvailabilityProps) => {
  return (
    <Container className="bg-blue-100 px-3 py-1 rounded-lg inline-flex items-center w-fit">
      <Text variant="buttonXS" className="text-blue-500 font-semibold">
        {provided ? "Provided" : "Not Provided"}
      </Text>
    </Container>
  );
};
