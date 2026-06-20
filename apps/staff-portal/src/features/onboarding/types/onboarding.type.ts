export interface StepOnePayload {
  work_eligibility: boolean;
  nin: string;
  dbs_consent: boolean;
  rtw: File;
  ccd: File;
}

export interface StepOneFormState {
  work_eligibility: boolean;
  nin: string;
  dbs_consent: boolean;
  rtw: File | null;
  ccd: File | null;
}

export interface StepOneErrors {
  work_eligibility?: string;
  nin?: string;
  dbs_consent?: string;
  rtw?: string;
  ccd?: string;
}

export interface EmploymentHistoryItem {
  employer_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  responsibilities: string;
  reason_for_leave: string;
}

export type StepTwoPayload = EmploymentHistoryItem[];

export interface EmploymentEntry extends EmploymentHistoryItem {
  id: string;
}

export type StepTwoErrors = Partial<Record<keyof EmploymentHistoryItem, string>>[];

// ─── Step Three ────────────────────────────────────────────────────────────────

export interface QualificationItem {
  qualification_title: string;
  institution: string;
  date_achieved: string;
  grade: string;
}

export interface EmergencyContactItem {
  contact_name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface RefereeItem {
  name: string;
  company: string;
  job_title: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface StepThreePayload {
  qualifications: QualificationItem[];
  emergency_contact: EmergencyContactItem[];
  referee: RefereeItem[];
}

export interface QualificationEntry extends QualificationItem { id: string; }
export interface EmergencyContactEntry extends EmergencyContactItem { id: string; }
export interface RefereeEntry extends RefereeItem { id: string; }

export type StepThreeQualificationErrors = Partial<Record<keyof QualificationItem, string>>[];
export type StepThreeEmergencyErrors = Partial<Record<keyof EmergencyContactItem, string>>[];
export type StepThreeRefereeErrors = Partial<Record<keyof RefereeItem, string>>[];

// ─── Step Four ────────────────────────────────────────────────────────────────

export interface StepFourAvailability {
  mondays: boolean;
  tuesdays: boolean;
  wednesdays: boolean;
  thursdays: boolean;
  fridays: boolean;
  saturdays: boolean;
  sundays: boolean;
}

export interface StepFourPayload {
  availability: StepFourAvailability;
  uniform_size: string;
  reliable_transport: boolean;
  work_on_holidays: boolean;
  terms_and_policy: boolean;
}

export interface StepFourErrors {
  availability?: string;
  uniform_size?: string;
  reliable_transport?: string;
  work_on_holidays?: string;
  terms_and_policy?: string;
}
