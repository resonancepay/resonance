import { Container } from "@resonance/ui";
import { useState } from "react";
import { PendingCleanerBanner } from "./pending-cleaner-banner";
import { CleanerTab } from "./cleaner-tab";
import { AccountInfo } from "../components/cleaner-tabs/account-info";
import { Experience } from "../components/cleaner-tabs/experience";
import { Qualification } from "../components/cleaner-tabs/qualification";
import { Contact } from "../components/cleaner-tabs/contact";
import { Reference } from "../components/cleaner-tabs/reference";
import { CleanerApplicationDetails } from "../types/cleaner.type";

type TabKey = "account-info" | "experience" | "qualification" | "contact" | "reference";

interface CleanerDetailsProps {
  details: CleanerApplicationDetails;
  showPendingBanner?: boolean;
  onApprove?: () => void;
  onReject?: (data: { reason: string; description: string }) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
}

export const CleanerDetails = ({
  details,
  showPendingBanner = false,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: CleanerDetailsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("account-info");

  return (
    <Container>
      {showPendingBanner && onApprove && onReject && (
        <PendingCleanerBanner
          name={`${details.account_info.first_name} ${details.account_info.last_name}`}
          email={details.account_info.email}
          onApprove={onApprove}
          onReject={onReject}
          isApproving={isApproving}
          isRejecting={isRejecting}
        />
      )}
      <CleanerTab
        tabs={[
          {
            label: "Account Info & Eligibility",
            action: () => setActiveTab("account-info"),
          },
          { label: "Experience", action: () => setActiveTab("experience") },
          {
            label: "Qualification",
            action: () => setActiveTab("qualification"),
          },
          { label: "Contact", action: () => setActiveTab("contact") },
          { label: "Reference", action: () => setActiveTab("reference") },
        ]}
      />
      {activeTab === "account-info" && (
        <AccountInfo
          accountInfo={details.account_info}
          eligibility={details.eligibility}
          suitability={details.suitability}
        />
      )}
      {activeTab === "experience" && <Experience experience={details.experience} />}
      {activeTab === "qualification" && (
        <Qualification qualifications={details.qualifications} />
      )}
      {activeTab === "contact" && <Contact contacts={details.emergency_contacts} />}
      {activeTab === "reference" && <Reference referees={details.referee} />}
    </Container>
  );
};
