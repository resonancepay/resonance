import { Container, Text } from "@resonance/ui";

interface JobIdProps {
  jobId: string;
}

export const JobId = ({ jobId }: JobIdProps) => {
  return (
    <Container
      as="span"
      className="bg-muted px-2 py-1 rounded-lg inline-flex items-center w-fit"
    >
      <Text variant="buttonXS" tone="primary">
        {jobId}
      </Text>
    </Container>
  );
};
