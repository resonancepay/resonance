import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { DetailSection } from "./detail-section";

export const Experience = () => {
  return (
    <CleanerTabWrapper>
      <InnerCleanerTabWrapper>
        <DetailSection
          title="Experience 1"
          subtitle="See all the cleaner's employment history"
          fields={[
            { label: "Employer", value: "Emperor Cleaning Services" },
            { label: "Job Title", value: "Cleaner" },
            { label: "Start Date", value: "12 June 2021" },
            { label: "End Date", value: "12 June 2023" },
            {
              label: "Responsibility",
              value:
                "I was in charge of cleaning all offices jobs as well as office complex before proceeding to supersede shopping malls cleaning.",
              span: 16,
            },
            {
              label: "Responsibility",
              value:
                "I left cause the pay wasn't substantial anymore considering the recent inflation, also I moved further form my previous home.",
              span: 16,
            },
          ]}
        />
      </InnerCleanerTabWrapper>

      <CleanerSectionDivider />

      <InnerCleanerTabWrapper>
        <DetailSection
          fields={[
            { label: "Employer", value: "Emperor Cleaning Services" },
            { label: "Job Title", value: "Cleaner" },
            { label: "Start Date", value: "12 June 2021" },
            { label: "End Date", value: "12 June 2023" },
            {
              label: "Responsibility",
              value:
                "I was in charge of cleaning all offices jobs as well as office complex before proceeding to supersede shopping malls cleaning.",
              span: 16,
            },
            {
              label: "Responsibility",
              value:
                "I left cause the pay wasn't substantial anymore considering the recent inflation, also I moved further form my previous home.",
              span: 16,
            },
          ]}
        />
      </InnerCleanerTabWrapper>
    </CleanerTabWrapper>
  );
};
