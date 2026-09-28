import { Container, Text } from "@resonance/ui";
import { LocationIcon } from "@resonance/ui/icons";

interface JobDistanceProps {
  distance: string;
}

export const JobDistance = ({ distance }: JobDistanceProps) => {
  return (
    <Container className="flex items-center gap-2 shrink-0">
      <LocationIcon size={16} className="text-success-text-icons" />
      <Text
        variant="bodyXSmall"
        className="text-success-text-icons whitespace-nowrap"
      >
        {distance}
      </Text>
    </Container>
  );
};
