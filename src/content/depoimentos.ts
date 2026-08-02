/**
 * ⚠️  DEPOIMENTOS FICTÍCIOS — PLACEHOLDER.
 *
 * Todos os nomes, textos e resultados abaixo foram INVENTADOS para
 * dar forma ao layout. Publicar depoimento inventado como se fosse
 * real é propaganda enganosa (CDC art. 37) além de queimar a
 * credibilidade da escola.
 *
 * SUBSTITUIR POR DEPOIMENTOS REAIS ANTES DE COLOCAR O SITE NO AR.
 */

export type Depoimento = {
  nome: string;
  nivel: string;
  texto: string;
  nota: number;
  resultado?: string;
};

export const depoimentos: Depoimento[] = [
  {
    nome: "Camila Reis",
    nivel: "A1 → B1",
    nota: 5,
    resultado: "Aprovada no TCF B1",
    texto:
      "Comecei do zero absoluto, achando que não tinha ouvido para línguas. Em catorze meses passei no TCF com B1 e consegui a documentação para o Quebec. A Marina nunca me deixou traduzir tudo na cabeça — foi isso que destravou.",
  },
  {
    nome: "Thiago Nakamura",
    nivel: "B1 → B2",
    nota: 5,
    resultado: "Mestrado em Toulouse",
    texto:
      "Precisava de B2 para o mestrado e o prazo era curto. As aulas viraram treino de prova sem perder a conversa. Fiz o DELF B2 com 78 pontos e hoje faço as aulas do mestrado em francês sem legenda mental.",
  },
  {
    nome: "Renata Oliveira",
    nivel: "A2",
    nota: 5,
    texto:
      "Já tinha desistido do francês duas vezes em cursos grandes de turma cheia. Aqui é aula individual de verdade: se eu travo num assunto, a gente para e resolve. Faz seis meses e é a primeira vez que eu continuo.",
  },
  {
    nome: "Paulo Menezes",
    nivel: "B2 → C1",
    nota: 5,
    resultado: "Aprovado no DALF C1",
    texto:
      "O C1 me assustava pela produção escrita. Fizemos uns quinze essais corrigidos linha por linha, com comentário sobre registro e conectores. Passei de primeira. A correção detalhada foi o que fez diferença.",
  },
  {
    nome: "Juliana Barros",
    nivel: "A1 → A2",
    nota: 5,
    texto:
      "Meu marido é francês e eu ficava calada nos jantares em família. Hoje eu discuto, brigo e faço piada em francês. A aula tem um clima leve que tira o medo de errar.",
  },
  {
    nome: "Eduardo Lins",
    nivel: "C1",
    nota: 5,
    resultado: "Trabalha em Genebra",
    texto:
      "Uso francês no trabalho todos os dias e queria polir o registro profissional. As aulas viraram simulação de reunião e apresentação. Meu chefe suíço comentou a diferença em dois meses.",
  },
  {
    nome: "Fernanda Costa",
    nivel: "A2 → B1",
    nota: 4,
    texto:
      "Ótima didática e material muito bem organizado. Só senti falta de mais exercícios para fazer entre as aulas no começo — pedi e a Marina passou a montar uma lista semanal.",
  },
];
