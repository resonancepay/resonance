import { useGetJobs } from "./jobs.hook";
import { Job } from "../types/job.types";

const startOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const isSameDay = (a: Date, b: Date) => a.getTime() === b.getTime();

// GET /jobs returns no status/date filter (just page/size), so "today" /
// "tomorrow" / "history" buckets are derived client-side from
// scheduled_start rather than fetched separately.
export const useJobListScreen = () => {
  const { data, isLoading, isError } = useGetJobs();
  const jobs = data ?? [];

  const today = startOfDay(new Date());
  const tomorrow = startOfDay(new Date(today.getTime() + 24 * 60 * 60 * 1000));

  const jobDay = (job: Job) => startOfDay(new Date(job.scheduled_start));

  const todayJobs = jobs.filter((job) => isSameDay(jobDay(job), today));
  const tomorrowJobs = jobs.filter((job) => isSameDay(jobDay(job), tomorrow));
  const laterJobs = jobs.filter((job) => jobDay(job) > tomorrow);
  const historyJobs = jobs.filter((job) => jobDay(job) < today);

  return {
    isLoading,
    isError,
    todayJobs,
    tomorrowJobs,
    laterJobs,
    historyJobs,
  };
};
