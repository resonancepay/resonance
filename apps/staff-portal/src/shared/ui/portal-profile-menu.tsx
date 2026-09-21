"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Text } from "@resonance/ui";
import {
  ChevronDownIcon,
  InfoIcon,
  LegalIcon,
  LogoutIcon,
  UserIcon,
} from "@resonance/ui/icons";
import { Popover } from "antd";
import { useAuthStore } from "@/shared/store/auth.store";
import { MenuRow } from "./menu-row";

export const PortalProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const userInfo = useAuthStore((state) => state.user?.userInfo);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const fullName =
    [userInfo?.first_name, userInfo?.last_name].filter(Boolean).join(" ") ||
    "—";

  const close = () => setOpen(false);

  const handlePersonalProfile = () => {
    close();
    router.push("/profile");
  };

  const handleLogout = () => {
    close();
    clearAuth();
    router.push("/login");
  };

  const content = (
    <Container className="w-64">
      <Container className="bg-brand-secondary-bg-light px-4 py-4 flex items-center gap-3 rounded-t-2xl">
        <Container className="w-10 h-10 rounded-full bg-brand-tertiary-bg-bold flex items-center justify-center shrink-0">
          <UserIcon size={20} className="text-inverted" />
        </Container>
        <Container className="min-w-0">
          <Text variant="button" tone="primary" className="truncate">
            {fullName}
          </Text>
          <Text variant="bodyXSmall" tone="secondary" className="truncate">
            {userInfo?.email ?? ""}
          </Text>
        </Container>
      </Container>

      <Container className="py-2">
        <MenuRow
          icon={<UserIcon size={18} className="text-primary" />}
          label="Personal Profile"
          onClick={handlePersonalProfile}
        />
      </Container>
      <Container className="h-px bg-border" />
      <Container className="py-2">
        <MenuRow
          icon={<InfoIcon size={18} className="text-primary" />}
          label="Help & Support"
          onClick={close}
        />
        <MenuRow
          icon={<LegalIcon size={18} className="text-primary" />}
          label="Legal"
          onClick={close}
        />
      </Container>
      <Container className="h-px bg-border" />
      <Container className="py-2">
        <MenuRow
          icon={<LogoutIcon size={18} className="text-danger-text-icons" />}
          label="Log Out"
          danger
          onClick={handleLogout}
        />
      </Container>
    </Container>
  );

  return (
    <Popover
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      arrow={false}
      content={content}
      classNames={{
        root: "!p-0",
        container:
          "!p-0 !rounded-2xl !shadow-lg !bg-surface border border-border overflow-hidden",
      }}
    >
      <Container className="flex items-center gap-2 cursor-pointer">
        <Container className="w-8 h-8 rounded-full bg-brand-tertiary-bg-bold flex items-center justify-center">
          <UserIcon size={16} className="text-inverted" />
        </Container>
        <ChevronDownIcon className="text-secondary" size={18} />
      </Container>
    </Popover>
  );
};
