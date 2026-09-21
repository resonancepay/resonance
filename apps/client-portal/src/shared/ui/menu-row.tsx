"use client";
import { Container, Text } from "@resonance/ui";

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}

export const MenuRow = ({ icon, label, danger, onClick }: MenuRowProps) => (
  <Container
    as="button"
    type="button"
    onClick={onClick}
    className="flex items-center gap-3 w-full px-4 py-3 text-left cursor-pointer hover:bg-muted"
  >
    {icon}
    <Text variant="bodyRegular" tone={danger ? "danger" : "primary"}>
      {label}
    </Text>
  </Container>
);
