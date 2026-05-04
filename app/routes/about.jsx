import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PresentationAbout } from "../components/about/PresentationAbout";
import { FAQ } from "../components/faq/FAQ";

export function meta() {
  return [
    { title: "Sobre nos | Ninho Imoveis" },
    {
      name: "description",
      content: "Conheca a historia, a atuacao e o processo de atendimento da Ninho Imoveis.",
    },
  ];
}

const processSteps = [
  {
    step: "Briefing",
    desc: "Entendemos suas necessidades, preferencias e orcamento para encontrar o imovel ideal.",
  },
  {
    step: "Selecao",
    desc: "Filtramos as melhores opcoes do nosso portfolio alinhadas ao seu perfil.",
  },
  {
    step: "Visita",
    desc: "Agendamos e acompanhamos visitas presenciais ou virtuais aos imoveis selecionados.",
  },
  {
    step: "Negociacao",
    desc: "Conduzimos proposta, contraproposta e fechamento com clareza e seguranca.",
  },
];

const diferenciais = [
  {
    titulo: "Gestao de propriedades",
    descricao: "Acompanhamento organizado para compra, venda, locacao e administracao de imoveis.",
    icon: (
      <path
        d="M4 19V9.5L12 4l8 5.5V19M8 19v-7h8v7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
  {
    titulo: "Atendimento consultivo",
    descricao: "Ajudamos voce a comparar opcoes, entender valores e decidir com mais seguranca.",
    icon: (
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8a7 7 0 0 0-14 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
  {
    titulo: "Processo claro",
    descricao: "Cada etapa e conduzida com informacoes objetivas, prazos visiveis e documentacao alinhada.",
    icon: (
      <path
        d="M8 6h10M8 12h10M8 18h6M5 6h.01M5 12h.01M5 18h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
  {
    titulo: "Seguranca na escolha",
    descricao: "Priorizamos imoveis bem apresentados, dados consistentes e suporte ate a assinatura.",
    icon: (
      <path
        d="M12 3 5 6v5c0 4.5 2.9 8.4 7 10 4.1-1.6 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <section className="relative min-h-[680px] overflow-hidden bg-slate-900 pt-20 text-white sm:min-h-[760px] lg:min-h-[820px]">
        <div className="absolute inset-0">
          <img
            src="/images/about.svg"
            alt="Residencia moderna da Ninho Imoveis"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-900/10 to-white" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-16 text-center sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
            Sobre nos
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Descubra um estilo de vida que une conforto e elegancia.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Elevamos sua experiencia de vida com imoveis selecionados, atendimento proximo e uma jornada clara ate a chave.
          </p>
        </div>
      </section>

      <PresentationAbout />

      <section className="border-t border-slate-200 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
              Processo
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Da busca ate a chave, com etapas claras.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <article
                key={item.step}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300/40 hover:bg-emerald-100 sm:p-6"
              >
                <span className="text-xs font-bold text-emerald-500">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f172a] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-start">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Por que nos escolher
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Vamos encontrar a melhor opcao para voce.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-slate-300">
                Trabalhamos com transparencia, curadoria de imoveis e suporte em cada etapa da decisao.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {diferenciais.map((item) => (
                <article
                  key={item.titulo}
                  className="rounded-lg border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/30 hover:bg-white/10 sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.descricao}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}
