# Rasc — pesquisa e direção para a hero

3 de outubro de 2026. Escopo desta rodada: pesquisa, comparação e planejamento. Nenhuma mudança na implementação da landing ou no aplicativo.

## Decisão recomendada

Mostrar Rasc sendo invocado sobre uma atividade em andamento. A sequência principal é trabalho → ⌥\ → scratchpad → pensamento → Refine → proposta pendente → Accept → Keep → mesmo trabalho.

A Home vazia é uma superfície real e bonita, mas não é a melhor abertura para comunicar o diferencial do produto. Ela merece uma demonstração secundária de primeiro uso, se necessária, e a Home com o pensamento guardado deve participar da narrativa de recuperação. Não adicionar uma segunda demonstração automaticamente.

Esta é uma decisão de posicionamento e narrativa sustentada pelo código do produto e pelas referências abaixo. Não é um resultado de teste com usuários. A composição visual final ainda exige inspeção renderizada.

## Evidência e limites da pesquisa

O documento canônico RASC-CONTEXT-2026-10-02.md continua como fonte das decisões de produto, lançamento e posicionamento. O aplicativo é a fonte dos comportamentos e da geometria.

Foram consultadas páginas oficiais atuais, conteúdo extraído das páginas, instruções de demonstrações e referências a suas mídias. A tentativa de abrir uma referência no navegador de inspeção foi bloqueada: a política administrativa de acesso não pôde ser verificada. Não contornei esse bloqueio. Não afirmo ter assistido às animações, medido seu tempo ou inspecionado visualmente as versões responsivas dessas referências. As conclusões sobre composição e ritmo abaixo são propostas de design, não medições dessas páginas.

Não usar screenshots antigos encontrados em agregadores como evidência da landing atual. Alcove.app atualmente resolve para venda de domínio; foi descartado como referência verificável de produto.

## Referências selecionadas

