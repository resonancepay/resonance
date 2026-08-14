"use client";

import { AvailabilityStatus } from "@/components/generics/table/availability-status";
import { Container, Input, Modal, Text } from "@resonance/ui";
import { SearchIcon, UserIcon } from "@resonance/ui/icons";
import { useMemo, useState } from "react";
import { ApprovedCleaner } from "@/features/cleaners/types/cleaner.type";

interface SelectCleanerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cleaners: ApprovedCleaner[];
  selectedCleanerId?: string;
  onSelect: (cleanerId: string) => void;
}

export const SelectCleanerModal = ({
  isOpen,
  onClose,
  cleaners,
  selectedCleanerId,
  onSelect,
}: SelectCleanerModalProps) => {
  const [search, setSearch] = useState("");

  const filteredCleaners = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return cleaners;
    return cleaners.filter((cleaner) =>
      cleaner.full_name.toLowerCase().includes(query),
    );
  }, [cleaners, search]);

  const handleSelect = (cleanerId: number) => {
    onSelect(String(cleanerId));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width={420}>
      <Container className="px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary">
          Select Cleaner
        </Text>
      </Container>

      <Container className="px-2">
        <Input
          placeholder="Search"
          value={search}
          variant2
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<SearchIcon className="text-secondary" size={18} />}
        />
      </Container>

      <Container className="flex flex-col gap-1 mt-4 px-2 pb-2 max-h-96 overflow-y-auto">
        {filteredCleaners.map((cleaner) => {
          const checked = selectedCleanerId === String(cleaner.cleaner_id);

          return (
            <Container
              key={cleaner.cleaner_id}
              as="button"
              type="button"
              onClick={() => handleSelect(cleaner.cleaner_id)}
              className={[
                "flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                checked ? "bg-brand-bg-light" : "hover:bg-muted",
              ].join(" ")}
            >
              <Container
                className={[
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  checked ? "border-brand-tertiary-bg-bold" : "border-border",
                ].join(" ")}
              >
                {checked && (
                  <Container className="w-2.5 h-2.5 rounded-full bg-brand-tertiary-bg-bold" />
                )}
              </Container>

              <Container className="size-8 rounded-full bg-brand-secondary-bg-light flex items-center justify-center shrink-0">
                <UserIcon size={16} className="text-brand-secondary-text-icons" />
              </Container>

              <Text variant="bodySmall" tone="primary" className="flex-1 truncate">
                {cleaner.full_name}
              </Text>

              <AvailabilityStatus status={cleaner.availability} />
            </Container>
          );
        })}

        {filteredCleaners.length === 0 && (
          <Text
            variant="bodySmall"
            tone="secondary"
            className="text-center py-6"
          >
            No cleaners match your search
          </Text>
        )}
      </Container>
    </Modal>
  );
};
