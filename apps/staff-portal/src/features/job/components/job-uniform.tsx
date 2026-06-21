import { Container, Text } from "@resonance/ui";
import Image from "next/image";
import React from "react";

export const JobUniform = () => {
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
        title="Navy uniform, rubber gloves"
      >
        Navy uniform, rubber gloves
      </Text>
    </Container>
  );
};
