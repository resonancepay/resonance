"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../../icons";
import { Container } from "../container";
import { CountryCode, COUNTRIES } from "../country-selector/countries";

interface CountrySelectProps {
  value: CountryCode;
  onChange: (country: CountryCode) => void;
  disabled?: boolean;
  error?: boolean;
  inputClassName?: string;
}

export function CountrySelect({
  value,
  onChange,
  disabled,
  error,
  inputClassName,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected =
    COUNTRIES.find((c) => c.code === value) ??
    COUNTRIES.find((c) => c.code === "GB")!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container className="relative shrink-0" ref={ref}>
      <Container
        as="button"
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "h-10 flex items-center gap-1.5 px-3 rounded-l-xl rounded-r-sm border cursor-pointer disabled:cursor-not-allowed",
          inputClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="text-xs leading-none">{selected.flag}</span>
        <span
          className={[
            "text-xs font-sans",
            error ? "text-danger-text-icons" : "text-primary",
          ].join(" ")}
        >
          {selected.dialCode}
        </span>
        <ChevronDownIcon
          size={16}
          className={[
            "transition-transform",
            open ? "rotate-180" : "",
            error ? "text-danger-text-icons" : "text-secondary",
          ].join(" ")}
        />
      </Container>

      {open && (
        <Container className="absolute top-full left-0 mt-2 z-50 w-40 rounded-xl bg-surface shadow-300 border border-border overflow-hidden">
          <Container className="overflow-y-auto max-h-52">
            {COUNTRIES.map((country) => (
              <Container
                as="button"
                type="button"
                key={country.code}
                onClick={() => {
                  onChange(country.code);
                  setOpen(false);
                }}
                className={[
                  "w-full flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-muted",
                  selected.code === country.code ? "bg-brand-bg-light" : "",
                ].join(" ")}
              >
                <span className="text-xs leading-none shrink-0">
                  {country.flag}
                </span>
                <span className="text-xs font-sans text-primary shrink-0">
                  {country.dialCode}
                </span>
              </Container>
            ))}
          </Container>
        </Container>
      )}
    </Container>
  );
}
