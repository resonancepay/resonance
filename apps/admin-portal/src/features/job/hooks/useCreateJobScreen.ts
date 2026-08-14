import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateJob } from "./job.hooks";
import { useSites } from "@/features/cleaning-site/hooks/site.hooks";
import { useApprovedCleaners } from "@/features/cleaners/hooks/cleaner.hooks";
import { CreateJobPayload } from "../types/job.type";
import { jobFirstStepSchema } from "../types/job.schema";
import { useToast } from "@/shared/toast";
import {
  TIME_OPTIONS,
  TIMEZONE_OPTIONS,
  getUserUtcHourOffset,
} from "../utils/job-form-options";

export interface JobFirstStepValues {
  cleaningSite: string;
  jobPay: string;
  cleanerPay: string;
  consumables: string;
  consumablesProvidedByCustomer: boolean;
  date: string;
  startTime: string;
  endTime: string;
  cleaner: string;
  timezone: string;
}

export type FirstStepErrors = Partial<Record<keyof JobFirstStepValues, string>>;
export type TextField = "jobPay" | "cleanerPay" | "consumables" | "date";
export type SelectField = "cleaningSite" | "startTime" | "endTime" | "cleaner" | "timezone";

export const EMPTY_FIRST_STEP: JobFirstStepValues = {
  cleaningSite: "",
  jobPay: "",
  cleanerPay: "",
  consumables: "",
  consumablesProvidedByCustomer: false,
  date: "",
  startTime: "",
  endTime: "",
  cleaner: "",
  timezone: "",
};

const getInitialFirstStep = (): JobFirstStepValues => ({
  ...EMPTY_FIRST_STEP,
  timezone: String(getUserUtcHourOffset()),
});

export const useCreateJobScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { data: sites } = useSites();
  const { data: approvedCleaners } = useApprovedCleaners({ page: 1, size: 100 });

  const [step, setStep] = useState<1 | 2>(1);
  const [firstStepValues, setFirstStepValues] =
    useState<JobFirstStepValues>(getInitialFirstStep);
  const [firstStepErrors, setFirstStepErrors] = useState<FirstStepErrors>({});
  const [checklist, setChecklist] = useState<string[]>([]);
  const [checklistError, setChecklistError] = useState<string | undefined>();

  const siteOptions = useMemo(
    () =>
      (sites ?? []).map((site) => ({
        label: site.site_name,
        value: String(site.site_id),
      })),
    [sites],
  );

  const { mutate, isPending } = useCreateJob(
    () => {
      addToast({
        variant: "success",
        title: "Job created",
        description: "The job was created and scheduled successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      router.push("/jobs");
    },
    (e: any) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Something went wrong. Please try again.";

      addToast({
        variant: "error",
        title: "Could not create job",
        description: message,
      });
    },
  );

  const handleChange =
    (field: TextField) => (e: ChangeEvent<HTMLInputElement>) => {
      setFirstStepValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (firstStepErrors[field]) {
        setFirstStepErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSelectChange = (field: SelectField) => (value?: string) => {
    setFirstStepValues((prev) => ({ ...prev, [field]: value ?? "" }));
    if (firstStepErrors[field]) {
      setFirstStepErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleConsumablesProvidedChange = (checked: boolean) => {
    setFirstStepValues((prev) => ({
      ...prev,
      consumablesProvidedByCustomer: checked,
      consumables: checked ? "" : prev.consumables,
    }));
    if (firstStepErrors.consumables) {
      setFirstStepErrors((prev) => ({ ...prev, consumables: undefined }));
    }
  };

  const handleContinue = () => {
    const result = jobFirstStepSchema.safeParse(firstStepValues);

    if (!result.success) {
      const fieldErrors: FirstStepErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof JobFirstStepValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setFirstStepErrors(fieldErrors);
      return;
    }

    setStep(2);
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
    if (checklistError) setChecklistError(undefined);
  };

  const handleSave = () => {
    if (checklist.length === 0) {
      setChecklistError("Select at least one checklist item");
      return;
    }

    const payload: CreateJobPayload = {
      site_id: Number(firstStepValues.cleaningSite),
      job_pay: Number(firstStepValues.jobPay),
      cleaners_pay: Number(firstStepValues.cleanerPay),
      consumables: firstStepValues.consumablesProvidedByCustomer
        ? ""
        : firstStepValues.consumables,
      consumables_provided: firstStepValues.consumablesProvidedByCustomer,
      job_date: firstStepValues.date,
      start_time: firstStepValues.startTime,
      end_time: firstStepValues.endTime,
      timezone: Number(firstStepValues.timezone),
      assigned_cleaner_id: Number(firstStepValues.cleaner),
      checklist,
    };

    mutate(payload);
  };

  const handleCancel = () => router.push("/jobs");

  return {
    step,
    firstStepValues,
    firstStepErrors,
    siteOptions,
    cleaners: approvedCleaners ?? [],
    timeOptions: TIME_OPTIONS,
    timezoneOptions: TIMEZONE_OPTIONS,
    checklist,
    checklistError,
    isPending,
    handleChange,
    handleSelectChange,
    handleConsumablesProvidedChange,
    handleContinue,
    toggleChecklistItem,
    handleSave,
    handleCancel,
  };
};
