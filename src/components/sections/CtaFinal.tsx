import { ArrowRight } from "lucide-react";
import { ClayButton } from "@/components/ui/ClayButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { msgAulaExperimental } from "@/lib/whatsapp";

export function CtaFinal() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="clay clay-bordeaux mx-auto max-w-4xl px-8 py-14 text-center sm:px-14">
        <h2 className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          On commence quand&nbsp;?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/90 text-pretty">
          A primeira conversa é gratuita e dura 30 minutos. Sem compromisso, sem
          discurso de vendas — só para entender aonde você quer chegar.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <WhatsAppButton
            mensagem={msgAulaExperimental()}
            tamanho="lg"
            variante="secundaria"
          >
            Agendar minha conversa
          </WhatsAppButton>
          <ClayButton
            href="/teste-de-nivel"
            tamanho="lg"
            variante="secundaria"
            className="bg-transparent text-white shadow-none ring-2 ring-white/60 ring-inset hover:bg-white/10"
          >
            Fazer o teste antes
            <ArrowRight className="size-5" aria-hidden="true" />
          </ClayButton>
        </div>
      </div>
    </section>
  );
}
