import type { Nivel } from "@/content/cursos";

/**
 * Ordem canônica dos níveis do teste, usada na pontuação e na navegação.
 * Para no B2 de propósito: a distância entre C1 e C2 não se mede por
 * múltipla escolha, e prometer esse rótulo aqui seria menos honesto do
 * que convidar o aluno para uma conversa.
 */
export const ORDEM_NIVEIS = ["A1", "A2", "B1", "B2"] as const satisfies
  readonly Uppercase<Nivel>[];
export type NivelTeste = (typeof ORDEM_NIVEIS)[number];

export type Questao = {
  id: number;
  nivel: NivelTeste;
  enunciado: string;
  /** Contexto curto em PT-BR quando o enunciado sozinho não basta. */
  ajuda?: string;
  opcoes: string[];
  /** Índice da opção correta em `opcoes`. */
  correta: number;
};

/**
 * 24 questões, 6 por nível, em dificuldade crescente.
 * A ordem dentro do array é a ordem de apresentação: o aluno sempre vai
 * do mais fácil ao mais difícil, e a pontuação (ver lib/nivel.ts) para
 * no primeiro nível em que ele erra 3 ou mais.
 *
 * Seis itens por nível em vez de quatro: com 4 de 6 para passar, dois
 * erros bobos não derrubam o aluno um nível inteiro, e a chance de
 * passar no chute cai de 5,1% para 3,8% por bloco.
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
    enunciado: "Voici une photo de ma famille : c'est ___ mère.",
    ajuda: "Adjetivo possessivo antes de um substantivo feminino.",
    opcoes: ["mon", "ma", "mes", "me"],
    correta: 1,
  },
  {
    id: 5,
    nivel: "A1",
    enunciado: "Nous ___ un chien et deux chats.",
    ajuda: "Verbo avoir (ter) na primeira pessoa do plural.",
    opcoes: ["avons", "avez", "sommes", "ont"],
    correta: 0,
  },
  {
    id: 6,
    nivel: "A1",
    enunciado: "J'ai une sœur, mais je n'ai ___ frère.",
    ajuda: "Negação com um substantivo depois.",
    opcoes: ["pas un", "pas de", "pas des", "pas du"],
    correta: 1,
  },

  // ---------------------------------------------------------------- A2
  {
    id: 7,
    nivel: "A2",
    enunciado: "En été, il y a beaucoup ___ touristes dans cette ville.",
    ajuda: "Expressão de quantidade antes de um substantivo.",
    opcoes: ["des", "de", "les", "du"],
    correta: 1,
  },
  {
    id: 8,
    nivel: "A2",
    enunciado: "Hier, je ___ au cinéma avec mes amis.",
    ajuda: "Passé composé do verbo aller.",
    opcoes: ["ai allé", "suis allé", "vais", "allais"],
    correta: 1,
  },
  {
    id: 9,
    nivel: "A2",
    enunciado: "Tu vas à la banque ? — Oui, j'___ vais tout de suite.",
    ajuda: "Pronome que substitui um lugar já mencionado.",
    opcoes: ["en", "y", "le", "la"],
    correta: 1,
  },
  {
    id: 10,
    nivel: "A2",
    enunciado: "Il fait plus froid ___ hiver ___ en automne.",
    opcoes: ["en / qu'", "au / de", "dans / que", "en / de"],
    correta: 0,
  },
  {
    id: 11,
    nivel: "A2",
    enunciado: "Tu connais Marie ? — Oui, je ___ connais bien.",
    ajuda: "Pronome complemento de objeto direto.",
    opcoes: ["lui", "la", "elle", "leur"],
    correta: 1,
  },
  {
    id: 12,
    nivel: "A2",
    enunciado: "Demain, nous ___ à Paris.",
    ajuda: "Futuro simples do verbo partir.",
    opcoes: ["partons", "partirons", "sommes partis", "partirions"],
    correta: 1,
  },

  // ---------------------------------------------------------------- B1
  {
    id: 13,
    nivel: "B1",
    enunciado: "Quand j'étais petit, je ___ tous les jours après l'école.",
    ajuda: "Ação habitual no passado.",
    opcoes: ["ai joué", "jouais", "jouerai", "aie joué"],
    correta: 1,
  },
  {
    id: 14,
    nivel: "B1",
    enunciado: "Quand je suis arrivé au cinéma, le film ___ déjà commencé.",
    ajuda: "Ação anterior a outra ação já no passado.",
    opcoes: ["a", "avait", "était", "aurait"],
    correta: 1,
  },
  {
    id: 15,
    nivel: "B1",
    enunciado: "Si j'avais plus de temps, je ___ du sport tous les matins.",
    ajuda: "Consequência de uma condição hipotética no presente.",
    opcoes: ["fais", "ferai", "ferais", "aurais fait"],
    correta: 2,
  },
  {
    id: 16,
    nivel: "B1",
    enunciado: "Il faut que tu ___ plus attentif en classe.",
    ajuda: "Subjuntivo presente do verbo être.",
    opcoes: ["es", "sois", "seras", "étais"],
    correta: 1,
  },
  {
    id: 17,
    nivel: "B1",
    enunciado: "C'est le livre ___ je t'ai parlé la semaine dernière.",
    ajuda: "Pronome relativo depois de um verbo com a preposição de.",
    opcoes: ["que", "qui", "dont", "où"],
    correta: 2,
  },
  {
    id: 18,
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
    id: 19,
    nivel: "B2",
    enunciado: "L'entreprise pour ___ je travaille est très petite.",
    ajuda: "Pronome relativo depois de preposição, referindo-se a uma coisa.",
    opcoes: ["qui", "laquelle", "que", "dont"],
    correta: 1,
  },
  {
    id: 20,
    nivel: "B2",
    enunciado: "Bien qu'il ___ très fatigué, il a terminé le projet.",
    ajuda: "Bien que exige um modo verbal específico.",
    opcoes: ["est", "était", "soit", "sera"],
    correta: 2,
  },
  {
    id: 21,
    nivel: "B2",
    enunciado: "Elle m'a dit qu'elle ___ le lendemain.",
    ajuda: "Discurso indireto no passado.",
    opcoes: ["viendra", "viendrait", "vient", "soit venue"],
    correta: 1,
  },
  {
    id: 22,
    nivel: "B2",
    enunciado:
      "Qual conector introduz uma consequência, e não uma oposição ?",
    opcoes: ["Néanmoins", "Or", "Par conséquent", "En revanche"],
    correta: 2,
  },
  {
    id: 23,
    nivel: "B2",
    enunciado: "Si j'avais su, je ___ autrement.",
    ajuda: "Segunda parte de uma condicional irreal no passado.",
    opcoes: ["agirais", "aurais agi", "agissais", "aurai agi"],
    correta: 1,
  },
  {
    id: 24,
    nivel: "B2",
    enunciado: "___ tu dises, il ne changera pas d'avis.",
    ajuda: "Locução concessiva: « seja lá o que você disser ».",
    opcoes: ["Quoique", "Quoi que", "Quel que", "Quelque"],
    correta: 1,
  },
];
