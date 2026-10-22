import { ArrowLeft, ArrowRight, ListChecks } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuadroRevisao } from "@/components/atividades/QuadroRevisao";
import { QuizAtividade } from "@/components/atividades/QuizAtividade";
import { Pill } from "@/components/ui/Pill";
import {
  atividades,
  atividadesDoNivel,
  buscarAtividade,
  tituloAtividade,
} from "@/content/atividades";
import { site } from "@/content/site";

type Props = { params: Promise<{ nivel: string; slug: string }> };

export function generateStaticParams() {
  return atividades.map((a) => ({ nivel: a.nivel, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nivel, slug } = await params;
  const atividade = buscarAtividade(nivel, slug);
  if (!atividade) return {};

  const title = `${tituloAtividade(atividade)} — atividade de francês ${atividade.nivel.toUpperCase()}`;
  const description = `${atividade.descricao} ${atividade.questoes.length} questões com correção e explicação na hora.`;
  const path = `/atividades/${atividade.nivel}/${atividade.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${site.url}${path}`,
      title,
      description,
      locale: "pt_BR",
      siteName: site.nome,
    },
  };
}

export default async function AtividadePage({ params }: Props) {
  const { nivel, slug } = await params;
  const atividade = buscarAtividade(nivel, slug);
  if (!atividade) notFound();

  const doNivel = atividadesDoNivel(atividade.nivel);
  const indice = doNivel.findIndex((a) => a.slug === atividade.slug);
  const proxima = doNivel[indice + 1];
  const nivelRotulo = atividade.nivel.toUpperCase();

  return (
    <div className="px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/atividades#${atividade.nivel}`}
          className="text-encre-soft hover:text-bordeaux inline-flex items-center gap-2 text-sm font-semibold"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Atividades {nivelRotulo}
        </Link>

        <header className="mt-8">
          <p className="text-bordeaux text-sm font-semibold tracking-[0.18em] uppercase">
            Exercice · Niveau {nivelRotulo}
          </p>
          <h1 className="font-display text-encre mt-3 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            <span className="text-bordeaux">{atividade.destaque}</span>{" "}
            {atividade.resto}
          </h1>
          <p className="text-encre-soft mt-4 text-lg leading-relaxed text-pretty">
            {atividade.descricao}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Pill>
              <ListChecks className="size-4" aria-hidden="true" />
              {atividade.questoes.length} questões
            </Pill>
            {atividade.parte && <Pill>Parte {atividade.parte}</Pill>}
          </div>
        </header>

        <div className="mt-12">
          <QuadroRevisao atividade={atividade} />
        </div>

        <section aria-labelledby="quiz-titulo" className="mt-16">
          <h2
            id="quiz-titulo"
            className="font-display text-encre mb-8 text-3xl font-semibold"
          >
            Agora é com você
          </h2>
          <QuizAtividade atividade={atividade} />
        </section>

        {proxima && (
          <nav aria-label="Próxima atividade" className="mt-16">
            <Link
              href={`/atividades/${proxima.nivel}/${proxima.slug}`}
              className="clay clay-press flex items-center justify-between gap-4 p-6"
            >
              <span>
                <span className="text-encre-soft block text-xs font-semibold tracking-wide uppercase">
                  Próxima atividade
                </span>
                <span className="font-display text-encre mt-1 block text-xl font-semibold">
                  <span className="text-bordeaux">{proxima.destaque}</span>{" "}
                  {proxima.resto}
                </span>
              </span>
              <ArrowRight
                className="text-bordeaux size-5 shrink-0"
                aria-hidden="true"
              />
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
