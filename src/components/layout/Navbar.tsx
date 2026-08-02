"use client";

import { ChevronDown, MessageCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cursos } from "@/content/cursos";
import { exames } from "@/content/exames";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { msgCurso, msgGeral, msgExame, whatsappLink } from "@/lib/whatsapp";

type MenuAberto = "cursos" | "exames" | null;

export function Navbar() {
  const [aberto, setAberto] = useState<MenuAberto>(null);
  const [mobileAberto, setMobileAberto] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const fechar = useCallback(() => setAberto(null), []);

  // Fecha tudo ao navegar — senão o dropdown fica pendurado sobre a
  // página nova. Ajuste durante o render (e não num efeito) é o padrão
  // recomendado para resetar estado quando uma prop muda: evita o
  // render extra e ainda pega voltar/avançar do navegador.
  const [pathAnterior, setPathAnterior] = useState(pathname);
  if (pathname !== pathAnterior) {
    setPathAnterior(pathname);
    setAberto(null);
    setMobileAberto(false);
  }

  // Escape fecha; clique fora fecha.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(null);
        setMobileAberto(false);
      }
    };
    const aoClicar = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setAberto(null);
      }
    };
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("mousedown", aoClicar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("mousedown", aoClicar);
    };
  }, []);

  // Trava o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = mobileAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileAberto]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        ref={navRef}
        aria-label="Navegação principal"
        // O blur mantém a pill legível quando o conteúdo passa por baixo.
        // `relative z-50` põe a pill acima do overlay do menu mobile —
        // os dois são filhos do mesmo <header>, e sem isso o overlay
        // (z-40, depois no DOM) cobriria o botão de fechar.
        className="clay relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-3 pr-3 pl-6 backdrop-blur-md"
        onMouseLeave={fechar}
      >
        <Link href="/" aria-label={site.nome} className="shrink-0">
          <Logo variante="horizontal" priority />
        </Link>

        {/* ---------------------------------------------- desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/teste-de-nivel"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              pathname === "/teste-de-nivel"
                ? "text-bordeaux"
                : "text-encre hover:text-bordeaux",
            )}
          >
            Teste de nível
          </Link>

          <ItemComDropdown
            rotulo="Exames de francês"
            id="menu-exames"
            estaAberto={aberto === "exames"}
            abrir={() => setAberto("exames")}
            alternar={() =>
              setAberto((a) => (a === "exames" ? null : "exames"))
            }
            ativo={pathname.startsWith("/exames")}
          >
            <div className="clay clay-blanc w-[26rem] p-3">
              {exames.map((exame) => (
                <div
                  key={exame.slug}
                  className="hover:bg-cream flex items-start gap-3 rounded-2xl p-3 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/exames/${exame.slug}`}
                      className="text-encre hover:text-bordeaux font-display font-semibold"
                    >
                      {exame.sigla}
                    </Link>
                    <p className="text-encre-soft mt-0.5 text-sm text-pretty">
                      {exame.resumoCurto}
                    </p>
                  </div>
                  <a
                    href={whatsappLink(msgExame(exame.sigla))}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Falar no WhatsApp sobre o ${exame.sigla}`}
                    className="clay clay-bordeaux clay-press mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </ItemComDropdown>

          <ItemComDropdown
            rotulo="Nossos cursos"
            id="menu-cursos"
            estaAberto={aberto === "cursos"}
            abrir={() => setAberto("cursos")}
            alternar={() =>
              setAberto((a) => (a === "cursos" ? null : "cursos"))
            }
            ativo={pathname.startsWith("/cursos")}
            alinhamento="centro"
          >
            <div className="clay clay-blanc w-[46rem] p-4">
              <div className="grid grid-cols-3 gap-2">
                {cursos.map((curso) => (
                  <div
                    key={curso.slug}
                    className="hover:bg-cream flex flex-col rounded-2xl p-3 transition-colors"
                  >
                    <Link
                      href={`/cursos/${curso.slug}`}
                      className="group/link flex items-baseline gap-2"
                    >
                      <span className="font-display text-bordeaux text-xl font-semibold">
                        {curso.nivel}
                      </span>
                      <span className="text-encre group-hover/link:text-bordeaux text-sm font-semibold">
                        {curso.titulo}
                      </span>
                    </Link>
                    <p className="text-encre-soft mt-1 mb-3 flex-1 text-xs leading-relaxed text-pretty">
                      {curso.resumoCurto}
                    </p>
                    <a
                      href={whatsappLink(msgCurso(curso.nivel, curso.titulo))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay clay-bordeaux clay-press inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                    >
                      <MessageCircle className="size-3.5" aria-hidden="true" />
                      Quero este nível
                    </a>
                  </div>
                ))}
              </div>
              <Link
                href="/cursos"
                className="text-encre-soft hover:text-bordeaux mt-2 block px-3 py-2 text-sm font-semibold underline underline-offset-4"
              >
                Ver todos os cursos e comparar os níveis →
              </Link>
            </div>
          </ItemComDropdown>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(msgGeral())}
            target="_blank"
            rel="noopener noreferrer"
            className="clay clay-bordeaux clay-press hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Falar no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMobileAberto((v) => !v)}
            aria-expanded={mobileAberto}
            aria-controls="menu-mobile"
            aria-label={mobileAberto ? "Fechar menu" : "Abrir menu"}
            className="clay clay-press flex size-11 items-center justify-center rounded-full lg:hidden"
          >
            {mobileAberto ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {mobileAberto && <MenuMobile onNavegar={() => setMobileAberto(false)} />}
    </header>
  );
}

/* ------------------------------------------------------------------ */

type DropdownProps = {
  rotulo: string;
  id: string;
  estaAberto: boolean;
  abrir: () => void;
  alternar: () => void;
  ativo: boolean;
  alinhamento?: "esquerda" | "centro";
  children: React.ReactNode;
};

/**
 * Abre no hover (conveniência no mouse) E no clique/Enter — hover
 * sozinho é inacessível por teclado e inexistente em touch.
 */
function ItemComDropdown({
  rotulo,
  id,
  estaAberto,
  abrir,
  alternar,
  ativo,
  alinhamento = "esquerda",
  children,
}: DropdownProps) {
  return (
    <div className="relative" onMouseEnter={abrir}>
      <button
        type="button"
        onClick={alternar}
        aria-expanded={estaAberto}
        aria-controls={id}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          ativo || estaAberto
            ? "text-bordeaux"
            : "text-encre hover:text-bordeaux",
        )}
      >
        {rotulo}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            estaAberto && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={id}
        // Mantido no DOM para não perder o foco do teclado ao fechar.
        className={cn(
          "absolute top-full pt-4 transition-[opacity,transform] duration-200",
          alinhamento === "centro"
            ? "left-1/2 -translate-x-1/2"
            : "left-0 -translate-x-4",
          estaAberto
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** No mobile o mega-menu vira lista expansível — hover não existe em touch. */
function MenuMobile({ onNavegar }: { onNavegar: () => void }) {
  return (
    <div
      id="menu-mobile"
      className="bg-cream fixed inset-0 top-0 z-40 overflow-y-auto px-5 pt-28 pb-12 lg:hidden"
    >
      <nav aria-label="Navegação mobile" className="flex flex-col gap-3">
        <Link
          href="/teste-de-nivel"
          onClick={onNavegar}
          className="clay clay-press font-display block px-6 py-4 text-lg font-semibold"
        >
          Teste de nível
        </Link>

        <details className="clay group px-6 py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-lg font-semibold">
              Exames de francês
            </span>
            <ChevronDown
              className="size-5 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="flex flex-col gap-3 pb-5">
            {exames.map((exame) => (
              <div key={exame.slug}>
                <Link
                  href={`/exames/${exame.slug}`}
                  onClick={onNavegar}
                  className="text-encre font-semibold"
                >
                  {exame.sigla}
                </Link>
                <p className="text-encre-soft mb-2 text-sm">
                  {exame.resumoCurto}
                </p>
                <a
                  href={whatsappLink(msgExame(exame.sigla))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay clay-bordeaux clay-press inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold"
                >
                  <MessageCircle className="size-3.5" aria-hidden="true" />
                  Quero preparação
                </a>
              </div>
            ))}
          </div>
        </details>

        <details className="clay group px-6 py-1" open>
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-lg font-semibold">
              Nossos cursos
            </span>
            <ChevronDown
              className="size-5 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="flex flex-col gap-4 pb-5">
            {cursos.map((curso) => (
              <div
                key={curso.slug}
                className="flex items-center justify-between gap-3"
              >
                <Link
                  href={`/cursos/${curso.slug}`}
                  onClick={onNavegar}
                  className="min-w-0 flex-1"
                >
                  <span className="font-display text-bordeaux text-lg font-semibold">
                    {curso.nivel}
                  </span>{" "}
                  <span className="text-encre text-sm font-semibold">
                    {curso.titulo}
                  </span>
                  <span className="text-encre-soft block text-xs text-pretty">
                    {curso.resumoCurto}
                  </span>
                </Link>
                <a
                  href={whatsappLink(msgCurso(curso.nivel, curso.titulo))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Falar no WhatsApp sobre o curso ${curso.nivel}`}
                  className="clay clay-bordeaux clay-press flex size-10 shrink-0 items-center justify-center rounded-full"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                </a>
              </div>
            ))}
            <Link
              href="/cursos"
              onClick={onNavegar}
              className="text-encre-soft text-sm font-semibold underline underline-offset-4"
            >
              Ver todos os cursos →
            </Link>
          </div>
        </details>

        <a
          href={whatsappLink(msgGeral())}
          target="_blank"
          rel="noopener noreferrer"
          className="clay clay-bordeaux clay-press mt-2 flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          Falar no WhatsApp
        </a>
        <p className="text-encre-soft mt-2 text-center text-sm">
          {site.whatsappDisplay}
        </p>
      </nav>
    </div>
  );
}
