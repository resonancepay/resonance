import { LoginScreen } from "@/features/auth/screens/login.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Resonance Client Portal",
};

function Login() {
  return <LoginScreen />;
}

export default Login;
