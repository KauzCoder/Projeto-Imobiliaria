import React, { useEffect, useRef, useState } from "react";
import { PropertyPin } from "./PropertyPin";

const tileSize = 256;
const minMapZoom = 13;
const maxMapZoom = 18;
const tileOffsets = [-3, -2, -1, 0, 1, 2, 3];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function latLngToWorldPixel(location, zoom) {
  const lat = clamp(Number(location.lat), -85.05112878, 85.05112878);
  const lng = Number(location.lng);
  const scale = tileSize * 2 ** zoom;
  const sinLat = Math.sin((lat * Math.PI) / 180);

  return {
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale,
  };
}

function tileUrl(x, y, zoom) {
  const tileCount = 2 ** zoom;
  const wrappedX = ((x % tileCount) + tileCount) % tileCount;
  const clampedY = clamp(y, 0, tileCount - 1);

  return `https://tile.openstreetmap.org/${zoom}/${wrappedX}/${clampedY}.png`;
}

export const propertyMapZoom = {
  min: minMapZoom,
  max: maxMapZoom,
  initial: 15,
};

export const PropertyMap = React.memo(function PropertyMap({
  activeProperty,
  properties,
  zoom,
  isLoading,
  onSelectProperty,
  onZoomIn,
  onZoomOut,
}) {
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ isDragging: false, lastX: 0, lastY: 0, pointerId: null });
  const centerLocation = activeProperty?.mapLocation ?? { lat: -1.45583, lng: -48.50389 };
  const centerPixel = latLngToWorldPixel(centerLocation, zoom);
  const viewportCenterPixel = {
    x: centerPixel.x - panOffset.x,
    y: centerPixel.y - panOffset.y,
  };
  const centerTileX = Math.floor(viewportCenterPixel.x / tileSize);
  const centerTileY = Math.floor(viewportCenterPixel.y / tileSize);
  const centerOffsetX = viewportCenterPixel.x - centerTileX * tileSize;
  const centerOffsetY = viewportCenterPixel.y - centerTileY * tileSize;

  useEffect(() => {
    setPanOffset({ x: 0, y: 0 });
  }, [activeProperty?.id, zoom]);

  const startPan = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    if (event.target.closest("button, a, input, select, textarea, label")) return;

    dragState.current = {
      isDragging: true,
      lastX: event.clientX,
      lastY: event.clientY,
      pointerId: event.pointerId,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const movePan = (event) => {
    if (!dragState.current.isDragging || dragState.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.current.lastX;
    const deltaY = event.clientY - dragState.current.lastY;

    dragState.current.lastX = event.clientX;
    dragState.current.lastY = event.clientY;

    setPanOffset((currentOffset) => ({
      x: currentOffset.x + deltaX,
      y: currentOffset.y + deltaY,
    }));
  };

  const stopPan = (event) => {
    if (dragState.current.pointerId !== event.pointerId) return;

    dragState.current = { isDragging: false, lastX: 0, lastY: 0, pointerId: null };
    setIsDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const stopControlEvent = (event) => {
    event.stopPropagation();
  };

  return (
    <section
      className={`relative h-full min-h-0 w-full touch-none overflow-hidden bg-[#dde7dc] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onPointerDown={startPan}
      onPointerMove={movePan}
      onPointerUp={stopPan}
      onPointerCancel={stopPan}
      onPointerLeave={stopPan}
    >
      <div className="absolute inset-0">
        {tileOffsets.flatMap((xOffset) =>
          tileOffsets.map((yOffset) => {
            const tileX = centerTileX + xOffset;
            const tileY = centerTileY + yOffset;

            return (
              <img
                key={`${zoom}-${tileX}-${tileY}`}
                src={tileUrl(tileX, tileY, zoom)}
                alt=""
                className="absolute size-64 max-w-none select-none"
                draggable="false"
                style={{
                  left: `calc(50% + ${xOffset * tileSize - centerOffsetX}px)`,
                  top: `calc(50% + ${yOffset * tileSize - centerOffsetY}px)`,
                }}
              />
            );
          }),
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-white/10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/10 to-transparent" />

      {isLoading && (
        <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow">
          Sincronizando imoveis...
        </div>
      )}

      {properties.map((property) => {
        const markerPixel = latLngToWorldPixel(property.mapLocation, zoom);

        return (
          <div
            key={property.key}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${markerPixel.x - viewportCenterPixel.x}px)`,
              top: `calc(50% + ${markerPixel.y - viewportCenterPixel.y}px)`,
            }}
          >
            <PropertyPin
              price={property.price}
              onClick={() => onSelectProperty(property)}
              isSelected={activeProperty?.id === property.id}
            />
          </div>
        );
      })}

      <div
        className="absolute bottom-20 left-4 z-30 flex flex-col overflow-hidden rounded bg-white shadow-lg lg:bottom-8 lg:left-auto lg:right-8"
        onPointerDown={stopControlEvent}
        onPointerMove={stopControlEvent}
        onPointerUp={stopControlEvent}
        onPointerCancel={stopControlEvent}
        onClick={stopControlEvent}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onZoomIn();
          }}
          disabled={zoom === maxMapZoom}
          className="border-b p-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Aumentar zoom"
        >
          <svg className="size-4" fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="black" strokeWidth="2" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onZoomOut();
          }}
          disabled={zoom === minMapZoom}
          className="p-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Diminuir zoom"
        >
          <svg className="size-4" fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h10" stroke="black" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </section>
  );
});
