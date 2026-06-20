import { Container, Text } from "@resonance/ui";
import React from "react";
import { PortalWrapper } from "./portal-wrapper";
import {
  DashboardIcon,
  JobIcon,
  PayIcon,
  ScoreIcon,
  SopIcon,
} from "@resonance/ui/icons";

export const PortalSubNav = () => {
  const portalSubNavItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon size={20} className="text-inverted" />,
    },
    {
      label: "Jobs",
      href: "/jobs",
      icon: <JobIcon size={20} className="text-inverted" />,
    },
    {
      label: "Pay",
      href: "/pay",
      icon: <PayIcon size={20} className="text-inverted" />,
    },
    {
      label: "Score",
      href: "/score",
      icon: <ScoreIcon size={20} className="text-inverted" />,
    },
    {
      label: "SOP",
      href: "/sop",
      icon: <SopIcon size={20} className="text-inverted" />,
    },
  ];
  return (
    <Container className="py-4.5 bg-brand-bg-bold">
      <PortalWrapper>
        <Container className="flex items-center gap-2">
            {portalSubNavItems.map((item) => (
              <Container
                key={item.label}
                className="flex items-center gap-2 cursor-pointer px-3"
              >
                {item.icon}
                <Text variant="bodyXSmall" className="text-inverted">
                  {item.label}
                </Text>
              </Container>
            ))}
        </Container>
      </PortalWrapper>
    </Container>
  );
};
