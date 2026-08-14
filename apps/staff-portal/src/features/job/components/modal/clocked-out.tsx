import { Button, Container, Modal, Text } from "@resonance/ui";
import { SuccessIcon } from "@resonance/ui/icons";

interface ClockedOutProps {
  isOpen: boolean;
  onClose: () => void;
  onSeeOtherJobs: () => void;
}

export const ClockedOut = ({
  isOpen,
  onClose,
  onSeeOtherJobs,
}: ClockedOutProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container className="bg-success-bg-light h-40 flex items-center justify-center">
        <SuccessIcon size={112} className="text-success-text-icons" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            You’ve clocked out!
          </Text>
          <Text variant="bodyXSmall" tone="secondary">
            Well done on the job done, we will be reviewing the job immediately.
          </Text>
        </Container>
      </Container>
      <Container className=" border-t-[0.5px] gap-2.5 border-border pt-4 px-2 pb-2 flex">
        <Button variant="neutral" className="w-full" onClick={onClose}>
          Ok
        </Button>
        <Button
          className="w-full"
          size="regular"
          variant="primary"
          onClick={onSeeOtherJobs}
        >
          See other jobs
        </Button>
      </Container>
    </Modal>
  );
};
