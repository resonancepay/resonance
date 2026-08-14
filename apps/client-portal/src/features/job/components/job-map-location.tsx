"use client";

import { Container, Text } from "@resonance/ui";
import { NextIcon } from "@resonance/ui/icons";
import Image from "next/image";
import { useState } from "react";

interface JobMapLocationProps {
  address?: string;
  lat?: string;
  lng?: string;
}

const MAP_WIDTH = 640;
const MAP_HEIGHT = 260;

export const JobMapLocation = ({ address, lat, lng }: JobMapLocationProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  const latitude = lat ? Number(lat) : NaN;
  const longitude = lng ? Number(lng) : NaN;
  const hasCoords = !Number.isNaN(latitude) && !Number.isNaN(longitude);
  // Querying by the address text (rather than bare lat,lng) is what makes
  // Google Maps land on the named place instead of an unnamed coordinate pin.
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : hasCoords
      ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      : undefined;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const staticMapUrl = hasCoords
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=${MAP_WIDTH}x${MAP_HEIGHT}&scale=2&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`
    : undefined;

  return (
    <Container className="bg-surface border-border border-[0.5px] rounded-2xl overflow-hidden">
      {staticMapUrl && !imageFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={staticMapUrl}
          alt="Cleaning location map"
          className="w-full h-56 object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Container className="h-23 bg-muted flex items-center justify-center">
          <Text variant="bodyXSmall" tone="secondary">
            {hasCoords ? "Map failed to load" : "Location unavailable"}
          </Text>
        </Container>
      )}
      <Container className="mt-2 p-2.5 flex items-center justify-between">
        <Container>
          <Container className="flex items-center gap-1">
            <Image
              src={"/assets/images/Round Pushpin.png"}
              alt="pin"
              width={16}
              height={16}
            />
            <Text tone="primary" variant="bodyXSmall">
              Cleaning Location
            </Text>
          </Container>
          <Text variant="bodyXSmall" tone="secondary">
            {address || "N/A"}
          </Text>
        </Container>
        <Container
          as="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 ${
            mapsUrl ? "" : "opacity-50 pointer-events-none"
          }`}
        >
          <NextIcon className="text-primary" size={20} />
        </Container>
      </Container>
    </Container>
  );
};
