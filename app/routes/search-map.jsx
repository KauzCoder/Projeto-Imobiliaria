import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
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
  const [properties, setProperties] = useState(fallbackProperties);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapZoom, setMapZoom] = useState(propertyMapZoom.initial);

  useEffect(() => {
    let active = true;

    getProperties()
      .then((items) => {
        if (!active || items.length === 0) return;
        setProperties(items);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const normalizedProperties = useMemo(
    () => properties.map((property, index) => normalizeProperty(property, index)),
    [properties],
  );

  const filterOptions = useMemo(
    () => ({
      countries: uniqueOptions(normalizedProperties, "country"),
      cities: uniqueOptions(normalizedProperties, "city"),
      regions: uniqueOptions(normalizedProperties, "region"),
      neighborhoods: uniqueOptions(normalizedProperties, "neighborhood"),
    }),
    [normalizedProperties],
  );

  const filteredProperties = useMemo(() => {
    const minPrice = Number(filters.minPrice || 0);
    const maxPrice = Number(filters.maxPrice || 0);

    return normalizedProperties.filter((property) => {
      if (filters.country && property.country !== filters.country) return false;
      if (filters.city && property.city !== filters.city) return false;
      if (filters.region && property.region !== filters.region) return false;
      if (filters.neighborhood && property.neighborhood !== filters.neighborhood) return false;
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

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const zoomIn = () => {
    setMapZoom((currentZoom) => Math.min(currentZoom + 1, propertyMapZoom.max));
  };

  const zoomOut = () => {
    setMapZoom((currentZoom) => Math.max(currentZoom - 1, propertyMapZoom.min));
  };

  return (
    <main className="flex h-screen overflow-hidden bg-slate-100">
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

      <FilterSidebar filters={filters} setFilters={setFilters} onReset={resetFilters} options={filterOptions} />

      <section className="relative min-w-0 flex-1">
        <PropertyMap
          activeProperty={activeProperty}
          properties={filteredProperties}
          zoom={mapZoom}
          isLoading={isLoading}
          onSelectProperty={setSelectedProperty}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />
        
        {selectedProperty && (
          <PropertyDetailPanel property={selectedProperty} onClose={() => setSelectedProperty(null)} />
        )}
      </section>

      <PropertyCatalog
        properties={filteredProperties}
        selectedProperty={activeProperty}
        onSelectProperty={setSelectedProperty}
      />
    </main>
  );
}
