const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function PropertyCard({ property, selected = false, onSelect }) {
  const content = (
    <>
      <img
        src={property.imageUrl}
        alt={property.title}
        className="h-60 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
            {property.status}
          </span>
          <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            {property.type}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-slate-950">{property.title}</h3>
        <p className="mt-2 line-clamp-2 leading-6 text-slate-600">{property.description}</p>
        <p className="mt-4 text-sm font-medium text-slate-500">
          {property.address.district}, {property.address.city} - {property.address.state}
        </p>

        <div className="mt-5 grid grid-cols-4 gap-2 text-sm text-slate-600">
          <span>{property.bedrooms} dorm.</span>
          <span>{property.bathrooms} ban.</span>
          <span>{property.area} m2</span>
          <span>{property.parkingSpaces} vagas</span>
        </div>

        <p className="mt-5 text-2xl font-semibold text-slate-950">
          {currencyFormatter.format(property.price)}
          {property.status === "Aluguel" && <span className="text-sm font-medium text-slate-500">/mes</span>}
        </p>
      </div>
    </>
  );

  if (!onSelect) {
    return (
      <article className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        {content}
      </article>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full overflow-hidden rounded-md border bg-white text-left shadow-sm transition ${
        selected ? "border-emerald-500 ring-2 ring-emerald-100" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {content}
    </button>
  );
}
