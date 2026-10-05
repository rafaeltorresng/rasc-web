# Rasc — implementação da direção da hero

Registro histórico da implementação inicial. A [evolução de 4 de outubro](HERO-EVOLUTION-2026-10-04.md) substitui as descrições abaixo sobre hero finita, toast, Replay, Explore the steps e disclosure de download na hero. Home/Search continua finita. A captura desktop fornecida pelo usuário permitiu avaliar o estado de retorno anterior; a nova composição ainda requer inspeção renderizada.

3 de outubro de 2026. Implementação local concluída; aprovação visual e lançamento ainda pendentes. Não chamar esta versão de launch-ready antes da inspeção renderizada.

Material da barra, atualizado em 4 de outubro: foi possível inspecionar os
Ajustes → Menu Bar e confirmar “Show menu bar background: off”. macOS 26.5.1,
aparência Dark. A faixa branca a 88% e seu divisor foram removidos; barra
transparente, ícones/texto claros e sombra discreta sobre Hello Orange. O
tratamento segue a barra transparente do Tahoe, sem simular um vidro fosco
inexistente no estado idle. Preferências de mais contraste/redução de
transparência recebem fallback escuro opaco. Nenhuma preferência do Mac foi
alterada; Ajustes retornaram a General. Referência Apple e evidência constam em
`public/mac-workspace/icons/ASSET-SOURCE.md`. Build/lint passaram; revisão
renderizada da landing continua pendente pelo bloqueio já registrado.

Atualização de 4 de outubro, conforme pedido do usuário: somente na hero, painel
reduzido de máximo 720px para 560px (proporção 720:440 preservada em desktop),
540px em tablet e altura mínima 238px em mobile / 258px em narrow mobile. Texto
do editor permanece legível sem escala por transform. Capture/Refine/Keep fora
da hero mantêm a geometria anterior. Cue atualizado para “Native Mac app · Open
source”, sem alterar a informação de publicação pendente do repositório.

Indicadores aproximados substituídos por recursos locais macOS: SF Symbols wifi
e switch.2, outline/cap de bateria do ControlCenter. Assets e geometria foram
inspecionados individualmente; a inspeção da barra nativa voltou a expirar.
Fonte e limites: `public/mac-workspace/icons/ASSET-SOURCE.md`.

Novo `src/product/MacClock.tsx`: data atual em inglês com dia da semana e mês,
hora local atual em 24h, atualização na virada do minuto, suspensão quando a
página está oculta e refresh ao voltar. Narrow scenes preservam hora e reduzem
a data antes de comprimir o produto. A preferência de movimento reduzido não
congela o relógio: atualização textual do horário não anima o produto. A data
não foi fixada no sábado do exemplo; segue o dia atual de cada visitante.

Build/lint e harness de interação passaram novamente. Verificação específica
do relógio com timezone America/Fortaleza passou: virada de dia/data, 23:59 para
00:00, agendamento no próximo minuto, suspensão/retorno e cleanup em StrictMode.
Testes temporários não adicionam dependências à landing. A abertura da landing
no navegador continua bloqueada pela verificação de política administrativa;
não houve screenshots ou nova aprovação visual dos viewports.

Atualização posterior nesta mesma data: a pedido do usuário, o ambiente Mac passou a usar o wallpaper real “Hello Orange”. A seleção e a aparência foram verificadas nos Ajustes do Mac. O asset oficial Apple foi resolvido pelo catálogo local e seu checksum validado; frame dark 1, JPEG 1920 × 1920, 229,177 bytes. Fundo estático restrito ao palco e às cenas do produto, preloaded no HTML. Barra de menu ganhou superfície mais opaca para preservar contraste. Fonte e conversão estão documentadas em `public/mac-workspace/ASSET-SOURCE.md`. Nenhum wallpaper ou preferência do Mac foi alterado. A inspeção visual da imagem nativa foi possível; a revisão renderizada da landing continua pendente.

## 1. Baseline e problema

