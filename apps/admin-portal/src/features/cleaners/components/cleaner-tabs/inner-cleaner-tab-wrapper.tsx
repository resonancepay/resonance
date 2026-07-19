import { Container } from "@resonance/ui";
import React, { ReactNode } from "react";

export const InnerCleanerTabWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <Container className="py-4">{children}</Container>;
};
