import { Container, Text } from "@resonance/ui";
import { CameraIcon } from "@resonance/ui/icons";

interface JobPhotoViewProps {
  imageUrl?: string;
}

// Read-only tile — clients view photos the cleaner submitted; there's no
// upload/take-picture affordance here.
export const JobPhotoView = ({ imageUrl }: JobPhotoViewProps) => {
  return (
    <Container className="relative bg-brand-secondary-bg-light gap-2 border border-dashed border-brand-secondary-border h-36.5 rounded-md py-6 flex items-center flex-col justify-center overflow-hidden">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Submitted job photo"
        />
      ) : (
        <>
          <CameraIcon size={48} />
          <Text variant="bodyXSmall" tone="secondary">
            No photo submitted
          </Text>
        </>
      )}
    </Container>
  );
};
