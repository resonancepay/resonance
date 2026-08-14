"use client";

import { Container, Modal, Text } from "@resonance/ui";
import { CloseIcon, DownloadIcon } from "@resonance/ui/icons";

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

export const PdfPreviewModal = ({
  isOpen,
  onClose,
  url,
  title = "Document Preview",
}: PdfPreviewModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width={720}>
      <Container className="flex items-center justify-between px-2 pt-1 pb-3">
        <Text variant="h5" tone="primary" className="truncate">
          {title}
        </Text>
        <Container className="flex items-center gap-3 shrink-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-brand-text-icons"
          >
            <DownloadIcon size={18} />
            <Text variant="bodyXSmall" tone="brand">
              Open in new tab
            </Text>
          </a>
          <Container as="button" type="button" onClick={onClose}>
            <CloseIcon size={20} className="text-secondary" />
          </Container>
        </Container>
      </Container>

      <Container className="rounded-xl overflow-hidden bg-muted h-[75vh]">
        <iframe src={url} title={title} className="w-full h-full border-0" />
      </Container>

      <Container className="px-2 pt-3">
        <Text variant="bodyXSmall" tone="secondary">
          Not loading?{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text-icons underline"
          >
            Open the document in a new tab
          </a>
          .
        </Text>
      </Container>
    </Modal>
  );
};
