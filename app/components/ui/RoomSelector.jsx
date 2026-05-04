export function RoomSelector({ label, options, value, onChange }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-xs font-extrabold text-black">{label}</label>
      <div className="rounded border border-black px-3 py-2">
        <div className="flex items-center justify-between gap-2 text-xs">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(value === option ? 0 : option)}
              className={`min-h-7 min-w-8 rounded px-2 font-semibold transition ${
                value === option ? "bg-[#00ffbf] text-black" : "text-black hover:bg-slate-100"
              }`}
            >
              {option}+
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
