import Character from "../../../../public/assets/svgs/profile-character.svg";
import Image from "next/image";
import { UserIcon } from "@resonance/ui/icons";
import { Container, Tag, Text } from "@resonance/ui";
import { StatusTag } from "../types/profile.type";

interface ProfileBannerProps {
  fullName: string;
  email: string;
  statusTag: StatusTag;
}

export const ProfileBanner = ({ fullName, email, statusTag }: ProfileBannerProps) => {
  return (
    <Container className="bg-surface relative border-[0.5px] border-brand-secondary-border p-3.5 rounded-xl">
      <Container className="flex items-center gap-3">
        <Container className="w-16 h-16 rounded-full bg-brand-tertiary-bg-bold flex items-center justify-center">
          <UserIcon size={32} className="text-inverted" />
        </Container>
        <Container>
          <Container className="mb-1 flex items-center gap-1.5">
            <Text tone="primary" variant="h4">
              {fullName}
            </Text>
            <Tag variant={statusTag.variant} label={statusTag.label} />
          </Container>
          <Text variant="bodySmall" tone="secondary">
            {email}
          </Text>
        </Container>
      </Container>
      <Container className="absolute right-0 bottom-0">
        <Image src={Character} alt="" className="w-14 h-auto lg:w-auto" />
      </Container>
    </Container>
  );
};
