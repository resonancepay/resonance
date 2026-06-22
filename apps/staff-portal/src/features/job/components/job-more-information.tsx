import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { JobId } from "./job-id";
import { JobType } from "./job-type";

export const JobMoreInformation = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container className="border-b border-border">
      <Container
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text variant="bodySmall" tone="primary">
          More Information
        </Text>
        <ChevronDownIcon
          className="text-primary transition-transform duration-200"
          size={20}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </Container>
      {open && (
        <Container className="flex items-center bg-surface p-3.5 my-2 rounded-xl flex-col">
          <Row
            className="mb-2 border-b-border  border-b-[0.5px] w-full pb-2"
            align="middle"
          >
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Cleaning Site
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                Northgate Office - Floor 3
              </Text>
            </Col>
          </Row>
          <Row
            className="mb-2 border-b-border border-b-[0.5px] w-full pb-2"
            align="middle"
          >
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Job ID:
              </Text>
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
              <JobId />
            </Col>
          </Row>
          <Row
            className="mb-2 border-b-border border-b-[0.5px] w-full pb-2"
            align="middle"
          >
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Job Type:
              </Text>
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
              <JobType />
            </Col>
          </Row>
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Job Time:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                Thur 24, Jun 2026
              </Text>
              <Text tone="secondary" variant="bodyXSmall">
                08:00
              </Text>
            </Col>
          </Row>
          <Row
            className="mb-2 border-b-border border-b-[0.5px] w-full pb-2"
            align="middle"
          >
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Duration:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                02 Hours 30 Minutes
              </Text>
            </Col>
          </Row>
          <Row className="mb-2 w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Payout:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                £80.56
              </Text>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};
