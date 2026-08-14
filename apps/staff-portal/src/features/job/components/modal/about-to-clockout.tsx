import { Button, Container, Modal, Text } from "@resonance/ui";
import { ClockIcon, WarningIcon } from "@resonance/ui/icons";
import Image from "next/image";

interface AboutToClockOutProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  address?: string;
}

export const AboutToClockOut = ({
  isOpen,
  onClose,
  onConfirm,
  address = "12 Northgate Rd, London EC1",
}: AboutToClockOutProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container className="bg-brand-bg-light h-40 flex items-center justify-center">
        <ClockIcon size={112} className="text-brand-bg-bold" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mx-6  bg-warning-bg-light flex items-center px-2.5 py-1.5 rounded-full gap-2">
          <WarningIcon size={16} className="text-warning-text-icons" />
          <Text variant="bodyXSmall" tone="warning">
            You must be within 200 m of the site to clock in
          </Text>
        </Container>
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            You are about to clock out?
          </Text>
          <Container className="flex items-center gap-2">
            <Image
              width={16}
              height={16}
              alt="pin"
              src="/assets/images/Round Pushpin.png"
            />
            <Text variant="bodyXSmall" tone="secondary">
              {address}
            </Text>
          </Container>
        </Container>
      </Container>
      <Container className=" border-t-[0.5px] gap-2.5 border-border pt-4 px-2 pb-2 flex">
        <Button className="w-full" size="regular" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button className="w-full" size="regular" variant="primary" onClick={onConfirm}>
          Clock out
        </Button>
      </Container>
    </Modal>
  );
};
