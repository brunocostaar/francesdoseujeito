import { ClipboardCheck, MessageCircle, Video } from "lucide-react";
import { ClayCard } from "@/components/ui/ClayCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const passos = [
  {
    icone: ClipboardCheck,
    numero: "01",
    titulo: "Descubra seu nível",
    texto:
      "Cinco minutos de teste no site e você já sai com uma estimativa de A1 a C2 — sem cadastro, sem e-mail.",
  },
  {
    icone: MessageCircle,
    numero: "02",
    titulo: "Converse comigo",
    texto:
      "Uma conversa gratuita de 30 minutos no WhatsApp ou por vídeo para eu entender seu objetivo e confirmar o nível.",
  },
  {
    icone: Video,
    numero: "03",
    titulo: "Comece as aulas",
    texto:
      "Uma aula ao vivo por semana, no horário que couber na sua rotina, com material e cronograma de autonomia.",
  },
];

export function ComoFunciona() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sobretitulo="Comment ça marche"
          titulo="Três passos até a primeira aula"
          descricao="Sem matrícula e sem turma cheia."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {passos.map((passo) => (
            <ClayCard key={passo.numero} className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="clay clay-encre flex size-12 items-center justify-center rounded-full">
                  <passo.icone className="size-6" aria-hidden="true" />
                </span>
                <span className="font-display text-clay-deep text-3xl font-semibold">
                  {passo.numero}
                </span>
              </div>
              <h3 className="font-display text-encre mt-6 text-xl font-semibold">
                {passo.titulo}
              </h3>
              <p className="text-encre-soft mt-2 leading-relaxed text-pretty">
                {passo.texto}
              </p>
            </ClayCard>
          ))}
        </div>
      </div>
    </section>
  );
}
