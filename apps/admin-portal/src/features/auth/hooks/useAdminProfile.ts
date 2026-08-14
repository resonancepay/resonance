import { useProfile } from "./auth.hooks";

export const useAdminProfile = () => {
  const { data, isLoading } = useProfile();

  const fullName = data ? `${data.first_name} ${data.last_name}` : undefined;

  return {
    fullName,
    email: data?.email,
    isLoading,
  };
};
