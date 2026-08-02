import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  tom?: "clay" | "encre" | "bordeaux" | "or";
  className?: string;
};

const tons = {
  clay: "clay text-encre",
  encre: "clay clay-encre",
  bordeaux: "clay clay-bordeaux",
  or: "clay clay-or",
};

export function Pill({ children, tom = "clay", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold",
        tons[tom],
        className,
      )}
    >
      {children}
    </span>
  );
}
