"use client";

import { Container } from "@resonance/ui";
import { ScoreIcon } from "@resonance/ui/icons";

interface StarRowProps {
  filled: number;
  total?: number;
  size?: number;
  onSelect?: (value: number) => void;
}

export const StarRow = ({ filled, total = 5, size = 20, onSelect }: StarRowProps) => (
  <Container className="flex items-center gap-1.5">
    {Array.from({ length: total }).map((_, index) => {
      const value = index + 1;
      return (
        <Container
          key={value}
          as="button"
          type="button"
          disabled={!onSelect}
          onClick={onSelect ? () => onSelect(value) : undefined}
          className={onSelect ? "cursor-pointer" : "cursor-default"}
        >
          <ScoreIcon
            size={size}
            className={value <= filled ? "text-success-text-icons" : "text-tertiary"}
          />
        </Container>
      );
    })}
  </Container>
);
