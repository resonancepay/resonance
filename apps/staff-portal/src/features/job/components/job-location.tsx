import { Container, Text } from "@resonance/ui";
import React from "react";
import Image from "next/image";

interface JobLocationProps {
  address?: string;
}

export const JobLocation = ({
  address = "12 Northgate Rd, London EC1",
}: JobLocationProps) => {
  return (
    <Container className="flex items-center gap-2 min-w-0">
      <Image
        width={16}
        height={16}
        src={"/assets/images/Round Pushpin.png"}
        alt="push pin"
        className="shrink-0"
      />
      <Text
        variant="bodyXSmall"
        tone="secondary"
        className="truncate"
        title={address}
      >
        {address}
      </Text>
    </Container>
  );
};
