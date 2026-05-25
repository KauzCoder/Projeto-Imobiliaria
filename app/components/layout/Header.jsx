import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { clearAuthSession, getStoredAuth, subscribeAuthChanges } from "../../services/authService";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/imoveis", label: "Imoveis" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <img
        src="/logo.svg"
        alt="Ninho Imoveis Residenciais"
        className=" w-auto max-w-[150px] object-contain sm:max-w-[180px]"
      />
    </Link>
  );
}

function IconButton({ label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-[39px] w-[39px] shrink-0 place-items-center rounded-full border border-[#f1f1f1] bg-white text-slate-950 transition hover:opacity-80"
    >
      {children}
    </button>
  );
}

function Bell() {
  return (
    <IconButton label="Notificacoes">
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M18 10.4V15L20 18H4L6 15V10.4C6 6.9 8.5 4.3 12 4.3C15.5 4.3 18 6.9 18 10.4Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M9.8 20C10.3 20.8 11 21.2 12 21.2C13 21.2 13.7 20.8 14.2 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    </IconButton>
  );
}

function Message() {
  return (
    <IconButton label="Mensagens">
      <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 6.8C5 5.8 5.8 5 6.8 5H17.2C18.2 5 19 5.8 19 6.8V14.2C19 15.2 18.2 16 17.2 16H10L6 19V16H6.8C5.8 16 5 15.2 5 14.2V6.8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path d="M8.5 9H15.5M8.5 12H13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    </IconButton>
  );
}

function Profile({ account }) {
  const initial = account?.name?.charAt(0)?.toUpperCase() ?? "N";

  return (
    <button
      type="button"
      aria-label="Perfil"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-emerald-300/40 bg-emerald-400 text-sm font-bold text-slate-950 transition hover:opacity-80"
    >
      {initial}
    </button>
  );
}

function AccountSummary({ account }) {
  return (
    <div className="hidden min-w-0 items-center gap-2 sm:flex">
      <Profile account={account} />
      <span className="max-w-32 truncate text-sm font-semibold text-white">
        {account?.name ?? "Minha conta"}
      </span>
    </div>
  );
}

export function Header() {
  const [auth, setAuth] = useState({ token: "", account: null });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateAuth = () => setAuth(getStoredAuth());

    updateAuth();
    return subscribeAuthChanges(updateAuth);
  }, []);

  const isLoggedIn = Boolean(auth.token);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#17181c]/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-6 sm:min-h-25 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? "text-emerald-300" : "text-white hover:text-emerald-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-[15px] lg:flex">
                <Bell />
                <Message />
              </div>
              <AccountSummary account={auth.account} />
              <button
                type="button"
                onClick={() => {
                  clearAuthSession();
                  setAuth({ token: "", account: null });
                }}
                className="min-h-10 rounded-full border border-white/10 px-4 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/entrar"
              className="hidden min-h-10 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300 sm:inline-flex"
            >
              Entrar
            </Link>
          )}

          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-emerald-300 hover:text-emerald-300 md:hidden"
          >
            <span className="sr-only">{isMenuOpen ? "Fechar menu" : "Abrir menu"}</span>
            <span className="flex h-5 w-5 flex-col justify-center gap-1.5" aria-hidden="true">
              <span
                className={`h-0.5 w-5 rounded-full bg-current transition ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-5 rounded-full bg-current transition ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`border-t border-white/10 bg-[#17181c] px-6 py-4 shadow-lg md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-md px-3 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-emerald-400 text-slate-950" : "text-white hover:bg-white/5 hover:text-emerald-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                clearAuthSession();
                setAuth({ token: "", account: null });
                closeMenu();
              }}
              className="rounded-md border border-white/10 px-3 py-3 text-left text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/entrar"
              onClick={closeMenu}
              className="rounded-md border border-white/10 px-3 py-3 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-300"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
