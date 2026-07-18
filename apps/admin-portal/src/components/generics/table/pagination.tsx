"use client";

import { Container, Select, Text } from "@resonance/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@resonance/ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

function getPageWindow(current: number, total: number, windowSize = 4): number[] {
  if (total <= windowSize) return Array.from({ length: total }, (_, i) => i + 1);
  let start = Math.max(1, current - Math.floor(windowSize / 2));
  const end = Math.min(total, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const pages = getPageWindow(currentPage, totalPages);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <Container className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-border bg-surface">
      <Container className="flex items-center gap-1">
        <Container
          as="button"
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(1)}
          className="p-1.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
        >
          <Container className="flex items-center -space-x-2">
            <ChevronLeftIcon size={16} className="text-brand-secondary-text-icons" />
            <ChevronLeftIcon size={16} className="text-brand-secondary-text-icons" />
          </Container>
        </Container>
        <Container
          as="button"
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
        >
          <ChevronLeftIcon size={16} className="text-brand-secondary-text-icons" />
        </Container>

        {pages.map((page) => (
          <Container
            key={page}
            as="button"
            type="button"
            onClick={() => onPageChange(page)}
            className={`size-8 rounded-full flex items-center justify-center ${
              page === currentPage ? "bg-brand-secondary-bg-bold" : "hover:bg-muted"
            }`}
          >
            <Text variant="bodySmall" tone={page === currentPage ? "inverted" : "primary"}>
              {page}
            </Text>
          </Container>
        ))}

        <Container
          as="button"
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
        >
          <ChevronRightIcon size={16} className="text-brand-secondary-text-icons" />
        </Container>
        <Container
          as="button"
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(totalPages)}
          className="p-1.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
        >
          <Container className="flex items-center -space-x-2">
            <ChevronRightIcon size={16} className="text-brand-secondary-text-icons" />
            <ChevronRightIcon size={16} className="text-brand-secondary-text-icons" />
          </Container>
        </Container>
      </Container>

      {onPageSizeChange && (
        <Container className="w-20">
          <Select
            options={pageSizeOptions.map((size) => ({
              label: String(size),
              value: String(size),
            }))}
            value={String(pageSize)}
            onChange={(value) => onPageSizeChange(Number(value))}
          />
        </Container>
      )}
    </Container>
  );
};
