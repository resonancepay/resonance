"use client";

import { Container, Text } from "@resonance/ui";
import { FolderIcon } from "@resonance/ui/icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "./table/pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<TData>({
  columns,
  data,
  emptyTitle = "No records found",
  emptyDescription,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <Container className="w-full h-full mb-3 flex flex-col overflow-hidden border rounded-lg border-border">
      <Container className="flex-1 min-h-0 overflow-auto">
        <Container as="table" className="w-full border-collapse">
          <Container as="thead" className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <Container as="tr" key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => (
                  <Container
                    as="th"
                    key={header.id}
                    className="px-4 py-2.5 text-left"
                  >
                    {header.isPlaceholder ? null : (
                      <Text variant="button" tone="secondary">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Text>
                    )}
                  </Container>
                ))}
              </Container>
            ))}
          </Container>
          <Container as="tbody">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Container
                  as="tr"
                  key={row.id}
                  className="border-b border-border"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Container as="td" key={cell.id} className="px-4 py-3.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Container>
                  ))}
                </Container>
              ))
            ) : (
              <Container as="tr">
                <Container as="td" colSpan={columns.length} className="px-4 py-3.5">
                  <Container className="flex flex-col items-center justify-center gap-3 py-12">
                    <FolderIcon />
                    <Container className="flex flex-col items-center gap-1">
                      <Text variant="bodySmall" tone="primary">
                        {emptyTitle}
                      </Text>
                      {emptyDescription && (
                        <Text
                          variant="bodyXSmall"
                          tone="secondary"
                          className="text-center"
                        >
                          {emptyDescription}
                        </Text>
                      )}
                    </Container>
                  </Container>
                </Container>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
      {pageCount > 0 && (
        <Pagination
          currentPage={pageIndex + 1}
          totalPages={pageCount}
          pageSize={pageSize}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          onPageSizeChange={(size) => table.setPageSize(size)}
        />
      )}
    </Container>
  );
}
