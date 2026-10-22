import { CalendarDays, Clock } from "lucide-react";
import { ClayCard } from "@/components/ui/ClayCard";
import { Pill } from "@/components/ui/Pill";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getCurso } from "@/content/cursos";
import { dataInicio, nomeTurma, type Turma } from "@/content/turmas";
import { msgTurma } from "@/lib/whatsapp";

export function CardTurma({ turma }: { turma: Turma }) {
  const curso = getCurso(turma.nivel);

  return (
    <ClayCard className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-bordeaux text-4xl leading-none font-semibold">
            {curso?.nivel ?? turma.nivel.toUpperCase()}
          </p>
          <p className="text-encre mt-2 font-semibold">{curso?.titulo}</p>
        </div>
        <Pill>{turma.formato === "grupo" ? "Em grupo" : "Individual"}</Pill>
      </div>

      <ul className="text-encre-soft mt-6 flex flex-col gap-2.5">
        <li className="flex items-center gap-2.5">
          <CalendarDays
            className="text-bordeaux size-4 shrink-0"
            aria-hidden="true"
          />
          Começa {dataInicio(turma, true)}
        </li>
        <li className="flex items-center gap-2.5">
          <Clock className="text-bordeaux size-4 shrink-0" aria-hidden="true" />
          {turma.diasHorario}
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

      <div className="mt-auto pt-7">
        <WhatsAppButton
          mensagem={msgTurma(nomeTurma(turma), dataInicio(turma))}
          className="w-full"
        >
          Quero uma vaga
        </WhatsAppButton>
      </div>
    </ClayCard>
  );
}
