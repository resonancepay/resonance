import { LoginScreen } from "@/features/auth/screens/login.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Resonance Admin Portal",
};

function Login() {
  return <LoginScreen />;
}

export default Login;
