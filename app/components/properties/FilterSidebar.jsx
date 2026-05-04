import { AreaSlider } from "../ui/AreaSlider";
import { FilterSelect } from "../ui/FilterSelect";
import { PriceRangeInput } from "../ui/PriceRangeInput";
import { RoomSelector } from "../ui/RoomSelector";

export function FilterSidebar({ filters, setFilters, onReset, options, properties }) {
  const handleCountryChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      country: value,
      region: "",
      city: "",
      neighborhood: "",
    }));
  };

  const handleRegionChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      region: value,
      city: "",
      neighborhood: "",
    }));
  };

  const handleCityChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      city: value,
      neighborhood: "",
    }));
  };

  const handleNeighborhoodChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      neighborhood: value,
    }));
  };

  // Filtrar opções baseado na seleção anterior
  const filteredRegions = filters.country
    ? [...new Set(properties.filter(p => p.country === filters.country).map(p => p.region))]
    : options.regions;

  const filteredCities = filters.region
    ? [...new Set(properties.filter(p => p.region === filters.region).map(p => p.city))]
    : options.cities;

  const filteredNeighborhoods = filters.city
    ? [...new Set(properties.filter(p => p.city === filters.city).map(p => p.neighborhood))]
    : options.neighborhoods;

  return (
    <aside className="h-full w-full overflow-y-auto border-black/10 bg-white p-6 lg:w-[303px] lg:border-r">
      <div className="flex flex-col gap-[10px]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="hidden text-base font-extrabold text-black lg:block">Filtros</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-[#00b88a] transition hover:text-black"
          >
            Limpar tudo
          </button>
        </div>

        <FilterSelect
          label="Pais"
          placeholder="Selecione o pais"
          value={filters.country}
          onChange={handleCountryChange}
          options={options.countries}
        />
        <FilterSelect
          label="Regiao"
          placeholder="Selecione a regiao"
          value={filters.region}
          onChange={handleRegionChange}
          options={filteredRegions}
        />
        <FilterSelect
          label="Cidade"
          placeholder="Selecione a cidade"
          value={filters.city}
          onChange={handleCityChange}
          options={filteredCities}
        />
        <FilterSelect
          label="Bairro"
          placeholder="Selecione o bairro"
          value={filters.neighborhood}
          onChange={handleNeighborhoodChange}
          options={filteredNeighborhoods}
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
