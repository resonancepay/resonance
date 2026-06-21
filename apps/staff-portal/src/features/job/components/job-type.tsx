import { Container, Text } from "@resonance/ui";
import Image from "next/image";
import React from "react";

export const JobType = () => {
  return (
    <Container
      as="span"
      className="bg-muted px-2 py-1 rounded-lg inline-flex items-center gap-1 w-fit"
    >
      <Image
        src={"/assets/images/house.png"}
        width={12}
        height={12}
        alt="house"
      />
      <Text variant="buttonXS" tone="primary">
        Office
      </Text>
    </Container>
  );
};
