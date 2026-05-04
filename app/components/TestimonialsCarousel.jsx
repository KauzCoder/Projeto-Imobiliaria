const testimonialsRow1 = [
  {
    name: "Ana Carolina Silva",
    role: "Proprietaria",
    company: "Empresaria",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    quote:
      "A experiencia com a Ninho foi excepcional. Encontrei meu apartamento dos sonhos em Belem de forma rapida e sem complicacoes.",
  },
  {
    name: "Roberto Mendes",
    role: "Investidor",
    company: "RM Investimentos",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    quote:
      "Como investidor, a plataforma Ninho facilitou muito a gestao dos meus imoveis. Sistema intuitivo e com excelente suporte tecnico.",
  },
  {
    name: "Mariana Costa",
    role: "Arquiteta",
    company: "Costa Arquitetura",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    quote:
      "Profissionalismo impecavel. A Ninho entende as necessidades dos clientes e oferece imoveis de alta qualidade.",
  },
  {
    name: "Carlos Eduardo",
    role: "Engenheiro Civil",
    company: "Construtora Delta",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    quote:
      "A transparencia e agilidade no processo foram impressionantes. Consegui alugar meu primeiro apartamento sem burocracias.",
  },
];

const testimonialsRow2 = [
  {
    name: "Juliana Rodrigues",
    role: "Designer",
    company: "JR Studio",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces",
    quote:
      "Adorei a praticidade da plataforma. Os filtros de busca sao muito precisos e encontrei exatamente o que procurava.",
  },
  {
    name: "Felipe Santos",
    role: "Desenvolvedor",
    company: "TechBrasil",
    photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=faces",
    quote:
      "Sistema moderno e eficiente. Como desenvolvedor, aprecio a atencao aos detalhes na interface. Nota 10 para a Ninho.",
  },
  {
    name: "Patricia Lima",
    role: "Medica",
    company: "Hospital Sao Lucas",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
    quote:
      "Comprei minha casa atraves da Ninho e foi a melhor decisao. Processo transparente e equipe super profissional.",
  },
  {
    name: "Lucas Oliveira",
    role: "Advogado",
    company: "Oliveira & Associados",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    quote:
      "Recomendo a Ninho para todos. Encontrei varias opcoes excelentes e o atendimento superou minhas expectativas.",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="mx-3 w-[450px] shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{testimonial.name}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {testimonial.role} - {testimonial.company}
          </p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-600">"{testimonial.quote}"</p>
    </article>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="mx-auto mb-12 max-w-[1280px] px-4">
        <div className="text-center">
          <div className="mb-6 inline-block rounded-[29px] border border-[#e6e6e6] bg-white px-8 py-2 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.12)]">
            <p className="inline-flex items-center gap-2 text-[13.9px] font-medium tracking-[-0.084px] text-[#3d515c]">
              <svg className="h-4 w-4 text-[#00FFBF]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 17.4L8.8 16.3C4.4 12.3 1.5 9.7 1.5 6.5C1.5 3.9 3.5 2 6 2C7.4 2 8.8 2.7 9.7 3.8C10.6 2.7 12 2 13.4 2C15.9 2 17.9 3.9 17.9 6.5C17.9 9.7 15 12.3 10.6 16.3L10 17.4Z" />
              </svg>
              FEEDBACKS
            </p>
          </div>
          <h2 className="mb-4 text-[40.2px] font-normal tracking-[-1.6px] text-[#072130]">
            Uma comunidade de clientes satisfeitos
          </h2>
          <p className="text-[18px] font-normal tracking-[-0.176px] text-[#50636d]">
            Veja o que nossos clientes estao dizendo sobre a experiencia com a Ninho.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .carousel-row:hover .animate-scroll-left,
        .carousel-row:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="space-y-6">
        <div className="carousel-row relative">
          <div className="flex w-max animate-scroll-left">
            {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        <div className="carousel-row relative">
          <div className="flex w-max animate-scroll-right">
            {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
