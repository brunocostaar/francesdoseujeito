import { ArrowRight, Sparkles } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { RetratoProfessora } from "@/components/ui/RetratoProfessora";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { professora } from "@/content/professora";
import { site } from "@/content/site";
import { msgAulaExperimental } from "@/lib/whatsapp";

export function Hero() {
  return (
    // overflow-x-clip, não overflow-hidden: as manchas precisam sangrar
    // para cima, atrás da navbar, senão o clipe corta o degradê rente à
    // pill e o topo da página vira uma faixa branca com emenda visível.
    // `clip` num eixo só é o único jeito de segurar o scroll horizontal
    // sem também cortar na vertical.
    <section className="relative overflow-x-clip px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
      {/* Manchas de cor difusas — dão profundidade sem virar mais uma caixa. */}
      <div
        aria-hidden="true"
        className="bg-or/25 pointer-events-none absolute -top-52 -left-32 size-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-bordeaux/10 pointer-events-none absolute -right-32 -bottom-32 size-96 rounded-full blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="clay text-encre inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            <Sparkles className="text-bordeaux size-4" aria-hidden="true" />
            Primeira conversa gratuita
          </span>

          <h1 className="font-display text-encre mt-6 text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-6xl">
            Bonjour !{" "}
            <span className="text-bordeaux">
              Seu francês começa numa conversa
            </span>
            , não num livro de gramática.
          </h1>

          <p className="text-encre-soft mt-6 max-w-xl text-lg leading-relaxed text-pretty">
            Aulas individuais e ao vivo, do A1 ao C2, montadas em cima do seu
            objetivo — viajar, estudar fora, mudar de país ou passar no DELF.
            Você fala francês desde a primeira aula.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ClayButton href="/teste-de-nivel" tamanho="lg">
              Descobrir meu nível
              <ArrowRight className="size-5" aria-hidden="true" />
            </ClayButton>
            <WhatsAppButton mensagem={msgAulaExperimental()} tamanho="lg">
              Agendar conversa
            </WhatsAppButton>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {site.numeros.map((n) => (
              <div key={n.rotulo}>
                <dt className="sr-only">{n.rotulo}</dt>
                <dd>
                  <span className="font-display text-encre block text-3xl font-semibold">
                    {n.valor}
                  </span>
                  <span className="text-encre-soft text-sm">{n.rotulo}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="clay clay-blob overflow-hidden p-0">
            <RetratoProfessora priority />
          </div>

          <div className="clay clay-blanc absolute -bottom-4 -left-4 max-w-[15rem] rounded-3xl px-5 py-4 sm:-left-8">
            <p className="font-display text-encre text-sm font-semibold">
              {professora.nome}
            </p>
            <p className="text-encre-soft mt-0.5 text-xs leading-snug">
              {professora.titulo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
