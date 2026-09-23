# Rasc — Landing IA + Visual Direction v1

## 0. Princípio estrutural

A landing deve parecer uma extensão pública do próprio Rasc: **quiet, native, intentional, premium**.

Ela não deve parecer uma página de SaaS explicando dezenas de capabilities. O produto real deve carregar a maior parte da narrativa.

Direção geral:

**warm editorial canvas → produto real → espaço → tipografia → poucos acentos semânticos**

A página é predominantemente light. Dark aparece apenas quando existir naturalmente dentro do produto ou quando houver uma razão clara de contraste.

---

# 1. Page frame

## Container

Desktop:

| Propriedade              |            Valor |
| ------------------------ | ---------------: |
| Max page container       | **1180–1200 px** |
| Grid                     |   **12 colunas** |
| Gap                      |        **24 px** |
| Gutter ≥ 1440px viewport |     **48–64 px** |
| Gutter 1024–1439px       |        **40 px** |
| Gutter < 768px           |     **20–24 px** |
| Narrow reading column    |   **620–680 px** |

O container deve permanecer relativamente compacto. Não usar largura de 1400–1600 px apenas para preencher monitores grandes.

Elementos visuais do produto podem exceder levemente o grid quando isso fizer a janela do Rasc parecer mais natural, mas texto permanece alinhado ao container.

## Vertical rhythm

| Contexto             |   Desktop |    Tablet |  Mobile |
| -------------------- | --------: | --------: | ------: |
| Hero top spacing     |  96–112px |      80px | 56–64px |
| Entre grandes seções | 144–168px | 112–128px | 80–96px |
| Heading → body       |   20–28px |   18–24px | 16–20px |
| Body → visual        |   40–56px |   32–40px | 28–32px |

A página precisa respirar. Evitar preencher os vazios com badges, cards, logos ou pequenos elementos decorativos.

---

# 2. Header

Header extremamente pequeno.

Desktop:

**esquerda:** marca/wordmark Rasc
**direita:** `Request beta access`

Sem navbar tradicional com 5–6 itens.

Se links internos forem necessários depois, no máximo:

`How it works` · `Privacy`

Mas a v1 pode perfeitamente funcionar apenas com marca + CTA.

Altura visual aproximada: **64–72 px**.

Não usar header pesado, border permanente ou fundo contrastante. Quando a página rolar, pode adquirir um warm-white ligeiramente translúcido com blur muito discreto.

---

# 3. Hero

## Composição

Desktop em **5 / 7 colunas**:

**5 colunas:** mensagem
**7 colunas:** demo

O demo deve ocupar aproximadamente **58–62% da largura útil do hero**.

Não centralizar tudo como uma página genérica de startup.

O texto começa no lado esquerdo e o produto aparece grande à direita, criando a sensação de ferramenta real ao lado de uma declaração editorial.

### Eyebrow

**Rasc for Mac**

Pequeno, graphite-muted.

Não transformar isso em badge/pill.

### Headline

# A scratchpad for unfinished thoughts.

Essa permanece canônica.

“For Mac” fica fora da headline.

### Subheadline

> Capture a thought before you know what it should become. Refine it without a prompt. Keep what matters, then move on.

Largura máxima: aproximadamente **480–520 px**.

### CTA

**Request beta access**

Único botão primário.

Orange action token do produto.

Sem CTA secundário.

### Trust line

**Native Mac app · No account · Local by default**

Isso é suficiente no hero.

Logo abaixo, menor e visualmente secundário:

**Refine requires Apple Intelligence. The rest of Rasc does not.**

Essa segunda linha é compatibility disclosure, não trust marketing.

O produto realmente mantém captura, Home, Search, Keep e demais operações utilizáveis quando Foundation Models está indisponível.

---

# 4. Hero demo

O hero visual não deve ser screenshot estático.

Deve ser uma **captura real do interaction model**.

## Formato

Canvas visual aproximado:

**16:10** ou próximo de **1.6:1**

Não usar MacBook mockup.

Não usar browser/device frame.

Mostrar diretamente o desktop/app real, com o `NSPanel` do Rasc sobre um contexto de trabalho neutro.

A janela real e sua shadow nativa são suficientes.

## Escala

O scratchpad precisa continuar grande o bastante para o conteúdo ser lido sem abrir fullscreen.

Em desktop grande, o demo pode ocupar cerca de:

**680–760 px de largura**

Dentro dele, o Rasc deve dominar a composição.

O background app deve existir apenas para provar que Rasc aparece **sobre o trabalho existente**, nunca competir visualmente.

## Storyboard

**8–12 segundos é o alvo narrativo, não um limite rígido.**

