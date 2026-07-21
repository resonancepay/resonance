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
    <Container className="h-screen overflow-hidden bg-surface">
      <Row className="h-full">
        <Col xs={4} className="h-full">
          <SideNav />
        </Col>
        <Col xs={20} className="flex! flex-col! h-full overflow-hidden">
          <BreadcrumbProvider>
            <TopNav />
            <Container className="flex-1 min-h-0 overflow-y-auto">
              <AdminPortalWrapper className="h-full">
                {children}
              </AdminPortalWrapper>
            </Container>
          </BreadcrumbProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default PortalLayout;
