import { ArrowRight, Check, Clock, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClayButton } from "@/components/ui/ClayButton";
import { ClayCard } from "@/components/ui/ClayCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cursos, getCurso } from "@/content/cursos";
import { msgCurso } from "@/lib/whatsapp";

type Props = { params: Promise<{ nivel: string }> };

export function generateStaticParams() {
  return cursos.map((curso) => ({ nivel: curso.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nivel } = await params;
  const curso = getCurso(nivel);
  if (!curso) return {};

  return {
    title: `Curso de francês ${curso.nivel} — ${curso.titulo}`,
    description: `${curso.subtitulo}. ${curso.cargaHoraria}, duração de ${curso.duracao}. Aulas individuais online.`,
  };
}

export default async function CursoPage({ params }: Props) {
  const { nivel } = await params;
  const curso = getCurso(nivel);
  if (!curso) notFound();

  const indice = cursos.findIndex((c) => c.slug === curso.slug);
  const anterior = cursos[indice - 1];
  const proximo = cursos[indice + 1];

  const acento =
    curso.cor === "encre"
      ? "clay-encre"
      : curso.cor === "bordeaux"
        ? "clay-bordeaux"
        : "clay-or";

  return (
    <>
      <section className="px-4 pt-16 pb-8 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className={`clay ${acento} font-display mx-auto flex size-24 items-center justify-center rounded-full text-4xl font-semibold`}
          >
            {curso.nivel}
          </span>

          <h1 className="font-display text-encre mt-8 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            {curso.titulo}
          </h1>
          <p className="text-encre-soft mt-4 text-xl text-pretty">
            {curso.subtitulo}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <WhatsAppButton
              mensagem={msgCurso(curso.nivel, curso.titulo)}
              tamanho="lg"
            >
              Quero começar o {curso.nivel}
            </WhatsAppButton>
            <ClayButton
              href="/teste-de-nivel"
              variante="secundaria"
              tamanho="lg"
            >
              Confirmar meu nível
            </ClayButton>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          <ClayCard className="text-center">
            <Clock
              className="text-bordeaux mx-auto size-6"
              aria-hidden="true"
            />
            <p className="text-encre-soft mt-3 text-xs font-semibold tracking-wide uppercase">
              Duração média
            </p>
            <p className="font-display text-encre mt-1 text-lg font-semibold">
              {curso.duracao}
            </p>
          </ClayCard>
          <ClayCard className="text-center">
            <Users
              className="text-bordeaux mx-auto size-6"
              aria-hidden="true"
            />
            <p className="text-encre-soft mt-3 text-xs font-semibold tracking-wide uppercase">
              Ritmo
            </p>
            <p className="font-display text-encre mt-1 text-lg font-semibold text-balance">
              {curso.cargaHoraria}
            </p>
          </ClayCard>
          <ClayCard className="text-center">
            <span
              className="font-display text-bordeaux block text-2xl leading-6 font-semibold"
              aria-hidden="true"
            >
              R$
            </span>
            <p className="text-encre-soft mt-3 text-xs font-semibold tracking-wide uppercase">
              Investimento
            </p>
            {curso.slug === "c2" ? (
              <p className="font-display text-encre mt-1 text-lg font-semibold">
                sob consulta
              </p>
            ) : (
              <div className="mt-2 flex flex-col gap-1">
                <p className="font-display text-encre text-sm font-semibold">
                  Grupo: <span className="text-bordeaux font-bold">{curso.precoGrupo}</span>
                </p>
                <p className="font-display text-encre text-sm font-semibold">
                  Individual: <span className="text-bordeaux font-bold">{curso.precoIndividual}</span>
                </p>
              </div>
            )}
            <p className="text-encre-soft mt-2 text-xs text-pretty">
              {curso.precoDetalhe}
            </p>
          </ClayCard>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-encre text-2xl font-semibold">
              Para quem é este nível
            </h2>
            <p className="text-encre-soft mt-4 text-lg leading-relaxed text-pretty">
              {curso.publico}
            </p>

            <h2 className="font-display text-encre mt-10 text-2xl font-semibold">
              O que a gente estuda
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {curso.conteudo.map((item) => (
                <li key={item} className="text-encre-soft flex gap-3">
                  <span
                    className="bg-clay-deep mt-2.5 size-1.5 shrink-0 rounded-full"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <ClayCard className="h-fit">
            <h2 className="font-display text-encre text-2xl font-semibold">
              Ao terminar, você vai conseguir
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {curso.voceVaiConseguir.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="clay clay-or mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-encre leading-relaxed text-pretty">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <WhatsAppButton mensagem={msgCurso(curso.nivel, curso.titulo)}>
                Falar sobre o {curso.nivel}
              </WhatsAppButton>
            </div>
          </ClayCard>
        </div>
      </section>

      {/* Navegação entre níveis vizinhos: quem errou o nível corrige aqui. */}
      <section className="px-4 py-16 sm:px-6">
        <nav
          aria-label="Outros níveis"
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4"
        >
          {anterior ? (
            <Link
              href={`/cursos/${anterior.slug}`}
              className="clay clay-press text-encre inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              <ArrowRight className="size-4 rotate-180" aria-hidden="true" />
              {anterior.nivel} — {anterior.titulo}
            </Link>
          ) : (
            <span />
          )}

          <Link
            href="/cursos"
            className="text-encre-soft hover:text-bordeaux text-sm font-semibold underline underline-offset-4"
          >
            Ver todos os níveis
          </Link>

          {proximo ? (
            <Link
              href={`/cursos/${proximo.slug}`}
              className="clay clay-press text-encre inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              {proximo.nivel} — {proximo.titulo}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </>
  );
}
