"use client";

import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import { useState } from "react";
import { JobAvailabilityPill } from "./job-availability-pill";

interface JobConsumablesProps {
  availability: string;
  itemsNeeded: string;
}

export const JobConsumables = ({ availability, itemsNeeded }: JobConsumablesProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Container className="border-b border-border">
      <Container
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text variant="bodySmall" tone="primary">
          Consumables
        </Text>
        <ChevronDownIcon
          className="text-primary transition-transform duration-200"
          size={20}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </Container>
      {open && (
        <Container className="flex items-center bg-surface p-3.5 my-2 rounded-xl flex-col">
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Availability:
              </Text>
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
              <JobAvailabilityPill label={availability} />
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
                {itemsNeeded}
              </Text>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};
