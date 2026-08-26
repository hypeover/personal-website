"use client"

import type mapboxgl from "mapbox-gl"
import type { PopupOptions } from "mapbox-gl"
import { mapgl } from "./map-library"
import { useEffect, useMemo, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type MapPopupProps = {
  /** Coordinates [longitude, latitude] for popup position */
  coordinates: MapCoordinates
  /** Callback when popup is closed */
  onClose?: () => void
  /** Popup content */
  children: ReactNode
  /** Additional CSS classes for the popup container */
  className?: string
  /** Show a close button in the popup (default: false) */
  closeButton?: boolean
} & Omit<PopupOptions, "className" | "closeButton">

export function MapPopup({
  coordinates,
  onClose,
  children,
  className,
  closeButton = false,
  offset = 12,
  anchor,
  maxWidth = "none",
  focusAfterOpen = false,
}: MapPopupProps) {
  const { map } = useMap()
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const container = useMemo(() => document.createElement("div"), [])

  // Wyciągamy prymitywne wartości z tablicy, aby zapobiec zbędnym re-renderom przy ruchu mapy
  const lng = coordinates[0]
  const lat = coordinates[1]

  useEffect(() => {
    if (!map || !map.isStyleLoaded()) return

    // Tworzymy instancję popupu z wyłączoną automatyczną koordynacją kamery (focusAfterOpen: false)
    const popup = new mapgl.Popup({
      offset,
      closeOnClick: false,
      closeButton: false,
      focusAfterOpen: false,
      anchor,
      className: "custom-map-popup",
    })
      .setMaxWidth(maxWidth)
      .setDOMContent(container)
      .setLngLat([lng, lat])
      .addTo(map)

    popupRef.current = popup

    // Zamykamy popup tylko przy kliknięciu poza jego kontenerem (np. w tło mapy)
    const handleMapClick = (e: MouseEvent) => {
      if (container && !container.contains(e.target as Node)) {
        onClose?.()
      }
    }

    // setTimeout ze skokiem 0 zapobiega odpaleniu kliknięcia w tej samej klatce co otwarcie z markera
    const timeoutId = setTimeout(() => {
      const mapCanvas = map.getContainer()
      mapCanvas?.addEventListener("click", handleMapClick)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      const mapCanvas = map.getContainer()
      mapCanvas?.removeEventListener("click", handleMapClick)
      popup.remove()
      popupRef.current = null
    }
  }, [map, lng, lat, offset, anchor, maxWidth, onClose, container])

  return createPortal(
    <div
      className={cn(
        "relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      {closeButton && (
        <button
          type="button"
          onClick={() => {
            popupRef.current?.remove()
            onClose?.()
          }}
          className="absolute top-1 right-1 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </div>,
    container
  )
}