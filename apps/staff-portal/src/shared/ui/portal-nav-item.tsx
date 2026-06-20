"use client";
import { Container, Text } from "@resonance/ui";
import React from "react";
import { NavItemType } from "../types/shared.types";
import { usePathname } from "next/navigation";

export const PortalNavItem = ({ item }: { item: NavItemType }) => {
  const pathName = usePathname();
  const currentPath = pathName.split("/")[1];
  const active = currentPath === item.slug;
  return (
    <Container className="bg-muted rounded-full flex items-center gap-2 px-4 py-3">
      {active ? item.icon : item.inActiveIcon}
      <Text variant="bodyXSmall" className="text-primary">
        {item.title}
      </Text>
    </Container>
  );
};