A implementação de 2 de outubro já tinha download real, identidade derivada dos assets nativos, ambiente Mac sintético, sequência causal e cenas reutilizáveis. A hero empilhava bastante conteúdo antes do produto, mostrava seis seletores de estado permanentemente e repetia a demonstração em loop. O primeiro fixture verificado tinha uma mudança muito pequena. Pausar via foco também podia interferir com os próprios controles de reprodução.

## 2. Decisões visuais

Introdução editorial em duas colunas no desktop: headline à esquerda, descrição e download à direita. Em tablet/mobile, uma coluna centrada. Título limitado a 64px, margens superiores menores, descrição de uma frase e detalhes do download compactos. Essa composição busca colocar o conteúdo do editor na primeira tela de laptop; ainda não há medição renderizada que confirme o resultado.

O palco principal tem 490px no desktop, preservando espaço para a barra Mac e o painel de proporção nativa 720:440. Após o pedido de 4 de outubro, limita o painel a 560px em desktop/compacto e 540px em tablet; em mobile, adapta largura e altura e mantém texto de 14px inclusive a 320px. Esses valores precisam de confirmação visual.

## 3. Marca

Preservados o símbolo estático, wordmark, favicon e o wrapper raster-derived corrigidos no passe anterior. Nenhum novo logo foi inventado. O símbolo identifica Rasc; a Orb permanece na interface do produto. Não há Orb central decorativa na identidade da hero.

## 4. Conceito final implementado

Atualização após aprovação do usuário: o documento genérico foi substituído por uma simulação estática do ChatGPT. Projeto fictício “Workshop”, conversa “Reviewing the proposal”, pergunta sobre o que revisar antes de compartilhar uma nova versão e resposta curta com três pontos. Não reproduz o projeto RASC, conversas pessoais ou conteúdo confidencial. Texto centralizado em `workspaceExample`; ambiente separado em `src/product/WorkContext.tsx` e compartilhado pelas cenas Capture/Refine/Keep.

O ambiente usa o wallpaper Hello Orange já verificado, janela clara com lateral, conversa e compositor. ChatGPT permanece estável antes, durante e depois da interação; não recebe automaticamente o pensamento, não gera uma nova resposta e não sugere integração com Rasc. A interface é uma ilustração simplificada e reconhecível, não uma cópia pixel-exact da versão atual: a ferramenta bloqueou a inspeção nativa do aplicativo.

Barra Mac com menu Apple, nome ChatGPT, menus, símbolos ChatGPT/Superwhisper/Rasc, bateria, Wi-Fi, controle e data/hora locais atuais (substituindo 9:41 em 4 de outubro). Símbolo Rasc usa o asset nativo MenuBarIcon com template intent, distinto da Orb. ChatGPT continua como aplicativo principal enquanto o scratchpad recebe foco, coerente com o `.nonactivatingPanel` real. Não houve confirmação da barra atual do usuário; as consultas ao SystemUIServer e ControlCenter expiraram. Cursor não foi adicionado como ícone de barra sem fonte verificada. Proveniência dos assets: `public/mac-workspace/icons/ASSET-SOURCE.md`.

Container queries adaptam o contexto à largura de cada cena, incluindo o painel estreito na seção de passos em desktop. A lateral desaparece abaixo de 530px; menus extras e indicadores secundários saem antes de comprimir o editor. A 350px ou menos, permanecem identidade ChatGPT, Rasc, bateria, Wi-Fi e horário. Corpo da conversa é recortado no viewport acima do compositor; nenhuma superfície de fundo recebe foco ou interação. Não há blur, câmera, animação decorativa, dependência nova ou requisição externa da demo.

Trabalho → ⌥\ → painel vazio → digitação → ⌘J → shaping → proposta pendente → Accept → Keep → mesmo trabalho. O painel começa a aparecer aos 650ms; digitação começa aos 950ms. O ciclo completo dura 13.55s e executa uma vez, sem retornar automaticamente ao início.

Ao final, uma legenda externa à UI do aplicativo indica “Thought kept. Back to your work.”. Ela é anotação do simulador, não reprodução de uma notificação do produto.

