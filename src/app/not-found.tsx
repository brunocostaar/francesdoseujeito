import { ClayButton } from "@/components/ui/ClayButton";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6">
      <p className="font-display text-clay-deep text-7xl font-semibold">404</p>
      <h1 className="font-display text-encre mt-6 text-3xl font-semibold text-balance">
        Oups ! Esta página não existe.
      </h1>
      <p className="text-encre-soft mt-4 text-lg text-pretty">
        O link pode estar errado ou a página pode ter mudado de lugar.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <ClayButton href="/" tamanho="lg">
          Voltar para a home
        </ClayButton>
        <ClayButton href="/cursos" variante="secundaria" tamanho="lg">
          Ver os cursos
        </ClayButton>
      </div>
    </div>
  );
}
