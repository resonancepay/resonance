import { ProfileScreen } from "@/features/profile/screens/profile.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Profile | Resonance Client Portal",
};

function Profile() {
  return <ProfileScreen />;
}

export default Profile;
