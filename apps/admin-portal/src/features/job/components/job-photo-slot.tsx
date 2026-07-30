import { Container, Text } from "@resonance/ui";
import { CameraIcon } from "@resonance/ui/icons";

export const JobPhotoSlot = () => {
  return (
    <Container className="bg-brand-secondary-bg-light gap-2 h-36.5 rounded-md py-6 flex items-center flex-col justify-center">
      <CameraIcon size={40} />
      <Text variant="button" tone="primary">
        No picture/video
      </Text>
    </Container>
  );
};
