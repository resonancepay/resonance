"use client";

import { Button, Text } from "@resonance/ui";
import { useToast } from "@/shared/toast";
import type { ToastVariant } from "@/shared/toast";

const variants: { variant: ToastVariant; label: string }[] = [
  { variant: "success", label: "Success" },
  { variant: "warning", label: "Warning" },
  { variant: "error", label: "Error" },
  { variant: "info", label: "Info" },
  { variant: "network-on", label: "Network On" },
  { variant: "network-off", label: "Network Off" },
];

export function ToastTest() {
  const { addToast } = useToast();

  return (
    <section className="flex flex-col gap-4">
      <Text variant="h4" className="text-primary">Toast</Text>
      <div className="flex flex-wrap gap-3">
        {variants.map(({ variant, label }) => (
          <Button
            key={variant}
            variant="neutral"
            onClick={() =>
              addToast({
                variant,
                title: label,
                description: "This is a description",
                placement: "top-right",
              })
            }
          >
            {label}
          </Button>
        ))}
      </div>
    </section>
  );
}
