import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

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

      <main className="pt-24">
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Contato
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Fale com a nossa equipe.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Envie seus dados e agende seu atendimento sobre compra, venda, aluguel ou avaliacao de imoveis.
            </p>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Informações</h2>
                  <p className="mt-4 text-slate-700">
                    <strong className="text-slate-950">Telefone:</strong> (11) 99999-9999
                  </p>
                  <p className="mt-3 text-slate-700">
                    <strong className="text-slate-950">E-mail:</strong> contato@ninhoimoveis.com.br
                  </p>
                  <p className="mt-3 text-slate-700">
                    <strong className="text-slate-950">Endereço:</strong> Rua Harmonia, 425, Santa Cecília, São Paulo - SP
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Horário</h2>
                  <div className="mt-4 space-y-3 text-slate-700">
                    <p>Segunda - Sexta: <strong className="text-slate-950">08:00 - 18:00</strong></p>
                    <p>Sábado: <strong className="text-slate-950">08:00 - 12:00</strong></p>
                    <p>Domingo: <strong className="text-slate-950">Fechado</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-5">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Nome completo</span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 min-h-[52px] w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-emerald-500"
                  placeholder="Seu nome completo"
                  required
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Telefone</span>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-2 min-h-[52px] w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-emerald-500"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">E-mail</span>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 min-h-[52px] w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-emerald-500"
                    placeholder="seu@email.com"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Assunto</span>
                <select
                  name="subject"
                  className="mt-2 min-h-[52px] w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-emerald-500"
                >
                  <option>Compra de Imóvel</option>
                  <option>Venda de Imóvel</option>
                  <option>Aluguel</option>
                  <option>Avaliação</option>
                  <option>Outro</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Mensagem</span>
                <textarea
                  name="message"
                  rows="5"
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-4 outline-none transition focus:border-emerald-500"
                  placeholder="Conte como podemos ajudar"
                  required
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
          <div className="rounded-[32px] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Localização</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-950">Nosso escritório em São Paulo</h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Venha nos visitar ou use o mapa abaixo para encontrar nosso endereço em Santa Cecília.
                </p>
                <p className="mt-6 text-sm text-slate-700">
                  <strong>Rua Harmonia, 425</strong>
                  <br />
                  Santa Cecília • São Paulo, SP • 01234-000
                </p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
                <iframe
                  title="Mapa da Ninho Imoveis Residenciais"
                  src="https://www.google.com/maps?q=Rua+Harmonia,+425,+S%C3%A3o+Paulo,+SP&output=embed"
                  className="h-[320px] w-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
