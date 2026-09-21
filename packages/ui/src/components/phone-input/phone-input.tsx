"use client";

import { useState } from "react";
import { Container } from "../container";
import { Text } from "../text";
import { CountryCode, COUNTRIES } from "../country-selector/countries";
import { PhoneInputProps } from "./phone-input.types";
import { CountrySelect } from "./country-select";

export function PhoneInput({
  label,
  required,
  hint,
  error,
  disabled,
  placeholder,
  defaultCountry = "GB",
  value,
  onChange,
}: PhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>(defaultCountry);
  const [inputValue, setInputValue] = useState("");

  function handleCountryChange(selected: CountryCode) {
    setCountry(selected);
    const countryData = COUNTRIES.find((c) => c.code === selected);
    const newFull = countryData
      ? `${countryData.dialCode}${inputValue}`
      : inputValue;
    onChange?.(newFull);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(raw);
    const countryData = COUNTRIES.find((c) => c.code === country);
    const full = countryData ? `${countryData.dialCode}${raw}` : raw;
    onChange?.(full);
  }

  return (
    <Container className="flex flex-col gap-1">
      {label && (
        <Container as="label" className="flex items-center gap-0.5 mb-1">
          <Text variant="bodySmall" className="text-primary">
            {label}
          </Text>
          {required && (
            <Text variant="bodySmall" className="text-danger-text-icons">
              *
            </Text>
          )}
        </Container>
      )}

      <Container className="flex items-center gap-1">
        <CountrySelect
          value={country}
          onChange={handleCountryChange}
          disabled={disabled}
          error={!!error}
          inputClassName={
            disabled
              ? "bg-muted border-transparent text-tertiary"
              : error
                ? "bg-surface border-danger-border"
                : "bg-surface border-transparent"
          }
        />

        <input
          type="tel"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder={placeholder ?? "Enter phone number"}
          className={[
            "flex-1 h-10 rounded-r-2xl rounded-l-sm border outline-none px-4 text-base sm:text-xs transition-colors font-sans",
            "placeholder:text-secondary",
            disabled
              ? "bg-muted border-transparent text-tertiary cursor-not-allowed"
              : error
                ? "bg-surface border-danger-border text-danger-text-icons focus:border-danger-border"
                : "bg-surface border-transparent text-primary focus:border-brand-border",
          ].join(" ")}
        />
      </Container>

      {error && (
        <Text variant="bodySmall" className="text-danger-text-icons">
          {error}
        </Text>
      )}
      {!error && hint && (
        <Text variant="bodySmall" className="text-tertiary">
          {hint}
        </Text>
      )}
    </Container>
  );
}
