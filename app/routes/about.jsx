import { useState, useEffect, useRef } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PresentationAbout } from "../components/about/PresentationAbout";
import {FAQ} from "../components/faq/FAQ";
export function meta() {
  
  return [
    { title: "Sobre nós | Morada Prime" },
    {
      name: "description",
      content:
        "Conheça a história, a atuação e o processo de atendimento da Morada Prime.",
    },
  ];
}



const diferenciais = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-3.866 0-7-3.134-7-7h2a5 5 0 0010 0h2c0 3.866-3.134 7-7 7z" />
      </svg>
    ),
    titulo: "Gestão de Propriedades",
    descricao: "A nossa missão é proporcionar soluções inovadoras e eficazes para nossos clientes.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm9 3c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-1.154.204-2.255.578-3.255m14.844 0A7.963 7.963 0 0021 11m-9 13a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    ),
    titulo: "Serviços de Hipoteca",
    descricao: "Nosso foco é a satisfação do cliente, sempre buscando superar suas expectativas.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-6 8a9 9 0 110-18 9 9 0 010 18zm1-7h2m-2 4h4" />
      </svg>
    ),
    titulo: "Serviços de Câmbio",
    descricao: "Acreditamos na responsabilidade social e no compromisso com a comunidade.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h16M4 21h16" />
      </svg>
    ),
    titulo: "Pagamento Seguro",
    descricao: "Valorizamos a inovação e a melhoria contínua em nossos serviços.",
  },
];

export default function About() {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      {/* HERO */}
      <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          {/* IMAGEM: /public/images/about-hero.jpg */}
          <img
            src="/images/about-hero.jpg"
            alt="Morada Prime"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
            Sobre nós
          </p>
          <h1 className="mt-4 mx-auto max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Descubra um estilo de vida que une conforto e elegância.
          </h1>
          <p className="mt-5 mx-auto max-w-xl text-base leading-relaxed text-slate-600">
            Há mais de uma década conectando pessoas aos imóveis que transformam
            suas vidas. Conheça nossa história e o que nos move.
          </p>
        </div>
      </section>

      {/* SOBRE + TRAJETÓRIA */}
      <PresentationAbout></PresentationAbout>

      {/* PROCESSO */}
      <section className="border-t border-slate-200 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
              Processo
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Da busca até a chave, com etapas claras.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { step: "Briefing", desc: "Entendemos suas necessidades, preferências e orçamento para encontrar o imóvel ideal." },
              { step: "Seleção", desc: "Filtramos as melhores opções do nosso portfólio alinhadas ao seu perfil." },
              { step: "Visita", desc: "Agendamos e acompanhamos as visitas presenciais ou virtuais aos imóveis selecionados." },
              { step: "Negociação", desc: "Conduzimos a proposta, contrapartida e fechamento com total segurança jurídica." },
            ].map((item, index) => (
              <div
                key={item.step}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-300/40 hover:bg-emerald-100"
              >
                <span className="text-xs font-bold text-emerald-500">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-[#0f172a] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-start">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Por que nos escolher
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Vamos encontrar a melhor opção de venda para você.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-slate-300">
                A empresa valoriza a transparência e a ética em todas as suas operações.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {diferenciais.map((item) => (
                <div
                  key={item.titulo}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400/30 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ></FAQ>
      <Footer />
    </div>
  );
}