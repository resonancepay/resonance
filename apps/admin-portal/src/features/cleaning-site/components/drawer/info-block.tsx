import { Container, Text } from "@resonance/ui";

interface InfoBlockProps {
  label: string;
  children: React.ReactNode;
}

export const InfoBlock = ({ label, children }: InfoBlockProps) => (
  <Container className="bg-muted rounded-xl px-3.5 py-3 flex flex-col gap-1">
    <Text variant="bodyXSmall" tone="secondary">
      {label}
    </Text>
    {children}
  </Container>
);
