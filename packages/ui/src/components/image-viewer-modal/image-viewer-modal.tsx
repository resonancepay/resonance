"use client";

import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../icons";
import { Container } from "../container";
import { ImageViewerModalProps } from "./image-viewer-modal.types";

// Same mount/animate lifecycle as Modal, but a near-full-screen dark
// backdrop tuned for viewing a single image at full size rather than a form.
export function ImageViewerModal({
  isOpen,
  onClose,
  src,
  alt = "Full image",
}: ImageViewerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    setVisible(false);
    const timeout = setTimeout(() => setMounted(false), 200);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <Container
      onClick={onClose}
      className={[
        "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6",
        "transition-opacity duration-200 ease-out",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      <Container
        as="button"
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <CloseIcon size={20} className="text-white" />
      </Container>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(e: MouseEvent) => e.stopPropagation()}
        className={[
          "max-w-full max-h-full object-contain rounded-lg",
          "transition-all duration-200 ease-out",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        ].join(" ")}
      />
    </Container>,
    document.body,
  );
}
