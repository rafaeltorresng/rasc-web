# Rasc — Website Quality & Reliability Audit

> Relatório da primeira rodada. Consulte o [complemento final de Safari/hero](follow-up/README.md) para a decisão atual, validação nativa, novos resultados e protocolo de iPhone. As contagens abaixo registram a rodada original.

Data: 15 de outubro de 2026. Base: `origin/main` em `089363a`. Branch isolada: `rafa/website-reliability-audit`. Aplicativo macOS e produção não foram alterados. Ao concluir a primeira rodada, ainda não havia commits ou envio remoto; a consolidação e o PR pertencem ao complemento. Sem merge ou deploy.

## A. Resumo executivo

A landing mantém a direção visual aprovada. Os fluxos principais se mostraram consistentes nos motores e nas condições automatizadas cobertas. A auditoria encontrou fragilidades reais em inicialização, acessibilidade e degradação de recursos; foram corrigidas sem substituir a máquina de estados nem redesenhar a página.

**O relato original de tela branca intermitente após Try Refine continua sem causa estabelecida.** Duas condições diferentes que produziam uma página branca foram reproduzidas por injeção de falha e corrigidas: ausência de `IntersectionObserver` e de `Intl.Segmenter`. Não há evidência de que essas APIs estivessem indisponíveis para a pessoa que relatou o problema.

A aprovação recomendada é das correções desta branch. Antes de uma campanha ampla, recomendo fechar a lacuna de um teste em iPhone físico e obter navegador/dispositivo e, se possível, uma gravação com console do relato original. Não há justificativa para um redesign ou uma reescrita das demonstrações.

**Validação consolidada: 40 testes unitários e 115 cenários E2E aprovados, sem falhas; cinco skips intencionais de laboratório. Lint, typecheck e build de produção aprovados.** A matriz por projeto está em `verification.json`. Medições e evidências reproduzíveis acompanham este documento.

## B. Investigação da tela branca

### O que foi exercitado

- Try Refine durante Capture inicial, no meio da digitação e após o término.
- 56 seleções rápidas por perfil, incluindo abas repetidas e saltos Capture/Keep/Refine.
- Accept → Keep → reiniciar; Cancel → Capture; manter o original; controles da janela.
- Setas, Home/End, foco após aceitar, pausa/retomada e abertura/fechamento do guia.
- Saída da viewport e retorno; página adicional em primeiro plano e recarregamento.
- Ocultação/retorno simulados com `visibilityState` e `visibilitychange`, separados do teste de abas.
- Mudança de `prefers-reduced-motion` durante o uso.
- Canvas indisponível; observers e segmentação indisponíveis; imagens do guia bloqueadas.
- Testes em build de produção, não apenas em desenvolvimento.

**Resultado normal:** não foi reproduzida uma página branca causada por essa sequência de cliques. A interface termina em estados válidos e a proposta volta a ficar disponível após interrupções. A máquina temporal existente foi preservada.

### Duas falhas confirmadas por injeção

| Condição | Antes | Depois | Regressão |
| --- | --- | --- | --- |
| `IntersectionObserver` indisponível | Efeitos em ProductTableau, ThinkingOrb e Home/Search lançavam `IntersectionObserver is not a constructor`; o root perdia o conteúdo | Observação é opcional; decoração fica estática e cenas finitas continuam disponíveis | `resilience.spec.ts`, teste de observer |
| `Intl.Segmenter` indisponível | `createTypingPlan` falhava durante importação do módulo; nenhuma heading era renderizada | Fallback por code points preserva o texto; navegadores modernos continuam usando graphemes | `resilience.spec.ts` e `sceneTimeline.test.mjs` |

A transcrição das exceções, contagem de headings e comparação dos mesmos builds estão em `fault-injection.json`. As imagens `before/after-observer-unavailable.png` e `before/after-segmenter-unavailable.png` mostram a diferença.

O fallback de segmentação não é uma implementação completa de graphemes para navegadores antigos: evita dividir pares UTF-16, mas sequências complexas de emoji podem aparecer em mais de um passo. Os exemplos atuais em inglês permanecem íntegros; a renderização moderna não mudou.

