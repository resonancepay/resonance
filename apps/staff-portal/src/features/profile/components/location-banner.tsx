"use client";

import { Button, Container, Text } from "@resonance/ui";
import { EditIcon, LocationIcon } from "@resonance/ui/icons";
import { Col, Row } from "antd";
import { ServiceLocation } from "../types/profile.type";
import { EmptyState } from "./empty-state";
import { STATE_OPTIONS } from "./modal/set-service-location-modal";

interface LocationBannerProps {
  serviceLocation: ServiceLocation;
  onEditClick: () => void;
}

export const LocationBanner = ({
  serviceLocation,
  onEditClick,
}: LocationBannerProps) => {
  const isEmpty =
    !serviceLocation.state &&
    !serviceLocation.area1.postcode &&
    !serviceLocation.area2.postcode;

  const stateLabel =
    STATE_OPTIONS.find(
      (option) => option.value === serviceLocation.state.toLowerCase(),
    )?.label ?? serviceLocation.state;

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
          onClick={onEditClick}
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
                {[serviceLocation.area1, serviceLocation.area2]
                  .filter((area) => area.postcode)
                  .map((area, index) => (
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
    </Container>
  );
};
