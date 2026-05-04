import { currencyFormatter } from "./currencyFormatter";

export function PropertyCatalogCard({ property, onClick, isSelected }) {
  return (
    <button
      type="button"
      id={`imovel-${property.id}`}
      onClick={onClick}
      className={`w-full overflow-hidden rounded-lg bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
        isSelected ? "ring-2 ring-[#00ffbf]" : ""
      }`}
    >
      <img src={property.image} alt={property.title} className="h-[120px] w-full object-cover" />
      <div className="p-3">
        <p className="mb-1 text-sm font-extrabold text-black">{currencyFormatter.format(property.price)}</p>
        <p className="mb-1 line-clamp-1 text-xs font-bold text-black">{property.title}</p>
        <p className="mb-3 line-clamp-2 text-[11px] text-[#6f6f6f]">{property.locationText}</p>
        <div className="flex flex-wrap items-center gap-2 text-[#5b5b5b]">
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold">{property.beds} quartos</span>
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold">{property.baths} ban.</span>
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold">{property.area}m2</span>
        </div>
      </div>
    </button>
  );
}