### O que a investigação não prova

- Falha injetada não é diagnóstico do ambiente da pessoa que fez o relato.
- O teste WebKit usa um motor de desenvolvimento, não o Safari instalado nem o hardware de um iPhone.
- Uma tentativa de smoke no Safari 26.5 nativo exibiu um estado vazio na primeira abertura, recuperado ao recarregar. Não foi capturada uma exceção nem uma reprodução pelo mesmo gatilho; a automação da janela ficou indisponível antes de uma validação conclusiva. Esse sinal permanece inconclusivo e não é contado como um teste nativo aprovado.
- Tradução/extensões, composição gráfica, cache de uma versão anterior e particularidades do dispositivo continuam sendo hipóteses a investigar se o relato retornar, não causas atribuídas.

Não foi adicionado um Error Boundary para esconder falhas, nem um remount periódico ou reinício arbitrário do componente.

## C. Inventário de problemas

| ID | Problema | Severidade | Evidência | Solução | Status |
| --- | --- | --- | --- | --- | --- |
| REL-01 | Efeito visual opcional derruba a página sem IntersectionObserver | P1, condicionado à API ausente | Exceções e root vazio em `fault-injection.json`; PNG antes/depois | Guardas e comportamento estático/finito | Corrigido e coberto |
| REL-02 | Importação da digitação derruba a página sem Intl.Segmenter | P1, condicionado à API ausente | Exceção na inicialização e zero headings | Fallback por code points; modo moderno intacto | Corrigido e coberto |
| A11Y-01 | Rótulos das ações da nota somem do nome acessível no mobile, restando apenas atalhos | P1 | Primeira rodada mobile não encontra Refine; árvore contém botões “⌘J” e “⇧⌘K” | Nomes acessíveis estáveis incluindo ação e atalho | Corrigido e coberto |
| A11Y-02 | Hero contínua e Capture automático acima de cinco segundos não oferecem pausa local | P1 | Inspeção de timelines/RAF/CSS; regra WCAG 2.2.2 | Capture recebeu pausa; na rodada complementar a hero passou a encerrar em quatro segundos, sem controle novo | Corrigido e coberto; ver complemento |
| A11Y-03 | Foco encaminhado pode permanecer fora da viewport após ação; smooth scroll compete com a observação da cena | P2 | Navegação mobile e inspeção do `preventScroll` | Foco estável e revelação instantânea do controle; navegação comum por âncoras continua suave | Corrigido e coberto |
| A11Y-04 | Contraste insuficiente em rótulos pequenos do contexto e na versão/requisitos do guia | P2 | Axe apontou `color-contrast` em Pinned/Chats e `.installation-release` | Ajuste pontual do texto auxiliar | Corrigido; scans finais sem violações no conjunto testado |
| UX-01 | Falha permanente de screenshot deixa quadro vazio no guia | P2 | Recursos bloqueados, `before-guide-images-unavailable.png` | Após a tentativa de recuperação já existente, mensagem explícita; instruções e navegação continuam funcionais | Corrigido e coberto |
| PERF-01 | Sistemas sem guia disponível baixam antecipadamente suas seis imagens | P2 | `mobile-installation-preloads-before.json`: 177.198 bytes | Evitar preload em mobile e plataformas não Mac conhecidas | Corrigido e coberto |
| OBS-01 | Relato intermitente original de tela branca | Potencial P0, não confirmado | Feedback recebido; sequências normais não reproduziram o mesmo defeito | Preservar investigação, obter ambiente/reprodução; não atribuir às falhas injetadas | Aberto/inconclusivo |
| DIST-01 | App distribuído é ad-hoc, sem Developer ID/notarização | Limitação de distribuição | Artefato público inspecionado; Gatekeeper rejeita | Guia honesto já existente; assinar/notarizar é trabalho separado do aplicativo | Documentado, fora desta branch |

A indisponibilidade do JavaScript de entrada ainda impede a landing interativa de renderizar. É uma dependência arquitetural da SPA atual. Pré-renderização/conteúdo HTML de recuperação merece proposta separada se esse modo precisar ser suportado; não foi disfarçado como corrigido por um fallback genérico.

