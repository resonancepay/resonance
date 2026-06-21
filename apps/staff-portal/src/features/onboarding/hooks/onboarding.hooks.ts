import { useMutation } from "@tanstack/react-query";
import { submitStepOne, submitStepTwo, submitStepThree, submitStepFour } from "../services/onboarding.service";
import { StepOnePayload, StepTwoPayload, StepThreePayload, StepFourPayload } from "../types/onboarding.type";

export const useSubmitStepOne = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: StepOnePayload) => submitStepOne(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useSubmitStepTwo = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: StepTwoPayload) => submitStepTwo(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useSubmitStepThree = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: StepThreePayload) => submitStepThree(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useSubmitStepFour = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: StepFourPayload) => submitStepFour(payload),
    onSuccess: sc,
    onError: ec,
  });
};
