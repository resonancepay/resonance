"use client";

import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "../container";
import { ModalProps } from "./modal.types";

export function Modal({ isOpen, onClose, width = 379, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
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
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-200 ease-out",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      <Container
        onClick={(e: MouseEvent) => e.stopPropagation()}
        style={{ width }}
        className={[
          "p-2 bg-surface rounded-2xl overflow-auto",
          "transition-all duration-200 ease-out",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        ].join(" ")}
      >
        {children}
      </Container>
    </Container>,
    document.body,
  );
}
