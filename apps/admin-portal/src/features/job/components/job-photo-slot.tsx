import { Container, Text } from "@resonance/ui";
import { CameraIcon } from "@resonance/ui/icons";

interface JobPhotoSlotProps {
  src?: string;
}

export const JobPhotoSlot = ({ src }: JobPhotoSlotProps) => {
  if (src) {
    return (
      <Container className="relative h-36.5 rounded-md overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
        />
      </Container>
    );
  }

  return (
    <Container className="bg-brand-secondary-bg-light gap-2 h-36.5 rounded-md py-6 flex items-center flex-col justify-center">
      <CameraIcon size={40} />
      <Text variant="button" tone="primary">
        No picture/video
      </Text>
    </Container>
  );
};
