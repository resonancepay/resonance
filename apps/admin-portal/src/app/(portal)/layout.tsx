import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import Image from "next/image";

function PortalLayout() {
  return (
    <Container className="min-h-screen bg-surface">
      <Row>
        <Col xs={4}>
          <Container className="max-h-screen h-screen w-full bg-background py-4 px-6">
            <Container className="pl-2 pb-4 border-b border-border mb-2">
              <Image
                height={64}
                width={82}
                src={"/assets/images/logo.png"}
                alt=""
              />
            </Container>
            <Container className="pt-4">
              <Text tone="secondary" variant="bodyXSmall">
                Main Menu
              </Text>
            </Container>
          </Container>
        </Col>
        <Col xs={20}></Col>
      </Row>
    </Container>
  );
}

export default PortalLayout;
