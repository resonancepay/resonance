"use client";

import { Button, Container, Input, Select, SideDrawer, Text } from "@resonance/ui";
import { CheckIcon, CloseIcon, LocationIcon } from "@resonance/ui/icons";
import { useState } from "react";
import { UniformOption } from "./uniform-option";

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

const uniformOptions = ["Navy Uniform", "Rubber Boot", "Hair Net", "Rubber Gloves", "Pull Over"];

export const AddSiteDrawer = ({ isOpen, onClose, onSave }: AddSiteDrawerProps) => {
  const [siteName, setSiteName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<string | undefined>(undefined);
  const [uniforms, setUniforms] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const toggleUniform = (uniform: string) => {
    setUniforms((prev) =>
      prev.includes(uniform) ? prev.filter((item) => item !== uniform) : [...prev, uniform],
    );
  };

  return (
    <SideDrawer isOpen={isOpen} onClose={onClose} width={460}>
      <Container className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <Container
          as="button"
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg bg-muted flex items-center justify-center"
        >
          <CloseIcon size={20} className="text-primary" />
        </Container>
        <Text variant="h5" tone="primary">
          Add Site
        </Text>
      </Container>

      <Container className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        <Input
          label="Cleaning Site"
          required
          variant2
          placeholder="Enter site name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        <Input
          label="Site Location"
          required
          variant2
          placeholder="Pick site location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          rightIcon={<LocationIcon size={18} className="text-secondary" />}
        />
        <Select
          label="Job Type"
          required
          variant2
          placeholder="Select job type"
          options={jobTypeOptions}
          value={jobType}
          onChange={setJobType}
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
                selected={uniforms.includes(uniform)}
                onToggle={() => toggleUniform(uniform)}
              />
            ))}
          </Container>
        </Container>

        <Container className="h-px bg-border" />

        <Input
          label="Client Name"
          required
          variant2
          placeholder="Enter client name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <Input
          label="Client Email"
          required
          variant2
          type="email"
          placeholder="Enter client email address"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />
      </Container>

      <Container className="border-t border-border px-4 py-4 flex gap-2.5">
        <Button className="flex-1" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="flex-1"
          variant="primary"
          rightIcon={<CheckIcon size={16} className="text-inverted" />}
          onClick={onSave}
        >
          Save Site
        </Button>
      </Container>
    </SideDrawer>
  );
};
