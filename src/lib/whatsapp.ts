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

/**
 * Resultado de uma atividade online, mandado pelo aluno à professora.
 * Leva os números das questões erradas para ela saber o que revisar.
 */
export function msgAtividade({
  nome,
  titulo,
  nivel,
  acertos,
  total,
  erradas,
}: {
  nome: string;
  titulo: string;
  nivel: string;
  acertos: number;
  total: number;
  /** Números das questões erradas, começando em 1. */
  erradas: number[];
}): string {
  const quem = nome ? `Sou ${nome} e fiz` : "Fiz";
  const erros =
    erradas.length === 0
      ? " Acertei todas!"
      : ` Errei ${erradas.length === 1 ? "a questão" : "as questões"} ${listar(erradas)}.`;
  return `Oi, professora! ${quem} a atividade “${titulo}” (${nivel}) no site: acertei ${acertos} de ${total}.${erros}`;
}

function listar(numeros: number[]): string {
  if (numeros.length === 1) return String(numeros[0]);
  return `${numeros.slice(0, -1).join(", ")} e ${numeros[numeros.length - 1]}`;
}

/** CTA de uma turma aberta (faixa da home, /turmas, página do nível). */
export function msgTurma(nomeTurma: string, inicio: string): string {
  return `Oi! Vim pelo site e quero uma vaga na turma ${nomeTurma} que começa em ${inicio}. Ainda tem vaga?`;
}

/** Sem turma aberta no nível: pede para ser avisado da próxima. */
export function msgListaEspera(nivel?: string): string {
  const qual = nivel ? ` de ${nivel}` : "";
  return `Oi! Vim pelo site e queria ser avisado(a) quando abrir a próxima turma${qual}.`;
}
