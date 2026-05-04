import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FilterSidebar } from "../components/properties/FilterSidebar";
import { PropertyCatalog } from "../components/properties/PropertyCatalog";
import { PropertyDetailPanel } from "../components/properties/PropertyDetailPanel";
import { PropertyMap, propertyMapZoom } from "../components/properties/PropertyMap";
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
  maxArea: 1000,
};

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
  const [properties, setProperties] = useState([]);
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
  const [loadError, setLoadError] = useState("");
  const [mapZoom, setMapZoom] = useState(propertyMapZoom.initial);
  const [showFilters, setShowFilters] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setLoadError("");

    getProperties({ useFallback: false })
      .then((items) => {
        if (!active) return;
        setProperties(items);
      })
      .catch((err) => {
        console.error("SearchMap: erro ao buscar properties:", err);
        if (active) {
          setProperties([]);
          const status = err.response?.status;
          const serverMessage = err.response?.data?.message;
          const message = serverMessage || err.message || "Erro desconhecido.";
          setLoadError(
            status
              ? `Nao foi possivel carregar os imoveis do banco de dados. Erro ${status}: ${message}`
              : `Nao foi possivel carregar os imoveis do banco de dados. ${message}`,
          );
        }
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

  const filterOptions = useMemo(
    () => ({
      countries: uniqueOptions(normalizedProperties, "country"),
      regions: uniqueOptions(
        filters.country
          ? normalizedProperties.filter((property) => property.country === filters.country)
          : normalizedProperties,
        "region"
      ),
      cities: uniqueOptions(
        filters.region
          ? normalizedProperties.filter((property) => property.region === filters.region)
          : normalizedProperties,
        "city"
      ),
      neighborhoods: uniqueOptions(
        filters.city
          ? normalizedProperties.filter((property) => property.city === filters.city)
          : normalizedProperties,
        "neighborhood"
      ),
    }),
    [normalizedProperties, filters.country, filters.region, filters.city],
  );

  const filteredProperties = useMemo(() => {
    const minPrice = Number(filters.minPrice || 0);
    const maxPrice = Number(filters.maxPrice || 0);

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
      if (property.area < filters.minArea || property.area > filters.maxArea) return false;
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
        <FilterSidebar filters={filters} setFilters={setFilters} onReset={resetFilters} options={filterOptions} properties={normalizedProperties} />
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
              <FilterSidebar filters={filters} setFilters={setFilters} onReset={resetFilters} options={filterOptions} properties={normalizedProperties} />
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

        {!isLoading && loadError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 p-6 text-center text-sm font-semibold text-slate-700">
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && filteredProperties.length === 0 && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/75 p-6 text-center text-sm font-semibold text-slate-700">
            Nenhum imovel encontrado para estes filtros.
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
