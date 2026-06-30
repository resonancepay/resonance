"use client";

import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { useState } from "react";
import { JobCard } from "../components/job-card";
import { JobHistoryPill } from "../components/job-history-pill";

type JobTab = "all" | "history";

export const JobListScreen = () => {
  const [activeTab, setActiveTab] = useState<JobTab>("all");

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
      {activeTab === "all" && (
        <>
          <Container className="mt-7 bg-brand-secondary-bg-light mb-2.5 px-3 py-2 rounded-lg">
            <Text variant="h5" className="text-primary">
              Today&apos;s Job
            </Text>
          </Container>
          <Container>
            <Row gutter={20}>
              <Col lg={8} xs={24}>
                <JobCard status="pending" />
              </Col>
              <Col lg={8} xs={24}>
                <JobCard status="in-progress" />
              </Col>
              <Col lg={8} xs={24}>
                <JobCard status="under-review" />
              </Col>
              <Col lg={8} xs={24}>
                <JobCard status="paid" />
              </Col>
              <Col lg={8} xs={24}>
                <JobCard status="paid" />
              </Col>
              <Col lg={8} xs={24}>
                <JobCard status="paid" />
              </Col>
            </Row>
          </Container>
          <Container className="mt-6">
            <Container className="bg-brand-bg-light px-3 py-2 mb-2.5 rounded-lg">
              <Text tone="primary" variant="h5">
                Tomorrow&apos;s Job
              </Text>
            </Container>
            <Container>
              <Row gutter={20}>
                <Col lg={8} xs={24}>
                  <JobCard status="scheduled" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="scheduled" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="scheduled" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="scheduled" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="scheduled" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="scheduled" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="scheduled" />
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
      {activeTab === "history" && (
        <>
          <Container className="flex items-center gap-2">
            <JobHistoryPill label="All" />
            <JobHistoryPill label="Last 7 days" />
            <JobHistoryPill label="Last Month" />
          </Container>
          <Container className="mt-7 bg-brand-secondary-bg-light mb-2.5 px-3 py-2 rounded-lg">
            <Text variant="h5" className="text-primary">
              Yesterday
            </Text>
          </Container>
          <Container>
            <Row gutter={20}>
              <Col lg={8} xs={24}>
                <JobCard status="paid" />
              </Col>
              <Col lg={8} xs={24}>
                <JobCard status="paid" />
              </Col>
              <Col lg={8} xs={24}>
                <JobCard status="paid" />
              </Col>
            </Row>
          </Container>
          <Container className="mt-6">
            <Container className="bg-brand-bg-light px-3 py-2 mb-2.5 rounded-lg">
              <Text tone="primary" variant="h5">
                June 2, 2026
              </Text>
            </Container>
            <Container>
              <Row gutter={20}>
                <Col lg={8} xs={24}>
                  <JobCard status="paid" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="paid" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="paid" />
                </Col>
                <Col lg={8} xs={24}>
                  <JobCard status="paid" />
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
    </Container>
  );
};
