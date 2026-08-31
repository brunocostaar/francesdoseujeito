import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { CursosGrid } from "@/components/sections/CursosGrid";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { ExamesDestaque } from "@/components/sections/ExamesDestaque";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { SobreProfessora } from "@/components/sections/SobreProfessora";
import { faq } from "@/content/faq";
import { professora } from "@/content/professora";
import { site } from "@/content/site";

/**
 * Dados estruturados: descrevem a escola e associam as perguntas visíveis
 * da página às respectivas respostas. A exibição como rich result depende
 * dos critérios do buscador e não é garantida pela presença da marcação.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${site.url}/#organization`,
      name: site.nome,
      description: site.descricao,
      url: site.url,
      logo: `${site.url}/icon.png`,
      email: site.email,
      telephone: `+${site.whatsappNumber}`,
      sameAs: [site.instagram, site.youtube],
      founder: {
        "@type": "Person",
        name: professora.nomeSchema,
        jobTitle: professora.titulo,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.pergunta,
        acceptedAnswer: { "@type": "Answer", text: item.resposta },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ComoFunciona />
      <SobreProfessora />
      <CursosGrid />
      <ExamesDestaque />
      <Depoimentos />
      <FaqSection />
      <CtaFinal />
    </>
  );
}
