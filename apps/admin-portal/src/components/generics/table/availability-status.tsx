import { Container, Text } from "@resonance/ui";

const AVAILABILITY_CONFIG = {
  available: {
    label: "Available",
    bg: "bg-monostone-bg-light ",
    text: "text-monostone-text-icons",
  },
  off: {
    label: "Off",
    bg: "bg-persian-red-bg-light",
    text: "text-persian-red-text-icons",
  },
  "on-a-job": {
    label: "On a job",
    bg: "bg-blue-bg-light ",
    text: "text-blue-text-icons ",
  },
} as const;

export const AvailabilityStatus = ({
  status,
}: {
  status: keyof typeof AVAILABILITY_CONFIG;
}) => {
  const { label, bg, text } = AVAILABILITY_CONFIG[status];

  return (
    <Container className={`px-2 py-0.5 inline-flex rounded-lg ${bg}`}>
      <Text variant="buttonXS" className={text}>
        {label}
      </Text>
    </Container>
  );
};
