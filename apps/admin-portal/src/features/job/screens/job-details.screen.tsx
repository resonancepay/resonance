"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container, Text } from "@resonance/ui";
import { InfoIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import { useState } from "react";
import { JobAssignedCleaner } from "../components/job-assigned-cleaner";
import { JobChecklistItem } from "../components/job-checklist-item";
import { JobChecklistProgress } from "../components/job-checklist-progress";
import { JobConsumables } from "../components/job-consumables";
import { JobControl } from "../components/job-control";
import { JobId } from "../components/job-id";
import { JobLocation } from "../components/job-location";
import { JobMoreInformation } from "../components/job-more-information";
import { JobPhotoSlot } from "../components/job-photo-slot";
import { JobStatus } from "../components/job-status";
import { JobTimer } from "../components/job-timer";
import { JobUniform } from "../components/job-uniform";

const PHOTO_SLOTS = 6;

const CHECKLIST_ITEMS = [
  "Clean lobby glass",
  "Vacuum hallway carpet",
  "Polish lift interior",
  "Dust all artificial flowers",
  "Clean coffee stain on reception couch",
];

export const JobDetailsScreen = () => {
  useSetBreadcrumb(
    [
      { label: "Jobs", href: "/jobs" },
      { label: "Job-1234", href: "/jobs" },
    ],
    "Job-1234",
  );

  const [checked, setChecked] = useState<boolean[]>(
    Array(CHECKLIST_ITEMS.length).fill(false),
  );

  const toggleChecked = (index: number, value: boolean) => {
    setChecked((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const completedCount = checked.filter(Boolean).length;
  const percentage = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <Container className="pb-4">
      <Row gutter={24}>
        <Col xs={16}>
          <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
            <Container className="flex items-center justify-between">
              <Text variant="h3" tone="primary">
                Northgate Office - Floor 3
              </Text>
              <Container className="flex items-center gap-2">
                <JobId jobId="JOB-1234" />
                <JobStatus status="scheduled" />
              </Container>
            </Container>
            <Container className="flex items-center justify-between mt-2.5">
              <Container className="flex items-center gap-1.5">
                <JobLocation address="12 Northgate Rd, London EC1" />
                <Text variant="bodyXSmall" tone="secondary">
                  •
                </Text>
                <JobUniform uniform="Navy uniform, rubber gloves" />
              </Container>
              <JobTimer timeRange="08:00 - 10:30" />
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
                  Photos of the site before cleaning
                </Text>
              </Container>
            </Container>
            <Container className="pt-2.5">
              <Container className="bg-surface p-2 rounded-xl">
                <Row gutter={[10, 10]}>
                  {Array.from({ length: PHOTO_SLOTS }).map((_, index) => (
                    <Col xs={8} key={index}>
                      <JobPhotoSlot />
                    </Col>
                  ))}
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
                  Photos of the site after cleaning
                </Text>
              </Container>
            </Container>
            <Container className="pt-2.5">
              <Container className="bg-surface p-2 rounded-xl">
                <Row gutter={[10, 10]}>
                  {Array.from({ length: PHOTO_SLOTS }).map((_, index) => (
                    <Col xs={8} key={index}>
                      <JobPhotoSlot />
                    </Col>
                  ))}
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
                    <JobChecklistProgress percentage={percentage} />
                  </Col>
                  <Col xs={14}>
                    <Container className="flex items-center gap-2.5 flex-col">
                      {CHECKLIST_ITEMS.map((label, index) => (
                        <JobChecklistItem
                          key={label}
                          label={label}
                          checked={checked[index]}
                          onChange={(value) => toggleChecked(index, value)}
                        />
                      ))}
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Container>
          </Container>
        </Col>

        <Col xs={8}>
          <Container className="flex flex-col gap-2.5">
            <JobControl />

            <Container className="pt-4 flex flex-col gap-4">
              <JobAssignedCleaner cleanerName="Mary Abam" cleanerId="CL-001" />
              <JobMoreInformation
                cleaningSite="Northgate Office - Floor 3"
                clientName="Samuel Nwanze"
                clientEmail="micheal@mail.com"
                jobId="JOB-1234"
                jobType="Office"
                jobDate="Thur 24, Jun 2026"
                jobTime="08:00"
                duration="02 Hours 30 Minutes"
                jobPay="£180.00"
                cleanerPay="£80.56"
              />
              <JobConsumables
                availability="Provided"
                itemsNeeded="Glass cleaner, Bleach, Detergent, Dissolver."
              />
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
