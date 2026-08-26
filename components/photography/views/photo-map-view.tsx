"use client";

import React, { useEffect, useState } from "react";
import { Map } from "@/components/ui/map/map";
import { useMap } from "@/components/ui/map/hooks";
import { MapPopup } from "@/components/ui/map/popup";
import {
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map/marker";
import Image from "next/image";

type Photo = {
  title: string;
  url: string;
  location: { city: string; country: string; lat: number; lon: number };
  date: string;
};

type PhotoMapViewProps = {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
};

// Sub-komponent nasłuchujący ruchu/obracania kuli
function MapEvents({ onMove }: { onMove: () => void }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    // Gdy użytkownik zacznie przesuwać lub obracać kulę, wywołujemy funkcję zamykającą popup
    map.on("movestart", onMove);

    return () => {
      map.off("movestart", onMove);
    };
  }, [map, isLoaded, onMove]);

  return null;
}

// Sub-komponent dodający warstwę poświaty/heatmapy pod markery
function HeatmapLayer({ photos }: { photos: Photo[] }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const sourceId = "photos-heatmap-source";
    const layerId = "photos-heatmap-layer";

    const geojson: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: photos.map((photo) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [photo.location.lon, photo.location.lat],
        },
        properties: { weight: 1 },
      })),
    };

    if (map.getLayer(layerId)) map.removeLayer(layerId);
    if (map.getSource(sourceId)) map.removeSource(sourceId);

    map.addSource(sourceId, {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: layerId,
      type: "heatmap",
      source: sourceId,
      maxzoom: 15,
      paint: {
        "heatmap-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 10,
          2.5, 25,
          6, 40
        ],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(255, 255, 255, 0)",
          0.2, "rgba(255, 255, 255, 0.2)",
          0.5, "rgba(255, 255, 255, 0.5)",
          0.8, "rgba(255, 255, 255, 0.8)",
          1, "rgba(255, 255, 255, 0.95)"
        ],
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
        "heatmap-opacity": 0.85,
      },
    });

    return () => {
      if (map && map.getStyle()) {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      }
    };
  }, [map, isLoaded, photos]);

  return null;
}

export default function PhotoMapView({
  photos,
  onPhotoClick,
}: PhotoMapViewProps) {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activePhoto = activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="relative group">
        <div className="absolute -inset-12 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-accent/20 blur-3xl opacity-75 animate-glow pointer-events-none" />

        <div className="relative h-[45rem] w-[45rem] rounded-full overflow-hidden shadow-2xl border border-border/30">
          <Map
            minZoom={2.1}
            initialViewState={{
              longitude: 15.0,
              latitude: 50.0,
              zoom: 2.5,
            }}
            projection="globe"
            accessToken={accessToken}
          >
            {/* Nasłuchiwanie ruchu kuli – zamyka popup w momencie rozpoczęcia obrotu */}
            <MapEvents onMove={() => setActivePhotoIndex(null)} />

            {/* Warstwa Heatmapy */}
            <HeatmapLayer photos={photos} />

            {/* Markery */}
            {photos.map((photo, index) => (
              <MapMarker
                key={`${photo.url}-${index}`}
                coordinates={[photo.location.lon, photo.location.lat]}
                onClick={(e) => {
                  e.originalEvent?.stopPropagation();
                  setActivePhotoIndex(index);
                }}
              >
                <MarkerContent>
                  <div className="relative flex items-center justify-center cursor-pointer group/marker p-2">
                    <span className="absolute size-8 rounded-full bg-foreground/40 blur-md transition-transform duration-300 group-hover/marker:scale-125" />
                    <span className="absolute size-5 rounded-full bg-foreground/80 blur-[4px] transition-transform duration-300 group-hover/marker:scale-150" />
                    <div className="relative size-3 rounded-full bg-foreground shadow-sm transition-transform duration-200 group-hover/marker:scale-110" />
                  </div>
                </MarkerContent>
              </MapMarker>
            ))}

            {/* Popup ze zdjęciem */}
            {activePhoto && (
  <MapPopup
    coordinates={[activePhoto.location.lon, activePhoto.location.lat]}
    onClose={() => setActivePhotoIndex(null)}
    offset={12}
    className="p-0 border-0 bg-transparent shadow-none [&_.mapboxgl-popup-content]:p-0 [&_.mapboxgl-popup-content]:bg-transparent [&_.mapboxgl-popup-content]:shadow-none [&_.mapboxgl-popup-content]:rounded-none [&_.mapboxgl-popup-tip]:hidden"
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (activePhotoIndex !== null) {
          onPhotoClick(activePhotoIndex);
        }
      }}
      className="group relative cursor-pointer overflow-hidden shadow-2xl transition-all hover:scale-105 w-36 sm:w-48 h-28 sm:h-36 rounded-sm"
    >
      <Image
        src={activePhoto.url}
        alt={activePhoto.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="200px"
      />
    </div>
  </MapPopup>
)}
          </Map>

          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, transparent 65%, var(--color-background) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}