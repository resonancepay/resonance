export interface RegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  otp_sent: boolean;
  user_id: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
  reset_password_link: string;
}

export interface ResetPasswordPayload {
  token: string;
  new_password: string;
}

export interface VerifyOtpPayload {
  otp_code: string;
  user_id: number;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  detail: string;
}

export type ApplicationStatus =
  | "approved"
  | "declined"
  | "pending"
  | "submitted"
  | null;

export interface ServiceArea {
  postcode: string;
  radius: string;
}

export interface ServiceLocation {
  state: string;
  area1: ServiceArea;
  area2: ServiceArea;
}

// As returned by GET profile. availability_id is required to reference an
// entry for deletion (confirmed against Swagger — POST
// /v1/cleaners/availability/delete takes { availability_id }).
export interface AvailabilityEntry {
  availability_id: number;
  day: string;
  start_time: string;
  end_time: string;
}

// Payload for POST /v1/cleaners/availability/setup — a new entry has no id
// yet, so this omits availability_id rather than reusing AvailabilityEntry.
export interface NewAvailabilityEntry {
  day: string;
  start_time: string;
  end_time: string;
}

export interface DeleteAvailabilityPayload {
  availability_id: number;
}

export interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  application_submitted: boolean;
  application_approved: boolean;
  application_status: ApplicationStatus;
  availability: AvailabilityEntry[];
  service_location: ServiceLocation;
}
