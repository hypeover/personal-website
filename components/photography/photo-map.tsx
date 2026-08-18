"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Photo } from "./custom-carousel";

const LIGHT_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function createPinIcon() {
  return L.divIcon({
    className: "photo-map-pin",
    html: `<span class="photo-map-pin-dot"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

type LocatedPhoto = { photo: Photo; index: number };

function FitBounds({ located }: { located: LocatedPhoto[] }) {
  const map = useMap();

  React.useEffect(() => {
    const points = located.map(
      (entry) => [entry.photo.location!.lat, entry.photo.location!.lon] as [number, number]
    );
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 6);
      return;
    }
    map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 8 });
  }, [map, located]);

  return null;
}

interface PhotoMapProps {
  photos: Photo[];
  onPhotoClick?: (index: number) => void;
}

export default function PhotoMap({ photos, onPhotoClick }: PhotoMapProps) {
  const { resolvedTheme } = useTheme();
  const pinIcon = React.useMemo(() => createPinIcon(), []);

  const located: LocatedPhoto[] = photos
    .map((photo, index) => ({ photo, index }))
    .filter((entry) => entry.photo.location);

  return (
    <div className="relative h-screen w-full">
      <style dangerouslySetInnerHTML={{
        __html: `
          .photo-map-pin-dot {
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            background: var(--foreground);
            border: 2px solid var(--background);
            box-shadow: 0 0 0 1px var(--foreground);
            cursor: pointer;
          }
          .leaflet-popup-content-wrapper {
            background: var(--background);
            color: var(--foreground);
            border-radius: 0.375rem;
          }
          .leaflet-popup-tip {
            background: var(--background);
          }
        `,
      }} />
      <MapContainer
          center={[30, 15]}
          zoom={2}
          minZoom={2}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution={TILE_ATTRIBUTION}
            url={resolvedTheme === "dark" ? DARK_TILE_URL : LIGHT_TILE_URL}
          />
          <FitBounds located={located} />
          {located.map(({ photo, index }) => (
            <Marker
              key={photo.url}
              position={[photo.location!.lat, photo.location!.lon]}
              icon={pinIcon}
              eventHandlers={{
                click: () => onPhotoClick?.(index),
              }}
            >
              <Popup>
                <div className="flex flex-col items-start gap-1.5">
                  <div className="relative h-24 w-32 overflow-hidden rounded-sm">
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium">
                    {photo.location!.city}, {photo.location!.country}
                  </p>
                  {photo.date && (
                    <p className="text-xs text-muted-foreground">{photo.date}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
