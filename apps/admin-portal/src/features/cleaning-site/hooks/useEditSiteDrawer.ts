import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEditSite } from "./site.hooks";
import { EditSitePayload, Site } from "../types/site.type";
import { editSiteSchema } from "../types/site.schema";
import { normalizeUniforms } from "../utils/normalize-uniforms";
import { searchPlaceByText } from "../services/places.service";
import { useToast } from "@/shared/toast";

interface EditSiteFormValues {
  site_name: string;
  address: string;
  job_type: string;
  uniform: string[];
  client_name: string;
  client_email: string;
  status: "active" | "suspended";
}

type EditSiteErrors = Partial<Record<keyof EditSiteFormValues, string>>;

const toFormValues = (site: Site | null): EditSiteFormValues => ({
  site_name: site?.site_name ?? "",
  address: site?.site_address ?? "",
  job_type: site?.job_type ?? "",
  uniform: normalizeUniforms(site?.uniforms ?? []),
  client_name: site?.client_name ?? "",
  client_email: site?.client_email ?? "",
  status: site?.is_active ? "active" : "suspended",
});

export const useEditSiteDrawer = (site: Site | null, onSaved: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<EditSiteFormValues>(() =>
    toFormValues(site),
  );
  const [errors, setErrors] = useState<EditSiteErrors>({});
  const [gpsCoords, setGpsCoords] = useState({ lat: 0, lng: 0 });
  // True once the current address text has real resolved coordinates behind
  // it — either from the auto-resolve below or an explicit autocomplete
  // pick. Typing invalidates it again, so an edited-but-unresolved address
  // can't slip through on submit.
  const [isAddressResolved, setIsAddressResolved] = useState(false);

  // The site list/details response has no gps_lat/gps_lng of its own, so on
  // open we resolve the existing address text to coordinates via Places
  // Text Search to get a real default — re-picking a suggestion via
  // autocomplete below overrides this with the newly selected place's own
  // coordinates.
  useEffect(() => {
    setFormData(toFormValues(site));
    setErrors({});
    setGpsCoords({ lat: 0, lng: 0 });
    setIsAddressResolved(false);

    if (!site?.site_address) return;

    searchPlaceByText(site.site_address).then((result) => {
      if (result) {
        setGpsCoords({ lat: result.lat, lng: result.lng });
        setIsAddressResolved(true);
      }
    });
  }, [site]);

  const { mutate, isPending } = useEditSite(
    () => {
      addToast({
        variant: "success",
        title: "Site updated",
        description: `${formData.site_name} was updated successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      onSaved();
    },
    (e) => {
      const detail = e?.response?.data?.detail;
      const message =
        typeof detail === "string" && detail
          ? detail
          : "Something went wrong. Please try again.";

      addToast({
        variant: "error",
        title: "Could not update site",
        description: message,
      });
    },
  );

  const handleChange =
    (field: keyof Omit<EditSiteFormValues, "uniform" | "status">) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleAddressChange = (value: string) => {
    setFormData((prev) => ({ ...prev, address: value }));
    setIsAddressResolved(false);
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  const handleAddressSelect = (place: { address: string; lat: number; lng: number }) => {
    setFormData((prev) => ({ ...prev, address: place.address }));
    setGpsCoords({ lat: place.lat, lng: place.lng });
    setIsAddressResolved(true);
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  const handleJobTypeChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, job_type: value ?? "" }));
    if (errors.job_type) {
      setErrors((prev) => ({ ...prev, job_type: undefined }));
    }
  };

  const handleStatusChange = (value?: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value === "suspended" ? "suspended" : "active",
    }));
  };

  const toggleUniform = (uniform: string) => {
    setFormData((prev) => ({
      ...prev,
      uniform: prev.uniform.includes(uniform)
        ? prev.uniform.filter((item) => item !== uniform)
        : [...prev.uniform, uniform],
    }));
    if (errors.uniform) {
      setErrors((prev) => ({ ...prev, uniform: undefined }));
    }
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!site) return;

    const result = editSiteSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: EditSiteErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EditSiteFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!isAddressResolved) {
      setErrors((prev) => ({
        ...prev,
        address: "Please select an address from the suggestions.",
      }));
      return;
    }

    const payload: EditSitePayload = {
      site_id: site.site_id,
      site_name: formData.site_name,
      address: formData.address,
      gps_lat: gpsCoords.lat,
      gps_lng: gpsCoords.lng,
      job_type: formData.job_type,
      uniform: normalizeUniforms(formData.uniform),
      client_name: formData.client_name,
      client_email: formData.client_email,
      is_active: formData.status === "active",
    };

    mutate(payload);
  };

  return {
    formData,
    errors,
    isPending,
    handleChange,
    handleAddressChange,
    handleAddressSelect,
    handleJobTypeChange,
    handleStatusChange,
    toggleUniform,
    handleSubmit,
  };
};
