import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon, UserIcon } from "@resonance/ui/icons";
import React from "react";
import { useAdminProfile } from "@/features/auth/hooks/useAdminProfile";

export const TopNavWrapper = () => {
  const { fullName, isLoading } = useAdminProfile();

  return (
    <Container className="flex items-center gap-1.5">
      <Container className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-tertiary-bg-bold">
        <UserIcon className="text-inverted" size={16} />
      </Container>
      <Container className="">
        <Text variant="button" tone="primary">
          {isLoading ? "…" : (fullName ?? "—")}
        </Text>
        <Text variant="bodyXSmall" tone="secondary">
          Super Admin
        </Text>
      </Container>
      <Container>
        <ChevronDownIcon size={16} className="text-secondary" />
      </Container>
    </Container>
  );
};
