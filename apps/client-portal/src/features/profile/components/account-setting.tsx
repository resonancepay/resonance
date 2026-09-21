"use client";

import { useState } from "react";
import { Container, Text } from "@resonance/ui";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DeleteIcon,
  KeyIcon,
} from "@resonance/ui/icons";

interface AccountSettingProps {
  onChangePasswordClick: () => void;
  onDeleteAccountClick: () => void;
}

export const AccountSetting = ({
  onChangePasswordClick,
  onDeleteAccountClick,
}: AccountSettingProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Container className="pb-2 border-b-[0.5px] border-border">
      <Container
        as="button"
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full mb-1.5 cursor-pointer"
      >
        <Text className="text-primary">Account Settings</Text>
        <ChevronDownIcon
          className={`text-primary transition-transform ${expanded ? "" : "-rotate-90"}`}
        />
      </Container>
      {expanded && (
        <Container className="flex flex-col gap-4">
          <Container
            as="button"
            type="button"
            onClick={onChangePasswordClick}
            className="bg-surface px-3 py-2 rounded-xl flex items-center justify-between w-full text-left cursor-pointer"
          >
            <Container className="flex items-center gap-2">
              <Container className="w-9 h-9 bg-purple-bg-light flex rounded-full items-center justify-center">
                <KeyIcon size={20} className="text-purple-text-icons" />
              </Container>
              <Text variant="bodySmall" tone="primary">
                Change Account Password
              </Text>
            </Container>
            <ChevronRightIcon className="text-secondary" />
          </Container>
          <Container
            as="button"
            type="button"
            onClick={onDeleteAccountClick}
            className="bg-surface px-3 py-2 rounded-xl flex items-center justify-between w-full text-left cursor-pointer"
          >
            <Container className="flex items-center gap-2">
              <Container className="w-9 h-9 bg-danger-bg-light flex rounded-full items-center justify-center">
                <DeleteIcon size={20} className="text-danger-text-icons" />
              </Container>
              <Text variant="bodySmall" tone="primary">
                Delete Your Account
              </Text>
            </Container>
            <ChevronRightIcon className="text-secondary" />
          </Container>
        </Container>
      )}
    </Container>
  );
};
