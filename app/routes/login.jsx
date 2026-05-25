import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  clearAuthSession,
  getStoredAuth,
  loginAccount,
  saveAuthSession,
} from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedAccount, setLoggedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedAuth = getStoredAuth();

    if (storedAuth.token && storedAuth.account) {
      setLoggedAccount(storedAuth.account);
      setSuccess(`Voce ja esta logado como ${storedAuth.account.name ?? "usuario"}.`);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoggedAccount(null);
    setIsLoading(true);

    if (!email.trim() || !password) {
      setError("Preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      const session = await loginAccount({ email: email.trim(), password });
      saveAuthSession(session);
      setSuccess(`Login confirmado. Bem-vindo, ${session.account?.name ?? "usuario"}.`);
      setLoggedAccount(session.account);
      setPassword("");
    } catch (err) {
      const message = err.response?.data?.message ?? "Erro ao fazer login. Tente novamente.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative flex min-h-[320px] overflow-hidden lg:min-h-screen">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
            alt="Casa moderna iluminada"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/20 to-slate-950/90 lg:bg-gradient-to-r lg:from-slate-950/25 lg:via-slate-950/20 lg:to-slate-950" />

          <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8 lg:p-10">
            <Link to="/" className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-white transition hover:text-emerald-300">
              <span className="grid size-9 place-items-center rounded-full bg-white/12 backdrop-blur">
                <svg className="size-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Voltar para home
            </Link>

            <div className="max-w-xl pt-20 lg:pb-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                Ninho Imoveis
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Acesse sua conta e continue sua busca.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/80 sm:text-base">
                Guarde favoritos, acompanhe contatos e encontre oportunidades com mais rapidez.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white px-6 py-10 text-slate-950 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">Entrar</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Bem-vindo de volta
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Use seu email e senha para acessar sua area.
              </p>
            </div>

            {loggedAccount ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-6">
                <div className="mb-5 grid size-12 place-items-center rounded-full bg-emerald-500 text-white">
                  <svg className="size-7" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-950">Login confirmado</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  Voce entrou como <strong className="text-slate-950">{loggedAccount.name}</strong>. Sua sessao foi salva neste navegador.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="mt-6 flex min-h-12 w-full items-center justify-center rounded-md bg-emerald-500 px-5 text-sm font-bold uppercase tracking-[0.04em] text-white transition hover:bg-emerald-600"
                >
                  Ir para inicio
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearAuthSession();
                    setLoggedAccount(null);
                    setSuccess("");
                    setEmail("");
                    setPassword("");
                  }}
                  className="mt-3 flex min-h-11 w-full items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-bold uppercase tracking-[0.04em] text-slate-700 transition hover:bg-white"
                >
                  Sair desta conta
                </button>
              </div>
            ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Email</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                  placeholder="seu@email.com"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">Senha</span>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 pr-12 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M3 3L21 21M10.6 10.6A2 2 0 0 0 13.4 13.4M9.2 5.5A9.7 9.7 0 0 1 12 5C17.5 5 21 12 21 12A16.2 16.2 0 0 1 18.7 15.2M6.5 6.5C4.3 8 3 12 3 12S6.5 19 12 19C13.3 19 14.5 18.6 15.5 18"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M3 12S6.5 5 12 5S21 12 21 12S17.5 19 12 19S3 12 3 12Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                  {success}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="size-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                  />
                  Lembrar de mim
                </label>

                <button type="button" className="text-sm font-bold text-emerald-700 transition hover:text-slate-950">
                  Esqueceu a senha?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex min-h-12 w-full items-center justify-center rounded-md bg-emerald-500 px-5 text-sm font-bold uppercase tracking-[0.04em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
            )}

            {!loggedAccount && (
            <>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-slate-500">Ou continue com</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50">
                  <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>

                <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50">
                  <svg className="size-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Nao tem uma conta?{" "}
              <Link to="/cadastrar" className="font-bold text-emerald-700 transition hover:text-slate-950">
                Cadastre-se
              </Link>
            </p>
            </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
