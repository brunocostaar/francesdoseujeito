import type { Nivel } from "@/content/cursos";

/**
 * Atividades online: tarefas de casa com um quadro de revisão e dez
 * questões de múltipla escolha, cada uma com explicação.
 *
 * Os textos aceitam só o HTML inline mínimo — <i>, <b>, <code> e <br> — e
 * "___" marca a lacuna da questão. São renderizados por TextoRico, então
 * nada de HTML vindo de fora daqui.
 *
 * A ordem dentro do array é a ordem pedagógica em que aparecem no hub.
 * Para um nível novo, basta acrescentar atividades com aquele `nivel`:
 * o hub, as rotas e o sitemap saem daqui.
 */

export type BlocoQuadro =
  | {
      tipo: "tabela";
      titulo: string;
      subtitulo: string;
      /** [português ou regra, francês]. */
      linhas: [string, string][];
    }
  | {
      tipo: "escala";
      /** `pos` é a posição na régua, de 0 a 100. */
      marcas: { rotulo: string; valor: string; pos: number }[];
    };

export type QuestaoAtividade = {
  /** Rótulo curto da habilidade: "Tradução", "Caça ao erro"… */
  tipo: string;
  enunciado: string;
  opcoes: string[];
  /** Índice da opção correta em `opcoes`. */
  correta: number;
  explicacao: string;
};

export type Atividade = {
  slug: string;
  nivel: Nivel;
  /** Presente quando a atividade continua outra do mesmo tema. */
  parte?: number;
  /** Título em duas partes: `destaque` sai em bordeaux, `resto` em tinta. */
  destaque: string;
  resto: string;
  descricao: string;
  quadro: {
    titulo: string;
    subtitulo: string;
    blocos: BlocoQuadro[];
    dica: string;
  };
  exemplos: { rotulo: string; itens: string[] };
  questoes: QuestaoAtividade[];
};

