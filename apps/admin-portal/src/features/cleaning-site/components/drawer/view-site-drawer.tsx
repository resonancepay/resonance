"use client";

import { Button, Container, SideDrawer, Text } from "@resonance/ui";
import { CleaningSiteIcon, CloseIcon, LocationIcon } from "@resonance/ui/icons";
import { TableStatus } from "@/components/generics/table/table-status";
import { JobTypeTag } from "@/features/job/components/job-type-tag";
import { Site } from "../../types/site.type";
import { normalizeUniforms } from "../../utils/normalize-uniforms";

interface ViewSiteDrawerProps {
  site: Site | null;
  onClose: () => void;
}

const InfoBlock = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Container className="bg-muted rounded-xl px-3.5 py-3 flex flex-col gap-1">
    <Text variant="bodyXSmall" tone="secondary">
      {label}
    </Text>
    {children}
  </Container>
);

export const ViewSiteDrawer = ({ site, onClose }: ViewSiteDrawerProps) => {
  const uniforms = normalizeUniforms(site?.uniforms ?? []);

  return (
    <SideDrawer isOpen={!!site} onClose={onClose} width={460}>
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
          Cleaning Site
        </Text>
      </Container>

      {site && (
        <Container className="flex-1 flex flex-col overflow-hidden">
          <Container className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
            <Container className="bg-brand-secondary-bg-light rounded-2xl px-4 py-6 flex flex-col items-center gap-2 text-center">
              <Container className="w-14 h-14 rounded-full bg-brand-bg-bold flex items-center justify-center">
                <CleaningSiteIcon size={24} className="text-inverted" />
              </Container>
              <Text variant="h5" tone="primary">
                {site.site_name}
              </Text>
              <Text variant="bodySmall" tone="secondary">
                {site.site_address}
              </Text>
              <TableStatus status={site.is_active ? "active" : "suspended"} />
            </Container>

            <Text variant="bodySmall" tone="primary">
              Site Information
            </Text>

            <InfoBlock label="Cleaning Site">
              <Text variant="bodySmall" tone="primary">
                {site.site_name} • {site.site_address}
              </Text>
            </InfoBlock>

            <InfoBlock label="Client">
              <Text variant="bodySmall" tone="primary">
                {site.client_name} • {site.client_email}
              </Text>
            </InfoBlock>

            <InfoBlock label="Job Type">
              <JobTypeTag label={site.job_type} />
            </InfoBlock>

            <InfoBlock label="Amount of Jobs">
              <Text variant="bodySmall" tone="primary">
                {site.jobs}
              </Text>
            </InfoBlock>

            <InfoBlock label="Uniform(s)">
              {uniforms.length > 0 ? (
                <Container className="flex flex-wrap gap-2 mt-1">
                  {uniforms.map((uniform) => (
                    <Container
                      key={uniform}
                      as="span"
                      className="bg-brand-secondary-bg-light px-2.5 py-1 rounded-full"
                    >
                      <Text
                        variant="bodyXSmall"
                        className="text-brand-secondary-text-icons"
                      >
                        {uniform}
                      </Text>
                    </Container>
                  ))}
                </Container>
              ) : (
                <Text variant="bodySmall" tone="primary">
                  No uniforms assigned
                </Text>
              )}
            </InfoBlock>

            <InfoBlock label="Date Added">
              <Text variant="bodySmall" tone="primary">
                {site.date_added.replace(" . ", " • ")}
              </Text>
            </InfoBlock>
          </Container>

          <Container className="border-t border-border px-4 py-4">
            <Button
              type="button"
              className="w-full"
              variant="neutral"
              onClick={onClose}
            >
              OK
            </Button>
          </Container>
        </Container>
      )}
    </SideDrawer>
  );
};
