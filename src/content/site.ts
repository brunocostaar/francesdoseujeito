/**
 * Endereço público do site — base de metadataBase, sitemap, robots e do
 * cartão de link.
 *
 * O domínio próprio ainda não foi registrado, e apontar essas URLs para um
 * domínio que não resolve faz o WhatsApp e o Google buscarem a imagem de
 * preview num lugar que não existe. Enquanto isso, NEXT_PUBLIC_SITE_URL
 * (variável de ambiente na Vercel) manda: coloque nela a URL .vercel.app
 * e apague a variável no dia em que o domínio entrar no ar.
 *
 * Deploys de preview usam sempre a URL do próprio deploy — cada branch
 * anunciando a URL de produção é o que faz o Google indexar rascunho.
 */
function urlPublica() {
  const configurada = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configurada) return configurada.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel && process.env.VERCEL_ENV !== "production") {
    return `https://${vercel}`;
  }

  return "https://francesdoseujeito.com.br";
}

/** Dados globais da escola. */
export const site = {
  nome: "Francês do Seu Jeito",
  /** Assinatura da marca (folha de identidade 3a). */
  tagline: "Aprenda francês de forma simples, autêntica e no seu ritmo.",
  descricao:
    "Escola online de francês com aulas ao vivo e individuais. Do A1 ao C2, preparação para DELF, DALF, TCF e TEF.",
  url: urlPublica(),

  /** Formato internacional, só dígitos: 55 + DDD + número. */
  whatsappNumber: "5583987817771",
  /** Como o número aparece escrito na tela. */
  whatsappDisplay: "(83) 98781-7771",

  email: "prof.adriana.fr@gmail.com",
  instagram: "https://instagram.com/francesdoseujeito",
  instagramHandle: "@francesdoseujeito",
  youtube: "https://www.youtube.com/@francesdoseujeito",

  /**
   * Números exibidos como prova social no hero.
   * A média de avaliação entra aqui quando os depoimentos reais chegarem —
   * publicar uma nota antes de ter as avaliações seria número inventado.
   */
  numeros: [
    { valor: "+1.000", rotulo: "alunos" },
    { valor: "22 anos", rotulo: "ensinando francês" },
  ],
} as const;
