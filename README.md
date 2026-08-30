# Francês do Seu Jeito

Site institucional de uma escola online de francês. Todo o funil de conversão
termina no **WhatsApp** — não há checkout, login nem backend.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · site 100% estático.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # gera as 11 páginas estáticas + robots, sitemap e cartão de link
pnpm lint
```

---

## ✅ Antes de publicar

Esses quatro pontos são obrigatórios. O site sobe funcionando sem eles, mas
com dados inventados.

1. **Número do WhatsApp** — `src/content/site.ts`, campos `whatsappNumber`
   (só dígitos, formato `55DDDNÚMERO`) e `whatsappDisplay`. É o único lugar do
   projeto onde o número aparece; todos os ~30 botões saem daí.
2. **Depoimentos** — `src/content/depoimentos.ts` está inteiro com textos
   **fictícios**. Publicar depoimento inventado como se fosse real é
   propaganda enganosa (CDC art. 37). Substituir por depoimentos reais ou
   remover a seção `<Depoimentos />` de `src/app/page.tsx`.
3. **Foto e bio da professora** — `src/content/professora.ts`. Para trocar o
   retrato de placeholder pela foto real, siga as instruções no topo de
   `src/components/ui/RetratoPlaceholder.tsx`.
4. **Preços, durações e e-mail** — `src/content/cursos.ts` e
   `src/content/site.ts`. Também revisar a estrutura das provas em
   `src/content/exames.ts` contra o site do France Éducation International:
   taxas e regras mudam por país e por centro.

---

## Deploy e domínio

Não há backend, banco nem variável secreta: a Vercel só precisa do repositório.
`pnpm build` roda com as configurações padrão e tudo sai como arquivo estático.

**O domínio `francesdoseujeito.com` ja foi registrado.**

```
NEXT_PUBLIC_SITE_URL = https://<o-projeto>.vercel.app
```

É essa URL que vira `metadataBase`, `sitemap.xml`, `robots.txt` e o endereço da
imagem de preview. Apontando para um domínio que não resolve, o WhatsApp mostra
o link sem imagem. No dia em que o domínio entrar no ar, **apague a variável** —
o padrão em `src/content/site.ts` já é o domínio definitivo. Deploys de preview
usam sempre a URL do próprio deploy, sem precisar de configuração.

### Cartão de link (`src/app/opengraph-image.tsx`)

É o que aparece quando alguém cola o link no WhatsApp ou no Instagram — na
prática, a primeira tela da escola. Gerado no build, vira PNG estático.

As fontes da marca estão em `src/fonts/` **em TTF** porque o gerador precisa
lê-las do disco: ele não entende woff2, e as fontes do `next/font` só existem no
CSS do site. São as mesmas famílias (Cormorant Garamond e Jost), sob licença
OFL, com o texto da licença ao lado dos arquivos.

---

## Onde mexer

Todo o conteúdo editável vive em `src/content/` — dá para trocar textos,
preços e questões sem abrir um componente.

| Arquivo                           | O que controla                             |
| --------------------------------- | ------------------------------------------ |
| `src/content/site.ts`           | nome, WhatsApp, redes, números do hero    |
| `src/content/professora.ts`     | bio e credenciais                          |
| `src/content/depoimentos.ts`    | depoimentos (hoje fictícios)              |
| `src/content/cursos.ts`         | os 6 níveis: preço, duração, conteúdo |
| `src/content/exames.ts`         | DELF/DALF e TCF/TEF                        |
| `src/content/faq.ts`            | perguntas frequentes                       |
| `src/content/teste/questoes.ts` | as 24 questões do teste de nível         |

Dois utilitários centrais:

- **`src/lib/whatsapp.ts`** — gerador único dos links. Nenhum componente monta
  uma URL de `wa.me` na mão; para mudar o texto de uma CTA, edite o helper
  correspondente (`msgCurso`, `msgExame`, `msgTesteNivel`, `msgGeral`,
  `msgAulaExperimental`).
- **`src/lib/nivel.ts`** — pontuação do teste de nível.

### Rotas

```
/                       landing page
/teste-de-nivel         quiz interativo
/cursos                 grade + tabela comparativa
/cursos/[nivel]         a1, a2, b1, b2, c1, c2 (estáticas)
/exames/[exame]         delf-dalf, tcf-tef (estáticas)
```

---

## Design system — claymorphism

Definido **uma vez** em `src/app/globals.css`, no topo do arquivo, junto das
regras que mantêm o visual contido. Resumo:

- `.clay` (elevado), `.clay-inset` (afundado), `.clay-press` (hover/active
  tátil) e as variantes de cor `.clay-bleu` / `.clay-corail` / `.clay-menthe`.
- Nunca escrever `box-shadow` solto num componente — a receita das sombras
  vive só no CSS.
- Superfície clay apenas em elemento interativo ou de conteúdo destacado.
  Clay dentro de clay achata a hierarquia.

**Não há dark mode**, por decisão: claymorphism depende da luz clara vinda de
cima-esquerda, e refazer as quatro sombras de cada variante para fundo escuro
dobra o trabalho sem retorno para este público.

---

## Como o teste de nível pontua

24 questões, 6 por nível, do A1 ao B2. O nível estimado é **o mais alto em que
o aluno acertou ao menos 4 das 6**, varrendo A1→B2 e parando no primeiro nível
em que ele falha.

O teto é o B2 de propósito: o teste não estima C1 nem C2, porque a distância
entre esses dois níveis não se mede por múltipla escolha. Quem passa no bloco
B2 recebe B2 e o convite para confirmar o nível numa conversa.

Seis itens por nível em vez de quatro: com 4 de 6 para passar, dois erros bobos
não derrubam o aluno um nível inteiro, e a chance de passar num bloco só no
chute cai de 5,1% para 3,8%.

O corte sequencial também é proposital: somar pontos daria crédito por acertos
isolados no B2 a quem ainda erra o presente do indicativo. Assim o resultado
é explicável para o aluno em uma frase.

Quem não atinge o mínimo nem no A1 recebe A1 — é o ponto de partida do curso,
não uma nota de reprovação.

Não há persistência: recarregar a página zera o teste. Refazer custa 5 minutos
e evita guardar qualquer dado do visitante.

---

## Fora de escopo nesta fase

Stripe e pagamentos online, área do aluno, CMS, blog, dark mode, versão em
francês, envio de e-mail. O contato acontece todo pelo WhatsApp.
