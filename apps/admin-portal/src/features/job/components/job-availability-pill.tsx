import { Container, Text } from "@resonance/ui";

export const JobAvailabilityPill = ({ label }: { label: string }) => {
  return (
    <Container className="bg-blue-bg-light px-3 py-1 rounded-lg inline-flex items-center w-fit">
      <Text variant="buttonXS" className="text-blue-text-icons">
        {label}
      </Text>
    </Container>
  );
};
