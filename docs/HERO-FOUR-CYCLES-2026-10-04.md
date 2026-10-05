# Quatro ciclos, Orb compartilhada e ChatGPT dark
Registro histórico. Na [reformulação seguinte](INTERACTION-STORY-2026-10-04.md),
ChatGPT voltou a light mode e a seção de passos foi substituída por um palco
único com navegação explícita. O título e as referências a dark mode abaixo
descrevem a rodada anterior.

Os exemplos de workshop e resposta foram posteriormente substituídos por
engenharia e produto/design. Fixtures e validação atuais:
[Exemplos técnicos e Searching](TECHNICAL-DEMOS-2026-10-04.md).

Atualização posterior: breathing foi substituído por composing no app e nas
demos de Scratchpad/Home. Composing web usa o preset nativo px20 (208 pontos,
speed 3.12 × multiplicador Rasc 0.48) e o mesmo frame estático de reduced motion.
Cinco frames px20 foram comparados com a geometria Swift; todos passaram em
tolerância 1e-4. Os 16 frames editoriais px64, testes de quatro ciclos, Canvas,
build e lint também passaram. O loop editorial mantém seus quatro estados.
Esta verificação não substitui a inspeção visual da landing em navegador.

4 de outubro de 2026. Implementação local nos dois repositórios. A solicitação
do usuário autoriza especificamente a mudança de cor da Orb no aplicativo.

## Hero

Quatro pensamentos em ordem determinística: dúvida antes de enviar outro draft,
ideia para um workshop, resposta a feedback e lembrete pessoal. Cada um mantém
Invoke → Capture → Refine → preview → Accept → Keep → retorno ao trabalho.
14.45s por ciclo, 57.8s para a sequência completa; 2.4s de retorno por ciclo.
O exemplo só muda quando Rasc está dispensado e começa outra invocação. Texto
original e proposta pertencem sempre à mesma rodada; nenhuma aceitação vaza
para a próxima captura.

O ChatGPT fica estável e em dark mode. Superfícies locais #212121 / #171717,
compositor e mensagem #303030, texto #D4D4D4 e títulos #ECECEC. Sem dimming,
blur, transição de tema ou movimentação do fundo. O Rasc continua claro e compacto.
A lateral desaparece nos mesmos breakpoints anteriores; ícone ChatGPT compacto
fica claro para o fundo escuro. Tema é uma interpretação da simulação existente,
não uma nova inspeção do aplicativo ChatGPT instalado.

Interação manual mantém controle: Refine para na proposta, Accept não executa
Keep, Keep conclui sem reiniciar ou trocar pensamento. Resume devolve controle
ao roteiro. Pausa, viewport/documento oculto e reduced motion preservados.
Avanço manual em reduced motion passa ao próximo exemplo apenas após Keep.
Home/Search e as cenas dos passos continuam usando o primeiro pensamento.

## Textos e evidência

Fixtures em `src/content/fixtures.ts`. Os quatro pares são saídas observadas do
provider Foundation Models real. Corpus sintético e resultados isolados em
`/private/tmp/rasc-four-cycles`; 15 execuções, três para cada candidato, incluindo
uma variante de resposta mais direta. Nenhuma inferência pública ou dado pessoal.

`hero-four-cycles-evidence-2026-10-04.json` registra entradas, saídas e decisões.
Workshop teve um noChange em três execuções; follow-up e resposta variaram na
pontuação. O lembrete pessoal teve três saídas iguais. Selecionamos saídas
conservadoras efetivamente observadas. Esses resultados não demonstram
determinismo universal; a reprodução pública é fixa.

## Orb no app e nas demos

Paleta sRGB idêntica: violet #7564D8 nos stops 0 e 0.58; orange #C74A14 em 1.
Gradiente diagonal de (18%,18%) a (82%,82%), opacidade externa 0.96. Profundidade
dos pontos/linhas preservada pela opacidade nativa. Nada de glow ou aumento da Orb.

`Rasc/UI/RascOrb.swift` aplica a paleta a todas as instâncias existentes: Home,
Scratchpad, Search/Commands e Onboarding. O renderer vendorizado recebe um
parâmetro `gradient` opcional; o modo monocromático padrão permanece disponível.
Geometria, mapeamento semântico, velocidades e reduced motion não mudam.
A alteração local está documentada nos notices; licença MIT intacta.

Web centraliza tint em `src/product/orbTint.ts`, usado por EditorialOrb e
ThinkingOrb. As demos inline de hero, passos, Home e Search recebem a mesma cor.
Breathing retém profundidade por alpha em vez de trocar tint por cinza.
Gradiente é cacheado por tamanho, sem criação por frame.
Símbolo, app icon e identidade da menu bar não são alterados.

## Validação

- Build/lint web passaram. JS 242.83KB / 76.32KB gzip; CSS 39.87KB / 9.22KB gzip.
- Harness React/StrictMode passou: quatro rodadas completas, pares corretos,
  mudança apenas entre rodadas, wrap, pausas, ações manuais, visibilidade,
  reduced motion, SSR, CTAs/disclosures e checksum do DMG.
- Harnesses Canvas editorial e inline passaram: stops/coordenadas, cache,
  profundidade, pause/reduced motion e cleanup. Geometria px64 permanece
  equivalente aos 16 frames Swift previamente capturados, erro máximo ~9.96e-11.
- Build Debug nativo passou em `/private/tmp/rasc-four-cycles/derived`.
- Renderer SwiftUI real gerou previews isolados da Orb em px64/px20 sobre fundos
  claro e escuro. Imagens inspecionadas em `orb-light.png` / `orb-dark.png` nesse
  diretório temporário. São renders de componentes, não capturas do aplicativo.
- `OverlayStateTests` compilou, mas não executou: LaunchServices não conseguiu
  iniciar o runner, IDELaunchErrorDomain código 20. Não declarado como teste aprovado.
- Nova inspeção renderizada da landing segue bloqueada pela falha de verificação
  da política do navegador. Viewports, composição/foco/overflow finais e aplicação
  em janela real ainda não foram aprovados visualmente.

Nenhuma dependência, commit, push, release ou deploy. DMG distribuído permanece
`/downloads/Rasc-0.1.0-beta.3.dmg`, originado em
`/Users/rafatorres/Desktop/rasc/build/rc/Rasc-0.1.0-beta.3.dmg`; não foi reempacotado
com a nova Orb. GitHub permanece https://github.com/rafaeltorresng/rasc.

Arquivos de implementação web: fixtures, ProductScenes, ThinkingOrb,
EditorialOrb, novo orbTint e styles.css. Nativo: RascOrb.swift,
ThinkingOrb.swift vendorizado e THIRD_PARTY_NOTICES.md. Documentação/evidência
web atualizadas. A proibição anterior de modificar `rasc` foi superada pela
autorização específica do usuário para esta alteração visual.
