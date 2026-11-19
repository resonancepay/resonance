"use client";

import { useEffect, useState } from "react";
import { Button, Container, Input, Modal, Select, Text } from "@resonance/ui";
import { TickIcon } from "@resonance/ui/icons";
import { ServiceArea, ServiceLocation } from "../../types/profile.type";

export const STATE_OPTIONS = [
  { value: "london", label: "London" },
  { value: "manchester", label: "Manchester" },
  { value: "birmingham", label: "Birmingham" },
  { value: "leeds", label: "Leeds" },
  { value: "glasgow", label: "Glasgow" },
  { value: "liverpool", label: "Liverpool" },
  { value: "bristol", label: "Bristol" },
  { value: "edinburgh", label: "Edinburgh" },
];

const RADIUS_OPTIONS = [
  { value: "5", label: "05 miles" },
  { value: "10", label: "10 miles" },
  { value: "15", label: "15 miles" },
  { value: "20", label: "20 miles" },
  { value: "25", label: "25 miles" },
];

interface SetServiceLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (location: ServiceLocation) => void;
  initialValue?: ServiceLocation;
  isPending?: boolean;
}

const EMPTY_AREA: ServiceArea = { postcode: "", radius: "" };

export const SetServiceLocationModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
  isPending,
}: SetServiceLocationModalProps) => {
  const [state, setState] = useState("");
  const [area1, setArea1] = useState<ServiceArea>(EMPTY_AREA);
  const [area2, setArea2] = useState<ServiceArea>(EMPTY_AREA);

  useEffect(() => {
    if (isOpen) {
      setState(initialValue?.state?.toLowerCase() ?? "");
      setArea1(initialValue?.area1 ?? EMPTY_AREA);
      setArea2(initialValue?.area2 ?? EMPTY_AREA);
    }
  }, [isOpen, initialValue]);

  // Area 2 is optional, but if the user has started it, both fields are needed.
  const area2Started = !!area2.postcode.trim() || !!area2.radius;
  const area2Complete = !!area2.postcode.trim() && !!area2.radius;

  const canSave =
    !!state &&
    !!area1.postcode.trim() &&
    !!area1.radius &&
    (!area2Started || area2Complete);

  const handleSave = () => {
    if (!canSave) return;
    onSubmit({ state, area1, area2 });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={460}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Set Service Location
        </Text>
      </Container>
      <Container className="h-px bg-border" />

      <Container className="px-2 mt-4">
        <Select
          variant2
          label="State"
          required
          placeholder="Select state"
          options={STATE_OPTIONS}
          value={state}
          onChange={setState}
        />
      </Container>

      <Container className="px-2 mt-4">
        <Text variant="bodySmall" className="text-primary mb-1">
          Area 1 <Container as="span" className="text-danger-bg-bold">*</Container>
        </Text>
        <Container className="flex items-center gap-2">
          <Input
            variant2
            placeholder="Enter Base Postcode"
            value={area1.postcode}
            onChange={(e) => setArea1({ ...area1, postcode: e.target.value })}
          />
          <Select
            variant2
            placeholder="Travel radius"
            options={RADIUS_OPTIONS}
            value={area1.radius}
            onChange={(radius) => setArea1({ ...area1, radius })}
          />
        </Container>
      </Container>

      <Container className="px-2 mt-4">
        <Text variant="bodySmall" className="text-primary mb-1">
          Area 2
        </Text>
        <Container className="flex items-center gap-2">
          <Input
            variant2
            placeholder="Enter Base Postcode"
            value={area2.postcode}
            onChange={(e) => setArea2({ ...area2, postcode: e.target.value })}
          />
          <Select
            variant2
            placeholder="Travel radius"
            options={RADIUS_OPTIONS}
            value={area2.radius}
            onChange={(radius) => setArea2({ ...area2, radius })}
          />
        </Container>
      </Container>

      <Container className="border-t-[0.5px] border-border mt-6 pt-4 px-2 pb-2 flex gap-2.5">
        <Button className="w-full" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="w-full"
          variant="primary"
          rightIcon={<TickIcon size={16} className="text-inverted" />}
          disabled={!canSave}
          loading={isPending}
          onClick={handleSave}
        >
          Save
        </Button>
      </Container>
    </Modal>
  );
};
