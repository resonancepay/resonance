import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import React from "react";
import { JobAvailability } from "./job-availability";

export const JobConsumable = () => {
  return (
    <Container className="border-b border-border">
      <Container className="flex items-center justify-between">
        <Text variant="bodySmall" tone="primary">
          Consumables
        </Text>
        <ChevronDownIcon className="text-primary" size={20} />
      </Container>
      <Container className="flex items-center bg-surface p-3.5 my-2 rounded-xl flex-col">
        <Row
          className="mb-2 border-b-border border-b-[0.5px] w-full pb-2"
          align="middle"
        >
          <Col span={12}>
            <Text variant="bodyXSmall" tone="secondary">
              Availability:
            </Text>
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
            <JobAvailability />
          </Col>
        </Row>
        <Row className="w-full pb-2" align="top">
          <Col span={12}>
            <Text variant="bodyXSmall" tone="secondary">
              Item(s) Needed:
            </Text>
          </Col>
          <Col span={12} className="text-right">
            <Text variant="bodyXSmall" tone="primary">
              Glass cleaner, Bleach, Detergent, Dissolver.
            </Text>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
