"use client";

import { Container, Text } from "@resonance/ui";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  emptyMessage?: string;
}

export function DataTable<TData>({
  columns,
  data,
  emptyMessage = "No records found",
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container className="w-full overflow-x-auto border rounded-t-lg border-border">
      <Container as="table" className="w-full border-collapse">
        <Container as="thead" className="bg-muted ">
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
                className="border-b border-border last:border-b-0"
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
              <Container
                as="td"
                colSpan={columns.length}
                className="px-4 py-3.5 text-center"
              >
                <Text variant="bodySmall" tone="secondary">
                  {emptyMessage}
                </Text>
              </Container>
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  );
}
