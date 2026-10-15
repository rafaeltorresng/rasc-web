# Rasc — companion editorial

Decisão de 14/10/2026: M3 é a referência principal de trabalho, M0 a alternativa e M1 a pose secundária de divulgação. A aplicação aguarda aprovação visual da branch `rafa/editorial-companion` antes de merge/deploy. O aplicativo macOS permanece intacto.

## Arquitetura visual

| Elemento | Papel e aplicação |
| --- | --- |
| Brand Symbol + wordmark | Identificar o Rasc. Marca atual preservada. |
| Thinking Orb | Linguagem de shaping/estado no produto. Preservada nas demonstrações e capturas do app. |
| Companion | Presença editorial que acolhe pensamentos em formação. Uma aplicação: “Not every thought is a note yet”. |
| M1 | Assinatura secundária em uma variante separada de divulgação. |
| Família B | Exploração secundária, fora da integração e do build público. |

O fragmento nas mãos de M3 é uma metáfora de pensamento inacabado. Não representa uma Orb funcional, inteligência artificial, processamento, resultado de Refine ou sucesso. O personagem não recebe nome, fala, poderes ou novas funções de produto nesta etapa.

## Ficha objetiva — características invariáveis

Estas regras descrevem o desenho preservado de M3; não solicitam um redesenho.

| Característica | Referência a preservar |
| --- | --- |
| Silhueta | Figura vertical e assimétrica, cabeça/capuz grande e inclinado, dobra ampla projetada à esquerda, corpo envolto em capa e pés pequenos em grafite. Voltada para a direita e para baixo. |
| Proporções | Limites visíveis de M3: 788 × 1098 px; largura/altura ≈ 0,718. Cabeça/capuz ocupam aproximadamente a metade superior. Corpo, mãos e pés permanecem menores. Preservar as relações do raster, sem alongar partes isoladas. |
| Olhos | Dois pequenos ovais escuros, inclinados, sem pupilas, brilho, sobrancelhas ou boca. A expressão vem da cabeça e da pose. |
| Capa | Superfície clara contínua, dobras largas e bordas suaves. A abertura revela corpo/mãos em grafite. Sem costuras, bolsos, emblemas ou acessórios adicionais. |
| Verso laranja | Área pequena no interior da dobra inferior esquerda. Parte do material, sem virar ponto luminoso ou grande bloco cromático. |
| Materialidade | Papel/escultura fosca com espessura sutil, volumes macios e sombreamento difuso. Sem plástico brilhante, vidro, metal, textura ornamental ou glow. |
| Cores | Branco quente/marfim na capa e cabeça; grafite em corpo exposto, mãos, pés e olhos; verso laranja; fragmento violeta suave. Preservar os tons e a luz do master, sem recolorir materiais para hex de interface ou criar novos tokens funcionais. |
| Fragmento violeta | Pequeno volume irregular, curvo e dobrado, perto do corpo nas duas mãos. Sem partículas, faíscas, halo ou geometria da Thinking Orb. M1 permanece sem fragmento. |
| Câmera | Vista de três quartos, perspectiva contida e personagem inteiro. Preservar orientação; não espelhar, rotacionar ou forçar perspectiva isométrica. |
| Iluminação | Luz ampla e suave, predominantemente superior/esquerda; contraste moderado; sombras neutras levemente violetas nas dobras. Sem spotlight, luz colorida adicional ou sombra pesada aplicada pelo site. |
| Personalidade | M3 observa e acolhe o fragmento; M1 mantém braços/mãos próximos ao corpo. Presença contemplativa e silenciosa, sem sugerir que opera o aplicativo. |

M0 permanece como alternativa na raiz, sem derivados públicos. M1 tem pequenas diferenças de contorno em relação a M3; o desenho foi preservado, sem redesenho para forçar consistência artificial.

## Composição e acessibilidade

- Uma aplicação estática no aside da seção conceitual. Hero, showcase canônico, conteúdo, ordem das seções e demonstrações não mudam.
- Acima de 820 px: altura visível de 280 px, largura de aproximadamente 201 px e intervalo de 28 px após a frase em Georgia. A coluna de leitura mantém tipografia, largura e posição.
- Até 820 px: frase e personagem compartilham a faixa horizontal, gap de 24 px, altura visível de 128 px. A introdução ganha 64 px em relação à antiga Orb de 64 px; as quebras do título permanecem iguais.
- Escalar pelos limites visíveis, sem usar o canvas transparente como critério. Não transformar a figura em um segundo hero mobile.
- Não adicionar sombra, pedestal, contorno, fundo próprio, parallax, loop ou reação ao cursor. Mensagem e texto continuam prioritários.
- Ilustração e pequena frase editorial são decorativas: `aria-hidden`, alt vazio, sem controle ou item de foco. O significado já está no texto acessível da seção.
- Altura e aspect-ratio reservam espaço antes do download. Lazy loading, decoding assíncrono, prioridade baixa, srcset WebP e fallback PNG. O mascote não introduz animações nem transições; a preferência de movimento continua sendo respeitada pelos componentes existentes.

## Divulgação e manutenção

`docs/showcase/rasc-post.png` e `rasc-post@2x.png` continuam canônicos. A variante `rasc-post-companion.png` / `rasc-post-companion@2x.png` acrescenta somente M1 no espaço inferior direito, fora das janelas, com cerca de 141 px de altura em um quadro de 1200 × 1080. Nenhuma janela é movida ou reduzida.

O PNG 2× de 2400 × 2160 usa o master PNG canônico e o master transparente de M1; não amplia um screenshot JPEG. O manifesto registra zero alteração de pixels fora da assinatura. No feed mobile, o personagem permanece reconhecível, mas os textos do app exigem ampliação; posts explicando Refine devem usar uma peça dedicada ao produto.

Preview local: `/?showcase=post` é o original; `/?showcase=post&pose=m1` é a variante. Os dois são exclusivos de desenvolvimento. Os controles Orb/M3/M0 seguem em `/?companion=owned`; M3 usa o componente final, e a comparação abstrata foi retirada do estudo ativo.

Fontes, enquadramento, hashes e formatos estão em `brand/companion/README.md` e `manifest.json`. Somente os derivados de M3 usados pela landing vão ao bundle público. Não colocar masters, referências ou explorações em `public/`.

Novas aplicações devem justificar um papel editorial e evitar repetição em seções consecutivas. Não transformar o companion em logo, app icon, favicon, Thinking Orb, mascote de IA, botão ou decoração sistemática. Não acrescentar poses sem um uso concreto.
