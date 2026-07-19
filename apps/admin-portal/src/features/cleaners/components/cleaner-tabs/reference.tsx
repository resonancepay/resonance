import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";

export const Reference = () => {
  return (
    <CleanerTabWrapper>
      <InnerCleanerTabWrapper>
        <DetailSection
          title="Reference"
          subtitle="See cleaner's Reference"
          fields={[
            { label: "Name", value: "Mark Doe" },
            { label: "Company", value: "Cleaning Monochrome" },
            { label: "Job Title", value: "Manager" },
            { label: "Phone Number", value: "+44 123 4567 8910" },
            { label: "Email Address", value: "mark@mail.com" },
            { label: "Relationship", value: "mark@mail.com" },
          ]}
        />
      </InnerCleanerTabWrapper>

      <CleanerSectionDivider />

      <InnerCleanerTabWrapper>
        <DetailSection
          fields={[
            { label: "Name", value: "Mark Doe" },
            { label: "Company", value: "Cleaning Monochrome" },
            { label: "Job Title", value: "Manager" },
            { label: "Phone Number", value: "+44 123 4567 8910" },
            { label: "Email Address", value: "mark@mail.com" },
            { label: "Relationship", value: "mark@mail.com" },
          ]}
        />
      </InnerCleanerTabWrapper>
    </CleanerTabWrapper>
  );
};
