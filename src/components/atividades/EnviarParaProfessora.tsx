"use client";

import { Download, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ClayAction } from "@/components/ui/ClayButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { tituloAtividade, type Atividade } from "@/content/atividades";
import { site } from "@/content/site";
import { msgAtividade } from "@/lib/whatsapp";
import { textoPlano } from "./TextoRico";

type Props = {
  atividade: Atividade;
  escolhas: number[];
  acertos: number;
};

type Imagem = { blob: Blob; url: string };

/**
 * Fecho da atividade: o aluno manda o resultado para a professora.
 *
 * Dois caminhos, porque nenhum serve a todo mundo: a imagem leva as
 * questões erradas por extenso (é o que a professora corrige), e o texto
 * no WhatsApp funciona até onde o navegador não compartilha arquivo.
 *
 * A imagem é gerada assim que o resultado aparece e refeita quando o nome
 * muda. Gerar só no clique quebraria o compartilhamento no Safari, que
 * exige que navigator.share venha direto do toque, sem espera no meio.
 */
export function EnviarParaProfessora({ atividade, escolhas, acertos }: Props) {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState<Imagem | null>(null);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    let cancelado = false;
    const timer = setTimeout(async () => {
      const blob = await desenharResultado({ atividade, escolhas, acertos, nome });
      if (cancelado || !blob) return;
      setImagem({ blob, url: URL.createObjectURL(blob) });
    }, 350);
    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [atividade, escolhas, acertos, nome]);

  // Libera a URL da imagem anterior só depois que a nova entrou na tela.
  useEffect(() => {
    return () => {
      if (imagem) URL.revokeObjectURL(imagem.url);
    };
  }, [imagem]);

  const nomeArquivo = `atividade-${atividade.slug}${
    nome ? `-${paraSlug(nome)}` : ""
  }.png`;

  function baixar() {
    if (!imagem) return;
    const a = document.createElement("a");
    a.href = imagem.url;
    a.download = nomeArquivo;
    a.click();
    setAviso("Imagem salva. Agora é só anexar no WhatsApp da professora.");
  }

  async function compartilhar() {
    if (!imagem) return;
    const arquivo = new File([imagem.blob], nomeArquivo, { type: "image/png" });
    if (navigator.canShare?.({ files: [arquivo] })) {
      try {
        await navigator.share({
          files: [arquivo],
          title: tituloAtividade(atividade),
        });
        setAviso("");
      } catch (e) {
        // Fechar a folha de compartilhamento não é erro.
        if ((e as DOMException).name !== "AbortError") baixar();
      }
    } else {
      baixar();
    }
  }

  const erradas = atividade.questoes
    .map((q, i) => (escolhas[i] === q.correta ? 0 : i + 1))
    .filter(Boolean);

  return (
    <section
      aria-labelledby="enviar-titulo"
      className="clay clay-blanc mt-10 p-6 sm:p-8"
    >
      <h3
        id="enviar-titulo"
        className="font-display text-encre text-2xl font-semibold"
      >
        Enviar para a professora
      </h3>
      <p className="text-encre-soft mt-1 text-pretty">
        Coloque seu nome e mande a imagem com o resultado, ou só o resumo em
        texto pelo WhatsApp.
      </p>

      <label
        htmlFor="nome-aluno"
        className="text-encre mt-6 block text-sm font-semibold"
      >
        Seu nome
      </label>
      <input
        id="nome-aluno"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Ex.: Ana Souza"
        autoComplete="name"
        className="clay-inset text-encre placeholder:text-encre-soft/60 mt-2 w-full px-5 py-3.5 outline-none"
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-start">
        <figure className="clay-inset overflow-hidden p-2">
          {imagem ? (
            // Blob local: o next/image não otimiza nem precisa.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagem.url}
              alt="Prévia da imagem do seu resultado"
              className="block w-full rounded-[14px]"
            />
          ) : (
            <div className="bg-cream aspect-[3/4] animate-pulse rounded-[14px]" />
          )}
          <figcaption className="text-encre-soft px-1 pt-2 text-center text-xs">
            Prévia da imagem
          </figcaption>
        </figure>

        <div className="flex flex-col gap-3">
          <ClayAction
            onClick={compartilhar}
            disabled={!imagem}
            className="disabled:opacity-40"
          >
            <Share2 className="size-5" aria-hidden="true" />
            Enviar imagem
          </ClayAction>
          <ClayAction
            variante="secundaria"
            onClick={baixar}
            disabled={!imagem}
            className="disabled:opacity-40"
          >
            <Download className="size-5" aria-hidden="true" />
            Baixar imagem
          </ClayAction>
          <WhatsAppButton
            mensagem={msgAtividade({
              nome: nome.trim(),
              titulo: tituloAtividade(atividade),
              nivel: atividade.nivel.toUpperCase(),
              acertos,
              total: atividade.questoes.length,
              erradas,
            })}
          >
            Mandar resumo em texto
          </WhatsAppButton>
          <p className="text-encre-soft min-h-5 text-sm" aria-live="polite">
            {aviso}
          </p>
        </div>
      </div>
    </section>
  );
}

function paraSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ------------------------------------------------------------------ */
/*  Imagem do resultado                                                */
/* ------------------------------------------------------------------ */

const COR = {
  cream: "#f6f2ea",
  blanc: "#fffdf9",
  clayDeep: "#d8d1c4",
  encre: "#12233d",
  encreSoft: "#5c6273",
  bordeaux: "#8a2b33",
  or: "#c0a46a",
};

const LARGURA = 1080;
const MARGEM = 48;
const RECUO = 88;
const MIOLO = LARGURA - 2 * RECUO;

function carregarImagem(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Desenha o resultado na paleta e nas fontes do site. As famílias vêm das
 * variáveis do next/font em <html>, que é onde elas têm o nome real.
 */
async function desenharResultado({
  atividade,
  escolhas,
  acertos,
  nome,
}: Props & { nome: string }): Promise<Blob | null> {
  const estilo = getComputedStyle(document.documentElement);
  const serif =
    estilo.getPropertyValue("--font-cormorant").trim() || "Georgia, serif";
  const sans =
    estilo.getPropertyValue("--font-jost").trim() || "system-ui, sans-serif";

  await Promise.all([
    document.fonts.load(`600 64px ${serif}`),
    document.fonts.load(`500 28px ${sans}`),
    document.fonts.load(`400 28px ${sans}`),
  ]).catch(() => {});
  const logo = await carregarImagem("/marca-cachorro.png");

  // Desenha numa camada alta e recorta no fim: a altura depende de
  // quantas questões o aluno errou.
  const camada = document.createElement("canvas");
  camada.width = LARGURA;
  camada.height = 6000;
  const x = camada.getContext("2d");
  if (!x) return null;

  const fonte = (peso: number, tamanho: number, familia: string) => {
    x.font = `${peso} ${tamanho}px ${familia}`;
  };
  const quebrar = (texto: string, largura: number) => {
    const linhas: string[] = [];
    let linha = "";
    for (const palavra of texto.split(" ")) {
      const teste = linha ? `${linha} ${palavra}` : palavra;
      if (x.measureText(teste).width > largura && linha) {
        linhas.push(linha);
        linha = palavra;
      } else linha = teste;
    }
    if (linha) linhas.push(linha);
    return linhas;
  };
  const paragrafo = (texto: string, y: number, alturaLinha: number) => {
    for (const l of quebrar(texto, MIOLO)) {
      x.fillText(l, RECUO, y);
      y += alturaLinha;
    }
    return y;
  };

  x.textBaseline = "alphabetic";
  let y = MARGEM + 64;

  // Cabeçalho: marca à esquerda, nível e data à direita.
  if (logo) {
    const h = 110;
    x.drawImage(logo, RECUO, y - 30, (h * logo.width) / logo.height, h);
  }
  const textoMarcaX = RECUO + (logo ? 120 : 0);
  x.fillStyle = COR.encre;
  fonte(500, 46, serif);
  x.fillText("Francês do Seu Jeito", textoMarcaX, y + 26);
  x.fillStyle = COR.encreSoft;
  fonte(500, 22, sans);
  x.fillText(
    `ATIVIDADES ONLINE · ${atividade.nivel.toUpperCase()}`,
    textoMarcaX,
    y + 62,
  );
  y += 120;

  x.fillStyle = COR.or;
  x.fillRect(RECUO, y, MIOLO, 3);
  y += 86;

  // Título em duas cores, como na página.
  let tamanhoTitulo = 68;
  fonte(600, tamanhoTitulo, serif);
  const larguraTitulo = () =>
    x.measureText(`${atividade.destaque} ${atividade.resto}`).width;
  while (larguraTitulo() > MIOLO && tamanhoTitulo > 40) {
    tamanhoTitulo -= 4;
    fonte(600, tamanhoTitulo, serif);
  }
  x.fillStyle = COR.bordeaux;
  x.fillText(atividade.destaque, RECUO, y);
  const larguraDestaque = x.measureText(`${atividade.destaque} `).width;
  x.fillStyle = COR.encre;
  x.fillText(atividade.resto, RECUO + larguraDestaque, y);
  y += 64;

  fonte(400, 28, sans);
  x.fillStyle = COR.encreSoft;
  const data = new Date().toLocaleDateString("pt-BR");
  x.fillText(`${nome.trim() || "Aluno(a)"} · ${data}`, RECUO, y);
  y += 70;

  // Nota no selo dourado, com a leitura ao lado.
  const total = atividade.questoes.length;
  const raio = 84;
  x.fillStyle = COR.or;
  x.beginPath();
  x.arc(RECUO + raio, y + raio, raio, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = COR.encre;
  fonte(600, 64, serif);
  x.textAlign = "center";
  x.fillText(`${acertos}/${total}`, RECUO + raio, y + raio + 22);
  x.textAlign = "left";

  const textoNotaX = RECUO + raio * 2 + 40;
  const pct = acertos / total;
  const [titulo, sub] =
    pct === 1
      ? ["Parfait !", "Acertou todas as questões."]
      : pct >= 0.7
        ? ["Très bien !", `Acertou ${acertos} de ${total} questões.`]
        : pct >= 0.4
          ? ["Pas mal !", `Acertou ${acertos} de ${total} questões.`]
          : ["Courage !", `Acertou ${acertos} de ${total} questões.`];
  fonte(600, 52, serif);
  x.fillText(titulo, textoNotaX, y + raio - 6);
  fonte(400, 28, sans);
  x.fillStyle = COR.encreSoft;
  x.fillText(sub, textoNotaX, y + raio + 38);
  y += raio * 2 + 80;

  // Questões erradas, por extenso.
  const erradas = atividade.questoes
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => escolhas[i] !== q.correta);

  if (erradas.length > 0) {
    x.fillStyle = COR.encre;
    fonte(600, 40, serif);
    x.fillText("Para revisar", RECUO, y);
    y += 44;

    for (const { q, i } of erradas) {
      x.fillStyle = COR.clayDeep;
      x.fillRect(RECUO, y, MIOLO, 2);
      y += 48;

      x.fillStyle = COR.encreSoft;
      fonte(500, 20, sans);
      x.fillText(`QUESTÃO ${i + 1} · ${q.tipo.toUpperCase()}`, RECUO, y);
      y += 42;

      x.fillStyle = COR.encre;
      fonte(500, 28, sans);
      y = paragrafo(textoPlano(q.enunciado), y, 40);
      y += 8;

      x.fillStyle = COR.bordeaux;
      fonte(400, 26, sans);
      y = paragrafo(`✗  ${textoPlano(q.opcoes[escolhas[i]])}`, y, 38);
      x.fillStyle = COR.encre;
      fonte(500, 26, sans);
      y = paragrafo(`✓  ${textoPlano(q.opcoes[q.correta])}`, y, 38);
      y += 12;
    }
  }

  y += 20;
  x.fillStyle = COR.or;
  x.fillRect(RECUO, y, MIOLO, 3);
  y += 56;
  x.fillStyle = COR.encreSoft;
  fonte(400, 22, sans);
  x.textAlign = "center";
  x.fillText(new URL(site.url).host, LARGURA / 2, y);
  y += 40 + MARGEM;

  // Composição final: fundo Crème, cartão claro, conteúdo por cima.
  const saida = document.createElement("canvas");
  saida.width = LARGURA;
  saida.height = y + MARGEM;
  const s = saida.getContext("2d");
  if (!s) return null;
  s.fillStyle = COR.cream;
  s.fillRect(0, 0, LARGURA, saida.height);
  s.shadowColor = "rgba(103, 88, 74, 0.16)";
  s.shadowBlur = 40;
  s.shadowOffsetX = 10;
  s.shadowOffsetY = 14;
  s.fillStyle = COR.blanc;
  s.beginPath();
  s.roundRect(MARGEM, MARGEM, LARGURA - 2 * MARGEM, y - MARGEM, 40);
  s.fill();
  s.shadowColor = "transparent";
  s.drawImage(camada, 0, 0);

  return new Promise((resolve) => saida.toBlob(resolve, "image/png"));
}
