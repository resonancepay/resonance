import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { TableStatus } from "@/components/generics/table/table-status";
import { DetailSection } from "./detail-section";
import { CleanerDocWrapper } from "./cleaner-doc-wrapper";

export const AccountInfo = () => {
  return (
    <CleanerTabWrapper>
      <InnerCleanerTabWrapper>
        <DetailSection
          title="Account Information"
          subtitle="Personal and basic Information"
          fields={[
            { label: "First Name", value: "Mary" },
            { label: "Last Name", value: "Abam" },
            { label: "Reference Code", value: "RC-2026-04827" },
            { label: "Email Address", value: "ekitifountain@icloud.com" },
            { label: "Phone Number", value: "+44 123 4567 8901" },
            { label: "Date Of Birth", value: "06 June 1996" },
            { label: "Applied Date", value: "11 June 2026 • 11:55 PM" },
            {
              label: "Account Status",
              value: <TableStatus status="pending" />,
            },
          ]}
        />
      </InnerCleanerTabWrapper>

      <CleanerSectionDivider />

      <InnerCleanerTabWrapper>
        <DetailSection
          title="Eligibility"
          subtitle="All information and docs uploaded"
          fields={[
            { label: "Are you eligible to work in the UK?", value: "YES" },
            { label: "National Issuance Number", value: "123456768" },
            { label: "Consent to a DBS", value: "YES" },
            { label: "Right to work", value: <CleanerDocWrapper /> },
            {
              label: "Official criminal record and background check",
              value: "DBS (Disclosure and Barring Service)",
            },
            { label: "Prove Document", value: <CleanerDocWrapper /> },
          ]}
        />
      </InnerCleanerTabWrapper>

      <CleanerSectionDivider />

      <InnerCleanerTabWrapper>
        <DetailSection
          title="Suitability"
          subtitle="See cleaner's availability options"
          fields={[
            { label: "Availability", value: "Su, Mo, Tu, We, Th, Fr, St" },
            { label: "Uniform Size", value: "XL" },
            { label: "Reliable Transport", value: "YES" },
            { label: "Work on Holidays", value: "NO" },
          ]}
        />
      </InnerCleanerTabWrapper>
    </CleanerTabWrapper>
  );
};
