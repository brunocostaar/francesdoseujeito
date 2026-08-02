import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { ClayLinkExterno } from "./ClayButton";

type Props = {
  /** Mensagem já pré-preenchida na conversa. Use os helpers de lib/whatsapp. */
  mensagem: string;
  children?: React.ReactNode;
  tamanho?: "sm" | "md" | "lg";
  variante?: "primaria" | "secundaria" | "whatsapp";
  className?: string;
};

export function WhatsAppButton({
  mensagem,
  children = "Falar no WhatsApp",
  tamanho = "md",
  variante = "whatsapp",
  className,
}: Props) {
  return (
    <ClayLinkExterno
      href={whatsappLink(mensagem)}
      variante={variante}
      tamanho={tamanho}
      className={className}
    >
      <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
      {children}
    </ClayLinkExterno>
  );
}
