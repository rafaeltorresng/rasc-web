# Header e iconografia — 4 de outubro de 2026

## Referências e decisão

Inspecionados, sem edição, no `trecho-web`: `index.html`,
`entrypoints/landing/styles.css`, `src/landing.ts` e o teste
`tests/e2e/header-scroll.spec.ts`. Screenshots existentes de 29 de setembro,
desktop 1440px e mobile 390px, foram vistos como evidência visual da referência.

Replicada a estrutura de uma única superfície: marca à esquerda, navegação ao
centro, CTA à direita; header fixo com espaço reservado no documento. No topo,
superfície transparente. A partir de 16px de scroll, borda discreta, superfície
clara, sombra leve, blur de 16px e raio de metade da altura. Retorna ao estado
inicial em 4px; a faixa entre os dois limites evita oscilação perto do topo.
Transição de 380ms com a mesma curva do Trecho. Posição e dimensões não são
alteradas pelo estado no CSS; ausência de salto não foi medida em navegador.

Rasc mantém seu símbolo, fonte de sistema, tokens quentes, laranja de ação,
links How it works/GitHub, CTA Download for Mac e toda a sequência da landing.
Não foram copiados copy, cores, marca, preços ou seções do Trecho. No mobile,
marca e download permanecem; GitHub continua disponível em confiança/footer.

## Ícones

Um componente pequeno inclui 14 glyphs SVG do Lucide com origem fixada no commit
`500620a2e8123f8d1db191538886dc0c223f69a9`. Grade 24×24, traço 1.75, terminais
arredondados, cor herdada. Substitui ícones improvisados de download, links,
replay, Home, Search, novo scratch e controles do ChatGPT simulado. Caracteres
dos atalhos de teclado permanecem, pois representam teclas reais do Mac.
Nenhuma biblioteca de runtime, fonte de ícones ou dependência nova.

O ícone colorido de Apple Intelligence foi extraído do asset nativo
`AppleIntelligenceIcon` do macOS 26.5.1, via Bundle/AppKit, com cores originais,
alpha e export 96×96. O asset foi visto antes de uso. Aparece em escala pequena,
20px na explicação de Refine e 24px em confiança. Identifica a tecnologia real
usada pelo produto; não muda a UI do scratchpad, a Orb nem a identidade Rasc.
Proveniência e licenças em `public/icons/ASSET-SOURCE.md`.

Ícones nativos de Wi-Fi, central de controle e bateria mantêm os assets e
dimensões da revisão anterior. Logo da landing e favicon não foram trocados.
Refine continua sendo uma fixture pública determinística, sem inferência na web.

## Acessibilidade e comportamento

SVGs decorativos têm `aria-hidden` e não recebem foco. Ações mantêm texto e nomes
acessíveis. O ícone colorido tem texto explicativo adjacente. Reduced motion
remove as transições por CSS; reduced transparency/mais contraste recebem
superfície opaca. Navegadores sem backdrop-filter também recebem fallback opaco.

Listeners de scroll são passivos; eventos acumulados são agrupados em um frame.
React só atualiza o header quando o estado muda. pageshow e scroll restaurado
são tratados. Listeners e frame pendente são limpos no unmount/StrictMode.

## Validação

- Build de produção e lint passaram.
- Harness de estados existente passou: reprodução, pausa, recuperação,
  preview/Accept/Keep, Home/Search, reduced motion, SSR, três CTAs diretas,
  disclosures, fixture real de Refine e checksum do DMG.
- Harness temporário de header passou: único header, CTA real, limites 16/4px,
  scroll passivo, coalescência, pageshow, scroll restaurado e limpeza StrictMode.
  Local: `/private/tmp/rasc-icons-header/verify-header.mjs`.
- Export nativo colorido preservado byte a byte no public; 10,391 bytes.
- Bundle JS: 233.76KB / 73.12KB gzip; CSS: 36.09KB / 8.41KB gzip.
- `rasc` e `trecho-web` seguem com git status limpo; nenhum deles foi editado.

O acesso de navegador à landing continua bloqueado pela verificação de política
administrativa da ferramenta. Não houve contorno por outro mecanismo. Os
screenshots vistos são do Trecho e do asset nativo, não do Rasc atualizado.
Composição renderizada, responsividade, foco/hover reais e overflow continuam
sem validação visual. Build e testes de árvore React não verificam esses itens.

## Arquivos desta revisão

Novos: `src/page/Header.tsx`, `src/ui/Icon.tsx`, `public/icons/apple-intelligence.png`,
`public/icons/LUCIDE-LICENSE.txt`, `public/icons/ASSET-SOURCE.md` e este relatório.
Atualizados: `src/page/LandingPage.tsx`, `src/page/Brand.tsx`,
`src/product/ProductScenes.tsx`, `src/product/WorkContext.tsx`, `src/styles.css`
e `README.md`.

DMG e GitHub mantidos: `/downloads/Rasc-0.1.0-beta.3.dmg` e
https://github.com/rafaeltorresng/rasc, com disclosure da publicação pendente.
Nenhum release, commit, push, deploy ou mudança de visibilidade foi feito.

## CTA neutra no início da rolagem — atualização

A CTA do header usa a superfície nativa --surface-raised (#F7F4FA), borda
--hairline (#E2DDE7) e texto graphite --ink no início da página. Após a correção
do usuário, passa ao laranja --action-fill em 96px de rolagem e volta ao neutro
em 32px no retorno. O estado data-download-prominent é separado do data-scrolled:
a superfície do header conserva a histerese 16/4px do Trecho. Pequenos movimentos
entre 32 e 96px não alternam repetidamente a cor da CTA.

Transição de cores de 380ms pelos tokens --header-transition/--header-ease,
sem mudança de dimensões.
Hover neutro usa branco com borda violeta discreta; pressionado usa violet-wash.
Reduced motion mantém a troca imediata pelas regras globais existentes.

Build e lint passaram. Harness de header atualizado passou: início neutro,
limites 96/32px, estabilidade entre os limites, overscroll negativo, retorno ao
topo, pageshow e restauração da página em 1px/80px/160px, além da limpeza e
histerese da superfície existentes. São testes de comportamento mockado; o bloqueio de inspeção visual
documentado acima permanece.
