import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  InstagramIcon,
  YoutubeIcon,
} from "@/components/ui/IconesSociais";
import { Logo } from "@/components/ui/Logo";
import { cursos } from "@/content/cursos";
import { exames } from "@/content/exames";
import { site } from "@/content/site";
import { msgGeral, whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-8 sm:px-6">
      <div className="clay mx-auto max-w-6xl px-8 py-12 sm:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variante="empilhada" alinhamento="esquerda" />
            <p className="text-encre-soft mt-6 text-sm leading-relaxed text-pretty">
              {site.descricao}
            </p>
          </div>

          <div>
            <h3 className="font-display text-encre mb-4 font-semibold">
              Cursos
            </h3>
            <ul className="flex flex-col gap-2">
              {cursos.map((curso) => (
                <li key={curso.slug}>
                  <Link
                    href={`/cursos/${curso.slug}`}
                    className="text-encre-soft hover:text-bordeaux text-sm"
                  >
                    {curso.nivel} — {curso.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-encre mb-4 font-semibold">
              Exames
            </h3>
            <ul className="flex flex-col gap-2">
              {exames.map((exame) => (
                <li key={exame.slug}>
                  <Link
                    href={`/exames/${exame.slug}`}
                    className="text-encre-soft hover:text-bordeaux text-sm"
                  >
                    {exame.sigla}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/teste-de-nivel"
                  className="text-encre-soft hover:text-bordeaux text-sm"
                >
                  Teste de nível gratuito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-encre mb-4 font-semibold">
              Contato
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={whatsappLink(msgGeral())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-encre-soft hover:text-bordeaux inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-encre-soft hover:text-bordeaux inline-flex items-center gap-2"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-encre-soft hover:text-bordeaux inline-flex items-center gap-2"
                >
                  <InstagramIcon className="size-4" />
                  {site.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-encre-soft hover:text-bordeaux inline-flex items-center gap-2"
                >
                  <YoutubeIcon className="size-4" />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Filete Or Doux: o mesmo traço que separa a ilustração do
            wordmark no logotipo, ecoado no fecho do rodapé. */}
        <p className="text-encre-soft border-or/40 mt-12 border-t pt-6 text-center text-xs">
          © {new Date().getFullYear()} {site.nome}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
