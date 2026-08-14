import { DocTypeWrapper } from "@/components/generics/doc-type-wrapper";
import { PdfPreviewModal } from "@/components/generics/pdf-preview-modal";
import { Container, Text } from "@resonance/ui";
import React, { useState } from "react";

interface CleanerDocWrapperProps {
  label?: string;
}

export const CleanerDocWrapper = ({ label }: CleanerDocWrapperProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const hasDocument = Boolean(label);

  return (
    <Container className="flex flex-col justify-center min-w-0">
      <Container
        as="button"
        type="button"
        disabled={!hasDocument}
        onClick={() => setPreviewOpen(true)}
        className={hasDocument ? "cursor-pointer" : "cursor-default"}
      >
        <DocTypeWrapper />
      </Container>
      <Container className="mt-1 min-w-0">
        <Text
          as={hasDocument ? "button" : "span"}
          type={hasDocument ? "button" : undefined}
          variant="bodyXSmall"
          tone="brand"
          title={label}
          onClick={hasDocument ? () => setPreviewOpen(true) : undefined}
          className={`block w-full truncate text-left ${hasDocument ? "cursor-pointer underline" : ""}`}
        >
          {label || "No document"}
        </Text>
      </Container>

      {hasDocument && (
        <PdfPreviewModal
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          url={label as string}
        />
      )}
    </Container>
  );
};
