/**
 * Depoimentos reais, enviados pelos próprios alunos.
 *
 * Só entra aqui o que o aluno escreveu e autorizou. O texto é
 * reproduzido como veio — a única edição permitida é de digitação
 * (acento, maiúscula, espaço), nunca de conteúdo.
 *
 * `nota` é opcional de propósito: nenhum destes alunos deu uma nota em
 * estrelas, e atribuir cinco estrelas por conta própria seria inventar
 * uma avaliação que ninguém fez.
 */

export type Depoimento = {
  nome: string;
  nivel: string;
  texto: string;
  /** Estrelas, quando o aluno de fato avaliou. */
  nota?: number;
  resultado?: string;
};

export const depoimentos: Depoimento[] = [
  {
    nome: "Rafael Melo",
    nivel: "Aluno “Objectif DELF”",
    resultado: "Aprovado no DELF B1 em 3 meses",
    texto:
      "A professora Adriana é simplesmente incrível! Eu tinha um objetivo bem ousado de conseguir o nível B1 em 3 meses e ela sempre foi realista de que seria difícil, mas que com dedicação e seguindo o plano que ela havia criado seria possível. No final conseguimos! Mesmo com nervosismo da minha parte, ela estava lá me aconselhando e ajudando (principalmente na minha conversação) para que no final desse certo.",
  },
  {
    nome: "Marise Correia",
    nivel: "Aluna B2",
    texto:
      "Além de extremamente preparada, Adriana tem uma paixão contagiante pela língua francesa e suas aulas expressam isso. Além de serem dinâmicas, têm conteúdo de cultura francesa que despertaram em mim ainda mais interesse em aprender a língua. Estratégia excelente! Adriana é super querida, paciente e engraçada também. Então, suas aulas são tudo de bom!",
  },
  {
    nome: "Luma Medeiros",
    nivel: "Aluna C1",
    texto:
      "A professora Adriana sempre foi muito atenciosa, didática e paciente, e com ela pude avançar no meu próprio ritmo sem me sentir pressionada. Percebi uma evolução natural no meu francês ao longo das aulas. Sou muito grata por todo o seu cuidado e dedicação!",
  },
];
