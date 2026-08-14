"use client";
import { PageBack } from "@/shared/ui/page-back";
import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { InfoIcon } from "@resonance/ui/icons";
import { JobId } from "../components/job-id";
import { JobStatus } from "../components/job-status";
import { JobLocation } from "../components/job-location";
import { JobUniform } from "../components/job-uniform";
import { JobTimer } from "../components/job-timer";
import { JobPictureWrapper } from "../components/job-picture-wrapper";
import { JobImageAddMore } from "../components/job-image-add-more";
import { JobRequirement } from "../components/job-requirement";
import { JobMapLocation } from "../components/job-map-location";
import { JobClockAction } from "../components/job-clock-action";
import { JobDamages } from "../components/job-damages";
import { JobMoreInformation } from "../components/job-more-information";
import { JobConsumable } from "../components/job-consumable";
import { JobSop } from "../components/job-sop";
import { JobQualityScore } from "../components/job-quality-score";
import { JobClockingInformation } from "../components/job-clocking-information";
import { JobChecklistProgress } from "../components/job-checklist-progress";
import { CannotClockOut } from "../components/modal/cannot-clockout";
import { ClockingIn } from "../components/modal/clocking-in";
import { ClockedIn } from "../components/modal/clocked-in";
import { NotAtCleaningSiteModal } from "../components/modal/not-at-cleaning";
import { CouldNotClockInModal } from "../components/modal/could-not-clockin";
import { AboutToClockOut } from "../components/modal/about-to-clockout";
import { ClockingOut } from "../components/modal/clocking-out";
import { ClockedOut } from "../components/modal/clocked-out";
import { ReportDamageModal } from "../components/modal/report-damage-modal";
import { DamagesListModal } from "../components/modal/damages-list-modal";
import { DamageDetailModal } from "../components/modal/damage-detail-modal";
import { useJobDetailsScreen } from "../hooks/useJobDetailsScreen";
import { checklistLabelFor } from "../utils/checklist-options";

const MAX_SLOTS = 8;

