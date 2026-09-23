# Rasc — Landing Asset Plan v1

## 1. Estrutura do pacote

Criar uma pasta de assets com esta organização conceitual:

```text
landing-assets/
  brand/
  hero/
  interaction/
  retrieval/
  trust/
  posters/
  source-captures/
  manifests/
```

`source-captures/` contém masters não comprimidos das gravações e screenshots.

Os diretórios restantes contêm apenas assets finais preparados para web.

---

# 2. Hero demo

## Arquivo principal

**`hero/rasc-hero-demo-light.mp4`**

Objetivo: provar o interaction model real:

**working → ⌥\ → Capture → ⌘J → Refine → Accept → Keep → back to work**

### Duração

Alvo narrativo:

**8–12 segundos**

Não é limite rígido.

Um take natural de 12–14s é aceitável se representar melhor a velocidade real do produto.

Não acelerar Refine artificialmente.

### Master

Capturar em:

**2560 × 1600 px**
ou resolução Retina equivalente preservando proporção próxima de **16:10**.

30 fps é suficiente.

Não há benefício claro em 60 fps para essa interação.

Master recomendado:

**ProRes 422 ou HEVC de alta qualidade**

Arquivo:

`source-captures/hero-demo-master.mov`

### Web exports

Produzir:

| Arquivo                     | Formato      | Uso                   |
| --------------------------- | ------------ | --------------------- |
| `rasc-hero-demo-light.mp4`  | H.264 MP4    | fallback universal    |
| `rasc-hero-demo-light.webm` | WebM VP9/AV1 | browsers compatíveis  |
| `rasc-hero-poster.webp`     | WebP         | initial load / mobile |
| `rasc-hero-poster@2x.webp`  | WebP         | Retina                |
| `rasc-hero-poster.jpg`      | JPEG         | fallback simples      |

O vídeo deve estar:

* muted;
* sem áudio;
* sem cursor desnecessário;
* sem informações pessoais;
* sem notificações;
* sem menubar clutter irrelevante.

---

# 3. Texto canônico do hero demo

Usar este pensamento:

> **ask maya if launch copy still works and send updated screenshots**

Motivos:

* parece algo realmente digitado durante trabalho;
* está claramente inacabado;
* não é uma “nota formal”;
* não exige contexto externo complexo;
* não contém URL, número, dinheiro ou outras classes protegidas que distraiam da demonstração;
* tem uma melhoria legítima e pequena;
* não exige que Refine invente conteúdo.

## Resultado desejado

Resultado ideal:

> **Ask Maya if the launch copy still works and send the updated screenshots.**

Resultados também aceitáveis, se produzidos naturalmente pelo app:

> **Ask Maya whether the launch copy still works and send the updated screenshots.**

ou

> **Ask Maya if the launch copy still works, then send the updated screenshots.**

Critérios:

* Maya permanece Maya;
* nenhuma informação nova é inventada;
* intenção permanece a mesma;
* linguagem permanece English;
* transformação é claramente melhor, mas conservadora;
* output não vira texto excessivamente formal ou elaborado.

## Regra fundamental

**O resultado final mostrado na landing será um output real do Rasc.**

Não editar manualmente o resultado dentro do vídeo.

Antes da gravação definitiva, executar esse input várias vezes no build que será usado para marketing.

Se ele produzir `noChange` com frequência ou apresentar muita variabilidade, substituir o exemplo **antes da gravação**, e documentar o novo par input/output no manifest.

Nunca selecionar um resultado artificialmente perfeito que o produto não consegue reproduzir razoavelmente.

O comportamento conservador e `noChange` fazem parte do contrato real do Refine.

---

# 4. Hero storyboard assets

Além do vídeo completo, capturar frames individuais dos principais momentos.

## Necessários

**`hero/frame-01-context.webp`**
Outro app ativo; Rasc fechado.

**`hero/frame-02-capture.webp`**
Scratchpad aberto com pensamento inacabado.

**`hero/frame-03-refining.webp`**
Orb em estado real de shaping.

**`hero/frame-04-preview.webp`**
Preview real do Refine.

**`hero/frame-05-settled.webp`**
Resultado aceito antes do Keep.

**`hero/frame-06-return.webp`**
Rasc fechado; contexto original novamente visível.

Cada frame:

* master Retina;
* export WebP 2x;
* versão 1x opcional gerada na pipeline web.

Esses frames servem como fallback, responsive e eventualmente para substituir vídeo quando Reduce Motion estiver ativo.

---

# 5. Capture assets

## Screenshot principal

**`interaction/capture-light.webp`**

Estado:

* Scratchpad real;
* light mode;
* texto ainda unfinished;
* editor focado;
* nenhuma palette/search aberta;
* sem Refine ativo.

