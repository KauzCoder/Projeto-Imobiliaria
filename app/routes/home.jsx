import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { FAQ } from "../components/faq/FAQ";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import { PropertyCard } from "../components/properties/PropertyCard";
import { getProperties } from "../services/propertyService";
import { normalizeProperty } from "../utils/propertyUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { fallbackProperties } from "../data/properties";

const partnerImages = [
  { src: "/parceiros/parceiro-1.png", alt: "Parceiro 1" },
  { src: "/parceiros/parceiro-2.png", alt: "Parceiro 2" },
  { src: "/parceiros/parceiro-3.png", alt: "Parceiro 3" },
  { src: "/parceiros/parceiro-4.png", alt: "Parceiro 4" },
  { src: "/parceiros/parceiro-5.png", alt: "Parceiro 5" },
  { src: "/parceiros/parceiro-6.png", alt: "Parceiro 6" },
];

const priceRanges = [
  { label: "Ate R$ 300 mil", minPrice: "", maxPrice: "300000" },
  { label: "R$ 300 mil - R$ 700 mil", minPrice: "300000", maxPrice: "700000" },
  { label: "R$ 700 mil - R$ 1,5 mi", minPrice: "700000", maxPrice: "1500000" },
  { label: "Acima de R$ 1,5 mi", minPrice: "1500000", maxPrice: "" },
];

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort();
}

function isInsideRange(property, range) {
  const minPrice = Number(range.minPrice || 0);
  const maxPrice = Number(range.maxPrice || 0);

  if (minPrice > 0 && property.price < minPrice) return false;
  if (maxPrice > 0 && property.price > maxPrice) return false;
  return true;
}

