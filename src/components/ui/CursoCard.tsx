import { ArrowRight, Clock, MessageCircle, User, Users } from "lucide-react";
import Link from "next/link";
import type { Curso } from "@/content/cursos";
import { cn } from "@/lib/utils";
import { msgCurso, whatsappLink } from "@/lib/whatsapp";

const acentos: Record<Curso["cor"], string> = {
  encre: "clay-encre",
  bordeaux: "clay-bordeaux",
  or: "clay-or",
};

/** Card de nível, reusado na home e em /cursos. */
export function CursoCard({ curso }: { curso: Curso }) {
  return (
    <article className="clay clay-press flex flex-col p-7">
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "clay font-display flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-semibold",
            acentos[curso.cor],
          )}
        >
          {curso.nivel}
        </span>
        <span className="text-encre-soft inline-flex items-center gap-1.5 text-xs font-semibold">
          <Clock className="size-3.5" aria-hidden="true" />
          {curso.duracao}
        </span>
      </div>

      <h3 className="font-display text-encre mt-5 text-xl font-semibold">
        {curso.titulo}
      </h3>
      <p className="text-encre-soft mt-2 flex-1 leading-relaxed text-pretty">
        {curso.subtitulo}
      </p>

      {/* Bloco de investimento / preço */}
      <div className="mt-6 rounded-2xl bg-cream-soft/70 p-3.5 border border-clay-deep/30 flex flex-col gap-2">
        {curso.slug === "c2" ? (
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-encre-soft uppercase tracking-wider">
              Investimento
            </span>
            <span className="font-display font-semibold text-encre text-sm">
              sob consulta
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-encre-soft">
                <Users className="size-3.5 text-bordeaux" aria-hidden="true" />
                Em grupo:
              </span>
              <span className="font-display font-bold text-encre text-sm">
                {curso.precoGrupo}
              </span>
            </div>
            <div className="h-px bg-clay-deep/20" />
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-encre-soft">
                <User className="size-3.5 text-bordeaux" aria-hidden="true" />
                Individual:
              </span>
              <span className="font-display font-bold text-encre text-sm">
                {curso.precoIndividual}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={whatsappLink(msgCurso(curso.nivel, curso.titulo))}
          target="_blank"
          rel="noopener noreferrer"
          className="clay clay-bordeaux clay-press inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Quero este nível
        </a>
        <Link
          href={`/cursos/${curso.slug}`}
          className="text-encre-soft hover:text-bordeaux inline-flex items-center gap-1 text-sm font-semibold"
        >
          Detalhes
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
