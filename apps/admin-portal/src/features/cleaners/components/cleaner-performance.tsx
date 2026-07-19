import { Container, Text } from "@resonance/ui";
import { FlagIcon, JobIcon, ScoreIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import React from "react";

export const CleanerPerformance = () => {
  return (
    <Container>
      <Row gutter={12}>
        <Col xs={8}>
          <Container className="bg-muted p-3.5 flex items-center justify-between rounded-xl">
            <Container className="flex flex-col gap-2.5">
              <Text tone="secondary" variant="bodyXSmall">
                Overall Score
              </Text>
              <Container className="flex items-center gap-1">
                <Text variant="h3" tone="primary">
                  98%
                </Text>
                <Container className="bg-success-bg-light rounded-lg py-px px-1">
                  <Text tone="success" variant="buttonXS">
                    +3
                  </Text>
                </Container>
              </Container>
            </Container>
            <ScoreIcon size={32} className="text-brand-text-icons" />
          </Container>
        </Col>
        <Col xs={8}>
          <Container className="bg-muted p-3.5 flex items-center justify-between rounded-xl">
            <Container className="flex flex-col gap-2.5">
              <Text tone="secondary" variant="bodyXSmall">
                Total Jobs
              </Text>
              <Container className="flex items-center gap-1">
                <Text variant="h3" tone="primary">
                  50
                </Text>
              </Container>
            </Container>
            <JobIcon size={32} className="text-brand-secondary-hover" />
          </Container>
        </Col>
        <Col xs={8}>
          <Container className="bg-muted p-3.5 flex items-center justify-between rounded-xl">
            <Container className="flex flex-col gap-2.5">
              <Text tone="secondary" variant="bodyXSmall">
                Flagged Jobs
              </Text>
              <Container className="flex items-center gap-1">
                <Text variant="h3" tone="primary">
                  02
                </Text>
              </Container>
            </Container>
            <FlagIcon size={32} className="text-danger-hover" />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
