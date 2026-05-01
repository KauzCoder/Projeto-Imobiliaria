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

export function PropertyMap({
  activeProperty,
  properties,
  zoom,
  isLoading,
  onSelectProperty,
  onZoomIn,
  onZoomOut,
}) {
  const centerLocation = activeProperty?.mapLocation ?? { lat: -1.45583, lng: -48.50389 };
  const centerPixel = latLngToWorldPixel(centerLocation, zoom);
  const centerTileX = Math.floor(centerPixel.x / tileSize);
  const centerTileY = Math.floor(centerPixel.y / tileSize);
  const centerOffsetX = centerPixel.x - centerTileX * tileSize;
  const centerOffsetY = centerPixel.y - centerTileY * tileSize;

  return (
    <section className="relative h-full min-h-0 w-full overflow-hidden bg-[#dde7dc]">
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

      {isLoading && (
        <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow">
          Sincronizando imoveis...
        </div>
      )}

      {properties.map((property) => {
        const markerPixel = latLngToWorldPixel(property.mapLocation, zoom);

        return (
          <div
            key={property.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${markerPixel.x - centerPixel.x}px)`,
              top: `calc(50% + ${markerPixel.y - centerPixel.y}px)`,
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

      <div className="absolute bottom-8 right-8 z-20 flex flex-col overflow-hidden rounded bg-white shadow-lg">
        <button
          type="button"
          onClick={onZoomIn}
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
          onClick={onZoomOut}
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
}