Conteúdo:

> ask maya if launch copy still works and send updated screenshots

### Proporção

Não recortar a janela agressivamente.

Capturar o `NSPanel` inteiro com sua shadow nativa.

Exportar composição aproximada **4:3 ou 3:2**, conforme a geometria real do scratchpad.

Não forçar screenshot a 16:9.

### Alternativo

**`interaction/capture-empty-light.webp`**

Estado real de empty scratch:

> Write something unfinished…

Esse asset é reserva. Não precisa necessariamente aparecer na v1 da landing.

---

# 6. Refine assets

Precisamos mostrar dois estados diferentes.

## Shaping

**`interaction/refine-shaping-light.webp`**

Estado real:

* pensamento original;
* `⌘J` já invocado;
* Thinking Orb em estado de Refine;
* sem output fabricado.

Esse frame pode ser capturado diretamente do vídeo hero se tiver qualidade suficiente.

## Preview

**`interaction/refine-preview-light.webp`**

Estado real de preview:

input:

> ask maya if launch copy still works and send updated screenshots

output:

resultado real aprovado durante a sessão de captura.

Deve mostrar claramente que:

* existe uma proposta;
* nada foi silenciosamente substituído;
* o usuário ainda mantém controle.

Refine usa preview antes de mutation e accepted changes são undoable no produto atual.

---

# 7. Keep assets

Keep é mais difícil de representar em screenshot estático porque seu significado está na transição.

Por isso:

## Asset principal

**vídeo/sequence**, não screenshot.

Trecho retirado do master:

**`interaction/keep-transition.mp4`**

Aproximadamente 2–3 segundos:

resultado aceito → Keep → panel desaparece → app anterior recupera foco.

### Poster

**`interaction/keep-poster.webp`**

Frame imediatamente antes do Keep, mostrando o thought settled.

Evitar tentar representar Keep com check gigante, archive icon ou outra UI que não exista no produto.

Keep encerra a scratch session; não é favorite/star.

---

# 8. Conteúdo realista para Home

Home deve parecer usado, mas não demo-data excessivamente perfeita.

Usar aproximadamente **8–12 notas visíveis**, misturando:

* unfinished;
* kept;
* pensamentos curtos;
* mensagens;
* pequenos lembretes;
* technical/work thoughts;
* uma ou duas ideias pessoais neutras.

## Kept

Exemplos:

**Launch page**

> Ask Maya if the launch copy still works and send the updated screenshots.

**Book flights**

> Compare the morning flights before prices move again.

**API retries**

> Keep retries bounded. We should fail visibly instead of hiding a persistent upstream problem.

## Today / unfinished

**pricing idea**

> one-time purchase maybe better fit than subscription because inference cost basically zero

**follow up**

> send the revised proposal after lunch

**onboarding thought**

> maybe shortcut practice should happen before explaining refine

**weekend**

> look up that restaurant João mentioned

## Earlier

**error handling**

> distinguish user cancellation from actual provider failure

**article**

> interesting idea: tools that disappear after the job is done

### Regras de conteúdo

Não usar lorem ipsum.

Não usar slogans da própria landing como notas.

Não fazer todas as notas parecerem escritas por um copywriter.

Algumas devem permanecer telegráficas.

Não inserir nomes reais ou informações pessoais.

Não mostrar dados confidenciais do desenvolvimento real do Rasc/SIP.

---

# 9. Home screenshot

## Principal

**`retrieval/home-light.webp`**

Deve vir do **app real**.

Estado:

* Home em light mode;
* geometria final real;
* Kept visível;
* Today/Yesterday/Earlier conforme couber naturalmente;
* nenhum menu contextual aberto;
* seleção discreta opcional, mas preferencialmente nenhum card selecionado.

### Master

Capturar janela em aproximadamente:

**2000 × 1360 px ou superior**

mantendo a proporção real da Home.

Não deformar para encaixar layout web.

Exportar:

`home-light@2x.webp`
`home-light.webp`

Home é browse/retrieval, não editing surface.

---

# 10. Search screenshot

## Principal

**`retrieval/search-light.webp`**

Deve mostrar o Search real aberto no scratchpad.

Query:

> **launch**

Resultado esperado:

pelo menos:

**Launch page**
ou resultado correspondente ao conteúdo criado para o demo.

Isso ajuda a criar continuidade narrativa entre Hero e retrieval.

O Search deve ser capturado como interface real, não reconstruído no site.

### Export

Master Retina.

`search-light@2x.webp`
`search-light.webp`

Na composição da landing, este screenshot poderá ser sobreposto visualmente ao Home pelo frontend, mas **a interface dentro dele não será recriada em HTML**.

---

# 11. Dark states