## 5. Exemplo e avaliação real

Original:

> before sending another draft ask whats still unclear maybe a quick conversation would help

Proposta:

> Before sending another draft, ask what's still unclear. Maybe a quick conversation would help

Escolhido por ser um pensamento realista de follow-up, compreensível entre profissões e por apresentar uma alteração perceptível de pontuação sem acrescentar conteúdo. Preserva “maybe”. Não acrescentar um ponto final ou reescrever o resultado para embelezar a transformação: a proposta publicada é a saída observada.

Três candidatos × três repetições, executados no binário Debug anteriormente construído a partir do provider de produção, com corpus e resultados isolados em `/private/tmp/rasc-hero-v2`. Nenhuma alteração no aplicativo, em prompts ou em bases pessoais.

| Candidato | Resultado observado | Decisão |
| --- | --- | --- |
| Explicação longa / começar com exemplo | Duas saídas completas; uma removeu a incerteza e a observação inicial | Rejeitado |
| Reunião / perguntas antes de updates | Duas saídas distintas; uma execução sem mudança | Rejeitado |
| Follow-up / conversa antes de novo draft | Mesma proposta em 3/3, sem rejeição de produção e com incerteza preservada | Selecionado |

Evidência: `hero-refine-evidence-2026-10-03.json`. Três execuções comprovam plausibilidade e consistência neste ambiente, não determinismo universal do modelo. A landing usa fixture determinístico e não faz inferência pública.

## 6. Product Scene System

`useScenePlayback.ts` centraliza reprodução finita de hero e Home/Search. Saída do viewport e documento oculto suspendem o tempo; pausa persiste; retomada continua; Replay reinicia. Digitação atualiza somente durante a fase animada; outras fases agendam a próxima fronteira.

Refine manual executa shaping e para na proposta pendente. Accept manual mantém o estado aprovado. Keep manual conclui e dispensa o painel. Guardar o original sem Accept não substitui silenciosamente o texto por uma proposta. Selecionar estados manualmente suspende autoplay.

Exploração dos seis estados e transcrição original/proposta ficam em “Explore the steps”, expandível. Pausa e Replay permanecem visíveis. Foco dentro do painel pausa a sequência; os controles de reprodução não possuem esse efeito colateral.

## 7. Orb e movimento

Preservado o canvas nativo de 20px e a geometria de shaping derivada de ThinkingOrbsKit. O scratchpad real resolve `.refining` durante Refine e `.breathing` nos demais estados; isso foi reconferido em ScratchpadView.swift. Não houve adição de shader, glow ou morph de Home para scratchpad.

Orb e caret param quando a hero é pausada, sai da área visível ou o documento é oculto. Aparição tem deslocamento menor e escala inicial mais discreta. Texto e fundo não recebem movimento decorativo.

## 8. Home/Search e GitHub

A copy de recuperação estabelece continuidade explícita com o pensamento guardado na hero. A nota selecionada usa exatamente a mesma proposta; a busca por `draft` encontra apenas essa nota. Home antecede Search; a demonstração termina no resultado e oferece controles para Home, Search e Replay.

GitHub continua secundário no header, confiança e footer. Fonte real: https://github.com/rafaeltorresng/rasc. API autenticada reconferida em 3 de outubro: licença MIT, repositório privado e zero releases. Mantida a informação de que publicação do código está pendente. Não houve mudança de visibilidade, release ou publicação.

## 9. Download

Todas as três CTAs continuam apontando para `/downloads/Rasc-0.1.0-beta.3.dmg`. Fonte original: `/Users/rafatorres/Desktop/rasc/build/rc/Rasc-0.1.0-beta.3.dmg`. Versão 0.1.0-beta.3, build 4, Apple silicon, macOS 14+. SHA-256: `41094a2612d6e38c3ee94ae0d2ac529274e71a56c0282ed154e9cd8ad0045cc2`.

“Download details” mantém versão completa, build, ausência de notarização, requisito adicional do Refine e checksum. No desktop, a linha de compatibilidade e o acionador ficam compactos junto à CTA. Nenhum fato foi escondido ou URL de release inventada.

