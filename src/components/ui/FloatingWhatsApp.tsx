"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { msgGeral, whatsappLink } from "@/lib/whatsapp";

/**
 * Botão flutuante fixo. Só aparece depois de ~400px de rolagem, para
 * não competir com os CTAs do hero.
 */
export function FloatingWhatsApp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 400);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={whatsappLink(msgGeral())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={cn(
        "clay clay-bordeaux clay-press fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full",
        "transition-[opacity,transform] duration-300",
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  );
}
