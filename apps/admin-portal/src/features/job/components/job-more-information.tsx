"use client";

import { Container, Text } from "@resonance/ui";
import { ChevronDownIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import { useState } from "react";
import { JobTypeTag } from "./job-type-tag";

interface JobMoreInformationProps {
  cleaningSite: string;
  clientName: string;
  clientEmail: string;
  jobId: string;
  jobType: string;
  jobDate: string;
  jobTime: string;
  duration: string;
  jobPay: string;
  cleanerPay: string;
}

export const JobMoreInformation = ({
  cleaningSite,
  clientName,
  clientEmail,
  jobId,
  jobType,
  jobDate,
  jobTime,
  duration,
  jobPay,
  cleanerPay,
}: JobMoreInformationProps) => {
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
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Cleaning Site:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {cleaningSite}
              </Text>
            </Col>
          </Row>
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Client:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {clientName}
              </Text>
              <Text tone="secondary" variant="bodyXSmall">
                {clientEmail}
              </Text>
            </Col>
          </Row>
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Job ID:
              </Text>
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Container
                as="span"
                className="bg-muted px-2 py-1 rounded-lg inline-flex items-center w-fit"
              >
                <Text variant="buttonXS" tone="primary">
                  {jobId}
                </Text>
              </Container>
            </Col>
          </Row>
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Job Type:
              </Text>
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
              <JobTypeTag label={jobType} />
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
                {jobDate}
              </Text>
              <Text tone="secondary" variant="bodyXSmall">
                {jobTime}
              </Text>
            </Col>
          </Row>
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Duration:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {duration}
              </Text>
            </Col>
          </Row>
          <Row className="mb-2 border-b-border border-b-[0.5px] w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Job Pay:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {jobPay}
              </Text>
            </Col>
          </Row>
          <Row className="w-full pb-2" align="middle">
            <Col span={12}>
              <Text variant="bodyXSmall" tone="secondary">
                Cleaner&apos;s Pay:
              </Text>
            </Col>
            <Col span={12} className="text-right">
              <Text variant="bodyXSmall" tone="primary">
                {cleanerPay}
              </Text>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};
