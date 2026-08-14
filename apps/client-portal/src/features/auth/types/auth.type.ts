// Confirmed against Swagger: login only checks the email and whether it's a
// first-time login (sending an OTP if so) — password is verified in a
// separate step via verifyPassword, not combined into one call.
export interface LoginPayload {
  email: string;
}

export interface LoginResponse {
  success: boolean;
  first_time_login: boolean;
  client_id: number;
}

// Confirmed against Swagger — resend-otp keys off email, not user_id.
export interface ResendOtpPayload {
  email: string;
}

export interface ResendOtpResponse {
  otp_sent: boolean;
  client_id: number;
}

// Confirmed against Swagger — client_id, not user_id.
export interface VerifyOtpPayload {
  otp_code: string;
  client_id: number;
}

export interface VerifyOtpResponse {
  success: boolean;
  detail: string;
}

// Confirmed against Swagger — completely different shape than previously
// assumed (no first_name/last_name/phone/date_of_birth).
export interface Profile {
  name: string;
  email: string;
  is_active: boolean;
  joined_date: string;
  total_jobs: number;
  completed_jobs: number;
}

export interface VerifyPasswordPayload {
  email: string;
  password: string;
}

export interface VerifyPasswordResponse {
  access_token: string;
  token_type: string;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
}

export interface LogoutResponse {
  success: boolean;
  details: string;
}

// Confirmed against Swagger — old_password, not current_password.
export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface DeleteProfileResponse {
  success: boolean;
  detail: string;
}
