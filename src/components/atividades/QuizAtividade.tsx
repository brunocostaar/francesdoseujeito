"use client";

import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { useRef, useState } from "react";
import { ClayAction } from "@/components/ui/ClayButton";
import type { Atividade } from "@/content/atividades";
import { cn } from "@/lib/utils";
import { EnviarParaProfessora } from "./EnviarParaProfessora";
import { TextoRico } from "./TextoRico";

const ELOGIOS = ["Très bien !", "Parfait !", "Bravo !", "Exactement !"];
const QUASE = ["Presque !", "Pas tout à fait…", "Quase lá!"];

/**
 * Diferente do teste de nível, aqui a correção é imediata: a atividade é
 * para aprender, então cada resposta já vem com a explicação.
 */
export function QuizAtividade({ atividade }: { atividade: Atividade }) {
  const { questoes } = atividade;
  const [indice, setIndice] = useState(0);
  /** Opção escolhida em cada questão, na ordem. */
  const [escolhas, setEscolhas] = useState<number[]>([]);
  const [terminou, setTerminou] = useState(false);
  const topoRef = useRef<HTMLDivElement>(null);

  const questao = questoes[indice];
  const escolhida = escolhas[indice];
  const respondida = escolhida !== undefined;
  const acertou = escolhida === questao.correta;
  const acertos = escolhas.filter((e, i) => e === questoes[i].correta).length;
  const ehUltima = indice === questoes.length - 1;
  // Vai alternando pela posição da questão, para não repetir sempre o mesmo.
  const reacoes = acertou ? ELOGIOS : QUASE;
  const reacao = reacoes[indice % reacoes.length];

  function responder(opcao: number) {
    if (respondida) return;
    setEscolhas((e) => [...e, opcao]);
  }

  function avancar() {
    if (ehUltima) setTerminou(true);
    else setIndice((i) => i + 1);
    topoRef.current?.scrollIntoView({ block: "start" });
  }

  function recomecar() {
    setEscolhas([]);
    setIndice(0);
    setTerminou(false);
    topoRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <div ref={topoRef} className="scroll-mt-28">
      {terminou ? (
        <Resultado
          atividade={atividade}
          escolhas={escolhas}
          acertos={acertos}
          onRecomecar={recomecar}
        />
      ) : (
        <div>
          <div className="text-encre-soft mb-3 flex items-center justify-between text-sm font-semibold">
            <span>
              Questão {indice + 1} de {questoes.length}
            </span>
            <span className="clay rounded-full px-3 py-1 text-xs">
              {acertos} {acertos === 1 ? "acerto" : "acertos"}
            </span>
          </div>
          <ol className="mb-8 flex gap-1.5" aria-hidden="true">
            {questoes.map((q, i) => (
              <li
                key={i}
                className={cn(
                  "h-2.5 flex-1 rounded-full",
                  i < escolhas.length
                    ? escolhas[i] === q.correta
                      ? "bg-encre"
                      : "bg-bordeaux"
                    : i === indice
                      ? "bg-or"
                      : "bg-clay-deep/60",
                )}
              />
            ))}
          </ol>

          <div className="clay p-6 sm:p-8">
            <span className="text-bordeaux text-xs font-semibold tracking-[0.18em] uppercase">
              {questao.tipo}
            </span>
            <TextoRico
              as="h3"
              html={questao.enunciado}
              className="font-display text-encre mt-2 block text-2xl leading-snug font-semibold text-balance"
            />

            <div
              className="mt-7 flex flex-col gap-3"
              role="group"
              aria-label="Opções de resposta"
            >
              {questao.opcoes.map((opcao, i) => {
                const ehCorreta = i === questao.correta;
                const ehEscolhida = i === escolhida;
                return (
                  <button
                    key={`${indice}-${i}`}
                    type="button"
                    onClick={() => responder(i)}
                    disabled={respondida}
                    aria-pressed={ehEscolhida}
                    className={cn(
                      "flex items-center gap-3 px-5 py-4 text-left transition-[opacity,background-color]",
                      !respondida &&
                        "clay-inset hover:bg-clay-deep/40 cursor-pointer",
                      respondida &&
                        ehCorreta &&
                        "clay clay-encre rounded-[20px]",
                      respondida &&
                        ehEscolhida &&
                        !ehCorreta &&
                        "clay clay-bordeaux rounded-[20px]",
                      respondida &&
                        !ehCorreta &&
                        !ehEscolhida &&
                        "clay-inset opacity-45",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        respondida && (ehCorreta || ehEscolhida)
                          ? "bg-white/25 text-white"
                          : "bg-cream text-encre-soft",
                      )}
                      aria-hidden="true"
                    >
                      {respondida && ehCorreta ? (
                        <Check className="size-3.5" />
                      ) : respondida && ehEscolhida ? (
                        <X className="size-3.5" />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    <TextoRico
                      html={opcao}
                      className="font-medium"
                    />
                  </button>
                );
              })}
            </div>

            <div aria-live="polite">
              {respondida && (
                <div
                  className={cn(
                    "bg-cream mt-6 rounded-[20px] border-l-4 px-5 py-4",
                    acertou ? "border-or" : "border-bordeaux",
                  )}
                >
                  <p
                    className={cn(
                      "font-display text-lg font-semibold",
                      acertou ? "text-encre" : "text-bordeaux",
                    )}
                  >
                    {reacao}
                  </p>
                  <TextoRico
                    as="p"
                    html={questao.explicacao}
                    className="text-encre-soft mt-1 block leading-relaxed text-pretty"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <ClayAction
              onClick={avancar}
              disabled={!respondida}
              tamanho="lg"
              className="disabled:pointer-events-none disabled:opacity-40"
            >
              {ehUltima ? "Ver meu resultado" : "Próxima"}
              <ArrowRight className="size-5" aria-hidden="true" />
            </ClayAction>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function leitura(acertos: number, total: number): [string, string] {
  const pct = acertos / total;
  if (pct === 1) return ["Parfait !", "Você acertou tudo. Excelente trabalho!"];
  if (pct >= 0.7)
    return [
      "Très bien !",
      "Ótimo resultado. Revise as questões abaixo e tente de novo.",
    ];
  if (pct >= 0.4)
    return [
      "Pas mal !",
      "Bom começo. Volte ao quadro de revisão e refaça as questões abaixo.",
    ];
  return [
    "Courage !",
    "Revise o quadro com calma e tente de novo. Vai melhorar!",
  ];
}

function Resultado({
  atividade,
  escolhas,
  acertos,
  onRecomecar,
}: {
  atividade: Atividade;
  escolhas: number[];
  acertos: number;
  onRecomecar: () => void;
}) {
  const { questoes } = atividade;
  const [titulo, mensagem] = leitura(acertos, questoes.length);
  const erradas = questoes
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => escolhas[i] !== q.correta);

  return (
    <div>
      <div className="text-center">
        <span className="clay clay-or font-display mx-auto flex size-32 items-center justify-center rounded-full text-5xl font-semibold">
          {acertos}/{questoes.length}
        </span>
        <h3 className="font-display text-encre mt-7 text-3xl font-semibold">
          {titulo}
        </h3>
        <p className="text-encre-soft mt-3 text-lg text-pretty">{mensagem}</p>
      </div>

      {erradas.length > 0 && (
        <div className="clay mt-10 p-6 sm:p-8">
          <h3 className="font-display text-encre text-xl font-semibold">
            Para revisar
          </h3>
          <ul className="mt-5 flex flex-col gap-5">
            {erradas.map(({ q, i }) => (
              <li
                key={i}
                className="border-clay-deep border-t pt-5 first:border-t-0 first:pt-0"
              >
                <p className="text-encre-soft text-xs font-semibold tracking-wide uppercase">
                  Questão {i + 1} · {q.tipo}
                </p>
                <TextoRico
                  as="p"
                  html={q.enunciado}
                  className="text-encre mt-1 block font-medium"
                />
                <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  <span className="text-bordeaux inline-flex items-center gap-1.5">
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Sua resposta:</span>
                    <TextoRico html={q.opcoes[escolhas[i]]} />
                  </span>
                  <span className="text-encre inline-flex items-center gap-1.5 font-semibold">
                    <Check className="size-4" aria-hidden="true" />
                    <span className="sr-only">Resposta certa:</span>
                    <TextoRico html={q.opcoes[q.correta]} />
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <EnviarParaProfessora
        atividade={atividade}
        escolhas={escolhas}
        acertos={acertos}
      />

      <div className="mt-8 text-center">
        <ClayAction variante="sutil" onClick={onRecomecar}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Refazer a atividade
        </ClayAction>
      </div>
    </div>
  );
}
