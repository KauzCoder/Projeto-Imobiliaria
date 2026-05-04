export function AreaSlider({ minArea, maxArea, onMinChange, onMaxChange }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <label className="text-xs font-extrabold text-black">Area do terreno (m2)</label>
      <div className="space-y-3">
        <input
          type="range"
          min="0"
          max="1000"
          value={minArea}
          onChange={(event) => onMinChange(Math.min(Number(event.target.value), maxArea))}
          className="w-full accent-black"
          aria-label="Area minima"
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={maxArea}
          onChange={(event) => onMaxChange(Math.max(Number(event.target.value), minArea))}
          className="w-full accent-black"
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
