# Validação final — Safari nativo e movimento da hero

Complemento à auditoria de 15/10/2026. Branch `rafa/website-reliability-audit`, base `089363a`. As correções anteriores foram preservadas. Aplicativo macOS, identidade, IA da landing e produção não foram alterados. Este complemento substitui as conclusões anteriores sobre cobertura nativa do Safari. A rodada completa registrada abaixo corresponde a `aefcae4`; a decisão posterior de movimento contínuo está descrita na seção da hero.

## Resultado e recomendação

**Não reproduzi a tela branca nesta rodada delimitada.** Foram 12 navegações/reloads no Safari 26.5 nativo, em quatro sessões privadas, comparando desenvolvimento, build final local e produção pública. Os três ambientes renderizaram e toleraram as sequências exercitadas. Isso melhora a evidência de compatibilidade; não estabelece a causa do episódio anterior, nem prova ausência de falha intermitente em outro dispositivo.

Recomendo aprovar o PR para merge após os checks remotos e a revisão do acabamento. Não há falha crítica funcional reproduzível conhecida pendente nesta branch; a decisão posterior de movimento contínuo reabre a pendência de acessibilidade da hero. Recomendo o protocolo curto de iPhone abaixo antes de uma divulgação de grande alcance, sem manter esta investigação aberta indefinidamente.

## Safari: método e evidência

Safari **26.5 (21624.2.5.11.4)** instalado no Mac. Interações pela UI nativa, DOM/CSS/Resource Timing pelo Web Inspector. Não confundir com WebKit 27.2 automatizado. A automação remota estava desativada e não foi habilitada; não houve sessão WebDriver. As ferramentas de desenvolvimento foram exibidas temporariamente e a preferência foi restaurada. Não havia extensões instaladas, conforme Settings → Extensions.

| Ambiente | Acessos/reloads nativos | Exercícios e resultado |
| --- | ---: | --- |
| Desenvolvimento `127.0.0.1:5193` | 3 | Duas sessões privadas; Try Refine → Keep → Capture → Refine; reload durante shaping. Conteúdo íntegro. |
| Produção local `127.0.0.1:5191` | 5 | Duas sessões privadas; fluxo com Accept → Keep; cinco ciclos rápidos Keep/Capture/Refine; reload durante preview; reload com Disable Caches. Conteúdo íntegro. |
| Produção pública `rasc.app` | 4 | Duas sessões privadas; fluxo com Accept → Keep; cinco ciclos rápidos; reload durante shaping; nova tentativa de Try Refine na primeira observação completa após reload; troca real para outra aba e retorno. Conteúdo íntegro. |

Os quatro contextos privados foram abertos após fechar as janelas privadas de teste anteriores. Isso renova armazenamento de sessão; não equivale a limpar cache do sistema operacional, TLS, DNS ou CDN. O teste explícito com Disable Caches foi local. Não foram apagados dados pessoais do Safari.

Snapshots de inicialização observados (uma amostra por condição, **não benchmarks**):

- Local inicial: `rootChildren=1`, uma H1, CSS `block / visible / opacity 1`; DOMContentLoaded 699 ms; entrada JS em 9 ms.
- Desenvolvimento: root/H1 presentes, Refine em `preview`; DOMContentLoaded 619 ms; `main.tsx` 260 ms.
- Público inicial: root/H1 presentes; DOMContentLoaded 1163 ms; entrada `index-HEWK-IJz.js` em 484 ms.
- Build auditado local sem cache (antes da decisão de movimento contínuo): entrada `index-CTjJOLtZ.js` em 14,9 ms, CSS 7,08 ms; DOMContentLoaded 119 ms; hero estática após introdução.
- Público após reload: root/H1 e preview presentes; CSS visível; DOMContentLoaded 41 ms; entrada JS com transferência/duração zero, consistente com cache.

### O que foi diferenciado

| Hipótese | Observação nesta rodada | Conclusão permitida |
| --- | --- | --- |
| Root React vazio | Root com um filho e H1 presentes nos snapshots; capítulos mantidos após interações | Não ocorreu nos casos observados |
| JS de entrada não carrega | Entradas e CSS aparecem na rede/Resource Timing, incluindo reload sem cache local | Não ocorreu nos casos observados; bloqueio real do JS continua uma dependência da SPA |
| Exceção de runtime | Console local apresentou cinco mensagens de CORS do endpoint Cloudflare `cdn-cgi/rum`; console público sem erros antes do diagnóstico | Nenhuma exceção da aplicação observada; analytics local não foi tratado como causa da tela branca |
| CSS oculta conteúdo | Root `display:block`, `visibility:visible`, `opacity:1`; página e preview visíveis nas capturas | Sem evidência desse modo de falha |
| Pausa legítima por viewport | Inspector dockado reduziu viewport a 294 px; cena começava em y=263 e pausou em `shaping`. Ao fechar Inspector, chegou a `preview` | Suspensão intencional; não é perda do root nem tela branca |
| Composição gráfica/GPU | Conteúdo renderizado nas capturas e retomado após trocar aba | Nenhum defeito reproduzido; GPU/driver e hardware distintos não foram testados |
| Extensões/cache | Nenhuma extensão instalada; sessões privadas, reloads quentes e um reload sem cache local aprovados | Não prova comportamento em dispositivos com extensões ou cache antigo diferente |

A observação vazia imediatamente após iniciar uma navegação foi seguida de conteúdo no carregamento, sem reload corretivo. Não foi classificada como falha persistente. O episódio anterior, recuperado após reload, **continua inconclusivo**: não há stack ou estado de DOM daquele instante para comparar. As falhas de APIs opcionais reproduzidas na auditoria anterior permanecem corrigidas, sem atribuí-las ao relato original.

