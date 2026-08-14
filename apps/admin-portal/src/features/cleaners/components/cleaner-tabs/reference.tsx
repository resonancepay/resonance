import { Fragment } from "react";
import { Text } from "@resonance/ui";
import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";
import { CleanerReferee } from "../../types/cleaner.type";

interface ReferenceProps {
  referees: CleanerReferee[];
}

export const Reference = ({ referees }: ReferenceProps) => {
  if (referees.length === 0) {
    return (
      <CleanerTabWrapper>
        <InnerCleanerTabWrapper>
          <Text variant="bodySmall" tone="secondary">
            No references on record.
          </Text>
        </InnerCleanerTabWrapper>
      </CleanerTabWrapper>
    );
  }

  return (
    <CleanerTabWrapper>
      {referees.map((entry, index) => (
        <Fragment key={index}>
          {index > 0 && <CleanerSectionDivider />}
          <InnerCleanerTabWrapper>
            <DetailSection
              title={index === 0 ? "Reference" : undefined}
              subtitle={index === 0 ? "See cleaner's Reference" : undefined}
              fields={[
                { label: "Name", value: entry.name },
                { label: "Company", value: entry.company },
                { label: "Job Title", value: entry.job_title },
                { label: "Phone Number", value: entry.phone },
                { label: "Email Address", value: entry.email },
                { label: "Relationship", value: entry.relationship },
              ]}
            />
          </InnerCleanerTabWrapper>
        </Fragment>
      ))}
    </CleanerTabWrapper>
  );
};
