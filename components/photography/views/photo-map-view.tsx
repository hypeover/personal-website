"use client";

import React, { useEffect } from "react";
import { Map } from "@/components/ui/map/map";
import { useMap } from "@/components/ui/map/hooks";
import {
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map/marker";

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
          0,
          10,
          2.5,
          25,
          6,
          40,
        ],
        // Używamy zmiennej koloru tekstu/elementów wokalnych (foreground / white w trybie dark) dla gradientu
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(255, 255, 255, 0)",
          0.2,
          "rgba(255, 255, 255, 0.2)",
          0.5,
          "rgba(255, 255, 255, 0.5)",
          0.8,
          "rgba(255, 255, 255, 0.8)",
          1,
          "rgba(255, 255, 255, 0.95)",
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

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="relative group">
        {/* Tło: Rozmyta poświata za całą kulą */}
        <div className="absolute -inset-12 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-accent/20 blur-3xl opacity-75 animate-glow pointer-events-none" />

        {/* Kontener kuli */}
        <div className="relative h-[45rem] w-[45rem] rounded-full overflow-hidden shadow-2xl border border-border/30">
          <Map
            minZoom={2.1}
            zoom={2.5}
            projection="globe"
            accessToken={accessToken}
            center={[15.0, 50.0]}
          >
            {/* Warstwa Heatmapy pod spodem */}
            <HeatmapLayer photos={photos} />

            {/* Ciemne markery z poświatą bazujące na zmiennych CSS */}
            {photos.map((photo, index) => (
              <MapMarker
                key={`${photo.url}-${index}`}
                coordinates={[photo.location.lon, photo.location.lat]}
                onClick={() => onPhotoClick(index)}
              >
                <MarkerContent>
                  <div className="relative flex items-center justify-center cursor-pointer group/marker p-2">
                    {/* 1. Szersza, miękka czarna poświata */}
                    <span className="absolute size-8 rounded-full bg-black/40 blur-md transition-transform duration-300 group-hover/marker:scale-125" />

                    {/* 2. Ostra czarna poświata tuż pod kropką */}
                    <span className="absolute size-5 rounded-full bg-black/80 blur-[4px] transition-transform duration-300 group-hover/marker:scale-150" />

                    {/* 3. Główna CZARNA kropka w środku */}
                    <div className="relative size-3 rounded-full bg-black shadow-sm transition-transform duration-200 group-hover/marker:scale-110" />
                  </div>
                </MarkerContent>

                <MarkerTooltip>
                  <div className="text-xs font-medium">
                    {photo.location.city}, {photo.location.country}
                  </div>
                </MarkerTooltip>
              </MapMarker>
            ))}
          </Map>

          {/* Nakładka przyciemniająca brzegi kuli z użyciem zmiennej koloru tła */}
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
