"use client";
import { Container, Text } from "@resonance/ui";
import { UserIcon } from "@resonance/ui/icons";
import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { useProfileScreen } from "../hooks/useProfileScreen";

export const ProfileScreen = () => {
  useSetBreadcrumb([{ label: "Profile", href: "/profile" }]);
  const { fullName, fields, isLoading } = useProfileScreen();

  return (
    <Container>
      <Text variant="h3" className="text-primary mb-7">
        Personal Profile
      </Text>

      {isLoading ? (
        <Text variant="bodySmall" tone="secondary">
          Loading profile…
        </Text>
      ) : (
        <Container className="bg-surface rounded-2xl border border-border max-w-md">
          <Container className="flex items-center gap-3 px-5 py-5 border-b border-border">
            <Container className="w-14 h-14 rounded-full bg-brand-tertiary-bg-bold flex items-center justify-center shrink-0">
              <UserIcon size={28} className="text-inverted" />
            </Container>
            <Text variant="h5" tone="primary">
              {fullName}
            </Text>
          </Container>

          <Container className="flex flex-col">
            {fields.map((field) => (
              <Container
                key={field.label}
                className="flex items-center justify-between px-5 py-4 border-b border-border last:border-b-0"
              >
                <Text variant="bodySmall" tone="secondary">
                  {field.label}
                </Text>
                <Text variant="bodySmall" tone="primary">
                  {field.value}
                </Text>
              </Container>
            ))}
          </Container>
        </Container>
      )}
    </Container>
  );
};
