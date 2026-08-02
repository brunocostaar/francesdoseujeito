import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Rótulo pequeno acima do título — geralmente em francês. */
  sobretitulo?: string;
  titulo: ReactNode;
  descricao?: ReactNode;
  centralizado?: boolean;
  /** Use "h1" quando este for o título principal da página. */
  nivel?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  sobretitulo,
  titulo,
  descricao,
  centralizado = true,
  nivel: Titulo = "h2",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        centralizado && "mx-auto text-center",
        className,
      )}
    >
      {sobretitulo && (
        // Micro-label em caixa alta com tracking é Jost na folha de
        // marca, não o serifado — Cormorant a 14px espaçado sai fraco.
        <p className="text-bordeaux mb-3 text-sm font-semibold tracking-[0.18em] uppercase">
          {sobretitulo}
        </p>
      )}
      <Titulo className="font-display text-encre text-3xl leading-tight font-semibold text-balance sm:text-4xl">
        {titulo}
      </Titulo>
      {descricao && (
        <p className="text-encre-soft mt-4 text-lg leading-relaxed text-pretty">
          {descricao}
        </p>
      )}
    </div>
  );
}