## 10. Responsive

Mantidos os breakpoints existentes, com ajustes à nova introdução e ao palco. Colunas apenas acima de 820px. Transcript passa a uma coluna no mobile; seletores podem quebrar linha. A 320px, o painel ganha altura em vez de reduzir o editor para 13px. Os detalhes do download ficam centralizados nos tamanhos de uma coluna.

Nenhum viewport foi visualmente aprovado. Revisão pendente: 1440, 1366, 1024, 768, 390 e 320px, com screenshots da primeira tela, de todos os estados e do restante da página. Não há afirmação de ausência de overflow baseada somente no código.

A tentativa após esta atualização de abrir `http://127.0.0.1:5173/` no navegador da ferramenta voltou a falhar: a política administrativa não pôde ser verificada e o acesso não foi concedido. Não foi usado outro mecanismo para contornar o bloqueio.

## 11. Acessibilidade e reduced motion

Modo reduced motion começa em proposta estática e permite avançar manualmente por Accept, Keep e outros estados. Transcript permite comparar original e proposta sem assistir à digitação. Sem timers de reprodução ativos nesse modo, Orb contínua ou caret animado. O relógio local continua atualizando o texto do horário a cada minuto.

Mantidos skip link e foco violet. Elementos do painel dispensado e Search oculto usam aria-hidden/inert. Removidas regiões live desnecessárias no texto digitado/preview para evitar anúncios ao ritmo da reprodução. Pausa é um controle persistente, não depende de manter hover/foco.

## 12. Performance

Nenhuma dependência adicionada ao projeto. React 19 + TypeScript + Vite mantidos. Atualizações frequentes ficam restritas à digitação; o relógio não roda depois do fim, fora de viewport ou com a página oculta. O documento de trabalho é DOM estático, sem imagem pesada ou vídeo em autoplay.

Build após a atualização de 4 de outubro: aproximadamente 231.1KB de JavaScript / 72.4KB gzip e 33.6KB CSS / 7.9KB gzip. Nenhuma dependência adicionada. Ícones locais pequenos, servidos pelo mesmo host; sem fontes externas, chamadas de modelo ou captura da máquina do visitante. Esses tamanhos não são uma medição de Lighthouse, Core Web Vitals ou runtime em dispositivo real.

## 13. Validação realizada

- Build de produção e lint passaram.
- Harness temporário com React test renderer, StrictMode e relógio controlado passou: pausa persistente, retomada, suspensão, término sem loop, Replay durante e após reprodução, Refine manual sem autoaccept, Accept manual sem autokeep, Keep original, mudança para reduced motion e avanço estático.
- Componentes hero/Home/Search verificados por árvore React; estados e controles passaram. Isso não testa layout de navegador.
- SSR nas duas preferências de movimento, três CTAs diretas, skip link, disclosure de assinatura e de publicação do source passaram.
- Proposta selecionada coincide com as três saídas reais; fixture de recuperação e busca única passaram.
- Checksum no public/dist passou; endpoint da landing e DMG responderam HTTP 200. O servidor local segue em http://127.0.0.1:5173/.

Após a mudança do ambiente para ChatGPT, build/lint e o harness de estados foram executados novamente e passaram. Exportações PNG de menu possuem alpha válido; Rasc MenuBarIcon permanece cópia byte a byte. Esses checks não aprovam composição, legibilidade ou responsividade renderizadas.

O harness está em `/private/tmp/rasc-hero-v2/verify.mjs`. Sua dependência de teste foi instalada apenas nesse diretório temporário; não alterou o package.json da landing. Test renderer emite seu aviso de depreciação; os testes aqui verificam componentes e efeitos, sem navegador ou layout.

## 14. Arquivos materialmente alterados

`src/page/LandingPage.tsx`, `src/page/Brand.tsx`, `src/content/copy.ts`, `src/content/fixtures.ts`, `src/product/ProductScenes.tsx`, `src/product/timeline.ts`, novo `src/product/useScenePlayback.ts`, `src/styles.css`, `README.md`, anotação histórica em `docs/CURRENT-LANDING-REVIEW.md`, novo `docs/hero-refine-evidence-2026-10-03.json` e este relatório.

