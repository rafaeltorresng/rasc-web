# Trechos editoriais — 4 de outubro de 2026

O pedido foi dar mais vida aos trechos de texto, seguindo a direção proposta:
exemplos concretos, hierarquia editorial e movimentos curtos ligados à narrativa.
A ordem das seções foi preservada.

“Not every thought is a note yet.” mantém o título e substitui o parágrafo de
exemplos por três pensamentos incompletos, em tipografia serifada. A conclusão
ganha dois níveis: “Worth capturing. Not worth organizing. Yet.” e uma frase
curta sobre o papel do Rasc. A Orb editorial existente permanece ao lado.
Após o pedido seguinte, os pensamentos passaram a se revelar por grupos de
palavras, com aparência de formulação gradual, preservando a mesma redação.
Cada pensamento tem três grupos. Os exemplos abrangem uma pergunta, um lembrete
e uma frase incompleta.

“A scratchpad, not another system.” apresenta No folders / No prompt / No account
em três linhas, com sublinhados violetas discretos e a conclusão abaixo. Os
trechos de privacidade continuam estáveis.

EditorialEntrance usa IntersectionObserver para iniciar uma entrada única.
Conteúdo visível por padrão, inclusive sem suporte ao observer. A cena de
palavras usa um estado ready para preparar a revelação antes de entrar na
tela. Cada grupo aparece em 240ms; grupos começam a cada 280ms, concluindo cada
frase em 800ms, com 220ms de pausa até a próxima. A sequência completa leva
2840ms. Aspas acompanham a abertura e o último grupo de cada frase.

Todas as palavras já estão no DOM e na árvore de acessibilidade; a revelação
altera apenas a opacidade. Grupos inline-block mantêm tamanho e quebras de
linha constantes durante a escrita. Não há cursor ou atualização textual por
frame. O movimento da conclusão e das promessas continua em 500ms (mesmo tempo
do heroSettle nativo), com intervalo de 120ms e deslocamento de 8px. Essas
escolhas editoriais da web estão centralizadas com os demais tempos.
As três promessas terminam em 740ms. Não há loop, timer, alteração de layout,
scroll preso, blur ou texto anunciado em aria-live. Textos de apoio mantêm
opacidade integral.

Reduced motion desativa todas as entradas. Alterar a preferência durante a
exibição encerra o efeito e impede que ele recomece. Observers são desconectados
ao entrar ou desmontar. Não há nova dependência ou mudança no aplicativo rasc.

Validação: build/lint, harness existente das demos e harness editorial em
`/private/tmp/rasc-editorial/verify.mjs`. Verificados entrada única, conteúdo
presente por padrão, reduced motion inicial/dinâmico, fallback sem observer,
eventos enfileirados, limpeza StrictMode e conteúdo das duas seções. Verificados
também os nove grupos, a preservação do texto completo na árvore acessível e a
cadência (inícios das frases em 0/1020/2040ms, último grupo em 2600ms).
Os testes usam DOM mockado. A inspeção visual no navegador permanece bloqueada;
proporções finais, quebras e composição em cada viewport ainda precisam dessa
validação. As regras responsivas usam os breakpoints existentes (820px/600px),
colunas com minmax(0, ...) e pensamentos que podem quebrar livremente.

## Acentos de cor

Após o pedido de ampliar o uso de roxo/laranja, quatro pontos receberam acentos:
“unfinished thoughts” na Hero, os pensamentos editoriais, a indicação da etapa
ativa e o atalho ⌘P fora da demo. Hero usa o violeta nativo #7564D8; textos menores
usam o mapeamento web existente #6253BC, agora no token --violet-ink. Capture e
Keep ativos usam --action-fill (#C74A14); Refine ativo usa --violet-ink. O atalho
de Search usa o wash e stroke violetas da linguagem nativa. Valores de origem
foram conferidos em Rasc/UI/TransientSurfaceStyle.swift, em somente leitura.

Não foram adicionados novos tons de marca, fundos grandes ou gradientes. Build
e lint passaram. Contraste calculado na opacidade final: Hero 4.42:1 (texto
grande), pensamentos 5.80:1, indicação de ação 4.57:1, ⌘P no wash 4.94:1.
A limitação de inspeção visual descrita acima permanece.
