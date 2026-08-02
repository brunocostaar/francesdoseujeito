import type { Metadata } from "next";
import { TesteDeNivel } from "@/components/teste/TesteDeNivel";

export const metadata: Metadata = {
  title: "Teste de nível de francês grátis",
  description:
    "Descubra seu nível de francês do A1 ao C2 em 5 minutos. 24 questões de múltipla escolha, resultado na hora, sem cadastro.",
};

export default function TesteDeNivelPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24">
      <TesteDeNivel />
    </div>
  );
}
