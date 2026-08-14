import { Container, Text } from "@resonance/ui";
import { FlagIcon, JobIcon, ScoreIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import React from "react";
import { CleanerPerformanceProgressBar } from "./cleaner-progress-bar";
import { CleanerPerformance as CleanerPerformanceData } from "../types/cleaner.type";

// Field formats (score, client_rating, checklist_completion, ontime_arrival)
// are unconfirmed strings — parsed defensively rather than assumed.
const parsePercentage = (value: string): number => {
  const match = value.match(/\d+(\.\d+)?/);
  return match ? Math.min(100, Math.max(0, parseFloat(match[0]))) : 0;
};

const parseRatingPercentage = (value: string): number => {
  const match = value.match(/^(\d+(\.\d+)?)\s*\/\s*(\d+(\.\d+)?)/);
  if (match) {
    const numerator = parseFloat(match[1]);
    const denominator = parseFloat(match[3]);
    if (denominator > 0) {
      return Math.min(100, Math.max(0, (numerator / denominator) * 100));
    }
  }
  return parsePercentage(value);
};

interface CleanerPerformanceProps {
  performance: CleanerPerformanceData;
}

export const CleanerPerformance = ({ performance }: CleanerPerformanceProps) => {
  return (
    <Container>
      <Row gutter={12} className="mb-6">
        <Col xs={8}>
          <Container className="bg-muted p-3.5 flex items-center justify-between rounded-xl">
            <Container className="flex flex-col gap-2.5">
              <Text tone="secondary" variant="bodyXSmall">
                Overall Score
              </Text>
              <Container className="flex items-center gap-1">
                <Text variant="h3" tone="primary">
                  {performance.score}
                </Text>
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
                  {performance.jobs}
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
                  {performance.flagged}
                </Text>
              </Container>
            </Container>
            <FlagIcon size={32} className="text-danger-hover" />
          </Container>
        </Col>
      </Row>
      <Container>
        <CleanerPerformanceProgressBar
          label="Checklist Completion"
          value={performance.checklist_completion}
          percentage={parsePercentage(performance.checklist_completion)}
        />
        <CleanerPerformanceProgressBar
          label="On-Time Arrival"
          value={performance.ontime_arrival}
          percentage={parsePercentage(performance.ontime_arrival)}
        />
        <CleanerPerformanceProgressBar
          label="Client Rating"
          value={performance.client_rating}
          percentage={parseRatingPercentage(performance.client_rating)}
        />
      </Container>
    </Container>
  );
};
