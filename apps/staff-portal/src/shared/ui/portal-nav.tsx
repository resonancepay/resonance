"use client";
import { Container, Text } from "@resonance/ui";
import Image from "next/image";
import { PortalWrapper } from "./portal-wrapper";
import {
  ChevronDownIcon,
  DarkModeIcon,
  DashboardIcon,
  DashboardIcon2,
  JobIcon,
  JobIcon2,
  LightModeIcon,
  NotificationIcon,
  PayIcon,
  PayIcon2,
  ScoreIcon,
  ScoreIcon2,
  SopIcon,
  SopIcon2,
  UserIcon,
} from "@resonance/ui/icons";
import { useTheme } from "@/shared/hooks/useTheme";
import { PortalNavItem } from "./portal-nav-item";
import { NavItemType } from "../types/shared.types";

export const PortalNav = () => {
  const { theme, toggleTheme } = useTheme();
  const navItems: NavItemType[] = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <DashboardIcon size={20} className="text-inverted" />,
      inActiveIcon: <DashboardIcon2 size={20} className="text-primary" />,
      slug: "dashboard",
    },
    {
      title: "Jobs",
      link: "/dashboard",
      icon: <JobIcon size={20} className="text-inverted" />,
      inActiveIcon: <JobIcon2 size={20} className="text-primary" />,
      slug: "job",
    },
    {
      title: "Pay",
      link: "/dashboard",
      icon: <PayIcon size={20} className="text-inverted" />,
      inActiveIcon: <PayIcon2 size={20} className="text-primary" />,
      slug: "pay",
    },
    {
      title: "Score",
      link: "/dashboard",
      icon: <ScoreIcon size={20} className="text-inverted" />,
      inActiveIcon: <ScoreIcon2 size={20} className="text-primary" />,
      slug: "score",
    },
    {
      title: "SOP",
      link: "/dashboard",
      icon: <SopIcon size={20} className="text-inverted" />,
      inActiveIcon: <SopIcon2 size={20} className="text-primary" />,
      slug: "sop",
    },
  ];

  return (
    <PortalWrapper>
      <Container className="flex items-center justify-between py-4">
        <Container className="flex gap-10 items-center">
          <Container>
            <Image
              width={60}
              height={60}
              src="/assets/svgs/logo.svg"
              alt="Logo"
            />
          </Container>
          <Container className="flex items-center gap-2">
            {navItems.map((item, key) => {
              return <PortalNavItem item={item} key={key} />;
            })}
          </Container>
        </Container>

        <Container className="flex items-center gap-5">
          <NotificationIcon className="text-primary" size={24} />
          <Container
            as="button"
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer"
          >
            {theme === "light" ? (
              <DarkModeIcon className="text-primary" size={24} />
            ) : (
              <LightModeIcon className="text-primary" size={24} />
            )}
          </Container>
          <Container className="flex items-center gap-2">
            <Container className="w-8 h-8 rounded-full bg-brand-tertiary-bg-bold flex items-center justify-center">
              <UserIcon size={16} className="text-inverted" />
            </Container>
            <ChevronDownIcon
              className="text-secondary cursor-pointer"
              size={18}
            />
          </Container>
        </Container>
      </Container>
    </PortalWrapper>
  );
};
