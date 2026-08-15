import { Button, Container, Text } from "@resonance/ui";
import { CheckIcon, JobIcon2 } from "@resonance/ui/icons";

interface JobControlProps {
  status: string;
  hasRated: boolean;
  onReview: () => void;
  onViewRating: () => void;
}

// Always visible. A client can only review a job while it's under review,
// but as soon as a rating exists — even before the job is later approved —
// the button switches to "View Rating" instead of staying on "Review Job".
export const JobControl = ({
  status,
  hasRated,
  onReview,
  onViewRating,
}: JobControlProps) => {
  const isUnderReview = status === "under-review";
  const canReview = isUnderReview && !hasRated;
  const canViewRating = hasRated;

  return (
    <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
      <Container className="flex items-center gap-1.5 mb-3">
        <JobIcon2 className="text-secondary" size={16} />
        <Text variant="bodySmall" tone="secondary">
          Job control
        </Text>
      </Container>

      {canViewRating ? (
        <Button
          className="w-full"
          variant="primary"
          rightIcon={<CheckIcon size={16} className="text-inverted" />}
          onClick={onViewRating}
        >
          View Rating
        </Button>
      ) : (
        <Button
          className="w-full"
          variant="primary"
          rightIcon={canReview ? <CheckIcon size={16} className="text-inverted" /> : <CheckIcon size={16} />}
          disabled={!canReview}
          onClick={onReview}
        >
          Review Job
        </Button>
      )}
    </Container>
  );
};