| Referência oficial | Evidência disponível | Aplicação ao Rasc | Limite |
| --- | --- | --- | --- |
| [Superwhisper](https://superwhisper.com/) | A página oferece uma demonstração com escolha entre Cursor, Slack e Notes, instrução de atalho e alternativa para quem não pode falar. | Mostrar o produto trabalhando no contexto de outra atividade; deixar exploração opcional. | Não exigir microfone, atalho global ou permissão para entender Rasc. Não transportar a categoria de assistente. |
| [Dropover](https://dropoverapp.com/) | A narrativa apresenta uma shelf temporária, sua invocação e uso sem interromper o fluxo. | Explicar entrada e saída como parte do benefício. O contexto deve justificar a presença da janela. | A riqueza de ações e arquivos não se aplica a Rasc. O timing do vídeo não foi observado. |
| [SideNotes](https://www.apptorium.com/sidenotes) | A página explica notas por cima de outros apps, acesso por gesto/atalho e permanência no contexto atual. | Referência direta da relação entre captura e trabalho. | Pastas, formatação e organização pertencem a outro produto. Não copiar sua arquitetura de recursos. |
| [Paste](https://pasteapp.io/) | A hero é descrita como composição de MacBook, iPad e iPhone. Uma seção posterior apresenta um email com a janela Paste à frente e um link relevante. | Separar prova de plataforma de prova de comportamento; o exemplo contextual é mais relevante para Rasc que uma composição de dispositivos. | Hardware ao redor da tela consome espaço e reduz legibilidade. A atual hero não deve ser descrita como um desktop interativo. |
| [Wispr Flow](https://wisprflow.ai/) | A página expõe conteúdo bruto, transformação, estado de processamento e resultado em uma mensagem. | Demonstrar a mudança no próprio conteúdo, com causa e resultado claros. | A transformação de Rasc é conservadora e depende de aprovação; não copiar reescrita automática ou promessas de velocidade. |
| [Screen Studio](https://screen.studio/) | A página apresenta a qualidade de gravações e o tratamento de zoom, movimento e enquadramento como valor do produto. | Estudar enquadramento e legibilidade; considerar gravação real como ferramenta de verificação do simulador. | Não transformar a hero em uma sequência de zooms. Qualidade visual e timing de suas mídias ainda não foram julgados em playback. |
| [Things](https://culturedcode.com/things/) | Introdução em vídeo, imagens de UI e prova explícita das plataformas. | Presença nativa e confiança em mostrar a interface real. | Não importar a metáfora de planejamento e organização. |
| [Raycast](https://www.raycast.com/) | A narrativa liga valor a atalhos; a página atual também apresenta extensões e AI Agent. | Tornar o gesto de invocação compreensível e memorável. | Sua amplitude de ferramentas e narrativa de IA conflitam com Rasc. |
| [Flyout](https://getflyout.app/) | O conteúdo da própria página contém uma simulação de painel, atalho, texto de nota e Replay, acompanhados da promessa de aparecer sobre o trabalho. | Referência do uso de UI determinística e replay para explicar acesso imediato. | Não tratar sua densidade, tarefas, tags e reminders como direção visual de Rasc. |
| [Tap](https://tapbrowser.com/) | A página declara uma demonstração editável, com seleção de texto, contexto e notas. | Mostra o potencial de prova por interação opcional. | Exploração não deve ser pré-requisito para entender a hero. Um miniaplicativo completo seria excesso para Rasc. |

Conclusão de design: um wallpaper identifica plataforma; uma atividade em andamento explica utilidade. Para Rasc, a segunda função é mais importante. Usar um recorte de ambiente Mac, com uma única atividade estável e Rasc em primeiro plano. A execução não precisa simular um sistema operacional inteiro.

## A hipótese Home vazia → New Scratch

O código confirma a hipótese visual do usuário:

- `HomeView.emptyHomeState` contém Orb central, “Your notes”, “Nothing here yet.”, apoio e New Scratch.
- `HomeSession.emptyStateOrbState` retorna `.connecting`, não `.refining` nem `.breathing`.
- A Orb usa tamanho `.hero`, 64 pontos; `.connecting` tem speed 0.58 e opacity 0.88. Isso é comportamento nativo, não um efeito inventado para a landing.
- Home padrão: 1000 × 680; mínimo: 760 × 520. Scratchpad padrão: 720 × 440; mínimo: 560 × 320.
- Em `AppBootstrap.openHome`, New Scratch chama `panel.startNewScratch()`. Esse callback não fecha a Home.
- `PanelController.startNewScratch()` inicia o scratch e apresenta o painel. Não há uma transformação da janela Home em scratchpad.

Portanto, uma simulação fiel dessa proposta precisa mostrar duas superfícies e preservar a Home por trás. Fazer a Home encolher e virar o scratchpad seria inventar uma transição do aplicativo. Fazer Keep revelar outra atividade sem mostrar o fechamento da Home omitiria um passo.

| Critério | Home vazia primeiro | Invocação sobre trabalho |
| --- | --- | --- |
| O que se entende primeiro | Existe um app para guardar notas | Existe um scratchpad disponível durante o trabalho |
| Força da abertura | Calma, curiosidade, estado inicial nativo | Utilidade imediata e gesto distintivo |
| Risco de percepção | Biblioteca de notas; produto vazio; Orb tomada por marca | Desktop artificial ou atalho pouco compreensível |
| Caminho até conteúdo | Espera, New Scratch, nova superfície, digitação | Invocação breve, painel, digitação |
| Demonstração de saída | Keep revela a Home que continuou aberta | Keep revela o trabalho que nunca saiu do lugar |
| Espaço e legibilidade | Home maior, com muito vazio; depois duas janelas | Uma janela compacta dominante |
| Papel recomendado | Primeiro uso ou demonstração secundária | Narrativa principal da hero |

Não considero a alternativa Home-first ruim por princípio. Ela pode vencer se uma comparação de compreensão mostrar que visitantes entendem melhor o produto sem perder a ideia de acesso instantâneo. Entretanto, o briefing atual valoriza especialmente capturar e voltar ao trabalho. A invocação demonstra essas duas promessas com menos passos.

Não usar “alguns segundos” de Orb sozinha como abertura. Esse tempo não mostra captura, Refine nem um resultado. A serenidade deve vir da composição e do ritmo, não de uma espera antes de o benefício aparecer.

## Direção de arte e primeira tela

Manter a linguagem clara, quente e nativa. O ambiente usa superfícies discretas; o conteúdo Rasc usa graphite; orange permanece ação; violet indica estado. Não aplicar glow na Orb ou identidade.

A hero atual ainda é provisória. O código concentra platform cue, headline de duas linhas em até 80px, descrição de duas linhas, CTA, detalhes, prova e 38px de margem antes do palco. Essa soma pode empurrar a demonstração para baixo em laptops. Isso é um risco identificado no código, ainda não uma medição renderizada.

Proposta inicial para desktop/laptop:

- Uma headline de duas linhas, menor que a atual quando necessário, preservando “A scratchpad for unfinished thoughts.”
- Uma descrição curta, que explique aparecer durante o trabalho. Evitar repetir Capture/Refine/Keep em várias linhas antes da cena.
- Download for Mac como ação principal. Compatibilidade essencial em uma linha próxima; detalhes completos continuam acessíveis. Não esconder o estado real da distribuição para limpar o layout.
- GitHub secundário no header e na história de confiança. Não pôr duas ações visualmente equivalentes na hero.
- Palco horizontal, aproximadamente 1000–1120px de largura e 420–460px de altura, a ajustar por render. Rasc mantém a proporção nativa 720:440 no desktop.
- Em 1366 × 768, o objetivo é mostrar texto, CTA e conteúdo do editor já na primeira tela. Ajustar margens e escala antes de cortar o estado importante do produto.
- Reservar o espaço da cena desde o início. Nenhuma mudança de altura entre fases.

Não adicionar moldura de MacBook, dock interativo, aplicativos falsos em miniatura, notificações, calendário cheio, barra de tarefas animada ou cursor passeando. Uma janela de trabalho, discreta barra de título e um vestígio de ambiente bastam.

O documento sintético atual (“Proposal draft” / “Make room for questions.”) ainda precisa revisão. Seu título editorial pode competir com o pensamento. Preferir uma atividade banal de revisão/leitura de documento, sem slogan e sem imitar um produto famoso. Conteúdo sintético, breve e sem dados privados. O palco deve ficar reconhecível como trabalho mesmo com o painel fechado, mas não exigir que o visitante leia duas histórias simultaneamente.

Sombras devem distinguir o plano do trabalho e o do painel. Fundo fixo, sem parallax ou troca de cor. Nenhuma câmera em movimento durante a leitura da proposta. Rasc é o objeto que entra e sai.

## Storyboard recomendado

Tempos são orçamento inicial de encenação; não prometem latência de inferência. A duração final depende do texto e de inspeção em velocidade real.

| Tempo aproximado | Cena | O que precisa ser entendido |
| --- | --- | --- |
| 0–0.5s | Atividade calma; cue discreto ⌥\ | Há trabalho em andamento e um gesto de acesso |
| 0.5–0.9s | Scratchpad aparece vazio | Rasc entra sobre o trabalho |
| 0.9–3.0s | Pensamento é digitado | Captura livre, sem título ou organização obrigatórios |
| 3.0–4.2s | Pausa sobre o pensamento completo | O visitante consegue ler o original |
| 4.2–4.7s | Cue ⌘J | O refinamento foi solicitado |
| 4.7–6.4s | Estado shaping; Orb nativa inline | O texto está sendo trabalhado; não há chat |
| 6.4–9.6s | Proposta permanece pendente | Refine sugere; usuário decide |
| 9.6–10.4s | Accept; conteúdo aprovado | Aprovação é uma ação distinta |
| 10.4–11.1s | Keep | O pensamento foi guardado |
| 11.1–11.5s | Painel se retira | Rasc termina a interação |
| 11.5–13.0s | Mesmo trabalho permanece | A atividade original pode continuar |

Executar uma vez quando a cena estiver suficientemente visível; ao concluir, oferecer Replay claramente visível. Preferir um repouso final com o trabalho e uma indicação discreta de “Thought kept”, fora da UI nativa e sem inventar notificação do app. Não deixar o palco indefinidamente girando ou reabrindo sozinho. Evitar terminar sem nenhum indício de que houve uma demonstração.

Pausa persistente desde o início, retomada do mesmo ponto e replay. Interação manual assume o controle: não deixar autoplay aceitar ou guardar depois que o visitante começou a explorar. Não interceptar ⌥\ globalmente na página. Cues de teclado ilustram a ação; controles web acessíveis continuam disponíveis.

O caso demonstrado começa com um scratch novo. Não afirmar que o atalho sempre abre vazio: o produto também restaura sessões existentes.

## Pensamento e Refine

O fixture atual foi testado na implementação real: “follow up ask what still feels unclear before sending another draft” → “Follow up and ask what still feels unclear before sending another draft”, com a mesma saída em três execuções.

Essa saída é representativa e segura, mas a alteração é visualmente pequena: capitalização e uma conjunção. Ela continua como baseline verificado, não como escolha editorial definitivamente encerrada. Não torná-la uma transformação dramática apenas para criar espetáculo.

Próxima comparação de candidatos: um pensamento de duas linhas sobre uma dúvida numa reunião, um lembrete de follow-up e uma ideia de explicação/apresentação. Cada candidato precisa funcionar sem contexto externo, preservar incerteza e mostrar uma melhora perceptível de clareza ou pontuação sem adicionar conteúdo. Executar no provider real; rejeitar perdas de intenção, resultados inalterados ou sugestões artificiais. A proposta publicada é um resultado real selecionado e determinístico; nunca chamar AI pública na landing.

O documento de trabalho e o pensamento devem fazer sentido juntos, sem exigir causalidade inventada: Rasc não lê automaticamente o documento ao fundo. Não animar seleção do documento entrando no scratch se esse comportamento não estiver sendo demonstrado de verdade.

## Home, identidade e Orb

Na narrativa posterior, mostrar a Home contendo o mesmo pensamento recém-guardado, depois Search encontrando esse pensamento. Isso responde à pergunta que a hero cria: “para onde foi?”. Preservar a sequência Home → Search. Evitar começar a recuperação com uma Home cheia de conteúdo aleatório e sem continuidade.

Se uma cena de primeiro uso for incluída, usar o empty state real, Orb connecting de 64pt e callback de New Scratch fiel. Ela deve substituir um momento de apresentação, não adicionar uma nova seção automaticamente.

A marca estática continua no header/favicon/footer. A Orb central da Home é decorativa no código e existe legitimamente ali; isso não autoriza tratá-la como logo do site. Na hero principal, shaping permanece um sinal pequeno e sincronizado com Refine. Não começar com uma Orb gigante para aumentar o interesse visual.

## Responsive, acessibilidade e implementação

Preservar React/TypeScript/Vite, componentes existentes, tokens, fixtures e relógio central. Separar WorkContext, ScratchpadWindow, estado da cena e controles; não construir um mini sistema operacional. Não introduzir shaders ou bibliotecas de motion sem necessidade.

Desktop 1440 e laptop 1366: validar escala nativa, leitura do original/proposta, hierarquia da CTA e primeiro viewport. Compacto 1024/tablet 768: reduzir elementos periféricos do ambiente antes de reduzir editor. Mobile 390/320: usar uma composição explicativa adaptada, mantendo nomes, estados e hierarquia do produto. Não comprimir uma tela Mac de 1000px até o texto virar 8px. Se o painel inteiro não couber com conteúdo legível, usar enquadramento focado nos estados do editor e nas ações essenciais, claramente como demonstração da landing, sem fingir que o app Mac roda naquele tamanho.

Não decidir entre reflow e enquadramento móvel apenas por CSS: comparar os dois em render. Manter o pensamento legível e a decisão Accept/Keep visível sem scroll horizontal. Não inventar uma toolbar móvel do aplicativo.

Reduced motion: estado estático com pensamento e proposta, explicação curta do fluxo e avanço manual entre estados; sem digitação automática, Orb contínua ou morph. O visitante deve compreender a demonstração sem movimento. Screen reader recebe descrição estável; não anunciar caractere por caractere ou cada mudança do relógio.

Uma animação automática longa precisa de mecanismo persistente de pausa; só pausar enquanto há hover/foco não basta. Referência: [W3C, SC 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

Desligar relógio/Orb fora do viewport e com documento oculto. Layout reservado para evitar saltos. Priorizar transform/opacity nas transições, sem movimento do fundo. DOM para texto e controles. Canvas apenas para a Orb nativa. Imagens locais otimizadas somente onde acrescentarem realismo verificável. Avaliar gravação real como material de comparação; um vídeo integral como única hero perde adaptação e controle do texto.

## Ordem de execução e critério de aceite

1. Criar dois storyboards com a mesma copy e o mesmo tamanho de palco: invocação e Home-first. Comparar primeiro frame, primeiro pensamento legível, número de ações e estado após Keep. Sem alterar o app.
2. Renderizar ambos em laptop e mobile. Escolher pelo entendimento do produto e qualidade da leitura, não pela Orb mais chamativa. A recomendação inicial continua invocação.
3. Enquadrar a hero escolhida e retirar excesso acima da cena. Verificar com screenshot do primeiro viewport.
4. Escolher fixture conservador no modelo real. Atualizar também a recuperação para mostrar a mesma nota.
5. Implementar um ciclo, pausa persistente, replay e controle manual. Refinar timing assistindo em velocidade real.
6. QA: 1440, 1366, 1024, 768, 390, 320; captura de todos os estados; keyboard/focus/hover/reduced motion/overflow; viewport oculto e retorno; build/lint e integridade do download.

Perguntas de compreensão para eventual teste com visitantes novos, sem explicar o produto antes: o que é Rasc? quando usaria? o que Refine faz? precisa aceitar a edição? o que acontece em Keep? onde encontra depois? Não usar preferência estética isolada como critério. Nenhum teste com usuários foi realizado nesta rodada.

A hero só pode receber aprovação visual depois de inspecionada renderizada. O bloqueio atual impede essa aprovação, mas não a decisão de direção e preparação do plano.

O plano não resolve artificialmente os bloqueios já verificados de lançamento: repositório GitHub ainda privado na verificação anterior e DMG ad-hoc sem notarização. A URL real permanece https://github.com/rafaeltorresng/rasc; o arquivo real permanece `build/rc/Rasc-0.1.0-beta.3.dmg` do produto. Não alterar infraestrutura, publicar source ou criar release nesta rodada.

## Fontes locais

- Documento canônico anexado: RASC-CONTEXT-2026-10-02.md; não editado.
- `rasc/Rasc/Features/Home/HomeView.swift`, `HomeSession.swift`, `HomeWindowController.swift`.
- `rasc/Rasc/Platform/AppBootstrap.swift`, `PanelController.swift`, `RascWindowMetrics.swift`.
- `rasc/Rasc/UI/RascOrb.swift` e ThinkingOrbsKit nativo.
- `rasc-web/src/page/LandingPage.tsx`, `src/styles.css`, `src/product/ProductScenes.tsx`, `timeline.ts`, `src/content/fixtures.ts`.
- `rasc-web/docs/CURRENT-LANDING-REVIEW.md` e `landing-refine-evidence.json`.

O relatório anterior registra implementação provisória, não congela a decisão da hero. Este plano revisa a hierarquia inicial e a reprodução contínua, preservando o comportamento causal correto. Documentos históricos de beta privada/mailto e versões antigas de release continuam superados pelo contexto canônico.
