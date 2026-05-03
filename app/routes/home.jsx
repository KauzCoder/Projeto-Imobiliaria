import { Link } from "react-router";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PropertyCard } from "../components/properties/PropertyCard";
import { fallbackProperties } from "../data/properties";

const partnerImages = [
  { src: "/parceiros/parceiro-1.png", alt: "Parceiro 1" },
  { src: "/parceiros/parceiro-2.png", alt: "Parceiro 2" },
  { src: "/parceiros/parceiro-3.png", alt: "Parceiro 3" },
  { src: "/parceiros/parceiro-4.png", alt: "Parceiro 4" },
  { src: "/parceiros/parceiro-5.png", alt: "Parceiro 5" },
  { src: "/parceiros/parceiro-6.png", alt: "Parceiro 6" },
];

const cityCards = [
  {
    city: "Xique-Xique",
    count: "Propriedades - 24",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Belford Roxo",
    count: "Propriedades - 11",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Belem",
    count: "Propriedades - 18",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Arroio dos Ratos",
    count: "Propriedades - 9",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
  },
];

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
  const featuredProperties = fallbackProperties.filter((property) => property.featured);

  function handleSearch(event) {
    event.preventDefault();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
              alt="Fachada de uma casa moderna"
              className="h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-slate-950/45" />
          </div>

          <div className="relative mx-auto grid min-h-[860px] max-w-7xl content-end gap-10 px-6 pb-12 pt-28 sm:px-8 lg:px-10">
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

            <form
              onSubmit={handleSearch}
              className="mx-auto w-full max-w-6xl overflow-hidden rounded-md bg-white text-slate-950 shadow-lg"
            >
              <div className="flex">
                <button
                  type="button"
                  className="min-h-11 w-36 bg-white px-5 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700"
                >
                  $ Compras
                </button>
                <button
                  type="button"
                  className="min-h-11 flex-1 bg-[#22242a] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white sm:w-72 sm:flex-none"
                >
                  Caracteristicas
                </button>
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-[1fr_1fr_1fr_1.15fr_auto] md:items-end">
                <label className="block">
                  <span className="text-sm font-medium text-slate-500">Pais</span>
                  <select className="mt-1 min-h-9 w-full border border-slate-300 bg-slate-50 px-2 text-sm text-slate-700 outline-none focus:border-emerald-600">
                    <option>Brasil</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-500">Cidade</span>
                  <select className="mt-1 min-h-9 w-full border border-slate-300 bg-slate-50 px-2 text-sm text-slate-700 outline-none focus:border-emerald-600">
                    <option>Belem</option>
                    <option>Sao Paulo</option>
                    <option>Rio de Janeiro</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-500">Tipos de residencias</span>
                  <select className="mt-1 min-h-9 w-full border border-slate-300 bg-slate-50 px-2 text-sm text-slate-700 outline-none focus:border-emerald-600">
                    <option>Casa</option>
                    <option>Apartamento</option>
                    <option>Cobertura</option>
                    <option>Comercial</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-500">Precos</span>
                  <select className="mt-1 min-h-9 w-full border border-slate-300 bg-slate-50 px-2 text-sm text-slate-700 outline-none focus:border-emerald-600">
                    <option>R$ 3.000,00... - R$ 5.000,00...</option>
                    <option>R$ 5.000,00... - R$ 10.000,00...</option>
                    <option>Acima de R$ 10.000,00...</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-emerald-700 px-6 text-sm font-semibold uppercase tracking-[0.04em] text-white transition hover:bg-emerald-800"
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
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-10 pb-12">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Parceiros
            </p>

            <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
                <h2 className="text-2xl font-semibold text-slate-950">
                  Propriedades por cidade
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Algumas locais onde mais buscamos seu imovel
                </p>
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

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cityCards.map((city) => (
                <Link
                  key={city.city}
                  to="/imoveis"
                  className="group relative min-h-[500px] overflow-hidden rounded-md bg-slate-900 shadow-sm"
                >
                  <img
                    src={city.image}
                    alt={`Imoveis em ${city.city}`}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/20 to-slate-950/55" />
                  <div className="relative z-10 p-5 text-white">
                    <h3 className="text-base font-semibold">{city.city}</h3>
                    <p className="mt-1 text-xs text-white/75">{city.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
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

            <div className="mt-8 grid w-full gap-5 md:grid-cols-4">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