A landing não precisa duplicar cada screenshot em dark mode.

Produzir apenas dark states que possam ter valor real.

## Necessário

**`interaction/refine-preview-dark.webp`**

Por quê:

é o único lugar onde um dark surface pode adicionar contraste natural sem mudar a identidade da landing.

Mas seu uso na v1 é **opcional**.

## Reserva

**`retrieval/home-dark.webp`**

Capturar apenas se for trivial produzir durante a mesma sessão.

Não projetar nenhuma seção especificamente para ele.

### Não necessário

* Capture dark;
* Search dark;
* hero dark;
* final CTA dark;
* trust dark.

O light mode é a direção comercial primária.

---

# 12. Brand assets

A landing precisa de poucos assets de marca.

## Wordmark

**`brand/rasc-wordmark.svg`**

Preferência:

wordmark vetorial.

Graphite.

Também produzir:

`rasc-wordmark-white.svg`

apenas para usos futuros/dark surfaces.

## Symbol

**`brand/rasc-symbol.svg`**

Símbolo final, sem background.

Variantes:

`rasc-symbol-graphite.svg`
`rasc-symbol-white.svg`

Somente se a identidade final exigir variantes.

Não criar cinco cores do símbolo por antecipação.

## App icon

**`brand/rasc-app-icon-1024.png`**

Necessário para:

* browser metadata/social;
* eventual download UI;
* launch assets;
* public release.

Também exportar:

512×512
256×256
128×128

O arquivo fonte deve continuar sendo o asset oficial do app, não uma recriação web.

## Orb

Não exportar o Thinking Orb como logo se ele não for o símbolo final.

Para motion no site, preferir:

1. vídeo/captura real;
2. implementação visual homologada com a mesma fonte do app, se posteriormente necessário.

Nunca criar uma aproximação CSS aleatória do orb.

---

# 13. Typography assets

**Nenhum arquivo de fonte deve ser produzido.**

Landing usa system font stack.

Não exportar ou hospedar SF Pro.

A tipografia vem do sistema do usuário.

---

# 14. Design tokens

Antes do frontend, criar:

**`manifests/design-tokens.md`**

ou JSON equivalente se já houver uma pipeline adequada.

Esse arquivo deve registrar **valores reais extraídos do design system atual do app** para:

* action orange;
* state/focus violet;
* main graphite;
* muted graphite;
* primary warm surface;
* elevated warm surface;
* borders/hairlines;
* focus ring;
* radii relevantes;
* shadow relevante, se aplicável.

**Não usar os hex aproximados da spec anterior.**

O app é source of truth visual.

Se web exigir transformação técnica, como converter uma cor dinâmica do SwiftUI em light-mode CSS, documentar explicitamente de qual token real ela veio.

---

# 15. Hero overlays

Os únicos overlays gráficos necessários são:

