import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no minimo 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      navigate("/entrar");
    } catch {
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex min-h-[320px] overflow-hidden lg:min-h-screen">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
            alt="Interior moderno de uma casa"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/25 to-slate-950/90 lg:bg-gradient-to-r lg:from-slate-950/25 lg:via-slate-950/25 lg:to-slate-950" />

          <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-8 lg:p-10">
            <Link to="/entrar" className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-white transition hover:text-emerald-300">
              <span className="grid size-9 place-items-center rounded-full bg-white/12 backdrop-blur">
                <svg className="size-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Voltar para login
            </Link>

            <div className="max-w-xl pt-20 lg:pb-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">
                Nova conta
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Comece sua jornada com a Ninho.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/80 sm:text-base">
                Crie sua conta para salvar imoveis, organizar visitas e acompanhar oportunidades com mais facilidade.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white px-6 py-10 text-slate-950 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">Cadastro</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Criar conta
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Preencha seus dados para acessar os recursos da plataforma.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Nome completo</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                  placeholder="Joao Silva"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
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
                  <span className="text-sm font-bold text-slate-700">Telefone</span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                    placeholder="(91) 98765-4321"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Senha</span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                    placeholder="Minimo 6 caracteres"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Confirmar senha</span>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="mt-2 min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                    placeholder="Digite novamente"
                  />
                </label>
              </div>

              {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              )}

              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="mt-1 size-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                />
                <span>
                  Concordo com os{" "}
                  <button type="button" className="font-bold text-emerald-700 transition hover:text-slate-950">
                    Termos de Uso
                  </button>{" "}
                  e a{" "}
                  <button type="button" className="font-bold text-emerald-700 transition hover:text-slate-950">
                    Politica de Privacidade
                  </button>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="flex min-h-12 w-full items-center justify-center rounded-md bg-emerald-500 px-5 text-sm font-bold uppercase tracking-[0.04em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Ja tem uma conta?{" "}
              <Link to="/entrar" className="font-bold text-emerald-700 transition hover:text-slate-950">
                Fazer login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
