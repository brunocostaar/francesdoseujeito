import { notFound, permanentRedirect } from "next/navigation";
import { cursos } from "@/content/cursos";

type Props = { params: Promise<{ nivel: string }> };

/*
  /atividades/a1 é o "pai" natural das URLs de atividade e alguém vai
  digitá-lo. Em vez de uma segunda listagem, leva para a seção do nível
  no hub.
*/
export function generateStaticParams() {
  return cursos.map((curso) => ({ nivel: curso.slug }));
}

export default async function NivelAtividadesPage({ params }: Props) {
  const { nivel } = await params;
  if (!cursos.some((c) => c.slug === nivel)) notFound();
  permanentRedirect(`/atividades#${nivel}`);
}
