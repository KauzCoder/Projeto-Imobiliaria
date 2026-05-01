export function FilterSelect({ label, placeholder, value, onChange, options }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-xs font-extrabold text-black">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 cursor-pointer appearance-none rounded border border-black/30 bg-[#f5f5f5] px-3 text-xs text-black outline-none transition focus:border-black"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.0417 6.375L8.5 9.91667L4.95833 6.375' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "17px",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
