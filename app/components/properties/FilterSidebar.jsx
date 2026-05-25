import { AreaSlider } from "../ui/AreaSlider";
import { FilterSelect } from "../ui/FilterSelect";
import { PriceRangeInput } from "../ui/PriceRangeInput";
import { RoomSelector } from "../ui/RoomSelector";

export function FilterSidebar({ filters, setFilters, onReset, options }) {
  const updateFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
    updateFilter("neighborhood", value);
  };

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
          label="Objetivo"
          placeholder="Comprar ou alugar"
          value={filters.status}
          onChange={(value) => updateFilter("status", value)}
          options={options.statuses}
        />
        <FilterSelect
          label="Tipo"
          placeholder="Selecione o tipo"
          value={filters.type}
          onChange={(value) => updateFilter("type", value)}
          options={options.types}
        />
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
          options={options.regions}
        />
        <FilterSelect
          label="Cidade"
          placeholder="Selecione a cidade"
          value={filters.city}
          onChange={handleCityChange}
          options={options.cities}
        />
        <FilterSelect
          label="Bairro"
          placeholder="Selecione o bairro"
          value={filters.neighborhood}
          onChange={handleNeighborhoodChange}
          options={options.neighborhoods}
        />

        <PriceRangeInput
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinChange={(value) => updateFilter("minPrice", value)}
          onMaxChange={(value) => updateFilter("maxPrice", value)}
        />

        <RoomSelector
          label="Quartos"
          options={[1, 2, 3, 4]}
          value={filters.bedrooms}
          onChange={(value) => updateFilter("bedrooms", value)}
        />
        <RoomSelector
          label="Suites"
          options={[1, 2, 3, 4]}
          value={filters.suites}
          onChange={(value) => updateFilter("suites", value)}
        />
        <RoomSelector
          label="Banheiros"
          options={[1, 2, 3, 4]}
          value={filters.bathrooms}
          onChange={(value) => updateFilter("bathrooms", value)}
        />
        <RoomSelector
          label="Garagem"
          options={[1, 2, 3, 4]}
          value={filters.garage}
          onChange={(value) => updateFilter("garage", value)}
        />

        <AreaSlider
          minArea={filters.minArea}
          maxArea={filters.maxArea}
          onMinChange={(value) => updateFilter("minArea", value)}
          onMaxChange={(value) => updateFilter("maxArea", value)}
          maxAvailableArea={options.maxArea}
        />
      </div>
    </aside>
  );
}
