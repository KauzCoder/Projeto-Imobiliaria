import { PropertyCatalogCard } from "./PropertyCatalogCard";

export function PropertyCatalog({ properties, selectedProperty, onSelectProperty }) {
  return (
    <aside className="h-full w-full overflow-y-auto bg-white lg:w-[334px] lg:shrink-0">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white p-4">
        <h3 className="text-sm font-extrabold text-black">
          {properties.length} {properties.length === 1 ? "imovel encontrado" : "imoveis encontrados"}
        </h3>
      </div>
      <div className="space-y-4 p-4">
        {properties.map((property) => (
          <PropertyCatalogCard
            key={property.key}
            property={property}
            onClick={() => onSelectProperty(property)}
            isSelected={selectedProperty?.id === property.id}
          />
        ))}
        {properties.length === 0 && (
          <div className="rounded border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Nenhum imovel encontrado para esses filtros.
          </div>
        )}
      </div>
    </aside>
  );
}
