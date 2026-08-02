import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variante = "primaria" | "secundaria" | "whatsapp" | "sutil";
type Tamanho = "sm" | "md" | "lg";

const variantes: Record<Variante, string> = {
  primaria: "clay clay-encre clay-press",
  secundaria: "clay clay-press text-encre",
  whatsapp: "clay clay-bordeaux clay-press",
  sutil: "text-encre-soft hover:text-encre underline underline-offset-4",
};

const tamanhos: Record<Tamanho, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type BaseProps = {
  children: ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
};

function classes({
  variante = "primaria",
  tamanho = "md",
  className,
}: Omit<BaseProps, "children">) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
    "transition-colors",
    variante !== "sutil" && tamanhos[tamanho],
    variantes[variante],
    className,
  );
}

/** Botão interno: usa next/link e faz prefetch. */
export function ClayButton({
  children,
  variante,
  tamanho,
  className,
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link className={classes({ variante, tamanho, className })} {...props}>
      {children}
    </Link>
  );
}

/** Link externo (WhatsApp, Instagram). Sempre abre em nova aba. */
export function ClayLinkExterno({
  children,
  variante = "whatsapp",
  tamanho,
  className,
  ...props
}: BaseProps & ComponentProps<"a">) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={classes({ variante, tamanho, className })}
      {...props}
    >
      {children}
    </a>
  );
}

/** Botão de ação em página (quiz, menu mobile). */
export function ClayAction({
  children,
  variante,
  tamanho,
  className,
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button className={classes({ variante, tamanho, className })} {...props}>
      {children}
    </button>
  );
}
