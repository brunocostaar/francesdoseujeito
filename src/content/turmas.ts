import { getCurso, type Nivel } from "@/content/cursos";

/**
 * Turmas com inscrição aberta. É o único lugar onde uma turma é
 * cadastrada: a faixa da home, a página /turmas e o aviso na página de
 * cada nível saem daqui.
 *
 * Nada de "Turmas de Novembro!" escrito à mão: cada turma tem data de
 * início e deixa de aparecer sozinha no dia seguinte. As páginas que
 * mostram turmas revalidam uma vez por dia, então não precisa de deploy
 * para ela sumir. Array vazio = a faixa da home some e /turmas mostra o
 * convite para a lista de espera.
 */

export type Turma = {
  /** Identificador estável, só para a lista (ex.: "a1-nov-2026"). */
  id: string;
  nivel: Nivel;
  formato: "grupo" | "individual";
  /** Data de início no formato AAAA-MM-DD. */
  inicio: string;
  /** Como aparece na tela: "Terças e quintas, 19h às 20h". */
  diasHorario: string;
  vagas?: number;
  preco?: string;
  observacao?: string;
};

export const turmas: Turma[] = [
  // Exemplo — descomente e troque pelos dados reais:
  // {
  //   id: "a1-nov-2026",
  //   nivel: "a1",
  //   formato: "grupo",
  //   inicio: "2026-11-10",
  //   diasHorario: "Terças e quintas, 19h às 20h",
  //   vagas: 4,
  //   preco: "R$ 280/mês",
  // },
];

const FUSO = "America/Sao_Paulo";

/** "Hoje" no fuso da escola, como AAAA-MM-DD — compara direto com `inicio`. */
function hojeNoFuso(agora: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: FUSO }).format(agora);
}

/** Turmas que ainda não começaram (ou começam hoje), da mais próxima à mais distante. */
export function turmasAbertas(agora = new Date()): Turma[] {
  const hoje = hojeNoFuso(agora);
  return turmas
    .filter((t) => t.inicio >= hoje)
    .sort((a, b) => a.inicio.localeCompare(b.inicio));
}

export function turmasAbertasDoNivel(nivel: Nivel): Turma[] {
  return turmasAbertas().filter((t) => t.nivel === nivel);
}

/** "10 de novembro" — meio-dia evita a virada de data por fuso. */
export function dataInicio(turma: Turma, comDiaDaSemana = false): string {
  return new Date(`${turma.inicio}T12:00:00-03:00`).toLocaleDateString(
    "pt-BR",
    {
      day: "numeric",
      month: "long",
      timeZone: FUSO,
      ...(comDiaDaSemana ? { weekday: "long" } : {}),
    },
  );
}

/** "A1 (Iniciante) em grupo" */
export function nomeTurma(turma: Turma): string {
  const curso = getCurso(turma.nivel);
  const nivel = curso
    ? `${curso.nivel} (${curso.titulo})`
    : turma.nivel.toUpperCase();
  return `${nivel} ${turma.formato === "grupo" ? "em grupo" : "individual"}`;
}
