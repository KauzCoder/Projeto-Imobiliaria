import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function meta() {
  return [
    { title: "Sobre nos | Morada Prime" },
    {
      name: "description",
      content:
        "Conheca a historia, a atuacao e o processo de atendimento da Morada Prime.",
    },
  ];
}

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="pt-24">
        <section className="position">
          <div>
            <img
              src="/images/about.svg"
              className="h-full w-full object-cover"
              alt="Sobre a Morada Prime"
            />
          </div>
        </section>

        <section className="bg-white py-16 flex ">
          <div className="flex flex-col">
            <p>
              A Ninho é uma empresa imobiliária dedicada a oferecer soluções
              habitacionais de qualidade. Nosso compromisso é proporcionar aos
              nossos clientes opções de moradia que aliam conforto, segurança e
              acessibilidade. Com projetos que priorizam a privacidade e a
              harmonia com a natureza, garantimos um ambiente agradável e limpo.
              Além disso, nossas comunidades contam com diversas comodidades,
              como áreas de lazer, campos esportivos, centros comerciais e
              instituições de ensino, tudo para facilitar a vida dos nossos
              moradores.
            </p>
            <img src="/images/enterprise.png" alt="Empresa Morada Prime" />
            <div className="flex gap-10">
              <div>
                <h2>+1000</h2>
                <p>Propriedades Disponíveis</p>
              </div>
              <div>
                <h2>+60K</h2>
                <p>Clientes Satisfeitos</p>
              </div>
              <div>
                <h2>+70K</h2>
                <p>Comentarios</p>
              </div>
            </div>
          </div>


          <div>
            <h1>Conheça mais sobre nós e nossa trajetória.</h1>
            <img src="/images/trajectory.png" alt="Trajetória da Morada Prime" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Processo
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Da busca ate a chave, com etapas claras.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {["Briefing", "Selecao", "Visita", "Negociacao"].map(
              (step, index) => (
                <div key={step} className="border-t border-slate-300 pt-5">
                  <span className="text-sm font-semibold text-emerald-700">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">
                    {step}
                  </h3>
                </div>
              ),
            )}
          </div>
        </section>

        <section className=" bg-gray-900 h-[611px]">
          <div>
            <h1></h1>
            <p></p>
          </div>
          <div>
            <ul>
              <li>
                <img src="" alt="" />
                <h2></h2>
                <p></p>
              </li>
              <li>
                <img src="" alt="" />
                <h2></h2>
                <p></p>
              </li>
              <li>
                <img src="" alt="" />
                <h2></h2>
                <p></p>
              </li>
              <li>
                <img src="" alt="" />
                <h2></h2>
                <p></p>
              </li>
            </ul>
          </div>
        </section>
      </main>''
      <Footer />
    </div>
  );
}
