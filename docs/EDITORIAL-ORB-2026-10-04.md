# Orb editorial — 4 de outubro de 2026

Registro da implementação editorial inicial. A [atualização de paleta compartilhada](HERO-FOUR-CYCLES-2026-10-04.md) aplica estas cores também ao aplicativo e às demos inline, com autorização explícita. As referências abaixo a graphite e ao app sem modificações descrevem a rodada anterior.

Adicionada abaixo de “A thought. Still taking shape.” no trecho The place before
the note. Canvas de 80px no desktop; abaixo de 820px, frase e Orb ficam lado a
lado, com canvas de 64px e o mesmo preset geométrico px64. A seção e a identidade
Rasc continuam as mesmas.

A versão inicial executava um ciclo finito de shaping. O pedido seguinte
substituiu esse comportamento por um loop de quatro modos, e Searching foi
trocado por Composing conforme a correção do usuário. Sequência atual:
**Breathing → Connecting → Shaping → Composing → Breathing**.

Cada modo ocupa quatro segundos; os últimos 600ms misturam os desenhos de saída
e entrada com uma curva suave. O ciclo total tem 16 segundos. A ilustração
usa violeta dominante (`--violet`) com acento laranja (`--action-fill`),
restritos aos pontos e linhas, sem halo ou glow. O violeta ocupa os primeiros
58% do gradiente; o laranja aparece no extremo oposto. A opacidade do desenho
usa fator 0.96, preservando a profundidade e transparência dos pontos nativos. O aplicativo usa Orb monocromática; a cor é uma
variação editorial da web autorizada pelo pedido do usuário.

Geometria transcrita, em somente leitura, do ThinkingOrbsKit presente no Rasc:
`Core.swift`, `Strands.swift`, `Web.swift`, `Morph.swift`, `OrbSpec.swift` e
`Presets.swift`. Breathing é o anel radial, Connecting a constelação com conexões,
Shaping os contornos círculo/triângulo/quadrado, Composing a faixa ondulada.
Presets px64 e projeção/pontos/linhas seguem os valores nativos. Composing usa
velocidade padrão do kit; os demais usam os multiplicadores correspondentes de
RascOrb.swift. A licença MIT original foi incluída em
`public/THINKING-ORBS-LICENSE.txt`.

Um único canvas desenha o loop. O relógio é suspenso fora de vista, com a aba
oculta ou quando pausado; retomar mantém o instante anterior. O botão separado
de Pause foi removido conforme pedido. A própria Orb permite pausar/retomar
por clique ou teclado, sem texto ou moldura visível; mantém foco, nome acessível
e estado aria-pressed. O canvas é decorativo para leitores de tela. Reduced motion apresenta Breathing estático e remove o
controle de animação. A cor é calculada uma vez por efeito/resolução, sem alocar
um novo gradiente a cada frame. DPR limitado a 2, sem dependências novas.

O loop ilustra modos do kit; as demos do produto mantêm os estados reais do
aplicativo e as Orbs inline em graphite. A implementação anterior de reprodução
finita/colorida foi retirada do componente inline, mantendo o loop editorial
isolado em EditorialOrb.tsx. Não há inferência na página.

Validação realizada:
- Build e lint passaram.
- Harness existente de hero/Home/Search/SSR/CTAs/checksum passou.
- 16 quadros px64 dos quatro modos foram comparados com cálculos do código Swift
  nativo, sem modificar ou executar o aplicativo. Todos coincidiram com tolerância
  1e-4; maior diferença observada aproximadamente 9.96e-11.
- Harness de canvas mockado passou: quatro modos, repetição do ciclo, crossfade,
  cache de cor, Pause/Resume, suspensão de tempo, reduced motion e limpeza
  StrictMode. Scripts em `/private/tmp/rasc-orb-loop`.

Os testes não verificam layout ou screenshots. A inspeção visual no navegador
continua bloqueada pela ferramenta. Não foi usado mecanismo alternativo para
contornar o bloqueio. `rasc` não foi modificado, confirmado por git status.

Arquivos: `src/page/ThoughtShaping.tsx`, `src/product/EditorialOrb.tsx`,
`src/product/editorialOrbFrames.ts`, `src/product/ThinkingOrb.tsx`,
`src/product/timeline.ts`, `src/styles.css`, licença, README e este relatório.