## D. Matriz de testes e alcance

### Ambientes

| Projeto | Execução real | O que representa | Limites |
| --- | --- | --- | --- |
| chromium | Chromium 156 no macOS | Motor desktop, layout e eventos | Não é Windows |
| firefox | Firefox 157 do Playwright no macOS | Motor Firefox desktop | Não é instalação Windows/Linux |
| webkit | WebKit 27.2 do Playwright no macOS | Compatibilidade do motor WebKit | Não é Safari 26.5 nem iOS físico |
| chrome-mac | Google Chrome 155.0.8059.80 instalado no Mac | Navegador branded real, em execução automatizada | Não é Chrome no Windows |
| iphone-webkit | Perfil iPhone 13, touch/UA/escala, no WebKit acima | Emulação de mobile Safari | Não valida o sistema iOS, GPU ou barras nativas |
| android-chromium | Perfil Pixel 7 no Chromium | Emulação de Android/touch | Não é um telefone Android físico |

Safari nativo teve apenas a tentativa parcial descrita acima. Edge/Windows, Windows real, Linux real, iPhone/iPad/Android físicos e VoiceOver não foram testados. Nenhuma dessas lacunas foi contada como aprovação.

### Cenários

| Grupo | Cobertura | Resultado final esperado / evidência |
| --- | --- | --- |
| Inicialização e hero | imagens, camadas, ausência de botão na hero e suspensão por movimento reduzido | `lab.spec.ts`, PNG desktop/mobile |
| Fluxo Capture/Refine/Keep | 6 testes comportamentais por perfil, incluindo 56 alternâncias rápidas e 3 momentos do Capture | `scenes.spec.ts`, sem exceções ou estado inválido |
| Interrupções | scroll, nova aba/reload, preferência reduzida e ocultação simulada | cenas retomam; pausas fora da viewport são intencionais |
| Home/Search | Home, Search, seleção repetida, pausa/retomada/replay e reduced motion | resultado selecionado e controles válidos |
| Download Mac | link original, nome do arquivo, download + guia e clique modificado | download real no Chrome instalado e WebKit; fixtures de resposta nos outros perfis |
| Não Mac/unknown | Windows touch, Linux, iPad desktop, Android e identidade desconhecida | UI apropriada; secundário conserva o link; sem guia automático; sem preload inútil |
| Modal | quatro passos, trocas rápidas, detalhes macOS 14, fechar/reabrir, Escape, foco e scroll | `quality.spec.ts`; espera pelo cleanup real, sem sleep para esconder falha |
| Falhas de recursos | canvas nulo, APIs ausentes, screenshots bloqueadas e analytics bloqueado | conteúdo/controles essenciais permanecem utilizáveis |
| Responsividade | 320, 375, 390, 430, 600, 767, 768, 820, 821, 1024, 1280, 1440, 1920 px; landscape 844×390 e 640×360 | sem overflow horizontal ou controles principais cortados nos testes |
| Guia baixo/estreito | 320×568, 600×900, 768×360, 640×360 | fechar e avançar alcançáveis; conteúdo usa scroll interno |
| Zoom | reflow equivalente a 200% em janela de 1280 px, via viewport CSS 640 px | não equivale a teste de zoom nativo de todos os navegadores |
| Acessibilidade automatizada | Axe WCAG 2 A/AA, 2.1 AA e 2.2 AA na landing, Refine e dialog | scans sem violações finais; não é certificação WCAG completa |
| SEO/integridade | canonical, OG, âncoras, descoberta, imagens, query routes em build de produção | testes E2E + `production-http.json` |

O mecanismo automatizado de downloads artificiais do Playwright/WebKit não emitiu o evento esperado na primeira versão do teste. O download real funcionou. O teste foi corrigido para usar a resposta real nesses perfis; isso não foi apresentado como bug da landing. Outros falsos negativos ocorreram quando o teste esperava avanço de uma cena fora da viewport ou lia o scroll antes do cleanup passivo. Os testes agora verificam o estado observável correto.

## E. Implementação e arquitetura

