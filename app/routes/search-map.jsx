import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FilterSidebar } from "../components/properties/FilterSidebar";
import { PropertyCatalog } from "../components/properties/PropertyCatalog";
import { PropertyDetailPanel } from "../components/properties/PropertyDetailPanel";
import { PropertyMap, propertyMapZoom } from "../components/properties/PropertyMap";
import { fallbackProperties } from "../data/properties";
import { getProperties } from "../services/propertyService";
import { normalizeProperty, uniqueOptions } from "../utils/propertyUtils";

const initialFilters = {
  country: "",
  city: "",
  region: "",
  neighborhood: "",
  type: "",
  status: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: 0,
  suites: 0,
  bathrooms: 0,
  garage: 0,
  minArea: 0,
  maxArea: 0,
};

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function scopedProperties(properties, filters, ignoredFields = []) {
  const ignored = new Set(ignoredFields);

  return properties.filter((property) => {
    if (!ignored.has("country") && filters.country && property.country !== filters.country) return false;
    if (!ignored.has("region") && filters.region && property.region !== filters.region) return false;
    if (!ignored.has("city") && filters.city && property.city !== filters.city) return false;
    if (!ignored.has("neighborhood") && filters.neighborhood && property.neighborhood !== filters.neighborhood) return false;
    if (!ignored.has("type") && filters.type && property.type !== filters.type) return false;
    if (!ignored.has("status") && filters.status && property.status !== filters.status) return false;
    return true;
  });
}

export function meta() {
  return [
    { title: "Imoveis | Morada Prime" },
    {
      name: "description",
      content: "Veja imoveis disponiveis com mapa interativo e detalhes de localizacao.",
    },
  ];
}

