"use client";

import { PageBack } from "@/shared/ui/page-back";
import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { InfoIcon, JobIcon2 } from "@resonance/ui/icons";
import { JobId } from "../components/job-id";
import { JobStatus } from "../components/job-status";
import { JobLocation } from "../components/job-location";
import { JobUniform } from "../components/job-uniform";
import { JobTimer } from "../components/job-timer";
import { JobPhotoView } from "../components/job-photo-view";
import { JobChecklistItem } from "../components/job-checklist-item";
import { JobAssignedCleaner } from "../components/job-assigned-cleaner";
import { JobMapLocation } from "../components/job-map-location";
import { JobDamages } from "../components/job-damages";
import { JobDamagesListModal } from "../components/modal/job-damages-list-modal";
import { JobDamageDetailModal } from "../components/modal/job-damage-detail-modal";
import { JobControl } from "../components/job-control";
import { RateJobModal } from "../components/modal/rate-job-modal";
import { ViewRatingModal } from "../components/modal/view-rating-modal";
import { JobClockingInformation } from "../components/job-clocking-information";
import { JobMoreInformation } from "../components/job-more-information";
import { JobConsumable } from "../components/job-consumable";
import { useJobDetailsScreen } from "../hooks/useJobDetailsScreen";
import { checklistLabelFor } from "../utils/checklist-options";

export const JobDetailsScreen = () => {
  const {
    job,
    isLoading,
    status,
    formatted,
    damagesListOpen,
    openDamagesList,
    closeDamagesList,
    viewingDamage,
    openDamageDetail,
    closeDamageDetail,
    reviewModalOpen,
    openReviewModal,
    closeReviewModal,
    handleReviewJob,
    isReviewingJob,
    viewRatingModalOpen,
    openViewRatingModal,
    closeViewRatingModal,
    submittedRating,
  } = useJobDetailsScreen();

  if (isLoading || !job || !formatted) {
    return (
      <Container className="pb-4">
        <Text variant="bodySmall" tone="secondary">
          Loading job…
        </Text>
      </Container>
    );
  }

  const beforeSlotCount = Math.max(job.before_images.length, 1);
  const afterSlotCount = Math.max(job.after_images.length, 1);

  return (
    <Container className="pb-4">
      <Container className="flex items-center gap-2.5 pb-5 mb-3">
        <PageBack />
        <Text tone="secondary" variant="h4">
          {job.job_id_label}
        </Text>
      </Container>
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
                  {job.before_images.length === 0 ? (
                    <Col xs={8}>
                      <JobPhotoView />
                    </Col>
                  ) : (
                    Array.from({ length: beforeSlotCount }).map((_, index) => (
                      <Col xs={8} key={index}>
                        <JobPhotoView imageUrl={job.before_images[index]?.image} />
                      </Col>
                    ))
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
                  Photos of the site after cleaning
                </Text>
              </Container>
            </Container>
            <Container className="pt-2.5">
              <Container className="bg-surface p-2 rounded-xl">
                <Row gutter={[10, 10]}>
                  {job.after_images.length === 0 ? (
                    <Col xs={8}>
                      <JobPhotoView />
                    </Col>
                  ) : (
                    Array.from({ length: afterSlotCount }).map((_, index) => (
                      <Col xs={8} key={index}>
                        <JobPhotoView imageUrl={job.after_images[index]?.image} />
                      </Col>
                    ))
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
                      {job.checklist.length === 0 ? (
                        <Text variant="bodyXSmall" tone="secondary">
                          No checklist items yet.
                        </Text>
                      ) : (
                        job.checklist.map((entry, index) => (
                          <JobChecklistItem
                            key={`${entry.item}-${index}`}
                            label={checklistLabelFor(entry.item)}
                            checked={entry.checked}
                          />
                        ))
                      )}
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
              status={status}
              hasRated={!!submittedRating}
              onReview={openReviewModal}
              onViewRating={openViewRatingModal}
            />
            <JobAssignedCleaner
              cleanerName={job.cleaner_name}
              cleanerId={job.cleaner_id}
            />
            <JobMapLocation
              address={job.address}
              lat={job.cleaning_location.lat}
              lng={job.cleaning_location.lng}
            />
            <JobDamages count={job.damages.length} onClick={openDamagesList} />

            <Container className="pt-4 flex flex-col gap-4">
              {status !== "pending" && status !== "scheduled" && (
                <JobClockingInformation
                  checkInTime={formatted.checkInTime}
                  checkOutTime={formatted.checkOutTime}
                  timeTaken={formatted.checkDuration}
                />
              )}
              <JobMoreInformation
                siteName={job.site_name}
                jobIdLabel={job.job_id_label}
                jobType={job.job_type}
                jobDate={formatted.jobDate}
                jobTime={formatted.jobTime}
                duration={formatted.duration}
                payout={formatted.payout}
              />
              <JobConsumable
                itemsNeeded={job.items_needed}
                itemsProvided={job.items_needed_provided}
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

      <RateJobModal
        isOpen={reviewModalOpen}
        onClose={closeReviewModal}
        onSubmit={handleReviewJob}
        isPending={isReviewingJob}
      />

      <ViewRatingModal
        isOpen={viewRatingModalOpen}
        onClose={closeViewRatingModal}
        star={submittedRating?.star ?? 0}
        feedback={submittedRating?.feedback ?? ""}
      />
    </Container>
  );
};
