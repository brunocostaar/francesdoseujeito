import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Todo o conteúdo é público. Bloquear /_next/ impediria crawlers de
    // renderizar corretamente as páginas e não traz benefício de indexação.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
