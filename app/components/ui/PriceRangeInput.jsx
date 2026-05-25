import { useEffect, useState } from "react";

export function PriceRangeInput({ minPrice, maxPrice, onMinChange, onMaxChange }) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setLocalMax(maxPrice);
  }, [maxPrice]);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-xs font-extrabold text-black">Faixa de preco</label>
      <div className="grid min-h-16 grid-cols-[54px_1fr] rounded border border-[#828282] bg-[#f5f5f5]">
        <div className="grid place-items-center border-r border-[#828282] text-sm text-[#777]">R$</div>
        <div className="grid divide-y divide-[#828282]">
          <input
            type="number"
            min={0}
            step={1000}
            value={localMin}
            onChange={(event) => setLocalMin(event.target.value)}
            onBlur={(event) => onMinChange(event.target.value)}
            placeholder="Min"
            className="h-8 bg-transparent px-3 text-xs text-black outline-none"
          />
          <input
            type="number"
            min={0}
            step={1000}
            value={localMax}
            onChange={(event) => setLocalMax(event.target.value)}
            onBlur={(event) => onMaxChange(event.target.value)}
            placeholder="Max"
            className="h-8 bg-transparent px-3 text-xs text-black outline-none"
          />
        </div>
      </div>
    </div>
  );
}
