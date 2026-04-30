import { useEffect, useMemo, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { MapPreview } from "../components/properties/MapPreview";
import { PropertyCard } from "../components/properties/PropertyCard";
import { fallbackProperties } from "../data/properties";
import { getProperties } from "../services/propertyService";

export function meta() {
  return [
    { title: "Imoveis | Morada Prime" },
    {
      name: "description",
      content: "Veja imoveis disponiveis com mapa interativo e detalhes de localizacao.",
    },
  ];
}

export default function Properties() {
  const [properties, setProperties] = useState(fallbackProperties);
  const [selectedId, setSelectedId] = useState(fallbackProperties[0]?.id ?? "");
  const [status, setStatus] = useState("Todos");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getProperties()
      .then((items) => {
        if (!active || items.length === 0) return;
        setProperties(items);
        setSelectedId(items[0].id);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredProperties = useMemo(() => {
    if (status === "Todos") return properties;
    return properties.filter((property) => property.status === status);
  }, [properties, status]);

  const selectedProperty =
    filteredProperties.find((property) => property.id === selectedId) ?? filteredProperties[0];

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="pt-24">
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Catalogo
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">
                Imoveis com localizacao visivel.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Selecione um imovel para atualizar o mapa, conferir o bairro e comparar detalhes antes de agendar uma visita.
              </p>
            </div>

            <div className="flex w-full rounded-md border border-slate-200 bg-white p-1 shadow-sm sm:w-auto">
              {["Todos", "Venda", "Aluguel"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
                  className={`min-h-10 flex-1 rounded px-4 text-sm font-semibold transition sm:flex-none ${
                    status === option
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-5">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  selected={property.id === selectedProperty?.id}
                  onSelect={() => setSelectedId(property.id)}
                />
              ))}
              {filteredProperties.length === 0 && (
                <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-slate-600">
                  Nenhum imovel encontrado para esse filtro.
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <MapPreview property={selectedProperty} isLoading={isLoading} />
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
