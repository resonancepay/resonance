import { Container, Text } from "@resonance/ui";
import { ScoreIcon } from "@resonance/ui/icons";

export const JobQualityScore = () => {
  return (
    <Container className="rounded-xl px-3 py-2.5 bg-brand-bg-light relative overflow-hidden">
      <Text variant="bodyXSmall" tone="secondary">
        Job Quality Score
      </Text>
      <Text tone="primary" variant="h3">
        98/100
      </Text>
      <Container>
        <ScoreIcon
          className="text-brand-text-icons opacity-50 absolute -top-5 right-10"
          size={40}
          style={{ transform: "rotate(26deg)" }}
        />
        <ScoreIcon
          className="text-brand-text-icons absolute top-0 -right-2"
          size={40}
          style={{ transform: "rotate(26deg)" }}
        />
        <ScoreIcon
          className="text-brand-text-icons opacity-50 -bottom-3 right-0 absolute"
          size={40}
          style={{ transform: "rotate(26deg)" }}
        />
      </Container>
    </Container>
  );
};
