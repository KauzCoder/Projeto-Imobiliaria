import { currencyFormatter } from "./currencyFormatter";

export function PropertyPin({ price, onClick, isSelected }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border-2 bg-white px-3 py-1 shadow-md transition hover:shadow-lg ${
        isSelected ? "scale-110 border-[#00ffbf]" : "border-slate-200"
      }`}
    >
      <span className="flex items-center gap-2">
        <svg className="size-2" fill="none" viewBox="0 0 8 11" aria-hidden="true">
          <path
            d="M4 0C1.79 0 0 1.79 0 4c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z"
            fill={isSelected ? "#00ffbf" : "#231f20"}
          />
        </svg>
        <span className="whitespace-nowrap text-xs font-extrabold text-[#231f20]">
          {currencyFormatter.format(price)}
        </span>
      </span>
    </button>
  );
}
