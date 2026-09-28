import { Container, Text } from "@resonance/ui";

export const OpenJobStatus = () => {
  return (
    <Container
      as="span"
      className="rounded-lg px-2 py-1 flex items-center shrink-0 whitespace-nowrap bg-danger-bg-light"
    >
      <Text variant="buttonXS" className="text-danger-text-icons">
        Open for Claim
      </Text>
    </Container>
  );
};