export const atividades: Atividade[] = [
  {
    slug: "articles-2",
    nivel: "a1",
    parte: 2,
    destaque: "Les",
    resto: "articles",
    descricao:
      "Agora você vai usar de depois de adjetivo plural e de quantidades, escolher entre definido e partitivo, usar as contrações au, aux, du, des e lembrar que c'est não muda.",
    quadro: {
      titulo: "Les articles : pièges",
      subtitulo: "exceções e armadilhas dos artigos",
      blocos: [
        {
          tipo: "tabela",
          titulo: "de + adjectif",
          subtitulo: "adjetivo antes do plural",
          linhas: [
            ["sem adjetivo", "des fruits"],
            ["adjetivo depois", "des fruits frais"],
            ["adjetivo antes", "de beaux fruits"],
            ["adjetivo antes", "de bons amis"],
            ["negação", "pas de fruits"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "quantités",
          subtitulo: "quantidade + de, sem artigo",
          linhas: [
            ["muito", "beaucoup de pain"],
            ["um quilo", "un kilo de riz"],
            ["um pouco", "un peu de lait"],
            ["uma garrafa", "une bouteille d'eau"],
            ["demais", "trop de bruit"],
            ["vogal", "beaucoup d'amis"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "à / de + article",
          subtitulo: "contrações obrigatórias",
          linhas: [
            ["à + le", "au marché"],
            ["à + les", "aux courses"],
            ["de + le", "du métro"],
            ["de + les", "des voisins"],
            ["à la, à l'", "à la gare, à l'école"],
            ["de la, de l'", "de la ville, de l'hôtel"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "goût ou repas ?",
          subtitulo: "gosto x consumo",
          linhas: [
            ["gosto", "J'aime le fromage"],
            ["consumo", "Je mange du fromage"],
            ["negação", "pas de fromage"],
            ["c'est", "C'est un livre"],
            ["ce n'est pas", "Ce n'est pas un livre"],
          ],
        },
      ],
      dica:
        "Atenção: depois de <code>ne... pas</code>, <code>un/une/des</code> viram <code>de</code>, mas depois de <code>c'est</code> não: <i>Ce n'est pas un stylo.</i> E depois de uma quantidade usamos sempre <code>de</code>, sem artigo: <i>un kilo de tomates</i>.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "de belles pommes",
        "beaucoup de travail",
        "un peu d'eau",
        "Je vais au marché",
        "Elle parle aux voisins",
        "Il revient du bureau",
        "J'aime la musique",
      ],
    },
    questoes: [
      {
        tipo: "Adjetivo antes",
        enunciado: "Au marché, elle achète ___ belles pommes pour le dessert.",
        opcoes: ["des", "du", "d'", "de"],
        correta: 3,
        explicacao:
          "Quando o adjetivo vem antes de um substantivo plural, <i>des</i> vira <i>de</i>: <i>de belles pommes</i>.",
      },
      {
        tipo: "Quantidade",
        enunciado: "Nous avons beaucoup ___ travail cette semaine.",
        opcoes: ["du", "des", "de", "le"],
        correta: 2,
        explicacao:
          "Depois de <i>beaucoup</i>, usamos <i>de</i> sem artigo: <i>beaucoup de travail</i>.",
      },
      {
        tipo: "Contração",
        enunciado: "Les enfants jouent ___ cartes dans le salon.",
        opcoes: ["aux", "des", "au", "à les"],
        correta: 0,
        explicacao:
          "<i>À</i> + <i>les</i> vira sempre <i>aux</i>: <i>jouer aux cartes</i>. A forma <i>à les</i> não existe.",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— Tu aimes les boissons gazeuses ?<br>— Non, je bois toujours ___ eau.",
        opcoes: ["l'", "de l'", "d'", "des"],
        correta: 1,
        explicacao:
          "Aqui falamos do que ela bebe, e não de gosto. Então usamos o partitivo, que antes de vogal é <i>de l'</i>: <i>de l'eau</i>.",
      },
      {
        tipo: "C'est",
        enunciado: "Ce n'est pas ___ stylo, c'est un crayon.",
        opcoes: ["de", "d'un", "des", "un"],
        correta: 3,
        explicacao:
          "Depois de <i>c'est</i> e <i>ce n'est pas</i>, o artigo não vira <i>de</i>: <i>Ce n'est pas un stylo.</i>",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Il y a beaucoup de touristes en été.",
          "Nous prenons un kilo des tomates.",
          "Elle boit un peu de lait.",
          "Je ne veux pas de dessert.",
        ],
        correta: 1,
        explicacao:
          "Depois de <i>un kilo</i>, usamos <i>de</i> sem artigo: <i>un kilo de tomates</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Il téléphone au médecin.",
          "Nous revenons du marché.",
          "Elle parle à les voisins.",
          "Tu penses aux vacances ?",
        ],
        correta: 2,
        explicacao:
          "<i>À</i> + <i>les</i> vira obrigatoriamente <i>aux</i>: <i>aux voisins</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>\"Ela compra bons legumes na feira\"</b>?",
        opcoes: [
          "Elle achète de bons légumes à le marché.",
          "Elle achète du bons légumes au marché.",
          "Elle achète bons légumes au marché.",
          "Elle achète de bons légumes au marché.",
        ],
        correta: 3,
        explicacao:
          "Duas regras: <i>de</i> antes de adjetivo plural (<i>de bons légumes</i>) e <i>à</i> + <i>le</i> = <i>au</i> (<i>au marché</i>).",
      },
      {
        tipo: "Escolha",
        enunciado: "Como se diz <b>\"Preciso de um quilo de açúcar\"</b>?",
        opcoes: [
          "J'ai besoin d'un kilo du sucre.",
          "J'ai besoin un kilo de sucre.",
          "J'ai besoin d'un kilo de sucre.",
          "J'ai besoin de un kilo de sucre.",
        ],
        correta: 2,
        explicacao:
          "<i>Avoir besoin de</i> + <i>un</i> fica <i>d'un</i> (elisão), e depois da quantidade vem <i>de</i> sem artigo: <i>un kilo de sucre</i>.",
      },
      {
        tipo: "Gosto ou consumo",
        enunciado: "J'adore ___ cuisine italienne, surtout les pâtes.",
        opcoes: ["la", "de la", "des", "de"],
        correta: 0,
        explicacao:
          "Com verbos de gosto como <i>adorer</i>, usamos o artigo definido: <i>J'adore la cuisine italienne.</i>",
      },
    ],
  },
  {
    slug: "genre-et-nombre-2",
    nivel: "a1",
    parte: 2,
    destaque: "Masculin,",
    resto: "féminin et pluriel",
    descricao:
      "Agora vêm os femininos irregulares (belle, nouvelle, vieille, blanche), as formas bel, nouvel e vieil, os plurais especiais (yeux, travaux, bijoux) e palavras com gênero diferente do português.",
    quadro: {
      titulo: "Genre et nombre : pièges",
      subtitulo: "exceções e armadilhas",
      blocos: [
        {
          tipo: "tabela",
          titulo: "beau · nouveau · vieux",
          subtitulo: "formas especiais",
          linhas: [
            ["masc. / fem.", "beau / belle"],
            ["masc. / fem.", "nouveau / nouvelle"],
            ["masc. / fem.", "vieux / vieille"],
            ["antes de vogal", "bel · nouvel · vieil"],
            ["plural", "beaux · nouveaux · vieux"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "autres féminins",
          subtitulo: "mudam mais que o -e",
          linhas: [
            ["blanc", "blanche"],
            ["long", "longue"],
            ["doux", "douce"],
            ["frais", "fraîche"],
            ["gros", "grosse"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "pluriels spéciaux",
          subtitulo: "exceções do plural",
          linhas: [
            ["un œil", "des yeux"],
            ["un travail", "des travaux"],
            ["un bijou", "des bijoux"],
            ["un cheval", "des chevaux"],
            ["un bal", "des bals"],
            ["un festival", "des festivals"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "genre piège",
          subtitulo: "diferente do português",
          linhas: [
            ["o leite", "le lait"],
            ["o sal", "le sel"],
            ["o mar", "la mer"],
            ["o carro", "la voiture"],
            ["a viagem", "le voyage"],
            ["o dente", "la dent"],
          ],
        },
      ],
      dica:
        "Atenção: <code>bel</code>, <code>nouvel</code> e <code>vieil</code> só aparecem antes de um substantivo masculino que começa com vogal: <i>un bel appartement</i>. Antes de consoante, usamos <i>beau</i>: <i>un beau jardin</i>.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "un bel hôtel",
        "une belle ville",
        "un vieil ami",
        "une vieille maison",
        "des yeux bleus",
        "des travaux",
        "de beaux bijoux",
      ],
    },
    questoes: [
      {
        tipo: "Feminino",
        enunciado: "Cette robe est très ___.",
        opcoes: ["belle", "beau", "bel", "belles"],
        correta: 0,
        explicacao:
          "<i>Robe</i> é feminino singular, então usamos <i>belle</i>: <i>une belle robe</i>.",
      },
      {
        tipo: "Antes de vogal",
        enunciado: "C'est un ___ appartement près du métro.",
        opcoes: ["beau", "belle", "beaux", "bel"],
        correta: 3,
        explicacao:
          "Antes de substantivo masculino que começa com vogal, <i>beau</i> vira <i>bel</i>: <i>un bel appartement</i>.",
      },
      {
        tipo: "Plural",
        enunciado: "Ma fille a de grands ___ bleus.",
        opcoes: ["yeux", "œils", "œil", "yeus"],
        correta: 0,
        explicacao: "O plural de <i>œil</i> é irregular: <i>des yeux</i>.",
      },
      {
        tipo: "Plural",
        enunciado: "Il y a des ___ dans ma rue depuis lundi.",
        opcoes: ["travals", "travaus", "travaux", "travailles"],
        correta: 2,
        explicacao:
          "<i>Travail</i> é uma exceção: no plural vira <i>travaux</i> (aqui, obras). A maioria das palavras em -ail só ganha -s: <i>des détails</i>.",
      },
      {
        tipo: "Fem. e plural",
        enunciado: "Elle achète des pommes ___ au marché.",
        opcoes: ["frais", "fraîches", "fraîche", "fraîchs"],
        correta: 1,
        explicacao:
          "<i>Pommes</i> é feminino plural. O feminino de <i>frais</i> é <i>fraîche</i> (com acento circunflexo) e o plural leva <i>-s</i>: <i>fraîches</i>.",
      },
      {
        tipo: "Gênero",
        enunciado: "Como se diz <b>\"O leite está na geladeira\"</b>?",
        opcoes: [
          "La lait est au frigo.",
          "Les lait est au frigo.",
          "Le lait est à la frigo.",
          "Le lait est au frigo.",
        ],
        correta: 3,
        explicacao:
          "<i>Lait</i> é masculino em francês: <i>le lait</i>. E <i>frigo</i> também é masculino, por isso <i>au frigo</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Mon voyage est long.",
          "Ma voiture est blanche.",
          "Le mer est froide.",
          "Ces fleurs sont belles.",
        ],
        correta: 2,
        explicacao:
          "<i>Mer</i> é feminino em francês, diferente do português: <i>la mer</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Elle est douce et gentille.",
          "Ce sont de vieux chevaux.",
          "Mon voisin est un vieil homme.",
          "Ma voisine est une vieux dame.",
        ],
        correta: 3,
        explicacao:
          "Antes de <i>dame</i> (feminino), usamos <i>vieille</i>, e não <i>vieux</i>.",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— Tu aimes ton nouvel appartement ?<br>— Oui, et ma ___ cuisine est très grande.",
        opcoes: ["nouveau", "nouvel", "nouvelle", "nouvelles"],
        correta: 2,
        explicacao:
          "<i>Cuisine</i> é feminino singular e começa com consoante, então: <i>nouvelle</i>. <i>Nouvel</i> só vale antes de masculino com vogal.",
      },
      {
        tipo: "Dois em um",
        enunciado: "Ce sont de ___ bijoux.",
        opcoes: ["beaux", "beau", "bel", "belles"],
        correta: 0,
        explicacao:
          "<i>Bijou</i> faz plural em <i>-x</i> (<i>bijoux</i>) e é masculino, então o adjetivo fica <i>beaux</i>. Antes de adjetivo plural, <i>des</i> vira <i>de</i>.",
      },
    ],
  },
  {
    slug: "pronoms-sujets",
    nivel: "a1",
    destaque: "Les pronoms",
    resto: "sujets",
    descricao: "Os pronomes sujeitos.",
    quadro: {
      titulo: "Les pronoms sujets",
      subtitulo: "quem faz a ação",
      blocos: [
        {
          tipo: "tabela",
          titulo: "singulier",
          subtitulo: "uma pessoa",
          linhas: [
            ["eu", "je"],
            ["eu (antes de vogal)", "j'"],
            ["tu (informal)", "tu"],
            ["ele", "il"],
            ["ela", "elle"],
            ["a gente, nós", "on"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "pluriel",
          subtitulo: "várias pessoas",
          linhas: [
            ["nós", "nous"],
            ["vocês, o senhor", "vous"],
            ["eles (grupo misto)", "ils"],
            ["elas", "elles"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "tu ou vous ?",
          subtitulo: "informal ou formal",
          linhas: [
            ["amigo, criança", "tu"],
            ["professor, chefe", "vous"],
            ["desconhecido", "vous"],
            ["duas ou mais pessoas", "vous"],
          ],
        },
      ],
      dica:
        "Atenção: <code>je</code> vira <code>j'</code> antes de vogal: <i>J'aime.</i> No dia a dia, <code>on</code> é muito usado no lugar de <code>nous</code>, e <code>ils</code> serve para um grupo com homens e mulheres.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "Je suis brésilien",
        "Tu as faim ?",
        "Il habite à Paris",
        "Elle est grande",
        "On mange",
        "Nous sommes amis",
        "Vous êtes français ?",
        "Ils jouent",
        "Elles dansent",
      ],
    },
    questoes: [
      {
        tipo: "Complete",
        enunciado: "Marie est ma sœur. ___ habite à Lyon.",
        opcoes: ["Il", "Elle", "Elles", "On"],
        correta: 1,
        explicacao:
          "<i>Marie</i> é uma mulher, então usamos <i>elle</i>: <i>Elle habite à Lyon.</i>",
      },
      {
        tipo: "Elisão",
        enunciado: "___aime le café.",
        opcoes: ["Je", "Nous", "Vous", "J'"],
        correta: 3,
        explicacao:
          "<i>Je</i> vira <i>j'</i> antes de vogal ou <i>h</i> mudo: <i>J'aime</i>, <i>J'habite</i>.",
      },
      {
        tipo: "Tu ou vous",
        enunciado:
          "Você fala com a sua professora, de forma formal: <b>\"___ êtes française ?\"</b>",
        opcoes: ["Tu", "Il", "Vous", "Elles"],
        correta: 2,
        explicacao:
          "Com professores, chefes e desconhecidos usamos <i>vous</i>, a forma de respeito: <i>Vous êtes française ?</i>",
      },
      {
        tipo: "Grupo misto",
        enunciado: "Léa et Paul sont amis. ___ jouent au foot.",
        opcoes: ["Ils", "Elle", "Il", "Elles"],
        correta: 0,
        explicacao:
          "Para um grupo com uma mulher e um homem, usamos <i>ils</i>, o masculino plural: <i>Ils jouent au foot.</i>",
      },
      {
        tipo: "Tradução",
        enunciado:
          "Como se diz <b>\"Nós comemos uma pizza\"</b> de forma informal, com <i>on</i>?",
        opcoes: [
          "Il mange une pizza.",
          "Ils mange une pizza.",
          "On mangent une pizza.",
          "On mange une pizza.",
        ],
        correta: 3,
        explicacao:
          "<i>On</i> significa \"a gente\" e usa o verbo na forma de <i>il/elle</i>: <i>On mange une pizza.</i>",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Nous sommes français.",
          "J'habite à Paris.",
          "Je habite à Paris.",
          "Elle est grande.",
        ],
        correta: 2,
        explicacao:
          "Antes de vogal ou <i>h</i> mudo, <i>je</i> vira <i>j'</i>: <i>J'habite</i>.",
      },
      {
        tipo: "Diálogo",
        enunciado: "— Vous êtes de Rio ?<br>— Oui, ___ sommes de Rio.",
        opcoes: ["nous", "on", "elles", "je"],
        correta: 0,
        explicacao:
          "O verbo <i>sommes</i> combina com <i>nous</i>: <i>nous sommes</i>. Com <i>on</i>, diríamos <i>on est</i>.",
      },
      {
        tipo: "Complete",
        enunciado: "Anna et Julie sont sœurs. ___ sont grandes.",
        opcoes: ["Ils", "Elles", "Elle", "Vous"],
        correta: 1,
        explicacao:
          "Para um grupo só de mulheres, usamos <i>elles</i>: <i>Elles sont grandes.</i>",
      },
      {
        tipo: "Tradução",
        enunciado:
          "Como se diz <b>\"Você é alto?\"</b>, falando com o seu melhor amigo?",
        opcoes: [
          "Vous est grand ?",
          "Il es grand ?",
          "Tu est grand ?",
          "Tu es grand ?",
        ],
        correta: 3,
        explicacao:
          "Com um amigo usamos <i>tu</i>, e o verbo <i>être</i> fica <i>tu es</i>: <i>Tu es grand ?</i>",
      },
      {
        tipo: "Complete",
        enunciado: "Mon père est médecin. ___ travaille à l'hôpital.",
        opcoes: ["Ils", "Il", "Elle", "Tu"],
        correta: 1,
        explicacao:
          "<i>Mon père</i> é um homem, então usamos <i>il</i>: <i>Il travaille à l'hôpital.</i>",
      },
    ],
  },
  {
    slug: "etre-et-avoir",
    nivel: "a1",
    destaque: "Être",
    resto: "et avoir",
    descricao:
      "A conjugação dos verbos être (ser/estar) e avoir (ter) no presente.",
    quadro: {
      titulo: "Le présent de l'indicatif",
      subtitulo: "os dois verbos mais usados do francês",
      blocos: [
        {
          tipo: "tabela",
          titulo: "être",
          subtitulo: "ser / estar",
          linhas: [
            ["je", "suis"],
            ["tu", "es"],
            ["il / elle / on", "est"],
            ["nous", "sommes"],
            ["vous", "êtes"],
            ["ils / elles", "sont"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "avoir",
          subtitulo: "ter",
          linhas: [
            ["j'", "ai"],
            ["tu", "as"],
            ["il / elle / on", "a"],
            ["nous", "avons"],
            ["vous", "avez"],
            ["ils / elles", "ont"],
          ],
        },
      ],
      dica:
        "Atenção: antes de vogal, <code>je</code> vira <code>j'</code> (j'ai). Idade, fome, sede, frio, calor e medo usam <code>avoir</code>: j'ai 20 ans, j'ai faim. Não confunda <code>sont</code> (são) com <code>ont</code> (têm).",
    },
    exemplos: {
      rotulo: "Expressões com avoir",
      itens: [
        "avoir faim = estar com fome",
        "avoir soif = estar com sede",
        "avoir froid = estar com frio",
        "avoir peur = ter medo",
        "avoir … ans = ter … anos",
      ],
    },
    questoes: [
      {
        tipo: "Complete",
        enunciado: "Je ___ brésilienne.",
        opcoes: ["ai", "suis", "es", "est"],
        correta: 1,
        explicacao:
          "Nacionalidade usa <i>être</i>. Com <i>je</i>, a forma é <i>suis</i>: <i>Je suis brésilienne</i>.",
      },
      {
        tipo: "Complete",
        enunciado: "Nous ___ deux chats à la maison.",
        opcoes: ["sommes", "avons", "avez", "ont"],
        correta: 1,
        explicacao:
          "Possuir algo é <i>avoir</i>. Com <i>nous</i>, fica <i>avons</i>.",
      },
      {
        tipo: "Complete",
        enunciado: "Tu ___ fatigué aujourd'hui ?",
        opcoes: ["es", "est", "as", "a"],
        correta: 0,
        explicacao:
          "Estado (cansado) usa <i>être</i>. Com <i>tu</i>, a forma é <i>es</i>, sem o <i>t</i> final.",
      },
      {
        tipo: "Idade",
        enunciado: "Como se diz <b>“Eles têm vinte anos”</b>?",
        opcoes: [
          "Ils sont vingt ans.",
          "Ils ont vingt ans.",
          "Ils a vingt ans.",
          "Ils sommes vingt ans.",
        ],
        correta: 1,
        explicacao:
          "Em francês, idade usa <i>avoir</i>, nunca <i>être</i>. Com <i>ils</i>, a forma é <i>ont</i>.",
      },
      {
        tipo: "Complete",
        enunciado: "Vous ___ professeur de français ?",
        opcoes: ["avez", "est", "êtes", "sont"],
        correta: 2,
        explicacao:
          "Profissão usa <i>être</i>. Com <i>vous</i>, a forma é <i>êtes</i>, com acento circunflexo.",
      },
      {
        tipo: "Complete",
        enunciado: "Elle ___ une sœur et un frère.",
        opcoes: ["a", "est", "as", "ont"],
        correta: 0,
        explicacao:
          "Ter irmãos é <i>avoir</i>. Com <i>elle</i>, a forma é <i>a</i>, sem acento. (<i>à</i> com acento é preposição.)",
      },
      {
        tipo: "Sont ou ont ?",
        enunciado: "Les enfants ___ dans le jardin.",
        opcoes: ["ont", "sont", "son", "est"],
        correta: 1,
        explicacao:
          "Aqui é <i>estar</i> (localização), então <i>être</i>: <i>ils sont</i>. Dica: <i>sont</i> = são/estão, <i>ont</i> = têm.",
      },
      {
        tipo: "Expressão",
        enunciado: "O que significa <b>“J'ai faim”</b>?",
        opcoes: [
          "Eu sou faminto",
          "Eu tenho fama",
          "Estou com fome",
          "Eu fiz a fome",
        ],
        correta: 2,
        explicacao:
          "<i>Avoir faim</i> = estar com fome. Em português usamos “estar”, mas em francês é <i>avoir</i>.",
      },
      {
        tipo: "Negação",
        enunciado: "Escolha a frase correta na negativa:",
        opcoes: [
          "Je ne suis pas de voiture.",
          "Je n'ai pas de voiture.",
          "Je ne ai pas voiture.",
          "J'ai ne pas de voiture.",
        ],
        correta: 1,
        explicacao:
          "Ter carro é <i>avoir</i>. Na negação, <i>ne</i> vira <i>n'</i> antes de vogal e fica em volta do verbo: <i>je n'ai pas de</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Nous sommes contents.",
          "On a un chien.",
          "Je ai froid.",
          "Vous avez raison.",
        ],
        correta: 2,
        explicacao:
          "Antes de vogal, <i>je</i> perde o <i>e</i>: o certo é <i>J'ai froid</i> (estou com frio).",
      },
    ],
  },
  {
    slug: "verbes-au-present",
    nivel: "a1",
    destaque: "Le présent",
    resto: "des verbes",
    descricao:
      "Os verbos essenciais no presente: os verbos em -er (como parler) e os irregulares aller, faire, vouloir e pouvoir.",
    quadro: {
      titulo: "Les verbes au présent",
      subtitulo: "verbos em -er e irregulares comuns",
      blocos: [
        {
          tipo: "tabela",
          titulo: "-er (parler)",
          subtitulo: "falar · verbos regulares",
          linhas: [
            ["je", "parle"],
            ["tu", "parles"],
            ["il / elle", "parle"],
            ["nous", "parlons"],
            ["vous", "parlez"],
            ["ils / elles", "parlent"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "aller",
          subtitulo: "ir",
          linhas: [
            ["je", "vais"],
            ["tu", "vas"],
            ["il / elle", "va"],
            ["nous", "allons"],
            ["vous", "allez"],
            ["ils / elles", "vont"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "faire",
          subtitulo: "fazer",
          linhas: [
            ["je", "fais"],
            ["tu", "fais"],
            ["il / elle", "fait"],
            ["nous", "faisons"],
            ["vous", "faites"],
            ["ils / elles", "font"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "vouloir · pouvoir",
          subtitulo: "querer · poder",
          linhas: [
            ["je", "veux · peux"],
            ["tu", "veux · peux"],
            ["il / elle", "veut · peut"],
            ["nous", "voulons · pouvons"],
            ["vous", "voulez · pouvez"],
            ["ils / elles", "veulent · peuvent"],
          ],
        },
      ],
      dica:
        "Atenção: em <code>-er</code>, <code>je</code>, <code>il</code> e <code>ils</code> soam igual (<i>parle</i>, <i>parlent</i>), mas a escrita muda. E <code>venir</code> (vir) faz: <i>je viens, tu viens, il vient, nous venons, vous venez, ils viennent</i>.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "Je parle français",
        "Tu vas à l'école",
        "Il fait du sport",
        "Nous venons de Paris",
        "Vous voulez un café",
        "Elles peuvent venir",
      ],
    },
    questoes: [
      {
        tipo: "Complete",
        enunciado: "Nous ___ français à la maison.",
        opcoes: ["parle", "parlons", "parlez", "parlent"],
        correta: 1,
        explicacao:
          "Com <i>nous</i>, os verbos em -er terminam em <i>-ons</i>: <i>nous parlons</i>.",
      },
      {
        tipo: "Aller",
        enunciado: "Tu ___ au marché demain ?",
        opcoes: ["vas", "va", "allez", "vont"],
        correta: 0,
        explicacao:
          "<i>Aller</i> é irregular. Com <i>tu</i>, a forma é <i>vas</i>: <i>tu vas</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>\"Eles fazem a lição de casa\"</b>?",
        opcoes: [
          "Ils fait les devoirs.",
          "Ils faisent les devoirs.",
          "Ils font les devoirs.",
          "Ils faites les devoirs.",
        ],
        correta: 2,
        explicacao:
          "Com <i>ils / elles</i>, <i>faire</i> vira <i>font</i>. Não existe <i>faisent</i>.",
      },
      {
        tipo: "Venir",
        enunciado: "Vous ___ au cinéma avec nous ?",
        opcoes: ["venons", "viennent", "viens", "venez"],
        correta: 3,
        explicacao:
          "Com <i>vous</i>, <i>venir</i> vira <i>venez</i>: <i>vous venez</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Nous allons à l'école.",
          "Je vas au parc.",
          "Il fait du sport.",
          "Elles vont au marché.",
        ],
        correta: 1,
        explicacao:
          "Com <i>je</i>, <i>aller</i> faz <i>vais</i>, e não <i>vas</i> (que é do <i>tu</i>).",
      },
      {
        tipo: "Diálogo",
        enunciado: "— Vous ___ manger avec nous ?<br>— Oui, avec plaisir !",
        opcoes: ["voulons", "veulent", "voulez", "veux"],
        correta: 2,
        explicacao:
          "A pergunta é feita a <i>vous</i>, então: <i>vous voulez</i> (vocês querem).",
      },
      {
        tipo: "Tradução",
        enunciado: "<b>Elle fait la cuisine le soir.</b> Qual é a tradução?",
        opcoes: [
          "Ela cozinha à noite.",
          "Ela vai cozinhar amanhã.",
          "Ela quer cozinhar à noite.",
          "Ela pode cozinhar à noite.",
        ],
        correta: 0,
        explicacao:
          "<i>Faire la cuisine</i> significa cozinhar. <i>Elle fait</i> = ela faz, no presente.",
      },
      {
        tipo: "Pouvoir",
        enunciado: "Mes amis ___ venir samedi.",
        opcoes: ["peut", "veux", "pouvons", "peuvent"],
        correta: 3,
        explicacao:
          "<i>Mes amis</i> equivale a <i>ils</i>. Com <i>ils</i>, <i>pouvoir</i> vira <i>peuvent</i>.",
      },
      {
        tipo: "Vouloir",
        enunciado: "Elle ___ un café, s'il vous plaît.",
        opcoes: ["veux", "veut", "voulent", "voulez"],
        correta: 1,
        explicacao:
          "Com <i>il / elle</i>, <i>vouloir</i> faz <i>veut</i>: <i>elle veut</i>. <i>Veux</i> é de <i>je</i> e <i>tu</i>.",
      },
      {
        tipo: "Verbo -er",
        enunciado: "Elles ___ la télé le soir.",
        opcoes: ["regardent", "regarde", "regardez", "regardons"],
        correta: 0,
        explicacao:
          "Com <i>elles</i>, os verbos em -er terminam em <i>-ent</i>: <i>elles regardent</i>. O <i>-ent</i> não se pronuncia.",
      },
    ],
  },
  {
    slug: "verbes-au-present-2",
    nivel: "a1",
    parte: 2,
    destaque: "Le présent",
    resto: "des verbes",
    descricao:
      "Agora vêm os verbos em -er com mudança de grafia (manger, commencer, acheter, appeler, préférer), a família de venir e de prendre, o futuro próximo com aller e venir de + infinitivo.",
    quadro: {
      titulo: "Les verbes : pièges",
      subtitulo: "mudanças de grafia e novos verbos",
      blocos: [
        {
          tipo: "tabela",
          titulo: "-ger · -cer",
          subtitulo: "nous muda a grafia",
          linhas: [
            ["manger : nous", "mangeons"],
            ["voyager : nous", "voyageons"],
            ["commencer : nous", "commençons"],
            ["placer : nous", "plaçons"],
            ["outras pessoas", "je mange, vous mangez"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "acheter · appeler",
          subtitulo: "je, tu, il, ils mudam",
          linhas: [
            ["acheter : je", "j'achète"],
            ["acheter : nous", "achetons"],
            ["appeler : je", "j'appelle"],
            ["appeler : nous", "appelons"],
            ["préférer : je", "je préfère"],
            ["préférer : nous", "préférons"],
            ["ils", "achètent, appellent"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "venir · prendre",
          subtitulo: "irregulares muito usados",
          linhas: [
            ["je", "viens · prends"],
            ["tu", "viens · prends"],
            ["il / elle", "vient · prend"],
            ["nous", "venons · prenons"],
            ["vous", "venez · prenez"],
            ["ils / elles", "viennent · prennent"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "futur proche",
          subtitulo: "aller e venir de",
          linhas: [
            ["aller + infinitif", "Je vais manger"],
            ["nous", "Nous allons partir"],
            ["ils", "Ils vont arriver"],
            ["negativo", "Je ne vais pas sortir"],
            ["venir de + infinitif", "Il vient de partir"],
          ],
        },
      ],
      dica:
        "Atenção: <code>revenir</code> e <code>devenir</code> seguem <code>venir</code> (<i>je reviens, ils deviennent</i>); <code>comprendre</code> e <code>apprendre</code> seguem <code>prendre</code> (<i>je comprends, ils apprennent</i>). <code>Aller + infinitivo</code> indica o futuro próximo; <code>venir de + infinitivo</code> indica o que acabou de acontecer.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "Nous mangeons à midi",
        "Je préfère le thé",
        "J'appelle ma sœur",
        "Tu prends le bus",
        "Ils reviennent ce soir",
        "Je vais partir",
        "Il vient de rentrer",
      ],
    },
    questoes: [
      {
        tipo: "Acheter",
        enunciado: "Le samedi, nous ___ des légumes frais au marché.",
        opcoes: ["achetons", "achètons", "achetens", "achettons"],
        correta: 0,
        explicacao:
          "Com <i>nous</i>, <i>acheter</i> não leva acento: <i>nous achetons</i>. O acento (<i>j'achète</i>) aparece em <i>je, tu, il, ils</i>.",
      },
      {
        tipo: "Manger",
        enunciado: "Nous ___ à la cantine le midi.",
        opcoes: ["mangons", "mangeons", "mangions", "mangeont"],
        correta: 1,
        explicacao:
          "Em <i>manger</i>, mantemos o <i>e</i> antes de <i>-ons</i> para o <i>g</i> soar suave: <i>nous mangeons</i>.",
      },
      {
        tipo: "Commencer",
        enunciado: "Ce matin, nous ___ un nouveau travail.",
        opcoes: ["commencons", "commencçons", "commençons", "commenceons"],
        correta: 2,
        explicacao:
          "Em <i>commencer</i>, o <i>c</i> vira <i>ç</i> antes de <i>-ons</i>: <i>nous commençons</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Je préfère le thé au café.",
          "Elle appelle sa mère le dimanche.",
          "Nous appelons le médecin.",
          "Il achete du pain à la boulangerie.",
        ],
        correta: 3,
        explicacao:
          "Com <i>il</i>, <i>acheter</i> leva acento grave: <i>il achète</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Vous prenez le train à huit heures.",
          "Tu prend le bus tous les jours.",
          "Ils apprennent l'espagnol.",
          "Nous comprenons la leçon.",
        ],
        correta: 1,
        explicacao:
          "Com <i>tu</i>, <i>prendre</i> faz <i>prends</i>, com <i>-s</i>: <i>tu prends</i>.",
      },
      {
        tipo: "Venir de",
        enunciado: "— Où est Paul ?<br>— Il ___ de partir, il prend le bus.",
        opcoes: ["vient", "va", "viens", "vont"],
        correta: 0,
        explicacao:
          "<i>Venir de</i> + infinitivo significa \"acabar de\". Com <i>il</i>: <i>il vient de partir</i> (ele acabou de sair).",
      },
      {
        tipo: "Futuro próximo",
        enunciado: "Demain, nous ___ visiter Lisbonne en train.",
        opcoes: ["vais", "vont", "allons", "allez"],
        correta: 2,
        explicacao:
          "O futuro próximo usa <i>aller</i> + infinitivo. Com <i>nous</i>, <i>aller</i> faz <i>allons</i>: <i>nous allons visiter</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>\"Eles voltam hoje à noite\"</b>?",
        opcoes: [
          "Ils reviens ce soir.",
          "Ils reviennent ce soir.",
          "Ils revenent ce soir.",
          "Ils revient ce soir.",
        ],
        correta: 1,
        explicacao:
          "<i>Revenir</i> segue <i>venir</i>. Com <i>ils</i>, a forma é <i>reviennent</i>, com dois <i>n</i>.",
      },
      {
        tipo: "Préférer",
        enunciado: "Nous ___ voyager en train, c'est plus calme.",
        opcoes: ["préfèrons", "préférent", "préférons", "préférez"],
        correta: 2,
        explicacao:
          "Em <i>préférer</i>, o acento grave só aparece em <i>je, tu, il, ils</i>. Com <i>nous</i>: <i>préférons</i>.",
      },
      {
        tipo: "Dois em um",
        enunciado: "Demain, je vais ___ mes cousins pour organiser le dîner.",
        opcoes: ["appeler", "appelle", "appelles", "appeller"],
        correta: 0,
        explicacao:
          "Depois de <i>aller</i>, o verbo fica no infinitivo: <i>je vais appeler</i>. O infinitivo é <i>appeler</i>, com um só <i>l</i>; o <i>ll</i> aparece só em <i>j'appelle</i>.",
      },
    ],
  },
  {
    slug: "negation",
    nivel: "a1",
    destaque: "Ne…",
    resto: "pas !",
    descricao: "A negação básica ne… pas.",
    quadro: {
      titulo: "La négation",
      subtitulo: "ne … pas em volta do verbo",
      blocos: [
        {
          tipo: "tabela",
          titulo: "ne + verbe + pas",
          subtitulo: "o verbo fica no meio",
          linhas: [
            ["je", "ne parle pas"],
            ["tu", "ne manges pas"],
            ["il / elle", "ne dort pas"],
            ["nous", "ne venons pas"],
            ["ils / elles", "ne vont pas"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "n' + vogal",
          subtitulo: "ne vira n'",
          linhas: [
            ["j'aime", "je n'aime pas"],
            ["tu habites", "tu n'habites pas"],
            ["elle est", "elle n'est pas"],
            ["on a", "on n'a pas"],
            ["il ouvre", "il n'ouvre pas"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "un · une · des",
          subtitulo: "viram de / d'",
          linhas: [
            ["un chat", "pas de chat"],
            ["une sœur", "pas de sœur"],
            ["des amis", "pas d'amis"],
            ["des devoirs", "pas de devoirs"],
            ["le / la / les", "não mudam"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "à l'oral",
          subtitulo: "o ne às vezes cai",
          linhas: [
            ["escrito", "je ne sais pas"],
            ["oral", "je sais pas"],
            ["escrito", "il n'est pas là"],
            ["oral", "il est pas là"],
          ],
        },
      ],
      dica:
        "Atenção: <code>ne</code> vem antes do verbo e <code>pas</code> vem depois, sempre. Depois de <code>pas</code>, <i>un / une / des</i> viram <code>de</code> (ou <code>d'</code> antes de vogal). Na fala informal, muita gente omite o <i>ne</i>, mas na escrita ele fica.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "Je ne sais pas",
        "Il n'a pas de frère",
        "Nous ne mangeons pas de viande",
        "Tu n'aimes pas le café",
        "Elle n'habite pas ici",
      ],
    },
    questoes: [
      {
        tipo: "Negação",
        enunciado: "Je ___ parle pas anglais.",
        opcoes: ["ne", "n'", "pas", "de"],
        correta: 0,
        explicacao:
          "<i>Parle</i> começa com consoante, então usamos <i>ne</i>: <i>je ne parle pas</i>.",
      },
      {
        tipo: "Elisão",
        enunciado: "Elle ___aime pas le café.",
        opcoes: ["ne", "n'", "ni", "non"],
        correta: 1,
        explicacao:
          "<i>Aime</i> começa com vogal, então <i>ne</i> vira <i>n'</i>: <i>elle n'aime pas</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>\"Eu não tenho irmã\"</b>?",
        opcoes: [
          "Je n'ai pas une sœur.",
          "Je ne ai pas de sœur.",
          "Je n'ai pas de sœur.",
          "Je n'ai de pas sœur.",
        ],
        correta: 2,
        explicacao:
          "<i>Ne</i> vira <i>n'</i> antes de <i>ai</i>, e <i>une</i> vira <i>de</i> depois de <i>pas</i>: <i>je n'ai pas de sœur</i>.",
      },
      {
        tipo: "Complete",
        enunciado: "Nous n'avons pas ___ voiture.",
        opcoes: ["une", "des", "du", "de"],
        correta: 3,
        explicacao:
          "Na negação, <i>un / une / des</i> viram <i>de</i>: <i>pas de voiture</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Tu ne parles pas français.",
          "Il n'habite pas ici.",
          "Nous mangeons ne pas de pain.",
          "Elles n'ont pas de chien.",
        ],
        correta: 2,
        explicacao:
          "O <i>ne</i> fica antes do verbo e o <i>pas</i> depois: <i>nous ne mangeons pas</i>.",
      },
      {
        tipo: "Diálogo",
        enunciado: "— Tu as des frères ?<br>— Non, je n'ai ___ frères.",
        opcoes: ["pas de", "pas des", "de pas", "ne pas"],
        correta: 0,
        explicacao:
          "Depois de <i>pas</i>, <i>des</i> vira <i>de</i>: <i>je n'ai pas de frères</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "<b>Il ne travaille pas le dimanche.</b> Qual é a tradução?",
        opcoes: [
          "Ele trabalha todo domingo.",
          "Ele não trabalha aos domingos.",
          "Ele não gosta de domingo.",
          "Ele trabalha só aos domingos.",
        ],
        correta: 1,
        explicacao:
          "<i>Ne … pas</i> nega o verbo: <i>il ne travaille pas</i> = ele não trabalha.",
      },
      {
        tipo: "Posição",
        enunciado: "Como se diz <b>\"Ela não está em casa\"</b>?",
        opcoes: [
          "Elle ne pas est à la maison.",
          "Elle pas n'est à la maison.",
          "Elle n'est à la maison pas.",
          "Elle n'est pas à la maison.",
        ],
        correta: 3,
        explicacao:
          "O verbo fica entre as duas partes: <i>elle n'est pas</i>. <i>Est</i> começa com vogal, por isso <i>n'</i>.",
      },
      {
        tipo: "Oral",
        enunciado:
          "No oral, muita gente diz <i>Je sais pas</i>. Qual é a forma completa, escrita?",
        opcoes: [
          "Je sais ne pas.",
          "Je pas ne sais.",
          "Je ne sais pas.",
          "Je ne pas sais.",
        ],
        correta: 2,
        explicacao:
          "Na escrita, o <i>ne</i> não cai: <i>je ne sais pas</i>. A versão sem <i>ne</i> é só da fala informal.",
      },
      {
        tipo: "Complete",
        enunciado: "Ils n'ont pas ___ devoirs ce soir.",
        opcoes: ["des", "de", "d'", "un"],
        correta: 1,
        explicacao:
          "<i>Des devoirs</i> vira <i>pas de devoirs</i>. <i>D'</i> só se usa antes de vogal, e <i>devoirs</i> começa com consoante.",
      },
    ],
  },
  {
    slug: "negation-2",
    nivel: "a1",
    parte: 2,
    destaque: "Ne…",
    resto: "plus, jamais, rien",
    descricao:
      "Além de ne… pas, agora aparecem ne… plus, ne… jamais, ne… rien e ne… personne, a negação com infinitivo e com aller + infinitivo, a diferença entre pas de e ce n'est pas un, e o si para responder sim a uma pergunta negativa.",
    quadro: {
      titulo: "La négation, suite",
      subtitulo: "plus, jamais, rien, personne e casos especiais",
      blocos: [
        {
          tipo: "tabela",
          titulo: "plus · jamais",
          subtitulo: "não mais · nunca",
          linhas: [
            ["não mais", "il ne dort plus"],
            ["nunca", "il ne dort jamais"],
            ["plus + un/une/des", "plus de pain"],
            ["jamais + un/une/des", "jamais de pain"],
            ["com vogal", "je n'ai plus d'argent"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "rien · personne",
          subtitulo: "nada · ninguém",
          linhas: [
            ["nada", "je ne fais rien"],
            ["ninguém", "je ne connais personne"],
            ["com vogal", "il n'aime personne"],
            ["resposta curta", "Rien. · Personne."],
          ],
        },
        {
          tipo: "tabela",
          titulo: "casos especiais",
          subtitulo: "infinitivo, aller, être",
          linhas: [
            ["infinitivo", "ne pas fumer"],
            ["aller + inf.", "je ne vais pas sortir"],
            ["c'est + un/une", "ce n'est pas un livre"],
            ["ter + un/une", "je n'ai pas de livre"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "si",
          subtitulo: "sim a uma pergunta negativa",
          linhas: [
            ["pergunta", "Tu n'as pas faim ?"],
            ["sim", "Si, j'ai faim."],
            ["não", "Non, je n'ai pas faim."],
            ["pergunta normal", "Oui · Non"],
          ],
        },
      ],
      dica:
        "Atenção: com infinitivo, <code>ne pas</code> ficam juntos antes do verbo: <i>ne pas fumer</i>. Com <i>aller</i>, a negação envolve o verbo conjugado: <i>je ne vais pas sortir</i>. Depois de <code>pas</code>, <code>plus</code> e <code>jamais</code>, <i>un / une / des</i> viram <code>de</code>, mas não depois de <i>ce n'est pas</i>: <i>ce n'est pas un médecin</i>.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "Je ne travaille plus",
        "Il ne mange jamais de viande",
        "Je ne vois personne",
        "Merci de ne pas fumer",
        "Ce n'est pas un hôtel",
        "Tu n'as pas faim ? Si !",
      ],
    },
    questoes: [
      {
        tipo: "Complete",
        enunciado: "Au bureau, je ne vois ___ : mes collègues sont en réunion.",
        opcoes: ["rien", "personne", "jamais", "plus"],
        correta: 1,
        explicacao:
          "Os colegas são pessoas, então usamos <i>personne</i>: <i>je ne vois personne</i>. <i>Rien</i> é para coisas.",
      },
      {
        tipo: "Complete",
        enunciado: "Mon frère ne fume ___ : il a arrêté l'année dernière.",
        opcoes: ["jamais", "rien", "personne", "plus"],
        correta: 3,
        explicacao:
          "Ele fumava e parou, então é <i>ne… plus</i> (não mais): <i>il ne fume plus</i>. <i>Ne… jamais</i> significaria que nunca fumou.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>\"Ele nunca viaja de avião\"</b>?",
        opcoes: [
          "Il jamais ne voyage en avion.",
          "Il ne voyage pas jamais en avion.",
          "Il ne voyage jamais en avion.",
          "Il ne jamais voyage en avion.",
        ],
        correta: 2,
        explicacao:
          "<i>Ne</i> vem antes do verbo e <i>jamais</i> depois dele, como o <i>pas</i>: <i>il ne voyage jamais</i>.",
      },
      {
        tipo: "Infinitivo",
        enunciado: "Dans la salle d'attente, merci de ___ téléphoner.",
        opcoes: ["ne pas", "pas", "pas ne", "ne"],
        correta: 0,
        explicacao:
          "Com o infinitivo, <i>ne pas</i> ficam juntos antes do verbo: <i>merci de ne pas téléphoner</i>.",
      },
      {
        tipo: "Aller + infinitivo",
        enunciado: "Como se diz <b>\"Eu não vou sair hoje à noite\"</b>?",
        opcoes: [
          "Je ne vais sortir pas ce soir.",
          "Je vais ne pas sortir ce soir.",
          "Je ne sors pas vais ce soir.",
          "Je ne vais pas sortir ce soir.",
        ],
        correta: 3,
        explicacao:
          "Com <i>aller</i> + infinitivo, a negação envolve <i>aller</i>, o verbo conjugado: <i>je ne vais pas</i> + <i>sortir</i>.",
      },
      {
        tipo: "Pas de ou un",
        enunciado:
          "— C'est un médecin ?<br>— Non, ce n'est pas ___ médecin, c'est un infirmier.",
        opcoes: ["de", "d'", "un", "du"],
        correta: 2,
        explicacao:
          "Depois de <i>c'est</i> / <i>ce n'est pas</i> (verbo être), o artigo não muda: <i>ce n'est pas un médecin</i>. O <i>de</i> aparece com verbos como avoir: <i>je n'ai pas de voiture</i>.",
      },
      {
        tipo: "Complete",
        enunciado:
          "Dans l'appartement meublé, il n'y a plus ___ eau chaude ce matin.",
        opcoes: ["de", "d'", "de l'", "de la"],
        correta: 1,
        explicacao:
          "Duas regras: depois de <i>plus</i>, o artigo vira <i>de</i>, e <i>de</i> vira <i>d'</i> antes de vogal: <i>plus d'eau chaude</i>.",
      },
      {
        tipo: "Diálogo",
        enunciado: "— Tu n'as pas faim ?<br>— ___, j'ai très faim !",
        opcoes: ["Si", "Oui", "Non", "Pas"],
        correta: 0,
        explicacao:
          "Para responder <b>sim</b> a uma pergunta negativa, usamos <i>si</i>, não <i>oui</i>: <i>Si, j'ai faim !</i>",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Il ne travaille plus ici.",
          "Nous ne connaissons personne.",
          "Elle ne dit rien.",
          "Je ne jamais mange de viande.",
        ],
        correta: 3,
        explicacao:
          "<i>Jamais</i> vai depois do verbo, como o <i>pas</i>: <i>je ne mange jamais de viande</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Il n'y a jamais de métro à minuit.",
          "Je ne vais pas prendre le bus.",
          "Ils n'ont plus des clés.",
          "Ce n'est pas un hôtel.",
        ],
        correta: 2,
        explicacao:
          "Depois de <i>plus</i>, <i>des</i> vira <i>de</i>: <i>ils n'ont plus de clés</i>. A frase <i>ce n'est pas un hôtel</i> está certa, porque o verbo é <i>être</i>.",
      },
    ],
  },
  {
    slug: "toujours-ou-jamais",
    nivel: "a1",
    destaque: "Toujours",
    resto: "ou jamais ?",
    descricao: "Os advérbios de frequência.",
    quadro: {
      titulo: "La règle de la fréquence",
      subtitulo: "do nunca ao sempre",
      blocos: [
        {
          tipo: "escala",
          marcas: [
            { rotulo: "jamais", valor: "0%", pos: 0 },
            { rotulo: "rarement", valor: "~10%", pos: 18 },
            { rotulo: "parfois", valor: "~30%", pos: 38 },
            { rotulo: "souvent", valor: "~70%", pos: 58 },
            { rotulo: "d'habitude", valor: "~85%", pos: 78 },
            { rotulo: "toujours", valor: "100%", pos: 100 },
          ],
        },
      ],
      dica:
        "Regra de ouro: o advérbio vem <code>depois do verbo</code> conjugado. No passé composé, fica <code>entre o auxiliar e o particípio</code>. Com jamais, use <code>ne … jamais</code>.",
    },
    exemplos: {
      rotulo: "Sinônimos úteis",
      itens: [
        "parfois = quelquefois",
        "de temps en temps = de vez em quando",
        "tous les jours = todos os dias",
      ],
    },
    questoes: [
      {
        tipo: "Escala",
        enunciado:
          "Qual advérbio significa que algo acontece <b>100%</b> das vezes?",
        opcoes: ["souvent", "toujours", "parfois", "d'habitude"],
        correta: 1,
        explicacao:
          "<i>Toujours</i> = sempre. Fica no topo da escala. <i>Souvent</i> é frequente, mas não sempre.",
      },
      {
        tipo: "Complete",
        enunciado: "Je vais ___ au cinéma, une fois par an seulement.",
        opcoes: ["toujours", "souvent", "rarement", "tous les jours"],
        correta: 2,
        explicacao:
          "Uma vez por ano é bem pouco, então o certo é <i>rarement</i> (raramente).",
      },
      {
        tipo: "Escala",
        enunciado:
          "Qual sequência está em ordem do <b>menos</b> para o <b>mais</b> frequente?",
        opcoes: [
          "jamais → parfois → rarement → toujours",
          "rarement → jamais → souvent → toujours",
          "jamais → rarement → parfois → souvent → toujours",
          "parfois → jamais → souvent → toujours",
        ],
        correta: 2,
        explicacao:
          "A escala é: jamais (0%) → rarement → parfois → souvent → toujours (100%).",
      },
      {
        tipo: "Posição",
        enunciado: "Onde fica o advérbio? Escolha a frase correta.",
        opcoes: [
          "Elle toujours mange au restaurant.",
          "Elle mange toujours au restaurant.",
          "Toujours elle mange au restaurant.",
          "Elle mange au toujours restaurant.",
        ],
        correta: 1,
        explicacao:
          "No presente, o advérbio vem logo <b>depois do verbo conjugado</b>: <i>elle mange toujours</i>.",
      },
      {
        tipo: "Negação",
        enunciado: "Como dizer <b>“Eu nunca bebo café”</b> em francês?",
        opcoes: [
          "Je bois jamais café.",
          "Je jamais bois de café.",
          "Je ne bois jamais de café.",
          "Je ne jamais bois du café.",
        ],
        correta: 2,
        explicacao:
          "<i>Jamais</i> funciona como negação: <i>ne</i> antes do verbo, <i>jamais</i> depois. E na negação, <i>du</i> vira <i>de</i>.",
      },
      {
        tipo: "Passé composé",
        enunciado: "Escolha a frase correta no passé composé:",
        opcoes: [
          "Il a voyagé souvent en Italie.",
          "Il souvent a voyagé en Italie.",
          "Il a souvent voyagé en Italie.",
          "Souvent il a en Italie voyagé.",
        ],
        correta: 2,
        explicacao:
          "No passé composé, o advérbio curto fica <b>entre o auxiliar e o particípio</b>: <i>il a souvent voyagé</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>“de vez em quando”</b> em francês?",
        opcoes: [
          "de temps en temps",
          "tout le temps",
          "tous les temps",
          "à chaque fois",
        ],
        correta: 0,
        explicacao:
          "<i>De temps en temps</i> = de vez em quando. Cuidado: <i>tout le temps</i> quer dizer “o tempo todo”.",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— Tu regardes des films d'horreur ? <br>— Non, ça me fait peur ! Je n'en regarde ___.",
        opcoes: ["toujours", "jamais", "souvent", "parfois"],
        correta: 1,
        explicacao:
          "A pessoa tem medo e já usou <i>ne (n')</i>, então completa com <i>jamais</i>: nunca assiste.",
      },
      {
        tipo: "Sinônimo",
        enunciado: "Qual palavra tem o <b>mesmo sentido</b> de <i>parfois</i>?",
        opcoes: ["rarement", "quelquefois", "généralement", "jamais"],
        correta: 1,
        explicacao:
          "<i>Quelquefois</i> e <i>parfois</i> significam “às vezes”. São intercambiáveis.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Nous faisons du sport tous les jours.",
          "D'habitude, je prends le bus.",
          "Je jamais mange de viande.",
          "Tu arrives souvent en retard.",
        ],
        correta: 2,
        explicacao:
          "Falta o <i>ne</i> e a posição está errada. O certo é <i>Je ne mange jamais de viande.</i> Expressões longas como <i>tous les jours</i> e <i>d'habitude</i> podem ir no fim ou no início.",
      },
    ],
  },
  {
    slug: "toujours-ou-jamais-2",
    nivel: "a1",
    parte: 2,
    destaque: "Toujours",
    resto: "ou jamais ?",
    descricao:
      "Agora vêm as expressões com número (une fois par semaine), tous les / chaque, a diferença entre samedi e le samedi, as negações ne … jamais, ne … plus e ne … pas souvent, a posição do advérbio com dois verbos e o toujours que também significa ainda.",
    quadro: {
      titulo: "La fréquence : pièges",
      subtitulo: "quantas vezes, negações e posição",
      blocos: [
        {
          tipo: "tabela",
          titulo: "combien de fois",
          subtitulo: "contar as vezes",
          linhas: [
            ["1x por semana", "une fois par semaine"],
            ["2x por mês", "deux fois par mois"],
            ["3x por ano", "trois fois par an"],
            ["toda manhã", "chaque matin"],
            ["todas as manhãs", "tous les matins"],
            ["toda segunda", "chaque lundi"],
            ["toda semana", "chaque semaine"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "samedi x le samedi",
          subtitulo: "uma vez x sempre",
          linhas: [
            ["este sábado", "samedi"],
            ["todo sábado", "le samedi"],
            ["este sábado, de manhã", "samedi matin"],
            ["todo sábado de manhã", "le samedi matin"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "négations",
          subtitulo: "ne ... + advérbio",
          linhas: [
            ["nunca", "ne … jamais"],
            ["nunca + de", "ne … jamais de"],
            ["quase nunca", "ne … presque jamais"],
            ["não ... muito", "ne … pas souvent"],
            ["nem sempre", "ne … pas toujours"],
            ["não mais", "ne … plus"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "toujours et cie",
          subtitulo: "sentidos e posição",
          linhas: [
            ["ainda (continua)", "il habite toujours"],
            ["sempre", "il rentre toujours tôt"],
            ["de vez em quando", "de temps en temps"],
            ["a cada vez", "à chaque fois"],
            ["o tempo todo", "tout le temps"],
            ["aller + inf.", "on va souvent manger"],
          ],
        },
      ],
      dica:
        "Atenção: <code>chaque</code> é sempre singular (<code>chaque matin</code>) e <code>tous les</code> pede plural (<code>tous les matins</code>). Com <code>ne … jamais</code> e <code>ne … plus</code>, o advérbio vai depois do primeiro verbo: <code>je ne veux plus partir</code>. E <code>toujours</code> pode ser \"sempre\" ou \"ainda\".",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "une fois par semaine",
        "deux fois par mois",
        "tous les matins",
        "chaque lundi",
        "le samedi",
        "ne … plus",
        "presque jamais",
      ],
    },
    questoes: [
      {
        tipo: "Complete",
        enunciado: "Elle fait ses courses ___ par semaine, le samedi matin.",
        opcoes: ["une fois", "un fois", "tous les", "chaque"],
        correta: 0,
        explicacao:
          "<i>Fois</i> é feminino, então <i>une fois par semaine</i> (uma vez por semana). Com número: <i>deux fois par mois</i>, <i>trois fois par an</i>.",
      },
      {
        tipo: "Complete",
        enunciado: "Il prend un café ___ matin avant d'aller au bureau.",
        opcoes: ["tous les", "chaque", "toutes les", "tout"],
        correta: 1,
        explicacao:
          "<i>Matin</i> está no singular, então usamos <i>chaque matin</i>. Com plural seria <i>tous les matins</i>.",
      },
      {
        tipo: "Escolha",
        enunciado: "Como dizer <b>Ele quase nunca sai à noite</b>?",
        opcoes: [
          "Il sort presque jamais le soir.",
          "Il ne presque sort jamais le soir.",
          "Il ne sort presque jamais le soir.",
          "Il ne sort pas presque jamais le soir.",
        ],
        correta: 2,
        explicacao:
          "<i>Presque jamais</i> também leva <i>ne</i> antes do verbo: <i>il ne sort presque jamais</i>. Sem o <i>ne</i> a frase fica errada.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>Eu jogo tênis aos sábados</b> (todo sábado)?",
        opcoes: [
          "Je joue au tennis samedi.",
          "Je joue au tennis le samedi.",
          "Je joue au tennis les samedi.",
          "Je joue au tennis en samedi.",
        ],
        correta: 1,
        explicacao:
          "<i>Le samedi</i> = todo sábado (hábito). <i>Samedi</i> sozinho é um sábado específico, o próximo ou o mais próximo.",
      },
      {
        tipo: "Negação",
        enunciado: "Como dizer <b>Ele não vai mais ao cinema</b> (antes ia)?",
        opcoes: [
          "Il ne va jamais au cinéma.",
          "Il va plus au cinéma.",
          "Il ne va pas souvent au cinéma.",
          "Il ne va plus au cinéma.",
        ],
        correta: 3,
        explicacao:
          "<i>Ne … plus</i> = não mais (algo que parou). <i>Ne … jamais</i> é nunca, e <i>ne … pas souvent</i> é não muito frequentemente.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Il ne sort pas souvent le soir.",
          "Elle ne travaille plus ici.",
          "Je ne bois jamais du café.",
          "Nous allons souvent au marché.",
        ],
        correta: 2,
        explicacao:
          "Depois de <i>ne … jamais</i>, <i>du / de la / des</i> viram <i>de</i> ou <i>d'</i>: <i>je ne bois jamais de café</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Je veux jamais manger seul.",
          "Il habite toujours à Lyon.",
          "Tu dois toujours prendre ce bus.",
          "Nous pouvons souvent déjeuner ici.",
        ],
        correta: 0,
        explicacao:
          "Falta o <i>ne</i>. Com dois verbos, <i>ne</i> fica antes do verbo conjugado e <i>jamais</i> logo depois dele: <i>je ne veux jamais manger</i>.",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— Alors, tu habites toujours à Marseille ?<br>— Non, je n'habite ___ à Marseille. Je suis maintenant à Lyon.",
        opcoes: ["jamais", "souvent", "toujours", "plus"],
        correta: 3,
        explicacao:
          "A pessoa morava em Marseille e agora não mora mais: <i>ne … plus</i>. Na pergunta, <i>toujours</i> quer dizer <i>ainda</i>.",
      },
      {
        tipo: "Tradução",
        enunciado:
          "Qual a melhor tradução de <i>Mon frère habite toujours à Paris, comme avant</i> ?",
        opcoes: [
          "Meu irmão sempre mora em Paris, como antes.",
          "Meu irmão ainda mora em Paris, como antes.",
          "Meu irmão nunca mais mora em Paris.",
          "Meu irmão mora às vezes em Paris.",
        ],
        correta: 1,
        explicacao:
          "Com um verbo de estado e a ideia de \"como antes\", <i>toujours</i> = <i>ainda</i>. Em outros contextos significa sempre: <i>il rentre toujours tôt</i>.",
      },
      {
        tipo: "Posição",
        enunciado: "Qual frase está correta com <b>aller + infinitivo</b>?",
        opcoes: [
          "Ils vont souvent prendre le train de nuit.",
          "Ils souvent vont prendre le train de nuit.",
          "Ils vont prendre le souvent train de nuit.",
          "Ils vont prendre le train de souvent nuit.",
        ],
        correta: 0,
        explicacao:
          "O advérbio curto fica depois do verbo conjugado (<i>vont</i>), antes do infinitivo: <i>ils vont souvent prendre</i>.",
      },
    ],
  },
  {
    slug: "mots-interrogatifs",
    nivel: "a1",
    destaque: "Les mots",
    resto: "interrogatifs",
    descricao:
      "As palavras para fazer perguntas: qui, que, où, combien, quand e comment.",
    quadro: {
      titulo: "Les mots interrogatifs",
      subtitulo: "quem, o quê, onde, quanto, quando, como",
      blocos: [
        {
          tipo: "tabela",
          titulo: "qui · que",
          subtitulo: "pessoa · coisa",
          linhas: [
            ["quem", "qui"],
            ["o que (início)", "qu'est-ce que"],
            ["o que + inversão", "que fais-tu ?"],
            ["o que (no fim)", "tu fais quoi ?"],
            ["antes de vogal", "qu'est-ce qu'il…"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "où · quand",
          subtitulo: "lugar · tempo",
          linhas: [
            ["onde", "où"],
            ["de onde", "d'où"],
            ["para onde", "tu vas où ?"],
            ["quando", "quand"],
            ["desde quando", "depuis quand"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "combien · comment",
          subtitulo: "quantidade · modo",
          linhas: [
            ["quanto custa", "c'est combien ?"],
            ["quantos + nome", "combien de…"],
            ["como", "comment"],
            ["como vai", "comment ça va ?"],
            ["qual seu nome", "comment tu t'appelles ?"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "3 façons",
          subtitulo: "a mesma pergunta",
          linhas: [
            ["entonação", "Tu habites où ?"],
            ["est-ce que", "Où est-ce que tu habites ?"],
            ["inversão", "Où habites-tu ?"],
          ],
        },
      ],
      dica:
        "Atenção: <code>où</code> com acento é <i>onde</i>; <code>ou</code> sem acento é <i>ou</i>. Use <code>qui</code> para pessoas e <code>que</code> para coisas; no fim da frase, <code>que</code> vira <code>quoi</code>. Idade não usa combien: <i>Quel âge as-tu ?</i>",
    },
    exemplos: {
      rotulo: "Perguntas úteis",
      itens: [
        "Qui est-ce ?",
        "Qu'est-ce que c'est ?",
        "Où sont les toilettes ?",
        "C'est combien ?",
        "Tu pars quand ?",
        "Comment ça s'écrit ?",
      ],
    },
    questoes: [
      {
        tipo: "Pessoa ou coisa",
        enunciado: "___ tu invites à ton anniversaire ? — Mes amis de l'école.",
        opcoes: [
          "Qui est-ce que",
          "Qu'est-ce que",
          "Où est-ce que",
          "Quand est-ce que",
        ],
        correta: 0,
        explicacao:
          "A resposta são pessoas (<i>mes amis</i>), então a pergunta usa <i>qui</i>: <i>Qui est-ce que tu invites ?</i>",
      },
      {
        tipo: "Complete",
        enunciado: "— ___ tu fais le week-end ?<br>— Je fais du vélo.",
        opcoes: ["Comment", "Qu'est-ce que", "Qui", "Combien"],
        correta: 1,
        explicacao:
          "A resposta é uma coisa, uma atividade. No início da frase, <i>o que</i> é <i>qu'est-ce que</i>.",
      },
      {
        tipo: "Où ou ou ?",
        enunciado: "Tu préfères le thé ___ le café ?",
        opcoes: ["où", "quand", "ou", "qui"],
        correta: 2,
        explicacao:
          "Aqui é uma escolha entre duas coisas: <i>ou</i>, sem acento. <i>Où</i>, com acento, significa <i>onde</i>.",
      },
      {
        tipo: "Combien",
        enunciado: "___ coûte ce croissant ? — Un euro vingt.",
        opcoes: ["Quand", "Comment", "Que", "Combien"],
        correta: 3,
        explicacao:
          "A resposta é um preço, então a pergunta é <i>combien</i>: <i>Combien coûte ce croissant ?</i>",
      },
      {
        tipo: "Combien de",
        enunciado: "Tu as combien ___ cours le lundi ?",
        opcoes: ["de", "des", "du", "les"],
        correta: 0,
        explicacao:
          "Depois de <i>combien</i>, usamos só <i>de</i> + substantivo, sem artigo: <i>combien de cours</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>“Quando começa o filme?”</b>",
        opcoes: [
          "Comment commence le film ?",
          "Où commence le film ?",
          "Quand commence le film ?",
          "Combien commence le film ?",
        ],
        correta: 2,
        explicacao:
          "<i>Quand</i> pergunta o momento: <i>Quand commence le film ?</i>",
      },
      {
        tipo: "Comment",
        enunciado: "— ___ ça va ?<br>— Très bien, merci !",
        opcoes: ["Quoi", "Qui", "Où", "Comment"],
        correta: 3,
        explicacao:
          "<i>Comment</i> pergunta o modo, o “como”: <i>Comment ça va ?</i> = Como vai?",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— Salut ! Tu vas ___ ?<br>— À la plage, avec ma sœur.<br>— Super ! Bonne journée !",
        opcoes: ["où", "quand", "comment", "qui"],
        correta: 0,
        explicacao:
          "A resposta é um lugar (<i>à la plage</i>), então a pergunta é <i>où</i>. No oral, a palavra interrogativa pode ir no fim: <i>Tu vas où ?</i>",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Combien de frères as-tu ?",
          "Qui est ton professeur ?",
          "Tu as combien ans ?",
          "Où est la gare ?",
        ],
        correta: 2,
        explicacao:
          "Para perguntar a idade, o francês não usa <i>combien</i>: <i>Tu as quel âge ?</i> ou <i>Quel âge as-tu ?</i>",
      },
      {
        tipo: "Inversão",
        enunciado: "___ cherches-tu ? — Mes clés.",
        opcoes: ["Quoi", "Que", "Qui", "Où"],
        correta: 1,
        explicacao:
          "A resposta é uma coisa. Com inversão (verbo + pronome), <i>o que</i> no início é <i>que</i>: <i>Que cherches-tu ?</i> <i>Quoi</i> só aparece no fim: <i>Tu cherches quoi ?</i>",
      },
    ],
  },
  {
    slug: "quel-quelle",
    nivel: "a1",
    destaque: "Quel, quelle,",
    resto: "quels, quelles ?",
    descricao:
      "Quel, quelle, quels e quelles, usados para perguntar \"qual\" ou \"que\".",
    quadro: {
      titulo: "L'adjectif interrogatif",
      subtitulo: "concorda com o substantivo",
      blocos: [
        {
          tipo: "tabela",
          titulo: "quel · quelle",
          subtitulo: "singular",
          linhas: [
            ["masculino", "quel"],
            ["feminino", "quelle"],
            ["quel + nome m.", "quel jour ?"],
            ["quelle + nome f.", "quelle couleur ?"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "quels · quelles",
          subtitulo: "plural",
          linhas: [
            ["masculino", "quels"],
            ["feminino", "quelles"],
            ["quels + nome m.", "quels sports ?"],
            ["quelles + nome f.", "quelles langues ?"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "avec être",
          subtitulo: "olhe o nome depois do verbo",
          linhas: [
            ["seu nome", "quel est ton nom ?"],
            ["seu endereço", "quelle est ton adresse ?"],
            ["seus filmes", "quels sont tes films ?"],
            ["suas séries", "quelles sont tes séries ?"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "expressions",
          subtitulo: "muito usadas",
          linhas: [
            ["que horas são?", "quelle heure est-il ?"],
            ["quantos anos?", "quel âge as-tu ?"],
            ["que tempo faz?", "quel temps fait-il ?"],
            ["que pena!", "quel dommage !"],
          ],
        },
      ],
      dica:
        "Atenção: <code>quel</code> concorda com o substantivo, não com quem pergunta. As quatro formas soam iguais; só a escrita muda. Com être, olhe o substantivo que vem depois: <i>Quelle est ta couleur préférée ?</i> E cuidado com o gênero, que às vezes é diferente do português: <i>une adresse</i>, <i>une matière</i>.",
    },
    exemplos: {
      rotulo: "Perguntas úteis",
      itens: [
        "Quel est ton prénom ?",
        "Quelle heure est-il ?",
        "Quel jour on est ?",
        "Quelle est ta nationalité ?",
        "Quels sont tes loisirs ?",
      ],
    },
    questoes: [
      {
        tipo: "Complete",
        enunciado: "___ est ton prénom ?",
        opcoes: ["Quel", "Quelle", "Quels", "Quelles"],
        correta: 0,
        explicacao:
          "<i>Prénom</i> é masculino singular, então usamos <i>quel</i>: <i>Quel est ton prénom ?</i>",
      },
      {
        tipo: "Complete",
        enunciado: "___ couleur tu préfères ?",
        opcoes: ["Quels", "Quelle", "Quel", "Quelles"],
        correta: 1,
        explicacao: "<i>Couleur</i> é feminino singular: <i>quelle couleur</i>.",
      },
      {
        tipo: "Plural",
        enunciado: "___ sports tu pratiques ?",
        opcoes: ["Quel", "Quelles", "Quels", "Quelle"],
        correta: 2,
        explicacao:
          "<i>Sports</i> é masculino plural, então usamos <i>quels</i>: <i>quels sports</i>.",
      },
      {
        tipo: "Plural",
        enunciado: "___ langues parles-tu ?",
        opcoes: ["Quels", "Quel", "Quelle", "Quelles"],
        correta: 3,
        explicacao: "<i>Langues</i> é feminino plural: <i>quelles langues</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>“Qual é o seu endereço?”</b> (formal)",
        opcoes: [
          "Quel est votre adresse ?",
          "Quelle est votre adresse ?",
          "Quelles est votre adresse ?",
          "Quelle sont votre adresse ?",
        ],
        correta: 1,
        explicacao:
          "Em francês, <i>adresse</i> é feminino (<i>une adresse</i>), diferente do português. Por isso: <i>Quelle est votre adresse ?</i>",
      },
      {
        tipo: "Expressão",
        enunciado: "O que significa <b>“Quel temps fait-il ?”</b>",
        opcoes: [
          "Que horas são?",
          "Como está o tempo?",
          "Quanto tempo falta?",
          "Que dia é hoje?",
        ],
        correta: 1,
        explicacao:
          "<i>Le temps</i> aqui é o clima. <i>Quel temps fait-il ?</i> = Como está o tempo? Para as horas, usamos <i>Quelle heure est-il ?</i>",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— ___ sont tes films préférés ?<br>— J'adore les comédies françaises !",
        opcoes: ["Quelles", "Quel", "Quels", "Quelle"],
        correta: 2,
        explicacao:
          "Com <i>être</i>, olhe o substantivo depois do verbo: <i>films</i> é masculino plural, então <i>Quels sont tes films préférés ?</i>",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Quelle heure est-il ?",
          "Quel âge a ta sœur ?",
          "Quel est ta matière préférée ?",
          "Quels sont tes amis ?",
        ],
        correta: 2,
        explicacao:
          "<i>Matière</i> (matéria escolar) é feminino, então o certo é <i>quelle</i>. Repare que o possessivo também já mostrava isso: <i>ta matière</i>.",
      },
      {
        tipo: "Exclamação",
        enunciado: "Il pleut tout le week-end ! ___ dommage !",
        opcoes: ["Quel", "Quelle", "Quels", "Quelles"],
        correta: 0,
        explicacao:
          "<i>Quel</i> também serve para exclamar. <i>Dommage</i> é masculino: <i>Quel dommage !</i> = Que pena!",
      },
      {
        tipo: "Complete",
        enunciado: "___ fleurs tu achètes pour ta mère ? — Des roses.",
        opcoes: ["Quels", "Quel", "Quelle", "Quelles"],
        correta: 3,
        explicacao:
          "<i>Fleurs</i> é feminino plural: <i>quelles fleurs</i>. A resposta no plural (<i>des roses</i>) confirma.",
      },
    ],
  },
  {
    slug: "aller-et-venir",
    nivel: "a1",
    destaque: "Aller",
    resto: "et venir",
    descricao:
      "Os verbos aller (ir) e venir (vir) no presente, com as preposições que vêm depois deles.",
    quadro: {
      titulo: "Aller et venir au présent",
      subtitulo: "para onde você vai, de onde você vem",
      blocos: [
        {
          tipo: "tabela",
          titulo: "aller",
          subtitulo: "ir",
          linhas: [
            ["je", "vais"],
            ["tu", "vas"],
            ["il / elle / on", "va"],
            ["nous", "allons"],
            ["vous", "allez"],
            ["ils / elles", "vont"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "venir",
          subtitulo: "vir",
          linhas: [
            ["je", "viens"],
            ["tu", "viens"],
            ["il / elle / on", "vient"],
            ["nous", "venons"],
            ["vous", "venez"],
            ["ils / elles", "viennent"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "aller à",
          subtitulo: "para onde",
          linhas: [
            ["à + le", "au cinéma"],
            ["à + la", "à la plage"],
            ["à + l'", "à l'école"],
            ["à + les", "aux toilettes"],
            ["casa de alguém", "chez Marie"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "venir de",
          subtitulo: "de onde",
          linhas: [
            ["de + le", "du travail"],
            ["de + la", "de la gare"],
            ["de + l'", "de l'école"],
            ["de + les", "des États-Unis"],
            ["cidade", "de Lyon"],
          ],
        },
      ],
      dica:
        "Atenção: <code>aller</code> mostra para onde você vai (<code>à</code>, <code>au</code>, <code>chez</code>) e <code>venir</code> mostra de onde você vem (<code>de</code>, <code>du</code>, <code>des</code>). Com ils / elles: <code>vont</code> e <code>viennent</code>, com dois n. E o famoso <i>Comment ça va ?</i> usa o verbo aller.",
    },
    exemplos: {
      rotulo: "Frases úteis",
      itens: [
        "Je vais bien",
        "On y va !",
        "Tu viens avec moi ?",
        "Je viens du Brésil",
        "Nous allons au marché",
        "Ils viennent ce soir",
      ],
    },
    questoes: [
      {
        tipo: "Aller",
        enunciado: "Je ___ au supermarché ce matin.",
        opcoes: ["vais", "vas", "va", "vont"],
        correta: 0,
        explicacao:
          "Com <i>je</i>, aller faz <i>vais</i>: <i>je vais</i>. <i>Vas</i> é a forma de <i>tu</i>.",
      },
      {
        tipo: "Venir",
        enunciado: "Nous ___ du Brésil, mais nous habitons en France.",
        opcoes: ["venez", "viennent", "venons", "allons"],
        correta: 2,
        explicacao:
          "A origem pede venir. Com <i>nous</i>, a forma é <i>venons</i>: <i>nous venons du Brésil</i>.",
      },
      {
        tipo: "Aller",
        enunciado: "Mes parents ___ à la plage le dimanche.",
        opcoes: ["va", "vont", "allent", "viennent"],
        correta: 1,
        explicacao:
          "<i>Mes parents</i> = <i>ils</i>. Com ils, aller faz <i>vont</i>. A forma <i>allent</i> não existe.",
      },
      {
        tipo: "Venir",
        enunciado: "Elles ___ de l'école à pied.",
        opcoes: ["viennent", "vient", "venent", "venons"],
        correta: 0,
        explicacao: "Com <i>elles</i>, venir faz <i>viennent</i>, com dois n.",
      },
      {
        tipo: "Contração",
        enunciado: "Tu vas ___ cinéma ce soir ?",
        opcoes: ["à le", "au", "aux", "du"],
        correta: 1,
        explicacao:
          "<i>Cinéma</i> é masculino: à + le vira <i>au</i>. Por isso: <i>Tu vas au cinéma ?</i>",
      },
      {
        tipo: "Contração",
        enunciado: "Il est fatigué : il vient ___ travail.",
        opcoes: ["de le", "des", "du", "au"],
        correta: 2,
        explicacao:
          "Com venir usamos <i>de</i>. <i>Travail</i> é masculino: de + le vira <i>du</i>. <i>Il vient du travail</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>“Vocês vão à casa da Julie?”</b>",
        opcoes: [
          "Vous venez chez Julie ?",
          "Vous allez à Julie ?",
          "Vous allez de Julie ?",
          "Vous allez chez Julie ?",
        ],
        correta: 3,
        explicacao:
          "Para <i>a casa de alguém</i>, usamos <i>chez</i>: <i>Vous allez chez Julie ?</i>",
      },
      {
        tipo: "Diálogo",
        enunciado: "— Tu viens d'où ?<br>— Je ___ de Recife, au Brésil.",
        opcoes: ["vais", "viens", "vient", "venons"],
        correta: 1,
        explicacao:
          "A pergunta é sobre a origem, então a resposta usa venir. Com <i>je</i>: <i>je viens</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Nous allons à la gare.",
          "Elle vient de Paris.",
          "Ils venent du marché.",
          "Je vais chez le médecin.",
        ],
        correta: 2,
        explicacao:
          "Com <i>ils</i>, venir faz <i>viennent</i>, com <i>ie</i> e dois n.",
      },
      {
        tipo: "Expressão",
        enunciado: "— Comment ___ ?<br>— Très bien, merci !",
        opcoes: ["ça vient", "ça vont", "ça vas", "ça va"],
        correta: 3,
        explicacao:
          "<i>Comment ça va ?</i> = Como vai? <i>Ça</i> funciona como <i>il</i>, então o verbo aller fica <i>va</i>.",
      },
    ],
  },
  {
    slug: "aller-a-venir-de",
    nivel: "a1",
    destaque: "Aller à,",
    resto: "venir de",
    descricao:
      "As preposições depois de aller e venir: para onde vamos (à, au, aux, chez, en) e de onde viemos (de, du, des, de chez).",
    quadro: {
      titulo: "Aller à · venir de",
      subtitulo: "o artigo se junta à preposição",
      blocos: [
        {
          tipo: "tabela",
          titulo: "aller à",
          subtitulo: "lugares",
          linhas: [
            ["à + le", "au parc"],
            ["à + la", "à la piscine"],
            ["à + l'", "à l'hôpital"],
            ["à + les", "aux magasins"],
            ["cidade", "à Rome"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "venir de",
          subtitulo: "lugares",
          linhas: [
            ["de + le", "du parc"],
            ["de + la", "de la piscine"],
            ["de + l'", "de l'hôpital"],
            ["de + les", "des magasins"],
            ["cidade", "de Rome"],
            ["cidade com vogal", "d'Orléans"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "pays",
          subtitulo: "aller · venir",
          linhas: [
            ["país feminino", "en Italie · d'Italie"],
            ["país masculino", "au Japon · du Japon"],
            ["país masc. + vogal", "en Irak · d'Irak"],
            ["país plural", "aux / des Pays-Bas"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "chez",
          subtitulo: "casa de alguém",
          linhas: [
            ["ir à casa de", "aller chez Paul"],
            ["vir da casa de", "venir de chez Paul"],
            ["médico", "chez le médecin"],
            ["cabeleireiro", "chez le coiffeur"],
          ],
        },
      ],
      dica:
        "Atenção: <code>à + le = au</code> e <code>à + les = aux</code>; <code>de + le = du</code> e <code>de + les = des</code>. Com <code>la</code> e <code>l'</code>, nada muda. Para pessoas, use <code>chez</code>: <i>je vais chez le dentiste</i>. E com países femininos, venir pede só <code>de</code>: <i>je viens de France</i>.",
    },
    exemplos: {
      rotulo: "Frases úteis",
      itens: [
        "Je vais au travail",
        "Je vais à la banque",
        "Je viens de chez moi",
        "Il vient du Portugal",
        "Nous allons aux États-Unis",
        "Elle vient de Bahia",
      ],
    },
    questoes: [
      {
        tipo: "Aller à",
        enunciado: "On va ___ parc cet après-midi ?",
        opcoes: ["à le", "au", "aux", "à la"],
        correta: 1,
        explicacao:
          "<i>Parc</i> é masculino singular: à + le vira <i>au</i>. <i>On va au parc ?</i>",
      },
      {
        tipo: "Venir de",
        enunciado: "Elle a les cheveux mouillés : elle vient ___ piscine.",
        opcoes: ["du", "de la", "de le", "des"],
        correta: 1,
        explicacao:
          "<i>Piscine</i> é feminino: com <i>la</i>, nada se junta. <i>Elle vient de la piscine.</i>",
      },
      {
        tipo: "Aller à",
        enunciado: "Les enfants vont ___ toilettes avant le cours.",
        opcoes: ["au", "à les", "aux", "des"],
        correta: 2,
        explicacao:
          "<i>Toilettes</i> está no plural: à + les vira <i>aux</i>. A forma <i>à les</i> não existe.",
      },
      {
        tipo: "Venir de",
        enunciado: "Nous venons ___ magasins avec beaucoup de sacs.",
        opcoes: ["des", "de les", "du", "aux"],
        correta: 0,
        explicacao:
          "<i>Magasins</i> está no plural: de + les vira <i>des</i>. <i>Nous venons des magasins.</i>",
      },
      {
        tipo: "Antes de vogal",
        enunciado: "Tu vas ___ hôpital pour voir ta grand-mère ?",
        opcoes: ["au", "à le", "à la", "à l'"],
        correta: 3,
        explicacao:
          "<i>Hôpital</i> começa com h mudo, então o artigo é <i>l'</i> e não se junta: <i>à l'hôpital</i>.",
      },
      {
        tipo: "País",
        enunciado: "Ils vont ___ Japon en avril.",
        opcoes: ["en", "à", "au", "aux"],
        correta: 2,
        explicacao:
          "<i>Le Japon</i> é um país masculino: à + le vira <i>au</i>. <i>Ils vont au Japon.</i>",
      },
      {
        tipo: "País",
        enunciado: "Ce chocolat vient ___ Suisse.",
        opcoes: ["du", "de la", "des", "de"],
        correta: 3,
        explicacao:
          "<i>La Suisse</i> é feminino. Com países femininos, venir pede só <i>de</i>, sem artigo: <i>de Suisse</i>, <i>de France</i>.",
      },
      {
        tipo: "Chez",
        enunciado: "J'ai mal aux dents : je vais ___ dentiste demain.",
        opcoes: ["à la", "chez le", "de", "des"],
        correta: 1,
        explicacao:
          "Para ir ao lugar de uma pessoa ou profissional, usamos <i>chez</i>: <i>chez le dentiste</i>, <i>chez le médecin</i>.",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— Tu viens d'où, comme ça ?<br>— Je viens ___ Marc. Nous étudions ensemble.",
        opcoes: ["chez", "de chez", "du", "à chez"],
        correta: 1,
        explicacao:
          "Para dizer que vem da casa de alguém, juntamos venir de + chez: <i>je viens de chez Marc</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Je vais à la boulangerie.",
          "Il vient du marché.",
          "Nous allons à le musée.",
          "Elles viennent de l'aéroport.",
        ],
        correta: 2,
        explicacao:
          "<i>À le</i> não existe: à + le vira sempre <i>au</i>. O certo é <i>Nous allons au musée.</i>",
      },
    ],
  },
  {
    slug: "articles-contractes",
    nivel: "a1",
    destaque: "Les articles",
    resto: "contractés",
    descricao:
      "Os artigos contraídos au, aux, du e des, que aparecem quando à e de encontram le e les.",
    quadro: {
      titulo: "Les articles contractés",
      subtitulo: "à e de se juntam com le e les",
      blocos: [
        {
          tipo: "tabela",
          titulo: "à + article",
          subtitulo: "ao, à, aos",
          linhas: [
            ["à + le", "au"],
            ["à + la", "à la"],
            ["à + l'", "à l'"],
            ["à + les", "aux"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "de + article",
          subtitulo: "do, da, dos",
          linhas: [
            ["de + le", "du"],
            ["de + la", "de la"],
            ["de + l'", "de l'"],
            ["de + les", "des"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "avec à",
          subtitulo: "usos comuns",
          linhas: [
            ["jogar (esporte)", "jouer au foot"],
            ["sentir dor", "avoir mal aux dents"],
            ["sabor", "une tarte aux pommes"],
            ["pensar em", "penser aux vacances"],
            ["falar com", "parler au directeur"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "avec de",
          subtitulo: "usos comuns",
          linhas: [
            ["tocar (instrumento)", "jouer du piano"],
            ["posse", "le livre du prof"],
            ["perto de", "près du métro"],
            ["falar sobre", "parler des films"],
            ["ao lado de", "à côté de la gare"],
          ],
        },
      ],
      dica:
        "Atenção: só <code>le</code> e <code>les</code> se juntam (<code>au</code>, <code>aux</code>, <code>du</code>, <code>des</code>); <code>la</code> e <code>l'</code> nunca mudam. <code>Jouer à</code> é para esportes e jogos (<i>jouer au tennis</i>) e <code>jouer de</code> é para instrumentos (<i>jouer de la guitare</i>). E <code>des</code> pode ser de + les (<i>le prix des livres</i>) ou o artigo indefinido plural (<i>des livres</i>).",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "un café au lait",
        "la tarte aux fraises",
        "le chien du voisin",
        "la fin des vacances",
        "jouer aux cartes",
        "jouer du violon",
      ],
    },
    questoes: [
      {
        tipo: "Jouer à",
        enunciado: "Mon frère joue ___ tennis le samedi.",
        opcoes: ["au", "du", "à le", "aux"],
        correta: 0,
        explicacao:
          "Para esportes usamos <i>jouer à</i>. <i>Tennis</i> é masculino: à + le = <i>au</i>.",
      },
      {
        tipo: "Jouer de",
        enunciado: "Ma sœur joue ___ guitare depuis deux ans.",
        opcoes: ["à la", "au", "de la", "du"],
        correta: 2,
        explicacao:
          "Para instrumentos usamos <i>jouer de</i>. <i>Guitare</i> é feminino, então nada se junta: <i>de la guitare</i>.",
      },
      {
        tipo: "Avoir mal",
        enunciado: "Après le match, j'ai mal ___ jambes.",
        opcoes: ["au", "des", "aux", "à les"],
        correta: 2,
        explicacao:
          "<i>Avoir mal à</i> + parte do corpo. <i>Jambes</i> está no plural: à + les = <i>aux</i>.",
      },
      {
        tipo: "Posse",
        enunciado: "C'est la voiture ___ voisin.",
        opcoes: ["de le", "du", "au", "des"],
        correta: 1,
        explicacao:
          "Para posse usamos <i>de</i>. <i>Voisin</i> é masculino singular: de + le = <i>du</i>. <i>La voiture du voisin</i> = o carro do vizinho.",
      },
      {
        tipo: "Sabor",
        enunciado: "Je voudrais une glace ___ chocolat, s'il vous plaît.",
        opcoes: ["au", "du", "de", "à le"],
        correta: 0,
        explicacao:
          "Para o sabor usamos <i>à</i>. <i>Chocolat</i> é masculino: <i>une glace au chocolat</i>.",
      },
      {
        tipo: "Antes de vogal",
        enunciado: "Le restaurant est près ___ hôtel.",
        opcoes: ["du", "de l'", "de le", "au"],
        correta: 1,
        explicacao:
          "<i>Hôtel</i> começa com h mudo, então o artigo é <i>l'</i>, que nunca se junta: <i>près de l'hôtel</i>.",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>“Eu penso nas férias”</b>?",
        opcoes: [
          "Je pense des vacances.",
          "Je pense à les vacances.",
          "Je pense aux vacances.",
          "Je pense de les vacances.",
        ],
        correta: 2,
        explicacao:
          "<i>Penser à</i> = pensar em. <i>Vacances</i> está no plural: à + les = <i>aux</i>.",
      },
      {
        tipo: "Des ou des ?",
        enunciado: "Em qual frase <b>des</b> = <b>de + les</b>?",
        opcoes: [
          "J'achète des pommes.",
          "Il y a des enfants dans le parc.",
          "Le prix des billets est élevé.",
          "Tu as des frères ?",
        ],
        correta: 2,
        explicacao:
          "<i>Le prix des billets</i> = o preço dos bilhetes (de + les). Nas outras frases, <i>des</i> é o artigo indefinido plural (uns, umas).",
      },
      {
        tipo: "Diálogo",
        enunciado: "— Vous parlez ___ nouveau film ?<br>— Oui, il est super !",
        opcoes: ["au", "du", "des", "de le"],
        correta: 1,
        explicacao:
          "<i>Parler de</i> = falar sobre. <i>Film</i> é masculino singular: de + le = <i>du</i>.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Il joue du violon.",
          "Elle parle aux enfants.",
          "C'est le chat des voisins.",
          "Nous rentrons de le travail.",
        ],
        correta: 3,
        explicacao:
          "<i>De le</i> não existe: de + le vira sempre <i>du</i>. O certo é <i>Nous rentrons du travail.</i>",
      },
    ],
  },
  {
    slug: "pour-ou-parce-que",
    nivel: "a1",
    destaque: "Pour",
    resto: "ou parce que ?",
    descricao:
      "Pour (para, objetivo) e parce que (porque, causa), e a pergunta pourquoi.",
    quadro: {
      titulo: "Pour · parce que",
      subtitulo: "objetivo ou causa?",
      blocos: [
        {
          tipo: "tabela",
          titulo: "pour",
          subtitulo: "para · objetivo",
          linhas: [
            ["+ infinitivo", "pour apprendre"],
            ["+ nome", "pour mon travail"],
            ["+ pessoa", "pour ma mère"],
            ["exemplo", "je travaille pour voyager"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "parce que",
          subtitulo: "porque · causa",
          linhas: [
            ["+ frase completa", "parce que j'ai faim"],
            ["antes de il", "parce qu'il pleut"],
            ["antes de elle", "parce qu'elle est malade"],
            ["antes de on", "parce qu'on est en retard"],
          ],
        },
        {
          tipo: "tabela",
          titulo: "pourquoi ?",
          subtitulo: "a pergunta",
          linhas: [
            ["por quê?", "pourquoi ?"],
            ["resposta: causa", "parce que…"],
            ["resposta: objetivo", "pour…"],
            ["informal", "pourquoi tu pars ?"],
          ],
        },
      ],
      dica:
        "Atenção: depois de <code>pour</code> vem um verbo no infinitivo ou um nome (objetivo = <i>para</i>). Depois de <code>parce que</code> vem uma frase completa, com sujeito e verbo (causa = <i>porque</i>). Antes de vogal: <code>parce qu'il</code>, <code>parce qu'elle</code>, <code>parce qu'on</code>. <code>Pourquoi</code> é a pergunta; <code>parce que</code> é a resposta.",
    },
    exemplos: {
      rotulo: "Exemplos úteis",
      itens: [
        "J'apprends le français pour voyager",
        "C'est pour toi !",
        "Je suis content parce que c'est vendredi",
        "Pourquoi pas ?",
      ],
    },
    questoes: [
      {
        tipo: "Objetivo",
        enunciado: "J'étudie le français ___ voyager en France.",
        opcoes: ["parce que", "pour", "pourquoi", "parce qu'"],
        correta: 1,
        explicacao:
          "Depois da lacuna vem um verbo no infinitivo (<i>voyager</i>) e a ideia é de objetivo: <i>pour voyager</i> = para viajar.",
      },
      {
        tipo: "Antes de vogal",
        enunciado: "Je ne sors pas ___ il pleut.",
        opcoes: ["pour", "parce que", "parce qu'", "pourquoi"],
        correta: 2,
        explicacao:
          "É uma causa com frase completa (<i>il pleut</i>), então usamos parce que. Antes de vogal, <i>que</i> vira <i>qu'</i>: <i>parce qu'il pleut</i>.",
      },
      {
        tipo: "Objetivo",
        enunciado: "Elle va à la boulangerie ___ acheter du pain.",
        opcoes: ["pour", "parce que", "parce qu'", "pourquoi"],
        correta: 0,
        explicacao:
          "O objetivo de ir à padaria é comprar pão: <i>pour</i> + infinitivo (<i>acheter</i>).",
      },
      {
        tipo: "Causa",
        enunciado: "Nous mangeons maintenant ___ nous avons faim.",
        opcoes: ["pour", "pourquoi", "pour que", "parce que"],
        correta: 3,
        explicacao:
          "Depois vem uma frase completa (<i>nous avons faim</i>) que explica a causa: <i>parce que</i>.",
      },
      {
        tipo: "Pergunta",
        enunciado:
          "___ tu apprends le français ? — Parce que j'adore la France.",
        opcoes: ["Pourquoi", "Parce que", "Pour", "Comment"],
        correta: 0,
        explicacao:
          "A resposta começa com <i>parce que</i>, então a pergunta é <i>pourquoi</i> (por quê).",
      },
      {
        tipo: "Tradução",
        enunciado: "Como se diz <b>“Este presente é para a minha mãe”</b>?",
        opcoes: [
          "Ce cadeau est parce que ma mère.",
          "Ce cadeau est pour ma mère.",
          "Ce cadeau est pourquoi ma mère.",
          "Ce cadeau est parce qu'à ma mère.",
        ],
        correta: 1,
        explicacao:
          "<i>Pour</i> + pessoa indica para quem é algo: <i>pour ma mère</i>.",
      },
      {
        tipo: "Escolha",
        enunciado: "Qual frase está correta?",
        opcoes: [
          "Je travaille pour je gagne de l'argent.",
          "Je travaille parce que gagner de l'argent.",
          "Je travaille pour gagner de l'argent.",
          "Je travaille pourquoi gagner de l'argent.",
        ],
        correta: 2,
        explicacao:
          "Objetivo + verbo no infinitivo pede <i>pour</i>: <i>pour gagner</i>. <i>Parce que</i> precisaria de sujeito e verbo conjugado.",
      },
      {
        tipo: "Diálogo",
        enunciado:
          "— Pourquoi tu es en retard ?<br>— ___ le bus est en retard aussi !<br>— Ah, d'accord.",
        opcoes: ["Pour", "Parce que", "Parce qu'", "Pourquoi"],
        correta: 1,
        explicacao:
          "A pergunta com <i>pourquoi</i> pede a causa: <i>parce que</i>. <i>Le</i> começa com consoante, então não há elisão.",
      },
      {
        tipo: "Caça ao erro",
        enunciado: "Qual destas frases tem um <b>erro</b>?",
        opcoes: [
          "Il dort parce qu'il est fatigué.",
          "Je cours pour être en forme.",
          "Elle pleure parce que elle est triste.",
          "On sort pour voir nos amis.",
        ],
        correta: 2,
        explicacao:
          "Antes de vogal, <i>parce que</i> vira <i>parce qu'</i>: <i>parce qu'elle est triste</i>.",
      },
      {
        tipo: "Pour + nome",
        enunciado: "Mon père fait du sport ___ sa santé.",
        opcoes: ["parce que", "parce qu'", "pourquoi", "pour"],
        correta: 3,
        explicacao:
          "Depois vem um nome (<i>sa santé</i>), não uma frase completa. O objetivo é a saúde: <i>pour sa santé</i>.",
      },
    ],
  },
];

export function tituloAtividade(a: Atividade): string {
  return `${a.destaque} ${a.resto}`;
}

export function atividadesDoNivel(nivel: Nivel): Atividade[] {
  return atividades.filter((a) => a.nivel === nivel);
}

export function buscarAtividade(
  nivel: string,
  slug: string,
): Atividade | undefined {
  return atividades.find((a) => a.nivel === nivel && a.slug === slug);
}
