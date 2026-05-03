import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (email && password) {
        window.location.href = "/profile";
      } else {
        setError("Preencha todos os campos");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center font-['Poppins:Bold',sans-serif] text-[36px] text-black">
              Bem-vindo de volta
            </h2>
            <p className="mt-2 text-center font-['Inter:Regular',sans-serif] text-[16px] text-[#6f6f6f]">
              Acesse sua conta para continuar
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                  htmlFor="password"
                  className="block font-['Inter:Medium',sans-serif] text-[14px] text-black mb-2"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e6e6e6] placeholder-[#989898] text-black rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00FFBF] focus:border-transparent font-['Inter:Regular',sans-serif] text-[14px]"
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#00FFBF] focus:ring-[#00FFBF] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block font-['Inter:Regular',sans-serif] text-[14px] text-[#6f6f6f]"
                >
                  Lembrar de mim
                </label>
              </div>

              <div>
                <a
                  href="#"
                  className="font-['Inter:Medium',sans-serif] text-[14px] text-[#00FFBF] hover:text-[#00d9a8]"
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent font-['Inter:Medium',sans-serif] text-[16px] rounded-[50px] text-white bg-[#00FFBF] hover:bg-[#00d9a8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FFBF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>

              <div className="text-center">
                <span className="font-['Inter:Regular',sans-serif] text-[14px] text-[#6f6f6f]">
                  Não tem uma conta?{" "}
                </span>
                <Link
                  to="/register"
                  className="font-['Inter:Medium',sans-serif] text-[14px] text-[#00FFBF] hover:text-[#00d9a8]"
                >
                  Cadastre-se
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e6e6e6]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white font-['Inter:Regular',sans-serif] text-[14px] text-[#6f6f6f]">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-[#e6e6e6] rounded-[8px] bg-white font-['Inter:Medium',sans-serif] text-[14px] text-black hover:bg-gray-50 transition-colors">
                <svg className="size-[20px]" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>

              <button className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-[#e6e6e6] rounded-[8px] bg-white font-['Inter:Medium',sans-serif] text-[14px] text-black hover:bg-gray-50 transition-colors">
                <svg className="size-[20px]" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=1200&fit=crop"
          alt="Modern house"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00FFBF]/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h3 className="font-['Poppins:Bold',sans-serif] text-[48px] leading-tight mb-4">
              Encontre seu lar dos sonhos
            </h3>
            <p className="font-['Inter:Regular',sans-serif] text-[18px] leading-relaxed">
              Acesse milhares de imóveis exclusivos em todo o Brasil e descubra
              o lugar perfeito para você e sua família.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
