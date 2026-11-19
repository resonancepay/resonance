import { Container, Tag, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { StatusTag } from "../types/profile.type";

interface AccountInformationProps {
  clientName: string;
  email: string;
  dateRegistered: string;
  statusTag: StatusTag;
}

export const AccountInformation = ({
  clientName,
  email,
  dateRegistered,
  statusTag,
}: AccountInformationProps) => {
  return (
    <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
      <Container className="mb-4">
        <Text variant="h5" tone="primary">
          Account Information
        </Text>
      </Container>
      <Row gutter={[0, 16]}>
        <Col xs={12} lg={8}>
          <Text variant="bodyXSmall" tone="secondary" className="mb-1">
            Client Name
          </Text>
          <Text variant="bodySmall" tone="primary">
            {clientName}
          </Text>
        </Col>
        <Col xs={12} lg={8}>
          <Text variant="bodyXSmall" tone="secondary" className="mb-1">
            Email Address
          </Text>
          <Text variant="bodySmall" tone="primary">
            {email}
          </Text>
        </Col>
        <Col xs={12} lg={8}>
          <Text variant="bodyXSmall" tone="secondary" className="mb-1">
            Date Registered
          </Text>
          <Text variant="bodySmall" tone="primary">
            {dateRegistered}
          </Text>
        </Col>
        <Col xs={12} lg={8}>
          <Text variant="bodyXSmall" tone="secondary" className="mb-1">
            Account Status
          </Text>
          <Tag variant={statusTag.variant} label={statusTag.label} />
        </Col>
      </Row>
    </Container>
  );
};
