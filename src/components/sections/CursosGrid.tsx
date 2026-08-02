import { CursoCard } from "@/components/ui/CursoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cursos } from "@/content/cursos";

export function CursosGrid({
  comCabecalho = true,
}: {
  comCabecalho?: boolean;
}) {
  return (
    <section id="cursos" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {comCabecalho && (
          <SectionHeading
            sobretitulo="Nos cours"
            titulo="Do primeiro bonjour à fluência"
            descricao="Seis níveis, um caminho contínuo. Você entra onde está e sai onde quer chegar."
          />
        )}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso) => (
            <CursoCard key={curso.slug} curso={curso} />
          ))}
        </div>
      </div>
    </section>
  );
}
