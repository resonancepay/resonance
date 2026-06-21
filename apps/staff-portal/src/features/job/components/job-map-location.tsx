import { Button, Container, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import Image from "next/image";
import React from "react";

export const JobMapLocation = () => {
  return (
    <Container className="bg-surface border-border border-[0.5px]  rounded-2xl">
      <Container className="h-23 rounded-2xl p-1"></Container>
      <Container className="mt-2 p-2.5 flex items-center justify-between">
        <Container>
          <Container className="flex items-center gap-1">
            <Image
              src={"/assets/images/Round Pushpin.png"}
              alt="pin"
              width={16}
              height={16}
            />
            <Text tone="primary" variant="bodyXSmall">
              Cleaning Location
            </Text>
          </Container>
          <Text variant="bodyXSmall" tone="secondary">
            12 Northgate Rd, London EC1
          </Text>
        </Container>
        <Button
          variant="neutral"
          rightIcon={<NextIcon className="text-primary" size={20} />}
        ></Button>
      </Container>
    </Container>
  );
};
