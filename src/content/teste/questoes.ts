import type { Nivel } from "@/content/cursos";

export type Questao = {
  id: number;
  nivel: Uppercase<Nivel>;
  enunciado: string;
  /** Contexto curto em PT-BR quando o enunciado sozinho não basta. */
  ajuda?: string;
  opcoes: string[];
  /** Índice da opção correta em `opcoes`. */
  correta: number;
};

/**
 * 24 questões, 4 por nível, em dificuldade crescente.
 * A ordem dentro do array é a ordem de apresentação: o aluno sempre
 * vai do mais fácil ao mais difícil, e a pontuação (ver lib/nivel.ts)
 * para no primeiro nível em que ele erra 2 ou mais.
 */
export const questoes: Questao[] = [
  // ---------------------------------------------------------------- A1
  {
    id: 1,
    nivel: "A1",
    enunciado: "Je ___ brésilien.",
    ajuda: "Verbo être (ser/estar) na primeira pessoa.",
    opcoes: ["suis", "es", "est", "sont"],
    correta: 0,
  },
  {
    id: 2,
    nivel: "A1",
    enunciado: "Como se diz “Bom dia” em francês?",
    opcoes: ["Bonne nuit", "Bonjour", "Bonsoir", "Bon appétit"],
    correta: 1,
  },
  {
    id: 3,
    nivel: "A1",
    enunciado: "___ voiture est rouge.",
    ajuda: "Artigo definido antes de um substantivo feminino.",
    opcoes: ["Le", "Les", "La", "Un"],
    correta: 2,
  },
  {
    id: 4,
    nivel: "A1",
    enunciado: "Nous ___ un chien et deux chats.",
    ajuda: "Verbo avoir (ter) na primeira pessoa do plural.",
    opcoes: ["avons", "avez", "sommes", "ont"],
    correta: 0,
  },

  // ---------------------------------------------------------------- A2
  {
    id: 5,
    nivel: "A2",
    enunciado: "Hier, je ___ au cinéma avec mes amis.",
    ajuda: "Passé composé do verbo aller.",
    opcoes: ["ai allé", "suis allé", "vais", "allais"],
    correta: 1,
  },
  {
    id: 6,
    nivel: "A2",
    enunciado: "Il fait plus froid ___ hiver ___ en automne.",
    opcoes: ["en / que", "au / de", "dans / que", "en / de"],
    correta: 0,
  },
  {
    id: 7,
    nivel: "A2",
    enunciado: "Tu connais Marie ? — Oui, je ___ connais bien.",
    ajuda: "Pronome complemento de objeto direto.",
    opcoes: ["lui", "la", "elle", "leur"],
    correta: 1,
  },
  {
    id: 8,
    nivel: "A2",
    enunciado: "Demain, nous ___ à Paris.",
    ajuda: "Futuro simples do verbo partir.",
    opcoes: ["partons", "partirons", "sommes partis", "partirions"],
    correta: 1,
  },

  // ---------------------------------------------------------------- B1
  {
    id: 9,
    nivel: "B1",
    enunciado: "Il faut que tu ___ plus attentif en classe.",
    ajuda: "Subjuntivo presente do verbo être.",
    opcoes: ["es", "sois", "seras", "étais"],
    correta: 1,
  },
  {
    id: 10,
    nivel: "B1",
    enunciado: "C'est le livre ___ je t'ai parlé la semaine dernière.",
    ajuda: "Pronome relativo depois de um verbo com a preposição de.",
    opcoes: ["que", "qui", "dont", "où"],
    correta: 2,
  },
  {
    id: 11,
    nivel: "B1",
    enunciado: "Quand j'étais petit, je ___ tous les jours après l'école.",
    ajuda: "Ação habitual no passado.",
    opcoes: ["ai joué", "jouais", "jouerai", "aie joué"],
    correta: 1,
  },
  {
    id: 12,
    nivel: "B1",
    enunciado: "O que significa a expressão « poser un lapin à quelqu'un » ?",
    opcoes: [
      "Dar um presente inesperado",
      "Furar um compromisso, deixar alguém esperando",
      "Contar uma mentira inofensiva",
      "Pedir um favor difícil",
    ],
    correta: 1,
  },

  // ---------------------------------------------------------------- B2
  {
    id: 13,
    nivel: "B2",
    enunciado: "Bien qu'il ___ très fatigué, il a terminé le projet.",
    ajuda: "Bien que exige um modo verbal específico.",
    opcoes: ["est", "était", "soit", "sera"],
    correta: 2,
  },
  {
    id: 14,
    nivel: "B2",
    enunciado: "Si j'avais su, je ___ autrement.",
    ajuda: "Segunda parte de uma condicional irreal no passado.",
    opcoes: ["agirais", "aurais agi", "agissais", "aurai agi"],
    correta: 1,
  },
  {
    id: 15,
    nivel: "B2",
    enunciado:
      "Qual conector introduz uma consequência, e não uma oposição ?",
    opcoes: ["Néanmoins", "Or", "Par conséquent", "En revanche"],
    correta: 2,
  },
  {
    id: 16,
    nivel: "B2",
    enunciado: "Elle m'a dit qu'elle ___ le lendemain.",
    ajuda: "Discurso indireto no passado.",
    opcoes: ["viendra", "viendrait", "vient", "soit venue"],
    correta: 1,
  },

  // ---------------------------------------------------------------- C1
  {
    id: 17,
    nivel: "C1",
    enunciado: "Qual frase está em registro claramente formal ?",
    opcoes: [
      "T'as pas une clope ?",
      "Auriez-vous l'amabilité de patienter quelques instants ?",
      "Je peux te demander un truc ?",
      "Faut qu'on parle, là.",
    ],
    correta: 1,
  },
  {
    id: 18,
    nivel: "C1",
    enunciado: "O que quer dizer « faire la sourde oreille » ?",
    opcoes: [
      "Fingir que não ouviu, ignorar de propósito",
      "Falar muito baixo",
      "Escutar com muita atenção",
      "Repetir a mesma coisa várias vezes",
    ],
    correta: 0,
  },
  {
    id: 19,
    nivel: "C1",
    enunciado: "Il est parti sans ___ au revoir.",
    ajuda: "Sans seguido de infinitivo, com pronome.",
    opcoes: ["qu'il dise", "dire nous", "nous dire", "qu'il nous dit"],
    correta: 2,
  },
  {
    id: 20,
    nivel: "C1",
    enunciado:
      "« Quoi qu'il en soit, la décision est prise. » O que « quoi qu'il en soit » exprime ?",
    opcoes: [
      "Uma dúvida sobre o que aconteceu",
      "Seja como for, de qualquer maneira",
      "Uma pergunta indireta",
      "Uma condição a ser cumprida",
    ],
    correta: 1,
  },

  // ---------------------------------------------------------------- C2
  {
    id: 21,
    nivel: "C2",
    enunciado: "Qual frase contém um subjuntivo imperfeito, típico do registro literário ?",
    opcoes: [
      "Il fallait qu'il vienne.",
      "Il eût fallu qu'il vînt.",
      "Il faudra qu'il vienne.",
      "Il faut qu'il vienne.",
    ],
    correta: 1,
  },
  {
    id: 22,
    nivel: "C2",
    enunciado: "O que significa « battre en brèche » um argumento ?",
    opcoes: [
      "Reforçar e sustentar o argumento",
      "Demolir, refutar ponto a ponto",
      "Repetir o argumento com outras palavras",
      "Adiar a discussão",
    ],
    correta: 1,
  },
  {
    id: 23,
    nivel: "C2",
    enunciado:
      "Em « Les mesures qu'a prises le gouvernement », por que « prises » concorda no feminino plural ?",
    opcoes: [
      "Porque o sujeito « gouvernement » é coletivo",
      "Porque o objeto direto « mesures » vem antes do particípio",
      "Porque o verbo avoir sempre concorda com o sujeito",
      "Porque « qu' » é um pronome sujeito",
    ],
    correta: 1,
  },
  {
    id: 24,
    nivel: "C2",
    enunciado: "Em qual registro se enquadra « il s'avère que sa thèse est spécieuse » ?",
    opcoes: [
      "Familiar, usado entre amigos",
      "Corrente, do dia a dia",
      "Soutenu, acadêmico ou argumentativo",
      "Gíria juvenil",
    ],
    correta: 2,
  },
];

/** Ordem canônica dos níveis, usada na pontuação e na navegação. */
export const ORDEM_NIVEIS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type NivelTeste = (typeof ORDEM_NIVEIS)[number];
