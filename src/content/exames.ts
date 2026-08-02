/**
 * Exames oficiais de francês.
 * Os dados de estrutura e validade refletem o formato vigente, mas
 * taxas e regras mudam por país e por centro — conferir no site do
 * France Éducation International antes de publicar.
 */

export type ExameSlug = "delf-dalf" | "tcf-tef";

export type Prova = {
  nome: string;
  duracao: string;
  pontos: string;
  descricao: string;
};

export type Exame = {
  slug: ExameSlug;
  titulo: string;
  sigla: string;
  subtitulo: string;
  /** Uma linha, usada no dropdown da navbar. */
  resumoCurto: string;
  oQueE: string[];
  paraQuem: string[];
  niveis: string;
  validade: string;
  destaque: string;
  provas: Prova[];
  comoPreparamos: string[];
  cor: "encre" | "bordeaux";
};

export const exames: Exame[] = [
  {
    slug: "delf-dalf",
    titulo: "DELF e DALF",
    sigla: "DELF / DALF",
    subtitulo: "Os diplomas oficiais do Ministério da Educação francês",
    resumoCurto: "Diplomas vitalícios, do A1 ao C2.",
    oQueE: [
      "O DELF (Diplôme d'Études en Langue Française) e o DALF (Diplôme Approfondi de Langue Française) são os diplomas oficiais emitidos pelo Ministério da Educação Nacional da França. Juntos cobrem os seis níveis do QECR: DELF do A1 ao B2, DALF no C1 e C2.",
      "Cada nível é um diploma independente e definitivo: você presta a prova do nível que quer certificar e, uma vez aprovado, o diploma vale para sempre. Não existe reprovação parcial que anule o resto — ou você atinge a nota mínima do nível, ou presta de novo.",
    ],
    paraQuem: [
      "Candidatura a universidades francesas (normalmente B2, às vezes C1)",
      "Processos de naturalização e residência na França (B1 costuma ser o piso)",
      "Concursos e cargos que exigem comprovação permanente de nível",
      "Quem quer um comprovante que não expira nunca",
    ],
    niveis: "A1, A2, B1, B2 (DELF) · C1, C2 (DALF)",
    validade: "Vitalícia — o diploma nunca expira",
    destaque: "Vitalício",
    provas: [
      {
        nome: "Compreensão oral",
        duracao: "25 a 40 min",
        pontos: "25 pontos",
        descricao:
          "Áudios curtos e longos com perguntas de múltipla escolha e resposta aberta. No B2 em diante, entrevistas e debates em velocidade natural.",
      },
      {
        nome: "Compreensão escrita",
        duracao: "30 min a 1h",
        pontos: "25 pontos",
        descricao:
          "Textos informativos e argumentativos. Nos níveis altos, artigos de imprensa com posicionamento implícito.",
      },
      {
        nome: "Produção escrita",
        duracao: "30 min a 1h",
        pontos: "25 pontos",
        descricao:
          "Do recado simples no A1 à dissertação argumentada no B2 e à síntese de documentos no DALF — a prova que mais elimina candidatos.",
      },
      {
        nome: "Produção oral",
        duracao: "10 a 30 min",
        pontos: "25 pontos",
        descricao:
          "Entrevista com o examinador, exercício em interação e, a partir do B1, apresentação de um ponto de vista com defesa diante de perguntas.",
      },
    ],
    comoPreparamos: [
      "Diagnóstico inicial com um simulado completo, para saber onde você está de verdade",
      "Treino específico por competência, atacando primeiro a prova mais fraca",
      "Produções escritas corrigidas com a grade oficial de avaliação, critério por critério",
      "Simulações de oral cronometradas, no formato exato da banca",
      "Estratégia de prova: gestão de tempo, o que responder primeiro, quando chutar",
    ],
    cor: "encre",
  },
  {
    slug: "tcf-tef",
    titulo: "TCF e TEF",
    sigla: "TCF / TEF",
    subtitulo: "Os testes de nível para imigração e admissão rápida",
    resumoCurto: "Testes de posicionamento, resultado rápido.",
    oQueE: [
      "O TCF (Test de Connaissance du Français) e o TEF (Test d'Évaluation de Français) não são diplomas: são testes de posicionamento. Você não escolhe o nível — faz a prova e recebe o nível que atingiu, de A1 a C2, em cada competência separadamente.",
      "São a via mais rápida para quem tem prazo: o resultado sai em poucas semanas, as datas são frequentes e existem versões específicas para cada finalidade (TCF Canada, TCF ANF para nacionalidade, TEF Canada, TEF Études).",
    ],
    paraQuem: [
      "Imigração para o Canadá e para o Quebec (TCF Canada ou TEF Canada)",
      "Pedido de nacionalidade francesa (TCF ANF ou TEF Naturalisation)",
      "Admissão em universidades francesas via Campus France (TCF DAP)",
      "Quem precisa de resultado rápido e não pode esperar a próxima sessão do DELF",
    ],
    niveis: "Resultado de A1 a C2, atribuído por competência",
    validade: "2 anos a partir da data da prova",
    destaque: "Resultado em semanas",
    provas: [
      {
        nome: "Compreensão oral",
        duracao: "~35 min",
        pontos: "escala 0–699",
        descricao:
          "Múltipla escolha em dificuldade crescente. Cada questão vale mais que a anterior, e não dá para voltar atrás.",
      },
      {
        nome: "Compreensão escrita",
        duracao: "~1h",
        pontos: "escala 0–699",
        descricao:
          "Múltipla escolha sobre avisos, e-mails, artigos e textos literários. O tempo é o principal inimigo.",
      },
      {
        nome: "Produção escrita",
        duracao: "1h",
        pontos: "escala 0–699",
        descricao:
          "Três tarefas encadeadas, da mensagem prática ao texto argumentativo. Avaliada por examinadores humanos.",
      },
      {
        nome: "Produção oral",
        duracao: "12 a 15 min",
        pontos: "escala 0–699",
        descricao:
          "Três partes: obter informação, convencer alguém, expressar e defender um ponto de vista. Sem tempo de preparação prévia.",
      },
    ],
    comoPreparamos: [
      "Treino do formato adaptativo: como não perder pontos nas primeiras questões, que valem menos mas orientam a prova",
      "Gestão de tempo cronometrada — a maior causa de nota baixa no TCF é não terminar",
      "Banco de temas recorrentes de produção escrita e oral, com modelos de estrutura",
      "Definição da nota-alvo conforme o programa de imigração e o cálculo de pontos que você precisa",
      "Simulados completos nas condições reais da prova",
    ],
    cor: "bordeaux",
  },
];

export const examesPorSlug = Object.fromEntries(
  exames.map((e) => [e.slug, e]),
) as Record<ExameSlug, Exame>;
