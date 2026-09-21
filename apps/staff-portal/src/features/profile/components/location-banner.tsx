"use client";

import { useEffect, useState } from "react";
import { Button, Container, Text } from "@resonance/ui";
import { EditIcon, LocationIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import { ServiceLocation } from "@/features/auth/types/auth.type";
import { EmptyState } from "./empty-state";
import {
  SetServiceLocationModal,
  STATE_OPTIONS,
} from "./modal/set-service-location-modal";

interface LocationBannerProps {
  serviceLocation: ServiceLocation;
}

export const LocationBanner = ({ serviceLocation }: LocationBannerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState(serviceLocation);

  useEffect(() => {
    setLocation(serviceLocation);
  }, [serviceLocation]);

  const handleSave = (value: ServiceLocation) => {
    setLocation(value);
    setIsModalOpen(false);
  };

  const isEmpty =
    !location.state && !location.area1.postcode && !location.area2.postcode;

  const stateLabel = STATE_OPTIONS.find(
    (option) => option.value === location.state,
  )?.label;

  return (
    <Container className="bg-surface border-[0.5px] border-border p-3.5 rounded-xl">
      <Container className="mb-4 flex items-center justify-between">
        <Text variant="h5" tone="primary">
          Service locations
        </Text>
        <Button
          leftIcon={<EditIcon className="text-primary" size={16} />}
          size="small"
          variant="neutral"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </Button>
      </Container>
      <Container>
        {isEmpty ? (
          <EmptyState
            icon={<LocationIcon className="text-secondary" />}
            text="No service location set!"
          />
        ) : (
          <Row gutter={[0, 16]}>
            <Col xs={24} lg={8}>
              <Text className="mb-1" variant="bodyXSmall" tone="secondary">
                State
              </Text>
              <Text variant="bodySmall" tone="primary">
                {stateLabel}
              </Text>
            </Col>
            <Col xs={24} lg={16}>
              <Text className="mb-1" variant="bodyXSmall" tone="secondary">
                Area
              </Text>
              <Container className="flex flex-wrap gap-2">
                {[location.area1, location.area2].map((area, index) => (
                  <Container
                    key={index}
                    className="border border-brand-tertiary-border bg-brand-tertiary-bg-light rounded-4xl px-2.5 py-1"
                  >
                    <Text tone="primary" variant="bodyXSmall">
                      {area.postcode} • {area.radius} miles
                    </Text>
                  </Container>
                ))}
              </Container>
            </Col>
          </Row>
        )}
      </Container>

      <SetServiceLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialValue={location}
      />
    </Container>
  );
};
