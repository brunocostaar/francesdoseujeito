import { Pill } from "@/components/ui/Pill";
import { RetratoProfessora } from "@/components/ui/RetratoProfessora";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { professora } from "@/content/professora";
import { msgAulaExperimental } from "@/lib/whatsapp";

export function SobreProfessora() {
  return (
    <section id="professora" className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="clay clay-blob mx-auto w-full max-w-xs overflow-hidden p-0 lg:sticky lg:top-28">
          {/* Retrato de estúdio: pouca folga acima da cabeça, então o
              recorte quadrado ancora no topo em vez de centralizar. */}
          <RetratoProfessora
            src={professora.fotoSecundaria}
            posicao="center top"
          />
        </div>

        <div>
          <p className="text-bordeaux mb-3 text-sm font-semibold tracking-[0.18em] uppercase">
            Qui suis-je
          </p>
          <h2 className="font-display text-encre text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            {professora.chamada}
          </h2>

          <div className="mt-6 flex flex-col gap-4">
            {professora.bio.map((paragrafo) => (
              <p
                key={paragrafo.slice(0, 40)}
                className="text-encre-soft text-lg leading-relaxed text-pretty"
              >
                {paragrafo}
              </p>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {professora.credenciais.map((credencial) => (
              <li key={credencial}>
                <Pill>{credencial}</Pill>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <WhatsAppButton mensagem={msgAulaExperimental()} tamanho="lg">
              Conversar com a professora
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
