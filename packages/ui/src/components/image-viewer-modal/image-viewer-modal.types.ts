export interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
}
