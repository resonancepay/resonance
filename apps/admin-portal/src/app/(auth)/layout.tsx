import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import { GuestGuard } from "@/shared/providers/guest-guard";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <Container className="h-screen  bg-background min-h-screen">
        <Row justify={"center"} align="middle" className="h-full">
          <Col xs={12} className="rounded-xl overflow-hidden">
            <Row>
              <Col xs={12}>
                <Container className="h-120 bg-[url('/assets/images/admin-auth.png')] px-8 flex  items-start bg-cover bg-center bg-no-repeat pb-12 flex-col justify-end">
                  <Text tone="primary" variant="h2">
                    Admin Control
                  </Text>
                  <Text tone="primary" variant="bodyRegular">
                    Oversee all cleaning operations and cleaners activities.
                  </Text>
                </Container>
              </Col>
              <Col xs={12} className="bg-surface px-12 py-5">
                <Container className="mb-6">
                  <Image
                    width={52}
                    height={52}
                    src="/assets/svgs/logo.svg"
                    alt="Logo"
                  />
                </Container>
                {children}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </GuestGuard>
  );
}

export default AuthLayout;
