import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";

export const Contact = () => {
  return (
    <CleanerTabWrapper>
      <InnerCleanerTabWrapper>
        <DetailSection
          title="Contact"
          subtitle="See cleaner's emergency contacts"
          fields={[
            { label: "Contact Name", value: "Mark Doe" },
            { label: "Relationship", value: "Brother" },
            { label: "Phone Number", value: "+44 123 4567 8910" },
            { label: "Email Address", value: "mark@mail.com" },
          ]}
        />
      </InnerCleanerTabWrapper>

      <CleanerSectionDivider />

      <InnerCleanerTabWrapper>
        <DetailSection
          fields={[
            { label: "Contact Name", value: "Mark Doe" },
            { label: "Relationship", value: "Brother" },
            { label: "Phone Number", value: "+44 123 4567 8910" },
            { label: "Email Address", value: "mark@mail.com" },
          ]}
        />
      </InnerCleanerTabWrapper>
    </CleanerTabWrapper>
  );
};
