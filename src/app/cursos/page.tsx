import type { Metadata } from "next";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { CursosGrid } from "@/components/sections/CursosGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cursos } from "@/content/cursos";

export const metadata: Metadata = {
  title: "Cursos de francês do A1 ao C2",
  description:
    "Seis níveis de francês online com aulas individuais ao vivo. Compare os níveis do QECR, veja duração, conteúdo e preço de cada curso.",
};

export default function CursosPage() {
  return (
    <>
      <section className="px-4 pt-16 pb-4 sm:px-6 sm:pt-24">
        <SectionHeading
          nivel="h1"
          sobretitulo="Nos cours"
          titulo="Escolha o nível onde você está hoje"
          descricao="Os seis níveis seguem o QECR, a mesma escala usada pelo DELF, DALF, TCF e TEF. Se estiver em dúvida, o teste de nível resolve em cinco minutos."
        />
      </section>

      <CursosGrid comCabecalho={false} />

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            titulo="Comparando os níveis"
            descricao="O que cada nível significa na prática, e quando ele costuma ser exigido."
          />

          <div className="clay mt-12 overflow-x-auto p-2">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Comparação entre os seis níveis do QECR
              </caption>
              <thead>
                <tr className="text-encre-soft text-xs font-semibold tracking-wide uppercase">
                  <th scope="col" className="px-5 py-4">
                    Nível
                  </th>
                  <th scope="col" className="px-5 py-4">
                    O que você consegue fazer
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Duração
                  </th>
                  <th scope="col" className="px-5 py-4">
                    Investimento
                  </th>
                </tr>
              </thead>
              <tbody>
                {cursos.map((curso) => (
                  <tr
                    key={curso.slug}
                    className="border-clay-deep border-t align-top"
                  >
                    <th scope="row" className="px-5 py-5">
                      <span className="font-display text-bordeaux block text-xl font-semibold">
                        {curso.nivel}
                      </span>
                      <span className="text-encre-soft text-xs font-medium">
                        {curso.titulo}
                      </span>
                    </th>
                    <td className="text-encre-soft px-5 py-5 text-sm leading-relaxed text-pretty">
                      {curso.voceVaiConseguir[0]}
                    </td>
                    <td className="text-encre-soft px-5 py-5 text-sm whitespace-nowrap">
                      {curso.duracao}
                    </td>
                    <td className="text-encre px-5 py-5 text-sm whitespace-nowrap">
                      {curso.slug === "c2" ? (
                        <span className="font-semibold text-encre-soft">sob consulta</span>
                      ) : (
                        <div className="flex flex-col gap-1 text-xs">
                          <div>
                            <span className="text-encre-soft font-normal">Grupo: </span>
                            <span className="font-bold text-encre">{curso.precoGrupo}</span>
                          </div>
                          <div>
                            <span className="text-encre-soft font-normal">Indiv.: </span>
                            <span className="font-bold text-encre">{curso.precoIndividual}</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
