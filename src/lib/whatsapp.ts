import { site } from "@/content/site";

/**
 * Gerador único de links de WhatsApp.
 * Nenhum componente deve montar uma URL de wa.me na mão — trocar o
 * número da escola precisa ser uma edição em src/content/site.ts.
 */
export function whatsappLink(mensagem: string): string {
  const numero = site.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Contato genérico: rodapé, botão flutuante, CTA do topo. */
export function msgGeral(): string {
  return `Oi! Vim pelo site do ${site.nome} e gostaria de saber mais sobre as aulas de francês.`;
}

/** CTA de um nível específico (cards de curso, mega-menu, página do nível). */
export function msgCurso(nivel: string, titulo?: string): string {
  const descricao = titulo ? `${nivel} — ${titulo}` : nivel;
  return `Oi! Vim pelo site e tenho interesse no curso de francês ${descricao}. Pode me contar como funciona?`;
}

/** CTA das páginas de exame. */
export function msgExame(exame: string): string {
  return `Oi! Vim pelo site e quero preparação para o ${exame}. Pode me explicar como funciona a preparação?`;
}

/** CTA do resultado do teste de nível — leva o nível junto na conversa. */
export function msgTesteNivel(nivel: string): string {
  return `Oi! Fiz o teste de nível no site e meu resultado foi ${nivel}. Gostaria de saber mais sobre as aulas a partir desse nível.`;
}

/** CTA da aula experimental gratuita. */
export function msgAulaExperimental(): string {
  return `Oi! Vim pelo site e gostaria de agendar a conversa inicial gratuita.`;
}
