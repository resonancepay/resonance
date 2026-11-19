import { Button, Container, Modal, Text } from "@resonance/ui";
import { CheckIcon, ClockIcon, InfoIcon } from "@resonance/ui/icons";
import Image from "next/image";

interface AboutToClaimProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  address?: string;
  isPending?: boolean;
}

export const AboutToClaim = ({
  isOpen,
  onClose,
  onConfirm,
  address = "12 Northgate Rd, London EC1",
  isPending,
}: AboutToClaimProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container className="bg-brand-bg-light h-40 flex items-center justify-center">
        <ClockIcon size={112} className="text-brand-bg-bold" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            You are about to claim this job
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
          <Container className="bg-info-bg-light flex items-center px-2.5 py-1.5 rounded-full gap-2">
            <InfoIcon size={16} className="text-info-text-icons" />
            <Text variant="bodyXSmall" tone="info">
              The job will be assigned to you
            </Text>
          </Container>
        </Container>
      </Container>
      <Container className=" border-t-[0.5px] gap-2.5 border-border pt-4 px-2 pb-2 flex">
        <Button
          className="w-full"
          size="regular"
          variant="neutral"
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          rightIcon={<CheckIcon size={20} className="text-inverted" />}
          className="w-full"
          size="regular"
          variant="primary"
          onClick={onConfirm}
          disabled={isPending}
          loading={isPending}
        >
          Claim
        </Button>
      </Container>
    </Modal>
  );
};
