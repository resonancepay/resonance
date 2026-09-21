import { Container, Tag, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { StatusTag } from "../types/profile.type";

interface AccountInformationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  statusTag: StatusTag;
}

export const AccountInformation = ({
  firstName,
  lastName,
  email,
  phone,
  dateOfBirth,
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
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              First Name
            </Text>
            <Text variant="bodySmall" tone="primary">
              {firstName}
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Last Name
            </Text>
            <Text variant="bodySmall" tone="primary">
              {lastName}
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Email Address
            </Text>
            <Text variant="bodySmall" tone="primary">
              {email}
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Cleaner ID
            </Text>
            <Text variant="bodySmall" tone="primary">
              —
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Phone Number
            </Text>
            <Text variant="bodySmall" tone="primary">
              {phone}
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Date of Birth
            </Text>
            <Text variant="bodySmall" tone="primary">
              {dateOfBirth}
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Date Registered
            </Text>
            <Text variant="bodySmall" tone="primary">
              —
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Date Approved
            </Text>
            <Text variant="bodySmall" tone="primary">
              —
            </Text>
          </Container>
        </Col>
        <Col xs={12} lg={8}>
          <Container>
            <Text variant="bodyXSmall" tone="secondary" className="mb-1">
              Account Status
            </Text>
            <Tag variant={statusTag.variant} label={statusTag.label} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
