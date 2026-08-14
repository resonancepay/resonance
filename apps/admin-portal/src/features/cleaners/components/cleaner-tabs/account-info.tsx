import { CleanerTabWrapper } from "./cleaner-tab-wrapper";
import { InnerCleanerTabWrapper } from "./inner-cleaner-tab-wrapper";
import { CleanerSectionDivider } from "../cleaner-section-divider";
import { TableStatus } from "@/components/generics/table/table-status";
import { DetailSection } from "./detail-section";
import { CleanerDocWrapper } from "./cleaner-doc-wrapper";
import {
  CleanerAccountInfo,
  CleanerEligibility,
  CleanerSuitability,
} from "../../types/cleaner.type";

interface AccountInfoProps {
  accountInfo: CleanerAccountInfo;
  eligibility: CleanerEligibility;
  suitability: CleanerSuitability;
}

export const AccountInfo = ({
  accountInfo,
  eligibility,
  suitability,
}: AccountInfoProps) => {
  return (
    <CleanerTabWrapper>
      <InnerCleanerTabWrapper>
        <DetailSection
          title="Account Information"
          subtitle="Personal and basic Information"
          fields={[
            { label: "First Name", value: accountInfo.first_name },
            { label: "Last Name", value: accountInfo.last_name },
            { label: "Reference Code", value: accountInfo.reference_code },
            { label: "Email Address", value: accountInfo.email },
            { label: "Phone Number", value: accountInfo.phone },
            { label: "Date Of Birth", value: accountInfo.dob },
            { label: "Applied Date", value: accountInfo.applied_date },
            {
              label: "Account Status",
              value: <TableStatus status={accountInfo.status} />,
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
            {
              label: "Are you eligible to work in the UK?",
              value: eligibility.eligible_to_work ? "YES" : "NO",
            },
            {
              label: "National Issuance Number",
              value: eligibility.national_insurance,
            },
            {
              label: "Consent to a DBS",
              value: eligibility.dbs_consent ? "YES" : "NO",
            },
            {
              label: "Right to work",
              value: <CleanerDocWrapper label={eligibility.rtw_document} />,
            },
            {
              label: "Official criminal record and background check",
              value: "DBS (Disclosure and Barring Service)",
            },
            {
              label: "Prove Document",
              value: <CleanerDocWrapper label={eligibility.ccd_document} />,
            },
          ]}
        />
      </InnerCleanerTabWrapper>

      <CleanerSectionDivider />

      <InnerCleanerTabWrapper>
        <DetailSection
          title="Suitability"
          subtitle="See cleaner's availability options"
          fields={[
            {
              label: "Availability",
              value: suitability.availability.join(", "),
            },
            { label: "Uniform Size", value: suitability.uniform_size },
            {
              label: "Reliable Transport",
              value: suitability.reliable_transport ? "YES" : "NO",
            },
            {
              label: "Work on Holidays",
              value: suitability.work_on_holidays ? "YES" : "NO",
            },
          ]}
        />
      </InnerCleanerTabWrapper>
    </CleanerTabWrapper>
  );
};
