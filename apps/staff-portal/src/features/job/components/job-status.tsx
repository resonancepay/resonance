import { Container, Text } from "@resonance/ui";
import {
  InactiveIcon,
  InProgressIcon,
  PendingIcon,
  SuccessIcon,
} from "@resonance/ui/icons";
import { JobType } from "../types/job.types";

export const JobStatus = ({ status }: { status: JobType }) => {
  return (
    <Container
      as="span"
      className={`rounded-lg px-2 py-1 flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
        status === "pending"
          ? "bg-warning-bg-light"
          : status === "in-progress"
            ? "bg-blue-bg-light"
            : status === "under-review"
              ? "bg-yinmn-blue-bg-light"
              : status === "paid"
                ? "bg-success-bg-light"
                : "bg-purple-bg-light"
      }`}
    >
      {status === "pending" ? (
        <PendingIcon className="text-warning-text-icons" size={20} />
      ) : status === "in-progress" ? (
        <InProgressIcon className="text-blue-text-icons" size={20} />
      ) : status === "under-review" ? (
        <InactiveIcon className="text-yinmn-blue-text-icons" size={20} />
      ) : status === "paid" ? (
        <SuccessIcon className="text-success-text-icons" size={20} />
      ) : (
        ""
      )}
      <Text
        variant="buttonXS"
        className={`${
          status === "pending"
            ? "text-warning-text-icons"
            : status === "in-progress"
              ? "text-blue-text-icons"
              : status === "under-review"
                ? "text-yinmn-blue-text-icons"
                : status === "paid"
                  ? "text-success-text-icons"
                  : "text-purple-text-icons"
        }`}
      >
        {status === "pending"
          ? "Pending"
          : status === "in-progress"
            ? "In-progress"
            : status === "under-review"
              ? "Under Review"
              : status === "paid"
                ? "Paid"
                : "Scheduled"}
      </Text>
    </Container>
  );
};
