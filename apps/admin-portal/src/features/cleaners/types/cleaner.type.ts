// NOTE: everything in this file is confirmed against the real API.
// PendingCleaner/ApprovedCleaner.status and ApprovedCleaner.availability
// are typed as plain strings rather than guessed enums, since the real
// API's casing doesn't match what was guessed from mock data (e.g.
// "Pending" vs "pending") — TableStatus and AvailabilityStatus both
// normalize/fall back defensively at render time instead of assuming a
// fixed value set.

export interface PaginationQuery {
  page?: number;
  size?: number;
}

export interface PendingCleaner {
  application_id: number;
  reference_no: string;
  full_name: string;
  email: string;
  dob: string;
  submitted_date: string;
  submitted_time: string;
  status: string;
}

export type PendingCleanerListResponse = PendingCleaner[];

export interface ApplicationPayload {
  application_id: number;
}

export interface ApproveApplicationPayload {
  application_id: number;
}

export interface RejectApplicationPayload {
  application_id: number;
  reason: string;
  description: string;
}

export interface CleanerPerformance {
  score: string;
  jobs: number;
  flagged: number;
  client_rating: string;
  checklist_completion: string;
  ontime_arrival: string;
}

export interface CleanerAccountInfo {
  first_name: string;
  last_name: string;
  reference_code: string;
  email: string;
  phone: string;
  dob: string;
  applied_date: string;
  approved_date: string;
  status: string;
}

export interface CleanerEligibility {
  eligible_to_work: boolean;
  national_insurance: string;
  dbs_consent: boolean;
  rtw_document: string;
  ccd_document: string;
}

export interface CleanerSuitability {
  availability: string[];
  uniform_size: string;
  reliable_transport: boolean;
  work_on_holidays: boolean;
}

export interface CleanerExperience {
  employer: string;
  job_title: string;
  start_date: string;
  end_date: string;
  responsibility: string;
}

export interface CleanerQualification {
  qualification_title: string;
  institute: string;
  date_archived: string;
  grade: string;
}

export interface CleanerEmergencyContact {
  contact_name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface CleanerReferee {
  name: string;
  company: string;
  job_title: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface CleanerApplicationDetails {
  performance: CleanerPerformance;
  account_info: CleanerAccountInfo;
  eligibility: CleanerEligibility;
  suitability: CleanerSuitability;
  experience: CleanerExperience[];
  qualifications: CleanerQualification[];
  emergency_contacts: CleanerEmergencyContact[];
  referee: CleanerReferee[];
}

export interface ApprovedCleaner {
  application_id: number;
  cleaner_id: number;
  cleaner_id_label: string;
  full_name: string;
  email: string;
  availability: string;
  jobs: number;
  score: string;
  approved_date: string;
  approved_time: string;
  status: string;
}

export type ApprovedCleanerListResponse = ApprovedCleaner[];
