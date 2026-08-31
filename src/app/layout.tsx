import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { site } from "@/content/site";
import "./globals.css";

/*
  As duas famílias vêm da folha de marca (3a): Cormorant Garamond nos
  títulos, Jost no texto e na interface. Antes o site rodava Fraunces +
  Inter — dois serifados diferentes brigando na mesma tela (o logotipo
  em Cormorant ao lado de um H1 em Fraunces) era o que fazia a marca
  parecer colada por cima do site em vez de fazer parte dele.
*/
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const facebookAppId = process.env.FACEBOOK_APP_ID?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — aulas online de francês do A1 ao C2`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  keywords: [
    "aulas de francês online",
    "curso de francês",
    "DELF",
    "DALF",
    "TCF",
    "TEF",
    "professora de francês",
    "teste de nível de francês",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    locale: "pt_BR",
    siteName: site.nome,
    title: `${site.nome} — aulas online de francês`,
    description: site.descricao,
  },
  ...(facebookAppId ? { facebook: { appId: facebookAppId } } : {}),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${jost.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}
