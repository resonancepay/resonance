"use client";

import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "../container";
import { SideDrawerProps } from "./side-drawer.types";

export function SideDrawer({ isOpen, onClose, width = 460, children }: SideDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // A single rAF often fires before the browser paints the initial
      // (off-screen) state, so the transition never gets a starting frame
      // to animate from. Waiting a second rAF guarantees that paint happened.
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
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-200 ease-out",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      <Container
        onClick={(e: MouseEvent) => e.stopPropagation()}
        style={{ width }}
        className={[
          "fixed inset-y-4 right-4 bg-surface rounded-2xl shadow-lg overflow-hidden flex flex-col",
          "transition-transform duration-200 ease-out",
          visible ? "translate-x-0" : "translate-x-[calc(100%+1rem)]",
        ].join(" ")}
      >
        {children}
      </Container>
    </Container>,
    document.body,
  );
}