**`⌥\`**
**`⌘J`**
**`⇧⌘K`**

Eles devem ser construídos **no site**, não queimados no vídeo.

Motivos:

* permanecem Retina-perfect;
* podem responder ao viewport;
* podem ser removidos para mobile se necessário;
* facilitam accessibility;
* não exigem regravar vídeo por pequenas mudanças.

Visual:

keycaps extremamente discretos, usando tokens reais do produto/site.

Sem glow.

---

# 16. Posters e reduced motion

## Hero reduced motion

**`posters/hero-reduced-motion.webp`**

Preferência:

frame do scratchpad já aberto com unfinished thought.

Mas um único frame perde o interaction model.

Portanto, produzir também:

**`posters/hero-sequence-01.webp`** — Capture
**`posters/hero-sequence-02.webp`** — Refine preview
**`posters/hero-sequence-03.webp`** — Settled

O frontend pode mostrar esses frames sequencialmente sem animação automática ou apresentar apenas o primeiro com controle manual.

## Mobile

**`posters/hero-mobile.webp`**

Crop/composição dedicada.

Não simplesmente cortar o vídeo desktop no centro.

Manter:

* Rasc legível;
* pouca informação do app de background;
* relação clara entre scratchpad e contexto.

Alvo:

**1200 × 1500 px** aproximadamente, ou proporção final definida pelo layout mobile.

---

# 17. Social / metadata assets

Mesmo antes do lançamento público, produzir:

**`brand/og-image.png`**

Proporção:

**1200 × 630**

Conteúdo:

* warm canvas;
* Rasc wordmark/symbol;
* “A scratchpad for unfinished thoughts.”
* screenshot real do scratchpad, se couber sem poluição.

Não usar hero demo frame com tiny UI ilegível.

Também:

**`favicon.svg`**

e assets derivados do app icon quando necessário.

---

# 18. O que deve vir do app real

Obrigatoriamente real:

| Asset                 | Fonte                |
| --------------------- | -------------------- |
| Hero demo             | app real             |
| Scratchpad Capture    | app real             |
| Refine shaping        | app real             |
| Refine preview        | app real             |
| Keep transition       | app real             |
| Home                  | app real             |
| Search                | app real             |
| Orb em movimento      | app real             |
| App icon              | asset oficial do app |
| Design colors         | design system real   |
| Window shadows/layout | app real             |

O site **não deve reconstruir visualmente essas interfaces**.

---

# 19. O que pode ser construído no site

Pode ser HTML/CSS/site-native:

* header;
* headline/body copy;
* CTA;
* trust/compatibility lines;
* shortcut overlays;
* Capture/Refine/Keep step labels;
* hairlines;
* section backgrounds;
* screenshot positioning;
* Home + Search overlap composition;
* responsive crops/containers;
* state/focus accents;
* small decorative identity details derivados do design system.

Regra:

> **Site can frame the product. It cannot fake the product.**

---

# 20. Compatibility messaging

Hero:

**Native Mac app · No Rasc account required · Notes stay local**

Logo abaixo:

**Refine requires Apple Intelligence. The rest of Rasc does not.**

Na trust section:

**Apple Intelligence is required for Refine only. Capture, Keep, Home, Search and the rest of Rasc remain available without it.**

Usar “No Rasc account required” quando houver proximidade visual com formulário de beta ou qualquer fluxo que solicite e-mail.

Isso evita sugerir falsamente que nenhum e-mail será pedido para obter acesso.

---

# 21. Asset manifest

Criar antes do frontend:

**`manifests/assets.md`**

Para cada arquivo registrar:

* filename;
* source build/version;
* data da captura;
* light/dark;
* dimensões master;
* dimensões exportadas;
* conteúdo mostrado;
* estado do app;
* se é source-of-truth ou derivative;
* compressão;
* observações de accessibility/reduced motion.

Para assets de Refine:

registrar também:

* input;
* output real;
* versão/build do app;
* confirmação de que a transformação não foi editada manualmente.

---

# 22. Build usado para marketing

Todas as capturas principais devem vir do **mesmo build visualmente aceito**.

Não misturar screenshots de beta.2 com beta.3 ou builds intermediários.

Antes da sessão de gravação:

* confirmar copy final dentro do app;
* confirmar Home final;
* confirmar icon/logo final usado no build;
* limpar dados pessoais;
* povoar database apenas com fixture de marketing;
* desligar notificações externas;
* definir appearance Light;
* usar escala de display consistente;
* confirmar que nenhuma debug UI aparece.

---

# 23. Definition of Ready

Os assets estão prontos para frontend somente quando:

### Brand

* [ ] símbolo final disponível em vetor;
* [ ] wordmark final disponível;
* [ ] app icon oficial disponível;
* [ ] favicon/OG asset preparado.

### Tokens

* [ ] valores web derivados do design system real;
* [ ] orange action confirmado;
* [ ] violet state/focus confirmado;
* [ ] warm/light surfaces confirmadas;
* [ ] graphite/text tokens confirmados.

### Hero

* [ ] demo gravado a partir do app real;
* [ ] input/output Refine documentados;
* [ ] transformação mostrada é real;
* [ ] duração natural está próxima do alvo 8–12s;
* [ ] MP4 exportado;
* [ ] WebM exportado;
* [ ] poster desktop;
* [ ] poster mobile;
* [ ] reduced-motion frames.

### Interaction

* [ ] Capture screenshot;
* [ ] Refine shaping screenshot/frame;
* [ ] Refine preview screenshot;
* [ ] Keep transition;
* [ ] settled poster.

### Retrieval

* [ ] Home light final;
* [ ] Search light final;
* [ ] conteúdo entre Home/Search consistente;
* [ ] nenhum conteúdo privado ou fictício demais.

### Optional dark

* [ ] Refine dark, se decidirmos usá-lo;
* [ ] Home dark apenas como reserva.

### Quality

* [ ] todos os screenshots Retina;
* [ ] nenhum UI reconstruído artificialmente;
* [ ] shadows e borders são fiéis ao app;
* [ ] nenhum screenshot esticado;
* [ ] conteúdo legível no tamanho real da landing;
* [ ] compressão web não introduz blur perceptível;
* [ ] nenhum asset contém notification, username, path ou dado privado.

### Consistency

* [ ] todas as capturas principais vêm do mesmo build;
* [ ] mesmo fixture dataset;
* [ ] mesmo display scale;
* [ ] mesmo light appearance;
* [ ] filenames e manifest completos.

Quando todos esses itens estiverem fechados, o frontend pode começar sem precisar inventar conteúdo, reconstruir produto ou tomar decisões visuais estruturais.
