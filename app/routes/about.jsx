import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function meta() {
  return [
    { title: "Sobre nos | Morada Prime" },
    {
      name: "description",
      content: "Conheca a historia, a atuacao e o processo de atendimento da Morada Prime.",
    },
  ];
}

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="pt-24">
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Sobre nos
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Atendimento imobiliario com dados, contexto e proximidade.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              A Morada Prime conecta compradores, locatarios e proprietarios por meio de um processo simples: curadoria de imoveis, leitura de mercado e acompanhamento em cada etapa da negociacao.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
            alt="Equipe analisando oportunidades imobiliarias"
            className="h-[420px] w-full rounded-md object-cover shadow-sm"
          />
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 md:grid-cols-3 lg:px-10">
            {[
              ["Curadoria", "Selecionamos imoveis com documentacao, localizacao e perfil de compra bem definidos."],
              ["Transparencia", "Apresentamos preco, bairro, caracteristicas e mapa para reduzir incertezas."],
              ["Acompanhamento", "Conduzimos visitas, propostas e fechamento com comunicacao objetiva."],
            ].map(([title, description]) => (
              <article key={title} className="rounded-md border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Processo
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Da busca ate a chave, com etapas claras.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {["Briefing", "Selecao", "Visita", "Negociacao"].map((step, index) => (
              <div key={step} className="border-t border-slate-300 pt-5">
                <span className="text-sm font-semibold text-emerald-700">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-950">{step}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
