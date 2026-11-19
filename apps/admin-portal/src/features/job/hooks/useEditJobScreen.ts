import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useJob, useEditJob, useEditPublishJob } from "./job.hooks";
import { useSites } from "@/features/cleaning-site/hooks/site.hooks";
import { useApprovedCleaners } from "@/features/cleaners/hooks/cleaner.hooks";
import {
  EditJobPayload,
  EditPublishJobPayload,
  FirstStepErrors,
  JobDetails,
  JobFirstStepValues,
  SelectField,
  TextField,
} from "../types/job.type";
import { jobEditFirstStepSchema } from "../types/job.schema";
import {
  EMPTY_ASSIGNMENT_STEP,
  useAssignmentStep,
} from "./useAssignmentStep";
import { useToast } from "@/shared/toast";
import { EMPTY_FIRST_STEP } from "./useCreateJobScreen";
import {
  CHECKLIST_OPTIONS,
  TIME_OPTIONS,
  TIMEZONE_OPTIONS,
  getUserUtcHourOffset,
} from "../utils/job-form-options";

const msToDateString = (ms: number) => {
  const date = new Date(ms);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const msToTimeString = (ms: number) => {
  const date = new Date(ms);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export type EditStep = "details" | "conditions" | "checklist";

// There's no "published" status to go by, so a job with no cleaner on it is
// treated as published — open for cleaners to claim rather than assigned.
const isPublishedJob = (job: JobDetails) => !job.cleaner_id?.trim();

export const useEditJobScreen = () => {
  const params = useParams<{ id: string }>();
  const jobId = Number(params.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { data: job, isLoading: isJobLoading } = useJob(jobId, !Number.isNaN(jobId));
  const { data: sites } = useSites();
  const { data: approvedCleaners } = useApprovedCleaners({ page: 1, size: 100 });

  const [step, setStep] = useState<EditStep>("details");
  const assignment = useAssignmentStep();
  const [firstStepValues, setFirstStepValues] = useState<JobFirstStepValues>(EMPTY_FIRST_STEP);
  const [firstStepErrors, setFirstStepErrors] = useState<FirstStepErrors>({});
  const [checklist, setChecklist] = useState<string[]>([]);
  const [checklistError, setChecklistError] = useState<string | undefined>();
  const [isSeeded, setIsSeeded] = useState(false);
  const hasSeeded = useRef(false);

  const isPublished = job ? isPublishedJob(job) : false;

  const siteOptions = useMemo(
    () =>
      (sites ?? []).map((site) => ({
        label: site.site_name,
        value: String(site.site_id),
      })),
    [sites],
  );

  // Seeds the form once, as soon as the job and sites have both loaded.
  // site_id isn't in the job-details response (only site_name), so it's
  // recovered by matching against the sites list. timezone isn't in the
  // response at all, so it falls back to the browser's current offset for
  // the admin to re-confirm. Checklist entries come back as label text, not
  // the slug IDs the payload expects, so selection is restored by matching
  // label text against the static checklist options.
  useEffect(() => {
    if (hasSeeded.current) return;
    if (!job || !sites) return;

    const matchedSite = sites.find((site) => site.site_name === job.site_name);

    setFirstStepValues({
      cleaningSite: matchedSite ? String(matchedSite.site_id) : "",
      jobPay: String(job.job_amount),
      cleanerPay: String(job.payout_amount),
      consumables: job.items_needed_provided ? "" : job.items_needed,
      consumablesProvidedByCustomer: job.items_needed_provided,
      date: msToDateString(job.scheduled_start),
      startTime: msToTimeString(job.scheduled_start),
      endTime: msToTimeString(job.scheduled_end),
      timezone: String(getUserUtcHourOffset()),
    });

    // A job keeps whichever type it already is: published (no cleaner yet,
    // so only its claim deadline and radius, which the details response
    // doesn't include, are re-entered) or assigned (its current cleaner).
    assignment.setValues({
      ...EMPTY_ASSIGNMENT_STEP,
      assignmentType: isPublishedJob(job) ? "publish" : "assign",
      assignedCleaner: job.cleaner_id,
    });

    // checklist entries come back keyed by the same slug IDs used in
    // CHECKLIST_OPTIONS (confirmed against the real API response), not
    // display text, so selection is restored by matching IDs directly.
    const checkedIds = new Set(
      job.checklist.filter((entry) => entry.checked).map((entry) => entry.item),
    );
    setChecklist(
      CHECKLIST_OPTIONS.filter((option) => checkedIds.has(option.id)).map(
        (option) => option.id,
      ),
    );

    hasSeeded.current = true;
    setIsSeeded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job, sites]);

  const onJobUpdated = () => {
    addToast({
      variant: "success",
      title: "Job updated",
      description: "The job was updated successfully.",
    });
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    router.push(`/jobs/${jobId}`);
  };

  const onJobUpdateFailed = (e: any) => {
    const detail = e?.response?.data?.detail;
    const message =
      typeof detail === "string" && detail
        ? detail
        : "Something went wrong. Please try again.";

    addToast({
      variant: "error",
      title: "Could not update job",
      description: message,
    });
  };

  // An assigned job and a published one are edited through different
  // endpoints with different payloads.
  const { mutate: editMutate, isPending: isEditing } = useEditJob(
    onJobUpdated,
    onJobUpdateFailed,
  );
  const { mutate: editPublishMutate, isPending: isEditingPublished } =
    useEditPublishJob(onJobUpdated, onJobUpdateFailed);
  const isPending = isEditing || isEditingPublished;

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
    const result = jobEditFirstStepSchema.safeParse(firstStepValues);

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

    setStep("conditions");
  };

  const handleConditionsContinue = () => {
    if (assignment.validate()) setStep("checklist");
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

    const consumables = firstStepValues.consumablesProvidedByCustomer
      ? ""
      : firstStepValues.consumables;

    if (isPublished) {
      const payload: EditPublishJobPayload = {
        job_id: jobId,
        site_id: Number(firstStepValues.cleaningSite),
        job_pay: Number(firstStepValues.jobPay),
        cleaners_pay: Number(firstStepValues.cleanerPay),
        consumables,
        consumables_provided: firstStepValues.consumablesProvidedByCustomer,
        job_date: firstStepValues.date,
        start_time: firstStepValues.startTime,
        end_time: firstStepValues.endTime,
        deadline_date: assignment.values.deadlineDate,
        deadline_time: assignment.values.deadlineTime,
        timezone: Number(firstStepValues.timezone),
        radius: Number(assignment.values.eligibleRadius),
        checklist,
      };
      editPublishMutate(payload);
      return;
    }

    const payload: EditJobPayload = {
      job_id: jobId,
      site_id: Number(firstStepValues.cleaningSite),
      job_pay: Number(firstStepValues.jobPay),
      cleaners_pay: Number(firstStepValues.cleanerPay),
      consumables,
      consumables_provided: firstStepValues.consumablesProvidedByCustomer,
      job_date: firstStepValues.date,
      start_time: firstStepValues.startTime,
      end_time: firstStepValues.endTime,
      timezone: Number(firstStepValues.timezone),
      assigned_cleaner_id: Number(assignment.values.assignedCleaner),
      checklist,
    };

    editMutate(payload);
  };

  const handleCancel = () => router.push(`/jobs/${jobId}`);

  return {
    isLoading: isJobLoading || !isSeeded,
    jobIdLabel: job?.job_id_label,
    step,
    isPublished,
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
    assignmentStepValues: assignment.values,
    assignmentStepErrors: assignment.errors,
    handleDeadlineDateChange: assignment.handleDeadlineDateChange,
    handleDeadlineTimeChange: assignment.handleDeadlineTimeChange,
    handleEligibleRadiusChange: assignment.handleEligibleRadiusChange,
    handleAssignedCleanerChange: assignment.handleAssignedCleanerChange,
    handleConditionsContinue,
    toggleChecklistItem,
    handleSave,
    handleCancel,
  };
};
