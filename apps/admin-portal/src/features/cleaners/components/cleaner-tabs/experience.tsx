import { Fragment } from "react";
import { Text } from "@resonance/ui";
import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";
import { CleanerExperience } from "../../types/cleaner.type";

interface ExperienceProps {
  experience: CleanerExperience[];
}

export const Experience = ({ experience }: ExperienceProps) => {
  if (experience.length === 0) {
    return (
      <CleanerTabWrapper>
        <InnerCleanerTabWrapper>
          <Text variant="bodySmall" tone="secondary">
            No employment history on record.
          </Text>
        </InnerCleanerTabWrapper>
      </CleanerTabWrapper>
    );
  }

  return (
    <CleanerTabWrapper>
      {experience.map((entry, index) => (
        <Fragment key={index}>
          {index > 0 && <CleanerSectionDivider />}
          <InnerCleanerTabWrapper>
            <DetailSection
              title={index === 0 ? "Experience" : undefined}
              subtitle={
                index === 0
                  ? "See all the cleaner's employment history"
                  : undefined
              }
              fields={[
                { label: "Employer", value: entry.employer },
                { label: "Job Title", value: entry.job_title },
                { label: "Start Date", value: entry.start_date },
                { label: "End Date", value: entry.end_date },
                {
                  label: "Responsibility",
                  value: entry.responsibility,
                  span: 16,
                },
              ]}
            />
          </InnerCleanerTabWrapper>
        </Fragment>
      ))}
    </CleanerTabWrapper>
  );
};
