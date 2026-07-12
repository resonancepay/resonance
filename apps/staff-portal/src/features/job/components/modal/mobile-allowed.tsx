import { Button, Container, Modal, Text } from "@resonance/ui";
import { CheckIcon, MobilePhoneeIcon } from "@resonance/ui/icons";
import Image from "next/image";
import React, { useState } from "react";

export const MobileAllowed = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Container className="bg-info-bg-light h-40 flex items-center justify-center">
        <MobilePhoneeIcon size={112} className="text-info-text-icons" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            Please use a mobile device
          </Text>
          <Text variant="bodyXSmall" tone="secondary" className="text-center">
            This action requires your device&apos;s camera and location
            services. For the best experience, please continue using your phone.
          </Text>
        </Container>
      </Container>
      <Container className=" border-t-[0.5px] gap-2.5 border-border pt-4 px-2 pb-2 flex">
        <Button
          rightIcon={<CheckIcon size={20} className="text-inverted" />}
          className="w-full"
          size="regular"
          variant="primary"
        >
          Got it!
        </Button>
      </Container>
    </Modal>
  );
};
