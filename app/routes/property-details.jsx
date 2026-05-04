import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { currencyFormatter } from "../components/properties/currencyFormatter";
import { getPropertyById } from "../services/propertyService";

const fallbackGalleryImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
];

export function meta() {
  return [
    { title: "Detalhes do imovel | Morada Prime" },
    {
      name: "description",
      content: "Veja detalhes, imagens, caracteristicas, visita e localizacao do imovel.",
    },
  ];
}

function getGalleryImages(property) {
  return [...new Set([...(property.images ?? []), ...fallbackGalleryImages].filter(Boolean))].slice(0, 5);
}

function mapUrlFor(property) {
  const lat = Number(property.mapLocation.lat);
  const lng = Number(property.mapLocation.lng);
  const delta = 0.01;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join("%2C");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

function externalMapUrlFor(property) {
  const lat = Number(property.mapLocation.lat);
  const lng = Number(property.mapLocation.lng);

  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
}

function PropertyGallery({ property }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = useMemo(() => getGalleryImages(property), [property]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-[15px] sm:h-[400px] lg:h-[504px]">
      <img src={images[currentImage]} alt={property.title} className="h-full w-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black via-black/50 to-transparent sm:h-[200px] lg:h-[242px]" />

      <Link
        to="/imoveis"
        className="absolute left-3 top-3 rounded-full bg-black p-2 text-white transition hover:bg-slate-800 sm:left-4 sm:top-4 sm:p-3"
        aria-label="Voltar para busca"
      >
        <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <button
        type="button"
        onClick={prevImage}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black sm:left-4 sm:p-3"
        aria-label="Imagem anterior"
      >
        <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextImage}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black sm:right-4 sm:p-3"
        aria-label="Proxima imagem"
      >
        <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 sm:bottom-20 lg:bottom-24">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrentImage(index)}
            className={`size-2.5 rounded-full transition sm:size-3 ${
              index === currentImage ? "bg-white" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Mostrar imagem ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white sm:right-4 sm:top-4 sm:px-3 sm:text-sm">
        {currentImage + 1} / {images.length}
      </div>

      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8">
        <p className="mb-1 text-[15px] font-bold text-white sm:mb-2 sm:text-[17px] lg:text-[19px]">{property.locationText}</p>
        <p className="text-[14px] font-bold text-[#00d82f] sm:text-[15px] lg:text-[17px]">Abaixo da media</p>
      </div>
    </div>
  );
}

function StatIcon({ type }) {
  const iconClass = "size-8 text-[#5f6368]";

  if (type === "bed") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M5 13.5V25M27 25V12.5c0-1.66-1.34-3-3-3H15v7.5H5V9"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 9h4.5c1.38 0 2.5 1.12 2.5 2.5V17H5v-5c0-1.66 1.34-3 3-3Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M5 21h22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "bath") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M6 15h20v3.5A7.5 7.5 0 0 1 18.5 26h-5A7.5 7.5 0 0 1 6 18.5V15Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M9 15V8.5A3.5 3.5 0 0 1 12.5 5H14"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M13.5 8h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M11 26l-1.5 2M22.5 26l1.5 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "garage") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M5 27V11.5L16 5l11 6.5V27"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 27v-8.5c0-1.38 1.12-2.5 2.5-2.5h7c1.38 0 2.5 1.12 2.5 2.5V27"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M13 21h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M7 7h18v18H7V7Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M11 21V11h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 11l10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 11h3v3M10 21H7v-3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PropertyStats({ property }) {
  const stats = [
    { icon: "bed", label: "Quartos", value: property.beds },
    { icon: "bath", label: "Banheiros", value: property.baths },
    { icon: "garage", label: "Garagens", value: property.garage },
    { icon: "area", label: "Area do Imovel", value: `${property.area}m2` },
  ];

  return (
    <div className="my-8 grid grid-cols-2 gap-4 sm:my-10 sm:gap-6 lg:my-12 lg:grid-cols-4 lg:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-4 shadow-sm sm:gap-3 sm:px-4 sm:py-5">
          <div className="grid size-12 place-items-center rounded-full bg-[#e1ece6] sm:size-14">
            <StatIcon type={stat.icon} />
          </div>
          <span className="text-center text-[11px] font-bold text-[#5b5b5b] sm:text-xs">{stat.label}</span>
          <p className="text-center text-sm font-bold text-black sm:text-base">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function MetricIcon({ type }) {
  const iconClass = "size-8 text-[#1d9e75]";

  if (type === "currentPrice") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 28c6.63 0 12-5.37 12-12S22.63 4 16 4 4 9.37 4 16s5.37 12 12 12Z"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M19.5 12.5c-.6-1.05-1.8-1.75-3.45-1.75-2.05 0-3.55 1.05-3.55 2.65 0 4 7.1 1.7 7.1 5.4 0 1.55-1.45 2.7-3.65 2.7-1.9 0-3.2-.8-3.85-2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M16 8.5v15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "average") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M5 25h22M8 22V12M16 22V7M24 22V15"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d="M6 12l10-5 10 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "notice") {
    return (
      <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="6" y="5" width="20" height="22" rx="3" stroke="currentColor" strokeWidth="2.2" />
        <path d="M11 11h10M11 16h10M11 21h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M23 3v5M9 3v5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} fill="none" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M5 25h22"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8 22l5-6 4 3 7-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 10h4v4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="10" r="4" stroke="currentColor" strokeWidth="2.2" />
      <path d="M11 7.8v4.4M9.4 9h2.4c.9 0 1.4.43 1.4 1.1s-.5 1.1-1.4 1.1H9.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricItem({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-4 text-center shadow-sm">
      <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-[#e1ece6] sm:size-14">
        <MetricIcon type={icon} />
      </div>
      <p className="mb-2 text-[11px] font-bold text-[#6e6e6e] sm:text-sm">{label}</p>
      <p className="text-xs font-semibold text-black sm:text-sm">{value}</p>
    </div>
  );
}

function MarketMetrics({ property }) {
  const areaAverage = Math.round(property.price * 1.35);
  const increasePotential = property.status === "Venda" ? "18%" : "12%";

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:mb-8 sm:grid-cols-3 sm:gap-6">
        <MetricItem icon="currentPrice" label="Preco atual" value={currencyFormatter.format(property.price)} />
        <MetricItem icon="average" label="Media da area" value={currencyFormatter.format(areaAverage)} />
        <div className="col-span-2 sm:col-span-1">
          <MetricItem icon="notice" label="Tempo de aviso" value="1 Semana" />
        </div>
      </div>

      <MetricItem icon="growth" label="Potencial de aumento de preco" value={increasePotential} />
    </div>
  );
}

function PropertyDetails({ property }) {
  return (
    <section className="mb-6 rounded-[13px] border border-[#ddd] bg-[#f9f9f9] p-4 sm:mb-8 sm:p-6 lg:p-8">
      <PropertyGallery property={property} />
      <PropertyStats property={property} />

      <div className="mb-6 grid gap-6 sm:mb-8 sm:gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-[17px] font-bold text-black sm:mb-4 sm:text-[19px]">Descricao detalhada</h2>
          <p className="text-justify text-sm font-semibold leading-relaxed text-[#404040] sm:text-[15px] lg:text-base">
            {property.description}
          </p>
        </div>

        <MarketMetrics property={property} />
      </div>

      <Link
        to="/contato"
        className="mx-auto flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#00d82f] px-8 text-sm font-bold text-white transition hover:bg-[#00b827] sm:w-fit sm:px-12 sm:text-base lg:px-20"
      >
        ENTRAR EM CONTATO
        <svg className="size-5 rotate-90 sm:size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17 14L12 9L7 14" stroke="white" strokeWidth="1.5" />
        </svg>
      </Link>
    </section>
  );
}

function InspectionSchedule() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6">
      <h3 className="mb-2 text-[15px] font-bold text-black sm:text-base">Horarios de inspecao</h3>
      <p className="mb-4 text-[10px] font-semibold text-[#6e6e6e]">
        As visitas e inspecoes ocorrem nesse horario.
      </p>
      <p className="mb-4 text-[11px] font-semibold text-[#1d9e75] sm:mb-6 sm:text-xs">Segunda, 7 Agosto, 7:00 pm - 14:00 pm</p>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded bg-[#e1ece6] px-4 py-2 text-[11px] font-bold text-[#1d9e75] transition hover:bg-[#d0ddd5] sm:px-6 sm:py-3 sm:text-xs"
      >
        <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#1D9E75" strokeWidth="2" />
          <line x1="9" y1="1" x2="9" y2="4" stroke="#1D9E75" strokeWidth="2" />
          <line x1="15" y1="1" x2="15" y2="4" stroke="#1D9E75" strokeWidth="2" />
        </svg>
        <span className="hidden sm:inline">ADICIONAR AO CALENDARIO</span>
        <span className="sm:hidden">ADICIONAR</span>
      </button>
    </div>
  );
}

function AgentContact({ broker }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6">
      <h3 className="mb-3 text-[15px] font-bold text-black sm:mb-4 sm:text-base">Detalhes de agendamento</h3>

      <div className="mb-3 flex items-center gap-3 sm:mb-4">
        <img
          src={broker.photo}
          alt={broker.name}
          className="size-12 rounded-full object-cover sm:size-14"
        />
        <div>
          <p className="text-[13px] font-semibold text-[#1d9e75] sm:text-sm">{broker.name}</p>
          <p className="text-[10px] font-semibold text-[#989898]">Corretora</p>
        </div>
      </div>

      <p className="mb-4 text-[10px] font-semibold leading-relaxed text-[#6e6e6e] sm:mb-6">
        Corretora com 25 anos de experiencia no mercado imobiliario, oferecendo atendimento de qualidade e confianca.
      </p>
      <Link
        to="/contato"
        className="flex w-full items-center justify-center gap-2 rounded bg-[#e1ece6] px-4 py-2 text-[11px] font-bold text-[#1d9e75] transition hover:bg-[#d0ddd5] sm:px-6 sm:text-xs"
      >
        <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Contate um agente
      </Link>
    </div>
  );
}

function DetailLocationMap({ property }) {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[350px] lg:h-[375px]">
      <iframe
        title={`Mapa de ${property.title}`}
        src={mapUrlFor(property)}
        className="h-full w-full border-0"
        loading="lazy"
      />
      <a
        href={externalMapUrlFor(property)}
        target="_blank"
        rel="noreferrer"
        className="absolute left-3 top-3 rounded bg-white px-2 py-1 text-[10px] text-[#0369f0] transition hover:bg-slate-100 sm:px-3 sm:text-xs"
      >
        <span className="hidden sm:inline">View larger map</span>
        <span className="sm:hidden">Ver mapa</span>
      </a>
    </div>
  );
}

function LocationSection({ property }) {
  const broker = property.broker ?? {
    name: "Helena Alvez",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  };

  return (
    <section className="mb-6 rounded-[13px] border border-[#ddd] bg-[#f9f9f9] p-4 sm:mb-8 sm:p-6 lg:p-8">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <InspectionSchedule />
        <AgentContact broker={broker} />
        <DetailLocationMap property={property} />
      </div>
    </section>
  );
}

function DataDisclaimer() {
  return (
    <section className="rounded-[13px] border border-[#ddd] bg-[#f9f9f9] p-4 sm:p-6">
      <p className="mb-3 text-base font-bold text-black">Sobre os dados apresentados</p>
      <p className="text-[10px] font-semibold text-[#6e6e6e]">
        As metricas apresentadas sao baseadas em dados do mercado imobiliario e podem sofrer variacoes ao longo do
        tempo. Consulte a politica de dados para entender mais.
      </p>
    </section>
  );
}

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPropertyById(propertyId);
        if (active) {
          setProperty(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    if (propertyId) {
      fetchProperty();
    }

    return () => {
      active = false;
    };
  }, [propertyId]);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-white p-8 text-sm font-semibold text-slate-600">
        Carregando imóvel...
      </main>
    );
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-white p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold text-black">Erro ao carregar imóvel</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link to="/imoveis" className="mt-4 inline-flex rounded-md bg-black px-5 py-3 text-sm font-semibold text-white">
            Voltar para busca
          </Link>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="grid min-h-screen place-items-center bg-white p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold text-black">Imóvel não encontrado</h1>
          <Link to="/imoveis" className="mt-4 inline-flex rounded-md bg-black px-5 py-3 text-sm font-semibold text-white">
            Voltar para busca
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h1 className="text-[22px] font-bold text-black sm:text-[28px] lg:text-[32px]">Caracteristicas do Imovel</h1>
          <button type="button" className="rounded-full p-2 transition hover:bg-slate-100" aria-label="Favoritar">
            <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#00FFBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <PropertyDetails property={property} />
        <LocationSection property={property} />
        <DataDisclaimer />
      </div>
    </main>
  );
}