function ShortcutSelect({ label, value, onChange, options, placeholder, disabled = false }) {
  return (
    <label className="block min-w-0">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function meta() {
  return [
    { title: "Ninho - Imoveis Residenciais | Imobiliaria" },
    {
      name: "description",
      content: "Encontre casas, apartamentos e imoveis comerciais com atendimento consultivo.",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState(fallbackProperties);
  const [searchFilters, setSearchFilters] = useState({
    status: "Venda",
    country: "",
    city: "",
    type: "",
    priceRange: "",
  });

  useEffect(() => {
    let active = true;

    getProperties().then((propertiesData) => {
      if (active && propertiesData.length > 0) {
        setProperties(propertiesData);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const featuredProperties = useMemo(() => {
    const featured = properties.filter((property) => property.featured);
    return (featured.length > 0 ? featured : properties).slice(0, 4);
  }, [properties]);

  const normalizedProperties = useMemo(
    () => properties.map((property, index) => normalizeProperty(property, index)),
    [properties],
  );

  const searchBaseProperties = useMemo(
    () => normalizedProperties.filter((property) => !searchFilters.status || property.status === searchFilters.status),
    [normalizedProperties, searchFilters.status],
  );

  const searchOptions = useMemo(() => {
    const countryProperties = searchBaseProperties;
    const cityProperties = searchFilters.country
      ? countryProperties.filter((property) => property.country === searchFilters.country)
      : countryProperties;
    const typeProperties = searchFilters.city
      ? cityProperties.filter((property) => property.city === searchFilters.city)
      : cityProperties;
    const priceProperties = searchFilters.type
      ? typeProperties.filter((property) => property.type === searchFilters.type)
      : typeProperties;

    return {
      countries: uniqueValues(countryProperties, "country"),
      cities: uniqueValues(cityProperties, "city"),
      types: uniqueValues(typeProperties, "type"),
      priceRanges: priceRanges.filter((range) => priceProperties.some((property) => isInsideRange(property, range))),
    };
  }, [searchBaseProperties, searchFilters.country, searchFilters.city, searchFilters.type]);

  const matchingSearchCount = useMemo(() => {
    const selectedRange = priceRanges.find((range) => range.label === searchFilters.priceRange);

    return normalizedProperties.filter((property) => {
      if (searchFilters.status && property.status !== searchFilters.status) return false;
      if (searchFilters.country && property.country !== searchFilters.country) return false;
      if (searchFilters.city && property.city !== searchFilters.city) return false;
      if (searchFilters.type && property.type !== searchFilters.type) return false;
      if (selectedRange && !isInsideRange(property, selectedRange)) return false;
      return true;
    }).length;
  }, [normalizedProperties, searchFilters]);

  const cityCards = useMemo(() => {
    const cities = new Map();

    normalizedProperties.forEach((property) => {
      if (!property.city) return;

      const current = cities.get(property.city) ?? {
        city: property.city,
        count: 0,
        image: property.image,
      };

      cities.set(property.city, {
        ...current,
        count: current.count + 1,
        image: current.image || property.image,
      });
    });

    return [...cities.values()].sort((first, second) => second.count - first.count).slice(0, 4);
  }, [normalizedProperties]);

  function handleSearch(event) {
    event.preventDefault();
    const selectedRange = priceRanges.find((range) => range.label === searchFilters.priceRange);
    const params = new URLSearchParams();

    if (searchFilters.status) params.set("status", searchFilters.status);
    if (searchFilters.country) params.set("country", searchFilters.country);
    if (searchFilters.city) params.set("city", searchFilters.city);
    if (searchFilters.type) params.set("type", searchFilters.type);
    if (selectedRange?.minPrice) params.set("minPrice", selectedRange.minPrice);
    if (selectedRange?.maxPrice) params.set("maxPrice", selectedRange.maxPrice);

    navigate(`/imoveis?${params.toString()}`);
  }

  function updateSearchFilter(field, value) {
    setSearchFilters((current) => {
      const next = { ...current, [field]: value };

      if (field === "status") {
        next.country = "";
        next.city = "";
        next.type = "";
        next.priceRange = "";
      }

      if (field === "country") {
        next.city = "";
        next.type = "";
        next.priceRange = "";
      }

      if (field === "city") {
        next.type = "";
        next.priceRange = "";
      }

      if (field === "type") {
        next.priceRange = "";
      }

      return next;
    });
  }

  function clearSearchFilters() {
    setSearchFilters({
      status: "Venda",
      country: "",
      city: "",
      type: "",
      priceRange: "",
    });
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main>
        <style>{`
          @media (min-width: 1024px) {
            .home-swiper .swiper-scrollbar {
              display: none;
            }
          }
        `}</style>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
              alt="Fachada de uma casa moderna"
              className="h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-slate-950/45" />
          </div>

          <div className="relative mx-auto grid min-h-[860px] max-w-7xl content-end gap-30 px-6 pb-12 pt-28 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                Compra, venda e aluguel
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
                Ninho - Imoveis Residenciais
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
                Imoveis selecionados com localizacao clara, atendimento proximo e dados organizados para voce decidir com seguranca.
              </p>
            </div>


            <form onSubmit={handleSearch} className="mx-auto w-full max-w-6xl rounded-md bg-white p-3 text-slate-950 shadow-2xl sm:p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                <div className="lg:w-44">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Operacao</span>
                  <div className="mt-2 grid grid-cols-2 rounded-md bg-slate-100 p-1">
                    {["Venda", "Aluguel"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateSearchFilter("status", status)}
                        className={`min-h-10 rounded px-3 text-sm font-bold transition ${
                          searchFilters.status === status
                            ? "bg-slate-950 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-950"
                        }`}
                      >
                        {status === "Venda" ? "Comprar" : "Alugar"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <ShortcutSelect
                    label="Pais"
                    value={searchFilters.country}
                    onChange={(value) => updateSearchFilter("country", value)}
                    options={searchOptions.countries}
                    placeholder="Todos"
                    disabled={searchOptions.countries.length === 0}
                  />
                  <ShortcutSelect
                    label="Cidade"
                    value={searchFilters.city}
                    onChange={(value) => updateSearchFilter("city", value)}
                    options={searchOptions.cities}
                    placeholder="Todas"
                    disabled={searchOptions.cities.length === 0}
                  />
                  <ShortcutSelect
                    label="Tipo"
                    value={searchFilters.type}
                    onChange={(value) => updateSearchFilter("type", value)}
                    options={searchOptions.types}
                    placeholder="Todos"
                    disabled={searchOptions.types.length === 0}
                  />
                  <ShortcutSelect
                    label="Preco"
                    value={searchFilters.priceRange}
                    onChange={(value) => updateSearchFilter("priceRange", value)}
                    options={searchOptions.priceRanges}
                    placeholder="Qualquer preco"
                    disabled={searchOptions.priceRanges.length === 0}
                  />
                </div>

                <div className="flex flex-col gap-2 lg:w-44">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-emerald-500 px-6 text-sm font-bold uppercase tracking-[0.04em] text-white transition hover:bg-emerald-600"
                  >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.8 18.1C14.8 18.1 18.1 14.8 18.1 10.8C18.1 6.8 14.8 3.5 10.8 3.5C6.8 3.5 3.5 6.8 3.5 10.8C3.5 14.8 6.8 18.1 10.8 18.1Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M16.2 16.2L20.5 20.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  Pesquisa
                  </button>
                  <button
                    type="button"
                    onClick={clearSearchFilters}
                    className="min-h-9 rounded-md text-xs font-bold uppercase tracking-[0.06em] text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                <span>
                  {matchingSearchCount} {matchingSearchCount === 1 ? "imovel disponivel" : "imoveis disponiveis"}
                </span>
                <Link to="/imoveis" className="text-emerald-700 transition hover:text-slate-950">
                  Abrir mapa completo
                </Link>
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-20 pb-12">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Parceiros
            </p>

            <div className="place-items-center grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {partnerImages.map((partner) => (
                <img
                  key={partner.src}
                  src={partner.src}
                  alt={partner.alt}
                  className="max-h-16 w-auto max-w-full object-contain"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Cidades em destaque
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                  Propriedades por cidade
                </h2>
              </div>

              <Link
                to="/imoveis"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-emerald-700"
              >
                Cidades
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 17L17 7M9 7H17V15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </Link>
            </div>

            <div className="mt-8">
              <Swiper
                scrollbar={{ hide: true }}
                modules={[Scrollbar]}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                  1800: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="mySwiper"
              >
                {cityCards.map((city) => (
                  <SwiperSlide key={city.city}>
                    <Link
                      to={`/imoveis?city=${encodeURIComponent(city.city)}`}
                      className="group relative min-h-[800px] overflow-hidden rounded-md bg-slate-900 shadow-sm"
                    >
                      <div className="transition duration-300 group-hover:scale-105">
                        <img
                          src={city.image}
                          alt={`Imoveis em ${city.city}`}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/20 to-slate-950/55" />
                        <div className="min-h-[500px] relative z-10 p-5 text-white">
                          <h3 className="text-base font-semibold">{city.city}</h3>
                          <p className="mt-1 text-xs text-white/75">
                            {city.count} {city.count === 1 ? "propriedade" : "propriedades"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Ultimas propriedades
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                  Imoveis em evidencia
                </h2>
              </div>
              <Link to="/imoveis" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
                Ver catalogo completo
              </Link>
            </div>

            <div className="mt-8 overflow-hidden lg:hidden">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                scrollbar={{ draggable: true }}
                modules={[Scrollbar]}
                className="mySwiper home-swiper"
                breakpoints={{
                  640: { slidesPerView: 1.1, spaceBetween: 20 },
                  768: { slidesPerView: 1.3, spaceBetween: 24 },
                }}
              >
                {featuredProperties.map((property) => (
                  <SwiperSlide key={property.id} className="w-full max-w-full">
                    <div className="min-w-0">
                      <PropertyCard property={property} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="mt-8 hidden grid-cols-1 gap-5 lg:grid lg:grid-cols-4">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
        <TestimonialsCarousel />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
