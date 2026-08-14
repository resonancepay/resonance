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

// The API's real availability values aren't confirmed to match the three
// keys above, and casing differs (e.g. "Available" vs "available") — this
// takes a plain string, normalizes casing before the lookup, and falls
// back to displaying it as-is instead of throwing when it still doesn't
// match a known status.
export const AvailabilityStatus = ({ status }: { status: string }) => {
  const normalized = status.toLowerCase() as keyof typeof AVAILABILITY_CONFIG;
  const config = AVAILABILITY_CONFIG[normalized];

  if (!config) {
    return (
      <Container className="px-2 py-0.5 inline-flex rounded-lg bg-muted">
        <Text variant="buttonXS" tone="secondary">
          {status}
        </Text>
      </Container>
    );
  }

  return (
    <Container className={`px-2 py-0.5 inline-flex rounded-lg ${config.bg}`}>
      <Text variant="buttonXS" className={config.text}>
        {config.label}
      </Text>
    </Container>
  );
};
