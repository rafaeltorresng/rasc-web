# Hero — evolução de composição e continuidade

Registro da primeira evolução de 4 de outubro. A [atualização seguinte](HERO-FOUR-CYCLES-2026-10-04.md) adiciona quatro exemplos, muda o ChatGPT para dark mode e, com autorização explícita, aplica a paleta da Orb ao app e às demos. As referências abaixo a `rasc` sem modificações descrevem esta rodada anterior.

4 de outubro de 2026. Implementação local; sem alteração no aplicativo macOS.

## Evidência e decisão

A captura desktop fornecida pelo usuário mostra a hero após Keep: Rasc já saiu,
ChatGPT ocupa o palco e a confirmação aparece tanto no toast como na legenda.
Título violet, narração Georgia italic e hierarquia das CTAs foram mantidos.
O problema observado está na conclusão e na composição da demonstração.

## Implementação

- Sequência automática de 14.45s. Rasc sai; o trabalho permanece por 2.4s;
  começa uma nova invocação. Cada captura retoma o original, sem carregar uma
  aceitação da rodada anterior.
- A repetição pertence à hero. O relógio compartilhado permanece finito e
  Home/Search continua terminando no resultado.
- Refine manual para na proposta; Accept manual mantém o texto aprovado;
  Keep manual termina sem repetir. Resume explícito devolve controle ao roteiro.
- Pausa disponível também durante o retorno. Foco no painel pausa a sequência.
  Viewport e documento oculto suspendem o tempo. Reduced motion fica estático,
  com avanço manual e sem repetição automática.
- Toast removido; a conclusão aparece apenas na legenda abaixo do palco.
  Altura mínima da legenda evita contração ao remover controles após Keep manual.
- Moldura de wallpaper reduzida apenas na hero: janela de trabalho com inset
  horizontal 3.25%, topo 41px e base 12px. A barra mantém 29px, deixando 12px
  até a janela. Fundo, conversa e geometria não mudam com o estado do Rasc.
- Scratchpad mantém limite de 560px, tipografia e breakpoints anteriores.
  Sombra própria aumenta a separação entre as duas janelas sem crescer o painel.
  As cenas da seção Capture/Refine/Keep conservam seu enquadramento.
- Replay, Explore the steps, texto explicativo do roteiro e Download details
  da hero continuam removidos. Detalhes de distribuição ficam na CTA final.

## Fontes preservadas

Tokens nativos: canvas #FBFAFD, superfície #F7F4FA, ação #C74A14 e violet #7564D8.
Geometria 720:440 de RascWindowMetrics, comportamento real de ScratchpadView,
Orb inline de 20px derivada de ThinkingOrbsKit, símbolo de marca e ícones nativos
existentes. A sombra adicional é uma adaptação de composição web.

Wallpaper Hello Orange real do Mac do usuário. ChatGPT mantém o projeto fictício
Workshop e a conversa estática já documentados; nenhum dado pessoal foi usado.
Fixture original/proposta permanece idêntico ao observado em 3 execuções reais.

DMG servido: `/downloads/Rasc-0.1.0-beta.3.dmg`, cópia do artifact
`/Users/rafatorres/Desktop/rasc/build/rc/Rasc-0.1.0-beta.3.dmg`.
Fonte GitHub: https://github.com/rafaeltorresng/rasc. Esta rodada não altera
publicação, assinatura, hospedagem, distribuição ou os disclosures existentes.

## Validação e limite

Harness temporário `/private/tmp/rasc-hero-v2/verify.mjs`, com React 19,
StrictMode e relógio controlado: múltiplos ciclos, dwell completo, pausa/retomada,
suspensão offscreen e documento oculto, foco, ações manuais sem repetição,
Resume explícito, reduced motion inicial e alterado em execução, limpeza de
efeitos, Home/Search finita, SSR, CTAs reais, disclosures, fixture e checksums.
Todos passaram. Nenhuma dependência adicionada ao projeto.

Build de produção e lint passaram. A captura recebida é evidência da versão
anterior em desktop, não aprovação da nova composição. O navegador continua
bloqueado pela falha de verificação da política administrativa já registrada;
nenhum mecanismo alternativo foi usado para contornar o bloqueio.
Nova inspeção de estados, viewports, sombras, foco e overflow permanece pendente.

Arquivos: `src/product/ProductScenes.tsx`, `src/product/timeline.ts`,
`src/styles.css`, `README.md`, nota histórica no relatório inicial e este registro.
`rasc` permaneceu sem modificações; nenhum commit, push ou deploy foi feito.
