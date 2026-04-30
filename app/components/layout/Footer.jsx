import { Link } from "react-router";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/sobre", label: "Sobre nos" },
  { to: "/imoveis", label: "Imoveis" },
];

const serviceLinks = ["Compra", "Venda", "Aluguel", "Avaliacao"];

function BrandMark() {
  return (
    <Link to="/" className="inline-flex items-center">
      <img
        src="/logo.svg"
        alt="Morada Prime Imoveis"
        className="h-[75px] w-auto max-w-[180px] object-contain"
      />
    </Link>
  );
}

function SocialIcon({ label, children }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:scale-105 hover:border-emerald-300 hover:text-emerald-300"
    >
      {children}
    </a>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-sm text-white/78">{children}</div>
    </div>
  );
}

export function Footer() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <footer className="bg-[#22242a] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[340px_1fr] lg:px-10 lg:py-16">
        <form onSubmit={handleSubmit} className="rounded-md bg-[#17181c] p-6 shadow-sm lg:min-h-[520px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Feedback
            </p>
            <h2 className="mt-5 text-2xl font-semibold leading-tight text-white/70">
              Buscando suporte personalizado? Solicite uma ligacao da nossa equipe.
            </h2>
          </div>

          <div className="mt-8 grid gap-4">
            <label className="block rounded-md border border-white/30 px-4 py-3 focus-within:border-emerald-300">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                Seu nome
              </span>
              <input
                type="text"
                name="name"
                className="mt-2 w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                placeholder="Nome completo"
              />
            </label>

            <label className="block rounded-md border border-white/15 px-4 py-3 focus-within:border-emerald-300">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                Numero de telefone
              </span>
              <input
                type="tel"
                name="phone"
                className="mt-2 w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                placeholder="(00) 00000-0000"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-400 px-7 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Enviar pedido
          </button>

          <p className="mt-10 text-xs leading-6 text-white/40">
            Ao enviar, voce autoriza o contato da nossa equipe para atendimento imobiliario.
          </p>
        </form>

        <div className="flex flex-col gap-12 py-2">
          <div className="grid gap-10 xl:grid-cols-[1fr_260px]">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <FooterColumn title="Informacao">
                {footerLinks.map((item) => (
                  <Link key={item.to} to={item.to} className="transition hover:text-emerald-300">
                    {item.label}
                  </Link>
                ))}
              </FooterColumn>

              <FooterColumn title="Servicos">
                {serviceLinks.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </FooterColumn>

              <FooterColumn title="Contato">
                <span>(11) 99999-9999</span>
                <span>contato@moradaprime.com.br</span>
                <span>Rua Harmonia, 425 - Sao Paulo, SP</span>
              </FooterColumn>
            </div>

            <div className="xl:justify-self-end">
              <BrandMark />
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Assinatura
              </p>
              <form onSubmit={handleSubmit} className="mt-5 flex overflow-hidden rounded-md border border-white/15">
                <input
                  type="email"
                  name="email"
                  className="min-h-12 flex-1 border-0 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40"
                  placeholder="E-mail"
                />
                <button
                  type="submit"
                  aria-label="Enviar e-mail"
                  className="grid min-h-12 w-14 place-items-center border-l border-white/10 text-emerald-300 transition hover:bg-white/5"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 8 12" aria-hidden="true">
                    <path d="M1 1L6 6L1 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-6 lg:items-end">
              <div className="flex gap-3">
                <SocialIcon label="Instagram">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17" cy="7" r="1" fill="currentColor" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.2 8.4V6.9c0-.7.5-.9.9-.9h2.3V2.2L14.2 2c-3.6 0-4.4 2.7-4.4 4.4v2H7v4.1h2.8V22h4.4v-9.5h3.1l.5-4.1h-3.6Z" />
                  </svg>
                </SocialIcon>
                <SocialIcon label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.5 8.9H2.8V21h3.7V8.9ZM4.7 3C3.5 3 2.6 3.8 2.6 4.9S3.5 6.8 4.7 6.8s2.1-.8 2.1-1.9S5.9 3 4.7 3ZM21.4 14.1c0-3.7-2-5.5-4.7-5.5-2.1 0-3.1 1.2-3.6 2V8.9H9.5V21h3.7v-6c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V21h3.7v-6.9h.2Z" />
                  </svg>
                </SocialIcon>
              </div>
              <p className="text-sm text-white/40">(c) 2026 - Ninho - Imoveis Residenciais. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
