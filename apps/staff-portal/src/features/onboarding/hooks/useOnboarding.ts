import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/shared/toast";
import {
  useSubmitStepOne,
  useSubmitStepTwo,
  useSubmitStepThree,
  useSubmitStepFour,
} from "./onboarding.hooks";
import {
  EmploymentEntry,
  EmergencyContactEntry,
  QualificationEntry,
  RefereeEntry,
  StepFourAvailability,
  StepFourErrors,
  StepOneErrors,
  StepOneFormState,
  StepThreeEmergencyErrors,
  StepThreeQualificationErrors,
  StepThreeRefereeErrors,
  StepTwoErrors,
} from "../types/onboarding.type";
import { useAuthStore } from "@/shared/store/auth.store";

export const useOnboardingScreen = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { user } = useAuthStore();
  const [status, setStatus] = useState<
    "approved" | "declined" | "pending" | "submitted" | null
  >(user?.userInfo?.application_submitted ? "submitted" : null);
  const [referenceCode, setReferenceCode] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);
  return {
    activeStep,
    setActiveStep,
    scrollRef,
    referenceCode,
    status,
    setReferenceCode,
    setStatus,
  };
};

export const useStepOneScreen = (onSuccess: () => void) => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState<StepOneFormState>({
    work_eligibility: false,
    nin: "",
    dbs_consent: false,
    rtw: null,
    ccd: null,
  });

  const [errors, setErrors] = useState<StepOneErrors>({});

  const { mutate, isPending } = useSubmitStepOne(
    () => {
      addToast({
        variant: "success",
        title: "Step 1 saved",
        description: "UK legal requirements submitted.",
      });
      onSuccess();
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      addToast({
        variant: "error",
        title: "Submission failed",
        description:
          typeof detail === "string" && detail
            ? detail
            : "Something went wrong. Please try again.",
      });
    },
  );

  const handleNinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, nin: e.target.value }));
    if (errors.nin) setErrors((prev) => ({ ...prev, nin: undefined }));
  };

  const handleWorkEligibilityChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, work_eligibility: checked }));
    if (errors.work_eligibility)
      setErrors((prev) => ({ ...prev, work_eligibility: undefined }));
  };

  const handleDbsConsentChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, dbs_consent: checked }));
    if (errors.dbs_consent)
      setErrors((prev) => ({ ...prev, dbs_consent: undefined }));
  };

  const handleRtwChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, rtw: file }));
    if (errors.rtw) setErrors((prev) => ({ ...prev, rtw: undefined }));
  };

  const handleCcdChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, ccd: file }));
    if (errors.ccd) setErrors((prev) => ({ ...prev, ccd: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: StepOneErrors = {};

    if (!formData.work_eligibility)
      newErrors.work_eligibility =
        "You must confirm you are eligible to work in the UK";
    if (!formData.nin.trim())
      newErrors.nin = "National Insurance Number is required";
    if (!formData.rtw) newErrors.rtw = "Right to Work document is required";
    if (!formData.ccd)
      newErrors.ccd = "Criminal Convictions Declaration document is required";
    if (!formData.dbs_consent)
      newErrors.dbs_consent = "You must consent to a DBS check";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    mutate({
      work_eligibility: formData.work_eligibility,
      nin: formData.nin,
      dbs_consent: formData.dbs_consent,
      rtw: formData.rtw!,
      ccd: formData.ccd!,
    });
  };

  return {
    formData,
    errors,
    isPending,
    handleNinChange,
    handleWorkEligibilityChange,
    handleDbsConsentChange,
    handleRtwChange,
    handleCcdChange,
    handleSubmit,
  };
};

const createEmptyEntry = (): EmploymentEntry => ({
  id: crypto.randomUUID(),
  employer_name: "",
  job_title: "",
  start_date: "",
  end_date: "",
  currently_working: false,
  responsibilities: "",
  reason_for_leave: "",
});

export const useStepTwoScreen = (onSuccess: () => void) => {
  const { addToast } = useToast();
  const [entries, setEntries] = useState<EmploymentEntry[]>([
    createEmptyEntry(),
  ]);
  const [errors, setErrors] = useState<StepTwoErrors>([{}]);

  const { mutate, isPending } = useSubmitStepTwo(
    () => {
      addToast({
        variant: "success",
        title: "Step 2 saved",
        description: "Employment history submitted.",
      });
      onSuccess();
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      addToast({
        variant: "error",
        title: "Submission failed",
        description:
          typeof detail === "string" && detail
            ? detail
            : "Something went wrong. Please try again.",
      });
    },
  );

  const handleAdd = () => {
    setEntries((prev) => [...prev, createEmptyEntry()]);
    setErrors((prev) => [...prev, {}]);
  };

  const handleRemove = (id: string) => {
    const index = entries.findIndex((e) => e.id === id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    id: string,
    field: keyof EmploymentEntry,
    value: string | boolean,
  ) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
    const index = entries.findIndex((e) => e.id === id);
    if (
      field !== "id" &&
      errors[index]?.[field as keyof Omit<EmploymentEntry, "id">]
    ) {
      setErrors((prev) =>
        prev.map((err, i) =>
          i === index ? { ...err, [field]: undefined } : err,
        ),
      );
    }
  };

  const validate = (): boolean => {
    const newErrors: StepTwoErrors = entries.map((entry) => {
      const err: StepTwoErrors[number] = {};
      if (!entry.employer_name.trim())
        err.employer_name = "Employer name is required";
      if (!entry.job_title.trim()) err.job_title = "Job title is required";
      if (!entry.start_date) err.start_date = "Start date is required";
      if (!entry.currently_working && !entry.end_date)
        err.end_date = "End date is required";
      if (!entry.responsibilities.trim())
        err.responsibilities = "Responsibilities are required";
      if (!entry.currently_working && !entry.reason_for_leave.trim())
        err.reason_for_leave = "Reason for leaving is required";
      return err;
    });

    setErrors(newErrors);
    return newErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSubmit = () => {
    if (!validate()) return;

    mutate(entries.map(({ id: _id, ...rest }) => rest));
  };

  return {
    entries,
    errors,
    isPending,
    handleAdd,
    handleRemove,
    handleChange,
    handleSubmit,
  };
};

// ─── Step Three ────────────────────────────────────────────────────────────────

const createEmptyQualification = (): QualificationEntry => ({
  id: crypto.randomUUID(),
  qualification_title: "",
  institution: "",
  date_achieved: "",
  grade: "",
});

const createEmptyEmergencyContact = (): EmergencyContactEntry => ({
  id: crypto.randomUUID(),
  contact_name: "",
  relationship: "",
  phone: "",
  email: "",
});

const createEmptyReferee = (): RefereeEntry => ({
  id: crypto.randomUUID(),
  name: "",
  company: "",
  job_title: "",
  phone: "",
  email: "",
  relationship: "",
});

export const useStepThreeScreen = (onSuccess: () => void) => {
  const { addToast } = useToast();

  const [qualifications, setQualifications] = useState<QualificationEntry[]>([
    createEmptyQualification(),
  ]);
  const [emergencyContacts, setEmergencyContacts] = useState<
    EmergencyContactEntry[]
  >([createEmptyEmergencyContact()]);
  const [referees, setReferees] = useState<RefereeEntry[]>([
    createEmptyReferee(),
  ]);

  const [qualificationErrors, setQualificationErrors] =
    useState<StepThreeQualificationErrors>([{}]);
  const [emergencyErrors, setEmergencyErrors] =
    useState<StepThreeEmergencyErrors>([{}]);
  const [refereeErrors, setRefereeErrors] = useState<StepThreeRefereeErrors>([
    {},
  ]);

  const { mutate, isPending } = useSubmitStepThree(
    () => {
      addToast({
        variant: "success",
        title: "Step 3 saved",
        description: "Qualifications submitted.",
      });
      onSuccess();
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      addToast({
        variant: "error",
        title: "Submission failed",
        description:
          typeof detail === "string" && detail
            ? detail
            : "Something went wrong. Please try again.",
      });
    },
  );

  const makeListHandlers = <T extends { id: string }>(
    list: T[],
    setList: React.Dispatch<React.SetStateAction<T[]>>,
    setErrs: React.Dispatch<
      React.SetStateAction<Partial<Record<keyof Omit<T, "id">, string>>[]>
    >,
    createEmpty: () => T,
  ) => ({
    handleAdd: () => {
      setList((prev) => [...prev, createEmpty()]);
      setErrs((prev) => [...prev, {}]);
    },
    handleRemove: (id: string) => {
      const index = list.findIndex((e) => e.id === id);
      setList((prev) => prev.filter((e) => e.id !== id));
      setErrs((prev) => prev.filter((_, i) => i !== index));
    },
    handleChange: (id: string, field: keyof T, value: string) => {
      setList((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
      );
      const index = list.findIndex((e) => e.id === id);
      setErrs((prev) =>
        prev.map((err, i) =>
          i === index ? { ...err, [field]: undefined } : err,
        ),
      );
    },
  });

  const qualificationHandlers = makeListHandlers(
    qualifications,
    setQualifications,
    setQualificationErrors,
    createEmptyQualification,
  );
  const emergencyHandlers = makeListHandlers(
    emergencyContacts,
    setEmergencyContacts,
    setEmergencyErrors,
    createEmptyEmergencyContact,
  );
  const refereeHandlers = makeListHandlers(
    referees,
    setReferees,
    setRefereeErrors,
    createEmptyReferee,
  );

  const validate = (): boolean => {
    const qErrors: StepThreeQualificationErrors = qualifications.map((q) => {
      const err: StepThreeQualificationErrors[number] = {};
      if (!q.qualification_title.trim())
        err.qualification_title = "Qualification title is required";
      if (!q.institution.trim()) err.institution = "Institution is required";
      if (!q.date_achieved) err.date_achieved = "Date achieved is required";
      if (!q.grade.trim()) err.grade = "Grade is required";
      return err;
    });

    const eErrors: StepThreeEmergencyErrors = emergencyContacts.map((c) => {
      const err: StepThreeEmergencyErrors[number] = {};
      if (!c.contact_name.trim()) err.contact_name = "Contact name is required";
      if (!c.relationship.trim()) err.relationship = "Relationship is required";
      if (!c.phone.trim()) err.phone = "Phone number is required";
      return err;
    });

    const rErrors: StepThreeRefereeErrors = referees.map((r) => {
      const err: StepThreeRefereeErrors[number] = {};
      if (!r.name.trim()) err.name = "Name is required";
      if (!r.company.trim()) err.company = "Company is required";
      if (!r.job_title.trim()) err.job_title = "Job title is required";
      if (!r.phone.trim()) err.phone = "Phone number is required";
      if (!r.email.trim()) err.email = "Email is required";
      if (!r.relationship.trim()) err.relationship = "Relationship is required";
      return err;
    });

    setQualificationErrors(qErrors);
    setEmergencyErrors(eErrors);
    setRefereeErrors(rErrors);

    return [...qErrors, ...eErrors, ...rErrors].every(
      (err) => Object.keys(err).length === 0,
    );
  };

  const handleSubmit = () => {
    if (!validate()) return;
    mutate({
      qualifications: qualifications.map(({ id: _id, ...rest }) => rest),
      emergency_contact: emergencyContacts.map(({ id: _id, ...rest }) => rest),
      referee: referees.map(({ id: _id, ...rest }) => rest),
    });
  };

  return {
    qualifications,
    emergencyContacts,
    referees,
    qualificationErrors,
    emergencyErrors,
    refereeErrors,
    isPending,
    qualificationHandlers,
    emergencyHandlers,
    refereeHandlers,
    handleSubmit,
  };
};

// ─── Step Four ────────────────────────────────────────────────────────────────

const DAYS_KEYS = [
  "mondays",
  "tuesdays",
  "wednesdays",
  "thursdays",
  "fridays",
  "saturdays",
  "sundays",
] as const;

const DEFAULT_AVAILABILITY: StepFourAvailability = {
  mondays: false,
  tuesdays: false,
  wednesdays: false,
  thursdays: false,
  fridays: false,
  saturdays: false,
  sundays: false,
};

export const useStepFourScreen = (
  onSuccess: (referenceCode: string) => void,
) => {
  const { addToast } = useToast();

  const [availability, setAvailability] = useState<StepFourAvailability>({
    ...DEFAULT_AVAILABILITY,
  });
  const [uniformSize, setUniformSize] = useState("");
  const [reliableTransport, setReliableTransport] = useState<boolean | null>(
    null,
  );
  const [workOnHolidays, setWorkOnHolidays] = useState<boolean | null>(null);
  const [termsAndPolicy, setTermsAndPolicy] = useState(false);
  const [errors, setErrors] = useState<StepFourErrors>({});

  const { mutate, isPending } = useSubmitStepFour(
    (data) => {
      addToast({
        variant: "success",
        title: "Step 4 saved",
        description: "Job stability submitted.",
      });
      onSuccess(data?.reference_code ?? "");
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      addToast({
        variant: "error",
        title: "Submission failed",
        description:
          typeof detail === "string" && detail
            ? detail
            : "Something went wrong. Please try again.",
      });
    },
  );

  const toggleDay = (day: keyof StepFourAvailability) => {
    setAvailability((prev) => ({ ...prev, [day]: !prev[day] }));
    if (errors.availability)
      setErrors((prev) => ({ ...prev, availability: undefined }));
  };

  const handleUniformSizeChange = (val: string) => {
    setUniformSize(val);
    if (errors.uniform_size)
      setErrors((prev) => ({ ...prev, uniform_size: undefined }));
  };

  const handleReliableTransportChange = (val: boolean) => {
    setReliableTransport(val);
    if (errors.reliable_transport)
      setErrors((prev) => ({ ...prev, reliable_transport: undefined }));
  };

  const handleWorkOnHolidaysChange = (val: boolean) => {
    setWorkOnHolidays(val);
    if (errors.work_on_holidays)
      setErrors((prev) => ({ ...prev, work_on_holidays: undefined }));
  };

  const handleTermsChange = (val: boolean) => {
    setTermsAndPolicy(val);
    if (errors.terms_and_policy)
      setErrors((prev) => ({ ...prev, terms_and_policy: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: StepFourErrors = {};
    const anyDaySelected = DAYS_KEYS.some((d) => availability[d]);
    if (!anyDaySelected)
      newErrors.availability = "Please select at least one day of availability";
    if (!uniformSize) newErrors.uniform_size = "Uniform size is required";
    if (reliableTransport === null)
      newErrors.reliable_transport =
        "Please indicate if you have reliable transport";
    if (workOnHolidays === null)
      newErrors.work_on_holidays =
        "Please indicate if you can work on holidays";
    if (!termsAndPolicy)
      newErrors.terms_and_policy =
        "You must agree to the Terms of Use and Privacy Policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    mutate({
      availability,
      uniform_size: uniformSize,
      reliable_transport: reliableTransport!,
      work_on_holidays: workOnHolidays!,
      terms_and_policy: termsAndPolicy,
    });
  };

  return {
    availability,
    uniformSize,
    reliableTransport,
    workOnHolidays,
    termsAndPolicy,
    errors,
    isPending,
    toggleDay,
    handleUniformSizeChange,
    handleReliableTransportChange,
    handleWorkOnHolidaysChange,
    handleTermsChange,
    handleSubmit,
  };
};
