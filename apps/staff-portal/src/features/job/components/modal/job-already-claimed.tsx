import { Button, Container, Modal, Text } from "@resonance/ui";
import { DangerIcon } from "@resonance/ui/icons";

interface JobAlreadyClaimedProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JobAlreadyClaimed = ({
  isOpen,
  onClose,
}: JobAlreadyClaimedProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container className="bg-danger-bg-light h-40 flex items-center justify-center">
        <DangerIcon size={112} className="text-danger-text-icons" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            Opps! Job has been claimed
          </Text>
          <Text variant="bodyXSmall" tone="secondary" className="text-center">
            This job has just been claimed by another cleaner
          </Text>
        </Container>
      </Container>
      <Container className=" border-t-[0.5px] gap-2.5 border-border pt-4 px-2 pb-2 flex">
        <Button
          className="w-full"
          size="regular"
          variant="neutral"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};
