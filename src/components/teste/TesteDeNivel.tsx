"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { ClayAction, ClayButton } from "@/components/ui/ClayButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { questoes } from "@/content/teste/questoes";
import { calcularNivel, leituraDoNivel } from "@/lib/nivel";
import { cn } from "@/lib/utils";
import { msgTesteNivel } from "@/lib/whatsapp";

type Etapa = "inicio" | "quiz" | "resultado";

export function TesteDeNivel() {
  const [etapa, setEtapa] = useState<Etapa>("inicio");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});

  const questao = questoes[indice];
  const respostaAtual = respostas[questao.id];
  const ehUltima = indice === questoes.length - 1;

  function responder(opcao: number) {
    setRespostas((r) => ({ ...r, [questao.id]: opcao }));
  }

  function avancar() {
    if (ehUltima) {
      setEtapa("resultado");
    } else {
      setIndice((i) => i + 1);
    }
  }

  function reiniciar() {
    setRespostas({});
    setIndice(0);
    setEtapa("inicio");
  }

  if (etapa === "inicio") {
    return <TelaInicial onComecar={() => setEtapa("quiz")} />;
  }

  if (etapa === "resultado") {
    return <TelaResultado respostas={respostas} onRefazer={reiniciar} />;
  }

  const progresso = ((indice + 1) / questoes.length) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="text-encre-soft mb-3 flex items-center justify-between text-sm font-semibold">
          <span>
            Questão {indice + 1} de {questoes.length}
          </span>
          <span className="clay rounded-full px-3 py-1 text-xs">
            Nível {questao.nivel}
          </span>
        </div>
        <div
          className="clay-inset h-3 overflow-hidden rounded-full"
          role="progressbar"
          aria-valuenow={indice + 1}
          aria-valuemin={1}
          aria-valuemax={questoes.length}
          aria-label="Progresso do teste"
        >
          <div
            className="bg-encre h-full rounded-full transition-[width] duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="clay p-8">
        <h2 className="font-display text-encre text-2xl leading-snug font-semibold text-balance">
          {questao.enunciado}
        </h2>
        {questao.ajuda && (
          <p className="text-encre-soft mt-2 text-sm">{questao.ajuda}</p>
        )}

        <fieldset className="mt-7">
          <legend className="sr-only">Escolha uma resposta</legend>
          <div className="flex flex-col gap-3">
            {questao.opcoes.map((opcao, i) => {
              const escolhida = respostaAtual === i;
              return (
                <label
                  key={opcao}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 px-5 py-4 text-left transition-colors",
                    escolhida
                      ? "clay clay-encre rounded-[20px]"
                      : "clay-inset hover:bg-clay-deep/40",
                  )}
                >
                  <input
                    type="radio"
                    name={`questao-${questao.id}`}
                    checked={escolhida}
                    onChange={() => responder(i)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                      escolhida
                        ? "bg-white/25 text-white"
                        : "bg-cream text-encre-soft",
                    )}
                    aria-hidden="true"
                  >
                    {escolhida ? (
                      <Check className="size-3.5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span className="font-medium">{opcao}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <ClayAction
          variante="secundaria"
          onClick={() => setIndice((i) => Math.max(0, i - 1))}
          disabled={indice === 0}
          className="disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar
        </ClayAction>

        <ClayAction
          onClick={avancar}
          disabled={respostaAtual === undefined}
          tamanho="lg"
          className="disabled:pointer-events-none disabled:opacity-40"
        >
          {ehUltima ? "Ver meu resultado" : "Próxima"}
          <ArrowRight className="size-5" aria-hidden="true" />
        </ClayAction>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TelaInicial({ onComecar }: { onComecar: () => void }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="clay clay-encre mx-auto flex size-20 items-center justify-center rounded-full">
        <Sparkles className="size-9" aria-hidden="true" />
      </span>

      <h1 className="font-display text-encre mt-8 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
        Qual é o seu nível de francês?
      </h1>
      <p className="text-encre-soft mt-5 text-lg leading-relaxed text-pretty">
        {questoes.length} questões de múltipla escolha, em dificuldade
        crescente, do A1 ao B2. Você recebe uma estimativa do seu nível no fim —
        sem cadastro, sem e-mail, sem pegadinha.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="clay text-encre-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <Timer className="size-4" aria-hidden="true" />
          Cerca de 5 minutos
        </span>
        <span className="clay text-encre-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <Check className="size-4" aria-hidden="true" />
          Resultado na hora
        </span>
      </div>

      <div className="mt-10">
        <ClayAction onClick={onComecar} tamanho="lg">
          Começar o teste
          <ArrowRight className="size-5" aria-hidden="true" />
        </ClayAction>
      </div>

      <p className="text-encre-soft mt-6 text-sm">
        O resultado é uma estimativa. A confirmação real acontece numa conversa
        de 15 minutos comigo.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TelaResultado({
  respostas,
  onRefazer,
}: {
  respostas: Record<number, number>;
  onRefazer: () => void;
}) {
  const resultado = calcularNivel(respostas);
  const leitura = leituraDoNivel[resultado.nivel];
  const cursoSlug = resultado.nivel.toLowerCase();

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-encre-soft text-sm font-semibold tracking-[0.18em] uppercase">
        Seu resultado
      </p>

      <span className="clay clay-or font-display mx-auto mt-5 flex size-32 items-center justify-center rounded-full text-5xl font-semibold">
        {resultado.nivel}
      </span>

      <h1 className="font-display text-encre mt-8 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
        {leitura.titulo}
      </h1>

      <p className="text-encre-soft mt-5 text-lg leading-relaxed text-pretty">
        {leitura.voceJa}
      </p>

      <div className="clay mt-8 p-7 text-left">
        <h2 className="font-display text-encre text-lg font-semibold">
          Por onde continuar
        </h2>
        <p className="text-encre-soft mt-2 leading-relaxed text-pretty">
          {leitura.proximoPasso}
        </p>
        <p className="text-encre-soft border-clay-deep mt-5 border-t pt-5 text-sm">
          Você acertou {resultado.totalAcertos} de {resultado.totalQuestoes}{" "}
          questões no total.
        </p>
      </div>

      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <WhatsAppButton
          mensagem={msgTesteNivel(resultado.nivel)}
          tamanho="lg"
        >
          Conversar sobre o meu nível
        </WhatsAppButton>
        <ClayButton
          href={`/cursos/${cursoSlug}`}
          variante="secundaria"
          tamanho="lg"
        >
          Ver o curso {resultado.nivel}
          <ArrowRight className="size-5" aria-hidden="true" />
        </ClayButton>
      </div>

      <div className="mt-8">
        <ClayAction variante="sutil" onClick={onRefazer}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Refazer o teste
        </ClayAction>
      </div>
    </div>
  );
}
