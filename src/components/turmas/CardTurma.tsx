import { CalendarDays, Clock } from "lucide-react";
import { ClayCard } from "@/components/ui/ClayCard";
import { Pill } from "@/components/ui/Pill";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { dataInicio, nomeTurma, type Turma } from "@/content/turmas";
import { msgTurma, msgTurmaNivel, whatsappLink } from "@/lib/whatsapp";

export function CardTurma({ turma }: { turma: Turma }) {
  return (
    <ClayCard className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-encre-soft text-sm">
            Você está se inscrevendo no curso
          </p>
          <p className="font-display text-bordeaux mt-1 text-2xl leading-tight font-semibold uppercase sm:text-3xl">
            {nomeTurma(turma)}
          </p>
        </div>
        <Pill>{turma.formato === "grupo" ? "Em grupo" : "Individual"}</Pill>
      </div>

      <ul className="text-encre mt-6 flex flex-col gap-2.5 font-semibold tracking-wide uppercase">
        <li className="flex items-center gap-2.5">
          <Clock className="text-bordeaux size-4 shrink-0" aria-hidden="true" />
          {turma.diasHorario}
        </li>
        <li className="flex items-center gap-2.5">
          <CalendarDays
            className="text-bordeaux size-4 shrink-0"
            aria-hidden="true"
          />
          Início: {dataInicio(turma, false, true)}
        </li>
      </ul>

      {(turma.vagas !== undefined || turma.preco) && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {turma.vagas !== undefined && (
            <Pill tom="or">
              {turma.vagas === 1 ? "Última vaga" : `${turma.vagas} vagas`}
            </Pill>
          )}
          {turma.preco && (
            <span className="text-encre font-semibold">{turma.preco}</span>
          )}
        </div>
      )}

      {turma.observacao && (
        <p className="text-encre-soft mt-4 text-sm text-pretty">
          {turma.observacao}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
        <WhatsAppButton mensagem={msgTurma(turma)}>Quero uma vaga</WhatsAppButton>
        <p className="text-encre-soft max-w-56 text-sm leading-snug text-pretty">
          Não tem certeza se esse é o seu nível?{" "}
          <a
            href={whatsappLink(msgTurmaNivel(turma))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bordeaux font-semibold underline underline-offset-4"
          >
            Marque uma conversa gratuita!
          </a>
        </p>
      </div>
    </ClayCard>
  );
}
