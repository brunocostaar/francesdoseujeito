import type { MetadataRoute } from "next";
import { cursos } from "@/content/cursos";
import { exames } from "@/content/exames";
import { site } from "@/content/site";

/*
  As páginas de curso e de exame são geradas a partir do conteúdo, então o
  sitemap também é — senão cada nível novo em cursos.ts nasce invisível
  para o Google.

  Sem lastModified: o site é estático e o conteúdo muda por edição de
  arquivo, não por data. Carimbar a data do build em tudo a cada deploy
  ensina o buscador a ignorar o campo.
*/

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (caminho = "") => `${site.url}${caminho}`;

  return [
    { url: url(), changeFrequency: "monthly", priority: 1 },
    { url: url("/cursos"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/teste-de-nivel"), changeFrequency: "monthly", priority: 0.9 },
    ...cursos.map((curso) => ({
      url: url(`/cursos/${curso.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...exames.map((exame) => ({
      url: url(`/exames/${exame.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
