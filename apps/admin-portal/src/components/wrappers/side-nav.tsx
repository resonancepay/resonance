"use client";

import { NavWrapperType } from "@/components/component.type";
import { NavWrapper } from "@/components/wrappers/nav-wrapper";
import { LogoutWrapper } from "@/components/wrappers/logout-wrapper";
import { useAdminProfile } from "@/features/auth/hooks/useAdminProfile";
import { useAuthStore } from "@/shared/store/auth.store";
import { Container, Text } from "@resonance/ui";
import {
  CleanerIcon,
  CleaningSiteIcon,
  DashboardIcon,
  FinancialIcon,
  JobIcon,
  SettingsIcon,
  TeamsIcon,
  ThemeIcon2,
} from "@resonance/ui/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SideNav = () => {
  const router = useRouter();
  const { fullName, email, isLoading } = useAdminProfile();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const navItems: NavWrapperType[] = [
  {
    label: "Dashboard",
    clickAction: () => {},
    subItem: [],
    icon: DashboardIcon,
  },
  {
    label: "Jobs",
    clickAction: () => router.push("/jobs"),
    subItem: [],
    icon: JobIcon,
    href: "/jobs",
  },
  {
    label: "Cleaner Management",
    clickAction: () => {},
    subItem: [
      {
        label: "Pending Cleaners",
        href: "/cleaners/pending-cleaners",
        action: () => router.push("/cleaners/pending-cleaners"),
      },
      {
        label: "Approved Cleaners",
        href: "/cleaners/approved-cleaners",
        action: () => router.push("/cleaners/approved-cleaners"),
      },
    ],
    icon: CleanerIcon,
  },
  {
    label: "Financials",
    clickAction: () => {},
    subItem: [
      { label: "Revenue", action: () => {} },
      { label: "Payouts", action: () => {} },
      { label: "Cleaner Earning", action: () => {} },
    ],
    icon: FinancialIcon,
  },
  {
    label: "Cleaning Sites",
    clickAction: () => router.push("/cleaning-sites"),
    subItem: [],
    icon: CleaningSiteIcon,
    href: "/cleaning-sites",
  },
  {
    label: "Teams",
    clickAction: () => {},
    subItem: [{ label: "All Teams", action: () => {} }],
    icon: TeamsIcon,
  },
];

  const navItem2: NavWrapperType[] = [
    {
      label: "Settings",
      clickAction: () => {},
      subItem: [],
      icon: SettingsIcon,
    },
    {
      label: "Theme",
      clickAction: () => {},
      subItem: [],
      icon: ThemeIcon2,
    },
  ];

  return (
    <Container className="max-h-screen h-screen w-full flex flex-col justify-between bg-background py-4 px-6">
      <Container>
        <Container className="pl-2 pb-4 border-b border-border mb-2">
          <Image
            height={64}
            width={82}
            src={"/assets/images/logo.png"}
            alt=""
          />
        </Container>
        <Container>
          <Container className="pt-4 mb-2">
            <Text tone="secondary" variant="bodyXSmall">
              Main Menu
            </Text>
          </Container>
          <Container>
            {navItems.map((item, index) => {
              return <NavWrapper item={item} key={index} />;
            })}
          </Container>
        </Container>

        <Container className="mt-6">
          <Container className="mb-2">
            <Text tone="secondary" variant="bodyXSmall">
              Others
            </Text>
          </Container>
          <Container>
            {navItem2.map((item, index) => {
              return <NavWrapper item={item} key={index} />;
            })}
          </Container>
        </Container>
      </Container>
      <LogoutWrapper
        name={isLoading ? "…" : (fullName ?? "—")}
        email={isLoading ? "" : (email ?? "")}
        onLogout={handleLogout}
      />
    </Container>
  );
};
