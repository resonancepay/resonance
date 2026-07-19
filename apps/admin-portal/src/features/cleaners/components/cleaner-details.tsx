import { Container } from "@resonance/ui";
import { useState } from "react";
import { PendingCleanerBanner } from "./pending-cleaner-banner";
import { CleanerTab } from "./cleaner-tab";
import { AccountInfo } from "../components/cleaner-tabs/account-info";
import { Experience } from "../components/cleaner-tabs/experience";
import { Qualification } from "../components/cleaner-tabs/qualification";
import { Contact } from "../components/cleaner-tabs/contact";
import { Reference } from "../components/cleaner-tabs/reference";

const TAB_COMPONENTS = {
  "account-info": AccountInfo,
  experience: Experience,
  qualification: Qualification,
  contact: Contact,
  reference: Reference,
} as const;

type TabKey = keyof typeof TAB_COMPONENTS;

export const CleanerDetails = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("account-info");
  const ActiveTabComponent = TAB_COMPONENTS[activeTab];
  return (
    <Container>
      <PendingCleanerBanner />
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
      <ActiveTabComponent />
    </Container>
  );
};