Se um take real bom durar 13–14 segundos porque Refine precisa respirar naturalmente, isso é preferível a acelerar artificialmente.

| Momento | Cena                                            |
| ------- | ----------------------------------------------- |
| 0       | Usuário trabalhando normalmente em outro app    |
| +       | `⌥\`                                            |
| +       | Rasc aparece e recebe foco                      |
| +       | pensamento inacabado é digitado                 |
| +       | `⌘J`                                            |
| +       | orb entra em shaping                            |
| +       | preview real aparece                            |
| +       | usuário aceita                                  |
| +       | `⇧⌘K`                                           |
| final   | Rasc desaparece e o trabalho original permanece |

Overlays permitidos:

`⌥\`
`⌘J`
`⇧⌘K`

Nada mais.

Sem títulos “Capture”, “AI Rewrite”, “Save” aparecendo sobre o vídeo.

## Playback

Desktop:

autoplay muted quando visível.

Após terminar, manter frame final por aproximadamente 2 segundos antes de reiniciar suavemente.

Click pode reiniciar.

Não exigir controls de vídeo tradicionais no hero.

Mobile:

poster de alta qualidade + play explícito caso autoplay seja ruim ou caro.

`prefers-reduced-motion` deve substituir autoplay por poster/static sequence.

---

# 5. Section 2 — Owned moment

Depois do hero vem texto, não outra interface.

A página precisa desacelerar.

## Layout

Texto em coluna de aproximadamente **650 px**, deslocada levemente à esquerda do centro do container.

Sem card.

Sem ilustração obrigatória.

### Heading

# Not every thought is a note yet.

### Body

Ideas arrive half-formed. A message you might send. Something you need to remember. A task that may become important. A sentence that still isn’t right.

They’re worth capturing, but not worth organizing yet.

### Closing statement

**Rasc gives unfinished thoughts somewhere to exist before you decide what they should become.**

Essa é a seção mais editorial da landing.

Deve haver bastante espaço antes e depois dela.

---

# 6. Capture → Refine → Keep

Esta é a principal seção de produto.

Não usar três cards lado a lado.

Não usar ícone + título + descrição.

## Desktop composition

Usar **scrollytelling simples**.

Grid:

**4 colunas de narrativa + 8 colunas de produto**

À esquerda ficam três etapas verticais:

Capture
Refine
Keep

À direita, uma área de produto grande permanece sticky durante a sequência.

Conforme cada etapa entra em foco, o visual à direita muda por crossfade ou transição mínima entre três estados reais do app.

Sem parallax.

Sem movimento espacial extravagante.

## Capture

### Write before you organize.

Press `⌥\` from anywhere. Rasc appears ready for whatever is on your mind.

No title, folder, or destination required.

Visual:

scratchpad recém-aberto + thought ainda messy.

## Refine

### Shape it without prompting.

When the wording needs work, press `⌘J`.

Rasc refines the text on-device and shows you the result before anything changes.

**No prompt. No tool picker. No AI chat.**

Visual:

estado real de shaping → preview.

Aqui o orb pode ocupar protagonismo porque está desempenhando sua função semântica real.

## Keep

### Settle it and move on.

When the thought feels finished, Keep it.

Rasc gets out of the way, the thought stays retrievable, and your next scratch starts fresh.

Visual:

Keep → panel desaparecendo → contexto anterior.

Closing line:

**Capture → Refine → Keep. Nothing to organize up front.**

Esse trio é o **core/distinctive interaction model** do produto.

---

# 7. “Not another system”

Depois do interaction model, reduzir novamente a densidade visual.

## Composition

Heading grande à esquerda.

À direita, apenas um bloco curto de texto — não feature cards.

### Heading

# A scratchpad, not another system.

### Copy

No folders to set up. No prompt to write. No account to maintain.

And no need to decide where a thought belongs before you’ve even finished thinking it.

Visualmente, essa seção pode ter apenas uma linha horizontal delicada ou um pequeno uso de violet como emphasis.

Nada de ilustração conceitual.

---

# 8. Home + Search

Só agora mostrar a camada de recuperação.

## Heading

# Pick it up later.

### Copy

Unfinished or kept, your thoughts stay easy to recover.

Open Home or Search when you need one again — without turning Rasc into a system you have to maintain.

Home é deliberadamente browsing/retrieval, não a principal superfície de captura.

## Visual

Uma composição única, grande.

Não duas screenshots independentes em cards.

Base:

**Home em aproximadamente 80–85% da composição.**

Por cima ou parcialmente deslocado:

**Search em aproximadamente 35–45% da largura do visual**, mostrando a surface real do `⌘P`.

O Search deve parecer naturalmente sobreposto à experiência, não um floating marketing card inventado.

A intenção é comunicar:

**“há histórico e recuperação”**

sem reposicionar Rasc como notes database.

Usar conteúdo de exemplo realista e curto.

Evitar 40 notas falsas cuidadosamente compostas.

---

# 9. Trust section

Essa seção deve parecer quase uma nota técnica elegante, não security marketing.

## Background

Manter warm-light.

Pode usar um tom ligeiramente diferente do canvas:

canvas geral → warm off-white
trust surface → um warm white 1 nível mais claro/escuro

Sem dark block.

Sem gradient.

## Heading

# Your thoughts stay on your Mac.

### Body

Notes are stored locally. Refine runs with Apple Foundation Models on-device. No account. No cloud AI.

Essas propriedades fazem parte da arquitetura atual do produto.

## Proof row

Três colunas sem cards:

| Native macOS             | On-device Refine                             | No account                                        |
| ------------------------ | -------------------------------------------- | ------------------------------------------------- |
| Built as a real Mac app. | Refine uses Apple Foundation Models locally. | Install and use Rasc without creating an account. |

Separação apenas por espaço ou hairlines verticais discretas.

Nada de shields, locks gigantes ou ícones neon.

Abaixo, uma compatibility note:

**Apple Intelligence is required for Refine only. Capture, Keep, Home, Search and the rest of Rasc remain available without it.**

Essa informação deve estar visível sem tooltip ou FAQ.

---

# 10. Final CTA

Não criar um grande bloco dark.

Usar bastante espaço e uma superfície levemente mais quente que o canvas.

### Heading

# Give unfinished thoughts somewhere to land.

### Supporting copy

Capture them before they become notes. Shape them when they need it. Keep only what matters.

### CTA

**Request beta access**

### Trust line

**Native Mac app · No account · Local by default**

Nada mais.

---

# 11. Typography

A landing deve parecer Mac-native sem tentar imitar literalmente uma Settings window.

## Primary typeface

Usar system stack:

`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif`

Na prática, o browser deve resolver para San Francisco em macOS sem distribuir arquivos de fonte.

## Scale

| Elemento            | Desktop |  Mobile |
| ------------------- | ------: | ------: |
| Hero headline       | 64–72px | 40–46px |
| Section headline    | 44–52px | 32–36px |
| Step heading        | 28–32px | 26–28px |
| Hero body           | 20–22px | 18–19px |
| Body                | 17–19px | 16–17px |
| Eyebrow             | 13–14px |    13px |
| Trust/compatibility | 13–14px |    13px |

Hero headline:

weight aproximadamente **600**, não 800.

Tracking levemente negativo apenas em headings grandes.

Body com line-height generoso: aproximadamente **1.5–1.6**.

Não usar all-caps para labels.

---

# 12. Color system

A landing deve reutilizar a semântica do produto:

**orange → action**
**violet → state/focus/identity detail**
**graphite → content**
**warm neutral → structure**

Isso já é a direção aceita no design system do app.

## Web tokens propostos

Os valores finais devem preferencialmente ser derivados dos tokens reais do app.

Como direção:

| Token                 | Uso                                 |
| --------------------- | ----------------------------------- |
| Warm canvas           | `#F7F4EE` approx.                   |
| Elevated warm surface | `#FFFDF9` approx.                   |
| Graphite              | `#252321` approx.                   |
| Muted graphite        | `#6E6963` approx.                   |
| Hairline              | graphite com ~10–14% opacity        |
| Orange                | **mesmo action accent do app**      |
| Violet                | **mesmo state/focus violet do app** |

