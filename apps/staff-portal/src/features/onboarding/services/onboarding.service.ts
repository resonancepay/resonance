import { apiClient } from "@/lib/axios";
import { StepFourPayload, StepOnePayload, StepThreePayload, StepTwoPayload } from "../types/onboarding.type";

export const submitStepOne = async (payload: StepOnePayload) => {
  const formData = new FormData();
  formData.append("rtw", payload.rtw);
  formData.append("ccd", payload.ccd);

  const result = await apiClient.post(
    `/uk-legal-requirements?work_eligibility=${payload.work_eligibility}&nin=${encodeURIComponent(payload.nin)}&dbs_consent=${payload.dbs_consent}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return result.data;
};

export const submitStepTwo = async (payload: StepTwoPayload) => {
  const result = await apiClient.post("/employment-history", payload);
  return result.data;
};

export const submitStepThree = async (payload: StepThreePayload) => {
  const result = await apiClient.post("/qualifications", payload);
  return result.data;
};

export const submitStepFour = async (payload: StepFourPayload) => {
  const result = await apiClient.post("/job-stability", payload);
  return result.data;
};
