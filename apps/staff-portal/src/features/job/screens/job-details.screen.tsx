"use client";
import { PageBack } from "@/shared/ui/page-back";
import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { useState, type Dispatch, type SetStateAction } from "react";
import { JobId } from "../components/job-id";
import { JobStatus } from "../components/job-status";
import { JobLocation } from "../components/job-location";
import { JobUniform } from "../components/job-uniform";
import { JobTimer } from "../components/job-timer";
import { InfoIcon, JobIcon2 } from "@resonance/ui/icons";
import { JobPictureWrapper } from "../components/job-picture-wrapper";
import { JobImageAddMore } from "../components/job-image-add-more";
import { JobRequirement } from "../components/job-requirement";
import { JobType } from "../types/job.types";
import { JobMapLocation } from "../components/job-map-location";
import { JobClockAction } from "../components/job-clock-action";
import { JobMoreInformation } from "../components/job-more-information";
import { JobConsumable } from "../components/job-consumable";
import { JobSop } from "../components/job-sop";
import { JobQualityScore } from "../components/job-quality-score";
import { JobClockingInformation } from "../components/job-clocking-information";
import { CannotClockOut } from "../components/modal/cannot-clockout";

const INITIAL_SLOTS = 4;
const MAX_SLOTS = 8;
// TODO: replace with the real job id once this screen fetches job data instead of using mock content.
const MOCK_JOB_ID = 5;

export const JobDetailsScreen = () => {
  const [status, setStatus] = useState<JobType>("scheduled");
  const [beforePhotos, setBeforePhotos] = useState<(File | null)[]>(
    Array(INITIAL_SLOTS).fill(null),
  );
  const [afterPhotos, setAfterPhotos] = useState<(File | null)[]>(
    Array(INITIAL_SLOTS).fill(null),
  );

  const updatePhoto = (
    setter: Dispatch<SetStateAction<(File | null)[]>>,
    index: number,
    file: File | null,
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? file : item)));
  };

  const addSlot = (setter: Dispatch<SetStateAction<(File | null)[]>>) => {
    setter((prev) => (prev.length >= MAX_SLOTS ? prev : [...prev, null]));
  };

  return (
    <Container className="pb-4">
      <Container className="flex items-center gap-2.5 pb-5 mb-3">
        <PageBack />
        <Text tone="secondary" variant="h4">
          JOB-1234
        </Text>
      </Container>
      <Row gutter={24}>
        <Col xs={16}>
          <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
            <Container className="flex items-center justify-between">
              <Text variant="h3" tone="primary">
                Northgate Office - Floor 3
              </Text>
              <Container className="flex items-center gap-2">
                <JobId />
                <JobStatus status={status} />
              </Container>
            </Container>
            <Container className="flex items-center justify-between mt-2.5">
              <Container className="flex items-center gap-1.5">
                <JobLocation />
                <Text variant="bodyXSmall" tone="secondary">
                  •
                </Text>
                <JobUniform />
              </Container>
              <JobTimer />
            </Container>
          </Container>
          <Container className="mt-6">
            <Container className="flex items-center gap-2 justify-between">
              <Text tone="primary" variant="bodySmall">
                Before Photo(s)
              </Text>
              <Container className="flex items-center gap-1">
                <InfoIcon className="text-secondary" size={16} />
                <Text variant="bodyXSmall" tone="secondary">
                  Submit photos of the site before cleaning
                </Text>
              </Container>
            </Container>
            <Container className="pt-2.5">
              <Container className="bg-surface p-2 rounded-xl">
                <Row gutter={[10, 10]}>
                  {beforePhotos.map((file, index) => (
                    <Col xs={8} key={index}>
                      <JobPictureWrapper
                        status={status}
                        file={file}
                        onChange={(f) => updatePhoto(setBeforePhotos, index, f)}
                        jobId={MOCK_JOB_ID}
                        direction={1}
                      />
                    </Col>
                  ))}
                  {status !== "under-review" &&
                    status !== "paid" &&
                    beforePhotos.length < MAX_SLOTS && (
                      <Col xs={8} className="opacity-30">
                        <JobImageAddMore
                          status={status}
                          onClick={() => addSlot(setBeforePhotos)}
                        />
                      </Col>
                    )}
                </Row>
              </Container>
            </Container>
          </Container>
          <Container className="mt-6">
            <Container className="flex items-center gap-2 justify-between">
              <Text tone="primary" variant="bodySmall">
                After Photo(s)
              </Text>
              <Container className="flex items-center gap-1">
                <InfoIcon className="text-secondary" size={16} />
                <Text variant="bodyXSmall" tone="secondary">
                  Submit photos of the site after cleaning
                </Text>
              </Container>
            </Container>
            <Container className="pt-2.5">
              <Container className="bg-surface p-2 rounded-xl">
                <Row gutter={[10, 10]}>
                  {afterPhotos.map((file, index) => (
                    <Col xs={8} key={index}>
                      <JobPictureWrapper
                        status={status}
                        file={file}
                        onChange={(f) => updatePhoto(setAfterPhotos, index, f)}
                        jobId={MOCK_JOB_ID}
                        direction={2}
                      />
                    </Col>
                  ))}
                  {status !== "under-review" &&
                    status !== "paid" &&
                    afterPhotos.length < MAX_SLOTS && (
                      <Col xs={8} className="opacity-30">
                        <JobImageAddMore
                          status={status}
                          onClick={() => addSlot(setAfterPhotos)}
                        />
                      </Col>
                    )}
                </Row>
              </Container>
            </Container>
          </Container>
          <Container className="mt-6">
            <Container className="flex items-center gap-2 justify-between">
              <Text tone="primary" variant="bodySmall">
                Cleaning Checklist
              </Text>
              <Container className="flex items-center gap-1">
                <InfoIcon className="text-secondary" size={16} />
                <Text variant="bodyXSmall" tone="secondary">
                  This checklist confirms job done
                </Text>
              </Container>
            </Container>
            <Container className="pt-2.5">
              <Container className="bg-surface p-4 rounded-xl">
                <Row>
                  <Col xs={10}>
                    <Container className="flex items-center justify-center flex-col gap-2 h-full ">
                      <Container className="h-41.25 w-41.25 rounded-full bg-brand-bg-light"></Container>
                      <Container className="flex items-center gap-2">
                        <JobIcon2 className="text-primary" size={20} />
                        <Text variant="bodyXSmall" tone="primary">
                          Job Done
                        </Text>
                      </Container>
                    </Container>
                  </Col>
                  <Col xs={14}>
                    <Container className="flex items-center gap-2.5 flex-col">
                      <JobRequirement label="Clean lobby glass" />
                      <JobRequirement label="Vacuum hallway carpet" />
                      <JobRequirement label="Polish lift interior" />
                      <JobRequirement label="Dust all artificial flowers" />
                      <JobRequirement label="Clean coffee stain on reception couch" />
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Container>
          </Container>
        </Col>
        <Col xs={8}>
          <Container className="flex flex-col gap-2.5">
            {status === "paid" && <JobQualityScore />}
            <JobMapLocation />
            {status !== "under-review" && status !== "paid" && (
              <JobClockAction
                status={status === "in-progress" ? "clock-out" : "clock-in"}
              />
            )}

            <Container className="pt-4 flex flex-col gap-4">
              {status !== "pending" && <JobClockingInformation />}
              <JobMoreInformation />
              <JobConsumable />
              <JobSop />
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
