import { Col, Row } from "antd";
import React, { ReactNode } from "react";

export const AdminPortalWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Row justify="center" className={className}>
      <Col xs={23} className={className}>
        {children}
      </Col>
    </Row>
  );
};
