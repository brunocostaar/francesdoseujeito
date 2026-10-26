import { ArrowRight, CalendarDays } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { dataInicio, nomeTurma, turmasAbertas } from "@/content/turmas";
import { msgTurma } from "@/lib/whatsapp";

/**
 * Faixa de turmas abertas na home, logo depois do hero. Sem turma aberta
 * ela não existe — nada de "nenhuma turma no momento" na vitrine.
 * Com uma turma, vende aquela turma; com várias, leva para /turmas.
 */
export function TurmasAbertas() {
  const abertas = turmasAbertas();
  if (abertas.length === 0) return null;

  const [proxima] = abertas;
  const varias = abertas.length > 1;

  return (
    <section aria-labelledby="turmas-abertas" className="px-4 sm:px-6">
      <div className="clay clay-encre mx-auto flex max-w-6xl flex-col gap-6 px-7 py-7 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="bg-or text-encre flex size-12 shrink-0 items-center justify-center rounded-full">
            <CalendarDays className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-or text-xs font-semibold tracking-[0.18em] uppercase">
              Inscrições abertas
            </p>
            <h2
              id="turmas-abertas"
              className="font-display mt-1 text-2xl leading-snug font-semibold text-balance"
            >
              {varias ? (
                `${abertas.length} turmas começando — a próxima em ${dataInicio(proxima)}`
              ) : (
                <>
                  <span className="block">Turma {nomeTurma(proxima)}</span>
                  <span className="bg-bordeaux mt-2 inline-block rounded-full px-4 py-1.5 font-sans text-sm font-bold text-white">
                    Começa em {dataInicio(proxima)}
                  </span>
                </>
              )}
            </h2>
            <p className="mt-1 text-white/80">
              {proxima.diasHorario}
              {!varias && proxima.vagas !== undefined && (
                <>
                  {" · "}
                  {proxima.vagas === 1
                    ? "última vaga"
                    : `${proxima.vagas} vagas`}
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          {varias ? (
            <ClayButton href="/turmas" variante="secundaria">
              Ver as turmas
              <ArrowRight className="size-5" aria-hidden="true" />
            </ClayButton>
          ) : (
            <>
              <WhatsAppButton
                mensagem={msgTurma(proxima)}
              >
                Quero uma vaga
              </WhatsAppButton>
              <ClayButton
                href="/turmas"
                variante="sutil"
                className="text-white/80 hover:text-white"
              >
                Detalhes
              </ClayButton>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
