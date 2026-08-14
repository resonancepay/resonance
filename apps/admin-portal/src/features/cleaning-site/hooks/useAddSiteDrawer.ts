import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddSite } from "./site.hooks";
import { AddSitePayload } from "../types/site.type";
import { addSiteSchema } from "../types/site.schema";
import { normalizeUniforms } from "../utils/normalize-uniforms";
import { getCurrentPosition } from "../utils/get-current-position";
import { reverseGeocode } from "../services/geocoding.service";
import { useToast } from "@/shared/toast";

interface AddSiteFormValues {
  site_name: string;
  address: string;
  job_type: string;
  uniform: string[];
  client_name: string;
  client_email: string;
}

type AddSiteErrors = Partial<Record<keyof AddSiteFormValues, string>>;

const EMPTY_FORM: AddSiteFormValues = {
  site_name: "",
  address: "",
  job_type: "",
  uniform: [],
  client_name: "",
  client_email: "",
};

export const useAddSiteDrawer = (onSaved: () => void) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<AddSiteFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<AddSiteErrors>({});
  const [gpsCoords, setGpsCoords] = useState({ lat: 0, lng: 0 });
  // True only once the current address text has been resolved to real
  // coordinates via an actual autocomplete selection — typing invalidates
  // it again, so a stale/mismatched address can't slip through on submit.
  const [isAddressResolved, setIsAddressResolved] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isResolvingCurrentLocation, setIsResolvingCurrentLocation] = useState(false);

  // Just an initial map center before any address is picked — submit is
  // blocked until isAddressResolved is true, so this fallback is never what
  // actually gets sent. Silently keeps the 0,0 default if location access
  // is denied/unavailable.
  useEffect(() => {
    getCurrentPosition()
      .then((position) => {
        setGpsCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      })
      .catch(() => {});
  }, []);

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsAddressResolved(false);
    setUseCurrentLocation(false);
  };

  const { mutate, isPending } = useAddSite(
    () => {
      addToast({
        variant: "success",
        title: "Site added",
        description: `${formData.site_name} was added successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      resetForm();
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
        title: "Could not add site",
        description: message,
      });
    },
  );

  const handleChange =
    (field: keyof Omit<AddSiteFormValues, "uniform">) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleAddressChange = (value: string) => {
    setFormData((prev) => ({ ...prev, address: value }));
    setIsAddressResolved(false);
    setUseCurrentLocation(false);
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  // Selecting a suggestion from the autocomplete gives us the site's own
  // coordinates — more accurate than the admin's current-location fallback
  // above, so it takes over gpsCoords once a place is actually picked.
  const handleAddressSelect = (place: { address: string; lat: number; lng: number }) => {
    setFormData((prev) => ({ ...prev, address: place.address }));
    setGpsCoords({ lat: place.lat, lng: place.lng });
    setIsAddressResolved(true);
    setUseCurrentLocation(false);
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }
  };

  // "Use current location" — gets the admin's browser position, then
  // reverse-geocodes it into an address string so the field shows something
  // human-readable rather than bare coordinates. Locks the address field
  // (via useCurrentLocation) until unchecked or a manual edit is made.
  const handleToggleCurrentLocation = async (checked: boolean) => {
    setUseCurrentLocation(checked);

    if (!checked) {
      setFormData((prev) => ({ ...prev, address: "" }));
      setGpsCoords({ lat: 0, lng: 0 });
      setIsAddressResolved(false);
      return;
    }

    setIsResolvingCurrentLocation(true);
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const address = await reverseGeocode(latitude, longitude);

      setFormData((prev) => ({
        ...prev,
        address: address ?? `${latitude}, ${longitude}`,
      }));
      setGpsCoords({ lat: latitude, lng: longitude });
      setIsAddressResolved(true);
      if (errors.address) {
        setErrors((prev) => ({ ...prev, address: undefined }));
      }
    } catch {
      setUseCurrentLocation(false);
      addToast({
        variant: "error",
        title: "Location unavailable",
        description:
          "Couldn't get your current location. Please allow location access or enter an address manually.",
      });
    } finally {
      setIsResolvingCurrentLocation(false);
    }
  };

  const handleJobTypeChange = (value?: string) => {
    setFormData((prev) => ({ ...prev, job_type: value ?? "" }));
    if (errors.job_type) {
      setErrors((prev) => ({ ...prev, job_type: undefined }));
    }
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

    const result = addSiteSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: AddSiteErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AddSiteFormValues;
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

    // gps_lat/gps_lng come from either an autocomplete selection or "Use
    // current location" — submit is blocked above until one of those has
    // actually resolved, so this is never a stale/mismatched value.
    const payload: AddSitePayload = {
      site_name: formData.site_name,
      address: formData.address,
      gps_lat: gpsCoords.lat,
      gps_lng: gpsCoords.lng,
      job_type: formData.job_type,
      uniform: normalizeUniforms(formData.uniform),
      client_name: formData.client_name,
      client_email: formData.client_email,
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
    useCurrentLocation,
    isResolvingCurrentLocation,
    handleToggleCurrentLocation,
    handleJobTypeChange,
    toggleUniform,
    handleSubmit,
    resetForm,
  };
};
