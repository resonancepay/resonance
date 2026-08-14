"use client";

import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import { useState } from "react";

interface JobClockingInformationProps {
  checkInTime: string;
  checkOutTime: string;
  timeTaken: string;
}

export const JobClockingInformation = ({
  checkInTime,
  checkOutTime,
  timeTaken,
}: JobClockingInformationProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Container className="border-b border-border">
      <Container
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text variant="bodySmall" tone="primary">
          Clocking Information
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
            className="mb-2 border-b-border border-b-[0.5px] w-full pb-2"
            align="middle"
          >
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Clock In:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {checkInTime}
              </Text>
            </Col>
          </Row>
          <Row
            className="mb-2 border-b-border border-b-[0.5px] w-full pb-2"
            align="middle"
          >
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Clock Out:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {checkOutTime}
              </Text>
            </Col>
          </Row>
          <Row className="w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Time Taken:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {timeTaken}
              </Text>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};
