import { Button, Container, Modal, Text } from "@resonance/ui";
import { CheckIcon, SuccessIcon } from "@resonance/ui/icons";

interface JobClaimedProps {
  isOpen: boolean;
  onClose: () => void;
}

// Same scattered-square confetti pattern used on the auth success screens
// (e.g. client-portal's success-confirmation.screen.tsx) — plain Tailwind
// utility boxes, no animation library.
const CONFETTI_PIECES = [
  "top-2 left-6 bg-warning-bg-bold rotate-12",
  "top-6 left-24 bg-moss-green-bg-bold -rotate-12",
  "top-3 right-20 bg-pink-bg-bold rotate-45",
  "top-10 right-6 bg-blue-bg-bold -rotate-6",
  "bottom-4 left-10 bg-purple-bg-bold rotate-12",
  "bottom-6 right-16 bg-yinmn-blue-bg-bold -rotate-45",
  "bottom-2 left-28 bg-warning-bg-bold rotate-6",
];

export const JobClaimed = ({ isOpen, onClose }: JobClaimedProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container className="bg-success-bg-light h-40 flex items-center justify-center relative overflow-hidden">
        {CONFETTI_PIECES.map((piece, index) => (
          <Container
            key={index}
            className={`absolute size-2.5 rounded-xs ${piece}`}
          />
        ))}
        <SuccessIcon size={112} className="text-success-text-icons" />
      </Container>
      <Container className="py-2.5 my-2">
        <Container className="mt-3 flex flex-col gap-3 items-center justify-center">
          <Text variant="h5" tone="primary" className="text-center">
            Congratulations!
          </Text>
          <Text variant="bodyXSmall" tone="secondary">
            You have successfully claimed this job
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
