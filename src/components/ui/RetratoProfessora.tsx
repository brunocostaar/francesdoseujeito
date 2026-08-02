import Image from "next/image";
import { professora } from "@/content/professora";
import { cn } from "@/lib/utils";

/**
 * Retrato da professora dentro do recorte .clay-blob.
 *
 * O contêiner é quadrado por padrão: num retângulo alto o border-radius
 * do blob vira uma elipse, e o que se quer é um geoide. Quem precisar de
 * outra proporção passa `aspect-*` no className — o tailwind-merge
 * resolve o conflito.
 */
export function RetratoProfessora({
  src = professora.foto,
  className,
  posicao,
  priority = false,
}: {
  src?: string;
  className?: string;
  /** object-position, para quando o rosto não está no centro do arquivo. */
  posicao?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <Image
        src={src}
        alt={`${professora.nome}, ${professora.titulo}`}
        fill
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 100vw"
        className="object-cover"
        style={posicao ? { objectPosition: posicao } : undefined}
        priority={priority}
      />
    </div>
  );
}
