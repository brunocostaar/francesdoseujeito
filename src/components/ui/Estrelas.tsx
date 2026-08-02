import { Star } from "lucide-react";

export function Estrelas({ nota }: { nota: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${nota} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= nota
              ? "fill-or text-or size-4"
              : "text-clay-deep size-4"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
