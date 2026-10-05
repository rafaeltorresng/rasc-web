# Capture → Refine → Keep — nova estrutura

4 de outubro de 2026. Trabalho local em `rasc-web`; app não alterado nesta rodada.

## Problema e direção

A seção anterior associava três artigos de 390px a uma demo sticky, com seleção
indireta por IntersectionObserver. O observer comparava apenas os entries da
atualização, não toda a seção; a escolha visual podia depender da rolagem e dos
limiares. Em mobile, três cenas completas eram renderizadas, além da cena desktop
oculta. A narrativa, o estado do produto e a navegação não compartilhavam controle.

Substituído por uma única seção editorial com três tabs visíveis e um palco.
Desktop: explicação à esquerda, janela à direita. Tablet/mobile: explicação acima
do mesmo palco. Sem carousel automático, sticky ou três demonstrações duplicadas.
Titulação curta e ritmo reservado para manter navegação e ações no mesmo lugar.

## Navegação e causalidade

- Capture: painel vazio, digitação, original. Para após 2.5s.
- Refine: shaping por 2.3s, proposta pendente. Não há autoaccept.
- Accept: aplica a fixture observada e mantém a janela aberta.
- Keep: cue por 450ms, dismiss por 500ms e retorno ao trabalho. Sem repetição.
- Continuar de Refine sem Accept usa explicitamente “Keep the original”. Não
  substitui o original por uma proposta. Refine permanece opcional.
- Botões nativos Refine, Accept, Cancel e Keep controlam a mesma seção.
- Selecionar uma tab novamente reinicia sua demonstração. “Start another thought”
  retorna a Capture. Navegação rápida cancela a sequência anterior.

O relógio compartilhado para em fronteiras da timeline. Documentos ocultos e
saída do viewport suspendem o tempo. Reduced motion mostra estados estáticos e
mantém a interação. Uma proposta já aceita permanece aceita ao mudar a preferência.
Caret/Orb param quando a pequena sequência termina; não há movimento automático
persistente nesta seção.

## Composição e ChatGPT

ChatGPT voltou a light mode em todas as cenas. A hero preserva seu Mac/wallpaper.
Nas etapas, o contexto é a janela ChatGPT em uma superfície quente e quieta,
sem repetir barra do Mac e wallpaper laranja. A conversa é fictícia e permanece
estável; a mesma instância do scratchpad apresenta os estados e é dispensada em Keep.

Palco 430px desktop, 410px compacto/tablet, 344px mobile e 360px estreito.
Scratchpad limitado a 560px; no mobile mantém editor de 14px e altura suficiente
para original/proposta. Tabs sempre aparecem juntas; espaços reservados em copy
e caption reduzem deslocamentos entre etapas. Esses são valores implementados,
não aprovação visual dos viewports.

Orb continua composing fora de Refine e shaping durante Refine, na paleta
violet/orange compartilhada com o app. Identidade, fontes, assets e fixtures reais
permanecem. Sem dependências, novos ícones ou alterações na distribuição.

## Acessibilidade

Tablist/tabpanel associados; uma tab no fluxo de teclado. ArrowLeft/ArrowRight
com wrap, Home/End e clique selecionam a etapa. Foco permanece em elemento estável:
Cancel/Keep levam à tab selecionada; após Accept, o botão de continuação recebe
foco com o label atualizado. Movimentos de foco usam preventScroll.

Caption polite/atomic anuncia fronteiras úteis, sem atualização por caractere.
Painel dispensado/closing usa inert e aria-hidden. Foco no painel pausa a sequência.
Hover/focus/reduced-motion seguem os tokens existentes. AAT/teclado no navegador
ainda não inspecionados; testes verificam a lógica e os atributos React.

## Validação

Harness temporário `/private/tmp/rasc-interaction/verify.mjs`, React 19/StrictMode:
palco único, tabs, roving tabindex, setas/Home/End, Capture vazio→original,
Refine pendente, Accept explícito, Keep original/aprovado, Cancel/restart e foco,
navegação rápida, suspensão de viewport/aba, reduced motion inicial/live, retenção
das instâncias de janela/fundo e limpeza de timers/listeners. Passou.

Harness existente de quatro ciclos da hero, Home/Search, SSR, CTAs reais,
disclosures, fixture e checksums passou. Build/lint passaram. Sem aprovação
renderizada: o bloqueio administrativo do navegador já registrado continua.
Composição final, hover/focus reais e overflow em 1440/1366/1024/768/390/320px
permanecem pendentes; não foram declarados aprovados pela leitura do CSS.

Arquivos: novo `src/page/InteractionStory.tsx`, `LandingPage.tsx`, `copy.ts`,
`ProductScenes.tsx`, `WorkContext.tsx`, `timeline.ts`, `styles.css`, README e
documentação. Componentes/timers/CSS da antiga seção removidos. Sem commit,
push ou deploy. `rasc` conserva apenas as alterações previamente autorizadas.
