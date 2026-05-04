import { AreaSlider } from "../ui/AreaSlider";
import { FilterSelect } from "../ui/FilterSelect";
import { PriceRangeInput } from "../ui/PriceRangeInput";
import { RoomSelector } from "../ui/RoomSelector";

export function FilterSidebar({ filters, setFilters, onReset, options }) {
  return (
    <aside className="h-full w-[303px] shrink-0 overflow-y-auto border-r border-black/40 bg-white p-6">
      <div className="flex flex-col gap-4">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-base font-extrabold text-black">Filtros</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            Limpar tudo
          </button>
        </div>

        <FilterSelect
          label="Pais"
          placeholder="Selecione o pais"
          value={filters.country}
          onChange={(value) => setFilters((prev) => ({ ...prev, country: value }))}
          options={options.countries}
        />
        <FilterSelect
          label="Cidade"
          placeholder="Selecione a cidade"
          value={filters.city}
          onChange={(value) => setFilters((prev) => ({ ...prev, city: value }))}
          options={options.cities}
        />
        <FilterSelect
          label="Regiao"
          placeholder="Selecione a regiao"
          value={filters.region}
          onChange={(value) => setFilters((prev) => ({ ...prev, region: value }))}
          options={options.regions}
        />
        <FilterSelect
          label="Bairro"
          placeholder="Selecione o bairro"
          value={filters.neighborhood}
          onChange={(value) => setFilters((prev) => ({ ...prev, neighborhood: value }))}
          options={options.neighborhoods}
        />

        <PriceRangeInput
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinChange={(value) => setFilters((prev) => ({ ...prev, minPrice: value }))}
          onMaxChange={(value) => setFilters((prev) => ({ ...prev, maxPrice: value }))}
        />

        <RoomSelector
          label="Quartos"
          options={[1, 2, 3, 4]}
          value={filters.bedrooms}
          onChange={(value) => setFilters((prev) => ({ ...prev, bedrooms: value }))}
        />
        <RoomSelector
          label="Suites"
          options={[1, 2, 3, 4]}
          value={filters.suites}
          onChange={(value) => setFilters((prev) => ({ ...prev, suites: value }))}
        />
        <RoomSelector
          label="Banheiros"
          options={[1, 2, 3, 4]}
          value={filters.bathrooms}
          onChange={(value) => setFilters((prev) => ({ ...prev, bathrooms: value }))}
        />
        <RoomSelector
          label="Garagem"
          options={[1, 2, 3, 4]}
          value={filters.garage}
          onChange={(value) => setFilters((prev) => ({ ...prev, garage: value }))}
        />

        <AreaSlider
          minArea={filters.minArea}
          maxArea={filters.maxArea}
          onMinChange={(value) => setFilters((prev) => ({ ...prev, minArea: value }))}
          onMaxChange={(value) => setFilters((prev) => ({ ...prev, maxArea: value }))}
        />
      </div>
    </aside>
  );
}
