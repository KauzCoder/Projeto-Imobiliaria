export function AreaSlider({ minArea, maxArea, onMinChange, onMaxChange }) {
  const minPercent = (minArea / 1000) * 100;
  const maxPercent = (maxArea / 1000) * 100;

  return (
    <div className="flex w-full flex-col gap-4">
      <label className="text-xs font-extrabold text-black">Area do terreno (m2)</label>
      <div className="relative px-1 py-2">
        <div className="absolute left-1 right-1 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#f5f5f5]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={minArea}
          onChange={(event) => onMinChange(Math.min(Number(event.target.value), maxArea))}
          className="pointer-events-auto absolute inset-x-0 top-1/2 z-10 w-full -translate-y-1/2 accent-black"
          aria-label="Area minima"
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={maxArea}
          onChange={(event) => onMaxChange(Math.max(Number(event.target.value), minArea))}
          className="pointer-events-auto absolute inset-x-0 top-1/2 z-10 w-full -translate-y-1/2 accent-black"
          aria-label="Area maxima"
        />
      </div>
      <div className="flex justify-between text-xs font-extrabold text-black">
        <span>{minArea}m2</span>
        <span>{maxArea}m2</span>
      </div>
    </div>
  );
}
