import { useProfile } from "@/features/auth/hooks/auth.hooks";
import { ProfileField } from "../types/profile.type";

export const useProfileScreen = () => {
  const { data, isLoading } = useProfile();

  const fullName = data ? `${data.first_name} ${data.last_name}` : "—";

  const fields: ProfileField[] = [
    { label: "Email", value: data?.email ?? "—" },
    { label: "Date of Birth", value: data?.dob ?? "—" },
  ];

  return { fullName, fields, isLoading };
};
