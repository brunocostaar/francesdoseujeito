import type { ElementType } from "react";
import { cn } from "@/lib/utils";

const LACUNA = '<span class="lacuna" aria-label="lacuna"></span>';

/**
 * Renderiza o HTML inline das atividades (<i>, <b>, <code>, <br> e a
 * lacuna "___"). Só recebe texto de src/content/atividades.ts — nunca
 * passe para cá algo digitado pelo usuário.
 */
export function TextoRico({
  html,
  as: Tag = "span",
  className,
}: {
  html: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      className={cn("texto-rico", className)}
      dangerouslySetInnerHTML={{ __html: html.replaceAll("___", LACUNA) }}
    />
  );
}

/** Versão sem marcação, para canvas e mensagens de WhatsApp. */
export function textoPlano(html: string): string {
  return html
    .replace(/<br\s*\/?>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
