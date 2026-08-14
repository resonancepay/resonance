import { Container, Text } from "@resonance/ui";
import { LogoutIcon, UserIcon } from "@resonance/ui/icons";

export const LogoutWrapper = ({
  name,
  email,
  onLogout,
}: {
  name: string;
  email: string;
  onLogout: () => void;
}) => {
  return (
    <Container className="bg-brand-bg-light px-3 py-2.5 rounded-2xl flex justify-between items-center gap-2">
      <Container className="flex gap-2 items-center min-w-0">
        <Container className="bg-brand-bg-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">
          <UserIcon size={20} className="text-inverted" />
        </Container>
        <Container className="min-w-0">
          <Text variant="bodySmall" tone="primary" className="truncate">
            {name}
          </Text>
          <Text variant="bodyXSmall" tone="secondary" className="truncate">
            {email}
          </Text>
        </Container>
      </Container>
      <Container as="button" type="button" onClick={onLogout} className="shrink-0">
        <LogoutIcon className="text-primary" />
      </Container>
    </Container>
  );
};