Esta atualização de contexto altera `src/content/fixtures.ts`, `src/product/ProductScenes.tsx`, `src/styles.css`, `README.md` e este relatório; adiciona `src/product/WorkContext.tsx`, quatro assets em `public/mac-workspace/icons/` e seu `ASSET-SOURCE.md`. Não altera o relógio, a transformação publicada, CTAs, conteúdo de confiança, Home/Search ou a Orb.

Atualização de 4 de outubro: `src/page/LandingPage.tsx` (cue),
`src/styles.css` (dimensões da hero/barra), `src/product/WorkContext.tsx`
(indicadores/relógio), novo `src/product/MacClock.tsx`, quatro PNGs nativos em
`public/mac-workspace/icons/`, documentação de assets, README e este relatório.
Nenhuma alteração no aplicativo macOS.

### Revisão adicional de ChatGPT e ícones — 4 de outubro

A inspeção nativa do ChatGPT foi novamente negada pela ferramenta por segurança.
A estrutura lateral foi atualizada a partir da ilustração oficial de desktop em
https://learn.chatgpt.com/docs/quickstart: seletor ChatGPT, New chat, Projects,
Plugins e Chats. O projeto fictício Workshop aparece fixado, possibilidade
documentada em https://learn.chatgpt.com/docs/projects. O título da conversa
substitui o seletor duplicado no cabeçalho largo; em telas compactas, ChatGPT
continua identificável quando a lateral é ocultada. Cabeçalho da conversa,
composer, tema e geometria ainda são interpretações simplificadas, sem alegação
de equivalência à versão instalada do usuário.

Apple usa agora `apple.logo` nativo de 14pt, 13 × 16pt, exportado a 3×. Rasc
preserva o template original a 32pt, com símbolo visível de 16pt. Cada indicador
mantém suas dimensões e proporções; slots centralizados compartilham alinhamento
e espaçamento. Ocultar um ícone opcional remove seu slot completo. A barra
transparente, o relógio vivo e o painel reduzido da hero permanecem.

Build, lint e o harness existente de estados/SSR passaram após essas alterações.
Bundle: JS 231.54KB / 72.48KB gzip; CSS 34.03KB / 8.03KB gzip. Não houve nova
dependência. Arquivos desta revisão: `src/product/WorkContext.tsx`,
`src/styles.css`, `public/mac-workspace/icons/apple-menu.png`, documentação de
assets, README e este relatório. `rasc` continua sem modificações.

Não houve aprovação visual em navegador nem comparação com screenshot do app.
Uma captura fornecida pelo usuário, incluindo a barra do Mac e com conteúdo
privado ocultado, é a evidência faltante para conferir a sua apresentação exata.

## 15. Bloqueios e limites

A tentativa de abrir a landing no navegador falhou porque a política administrativa de acesso não pôde ser verificada. Não usei outro navegador ou captura indireta para contornar o bloqueio. Screenshots, inspeção visual, hover/focus reais, overflow, comparação de enquadramentos móveis e Lighthouse continuam pendentes. Isso impede afirmar que a qualidade visual final foi atingida.

Lançamento também continua dependendo de publicação real do repositório, distribuição assinada/notarizada e hosting. Essas ações externas não foram autorizadas nem executadas.

`rasc` não foi modificado. Foram usados como fonte os tokens de TransientSurfaceStyle, geometria de RascWindowMetrics, comportamentos de AppBootstrap/PanelController/ScratchpadView, logo raster canônico do app e ThinkingOrbsKit. Foregrounds graphite e ambiente quente são decisões documentadas da web, não falsos tokens nativos.

Continuam superadas as instruções históricas sobre repo sem frontend, beta via mailto, exemplo Maya, produto fechado pago e captura como única forma permitida de demo. O contexto canônico e a autorização explícita para implementação governam esta rodada.
