import { Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { ReactNode } from "react";
import { DetailField } from "./detail-field";

interface DetailSectionField {
  label: string;
  value: ReactNode;
  span?: number;
}

interface DetailSectionProps {
  title?: string;
  subtitle?: string;
  fields: DetailSectionField[];
}

export const DetailSection = ({ title, subtitle, fields }: DetailSectionProps) => {
  return (
    <Row>
      <Col xs={8}>
        {title && (
          <Text tone="primary" variant="button">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text variant="bodyXSmall" tone="secondary">
            {subtitle}
          </Text>
        )}
      </Col>
      <Col xs={16}>
        <Row gutter={[0, 32]}>
          {fields.map((field) => (
            <DetailField
              key={field.label}
              label={field.label}
              value={field.value}
              span={field.span}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
};
