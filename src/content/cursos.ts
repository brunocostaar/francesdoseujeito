/**
 * Os seis níveis do QECR (Quadro Europeu Comum de Referência).
 * Preços e durações são PLACEHOLDER — revisar antes de publicar.
 */

export type Nivel = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

export type Curso = {
  slug: Nivel;
  nivel: string;
  titulo: string;
  subtitulo: string;
  /** Frase de uma linha, usada no mega-menu da navbar. */
  resumoCurto: string;
  duracao: string;
  cargaHoraria: string;
  publico: string;
  voceVaiConseguir: string[];
  conteudo: string[];
  precoGrupo: string;
  precoIndividual: string;
  preco: string;
  precoDetalhe: string;
  /** Cor de acento do card. Uma por nível, na ordem do arco. */
  cor: "encre" | "bordeaux" | "or";
};

export const cursos: Curso[] = [
  {
    slug: "a1",
    nivel: "A1",
    titulo: "Iniciante",
    subtitulo: "Os primeiros passos, sem medo de errar",
    resumoCurto: "Do zero: se apresentar e sobreviver ao dia a dia.",
    duracao: "4 a 6 meses",
    cargaHoraria: "Uma aula de 1h por semana",
    publico:
      "Quem nunca estudou francês, ou tentou uma vez e parou antes de conseguir falar qualquer coisa.",
    voceVaiConseguir: [
      "Se apresentar, falar de onde você é, do seu trabalho e da sua família",
      "Pedir comida, comprar passagem e resolver o básico numa viagem",
      "Entender números, horas, datas e preços quando falados devagar",
      "Escrever mensagens curtas e preencher formulários",
      "Perceber a diferença entre o francês escrito e o falado — o famoso choque inicial",
    ],
    conteudo: [
      "Pronúncia e sons que não existem em português (u, r, nasais)",
      "Verbos no presente",
      "Artigos, gênero dos substantivos e concordância",
      "Passado composto para contar o que você fez",
      "Vocabulário do cotidiano: casa, comida, cidade, rotina",
    ],
    precoGrupo: "R$ 220/mês",
    precoIndividual: "R$ 420/mês",
    preco: "Grupo R$ 220/mês · Indiv. R$ 420/mês",
    precoDetalhe: "Opção em grupo reduzido ou aulas individuais, material incluso",
    cor: "encre",
  },
  {
    slug: "a2",
    nivel: "A2",
    titulo: "Básico",
    subtitulo: "Conversa de verdade sobre o seu dia",
    resumoCurto: "Conversar sobre rotina, passado e planos.",
    duracao: "5 a 7 meses",
    cargaHoraria: "Uma aula de 1h por semana",
    publico:
      "Quem já se vira com frases prontas e quer construir as próprias frases sem travar no meio.",
    voceVaiConseguir: [
      "Contar sua história: infância, estudos, trabalhos anteriores",
      "Falar de planos e do que pretende fazer",
      "Resolver situações imprevistas: trocar um produto, remarcar consulta, reclamar",
      "Entender o essencial de um vídeo ou notícia curta",
      "Escrever e-mails simples e recados com naturalidade",
    ],
    conteudo: [
      "Passado composto x imperfeito — o divisor de águas do A2",
      "Futuro simples e futuro próximo",
      "Pronomes complemento (le, la, lui, y, en)",
      "Comparativos e superlativos",
      "Conectores básicos para dar sequência às ideias",
    ],
    precoGrupo: "R$ 220/mês",
    precoIndividual: "R$ 420/mês",
    preco: "Grupo R$ 220/mês · Indiv. R$ 420/mês",
    precoDetalhe: "Opção em grupo reduzido ou aulas individuais, material incluso",
    cor: "or",
  },
  {
    slug: "b1",
    nivel: "B1",
    titulo: "Intermediário",
    subtitulo: "Autonomia — o nível que abre portas",
    resumoCurto: "Autonomia para a vida cotidiana e objetivos de residência.",
    duracao: "6 a 8 meses",
    cargaHoraria: "Uma aula de 1h por semana",
    publico:
      "Quem precisa comprovar nível para imigração, trabalho ou intercâmbio, e quem quer finalmente conversar sem esforço.",
    voceVaiConseguir: [
      "Se virar sozinho em qualquer situação numa viagem ou mudança",
      "Defender uma opinião e explicar seus motivos",
      "Entender programas de TV, podcasts e conversas entre nativos",
      "Escrever textos estruturados: carta, relato, argumentação simples",
      "Chegar preparado para o DELF B1 ou para o nível B1 no TCF/TEF",
    ],
    conteudo: [
      "Subjuntivo presente e as expressões que o pedem",
      "Discurso indireto e concordância de tempos",
      "Voz passiva e construções impessoais",
      "Pronomes relativos (qui, que, dont, où)",
      "Estratégias de argumentação oral e escrita",
    ],
    precoGrupo: "R$ 260/mês",
    precoIndividual: "R$ 460/mês",
    preco: "Grupo R$ 260/mês · Indiv. R$ 460/mês",
    precoDetalhe: "Opção em grupo reduzido ou aulas individuais, material e correções inclusos",
    cor: "bordeaux",
  },
  {
    slug: "b2",
    nivel: "B2",
    titulo: "Avançado",
    subtitulo: "O nível exigido pelas universidades francesas",
    resumoCurto: "Exigido por universidades e empregos na França.",
    duracao: "7 a 9 meses",
    cargaHoraria: "Uma aula de 1h por semana",
    publico:
      "Quem vai estudar ou trabalhar em francês e precisa de fluência com precisão — e, quase sempre, de um diploma para comprovar.",
    voceVaiConseguir: [
      "Acompanhar aulas, reuniões e debates sem esforço consciente",
      "Argumentar com nuance, concordar em parte, discordar com elegância",
      "Ler textos longos e densos, incluindo imprensa e artigos acadêmicos",
      "Escrever dissertação e síntese no formato exigido pelo DELF B2",
      "Corrigir os próprios erros enquanto fala",
    ],
    conteudo: [
      "Subjuntivo passado e concordância avançada",
      "Registros de língua: formal, corrente, familiar",
      "Articuladores lógicos para textos argumentativos",
      "Nuances de tempo e aspecto verbal",
      "Simulados completos do DELF B2 com correção detalhada",
    ],
    precoGrupo: "R$ 300/mês",
    precoIndividual: "R$ 500/mês",
    preco: "Grupo R$ 300/mês · Indiv. R$ 500/mês",
    precoDetalhe: "Opção em grupo reduzido ou aulas individuais, correções escritas ilimitadas",
    cor: "encre",
  },
  {
    slug: "c1",
    nivel: "C1",
    titulo: "Proficiente",
    subtitulo: "Fluência espontânea, no trabalho e na vida",
    resumoCurto: "Fluência espontânea e registro profissional.",
    duracao: "8 a 12 meses",
    cargaHoraria: "Uma aula de 1h por semana",
    publico:
      "Quem já vive ou trabalha em francês e quer parar de soar como estrangeiro que aprendeu a língua.",
    voceVaiConseguir: [
      "Falar longamente sobre temas complexos, sem procurar palavra",
      "Adaptar o registro ao contexto: cliente, chefe, amigo, banca",
      "Entender ironia, subentendido e referência cultural",
      "Escrever textos profissionais e acadêmicos com estilo próprio",
      "Enfrentar o DALF C1 com margem",
    ],
    conteudo: [
      "Expressões idiomáticas e gírias correntes",
      "Estilística: escolher entre três formas certas a mais adequada",
      "Síntese de documentos — a prova que mais reprova no DALF",
      "Francês de especialidade conforme sua área",
      "Correção fina de sotaque e prosódia",
    ],
    precoGrupo: "R$ 340/mês",
    precoIndividual: "R$ 540/mês",
    preco: "Grupo R$ 340/mês · Indiv. R$ 540/mês",
    precoDetalhe: "Opção em grupo reduzido ou aulas individuais, correções escritas ilimitadas",
    cor: "or",
  },
  {
    slug: "c2",
    nivel: "C2",
    titulo: "Domínio",
    subtitulo: "O francês como se fosse seu",
    resumoCurto: "Domínio completo, próximo de um nativo culto.",
    duracao: "sob medida",
    cargaHoraria: "a combinar, geralmente 1 a 2 aulas por semana",
    publico:
      "Professores, tradutores, pesquisadores e quem quer o DALF C2 — o teto oficial da língua.",
    voceVaiConseguir: [
      "Compreender qualquer coisa que leia ou ouça, sem exceção",
      "Reconstruir argumentos e apresentá-los de forma coerente",
      "Se expressar com precisão de nuance mesmo em assuntos delicados",
      "Escrever com voz autoral, não só correta",
      "Preparar-se para o DALF C2 nas duas provas integradas",
    ],
    conteudo: [
      "Literatura, imprensa de opinião e ensaio",
      "Variação regional: França, Quebec, Bélgica, África francófona",
      "Tradução e versão como exercício de precisão",
      "Retórica e apresentação pública",
      "Projeto pessoal orientado (tese, publicação, certificação)",
    ],
    precoGrupo: "sob consulta",
    precoIndividual: "sob consulta",
    preco: "sob consulta",
    precoDetalhe: "programa montado a partir de uma conversa inicial",
    cor: "bordeaux",
  },
];

export const cursosPorSlug = Object.fromEntries(
  cursos.map((c) => [c.slug, c]),
) as Record<Nivel, Curso>;

export function getCurso(slug: string): Curso | undefined {
  return cursos.find((c) => c.slug === slug);
}
