import { useEffect, useRef, useState } from "react";

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatCounter({ value, label, prefix = "+", started }) {
  const count = useCounter(value, 2000, started);

  return (
    <div className="flex flex-col items-start">
      <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {prefix}
        {count.toLocaleString("pt-BR")}
      </span>
      <span className="mt-1 text-sm text-slate-500">{label}</span>
    </div>
  );
}

export function PresentationAbout() {
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsStarted) {
          setStatsStarted(true);
        }
      },
      { threshold: 0.1 },
    );

    const current = statsRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [statsStarted]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8 sm:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
                Nossa historia
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                A Ninho Imoveis conecta pessoas a moradias que combinam localizacao, conforto e seguranca.
                Nosso trabalho e organizar dados, visitas e negociacoes para que cada decisao seja tomada com clareza.
              </p>
            </div>

            <div
              ref={statsRef}
              className="grid gap-5 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:grid-cols-3 sm:gap-6 sm:p-6"
            >
              <StatCounter value={1000} label="Propriedades disponiveis" started={statsStarted} />
              <StatCounter value={60000} label="Clientes satisfeitos" started={statsStarted} />
              <StatCounter value={70000} label="Avaliacoes positivas" started={statsStarted} />
            </div>

            <div className="overflow-hidden rounded-lg">
              <img
                src="/images/enterprise.png"
                alt="Equipe da Ninho Imoveis"
                className="h-56 w-full object-cover sm:h-64"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
                Conheca mais sobre nos e nossa trajetoria.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Construimos uma trajetoria baseada em atendimento proximo, conhecimento de mercado e selecao criteriosa
                de imoveis para compra, venda e locacao.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg">
              <img
                src="/images/trajectory.png"
                alt="Trajetoria da Ninho Imoveis"
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
