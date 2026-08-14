"use client";

import {
  Button,
  Checkbox,
  Container,
  Input,
  Select,
  SideDrawer,
  Text,
} from "@resonance/ui";
import {
  CheckIcon,
  CleaningSiteIcon,
  CloseIcon,
} from "@resonance/ui/icons";
import { UniformOption } from "./uniform-option";
import { SiteAddressAutocomplete } from "../site-address-autocomplete";
import { useAddSiteDrawer } from "../../hooks/useAddSiteDrawer";

interface AddSiteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const jobTypeOptions = [
  { label: "Office", value: "office" },
  { label: "Home", value: "home" },
  { label: "Warehouse", value: "warehouse" },
];

const uniformOptions = [
  "Navy Uniform",
  "Rubber Boot",
  "Hair Net",
  "Rubber Gloves",
  "Pull Over",
];

export const AddSiteDrawer = ({
  isOpen,
  onClose,
  onSave,
}: AddSiteDrawerProps) => {
  const {
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
  } = useAddSiteDrawer(onSave);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <SideDrawer isOpen={isOpen} onClose={handleClose} width={460}>
      <Container className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Container
          as="button"
          type="button"
          onClick={handleClose}
          className="p-2 rounded-lg bg-muted flex items-center justify-center"
        >
          <CloseIcon size={20} className="text-primary" />
        </Container>
        <Text variant="h5" tone="primary">
          Add Site
        </Text>
      </Container>

      <Container
        as="form"
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <Container className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          <Input
            label="Cleaning Site"
            required
            variant2
            placeholder="Enter site name"
            value={formData.site_name}
            onChange={handleChange("site_name")}
            error={errors.site_name}
          />
          <SiteAddressAutocomplete
            value={formData.address}
            onChange={handleAddressChange}
            onPlaceSelect={handleAddressSelect}
            error={errors.address}
            disabled={useCurrentLocation}
          />
          <Container className="flex items-center gap-2 -mt-2">
            <Checkbox
              checked={useCurrentLocation}
              onChange={handleToggleCurrentLocation}
              disabled={isResolvingCurrentLocation}
            />
            <Text variant="bodySmall" className="text-primary">
              {isResolvingCurrentLocation
                ? "Getting your location…"
                : "Use current location"}
            </Text>
          </Container>
          <Select
            label="Job Type"
            required
            variant2
            placeholder="Select job type"
            options={jobTypeOptions}
            value={formData.job_type}
            onChange={handleJobTypeChange}
            error={errors.job_type}
          />

          <Container>
            <Container className="flex items-center gap-0.5 mb-2">
              <Text variant="bodySmall" className="text-primary">
                Pick Uniform(s)
              </Text>
              <Text variant="bodySmall" className="text-danger-text-icons">
                *
              </Text>
            </Container>
            <Container className="flex flex-wrap gap-2">
              {uniformOptions.map((uniform) => (
                <UniformOption
                  key={uniform}
                  label={uniform}
                  selected={formData.uniform.includes(uniform)}
                  onToggle={() => toggleUniform(uniform)}
                />
              ))}
            </Container>
            {errors.uniform && (
              <Text
                variant="bodyXSmall"
                className="text-danger-text-icons mt-2"
              >
                {errors.uniform}
              </Text>
            )}
          </Container>

          <Container className="h-px bg-border" />

          <Input
            label="Client Name"
            required
            variant2
            placeholder="Enter client name"
            value={formData.client_name}
            onChange={handleChange("client_name")}
            error={errors.client_name}
          />
          <Input
            label="Client Email"
            required
            variant2
            type="email"
            placeholder="Enter client email address"
            value={formData.client_email}
            onChange={handleChange("client_email")}
            error={errors.client_email}
          />
        </Container>

        <Container className="border-t border-border px-4 py-4 flex gap-2.5">
          <Button
            type="button"
            className="flex-1"
            variant="neutral"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            variant="primary"
            rightIcon={<CheckIcon size={16} className="text-inverted" />}
            disabled={isPending}
            loading={isPending}
          >
            Save Site
          </Button>
        </Container>
      </Container>
    </SideDrawer>
  );
};
