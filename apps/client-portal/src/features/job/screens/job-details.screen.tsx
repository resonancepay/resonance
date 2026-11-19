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
    review,
    hasRated,
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
      {/* Mobile (grid-cols-1): items stack in DOM order — card, sidebar,
          before, after, checklist. md+: explicit placement restores the
          2-column layout, sidebar spanning all 4 main-column rows. One
          copy of every component either way — see staff-portal's
          job-details screen for the same pattern. */}
      <Container className="grid grid-cols-1 gap-y-6 md:grid-cols-[2fr_1fr] md:gap-x-6 md:gap-y-0">
        <Container className="md:col-start-1 md:row-start-1 bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
          <Text variant="h3" tone="primary">
            {job.site_name}
          </Text>
          <Container className="flex flex-col gap-2 mt-2.5">
            <JobLocation address={job.address} />
            <JobUniform uniform={job.uniform_guidelines} />
          </Container>
          <Container className="flex items-center justify-between mt-3">
            <JobTimer timeRange={formatted.timeRange} />
            <Container className="flex items-center gap-2">
              <JobId jobId={job.job_id_label} />
              <JobStatus status={job.status} />
            </Container>
          </Container>
        </Container>

        <Container className="md:col-start-2 md:row-start-1 md:row-span-4 flex flex-col gap-2.5">
          <JobControl
            status={status}
            hasRated={hasRated}
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

        <Container className="md:col-start-1 md:row-start-2">
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
                  <Col xs={12} md={8}>
                    <JobPhotoView />
                  </Col>
                ) : (
                  Array.from({ length: beforeSlotCount }).map((_, index) => (
                    <Col xs={12} md={8} key={index}>
                      <JobPhotoView imageUrl={job.before_images[index]?.image} />
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          </Container>
        </Container>

        <Container className="md:col-start-1 md:row-start-3">
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
                  <Col xs={12} md={8}>
                    <JobPhotoView />
                  </Col>
                ) : (
                  Array.from({ length: afterSlotCount }).map((_, index) => (
                    <Col xs={12} md={8} key={index}>
                      <JobPhotoView imageUrl={job.after_images[index]?.image} />
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          </Container>
        </Container>

        <Container className="md:col-start-1 md:row-start-4">
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
                <Col xs={24} md={10}>
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
                <Col xs={24} md={14}>
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
      </Container>

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
        star={review?.star ?? 0}
        feedback={review?.feedback ?? ""}
      />
    </Container>
  );
};
