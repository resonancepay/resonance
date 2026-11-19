import { Container, Text } from "@resonance/ui";
import { CloseIcon, TickIcon } from "@resonance/ui/icons";

interface PasswordRuleChipProps {
  label: string;
  failed: boolean;
}

export const PasswordRuleChip = ({ label, failed }: PasswordRuleChipProps) => {
  return (
    <Container
      as="span"
      className={`flex items-center border px-2 py-1 rounded-4xl gap-2 ${failed ? "bg-brand-tertiary-bg-light border-brand-tertiary-border" : "bg-muted border-border"}`}
    >
      <Text
        className={failed ? "text-primary" : "text-secondary"}
        variant="bodyXSmall"
      >
        {label}
      </Text>
      {failed ? (
        <CloseIcon size={12} className="text-primary" />
      ) : (
        <TickIcon size={12} className="text-secondary" />
      )}
    </Container>
  );
};
