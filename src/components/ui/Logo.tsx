import Image from "next/image";
import { professora } from "@/content/professora";
import { cn } from "@/lib/utils";

/**
 * Logotipo "Francês do Seu Jeito" — identidade 3a (Le Petit Café),
 * paleta Encre & Or, títulos em Cormorant Garamond.
 *
 * As três variantes vêm direto da folha de marca:
 *   horizontal — ilustração + filete dourado + bloco de texto (navbar)
 *   empilhada  — ilustração sobre o texto centralizado (rodapé, cartão)
 *   icone      — círculo Bleu Encre com a ilustração em negativo (avatar)
 *
 * As cores vêm dos tokens do site (--color-encre / -bordeaux / -or):
 * desde que o site adotou a paleta Encre & Or, marca e interface usam
 * a mesma tinta, então não faz mais sentido um conjunto paralelo.
 */

const ILUSTRACAO = "/marca-cachorro.png";
/** Proporção do arquivo original (473 × 528). */
const RAZAO = 473 / 528;

function Cachorrinho({
  altura,
  className,
  priority,
}: {
  altura: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={ILUSTRACAO}
      alt=""
      width={Math.round(altura * RAZAO)}
      height={altura}
      className={cn("block h-auto", className)}
      priority={priority}
    />
  );
}

export function Logo({
  variante = "horizontal",
  alinhamento = "centro",
  className,
  priority = false,
}: {
  variante?: "horizontal" | "empilhada" | "icone";
  /** Só afeta a variante empilhada. */
  alinhamento?: "centro" | "esquerda";
  className?: string;
  priority?: boolean;
}) {
  if (variante === "icone") {
    return (
      <span
        className={cn(
          "bg-encre flex size-12 items-end justify-center overflow-hidden rounded-full",
          className,
        )}
      >
        {/* brightness(0) invert(1) deixa o traço branco sem precisar de
            um segundo arquivo — é o mesmo recurso da folha de marca. */}
        <Cachorrinho
          altura={40}
          className="[filter:brightness(0)_invert(1)]"
          priority={priority}
        />
      </span>
    );
  }

  if (variante === "empilhada") {
    const aEsquerda = alinhamento === "esquerda";
    return (
      <span
        className={cn(
          "flex flex-col gap-4",
          aEsquerda ? "items-start text-left" : "items-center text-center",
          className,
        )}
      >
        <Cachorrinho altura={104} priority={priority} />
        <span className="bg-or block h-px w-40" />
        {/*
          O alinhamento tem que descer até aqui. Com items-start só no
          contêiner de fora, este bloco continua centralizando as três
          linhas entre si — e como "do seu jeito" é bem mais largo que
          "Francês" por causa do tracking, o wordmark fica visivelmente
          fora de prumo com a ilustração.
        */}
        <span
          className={cn(
            "flex flex-col gap-1.5",
            aEsquerda ? "items-start" : "items-center",
          )}
        >
          <span className="font-marca text-encre text-4xl leading-none font-medium">
            Francês
          </span>
          {/* O padding-left compensa o espaço que o tracking pendura à
              direita da última letra; sem ele o bloco nasce torto. */}
          <span className="text-encre-soft text-[11px] tracking-[0.44em] [padding-left:0.44em]">
            do seu jeito
          </span>
          <span className="text-bordeaux mt-1.5 text-[9px] tracking-[0.3em] [padding-left:0.3em] uppercase">
            {professora.assinaturaMarca}
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Cachorrinho altura={44} priority={priority} />
      <span className="bg-or block h-11 w-px shrink-0" />
      <span className="flex flex-col gap-1">
        <span className="font-marca text-encre text-2xl leading-[0.9] font-medium whitespace-nowrap">
          francês
        </span>
        <span className="text-encre-soft text-[8px] tracking-[0.36em] whitespace-nowrap [padding-left:0.36em]">
          do seu jeito
        </span>
        {/* A assinatura é a primeira coisa a sair quando falta largura. */}
        <span className="text-bordeaux hidden text-[7px] tracking-[0.2em] whitespace-nowrap uppercase sm:block">
          {professora.assinaturaMarca}
        </span>
      </span>
    </span>
  );
}
