import { Button, Container, Modal, Text } from "@resonance/ui";
import { CheckIcon, MobilePhoneeIcon, WarningIcon } from "@resonance/ui/icons";
import Image from "next/image";
import React, { useState } from "react";

export const CannotClockOut = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Container className="bg-warning-bg-light h-40 flex items-center justify-center">
        <WarningIcon size={112} className="text-warning-text-icons" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            You can&apos;t clock in just yet!
          </Text>
          <Text variant="bodyXSmall" tone="secondary" className="text-center">
            You must complete the job and fulfil all required criteria to
            complete the job and clock out.
          </Text>
        </Container>
      </Container>
      <Container className=" border-t-[0.5px] gap-2.5 border-border pt-4 px-2 pb-2 flex">
        <Button className="w-full" size="regular" variant="neutral">
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};
