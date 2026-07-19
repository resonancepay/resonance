import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";

export const Qualification = () => {
  return (
    <CleanerTabWrapper>
      <InnerCleanerTabWrapper>
        <DetailSection
          title="Qualification"
          subtitle="See all the cleaner's education level"
          fields={[
            {
              label: "Qualification Title",
              value: "Certified Hospitality Personnel",
            },
            { label: "Institute", value: "University Of London" },
            { label: "Date Achieved", value: "12 June 2021" },
            { label: "Grade/Result", value: "Pass" },
          ]}
        />
      </InnerCleanerTabWrapper>

      <CleanerSectionDivider />

      <InnerCleanerTabWrapper>
        <DetailSection
          fields={[
            {
              label: "Qualification Title",
              value: "Certified Hospitality Personnel",
            },
            { label: "Institute", value: "University Of London" },
            { label: "Date Achieved", value: "12 June 2021" },
            { label: "Grade/Result", value: "Pass" },
          ]}
        />
      </InnerCleanerTabWrapper>
    </CleanerTabWrapper>
  );
};