Orange aparece principalmente:

CTA.

Talvez hover/pressed.

Nada mais.

Violet aparece:

focus ring, pequenos state accents, active Capture/Refine/Keep step, detalhes mínimos relacionados ao orb/state.

Nunca pintar metade da página de violet.

---

# 13. Thinking Orb

O orb é **semantic motion**, não mascote decorativo.

Seu maior momento na landing é o **Refine**.

Pode também aparecer uma única vez próximo à identidade/marca caso a versão final do brand determine isso.

Não repetir orbs pelo background.

Não usar orb gigante em gradient no hero.

Não transformar orb em “AI magic”.

No demo, usar exclusivamente a animação real do produto.

Isso preserva a regra já estabelecida de que o Thinking Orb representa estado/atividade e não decoração generalizada.

---

# 14. Screenshots

Screenshots devem mostrar **produto**, não marketing compositions inventadas.

Tratamento:

sem browser/device mockup;

sem perspectiva 3D;

sem rotação;

sem floating cards ao redor;

sem glow artificial;

usar shadow de janela macOS natural ou uma sombra web extremamente próxima;

manter texto grande o suficiente para leitura.

Preferir light-mode screenshots para a página principal.

Dark screenshots podem aparecer quando forem verdadeiros ao estado mostrado, mas nunca para criar artificialmente uma “AI section”.

