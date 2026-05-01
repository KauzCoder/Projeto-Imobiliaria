import { useState } from "react";
import { Link } from "react-router";

const faqs = [
  {
    question: "Por que devo usar um sistema de aluguel de imoveis?",
    answer:
      "Um sistema de aluguel e uma ferramenta essencial para proprietarios, pois garante organizacao na gestao dos imoveis e agiliza o processo de locacao. Voce pode usar modelos de contratos e anuncios repetidamente, sendo util tanto para iniciantes quanto para locadores experientes.",
  },
  {
    question: "Ha uma demonstracao ou teste gratuito disponivel?",
    answer:
      "Sim! Oferecemos um periodo de teste gratuito de 30 dias para voce conhecer todas as funcionalidades da plataforma Ninho. Durante este periodo, voce tera acesso completo a todos os recursos sem nenhum compromisso.",
  },
  {
    question: "Onde posso adquirir o sistema de aluguel Ninho?",
    answer:
      "Voce pode adquirir nosso sistema diretamente em nosso site oficial. Oferecemos diferentes planos para atender desde proprietarios individuais ate grandes imobiliarias.",
  },
  {
    question: "Quais sao as atualizacoes e melhorias mais recentes do Ninho?",
    answer:
      "Recentemente implementamos busca com mapa interativo, sistema de filtros avancados, integracao com WhatsApp para agendamento de visitas e melhorias na interface mobile.",
  },
  {
    question: "Como instalo o sistema de aluguel Ninho no meu site?",
    answer:
      "A instalacao e simples e rapida. Apos contratar um plano, voce recebe um codigo de integracao que pode ser adicionado ao seu site. Nossa equipe de suporte pode ajudar na configuracao.",
  },
  {
    question: "Posso usar o sistema de aluguel Ninho em projetos comerciais?",
    answer:
      "Sim. Nossos planos profissionais e empresariais foram pensados para uso comercial, permitindo gerenciar multiplos imoveis, equipes e personalizacao com a sua marca.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  function toggleFAQ(index) {
    setOpenIndex(openIndex === index ? -1 : index);
  }

  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-[1280px] px-4 py-20">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-block rounded-[29px] border border-[#e6e6e6] bg-white px-8 py-2 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.12)]">
              <p className="inline-flex items-center gap-2 text-[13.9px] font-medium tracking-[-0.084px] text-[#3d515c]">
                <svg className="h-4 w-4 text-[#00FFBF]" fill="none" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M8.2 7.8C8.4 6.6 9.2 6 10.3 6C11.5 6 12.3 6.7 12.3 7.8C12.3 9.5 10.1 9.5 10.1 11.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                  <path d="M10.1 14H10.2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
                </svg>
                FAQS
              </p>
            </div>
            <h2 className="mb-4 text-[40.2px] font-normal tracking-[-1.6px] text-[#072130]">
              Perguntas Frequentes
            </h2>
            <p className="text-[18px] font-normal tracking-[-0.176px] text-[#50636d]">
              Explore perguntas e respostas sobre nosso sistema de aluguel.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={faq.question}
                  className={`overflow-hidden rounded-[14px] transition-all duration-300 ${
                    isOpen
                      ? "bg-[#383838] shadow-lg"
                      : "bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-[rgba(171,171,171,0.15)] hover:from-[rgba(255,255,255,0.08)] hover:to-[rgba(171,171,171,0.25)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 text-left transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p
                        className={`text-[16px] font-medium tracking-[-0.176px] transition-colors ${
                          isOpen ? "text-white" : "text-[#6e6e6e]"
                        }`}
                      >
                        {faq.question}
                      </p>
                      <div className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
                          <path
                            d="M3 10h14M10 3v14"
                            stroke={isOpen ? "#00FFBF" : "#8F8F8F"}
                            strokeLinecap="round"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5">
                      <div className="border-t border-white/10 pt-2">
                        <p className="mt-3 text-[16px] font-normal leading-[26px] tracking-[-0.176px] text-[#d1d1d1]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-[16px] text-[#50636d]">Ainda tem duvidas?</p>
            <Link
              to="/contato"
              className="inline-block rounded-[50px] bg-[#00FFBF] px-8 py-3 text-[16px] font-semibold text-slate-950 transition-colors hover:bg-[#00d9a8]"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
