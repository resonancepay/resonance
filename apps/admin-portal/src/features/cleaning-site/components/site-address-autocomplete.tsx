"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Text } from "@resonance/ui";
import { LocationIcon } from "@resonance/ui/icons";
import {
  autocompletePlaces,
  getPlaceDetails,
  PlaceLocation,
  PlaceSuggestion,
} from "../services/places.service";

interface SiteAddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: PlaceLocation) => void;
  error?: string;
  disabled?: boolean;
}

export const SiteAddressAutocomplete = ({
  value,
  onChange,
  onPlaceSelect,
  error,
  disabled,
}: SiteAddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTokenRef = useRef<string>(crypto.randomUUID());

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleInputChange = (text: string) => {
    onChange(text);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!text.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const results = await autocompletePlaces(text, sessionTokenRef.current);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    }, 300);
  };

  const handleSelect = async (suggestion: PlaceSuggestion) => {
    setIsOpen(false);
    onChange(suggestion.fullText);

    const details = await getPlaceDetails(suggestion.placeId, sessionTokenRef.current);
    // Selecting ends this autocomplete session — the next search starts a
    // fresh (cheaper) billed session instead of continuing this one.
    sessionTokenRef.current = crypto.randomUUID();

    if (details) {
      onPlaceSelect(details);
    }
  };

  return (
    <Container className="flex flex-col gap-1 relative">
      <Container className="flex items-center gap-0.5 mb-2">
        <Text variant="bodySmall" className="text-primary">
          Site Location
        </Text>
        <Text variant="bodySmall" className="text-danger-text-icons">
          *
        </Text>
      </Container>

      <Container
        className={[
          "flex items-center rounded-xl border transition-colors overflow-hidden bg-muted",
          disabled ? "opacity-60" : "",
          error
            ? "border-danger-border"
            : "border-transparent focus-within:border-brand-border",
        ].join(" ")}
      >
        <Container className="relative flex items-center flex-1">
          <input
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            placeholder="Pick site location"
            disabled={disabled}
            className={[
              "w-full h-10 border-0 outline-none transition-colors bg-transparent font-sans",
              "px-4 text-base sm:text-xs placeholder:text-secondary pr-10",
              disabled ? "cursor-not-allowed" : "",
              error ? "text-danger-text-icons" : "text-primary",
            ].join(" ")}
          />
          <Container
            as="span"
            className="absolute right-3 size-5 shrink-0 flex items-center justify-center text-secondary"
          >
            <LocationIcon size={20} />
          </Container>
        </Container>
      </Container>

      {isOpen && suggestions.length > 0 && (
        <Container className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-xl shadow-lg z-10 overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <Container
              key={suggestion.placeId}
              as="button"
              type="button"
              onClick={() => handleSelect(suggestion)}
              className="w-full text-left px-4 py-2.5 hover:bg-muted transition-colors border-b border-border last:border-b-0"
            >
              <Text variant="bodySmall" className="text-primary block">
                {suggestion.mainText}
              </Text>
              {suggestion.secondaryText && (
                <Text variant="bodyXSmall" className="text-secondary">
                  {suggestion.secondaryText}
                </Text>
              )}
            </Container>
          ))}
        </Container>
      )}

      {error && (
        <Text variant="bodySmall" className="text-danger-text-icons">
          {error}
        </Text>
      )}
    </Container>
  );
};
