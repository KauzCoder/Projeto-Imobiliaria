import { useState } from "react";
import { Link } from "react-router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(name, email, password, phone);
      if (success) {
        window.location.href = "/profile";
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="absolute left-4 top-4 z-50">
        <Link
          to="/entrar"
          className="flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black shadow-lg transition hover:shadow-xl"
        >
          <svg className="size-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M12 16L6 10L12 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </Link>
      </div>


      {/* Left Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-[#00FFBF]/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h3 className="font-['Poppins:Bold',sans-serif] text-[48px] leading-tight mb-4">
              Comece sua jornada
            </h3>
            <p className="font-['Inter:Regular',sans-serif] text-[18px] leading-relaxed">
              Crie sua conta e tenha acesso a recursos exclusivos, salve seus
              imóveis favoritos e receba recomendações personalizadas.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center font-['Poppins:Bold',sans-serif] text-[36px] text-black">
              Criar conta
            </h2>
            <p className="mt-2 text-center font-['Inter:Regular',sans-serif] text-[16px] text-[#6f6f6f]">
              Preencha os dados para começar
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-['Inter:Medium',sans-serif] text-[14px] text-black mb-2"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e6e6e6] placeholder-[#989898] text-black rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00FFBF] focus:border-transparent font-['Inter:Regular',sans-serif] text-[14px]"
                  placeholder="João Silva"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-['Inter:Medium',sans-serif] text-[14px] text-black mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e6e6e6] placeholder-[#989898] text-black rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00FFBF] focus:border-transparent font-['Inter:Regular',sans-serif] text-[14px]"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block font-['Inter:Medium',sans-serif] text-[14px] text-black mb-2"
                >
                  Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e6e6e6] placeholder-[#989898] text-black rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00FFBF] focus:border-transparent font-['Inter:Regular',sans-serif] text-[14px]"
                  placeholder="(91) 98765-4321"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-['Inter:Medium',sans-serif] text-[14px] text-black mb-2"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e6e6e6] placeholder-[#989898] text-black rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00FFBF] focus:border-transparent font-['Inter:Regular',sans-serif] text-[14px]"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block font-['Inter:Medium',sans-serif] text-[14px] text-black mb-2"
                >
                  Confirmar senha
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e6e6e6] placeholder-[#989898] text-black rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00FFBF] focus:border-transparent font-['Inter:Regular',sans-serif] text-[14px]"
                  placeholder="Digite a senha novamente"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-[8px] px-4 py-3">
                <p className="font-['Inter:Regular',sans-serif] text-[14px] text-red-600">
                  {error}
                </p>
              </div>
            )}

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[#00FFBF] focus:ring-[#00FFBF] border-gray-300 rounded"
                />
              </div>
              <div className="ml-2">
                <label
                  htmlFor="terms"
                  className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6f6f6f]"
                >
                  Concordo com os{" "}
                  <a href="#" className="text-[#00FFBF] hover:text-[#00d9a8]">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-[#00FFBF] hover:text-[#00d9a8]">
                    Política de Privacidade
                  </a>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent font-['Inter:Medium',sans-serif] text-[16px] rounded-[50px] text-white bg-[#00FFBF] hover:bg-[#00d9a8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FFBF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </button>

              <div className="text-center">
                <span className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6f6f6f]">
                  Já tem uma conta?{" "}
                </span>
                <Link
                  to="/entrar"
                  className="font-['Inter:Medium',sans-serif] text-[14px] text-[#00FFBF] hover:text-[#00d9a8]"
                >
                  Fazer login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