export default function SearchMap() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState(fallbackProperties);
  const [filters, setFilters] = useState(() => ({
    ...initialFilters,
    country: searchParams.get("country") ?? "",
    city: searchParams.get("city") ?? "",
    region: searchParams.get("region") ?? "",
    neighborhood: searchParams.get("neighborhood") ?? "",
    type: searchParams.get("type") ?? "",
    status: searchParams.get("status") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
  }));
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapZoom, setMapZoom] = useState(propertyMapZoom.initial);
  const [showFilters, setShowFilters] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  useEffect(() => {
    let active = true;

    setIsLoading(true);

    getProperties()
      .then((items) => {
        if (!active) return;
        if (items.length > 0) setProperties(items);
      })
      .catch((err) => {
        console.error("SearchMap: erro ao buscar properties:", err);
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []); // <- array vazio, roda só uma vez

  const normalizedProperties = useMemo(
    () => properties.map((property, index) => normalizeProperty(property, index)),
    [properties],
  );

  const filterOptions = useMemo(() => {
    const countryScope = scopedProperties(normalizedProperties, filters, ["country"]);
    const regionScope = scopedProperties(normalizedProperties, filters, ["region", "city", "neighborhood"]);
    const cityScope = scopedProperties(normalizedProperties, filters, ["city", "neighborhood"]);
    const neighborhoodScope = scopedProperties(normalizedProperties, filters, ["neighborhood"]);
    const objectiveScope = scopedProperties(normalizedProperties, filters, ["status"]);
    const typeScope = scopedProperties(normalizedProperties, filters, ["type"]);
    const maxArea = normalizedProperties.reduce((max, property) => Math.max(max, toNumber(property.area)), 0);

    return {
      countries: uniqueOptions(countryScope, "country"),
      regions: uniqueOptions(regionScope, "region"),
      cities: uniqueOptions(cityScope, "city"),
      neighborhoods: uniqueOptions(neighborhoodScope, "neighborhood"),
      statuses: uniqueOptions(objectiveScope, "status"),
      types: uniqueOptions(typeScope, "type"),
      maxArea: Math.max(100, Math.ceil(maxArea / 50) * 50),
    };
  }, [normalizedProperties, filters]);

  useEffect(() => {
    setFilters((currentFilters) => {
      const nextFilters = { ...currentFilters };
      let changed = false;

      const clearField = (field) => {
        if (nextFilters[field]) {
          nextFilters[field] = "";
          changed = true;
        }
      };

      if (currentFilters.status && !filterOptions.statuses.includes(currentFilters.status)) {
        clearField("status");
      }

      if (currentFilters.type && !filterOptions.types.includes(currentFilters.type)) {
        clearField("type");
      }

      if (currentFilters.country && !filterOptions.countries.includes(currentFilters.country)) {
        clearField("country");
        clearField("region");
        clearField("city");
        clearField("neighborhood");
      } else if (currentFilters.region && !filterOptions.regions.includes(currentFilters.region)) {
        clearField("region");
        clearField("city");
        clearField("neighborhood");
      } else if (currentFilters.city && !filterOptions.cities.includes(currentFilters.city)) {
        clearField("city");
        clearField("neighborhood");
      } else if (
        currentFilters.neighborhood &&
        !filterOptions.neighborhoods.includes(currentFilters.neighborhood)
      ) {
        clearField("neighborhood");
      }

      return changed ? nextFilters : currentFilters;
    });
  }, [filterOptions]);

  const filteredProperties = useMemo(() => {
    const minPrice = toNumber(filters.minPrice);
    const maxPrice = toNumber(filters.maxPrice);
    const minArea = toNumber(filters.minArea);
    const maxArea = toNumber(filters.maxArea);

    return normalizedProperties.filter((property) => {
      if (filters.country && property.country !== filters.country) return false;
      if (filters.city && property.city !== filters.city) return false;
      if (filters.region && property.region !== filters.region) return false;
      if (filters.neighborhood && property.neighborhood !== filters.neighborhood) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.status && property.status !== filters.status) return false;
      if (minPrice > 0 && property.price < minPrice) return false;
      if (maxPrice > 0 && property.price > maxPrice) return false;
      if (filters.bedrooms > 0 && property.beds < filters.bedrooms) return false;
      if (filters.suites > 0 && property.suites < filters.suites) return false;
      if (filters.bathrooms > 0 && property.baths < filters.bathrooms) return false;
      if (filters.garage > 0 && property.garage < filters.garage) return false;
      if (minArea > 0 && property.area < minArea) return false;
      if (maxArea > 0 && property.area > maxArea) return false;
      return true;
    });
  }, [filters, normalizedProperties]);

  const activeProperty =
    filteredProperties.find((property) => property.id === selectedProperty?.id) ??
    filteredProperties[0] ??
    null;

  useEffect(() => {
    if (selectedProperty && !filteredProperties.some((property) => property.id === selectedProperty.id)) {
      setSelectedProperty(null);
    }
  }, [filteredProperties, selectedProperty]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const zoomIn = useCallback(() => {
    setMapZoom((currentZoom) => Math.min(currentZoom + 1, propertyMapZoom.max));
  }, []);

  const zoomOut = useCallback(() => {
    setMapZoom((currentZoom) => Math.max(currentZoom - 1, propertyMapZoom.min));
  }, []);

  const selectProperty = useCallback((property) => {
    setSelectedProperty(property);
    setShowCatalog(false);
  }, []);

  return (
    <main className="relative flex h-screen overflow-hidden bg-[#dde7dc]">
      <div className="absolute left-4 top-4 z-50">
        <Link
          to="/"
          className="flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black shadow-lg transition hover:shadow-xl"
        >
          <svg className="size-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M12 16L6 10L12 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setShowFilters(true)}
        className="absolute right-4 top-4 z-50 flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black shadow-lg transition hover:shadow-xl lg:hidden"
      >
        <svg className="size-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3 5h14M5 10h10M7 15h6" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Filtros
      </button>

      <button
        type="button"
        onClick={() => setShowCatalog(true)}
        className="absolute bottom-4 left-1/2 z-40 flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full bg-[#00ffbf] px-4 text-sm font-bold text-black shadow-lg transition hover:brightness-95 lg:hidden"
      >
        <svg className="size-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 5h12M4 10h12M4 15h12" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {filteredProperties.length} {filteredProperties.length === 1 ? "imovel" : "imoveis"}
      </button>

      <div className="hidden lg:block">
        <FilterSidebar filters={filters} setFilters={setFilters} onReset={resetFilters} options={filterOptions} />
      </div>

      {showFilters && (
        <div
          className="fixed inset-0 z-[70] bg-black/50 lg:hidden"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="absolute bottom-0 left-0 top-0 w-[86vw] max-w-[330px] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <h2 className="text-lg font-bold text-black">Filtros</h2>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="grid size-10 place-items-center rounded-full transition hover:bg-slate-100"
                aria-label="Fechar filtros"
              >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100vh-64px)] overflow-y-auto">
              <FilterSidebar filters={filters} setFilters={setFilters} onReset={resetFilters} options={filterOptions} />
            </div>
          </div>
        </div>
      )}

      <section className="relative min-w-0 flex-1">
        <PropertyMap
          activeProperty={activeProperty}
          properties={filteredProperties}
          zoom={mapZoom}
          isLoading={isLoading}
          onSelectProperty={selectProperty}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />

        {!isLoading && filteredProperties.length === 0 && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/75 p-6 text-center text-sm font-semibold text-slate-700">
            Nenhum imóvel encontrado para estes filtros.
          </div>
        )}

        {selectedProperty && (
          <PropertyDetailPanel property={selectedProperty} onClose={() => setSelectedProperty(null)} />
        )}
      </section>

      <div className="hidden lg:block">
        <PropertyCatalog
          properties={filteredProperties}
          selectedProperty={activeProperty}
          onSelectProperty={selectProperty}
        />
      </div>

      {showCatalog && (
        <div
          className="fixed inset-0 z-[70] bg-black/50 lg:hidden"
          onClick={() => setShowCatalog(false)}
        >
          <div
            className="absolute bottom-0 right-0 top-0 w-[88vw] max-w-[380px] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <h2 className="text-lg font-bold text-black">Imoveis</h2>
              <button
                type="button"
                onClick={() => setShowCatalog(false)}
                className="grid size-10 place-items-center rounded-full transition hover:bg-slate-100"
                aria-label="Fechar lista de imoveis"
              >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100vh-64px)] overflow-y-auto">
              <PropertyCatalog
                properties={filteredProperties}
                selectedProperty={activeProperty}
                onSelectProperty={selectProperty}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
