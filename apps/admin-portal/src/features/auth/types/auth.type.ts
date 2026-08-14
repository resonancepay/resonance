export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  must_change_password: boolean;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
}

export interface AdminProfile {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
}
