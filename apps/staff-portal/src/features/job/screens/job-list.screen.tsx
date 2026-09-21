"use client";

import { Container, Text } from "@resonance/ui";
import { useState } from "react";
import { JobTab } from "../types/job.types";
import { JobGrid } from "../components/job-grid";
import { JobHistoryPill } from "../components/job-history-pill";
import { useJobListScreen } from "../hooks/useJobListScreen";

export const JobListScreen = () => {
  const [activeTab, setActiveTab] = useState<JobTab>("open");
  const { isLoading, todayJobs, tomorrowJobs, laterJobs, historyJobs } =
    useJobListScreen();

  return (
    <Container>
      <Container className="flex lg:flex-row flex-col lg:items-center justify-between">
        <Text variant="h3" className="text-primary lg:mb-0 mb-5">
          Jobs
        </Text>
        <Container className="border-[0.5px] border-border p-1 rounded-full flex bg-surface">
          <Container
            onClick={() => setActiveTab("open")}
            className={`px-4 py-2 rounded-full cursor-pointer text-center lg:w-auto w-full transition-all ${
              activeTab === "open"
                ? "border border-brand-secondary-border bg-brand-tertiary-bg-light"
                : ""
            }`}
          >
            <Text
              variant="buttonXS"
              className={
                activeTab === "open" ? "text-primary" : "text-secondary"
              }
            >
              Open Jobs
            </Text>
          </Container>
          <Container
            onClick={() => setActiveTab("assigned")}
            className={`px-4 py-2 rounded-full cursor-pointer text-center lg:w-auto w-full transition-all ${
              activeTab === "assigned"
                ? "border border-brand-secondary-border bg-brand-tertiary-bg-light"
                : ""
            }`}
          >
            <Text
              variant="buttonXS"
              className={
                activeTab === "assigned" ? "text-primary" : "text-secondary"
              }
            >
              Assigned Jobs
            </Text>
          </Container>
          <Container
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-full cursor-pointer text-center lg:w-auto w-full transition-all ${
              activeTab === "history"
                ? "border border-brand-secondary-border bg-brand-tertiary-bg-light"
                : ""
            }`}
          >
            <Text
              variant="buttonXS"
              className={
                activeTab === "history" ? "text-primary" : "text-secondary"
              }
            >
              Job History
            </Text>
          </Container>
        </Container>
      </Container>

      {isLoading && (
        <Text variant="bodySmall" tone="secondary" className="mt-7">
          Loading jobs…
        </Text>
      )}

      {!isLoading && activeTab === "assigned" && (
        <>
          {todayJobs.length === 0 &&
            tomorrowJobs.length === 0 &&
            laterJobs.length === 0 && (
              <Text variant="bodySmall" tone="secondary" className="mt-7">
                No jobs scheduled.
              </Text>
            )}

          {todayJobs.length > 0 && (
            <>
              <Container className="mt-7 bg-brand-secondary-bg-light mb-2.5 px-3 py-2 rounded-lg">
                <Text variant="h5" className="text-primary">
                  Today&apos;s Job
                </Text>
              </Container>
              <JobGrid jobs={todayJobs} />
            </>
          )}

          {tomorrowJobs.length > 0 && (
            <Container className="mt-6">
              <Container className="bg-brand-bg-light px-3 py-2 mb-2.5 rounded-lg">
                <Text tone="primary" variant="h5">
                  Tomorrow&apos;s Job
                </Text>
              </Container>
              <JobGrid jobs={tomorrowJobs} />
            </Container>
          )}

          {laterJobs.length > 0 && (
            <Container className="mt-6">
              <Container className="bg-muted px-3 py-2 mb-2.5 rounded-lg">
                <Text tone="primary" variant="h5">
                  Upcoming Jobs
                </Text>
              </Container>
              <JobGrid jobs={laterJobs} />
            </Container>
          )}
        </>
      )}

      {!isLoading && activeTab === "history" && (
        <>
          <Container className="flex items-center gap-2">
            <JobHistoryPill label="All" />
            <JobHistoryPill label="Last 7 days" />
            <JobHistoryPill label="Last Month" />
          </Container>

          {historyJobs.length === 0 ? (
            <Text variant="bodySmall" tone="secondary" className="mt-7">
              No past jobs.
            </Text>
          ) : (
            <Container className="mt-7">
              <JobGrid jobs={historyJobs} />
            </Container>
          )}
        </>
      )}
    </Container>
  );
};
