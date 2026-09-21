"use client";

import { Button, Container, Text } from "@resonance/ui";
import { DateIcon, EditIcon } from "@resonance/ui/icons";
import { AvailabilityEntry } from "@/features/auth/types/auth.type";
import { EmptyState } from "./empty-state";
import { DAY_OPTIONS } from "./modal/setup-availability-modal";

const formatTime12h = (time: string) => {
  const [hoursStr, minutes] = time.split(":");
  const hours = Number(hoursStr);
  if (Number.isNaN(hours)) return time;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${String(displayHours).padStart(2, "0")}:${minutes} ${period}`;
};

interface AvailabilityBannerProps {
  availability: AvailabilityEntry[];
  onEditClick: () => void;
}

export const AvailabilityBanner = ({
  availability,
  onEditClick,
}: AvailabilityBannerProps) => {
  return (
    <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
      <Container className="mb-4 flex items-center justify-between">
        <Text variant="h5" tone="primary">
          Availability
        </Text>
        <Button
          leftIcon={<EditIcon className="text-primary" size={16} />}
          size="small"
          variant="neutral"
          onClick={onEditClick}
        >
          Edit
        </Button>
      </Container>
      <Container>
        {availability.length === 0 ? (
          <EmptyState
            icon={<DateIcon className="text-secondary" />}
            text="No availabity set!"
          />
        ) : (
          <Container className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap">
            {availability.map((entry, index) => (
              <Container
                key={`${entry.day}-${index}`}
                className="bg-brand-tertiary-bg-light border rounded-xl py-1 px-2.5 border-brand-tertiary-border"
              >
                <Text variant="bodySmall" tone="primary">
                  {DAY_OPTIONS.find((option) => option.value === entry.day)?.label ?? entry.day}
                </Text>
                <Text variant="bodyXSmall" tone="secondary">
                  {formatTime12h(entry.start_time)} - {formatTime12h(entry.end_time)}
                </Text>
              </Container>
            ))}
          </Container>
        )}
      </Container>
    </Container>
  );
};
