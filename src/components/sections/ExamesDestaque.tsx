import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { exames } from "@/content/exames";

export function ExamesDestaque() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          sobretitulo="Les examens"
          titulo="Preparação para DELF, DALF, TCF e TEF"
          descricao="Escolher o exame certo economiza meses. Entenda a diferença antes de pagar a taxa de inscrição."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {exames.map((exame) => (
            <Link
              key={exame.slug}
              href={`/exames/${exame.slug}`}
              className="clay clay-press group flex flex-col p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-encre text-2xl font-semibold">
                  {exame.titulo}
                </h3>
                <Pill tom={exame.cor === "encre" ? "encre" : "bordeaux"}>
                  <BadgeCheck className="size-4" aria-hidden="true" />
                  {exame.destaque}
                </Pill>
              </div>

              <p className="text-encre-soft mt-3 leading-relaxed text-pretty">
                {exame.subtitulo}
              </p>

              <dl className="border-clay-deep mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-encre-soft text-xs font-semibold tracking-wide uppercase">
                    Níveis
                  </dt>
                  <dd className="text-encre mt-1 text-sm font-semibold">
                    {exame.niveis}
                  </dd>
                </div>
                <div>
                  <dt className="text-encre-soft text-xs font-semibold tracking-wide uppercase">
                    Validade
                  </dt>
                  <dd className="text-encre mt-1 text-sm font-semibold">
                    {exame.validade}
                  </dd>
                </div>
              </dl>

              <span className="text-bordeaux mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                Ver tudo sobre o {exame.sigla}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
