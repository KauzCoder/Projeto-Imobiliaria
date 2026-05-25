export function AreaSlider({ minArea, maxArea, onMinChange, onMaxChange, maxAvailableArea = 1000 }) {
  const upperBound = Math.max(100, Number(maxAvailableArea) || 1000);
  const selectedMaxArea = maxArea > 0 ? maxArea : upperBound;
  const minPercent = (minArea / upperBound) * 100;
  const maxPercent = (selectedMaxArea / upperBound) * 100;

  const handleMinChange = (value) => {
    onMinChange(Math.min(Number(value), selectedMaxArea));
  };

  const handleMaxChange = (value) => {
    const nextValue = Math.max(Number(value), minArea);
    onMaxChange(nextValue >= upperBound ? 0 : nextValue);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <label className="text-xs font-extrabold text-black">Area do imovel (m2)</label>
      <div className="relative px-1 py-2">
        <div className="absolute left-1 right-1 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#f5f5f5]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min="0"
          max={upperBound}
          value={minArea}
          onChange={(event) => handleMinChange(event.target.value)}
          className="pointer-events-auto absolute inset-x-0 top-1/2 z-10 w-full -translate-y-1/2 accent-black"
          aria-label="Area minima"
        />
        <input
          type="range"
          min="0"
          max={upperBound}
          value={selectedMaxArea}
          onChange={(event) => handleMaxChange(event.target.value)}
          className="pointer-events-auto absolute inset-x-0 top-1/2 z-10 w-full -translate-y-1/2 accent-black"
          aria-label="Area maxima"
        />
      </div>
      <div className="flex justify-between text-xs font-extrabold text-black">
        <span>{minArea}m2</span>
        <span>{maxArea > 0 ? `${maxArea}m2` : `Ate ${upperBound}m2`}</span>
      </div>
    </div>
  );
}
