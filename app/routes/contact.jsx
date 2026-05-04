import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

const contactCards = [
  {
    title: "Telefone",
    value: "(11) 99999-9999",
    detail: "Atendimento comercial",
    icon: (
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.63 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.2a2 2 0 0 1 2.11-.45c.86.3 1.75.51 2.65.63A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
  {
    title: "Email",
    value: "contato@ninhoimoveis.com.br",
    detail: "Resposta em ate 1 dia util",
    icon: (
      <path
        d="M4 6h16v12H4V6Zm0 2 8 5 8-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
  {
    title: "Endereco",
    value: "Rua Harmonia, 425",
    detail: "Santa Cecilia, Sao Paulo - SP",
    icon: (
      <path
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
  },
];

export function meta() {
  return [
    { title: "Contato | Ninho Imoveis Residenciais" },
    {
      name: "description",
      content: "Fale com a equipe da Ninho Imoveis Residenciais para comprar, vender ou alugar seu imovel.",
    },
  ];
}

export default function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-slate-950 pt-24 text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=80"
              alt="Sala moderna em imovel residencial"
              className="h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-slate-950/55" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
                Contato
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Fale com quem entende o seu proximo passo.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/85">
                Conte para nossa equipe o que voce procura. Vamos orientar sua compra, venda, locacao ou avaliacao com clareza.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {contactCards.map((card) => (
              <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    {card.icon}
                  </svg>
                </div>
                <h2 className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">{card.title}</h2>
                <p className="mt-2 text-base font-bold text-slate-950 break-words">{card.value}</p>
                <p className="mt-1 text-sm text-slate-500">{card.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              Atendimento
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Escolha o melhor canal.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Se preferir, envie uma mensagem pelo formulario. Nossa equipe retorna com as proximas etapas, documentos e opcoes disponiveis.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-slate-950">Horario de atendimento</p>
                <p className="mt-2">Segunda a sexta: 08:00 - 18:00</p>
                <p>Sabado: 08:00 - 12:00</p>
                <p>Domingo: fechado</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 text-emerald-950">
                <p className="font-bold">Atendimento para proprietarios</p>
                <p className="mt-2">Receba apoio para avaliar, anunciar e organizar visitas ao seu imovel.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-5">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Nome completo</span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
                  placeholder="Seu nome completo"
                  required
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Telefone</span>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="seu@email.com"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">Assunto</span>
                <select
                  name="subject"
                  className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
                >
                  <option>Compra de imovel</option>
                  <option>Venda de imovel</option>
                  <option>Aluguel</option>
                  <option>Avaliacao</option>
                  <option>Outro</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">Mensagem</span>
                <textarea
                  name="message"
                  rows="5"
                  className="mt-2 w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:bg-white"
                  placeholder="Conte como podemos ajudar"
                  required
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-emerald-500 px-6 text-sm font-bold uppercase tracking-[0.04em] text-white transition hover:bg-emerald-600"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-6 sm:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Localizacao</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-950">Nosso escritorio em Sao Paulo</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Venha nos visitar ou use o mapa para encontrar nosso endereco em Santa Cecilia.
                </p>
                <p className="mt-6 text-sm text-slate-700">
                  <strong className="text-slate-950">Rua Harmonia, 425</strong>
                  <br />
                  Santa Cecilia, Sao Paulo - SP, 01234-000
                </p>
              </div>

              <iframe
                title="Mapa da Ninho Imoveis Residenciais"
                src="https://www.google.com/maps?q=Rua+Harmonia,+425,+S%C3%A3o+Paulo,+SP&output=embed"
                className="h-[340px] w-full border-0 lg:h-full"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
