import { Container } from "@resonance/ui";
import React, { ReactNode } from "react";

export const CleanerTabWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Container className="bg-surface border border-border rounded-xl px-5 py-4">
      {children}
    </Container>
  );
};
