"use client";

import { useEffect, useState } from "react";
import { Button, Container, Input, Modal, Text } from "@resonance/ui";
import { TickIcon } from "@resonance/ui/icons";
import { LoginInfo } from "@/features/auth/components/login-info";
import { PASSWORD_REQUIREMENTS } from "@/features/auth/hooks/useAuth";
import { ChangePasswordPayload } from "@/features/auth/types/auth.type";
import { PasswordRuleChip } from "./password-rule-chip";

type Step = "current" | "new";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ChangePasswordPayload) => void;
  isPending?: boolean;
}

export const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: ChangePasswordModalProps) => {
  const [step, setStep] = useState<Step>("current");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep("current");
      setCurrentPassword("");
      setNewPassword("");
    }
  }, [isOpen]);

  // A rule only reads as failed once the user has started typing — before
  // that nothing is flagged.
  const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
    label: req.label,
    passed: req.regex.test(newPassword),
  }));
  const allRequirementsMet = requirements.every((req) => req.passed);
  const hasStartedTyping = newPassword.length > 0;

  const handleSave = () => {
    if (!allRequirementsMet) return;
    onSubmit({ old_password: currentPassword, new_password: newPassword });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Change Account Password
        </Text>
      </Container>
      <Container className="h-px bg-border" />

      {step === "current" ? (
        <>
          <Container className="px-2 mt-4">
            <Input
              variant2
              label="Current Password"
              required
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Container>

          <Container className="px-2 mt-4">
            <LoginInfo />
          </Container>

          <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
            <Button className="w-full" variant="neutral" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="w-full"
              variant="primary"
              disabled={!currentPassword.trim()}
              onClick={() => setStep("new")}
            >
              Continue
            </Button>
          </Container>
        </>
      ) : (
        <>
          <Container className="px-2 mt-4">
            <Input
              variant2
              label="New Password"
              required
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Container>

          <Container className="px-2 mt-3 flex items-center gap-2 flex-wrap">
            {requirements.map((req) => (
              <PasswordRuleChip
                key={req.label}
                label={req.label}
                failed={hasStartedTyping && !req.passed}
              />
            ))}
          </Container>

          <Container className="px-2 mt-4">
            <LoginInfo />
          </Container>

          <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
            <Button className="w-full" variant="neutral" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="w-full"
              variant="primary"
              rightIcon={<TickIcon size={16} className="text-inverted" />}
              disabled={!allRequirementsMet}
              loading={isPending}
              onClick={handleSave}
            >
              Save
            </Button>
          </Container>
        </>
      )}
    </Modal>
  );
};
