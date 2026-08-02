import {
  ORDEM_NIVEIS,
  questoes,
  type NivelTeste,
} from "@/content/teste/questoes";

export type ResultadoTeste = {
  nivel: NivelTeste;
  acertosPorNivel: Record<NivelTeste, number>;
  totalAcertos: number;
  totalQuestoes: number;
};

const MINIMO_POR_NIVEL = 3;

/**
 * Nível estimado = o mais alto em que o aluno acertou pelo menos 3 das
 * 4 questões, varrendo A1→C2 e PARANDO no primeiro nível em que ele
 * falha. Somar pontos daria crédito por acertos isolados em C2 de quem
 * ainda erra o presente do indicativo — o corte sequencial é mais
 * honesto e muito mais fácil de explicar para o aluno.
 *
 * Quem não atinge o mínimo nem no A1 recebe A1 mesmo: é o ponto de
 * partida do curso, não uma nota de reprovação.
 *
 * @param respostas índice escolhido por questão (`questoes[i].id` → índice da opção)
 */
export function calcularNivel(
  respostas: Record<number, number>,
): ResultadoTeste {
  const acertosPorNivel = Object.fromEntries(
    ORDEM_NIVEIS.map((n) => [n, 0]),
  ) as Record<NivelTeste, number>;

  let totalAcertos = 0;

  for (const q of questoes) {
    if (respostas[q.id] === q.correta) {
      acertosPorNivel[q.nivel] += 1;
      totalAcertos += 1;
    }
  }

  let nivel: NivelTeste = ORDEM_NIVEIS[0];
  for (const n of ORDEM_NIVEIS) {
    if (acertosPorNivel[n] >= MINIMO_POR_NIVEL) {
      nivel = n;
    } else {
      break;
    }
  }

  return {
    nivel,
    acertosPorNivel,
    totalAcertos,
    totalQuestoes: questoes.length,
  };
}

/** Texto do resultado: o que o aluno já domina e o que vem a seguir. */
export const leituraDoNivel: Record<
  NivelTeste,
  { titulo: string; voceJa: string; proximoPasso: string }
> = {
  A1: {
    titulo: "Você está começando",
    voceJa:
      "Você reconhece palavras e expressões básicas, mas ainda monta as frases com esforço consciente. É exatamente o ponto de partida de quem vai construir a base direito.",
    proximoPasso:
      "O curso A1 arruma a pronúncia desde o início e te leva a conversar sobre você, sua rotina e o essencial de uma viagem.",
  },
  A2: {
    titulo: "Você tem uma base sólida",
    voceJa:
      "Você já se vira em situações previsíveis, entende o essencial de uma conversa devagar e sabe usar o passado composto. O que trava é a fluidez.",
    proximoPasso:
      "No A2 a gente resolve a confusão entre passado composto e imperfeito, e você passa a contar histórias em vez de responder perguntas.",
  },
  B1: {
    titulo: "Você já é independente",
    voceJa:
      "Você se vira sozinho, defende uma opinião e entende conversas entre nativos com algum esforço. É o nível pedido na maioria dos processos de imigração.",
    proximoPasso:
      "O B1 consolida subjuntivo, discurso indireto e argumentação — e já é a base para encarar o DELF B1 ou o TCF.",
  },
  B2: {
    titulo: "Você tem fluência real",
    voceJa:
      "Você acompanha debates, lê textos densos e se expressa com nuance. Os erros que restam são de precisão, não de compreensão.",
    proximoPasso:
      "O B2 é o nível exigido pelas universidades francesas. O curso foca em dissertação, síntese e no polimento que separa 'entendo tudo' de 'escrevo bem'.",
  },
  C1: {
    titulo: "Você está próximo do domínio",
    voceJa:
      "Você fala com espontaneidade, capta ironia e subentendido, e adapta o registro ao contexto. Poucos brasileiros chegam aqui.",
    proximoPasso:
      "No C1 trabalhamos estilística, síntese de documentos e francês de especialidade — e o DALF C1 fica ao alcance.",
  },
  C2: {
    titulo: "Você domina o francês",
    voceJa:
      "Você compreende praticamente tudo que lê ou ouve e se expressa com precisão de nuance. Seu francês está no teto da escala oficial.",
    proximoPasso:
      "O C2 é trabalho de refinamento e voz autoral: literatura, retórica, tradução e preparação para o DALF C2.",
  },
};