Evidências: [registro das sessões](native-safari.json), [Refine no Safari nativo](native-safari-refine.jpg), [Inspector local](native-safari-inspector.jpg), [Inspector público](native-safari-public-inspector.jpg). Capturas nativas da ferramenta são JPEG; não são novos assets de produto. A composição final está documentada em [desktop](final-hero-desktop.png) e [mobile emulado](final-hero-mobile.png), na rodada anterior, após a parada da animação. O layout não mudou com a decisão de movimento contínuo.

## Hero: decisão de acessibilidade

**Decisão posterior do usuário: manter a hero sempre animada, sem botão de pausa.** O limite de quatro segundos adotado na rodada anterior foi removido. Orbes e cursor continuam enquanto a hero estiver visível e a página em primeiro plano; suspendem fora da viewport/aba e retomam ao voltar. Movimento reduzido mantém a composição estática desde o início; ausência de observer mantém decoração estática.

Essa decisão preserva a preferência visual, mas **reabre a pendência da WCAG 2.2.2**: há movimento automático não essencial por mais de cinco segundos sem mecanismo manual para parar. Não declaramos esse critério atendido. Referência: [W3C — Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

A regressão foi ajustada para confirmar movimento real após cinco segundos, blink do cursor, suspensão fora da viewport, retomada e preferência de movimento reduzido. Lint, typecheck, build e seis regressões da hero passaram (Chromium, Firefox, WebKit, Chrome instalado e emulações de iPhone/Android). Os resultados específicos estão em [hero-continuous-verification.json](hero-continuous-verification.json); a matriz completa anterior permanece como histórico. [Captura atual](hero-continuous.png).

## Defeito adicional corrigido

**MOTION-01 — P2:** uma Thinking Orb pausada avançava um quadro ao sair e voltar à viewport. Observer/visibilidade chamavam o desenho usando o relógio atual, embora o RAF estivesse parado. Agora o desenho usa o instante de pausa. Não houve reset ou remontagem para mascarar o problema.

O teste novo reproduziu o avanço em Chromium, WebKit e emulação de iPhone antes da correção; passou nos três depois. A regressão original verificou a introdução finita; a regressão atual mantém a verificação de pixels estáveis durante suspensão e retomada correta. A suspensão por visibilidade continua coberta pelos testes de cenas existentes.

Arquivos desta rodada: `src/product/ProductTableau.tsx`, `src/product/ThinkingOrb.tsx`, `tests/e2e/quality.spec.ts`, documentação/evidências. As demais alterações do PR são as correções e a infraestrutura de teste já aprovadas na auditoria original. Commits separam correções, testes/CI e documentação.

## Verificação final

**Lint, typecheck, build e 40 testes unitários passaram. E2E final: 126 casos, 121 aprovados, cinco skips intencionais, zero falhas e zero flaky; duração de aproximadamente 5,7 minutos.** Os resultados consolidados desta rodada estão em [verification.json](verification.json). A suíte executa o build de produção, sem reutilizar um servidor de desenvolvimento. O resultado remoto de CI e seu commit são registrados na descrição do PR, com link direto ao run; resultados locais não são apresentados como CI.

A evidência automatizada inclui os seis perfis anteriores; o teste adicional da hero é executado em cada um. Skips de laboratório nos outros cinco perfis são deliberados, não testes funcionais ignorados. Não houve merge nem deploy.

## Protocolo curto — iPhone físico (pendente)

Não havia iPhone físico acessível pelas ferramentas. A entrada “iPhone” no iCloud Tabs não fornece acesso ao dispositivo nem comprova validação.

1. Anote modelo e versão do iOS. Grave a tela antes de abrir `https://rasc.app/` em uma aba privada nova. Repita três aberturas, fechando todas as abas privadas de teste entre tentativas. Faça também uma abertura em aba normal.
2. Em cada abertura, vá a Capture e toque Try Refine assim que disponível. Espere o preview, aceite, avance a Keep e reinicie. Depois alterne Capture/Keep/Refine rapidamente dez vezes. Esperado: interface sempre legível, sem página branca; Keep concluído pode legitimamente mostrar o contexto sem nota.
3. Durante Refining, volte à tela inicial por cinco segundos, retorne ao Safari, role para fora e volte à cena. Gire o telefone. Esperado: retomada até o preview; sem reload necessário.
4. Com Reduce Motion ativado em Accessibility → Motion, reabra a página e confirme Capture/Refine/Keep. A hero deve ficar estática. Restaure sua preferência habitual ao terminar.
5. Se ocorrer branco, **não recarregue imediatamente**. Guarde vídeo, horário, URL, sequência e se o header/texto externo à cena permanece. Registre conexão (Wi-Fi/celular), modo privado/normal e se havia bloqueador/tradução.
6. Se houver Mac pareado e Web Inspector já autorizado, capture Console e Network antes do reload: erro completo/stack, status do módulo de entrada e CSS; inspecione `#root` (filhos e estilos) e `.step-stage[data-phase]`. Sem Inspector, envie vídeo e dados do item 5; depois registre se reload recupera. Não envie histórico, notas ou dados pessoais.

## Riscos residuais relevantes

- Relato original não reproduzido: aprovação das correções não deve ser comunicada como diagnóstico encerrado daquele episódio.
- iPhone físico/GPU de outros dispositivos permanecem sem evidência direta. A emulação ajuda a cobrir layout e interações, não substitui hardware iOS.
- Bloqueio/falha de rede do módulo principal ainda pode impedir renderização da SPA. Não foi introduzido fallback que esconda isso nem uma mudança arquitetural de pré-renderização nesta etapa.
- Assinatura/notarização ad-hoc do aplicativo continua limitação de distribuição independente, documentada no guia e fora do escopo desta branch.
