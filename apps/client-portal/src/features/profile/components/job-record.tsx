import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";

interface JobRecordProps {
  totalJobs: string;
  completedJobs: string;
}

export const JobRecord = ({ totalJobs, completedJobs }: JobRecordProps) => {
  return (
    <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
      <Container className="mb-4">
        <Text variant="h5" tone="primary">
          Job Record
        </Text>
      </Container>
      <Row gutter={[0, 16]}>
        <Col xs={12} lg={8}>
          <Text variant="bodyXSmall" tone="secondary" className="mb-1">
            Total Jobs
          </Text>
          <Text variant="bodySmall" tone="primary">
            {totalJobs}
          </Text>
        </Col>
        <Col xs={12} lg={8}>
          <Text variant="bodyXSmall" tone="secondary" className="mb-1">
            Completed Jobs
          </Text>
          <Text variant="bodySmall" tone="primary">
            {completedJobs}
          </Text>
        </Col>
      </Row>
    </Container>
  );
};
