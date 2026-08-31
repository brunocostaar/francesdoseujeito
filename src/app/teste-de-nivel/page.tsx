import type { Metadata } from "next";
import { TesteDeNivel } from "@/components/teste/TesteDeNivel";
import { site } from "@/content/site";

const title = "Teste de nível de francês grátis — descubra seu A1 a B2";
const description =
  "Descubra seu nível de francês do A1 ao B2 em 5 minutos. 24 questões de múltipla escolha, resultado na hora, sem cadastro.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/teste-de-nivel" },
  openGraph: {
    type: "website",
    url: `${site.url}/teste-de-nivel`,
    title,
    description,
    locale: "pt_BR",
    siteName: site.nome,
  },
};

export default function TesteDeNivelPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24">
      <TesteDeNivel />
    </div>
  );
}