---

# 15. Motion

Motion deve comunicar mudança de estado.

Não decorar.

Permitido:

demo do hero;

Thinking Orb real;

crossfade entre Capture / Refine / Keep;

pequenos hover/press states;

header transition muito discreta;

fade curto de screenshot quando estado muda.

Evitar:

parallax;

texto voando;

scroll-jacking;

elementos orbitando;

gradients animados;

floating blobs;

mouse-follow effects.

Timing web aproximado:

microinteraction: **120–180 ms**

surface/state transition: **180–260 ms**

Capture/Refine/Keep visual transition: **250–350 ms**

`prefers-reduced-motion` deve remover qualquer movimento espacial e manter mudanças instantâneas ou por opacity curta.

---

# 16. Responsive behavior

## ≥ 1200px

Layout completo.

Hero 5/7.

Capture/Refine/Keep sticky 4/8.

Máximo impacto visual do demo.

## 900–1199px

Hero pode permanecer split, aproximadamente 5/7 ou 6/6.

Demo reduz levemente.

Capture/Refine/Keep ainda pode usar sticky se houver espaço vertical suficiente.

## 640–899px

Hero vira uma coluna:

copy primeiro
demo depois

Não colocar demo antes da proposta.

Capture/Refine/Keep deixa de ser sticky.

Cada etapa recebe:

texto → visual correspondente.

Home/Search composition ocupa largura completa.

## < 640px

Gutter 20–24 px.

Headline 40–46px.

CTA largura completa ou quase completa.

Demo usa poster/video 16:10.

Nenhum texto crítico fica dentro do vídeo.

Capture/Refine/Keep é totalmente sequencial.

Proof row do trust section empilha verticalmente, separado apenas por whitespace/hairline.

---

# 17. Section sequence final

| Ordem | Seção                            | Função                                    |
| ----: | -------------------------------- | ----------------------------------------- |
|     1 | Header                           | Identidade + beta CTA                     |
|     2 | Hero + demo                      | Categoria + owned moment + prova imediata |
|     3 | Not every thought is a note yet  | Reconhecimento do problema                |
|     4 | Capture → Refine → Keep          | Explicar o distinctive interaction model  |
|     5 | A scratchpad, not another system | Diferenciação sem competitor table        |
|     6 | Pick it up later                 | Recuperação via Home/Search               |
|     7 | Your thoughts stay on your Mac   | Trust + compatibility                     |
|     8 | Final CTA                        | Conversão para private beta               |

Não adicionar uma seção independente de “Features”.

Não adicionar testimonials ainda se não existirem evidências reais.

Não adicionar logos de empresas.

Não adicionar pricing até a decisão comercial dessa frente estar pronta.

---

# 18. Hard constraints

| Não fazer                       | Motivo                                         |
| ------------------------------- | ---------------------------------------------- |
| Predominantly dark landing      | Contraria a linguagem warm/editorial escolhida |
| Hero com orb abstrato gigante   | Faz parecer AI product genérico                |
| Bento grid                      | Fragmenta uma narrativa que deve ser linear    |
| Feature cards em massa          | Reposiciona Rasc como suíte                    |
| Gradient violet/blue AI         | Categoria visual errada                        |
| Fake app UI                     | Produto real já é suficientemente forte        |
| Device mockups                  | Adicionam decoração e reduzem legibilidade     |
| Sidebar/site nav complexo       | Landing é curta e linear                       |
| Theme switch                    | Nenhuma necessidade na v1                      |
| Competitor comparison table     | Diminui o posicionamento                       |
| Home antes do interaction model | Faz parecer notes manager                      |
| Refine antes de Capture         | Faz parecer AI writing tool                    |

---

# 19. Critério de sucesso visual

Ao abrir a landing, a pessoa deve perceber nesta ordem:

**1. Rasc é pequeno e específico.**

**2. É um lugar para pensamentos ainda inacabados.**

**3. Ele aparece rapidamente dentro do trabalho existente.**

**4. Capture → Refine → Keep é a maneira como o produto funciona.**

**5. Refine usa AI, mas Rasc não é um AI assistant.**

**6. Há recuperação sem organização obrigatória.**

**7. É nativo, local e confiável.**

Se a implementação visual alterar essa ordem de percepção, ela está errada.
