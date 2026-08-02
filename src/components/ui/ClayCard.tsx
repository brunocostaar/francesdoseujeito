import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ClayCardProps = {
  children: ReactNode;
  className?: string;
  /** `blanc` salta mais do fundo cream; use em cards sobre seção clara. */
  tom?: "clay" | "blanc";
  /** Adiciona o hover/active tátil. Só para cards clicáveis. */
  interativo?: boolean;
  as?: ElementType;
};

export function ClayCard({
  children,
  className,
  tom = "clay",
  interativo = false,
  as: Tag = "div",
}: ClayCardProps) {
  return (
    <Tag
      className={cn(
        "clay p-7",
        tom === "blanc" && "clay-blanc",
        interativo && "clay-press",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
