"use client";
import { Container, Text } from "@resonance/ui";
import { useProfileScreen } from "../hooks/useProfileScreen";
import { Col, Row } from "antd";
import { ProfileBanner } from "../components/profile-banner";
import { AccountInformation } from "../components/account-information";
import { AvailabilityBanner } from "../components/availability-banner";
import { LocationBanner } from "../components/location-banner";
import { JobRecord } from "../components/job-record";
import { AccountSetting } from "../components/account-setting";
import { ChangePasswordModal } from "../components/modal/change-password-modal";
import { DeleteAccountModal } from "../components/modal/delete-account-modal";
import { SetupAvailabilityModal } from "../components/modal/setup-availability-modal";

export const ProfileScreen = () => {
  const {
    fullName,
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    statusTag,
    availability,
    serviceLocation,
    changePasswordOpen,
    openChangePassword,
    closeChangePassword,
    handleChangePassword,
    isChangingPassword,
    deleteAccountOpen,
    openDeleteAccount,
    closeDeleteAccount,
    handleDeleteAccount,
    isDeletingAccount,
    availabilityOpen,
    openAvailability,
    closeAvailability,
    handleSaveAvailability,
    isSavingAvailability,
    handleRemoveAvailability,
    isRemovingAvailability,
    availabilityDraft,
  } = useProfileScreen();

  return (
    <Container>
      <Text variant="h3" className="text-primary mb-7">
        Personal Profile
      </Text>

      <Row gutter={[24, 16]}>
        <Col xs={24} lg={16}>
          <Container className="flex-col flex gap-4">
            <ProfileBanner fullName={fullName} email={email} statusTag={statusTag} />
            <AccountInformation
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              dateOfBirth={dateOfBirth}
              statusTag={statusTag}
            />
            <AvailabilityBanner
              availability={availability}
              onEditClick={openAvailability}
            />
            <LocationBanner serviceLocation={serviceLocation} />
          </Container>
        </Col>
        <Col xs={24} lg={8}>
          <Container className="flex-col gap-4 flex">
            <JobRecord />
            <AccountSetting
              onChangePasswordClick={openChangePassword}
              onDeleteAccountClick={openDeleteAccount}
            />
          </Container>
        </Col>
      </Row>

      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={closeChangePassword}
        onSubmit={handleChangePassword}
        isPending={isChangingPassword}
      />

      <DeleteAccountModal
        isOpen={deleteAccountOpen}
        onClose={closeDeleteAccount}
        onConfirm={handleDeleteAccount}
        isPending={isDeletingAccount}
      />

      <SetupAvailabilityModal
        isOpen={availabilityOpen}
        onClose={closeAvailability}
        onSubmit={handleSaveAvailability}
        onRemoveExisting={handleRemoveAvailability}
        initialEntries={availabilityDraft}
        isPending={isSavingAvailability}
        isRemoving={isRemovingAvailability}
      />
    </Container>
  );
};
