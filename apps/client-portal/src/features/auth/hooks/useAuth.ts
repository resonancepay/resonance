import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetProfile,
  useLogin,
  useResendOtp,
  useVerifyOtp,
  useVerifyPassword,
} from "./auth.hooks";
import { Profile } from "../types/auth.type";
import { createPasswordSchema, emailSchema } from "../types/auth.schema";
import { useToast } from "@/shared/toast";
import { useAuthStore } from "@/shared/store/auth.store";

const RESEND_OTP_SECONDS = 50;

const PASSWORD_REQUIREMENTS = [
  { label: "Uppercase", regex: /[A-Z]/ },
  { label: "Lowercase", regex: /[a-z]/ },
  { label: "Number", regex: /[0-9]/ },
  { label: "Special character", regex: /[!@#$%^&*(),.?":{}|<>]/ },
  { label: "6 characters", regex: /.{6,}/ },
];

export const useVerifyEmailScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const clientId = searchParams.get("clientId") ?? "";

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(RESEND_OTP_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { mutate: verifyMutate, isPending: isVerifying } = useVerifyOtp(
    () => {
      // First-time-login OTP is now verified — send them to set their
      // password. There's no separate create-password endpoint: the
      // create-password screen calls the same verify-password endpoint,
      // which the backend handles as "save this as their password" on a
      // first-time account and as normal validation otherwise.
      router.push(`/create-password?email=${encodeURIComponent(email)}`);
    },
    () => {
      setOtpError("Invalid code. Please check and try again.");
    },
  );

  const { mutate: resendMutate, isPending: isResending } = useResendOtp(() => {
    setOtpError("");
    setResendCountdown(RESEND_OTP_SECONDS);
  });

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setOtpError("Please enter the complete 6-digit code.");
      return;
    }
    setOtpError("");
    verifyMutate({ otp_code: otp, client_id: Number(clientId) });
  };

  const handleResendOtp = () => {
    if (resendCountdown > 0) return;
    resendMutate({ email });
  };

  const handleBack = () => {
    router.push("/login");
  };

  return {
    email,
    otp,
    setOtp,
    otpError,
    handleVerifyEmail,
    handleResendOtp,
    handleBack,
    isVerifying,
    isResending,
    resendCountdown,
  };
};

// Confirmed against Swagger: login is a two-step flow — step 1 checks the
// email only (and sends an OTP + redirects to verify-email if it's a
// first-time login); step 2 verifies the password and returns the token.
type LoginStep = "email" | "password";
type LoginErrors = { email?: string; password?: string };

export const useLoginScreen = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { addToast } = useToast();

  const [step, setStep] = useState<LoginStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverError, setServerError] = useState("");

  const { mutate: getProfile } = useGetProfile(
    (data: Profile) => {
      const currentUser = useAuthStore.getState().user;

      if (!currentUser?.access_token) {
        router.replace("/login");
        return;
      }

      setAuth({ ...currentUser, userInfo: data });
      router.replace("/jobs");
    },
    () => {},
  );

  const { mutate: loginMutate, isPending: isCheckingEmail } = useLogin(
    (data) => {
      if (data.first_time_login) {
        router.push(
          `/verify-email?email=${encodeURIComponent(email)}&clientId=${data.client_id}`,
        );
        return;
      }
      setStep("password");
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "We couldn't find an account with that email.";
      setServerError(message);
    },
  );

  const { mutate: verifyPasswordMutate, isPending: isVerifyingPassword } =
    useVerifyPassword(
      (data) => {
        setAuth({ access_token: data.access_token, token_type: data.token_type });
        getProfile();
      },
      (e) => {
        const detail = e?.response?.data?.detail;
        const message =
          typeof detail === "string" && detail
            ? detail
            : "Incorrect password. Please try again.";
        setServerError(message);
        addToast({
          variant: "error",
          title: "Login failed",
          description: message,
        });
      },
    );

  const handleChange =
    (field: "email" | "password") => (e: ChangeEvent<HTMLInputElement>) => {
      if (field === "email") setEmail(e.target.value);
      else setPassword(e.target.value);
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (serverError) setServerError("");
    };

  const handleLogin = () => {
    if (step === "email") {
      const result = emailSchema.safeParse(email);
      if (!result.success) {
        setErrors({ email: result.error.issues[0].message });
        return;
      }
      loginMutate({ email });
      return;
    }

    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }
    verifyPasswordMutate({ email, password });
  };

  return {
    step,
    formData: { email, password },
    errors,
    serverError,
    handleChange,
    handleLogin,
    isPending: isCheckingEmail || isVerifyingPassword,
  };
};

export const useCreatePasswordScreen = () => {
  // No separate create-password endpoint — this calls the same
  // verify-password endpoint used by login. The backend handles it as
  // "save this as their password" for a first-time account, and returns
  // the access token either way.
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const { setAuth } = useAuthStore();
  const { addToast } = useToast();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { mutate: getProfile } = useGetProfile(
    (data: Profile) => {
      const currentUser = useAuthStore.getState().user;

      if (!currentUser?.access_token) {
        router.replace("/login");
        return;
      }

      setAuth({ ...currentUser, userInfo: data });
      router.replace("/success-confirmation");
    },
    () => {},
  );

  const { mutate: verifyPasswordMutate, isPending } = useVerifyPassword(
    (data) => {
      setAuth({ access_token: data.access_token, token_type: data.token_type });
      getProfile();
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Something went wrong. Please try again.";
      addToast({
        variant: "error",
        title: "Couldn't create password",
        description: message,
      });
    },
  );

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    label: req.label,
    passed: req.regex.test(password),
  }));
  const allRequirementsMet = requirements.every((r) => r.passed);

  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createPasswordSchema.safeParse(password);
    if (!result.success) {
      setPasswordError(result.error.issues[0].message);
      return;
    }
    verifyPasswordMutate({ email, password });
  };

  return {
    email,
    password,
    passwordError,
    agreedToTerms,
    setAgreedToTerms,
    requirements,
    allRequirementsMet,
    handlePasswordChange,
    handleCreatePassword,
    isPending,
  };
};

// NOTE: unlinked — no forgot-password endpoint exists. UI/validation kept
// in place for when one is added; submit is a no-op until then.
export const useForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.issues[0].message);
      return;
    }
    // No endpoint to call yet.
  };

  return {
    email,
    emailError,
    handleEmailChange,
    handleForgotPassword,
    isPending: false,
  };
};

// NOTE: unlinked — no reset-password endpoint exists. UI/validation kept
// in place for when one is added; submit is a no-op until then.
export const useResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    label: req.label,
    passed: req.regex.test(password),
  }));
  const allRequirementsMet = requirements.every((r) => r.passed);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createPasswordSchema.safeParse(password);
    if (!result.success) {
      setPasswordError(result.error.issues[0].message);
      return;
    }
    // No endpoint to call yet.
  };

  return {
    password,
    passwordError,
    requirements,
    allRequirementsMet,
    handlePasswordChange,
    handleResetPassword,
    isPending: false,
  };
};
