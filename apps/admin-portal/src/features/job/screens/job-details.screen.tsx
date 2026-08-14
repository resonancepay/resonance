"use client";

import { useSetBreadcrumb } from "@/context/use-set-breadcrumb";
import { Container, Text } from "@resonance/ui";
import { InfoIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { JobAssignedCleaner } from "../components/job-assigned-cleaner";
import { JobChecklistItem } from "../components/job-checklist-item";
import { JobClockingInformation } from "../components/job-clocking-information";
import { JobChecklistProgress } from "../components/job-checklist-progress";
import { JobConsumables } from "../components/job-consumables";
import { JobControl } from "../components/job-control";
import { JobDamages } from "../components/job-damages";
import { JobDamagesListModal } from "../components/modal/job-damages-list-modal";
import { JobDamageDetailModal } from "../components/modal/job-damage-detail-modal";
import { JobPerformanceScore } from "../components/job-performance-score";
import { JobPerformanceModal } from "../components/modal/job-performance-modal";
import { JobId } from "../components/job-id";
import { JobLocation } from "../components/job-location";
import { JobMoreInformation } from "../components/job-more-information";
import { JobPhotoSlot } from "../components/job-photo-slot";
import { JobStatus } from "../components/job-status";
import { JobTimer } from "../components/job-timer";
import { JobUniform } from "../components/job-uniform";
import { useJobDetailsScreen } from "../hooks/useJobDetails";
import { CHECKLIST_OPTIONS } from "../utils/job-form-options";

// checklist entries come back keyed by the same slug IDs used in
// CHECKLIST_OPTIONS, not display text — mapped back to a readable label
// here, falling back to the raw id if it's ever not in the static list.
const checklistLabelFor = (item: string) =>
  CHECKLIST_OPTIONS.find((option) => option.id === item)?.label ?? item;

const MIN_PHOTO_SLOTS = 6;

export const JobDetailsScreen = () => {
  const router = useRouter();
  const {
    jobId,
    job,
    isLoading,
    isApproved,
    checklist,
    percentage,
    formatted,
    damagesListOpen,
    openDamagesList,
    closeDamagesList,
    viewingDamage,
    openDamageDetail,
    closeDamageDetail,
    approveModalOpen,
    openApproveModal,
    closeApproveModal,
    handleApprove,
    isApproving,
    performanceModalOpen,
    openPerformanceModal,
    closePerformanceModal,
  } = useJobDetailsScreen();

  useSetBreadcrumb(
    [
      { label: "Jobs", href: "/jobs" },
      { label: job?.job_id_label ?? "…", href: "/jobs" },
    ],
    job?.job_id_label ?? "…",
  );

  if (isLoading || !job || !formatted) {
    return (
      <Container className="pb-4">
        <Text variant="bodySmall" tone="secondary">
          Loading job…
        </Text>
      </Container>
    );
  }

  const beforeSlots = Math.max(MIN_PHOTO_SLOTS, job.before_images.length);
  const afterSlots = Math.max(MIN_PHOTO_SLOTS, job.after_images.length);

  return (
    <Container className="pb-4">
      <Row gutter={24}>
        <Col xs={16}>
          <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
            <Container className="flex items-center justify-between">
              <Text variant="h3" tone="primary">
                {job.site_name}
              </Text>
              <Container className="flex items-center gap-2">
                <JobId jobId={job.job_id_label} />
                <JobStatus status={job.status} />
              </Container>
            </Container>
            <Container className="flex items-center justify-between mt-2.5">
              <Container className="flex items-center gap-1.5">
                <JobLocation address={job.address} />
                <Text variant="bodyXSmall" tone="secondary">
                  •
                </Text>
                <JobUniform uniform={job.uniform_guidelines} />
              </Container>
              <JobTimer timeRange={formatted.timeRange} />
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
                  {Array.from({ length: beforeSlots }).map((_, index) => (
                    <Col xs={8} key={index}>
                      <JobPhotoSlot src={job.before_images[index]?.image} />
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
                  {Array.from({ length: afterSlots }).map((_, index) => (
                    <Col xs={8} key={index}>
                      <JobPhotoSlot src={job.after_images[index]?.image} />
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
                      {checklist.map((entry, index) => (
                        <JobChecklistItem
                          key={`${entry.item}-${index}`}
                          label={checklistLabelFor(entry.item)}
                          checked={entry.checked}
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
            <JobControl
              status={job.status}
              onEditJob={() => router.push(`/jobs/${jobId}/edit`)}
              approveModalOpen={approveModalOpen}
              onOpenApprove={openApproveModal}
              onCloseApprove={closeApproveModal}
              onApprove={handleApprove}
              isApproving={isApproving}
            />

            {isApproved && (
              <JobPerformanceScore
                percentage={percentage}
                onClick={openPerformanceModal}
              />
            )}

            <JobDamages count={job.damages.length} onClick={openDamagesList} />

            <Container className="pt-4 flex flex-col gap-4">
              <JobAssignedCleaner
                cleanerName={job.cleaner_name}
                cleanerId={job.cleaner_id}
              />
              <JobClockingInformation
                checkInTime={formatted.checkInTime}
                checkOutTime={formatted.checkOutTime}
                timeTaken={formatted.checkDuration}
              />
              <JobMoreInformation
                cleaningSite={job.site_name}
                clientName={job.client_name}
                clientEmail={job.client_email}
                jobId={job.job_id_label}
                jobType={job.job_type}
                jobDate={formatted.jobDate}
                jobTime={formatted.jobTime}
                duration={formatted.duration}
                jobPay={formatted.jobPay}
                cleanerPay={formatted.cleanerPay}
              />
              <JobConsumables
                availability={formatted.availability}
                itemsNeeded={job.items_needed}
              />
            </Container>
          </Container>
        </Col>
      </Row>

      <JobDamagesListModal
        isOpen={damagesListOpen}
        onClose={closeDamagesList}
        damages={job.damages}
        onViewDamage={openDamageDetail}
      />

      <JobDamageDetailModal
        isOpen={!!viewingDamage}
        onClose={closeDamageDetail}
        damage={viewingDamage}
      />

      <JobPerformanceModal
        isOpen={performanceModalOpen}
        onClose={closePerformanceModal}
        checklistCompletion={percentage}
      />
    </Container>
  );
};
