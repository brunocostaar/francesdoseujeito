import type { Metadata } from "next";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { CardTurma } from "@/components/turmas/CardTurma";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { site } from "@/content/site";
import { turmasAbertas } from "@/content/turmas";
import { msgListaEspera } from "@/lib/whatsapp";

// Uma vez por dia: a turma que já começou sai da lista sem deploy.
export const revalidate = 86400;

const title = "Turmas abertas de francês online";
const description =
  "Turmas de francês com inscrição aberta: nível, data de início, horários e vagas. Garanta sua vaga pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/turmas" },
  openGraph: {
    type: "website",
    url: `${site.url}/turmas`,
    title,
    description,
    locale: "pt_BR",
    siteName: site.nome,
  },
};

export default function TurmasPage() {
  const abertas = turmasAbertas();

  return (
    <>
      <section className="px-4 pt-16 pb-4 sm:px-6 sm:pt-24">
        <SectionHeading
          nivel="h1"
          sobretitulo="Inscriptions ouvertes"
          titulo="Turmas abertas"
          descricao="As próximas turmas em grupo e os horários livres para aulas individuais. As vagas são poucas de propósito: grupo pequeno é o que deixa todo mundo falar."
        />
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {abertas.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {abertas.map((turma) => (
                <li key={turma.id}>
                  <CardTurma turma={turma} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="clay mx-auto max-w-2xl p-8 text-center sm:p-10">
              <h2 className="font-display text-encre text-2xl font-semibold">
                Nenhuma turma com inscrição aberta agora
              </h2>
              <p className="text-encre-soft mt-3 leading-relaxed text-pretty">
                As próximas turmas estão sendo montadas. Deixe seu nome na
                lista e você fica sabendo antes de a turma ser divulgada. As
                aulas individuais começam quando você quiser.
              </p>
              <div className="mt-7">
                <WhatsAppButton mensagem={msgListaEspera()} tamanho="lg">
                  Quero ser avisado(a)
                </WhatsAppButton>
              </div>
            </div>
          )}

          {abertas.length > 0 && (
            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="text-encre-soft text-pretty">
                Nenhum horário serve? As aulas individuais começam quando você
                quiser, e você pode entrar na lista da próxima turma.
              </p>
              <WhatsAppButton mensagem={msgListaEspera()} variante="secundaria">
                Me avise da próxima turma
              </WhatsAppButton>
            </div>
          )}
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
