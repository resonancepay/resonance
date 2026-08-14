import { z } from "zod";

// Local (not UTC) today, as YYYY-MM-DD — matches the job_date format the API
// expects, so it can be compared against the form's date field with a plain
// string comparison, and reused as the date picker's `min`.
export const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const jobFirstStepBaseSchema = z.object({
  cleaningSite: z.string().min(1, "Cleaning site is required"),
  jobPay: z.string().min(1, "Job pay is required"),
  cleanerPay: z.string().min(1, "Cleaner's pay is required"),
  consumables: z.string(),
  consumablesProvidedByCustomer: z.boolean(),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  cleaner: z.string().min(1, "Cleaner is required"),
  timezone: z.string().min(1, "Timezone is required"),
});

const withConsumablesRefine = <T extends typeof jobFirstStepBaseSchema>(schema: T) =>
  schema.refine(
    (data) =>
      data.consumablesProvidedByCustomer || data.consumables.trim().length > 0,
    {
      message: "Consumables are required unless provided by customer",
      path: ["consumables"],
    },
  );

export const jobFirstStepSchema = withConsumablesRefine(jobFirstStepBaseSchema).refine(
  (data) => !data.date || data.date >= getTodayDateString(),
  {
    message: "Date cannot be in the past",
    path: ["date"],
  },
);

// Editing a job doesn't re-apply the "date cannot be in the past" rule from
// create — the job being edited may already be scheduled for a date that's
// since passed, and that alone shouldn't block editing its other fields.
export const jobEditFirstStepSchema = withConsumablesRefine(jobFirstStepBaseSchema);

export type JobFirstStepSchema = z.infer<typeof jobFirstStepSchema>;
