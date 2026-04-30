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
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Contato
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Fale com a nossa equipe.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Envie seus dados para receber atendimento sobre compra, venda, aluguel ou avaliacao de imoveis.
            </p>

            <div className="mt-8 grid gap-4 text-slate-700">
              <p>
                <strong className="text-slate-950">Telefone:</strong> (11) 99999-9999
              </p>
              <p>
                <strong className="text-slate-950">E-mail:</strong> contato@ninhoimoveis.com.br
              </p>
              <p>
                <strong className="text-slate-950">Endereco:</strong> Rua Harmonia, 425 - Sao Paulo, SP
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Nome</span>
                <input
                  type="text"
                  name="name"
                  className="mt-2 min-h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-emerald-500"
                  placeholder="Seu nome completo"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Telefone</span>
                <input
                  type="tel"
                  name="phone"
                  className="mt-2 min-h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-emerald-500"
                  placeholder="(00) 00000-0000"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Mensagem</span>
                <textarea
                  name="message"
                  rows="5"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
                  placeholder="Conte como podemos ajudar"
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
