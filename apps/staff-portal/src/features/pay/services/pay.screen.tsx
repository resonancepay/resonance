import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import React from "react";

export const PayScreen = () => {
  return (
    <Container>
      <Container className="mb-7">
        <Text variant="h3" tone="primary">
          Pay
        </Text>
      </Container>
      <Row>
        <Col xs={18}>
          <Container className="h-33.5 min-h-33.5 bg-brand-bg-bold rounded-xl"></Container>
        </Col>
        <Col xs={6}></Col>
      </Row>
    </Container>
  );
};
