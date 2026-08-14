import { Fragment } from "react";
import { Text } from "@resonance/ui";
import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";
import { CleanerQualification } from "../../types/cleaner.type";

interface QualificationProps {
  qualifications: CleanerQualification[];
}

export const Qualification = ({ qualifications }: QualificationProps) => {
  if (qualifications.length === 0) {
    return (
      <CleanerTabWrapper>
        <InnerCleanerTabWrapper>
          <Text variant="bodySmall" tone="secondary">
            No qualifications on record.
          </Text>
        </InnerCleanerTabWrapper>
      </CleanerTabWrapper>
    );
  }

  return (
    <CleanerTabWrapper>
      {qualifications.map((entry, index) => (
        <Fragment key={index}>
          {index > 0 && <CleanerSectionDivider />}
          <InnerCleanerTabWrapper>
            <DetailSection
              title={index === 0 ? "Qualification" : undefined}
              subtitle={
                index === 0
                  ? "See all the cleaner's education level"
                  : undefined
              }
              fields={[
                {
                  label: "Qualification Title",
                  value: entry.qualification_title,
                },
                { label: "Institute", value: entry.institute },
                { label: "Date Achieved", value: entry.date_archived },
                { label: "Grade/Result", value: entry.grade },
              ]}
            />
          </InnerCleanerTabWrapper>
        </Fragment>
      ))}
    </CleanerTabWrapper>
  );
};
