import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          sobretitulo="Vos questions"
          titulo="Perguntas frequentes"
        />
        <div className="mt-12">
          <Accordion itens={faq} />
        </div>
      </div>
    </section>
  );
}
