"use client";

import { AdminPortalWrapper } from "@/components/wrappers/admin-portal-wrapper";
import { SideNav } from "@/components/wrappers/side-nav";
import { TopNav } from "@/components/wrappers/top-nav";
import { BreadcrumbProvider } from "@/context/breadcrumb-context";
import { Container } from "@resonance/ui";
import { Col, Row } from "antd";
import { ReactNode } from "react";

function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="min-h-screen bg-surface">
      <Row>
        <Col xs={4}>
          <SideNav />
        </Col>
        <Col xs={20}>
          <BreadcrumbProvider>
            <TopNav />
            <AdminPortalWrapper>{children}</AdminPortalWrapper>
          </BreadcrumbProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default PortalLayout;
