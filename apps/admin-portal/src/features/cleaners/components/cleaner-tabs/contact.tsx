import { Fragment } from "react";
import { Text } from "@resonance/ui";
import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";
import { CleanerEmergencyContact } from "../../types/cleaner.type";

interface ContactProps {
  contacts: CleanerEmergencyContact[];
}

export const Contact = ({ contacts }: ContactProps) => {
  if (contacts.length === 0) {
    return (
      <CleanerTabWrapper>
        <InnerCleanerTabWrapper>
          <Text variant="bodySmall" tone="secondary">
            No emergency contacts on record.
          </Text>
        </InnerCleanerTabWrapper>
      </CleanerTabWrapper>
    );
  }

  return (
    <CleanerTabWrapper>
      {contacts.map((entry, index) => (
        <Fragment key={index}>
          {index > 0 && <CleanerSectionDivider />}
          <InnerCleanerTabWrapper>
            <DetailSection
              title={index === 0 ? "Contact" : undefined}
              subtitle={
                index === 0 ? "See cleaner's emergency contacts" : undefined
              }
              fields={[
                { label: "Contact Name", value: entry.contact_name },
                { label: "Relationship", value: entry.relationship },
                { label: "Phone Number", value: entry.phone },
                { label: "Email Address", value: entry.email },
              ]}
            />
          </InnerCleanerTabWrapper>
        </Fragment>
      ))}
    </CleanerTabWrapper>
  );
};
