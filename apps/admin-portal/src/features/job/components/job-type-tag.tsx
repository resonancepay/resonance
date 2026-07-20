import { Container, Text } from "@resonance/ui";
import { CleaningSiteIcon } from "@resonance/ui/icons";

interface JobTypeTagProps {
  label: string;
}

export const JobTypeTag = ({ label }: JobTypeTagProps) => {
  return (
    <Container className="inline-flex items-center gap-1 bg-muted rounded-md px-2 py-1">
      <CleaningSiteIcon size={14} className="text-secondary" />
      <Text variant="bodyXSmall" tone="primary">
        {label}
      </Text>
    </Container>
  );
};
