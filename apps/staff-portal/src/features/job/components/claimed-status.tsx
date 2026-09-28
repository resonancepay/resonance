import { Container, Text } from "@resonance/ui";

export const ClaimedStatus = () => {
  return (
    <Container
      as="span"
      className="rounded-lg px-2 py-1 flex items-center shrink-0 whitespace-nowrap bg-moss-green-bg-light"
    >
      <Text variant="buttonXS" className="text-moss-green-text-icons">
        Claimed
      </Text>
    </Container>
  );
};
