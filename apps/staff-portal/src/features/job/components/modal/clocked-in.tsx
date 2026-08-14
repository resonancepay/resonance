import { Button, Container, Modal, Text } from "@resonance/ui";
import { CheckIcon, SuccessIcon } from "@resonance/ui/icons";

interface ClockedInProps {
  isOpen: boolean;
  onClose: () => void;
  address?: string;
}

export const ClockedIn = ({
  isOpen,
  onClose,
  address = "12 Northgate Rd, London EC1",
}: ClockedInProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container className="bg-success-bg-light h-40 flex items-center justify-center">
        <SuccessIcon size={112} className="text-success-text-icons" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            You have been clocked in
          </Text>
          <Text variant="bodyXSmall" tone="secondary">
            {address}
          </Text>
        </Container>
      </Container>
      <Container className=" border-t-[0.5px] gap-2.5 border-border pt-4 px-2 pb-2 flex">
        <Button
          rightIcon={<CheckIcon size={20} className="text-inverted" />}
          className="w-full"
          size="regular"
          variant="primary"
          onClick={onClose}
        >
          Ok
        </Button>
      </Container>
    </Modal>
  );
};
