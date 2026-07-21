"use client";

import { Container, Text } from "@resonance/ui";
import Link from "next/link";
import { Fragment } from "react";
import { useBreadcrumbContext } from "@/context/breadcrumb-context";
import { NotificationIcon } from "@resonance/ui/icons";
import { TopNavWrapper } from "./top-nav-wrapper";
import { AdminPortalWrapper as PortalWrapper } from "./admin-portal-wrapper";

export const TopNav = () => {
  const { breadcrumbs, title } = useBreadcrumbContext();
  const hasBreadcrumbContent = breadcrumbs.length > 0 || !!title;

  return (
    <Container className="py-4 mb-6 border-b border-border bg-surface">
      <PortalWrapper>
        <Container className=" flex items-center justify-between">
          <Container className="flex flex-col gap-1.5">
            {hasBreadcrumbContent && breadcrumbs.length > 1 && (
              <Container className="flex items-center gap-1.5">
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <Fragment key={`${item.label}-${index}`}>
                      {index > 0 && (
                        <Text variant="button" tone="primary">
                          /
                        </Text>
                      )}
                      {item.href && !isLast ? (
                        <Link href={item.href}>
                          <Text variant="button" tone="brand-secondary">
                            {item.label}
                          </Text>
                        </Link>
                      ) : (
                        <Text variant="button" tone="secondary">
                          {item.label}
                        </Text>
                      )}
                    </Fragment>
                  );
                })}
              </Container>
            )}
            {hasBreadcrumbContent && title && (
              <Text variant="h3" tone="primary">
                {title}
              </Text>
            )}
          </Container>
          <Container className="flex items-center gap-4">
            <Container className="w-11 h-11 bg-muted rounded-full flex items-center justify-center">
              <NotificationIcon className="text-primary" size={20} />
            </Container>
            <TopNavWrapper />
          </Container>
        </Container>
      </PortalWrapper>
    </Container>
  );
};
