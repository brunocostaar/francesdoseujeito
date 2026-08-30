import { BadgeCheck, Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { ClayButton } from "@/components/ui/ClayButton";
import { ClayCard } from "@/components/ui/ClayCard";
import { Pill } from "@/components/ui/Pill";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { exames, examesPorSlug, type ExameSlug } from "@/content/exames";
import { site } from "@/content/site";
import { msgExame } from "@/lib/whatsapp";

type Props = { params: Promise<{ exame: string }> };

export function generateStaticParams() {
  return exames.map((exame) => ({ exame: exame.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exame: slug } = await params;
  const exame = examesPorSlug[slug as ExameSlug];
  if (!exame) return {};

  const title = `${exame.sigla} — o que é, estrutura e como se preparar`;
  const description = `${exame.subtitulo}. Níveis: ${exame.niveis}. Validade: ${exame.validade}.`;
  const path = `/exames/${exame.slug}`;

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

export default async function ExamePage({ params }: Props) {
  const { exame: slug } = await params;
  const exame = examesPorSlug[slug as ExameSlug];
  if (!exame) notFound();

  return (
    <>
      <section className="px-4 pt-16 pb-8 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Pill tom={exame.cor === "encre" ? "encre" : "bordeaux"}>
            <BadgeCheck className="size-4" aria-hidden="true" />
            {exame.destaque}
          </Pill>

          <h1 className="font-display text-encre mt-6 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            {exame.titulo}
          </h1>
          <p className="text-encre-soft mt-4 text-xl text-pretty">
            {exame.subtitulo}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <WhatsAppButton mensagem={msgExame(exame.sigla)} tamanho="lg">
              Quero preparação para o {exame.sigla}
            </WhatsAppButton>
            <ClayButton
              href="/teste-de-nivel"
              variante="secundaria"
              tamanho="lg"
            >
              Descobrir meu nível
            </ClayButton>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="font-display text-encre text-2xl font-semibold">
              O que é o {exame.sigla}
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {exame.oQueE.map((paragrafo) => (
                <p
                  key={paragrafo.slice(0, 40)}
                  className="text-encre-soft text-lg leading-relaxed text-pretty"
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          </div>

          <ClayCard className="h-fit">
            <h2 className="font-display text-encre text-lg font-semibold">
              Quem costuma precisar
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {exame.paraQuem.map((item) => (
                <li key={item} className="text-encre-soft flex gap-3 text-sm">
                  <span
                    className="bg-clay-deep mt-2 size-1.5 shrink-0 rounded-full"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-pretty">{item}</span>
                </li>
              ))}
            </ul>

            <dl className="border-clay-deep mt-6 border-t pt-5 text-sm">
              <dt className="text-encre-soft text-xs font-semibold tracking-wide uppercase">
                Níveis
              </dt>
              <dd className="text-encre mt-1 font-semibold text-pretty">
                {exame.niveis}
              </dd>
              <dt className="text-encre-soft mt-4 text-xs font-semibold tracking-wide uppercase">
                Validade
              </dt>
              <dd className="text-encre mt-1 font-semibold text-pretty">
                {exame.validade}
              </dd>
            </dl>
          </ClayCard>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-encre text-2xl font-semibold">
            Como é a prova
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {exame.provas.map((prova) => (
              <ClayCard key={prova.nome}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-encre text-lg font-semibold">
                    {prova.nome}
                  </h3>
                  <span className="text-encre-soft shrink-0 text-xs font-semibold">
                    {prova.duracao}
                  </span>
                </div>
                <p className="text-bordeaux mt-1 text-sm font-semibold">
                  {prova.pontos}
                </p>
                <p className="text-encre-soft mt-3 leading-relaxed text-pretty">
                  {prova.descricao}
                </p>
              </ClayCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="clay mx-auto max-w-4xl p-8 sm:p-12">
          <h2 className="font-display text-encre text-2xl font-semibold">
            Como preparo você
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {exame.comoPreparamos.map((item) => (
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
            <WhatsAppButton mensagem={msgExame(exame.sigla)}>
              Montar meu plano de preparação
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
