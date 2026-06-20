import { PortalNav } from "@/shared/ui/portal-nav";
import { PortalSubNav } from "@/shared/ui/portal-subnav";
import { Container } from "@resonance/ui";
import React, { ReactNode } from "react";

function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="min-h-screen h-screen bg-surface flex flex-col">
      <PortalNav />
      <Container className="flex-1 overflow-auto bg-surface-2">
        {children}
      </Container>
    </Container>
  );
}

export default PortalLayout;
