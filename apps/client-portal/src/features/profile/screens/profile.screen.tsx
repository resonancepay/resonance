"use client";
import { Container, Text } from "@resonance/ui";
import { Col, Row } from "antd";
import { useProfileScreen } from "../hooks/useProfileScreen";
import { ProfileBanner } from "../components/profile-banner";
import { AccountInformation } from "../components/account-information";
import { JobRecord } from "../components/job-record";
import { AccountSetting } from "../components/account-setting";
import { ChangePasswordModal } from "../components/modal/change-password-modal";
import { DeleteAccountModal } from "../components/modal/delete-account-modal";

export const ProfileScreen = () => {
  const {
    clientName,
    email,
    dateRegistered,
    totalJobs,
    completedJobs,
    statusTag,
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
  } = useProfileScreen();

  return (
    <Container>
      <Text variant="h3" className="text-primary mb-7">
        Personal Profile
      </Text>

      <Row gutter={[24, 16]}>
        <Col xs={24} lg={16}>
          <Container className="flex-col flex gap-4">
            <ProfileBanner
              fullName={clientName}
              email={email}
              statusTag={statusTag}
            />
            <AccountInformation
              clientName={clientName}
              email={email}
              dateRegistered={dateRegistered}
              statusTag={statusTag}
            />
            <JobRecord totalJobs={totalJobs} completedJobs={completedJobs} />
          </Container>
        </Col>
        <Col xs={24} lg={8}>
          <AccountSetting
            onChangePasswordClick={openChangePassword}
            onDeleteAccountClick={openDeleteAccount}
          />
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
    </Container>
  );
};
