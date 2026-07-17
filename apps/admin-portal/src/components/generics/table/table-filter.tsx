import { Button, Container, Input, Text } from "@resonance/ui";
import { DownloadIcon, FilterIcon, SearchIcon } from "@resonance/ui/icons";
import React from "react";

export const TableFilter = () => {
  return (
    <Container className="flex items-center justify-between mb-4">
      <Container className="gap-1 flex items-center">
        <Text variant="h5" tone="primary">
          All pending cleaners
        </Text>
        <Container className="bg-moss-green-bg-light w-6  h-6 flex items-center justify-center rounded-lg">
          <Text variant="bodyXSmall" className="text-moss-green-text-icons">
            12
          </Text>
        </Container>
      </Container>
      <Container className="flex items-center gap-2">
        <Input
          placeholder="Search"
          variant2
          leftIcon={<SearchIcon className="text-primary" size={16} />}
        />
        <Button
          leftIcon={<FilterIcon className="text-primary" size={16} />}
          variant="neutral"
        >
          Filter
        </Button>
        <Button
          leftIcon={<DownloadIcon className="text-inverted" size={16} />}
          variant="secondary"
        >
          Export
        </Button>
      </Container>
    </Container>
  );
};
