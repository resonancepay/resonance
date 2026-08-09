import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "./auth.hooks";
import { LoginPayload } from "../types/auth.type";
import { loginSchema } from "../types/auth.schema";
import { useAuthStore } from "@/shared/store/auth.store";
import { useToast } from "@/shared/toast";

type LoginErrors = Partial<Record<keyof LoginPayload, string>>;

export const useLoginScreen = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const { mutate, isPending } = useLogin(
    (data) => {
      setAuth({
        access_token: data.access_token,
        token_type: data.token_type,
        must_change_password: data.must_change_password,
      });
      router.replace("/jobs");
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Invalid email or password. Please try again.";

      addToast({
        variant: "error",
        title: "Login failed",
        description: message,
      });
    },
  );

  const handleChange =
    (field: keyof LoginPayload) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: LoginErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LoginPayload;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    mutate(formData);
  };

  return {
    formData,
    errors,
    handleChange,
    handleLogin,
    isPending,
  };
};
