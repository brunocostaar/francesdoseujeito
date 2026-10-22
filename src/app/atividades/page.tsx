import { ArrowRight, ListChecks } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  atividadesDoNivel,
  type Atividade,
} from "@/content/atividades";
import { cursos } from "@/content/cursos";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { msgGeral } from "@/lib/whatsapp";

const title = "Atividades online de francês — exercícios com correção";
const description =
  "Exercícios de francês com correção na hora: revise o quadro de cada tema, responda às questões e mande o resultado para a professora.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/atividades" },
  openGraph: {
    type: "website",
    url: `${site.url}/atividades`,
    title,
    description,
    locale: "pt_BR",
    siteName: site.nome,
  },
};

/*
  Os níveis saem de cursos.ts, então o hub já nasce com os seis. Nível com
  atividade ganha seção própria; os que ainda não têm ficam juntos num
  bloco "em breve" — cinco seções vazias empilhadas pareceriam abandono.
*/
const niveis = cursos.map((curso) => ({
  curso,
  atividades: atividadesDoNivel(curso.slug),
}));
const comAtividade = niveis.filter((n) => n.atividades.length > 0);
const emBreve = niveis.filter((n) => n.atividades.length === 0);

export default function AtividadesPage() {
  return (
    <>
      <section className="px-4 pt-16 pb-4 sm:px-6 sm:pt-24">
        <SectionHeading
          nivel="h1"
          sobretitulo="Exercices en ligne"
          titulo="Atividades online"
          descricao="Escolha um tema, revise o quadro e responda às questões. Cada resposta vem com uma explicação, e no fim você manda o resultado para a professora."
        />

        <nav
          aria-label="Níveis"
          className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3"
        >
          {niveis.map(({ curso, atividades }) =>
            atividades.length > 0 ? (
              <a
                key={curso.slug}
                href={`#${curso.slug}`}
                className="clay clay-encre clay-press inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                <span className="font-display text-base">{curso.nivel}</span>
                <span className="opacity-75">{atividades.length}</span>
              </a>
            ) : (
              <span
                key={curso.slug}
                className="clay-inset text-encre-soft inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                <span className="font-display text-base">{curso.nivel}</span>
                <span className="text-xs">em breve</span>
              </span>
            ),
          )}
        </nav>
      </section>

      {comAtividade.map(({ curso, atividades }) => (
        <section
          key={curso.slug}
          id={curso.slug}
          aria-labelledby={`titulo-${curso.slug}`}
          className="scroll-mt-28 px-4 py-14 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2
                id={`titulo-${curso.slug}`}
                className="font-display text-encre text-3xl font-semibold"
              >
                <span className="text-bordeaux">{curso.nivel}</span> —{" "}
                {curso.titulo}
              </h2>
              <p className="text-encre-soft">
                {atividades.length} atividades
              </p>
            </div>

            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {atividades.map((atividade, i) => (
                <li key={atividade.slug} className="flex">
                  <CardAtividade atividade={atividade} numero={i + 1} />
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {emBreve.length > 0 && (
        <section
          aria-labelledby="titulo-em-breve"
          className="px-4 py-14 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="titulo-em-breve"
              className="font-display text-encre text-3xl font-semibold"
            >
              Em breve
            </h2>
            <p className="text-encre-soft mt-2 max-w-2xl text-pretty">
              As atividades dos próximos níveis estão sendo preparadas. Enquanto
              isso, as aulas desses níveis já acontecem.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {emBreve.map(({ curso }) => (
                <li
                  key={curso.slug}
                  className="clay-inset flex flex-col items-start gap-3 p-5"
                >
                  <span className="font-display text-encre-soft text-3xl font-semibold">
                    {curso.nivel}
                  </span>
                  <span className="text-encre-soft text-sm">
                    {curso.titulo}
                  </span>
                  <Link
                    href={`/cursos/${curso.slug}`}
                    className="text-encre hover:text-bordeaux mt-auto text-sm font-semibold underline underline-offset-4"
                  >
                    Ver o curso
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="px-4 pt-6 pb-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <p className="text-encre-soft text-lg text-pretty">
            Quer fazer essas atividades com acompanhamento, numa aula de
            verdade?
          </p>
          <WhatsAppButton mensagem={msgGeral()} tamanho="lg">
            Conversar sobre as aulas
          </WhatsAppButton>
        </div>
      </section>
    </>
  );
}

function CardAtividade({
  atividade,
  numero,
}: {
  atividade: Atividade;
  numero: number;
}) {
  return (
    <Link
      href={`/atividades/${atividade.nivel}/${atividade.slug}`}
      className={cn(
        "clay clay-press group flex w-full flex-col p-7",
        "hover:[&_.seta]:translate-x-1",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-or text-2xl font-semibold">
          {String(numero).padStart(2, "0")}
        </span>
        {atividade.parte && (
          <span className="bg-cream text-encre-soft rounded-full px-3 py-1 text-xs font-semibold">
            Parte {atividade.parte}
          </span>
        )}
      </div>

      <h3 className="font-display text-encre mt-4 text-2xl leading-tight font-semibold text-balance">
        <span className="text-bordeaux">{atividade.destaque}</span>{" "}
        {atividade.resto}
      </h3>
      <p className="text-encre-soft mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-pretty">
        {atividade.descricao}
      </p>

      <div className="border-clay-deep mt-6 flex items-center justify-between border-t pt-4 text-sm font-semibold">
        <span className="text-encre-soft inline-flex items-center gap-2">
          <ListChecks className="size-4" aria-hidden="true" />
          {atividade.questoes.length} questões
        </span>
        <span className="text-encre group-hover:text-bordeaux inline-flex items-center gap-1">
          Fazer
          <ArrowRight
            className="seta size-4 transition-transform"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
