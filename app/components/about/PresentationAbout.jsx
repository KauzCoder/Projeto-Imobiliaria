import { useState, useEffect, useRef } from "react";
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

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [statsStarted]);

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
        <span className="text-3xl font-bold text-slate-900">
          {prefix}
          {count.toLocaleString("pt-BR")}
        </span>
        <span className="mt-1 text-sm text-slate-500">{label}</span>
      </div>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
                Nossa história
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                A Morada Prime é uma empresa imobiliária dedicada a oferecer
                soluções habitacionais de qualidade. Nosso compromisso é
                proporcionar aos nossos clientes opções de moradia que aliam
                conforto, segurança e acessibilidade. Com projetos que priorizam
                a privacidade e a harmonia com a natureza, garantimos um
                ambiente agradável e limpo. Nossas comunidades contam com áreas
                de lazer, campos esportivos, centros comerciais e instituições
                de ensino.
              </p>
            </div>

            {/* Contadores */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <StatCounter
                value={1000}
                label="Propriedades disponíveis"
                started={statsStarted}
              />
              <StatCounter
                value={60000}
                label="Clientes satisfeitos"
                started={statsStarted}
              />
              <StatCounter
                value={70000}
                label="Avaliações positivas"
                started={statsStarted}
              />
            </div>

            {/* IMAGEM: /public/images/enterprise.png */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/images/enterprise.png"
                alt="Sede da Morada Prime"
                className="h-56 w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold leading-snug text-slate-900 sm:text-4xl">
                Conheça mais sobre nós e nossa trajetória.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Desde nossa fundação, construímos uma trajetória sólida baseada
                na confiança dos nossos clientes, na excelência do atendimento e
                no profundo conhecimento do mercado imobiliário brasileiro.
              </p>
            </div>

            {/* IMAGEM: /public/images/trajectory.png */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/images/trajectory.png"
                alt="Trajetória da Morada Prime"
                className="h-80 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