- `src/product/ProductScenes.tsx`: nomes acessíveis das ações; fallback de observação no Home/Search e HeroDemo legado; pausa do Capture com relógio preservado.
- `src/product/ThinkingOrb.tsx`: observação opcional, mantendo o canvas estático quando ausente.
- `src/product/ProductTableau.tsx` e `.css`: fallback do observer; hero sem botão de pausa, conforme decisão posterior do usuário. Suspensão automática e movimento reduzido preservados; na rodada complementar a animação foi limitada a quatro segundos. Imagens nativas não foram substituídas.
- `src/product/typing.ts`: segmentação compatível sem mudar a digitação moderna.
- `src/page/InteractionStory.tsx`: encaminhamento de foco visível, sem scroll suave concorrente.
- `src/page/InstallationGuide.tsx` e `.css`: fallback explícito de imagem, preload apenas onde útil, contraste auxiliar.
- `src/styles.css`: contraste do contexto e controle discreto de pausa do Capture.
- `src/ui/Icon.tsx`: glifos de pause/play.
- `tests/sceneTimeline.test.mjs`: invariantes temporais, limites de capítulos, digitação completa, Unicode e API ausente.
- `tests/e2e/`: regressões de cenas, qualidade, distribuição, resiliência, evidências e laboratório; diagnósticos de runtime/console/network por teste.
- `playwright.config.ts`, `tsconfig.e2e.json`, `package.json`, lockfile, ESLint e `.gitignore`: execução enxuta e verificável do build de produção, tipagem dos testes, artefatos gerados fora do lint/git.
- `.github/workflows/quality.yml`: regressão em Chromium/Firefox/WebKit em pull requests, com evidência de falha. O workflow de deploy ganha os testes unitários. O envio e os resultados remotos de CI pertencem à rodada complementar e são registrados no PR.

Não houve reescrita de `useScenePlayback`, reset periódico, alteração de IA, novos conteúdos de marketing, tradução, mascote/ilustração adicional ou mudança no aplicativo.

Os testes de distribuição estão deliberadamente fixados ao contrato do release 0.1.1; atualizar versão/URL/checksum exige rever o teste junto com `launch.ts` e o guia.

## F. Performance, produção e evidências

### Laboratório

`lab.json` registra três contextos independentes: Chromium no Mac, viewport 390×844 CSS px, cache frio, 150 ms de latência, 400.000 B/s de download, CPU 4×, preview local sem compressão e analytics bloqueado. É um laboratório de viewport estreita, não um telefone físico.

- LCP aproximadamente **2,7 s**; está perto do limite de 2,5 s e não deve ser chamado de perfeito.
- CLS observado **0** nessas sessões. A soma observada não substitui a agregação em janelas do CrUX.
- Event Timing observado e long tasks estão nos dados brutos. São amostras de latência, **não INP de campo**.
- JS de produção aproximadamente **252 kB / 79 kB gzip** e CSS aproximadamente **59 kB / 12–13 kB gzip**. `bundle.json` contém os valores exatos.
- 177.198 bytes de imagens do guia deixam de ser solicitados em dispositivos conhecidos não Mac; não foi atribuído um ganho de milissegundos sem medição equivalente.
- Não há web fonts para baixar. Capturas do produto e ilustração foram preservadas em sua qualidade atual.

Em um ensaio limitado de 180 seleções, listeners permaneceram em 224 e documentos em 1. Heap após GC passou de aproximadamente 3,63 MB para 4,45 MB; o ensaio não separa aquecimento/JIT de retenção e não prova ausência de vazamento. Não foi encontrado crescimento de listeners nesse recorte. Não há certificação de FPS/GPU ou teste prolongado em hardware fraco.

### Produção e release

