import { Plus } from "lucide-react";
import type { Pergunta } from "@/content/faq";

/**
 * Accordion com <details>/<summary> nativos: zero JavaScript, e a
 * acessibilidade (teclado, leitor de tela, Ctrl+F do navegador) vem
 * de graça do próprio elemento.
 */
export function Accordion({ itens }: { itens: Pergunta[] }) {
  return (
    <div className="flex flex-col gap-4">
      {itens.map((item) => (
        <details key={item.pergunta} className="clay group px-7 py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold [&::-webkit-details-marker]:hidden">
            <span className="text-encre text-lg text-pretty">
              {item.pergunta}
            </span>
            <Plus
              className="text-bordeaux size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="text-encre-soft pb-6 leading-relaxed text-pretty">
            {item.resposta}
          </p>
        </details>
      ))}
    </div>
  );
}
