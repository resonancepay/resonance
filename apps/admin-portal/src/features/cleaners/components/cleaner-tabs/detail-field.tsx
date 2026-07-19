import { Container, Text } from "@resonance/ui";
import { Col } from "antd";
import { ReactNode } from "react";

interface DetailFieldProps {
  label: string;
  value: ReactNode;
  span?: number;
}

export const DetailField = ({ label, value, span = 8 }: DetailFieldProps) => {
  return (
    <Col xs={span}>
      <Text variant="bodyXSmall" tone="secondary" className="mb-1">
        {label}
      </Text>
      {typeof value === "string" ? (
        <Text variant="bodySmall" tone="primary">
          {value}
        </Text>
      ) : (
        <Container>{value}</Container>
      )}
    </Col>
  );
};