- HTTPS responde 200; HTTP redireciona para HTTPS; URL inexistente responde 404 de verdade. O preview Vite tem comportamento diferente para rotas desconhecidas, portanto o 404 foi conferido em produção.
- Canonical/OG apontam para `https://rasc.app/`; robots e sitemap anunciam a landing canônica; favicons e imagem social respondem normalmente.
- Bundle inspecionado sem rotas/componentes de estudo, source maps, caminhos locais ou segredo identificado. O token público do beacon não é uma credencial privada.
- Dependências de produção sem vulnerabilidade reportada pelo `npm audit` executado. Isso não substitui uma auditoria de infraestrutura.
- Beacon: curl recebeu 200 para o script; uma requisição com outro cliente recebeu 403. No localhost foi observado CORS no endpoint de coleta. Os testes isolam analytics para não enviar sua carga sintética; ingestão e dados reais da conta Cloudflare não foram validados.
- Release público: **0.1.1 / build 7**, hash `812323655859a5389cbd872075e81bc51509084ac14966c6a293911b5b383973`. DMG montado somente para leitura e ejetado; app não executado. `codesign` confirma `Signature=adhoc`, sem TeamIdentifier; `spctl` rejeita. Nada foi alterado na segurança do Mac.

### Arquivos de evidência

- `evidence/before-desktop.png` e `after-desktop.png`: composição preservada.
- `evidence/after-mobile.png`, `after-refine-mobile.png`, `after-refine-desktop.png`: capturas PNG do build final.
- `evidence/before-observer-unavailable.png` e `evidence/after-observer-unavailable.png`: root vazio versus conteúdo preservado.
- `evidence/before-segmenter-unavailable.png` e `evidence/after-segmenter-unavailable.png`: falha de importação versus renderização.
- `evidence/before-guide-images-unavailable.png` e `evidence/after-guide-images-unavailable.png`: falha de recurso visível, com instruções mantidas.
- Traces e vídeos da injeção inicial ficam ao lado das capturas; são dados sintéticos da auditoria.
- `test-results/results.json` e `playwright-report/index.html` são gerados pela última execução e ignorados pelo Git. `verification.json` conserva os 120 resultados da rodada completa (115 passes, cinco skips), além da regressão focal de seis casos após o ajuste da posição semântica do figcaption.

### Comparações visuais

| Caso | Antes | Depois |
| --- | --- | --- |
| Composição desktop | [PNG](evidence/before-desktop.png) | [PNG](evidence/after-desktop.png) |
| Observer ausente | [PNG](evidence/before-observer-unavailable.png) | [PNG](evidence/after-observer-unavailable.png) |
| Segmenter ausente | [PNG](evidence/before-segmenter-unavailable.png) | [PNG](evidence/after-segmenter-unavailable.png) |
| Falha de imagens do guia | [PNG](evidence/before-guide-images-unavailable.png) | [PNG](evidence/after-guide-images-unavailable.png) |

[Mobile](evidence/after-mobile.png) · [Refine no mobile](evidence/after-refine-mobile.png) · [Refine desktop](evidence/after-refine-desktop.png) · [Capture pausado](evidence/after-capture-paused-desktop.png) · [Guia desktop](evidence/after-guide-desktop.png).

[Lista exata de arquivos alterados](files-changed.txt).

## G. Avaliação e aprovação

A branch oferece uma base mais resistente e melhor coberta, preservando a identidade e o escopo existentes. As falhas confirmadas de inicialização e os problemas de acessibilidade/download descritos acima receberam correções na camada correspondente.

**Não recomendo declarar o relato intermitente original resolvido.** Recomendo aprovar as correções verificadas e fazer uma última validação em Safari/iPhone físico antes de ampliar fortemente a divulgação. Se o estado branco retornar, a investigação deve partir do navegador/versão, sequência, estado da cena, console e captura daquele ambiente. Os traces de regressão agora tornam comparações futuras mais objetivas.

Para reproduzir localmente (Node 22.18+ ou 24):

```sh
npm ci
npx playwright install chromium firefox webkit
npm run lint
npm run typecheck
npm test
npm run test:e2e
```

O projeto `chrome-mac` requer Google Chrome instalado. Em CI/Linux, executar os três projetos Chromium/Firefox/WebKit conforme o workflow. O laboratório é executado apenas em Chromium; os cinco outros skips são intencionais, não fluxos funcionais ignorados.

Referências de método: [WCAG 2.2.2](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html), [distinção entre motores e navegadores no Playwright](https://playwright.dev/docs/browsers), [emulação](https://playwright.dev/docs/emulation), [limites de detecção por UA](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent), [orientação da Apple sobre abertura de apps](https://support.apple.com/en-us/102445).
