"use client";

import { Container, Text } from "@resonance/ui";
import { useState } from "react";

export interface CleanerTabItem {
  label: string;
  action: () => void;
}

interface CleanerTabProps {
  tabs: CleanerTabItem[];
}

export const CleanerTab = ({ tabs }: CleanerTabProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Container className="flex">
      <Container className="my-6 rounded-lg bg-background p-0.5 flex items-center gap-1">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;

          return (
            <Container
              key={tab.label}
              as="button"
              type="button"
              onClick={() => {
                setActiveIndex(index);
                tab.action();
              }}
              className={[
                "px-4 py-1.5 rounded-lg",
                isActive ? "border-[0.5px] border-border bg-surface" : "",
              ].join(" ")}
            >
              <Text variant="button" tone={isActive ? "primary" : "secondary"}>
                {tab.label}
              </Text>
            </Container>
          );
        })}
      </Container>
    </Container>
  );
};
