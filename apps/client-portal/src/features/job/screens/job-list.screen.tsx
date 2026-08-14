"use client";

import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { useState } from "react";
import { Job } from "../types/job.types";
import { JobCard } from "../components/job-card";
import { JobHistoryPill } from "../components/job-history-pill";
import { useJobListScreen } from "../hooks/useJobListScreen";

type JobTab = "all" | "history";

const JobGrid = ({ jobs }: { jobs: Job[] }) => (
  <Row gutter={20}>
    {jobs.map((job) => (
      <Col lg={8} xs={24} key={job.job_id}>
        <JobCard job={job} />
      </Col>
    ))}
  </Row>
);

export const JobListScreen = () => {
  const [activeTab, setActiveTab] = useState<JobTab>("all");
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
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full cursor-pointer text-center lg:w-auto w-full transition-all ${
              activeTab === "all"
                ? "border border-brand-secondary-border bg-brand-tertiary-bg-light"
                : ""
            }`}
          >
            <Text
              variant="buttonXS"
              className={
                activeTab === "all" ? "text-primary" : "text-secondary"
              }
            >
              All Jobs
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

      {!isLoading && activeTab === "all" && (
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
