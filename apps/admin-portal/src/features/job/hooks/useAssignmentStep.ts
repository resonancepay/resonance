import { ChangeEvent, useState } from "react";
import {
  AssignmentField,
  AssignmentType,
  JobAssignmentStepValues,
} from "../types/job.type";

export const EMPTY_ASSIGNMENT_STEP: JobAssignmentStepValues = {
  assignmentType: "publish",
  deadlineDate: "",
  deadlineTime: "",
  eligibleRadius: "",
  assignedCleaner: "",
};

// State, handlers and validation for the assignment step, shared by creating
// a job (publish or assign) and editing a published one (publish only).
export const useAssignmentStep = () => {
  const [values, setValues] =
    useState<JobAssignmentStepValues>(EMPTY_ASSIGNMENT_STEP);
  const [errors, setErrors] = useState<
    Partial<Record<AssignmentField, string>>
  >({});

  const clearError = (field: AssignmentField) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleAssignmentTypeChange = (type: AssignmentType) => {
    setValues((prev) => ({ ...prev, assignmentType: type }));
  };

  const handleDeadlineDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, deadlineDate: e.target.value }));
    clearError("deadlineDate");
  };

  const handleDeadlineTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, deadlineTime: e.target.value }));
    clearError("deadlineTime");
  };

  const handleEligibleRadiusChange = (id: string) => {
    setValues((prev) => ({ ...prev, eligibleRadius: id }));
    clearError("eligibleRadius");
  };

  const handleAssignedCleanerChange = (cleanerId: string) => {
    setValues((prev) => ({ ...prev, assignedCleaner: cleanerId }));
    clearError("assignedCleaner");
  };

  // Returns whether the step is valid, setting the field errors if not.
  const validate = (): boolean => {
    const newErrors: Partial<Record<AssignmentField, string>> = {};

    if (values.assignmentType === "publish") {
      if (!values.deadlineDate) newErrors.deadlineDate = "Deadline date is required";
      if (!values.deadlineTime) newErrors.deadlineTime = "Deadline time is required";
      if (!values.eligibleRadius) newErrors.eligibleRadius = "Select an eligible radius";
    } else if (!values.assignedCleaner) {
      newErrors.assignedCleaner = "Select a cleaner to assign this job to";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    setValues,
    errors,
    handleAssignmentTypeChange,
    handleDeadlineDateChange,
    handleDeadlineTimeChange,
    handleEligibleRadiusChange,
    handleAssignedCleanerChange,
    validate,
  };
};
