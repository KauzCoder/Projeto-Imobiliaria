export function MapPreview({ property, isLoading }) {
  if (!property) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-md border border-slate-200 bg-white p-8 text-center text-slate-600">
        Selecione um imovel para visualizar a localizacao.
      </div>
    );
  }

  const { lat, lng } = property.location;
  const delta = 0.012;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join("%2C");
  const marker = `${lat}%2C${lng}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
  const externalMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

  return (
    <section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Mapa interativo
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">{property.title}</h2>
          </div>
          {isLoading && (
            <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
              sincronizando
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {property.address.street}, {property.address.district}, {property.address.city} - {property.address.state}
        </p>
      </div>

      <iframe
        title={`Mapa de ${property.title}`}
        src={mapUrl}
        className="h-[420px] w-full border-0"
        loading="lazy"
      />

      <div className="flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Coordenadas: {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
        <a
          href={externalMapUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Abrir mapa
        </a>
      </div>
    </section>
  );
}
