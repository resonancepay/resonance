"use client";

import { Button, Container, Input, Text } from "@resonance/ui";
import { DownloadIcon, FilterIcon, SearchIcon } from "@resonance/ui/icons";
import { Popover } from "antd";
import { ReactNode, useState } from "react";

interface TableFilterProps {
  title: string;
  count: number;
  renderFilterContent: (props: {
    onCancel: () => void;
    onSave: () => void;
  }) => ReactNode;
  extraAction?: ReactNode;
}

export const TableFilter = ({
  title,
  count,
  renderFilterContent,
  extraAction,
}: TableFilterProps) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Container className="flex items-center justify-between mb-4">
      <Container className="gap-1 flex items-center">
        <Text variant="h5" tone="primary">
          {title}
        </Text>
        <Container className="bg-moss-green-bg-light w-6  h-6 flex items-center justify-center rounded-lg">
          <Text variant="bodyXSmall" className="text-moss-green-text-icons">
            {count}
          </Text>
        </Container>
      </Container>
      <Container className="flex items-center gap-2">
        <Input
          placeholder="Search"
          variant2
          leftIcon={<SearchIcon className="text-primary" size={16} />}
        />
        <Popover
          trigger="click"
          open={filterOpen}
          onOpenChange={setFilterOpen}
          placement="bottomRight"
          arrow={false}
          content={renderFilterContent({
            onCancel: () => setFilterOpen(false),
            onSave: () => setFilterOpen(false),
          })}
          classNames={{
            root: "!p-0",
            container:
              "!p-0 !rounded-2xl !shadow-lg !bg-surface border border-border",
          }}
        >
          <Button
            leftIcon={<FilterIcon className="text-primary" size={16} />}
            variant="neutral"
          >
            Filter
          </Button>
        </Popover>
        <Button
          leftIcon={<DownloadIcon className="text-inverted" size={16} />}
          variant="secondary"
        >
          Export
        </Button>
        {extraAction}
      </Container>
    </Container>
  );
};
