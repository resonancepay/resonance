import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";

export const JobRecord = () => {
  return (
    <Container className="pb-2 border-b-[0.5px] border-border">
      <Container className="flex items-center justify-between mb-1.5 cursor-pointer">
        <Text className="text-primary">Job Records</Text>
        <ChevronDownIcon className="text-primary" />
      </Container>

      <Container className="bg-surface p-3.5 rounded-xl border-[0.5px] border-border">
        <Container className="pb-1.5 flex items-center justify-between border-b-[0.5px] border-border">
          <Text variant="bodyXSmall" tone="secondary">
            Total Assigned Jobs:
          </Text>
          <Text variant="bodyXSmall" tone="primary">
            100
          </Text>
        </Container>
        <Container className="pb-1.5 flex items-center justify-between border-b-[0.5px] border-border">
          <Text variant="bodyXSmall" tone="secondary">
            Completed Jobs:
          </Text>
          <Text variant="bodyXSmall" tone="primary">
            100
          </Text>
        </Container>
        <Container className="pb-1.5 flex items-center justify-between">
          <Text variant="bodyXSmall" tone="secondary">
            Released Jobs:
          </Text>
          <Text variant="bodyXSmall" tone="primary">
            100
          </Text>
        </Container>
      </Container>
    </Container>
  );
};
