import { Container, Text } from "@resonance/ui";
import { JobIcon2 } from "@resonance/ui/icons";

interface JobEmptyStateProps {
  title: string;
  description: string;
}

export const JobEmptyState = ({ title, description }: JobEmptyStateProps) => {
  return (
    <Container className="mt-7 bg-surface border-[0.5px] border-border rounded-2xl px-6 py-14 flex flex-col items-center text-center gap-3">
      <Container className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
        <JobIcon2 size={28} className="text-secondary" />
      </Container>
      <Container>
        <Text variant="h5" tone="primary" className="mb-1">
          {title}
        </Text>
        <Text variant="bodySmall" tone="secondary">
          {description}
        </Text>
      </Container>
    </Container>
  );
};
