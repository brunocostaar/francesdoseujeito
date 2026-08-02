import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { professora } from "@/content/professora";
import { site } from "@/content/site";

/*
  Cartão de link (WhatsApp, Instagram, Google, iMessage). O funil inteiro
  do site é link colado numa conversa, então esta imagem é a primeira coisa
  que a maioria das pessoas vê da escola — antes da home.

  Ela é gerada no build e vira um PNG estático; nada aqui roda em runtime.

  As fontes precisam ser TTF/OTF lidas do disco: o satori não entende woff2,
  e as variáveis do next/font só existem no CSS do site, não aqui. Por isso
  src/fonts/ existe, e por isso as famílias estão repetidas por extenso em
  vez de virem de globals.css.
*/

export const alt = `${site.nome} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#f6f2ea";
const CLAY = "#efe9de";
const ENCRE = "#12233d";
const ENCRE_SOFT = "#5c6273";
const BORDEAUX = "#8a2b33";
const OR = "#c0a46a";

/*
  A frase é a tagline da marca, quebrada em palavras (o porquê está lá
  embaixo, na div que as monta). Vem de site.ts em vez de estar escrita
  aqui para o cartão não ficar defasado se a assinatura mudar.

  O acento bordeaux cai nas três últimas palavras — é o fecho da frase,
  e a regra de UM acento por bloco continua valendo.
*/
const palavras = site.tagline.split(" ");
const titulo = palavras.map((texto, i) => ({
  texto,
  destaque: i >= palavras.length - 3,
}));

const ativo = [
  "Aulas ao vivo e individuais",
  "A1 ao C2",
  "DELF · DALF · TCF · TEF",
];

async function asset(...caminho: string[]) {
  return readFile(join(process.cwd(), ...caminho));
}

export default async function Image() {
  const [cormorant, jost, jostMedium, cachorro] = await Promise.all([
    asset("src", "fonts", "CormorantGaramond-SemiBold.ttf"),
    asset("src", "fonts", "Jost-Regular.ttf"),
    asset("src", "fonts", "Jost-Medium.ttf"),
    asset("public", "marca-cachorro.png"),
  ]);

  const cachorroSrc = `data:image/png;base64,${cachorro.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          backgroundColor: CREAM,
          /*
            As manchas difusas do hero. O satori não tem filter: blur, então
            o degradê radial faz o trabalho — que aqui até sai melhor, porque
            não custa raster nenhum.
          */
          backgroundImage: `radial-gradient(760px 520px at 6% -14%, rgba(192, 164, 106, 0.30), rgba(246, 242, 234, 0) 70%), radial-gradient(700px 500px at 104% 118%, rgba(138, 43, 51, 0.14), rgba(246, 242, 234, 0) 70%)`,
          fontFamily: "Jost",
          color: ENCRE,
        }}
      >
        {/* Marca — variante horizontal da folha 3a: ilustração, filete, texto. */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* next/image não existe aqui dentro: o satori só entende <img>. */}
          <img
            src={cachorroSrc}
            alt=""
            width={Math.round(112 * (473 / 528))}
            height={112}
          />
          <div
            style={{
              width: 1,
              height: 104,
              backgroundColor: OR,
              margin: "0 30px",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: 58,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              Francês
            </span>
            <span
              style={{
                fontSize: 17,
                letterSpacing: "0.44em",
                paddingLeft: "0.44em",
                color: ENCRE_SOFT,
                marginTop: 8,
              }}
            >
              do seu jeito
            </span>
            <span
              style={{
                fontFamily: "Jost",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.3em",
                paddingLeft: "0.3em",
                textTransform: "uppercase",
                color: BORDEAUX,
                marginTop: 12,
              }}
            >
              {professora.assinaturaMarca}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/*
            Palavra por palavra, não uma frase com <span> colorido dentro:
            o satori não quebra linha dentro de texto que tem elemento
            aninhado — a parte destacada sai inteira para fora da imagem.
            Com flexWrap quem quebra é o flexbox, que ele entende.
          */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Cormorant Garamond",
              fontSize: 68,
              lineHeight: 1.22,
              maxWidth: 940,
            }}
          >
            {titulo.map(({ texto, destaque }, i) => (
              <span
                key={`${texto}-${i}`}
                style={{
                  marginRight: 18,
                  color: destaque ? BORDEAUX : ENCRE,
                }}
              >
                {texto}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", marginTop: 44 }}>
            {ativo.map((texto) => (
              <div
                key={texto}
                style={{
                  display: "flex",
                  backgroundColor: CLAY,
                  borderRadius: 999,
                  padding: "16px 30px",
                  marginRight: 18,
                  fontSize: 24,
                  color: ENCRE,
                  // Uma sombra só: a receita .clay completa some no PNG.
                  boxShadow: "9px 9px 20px rgba(103, 88, 74, 0.16)",
                }}
              >
                {texto}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: cormorant,
          weight: 600,
          style: "normal",
        },
        { name: "Jost", data: jost, weight: 400, style: "normal" },
        { name: "Jost", data: jostMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
