import { Container, Text } from "@resonance/ui";
import Image from "next/image";
import React from "react";

interface JobUniformProps {
  uniform?: string;
}

export const JobUniform = ({
  uniform = "Navy uniform, rubber gloves",
}: JobUniformProps) => {
  return (
    <Container className={`flex items-center gap-1.5 min-w-0`}>
      <Image
        src={"/assets/images/T Shirt.png"}
        alt="T-shirt"
        width={16}
        height={16}
        className="shrink-0"
      />
      <Text
        variant="bodyXSmall"
        tone="secondary"
        className="truncate"
        title={uniform}
      >
        {uniform}
      </Text>
    </Container>
  );
};