export const JobDetailsScreen = () => {
  const {
    jobId,
    job,
    isLoading,
    status,
    isApproved,
    formatted,
    checklist,
    checklistPercentage,
    toggleChecklistItem,
    beforePhotos,
    afterPhotos,
    updatePhoto,
    addSlot,
    clockModal,
    isCheckingIn,
    isCheckingOut,
    handleClockIn,
    handleClockOutClick,
    handleConfirmClockOut,
    closeClockModal,
    seeOtherJobs,
    damagesListOpen,
    openDamagesList,
    closeDamagesList,
    damagesList,
    isLoadingDamages,
    handleDeleteDamage,
    isDeletingDamage,
    reportModalOpen,
    openReportModal,
    closeReportModal,
    handleReportDamage,
    isReportingDamage,
    viewingDamage,
    openDamageDetail,
    closeDamageDetail,
    handleDeleteViewingDamage,
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

  const beforeSlotCount = Math.max(beforePhotos.length, job.before_images.length);
  const afterSlotCount = Math.max(afterPhotos.length, job.after_images.length);
  const checklistLocked =
    status === "pending" || status === "scheduled" || isApproved;

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
                  Submit photos of the site before cleaning
                </Text>
              </Container>
            </Container>
            <Container className="pt-2.5">
              <Container className="bg-surface p-2 rounded-xl">
                <Row gutter={[10, 10]}>
                  {Array.from({ length: beforeSlotCount }).map((_, index) => (
                    <Col xs={8} key={index}>
                      <JobPictureWrapper
                        status={status}
                        file={beforePhotos[index] ?? null}
                        onChange={(f) => updatePhoto("before", index, f)}
                        jobId={jobId}
                        direction={1}
                        existingImageUrl={job.before_images[index]?.image}
                      />
                    </Col>
                  ))}
                  {status !== "under-review" &&
                    status !== "paid" &&
                    !isApproved &&
                    beforePhotos.length < MAX_SLOTS && (
                      <Col xs={8} className="opacity-30">
                        <JobImageAddMore
                          status={status}
                          onClick={() => addSlot("before")}
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
                  {Array.from({ length: afterSlotCount }).map((_, index) => (
                    <Col xs={8} key={index}>
                      <JobPictureWrapper
                        status={status}
                        file={afterPhotos[index] ?? null}
                        onChange={(f) => updatePhoto("after", index, f)}
                        jobId={jobId}
                        direction={2}
                        existingImageUrl={job.after_images[index]?.image}
                      />
                    </Col>
                  ))}
                  {status !== "under-review" &&
                    status !== "paid" &&
                    !isApproved &&
                    afterPhotos.length < MAX_SLOTS && (
                      <Col xs={8} className="opacity-30">
                        <JobImageAddMore
                          status={status}
                          onClick={() => addSlot("after")}
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
                    <JobChecklistProgress percentage={checklistPercentage} />
                  </Col>
                  <Col xs={14}>
                    <Container className="flex items-center gap-2.5 flex-col">
                      {checklist.map((entry, index) => (
                        <JobRequirement
                          key={`${entry.item}-${index}`}
                          label={checklistLabelFor(entry.item)}
                          checked={entry.checked}
                          onChange={(value) => toggleChecklistItem(index, value)}
                          disabled={checklistLocked}
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
            {status === "paid" && <JobQualityScore />}
            <JobMapLocation
              address={job.address}
              lat={job.cleaning_location.lat}
              lng={job.cleaning_location.lng}
            />
            {status !== "under-review" && status !== "paid" && !isApproved && (
              <JobClockAction
                status={status === "in-progress" ? "clock-out" : "clock-in"}
                onClockIn={handleClockIn}
                onClockOut={handleClockOutClick}
                isPending={isCheckingIn || isCheckingOut}
              />
            )}
            <JobDamages count={job.damages.length} onClick={openDamagesList} />

            <Container className="pt-4 flex flex-col gap-4">
              {status !== "pending" && (
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
              <JobSop />
            </Container>
          </Container>
        </Col>
      </Row>

      <ClockingIn isOpen={clockModal === "clocking-in"} onClose={closeClockModal} address={job.address} />
      <ClockedIn isOpen={clockModal === "clocked-in"} onClose={closeClockModal} address={job.address} />
      <NotAtCleaningSiteModal
        isOpen={clockModal === "not-at-site"}
        onClose={closeClockModal}
        onRetry={handleClockIn}
        address={job.address}
      />
      <CouldNotClockInModal
        isOpen={clockModal === "could-not-clock-in"}
        onClose={closeClockModal}
        onRetry={handleClockIn}
        address={job.address}
      />
      <CannotClockOut isOpen={clockModal === "cannot-clock-out"} onClose={closeClockModal} />
      <AboutToClockOut
        isOpen={clockModal === "about-to-clock-out"}
        onClose={closeClockModal}
        onConfirm={handleConfirmClockOut}
        address={job.address}
      />
      <ClockingOut isOpen={clockModal === "clocking-out"} onClose={closeClockModal} address={job.address} />
      <ClockedOut
        isOpen={clockModal === "clocked-out"}
        onClose={closeClockModal}
        onSeeOtherJobs={seeOtherJobs}
      />

      <DamagesListModal
        isOpen={damagesListOpen}
        onClose={closeDamagesList}
        damages={damagesList}
        isLoading={isLoadingDamages}
        onMakeNewReport={openReportModal}
        onViewDamage={openDamageDetail}
        onDelete={handleDeleteDamage}
        isDeleting={isDeletingDamage}
        readOnly={isApproved}
      />

      <DamageDetailModal
        isOpen={!!viewingDamage}
        onClose={closeDamageDetail}
        damage={viewingDamage}
        onDelete={handleDeleteViewingDamage}
        isDeleting={isDeletingDamage}
        readOnly={isApproved}
      />

      <ReportDamageModal
        isOpen={reportModalOpen}
        onClose={closeReportModal}
        onSubmit={handleReportDamage}
        isPending={isReportingDamage}
      />
    </Container>
  );
};
