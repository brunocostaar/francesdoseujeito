import { Quote } from "lucide-react";
import { Estrelas } from "@/components/ui/Estrelas";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { depoimentos } from "@/content/depoimentos";

/** Iniciais em vez de foto: evita avatar genérico de banco de imagem. */
function iniciais(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export function Depoimentos() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sobretitulo="Ils en parlent"
          titulo="Quem já passou por aqui"
          descricao="Alunos que começaram travados e hoje moram, estudam ou trabalham em francês."
        />

        {/*
          columns em vez de grid: as alturas variam muito entre os
          depoimentos, e o masonry evita as faixas de espaço vazio que
          um grid deixaria embaixo dos cards curtos.
        */}
        <div className="mt-14 gap-6 sm:columns-2 lg:columns-3">
          {depoimentos.map((d) => (
            <figure
              key={d.nome}
              className="clay clay-blanc mb-6 break-inside-avoid p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <Estrelas nota={d.nota} />
                <Quote
                  className="text-clay-deep size-6 shrink-0"
                  aria-hidden="true"
                />
              </div>

              <blockquote className="text-encre mt-4 leading-relaxed text-pretty">
                “{d.texto}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <span className="clay clay-encre font-display flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {iniciais(d.nome)}
                </span>
                <span className="min-w-0">
                  <span className="text-encre block text-sm font-semibold">
                    {d.nome}
                  </span>
                  <span className="text-encre-soft block text-xs">
                    {d.nivel}
                  </span>
                </span>
              </figcaption>

              {d.resultado && (
                <p className="mt-4">
                  <Pill tom="or">{d.resultado}</Pill>
                </p>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
