import type { Atividade, BlocoQuadro } from "@/content/atividades";
import { cn } from "@/lib/utils";
import { TextoRico } from "./TextoRico";

/**
 * O quadro que o aluno revisa antes de responder. Uma superfície clay só,
 * com os blocos afundados (clay-inset) dentro — clay sobre clay achataria
 * a hierarquia.
 */
export function QuadroRevisao({ atividade }: { atividade: Atividade }) {
  const { quadro, exemplos } = atividade;
  const soEscala = quadro.blocos.every((b) => b.tipo === "escala");

  return (
    <section aria-labelledby="quadro-titulo" className="clay p-6 sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2
          id="quadro-titulo"
          className="font-display text-encre text-2xl font-semibold sm:text-3xl"
        >
          {quadro.titulo}
        </h2>
        <p className="text-encre-soft text-sm">{quadro.subtitulo}</p>
      </div>

      <div
        className={cn(
          "mt-7 grid gap-4",
          !soEscala && quadro.blocos.length > 1 && "sm:grid-cols-2",
        )}
      >
        {quadro.blocos.map((bloco, i) => (
          <Bloco key={i} bloco={bloco} />
        ))}
      </div>

      <TextoRico
        as="p"
        html={quadro.dica}
        className="border-or text-encre-soft mt-7 block border-l-4 pl-4 leading-relaxed text-pretty"
      />

      <div className="border-clay-deep mt-7 border-t pt-6">
        <p className="text-encre-soft text-xs font-semibold tracking-[0.18em] uppercase">
          {exemplos.rotulo}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {exemplos.itens.map((item) => (
            <li
              key={item}
              className="bg-cream text-encre rounded-full px-3.5 py-1.5 text-sm"
              lang="fr"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Bloco({ bloco }: { bloco: BlocoQuadro }) {
  if (bloco.tipo === "escala") return <Escala marcas={bloco.marcas} />;

  return (
    <div className="clay-inset p-5">
      <h3 className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-bordeaux text-xl font-semibold">
          {bloco.titulo}
        </span>
        <span className="text-encre-soft text-xs">{bloco.subtitulo}</span>
      </h3>
      <table className="mt-3 w-full text-sm">
        <tbody>
          {bloco.linhas.map(([pt, fr], i) => (
            <tr key={i} className="border-clay-deep/70 border-t first:border-t-0">
              <td className="text-encre-soft py-2 pr-3 align-top">{pt}</td>
              <td
                className="text-encre py-2 text-right align-top font-semibold"
                lang="fr"
              >
                {fr}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Régua de frequência. No celular seis rótulos não cabem lado a lado,
 * então ela vira lista vertical — a ordem continua sendo a informação.
 */
function Escala({
  marcas,
}: {
  marcas: Extract<BlocoQuadro, { tipo: "escala" }>["marcas"];
}) {
  return (
    <div className="clay-inset px-5 py-6 sm:px-10 sm:pt-8 sm:pb-16">
      <ol className="flex flex-col gap-2 sm:sr-only">
        {marcas.map((m) => (
          <li key={m.rotulo} className="flex items-center gap-3">
            <span className="bg-clay-deep h-2 flex-1 rounded-full">
              <span
                className="bg-encre block h-full rounded-full"
                style={{ width: `${Math.max(m.pos, 4)}%` }}
              />
            </span>
            <span className="w-24 font-semibold" lang="fr">
              {m.rotulo}
            </span>
            <span className="text-encre-soft w-10 text-right text-xs">
              {m.valor}
            </span>
          </li>
        ))}
      </ol>

      <div className="relative hidden sm:block" aria-hidden="true">
        <div className="from-clay-deep to-encre h-3 rounded-full bg-gradient-to-r" />
        {marcas.map((m, i) => (
          <div
            key={m.rotulo}
            className={cn(
              "absolute top-0 flex flex-col items-center pt-5",
              i === 0
                ? "items-start"
                : i === marcas.length - 1
                  ? "-translate-x-full items-end"
                  : "-translate-x-1/2",
            )}
            style={{ left: `${m.pos}%` }}
          >
            <span className="font-display text-encre text-lg font-semibold whitespace-nowrap">
              {m.rotulo}
            </span>
            <span className="text-encre-soft text-xs">{m.valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
