import { Container } from "@resonance/ui";
import { Metadata } from "next";
import { GuestGuard } from "@/shared/providers/guest-guard";

export const metadata: Metadata = {
  title: "Resonance Client Portal",
  description: "Book and manage your cleaning services with Resonance.",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GuestGuard>
      <Container className="bg-background">{children}</Container>
    </GuestGuard>
  );
}
