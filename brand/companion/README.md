# Companion — fontes e derivados

M3 é a referência de trabalho para a única aplicação editorial da landing; M1 é a pose secundária de divulgação. A integração aguarda aprovação visual. Estes arquivos não substituem o logo ou a identidade funcional do app.

## Fontes preservadas

- M3: `ChatGPT Image Oct 14, 2026, 08_23_32 PM-3.png`, na raiz.
- M1: `ChatGPT Image Oct 14, 2026, 08_23_30 PM-1.png`, na raiz.
- M0: `Hooded Mascot Cradling a Lilac Orb(1).png`, na raiz, como alternativa sem derivados públicos.

Originais não foram movidos nem regravados. Hashes de M3/M1 estão no manifesto. As outras explorações continuam na raiz e não participam da produção.

## Enquadramento e alpha

`m3-master.png` e `m1-master.png` usam o mesmo recorte nativo: x=203, y=63, largura=832, altura=1136. A pequena margem transparente é consistente; não há ampliação, espelhamento ou redesenho. Os limites visíveis de cada pose estão no manifesto para alinhamento óptico.

O RGBA de cada master é idêntico ao mesmo recorte do original. Não houve remoção de tons claros, endurecimento do alpha ou recoloração. Contornos foram revisados sobre `#FBFAFD` e `#29272F`, sem fundo opaco ou halo de recorte significativo. O perímetro de M3 tem alpha zero; o maior resíduo de M1 é 1/255, abaixo de 0,4%. Não apagar antialiasing como se fosse um defeito.

O uso atual é claro. Em grafite, mãos e pés perdem contraste; isso não autoriza recoloração ou uma variante escura nesta etapa.

## Formatos

| Arquivo | Dimensões | Uso |
| --- | --- | --- |
| `m3-master.png`, `m1-master.png` | 832 × 1136, RGBA | Fonte de composição, fora do build público. |
| `src/assets/companion/m3-224.webp` | 224 × 306 | Mobile/desktop 1×, conforme srcset. |
| `src/assets/companion/m3-448.webp` | 448 × 612 | Desktop 2×. |
| `src/assets/companion/m3-672.webp` | 672 × 918 | Desktop 3×. |
| `src/assets/companion/m3-448.png` | 448 × 612, RGBA | Fallback sem WebP. |
| `m1-web.webp` | 320 × 437 | Preview de divulgação, importado apenas por páginas de desenvolvimento. |

Sharp 0.35.5: recorte nativo; PNG compressionLevel=9/adaptiveFiltering=true; resize sem enlargement; WebP quality=90/alphaQuality=100/effort=6. Tamanhos, hashes e pesos estão no `manifest.json`. Nenhuma nova dependência de imagem foi instalada no projeto ou adicionada ao runtime.

O browser moderno transfere apenas o WebP escolhido; não pré-carregar o fallback. Regras de personagem e composição: `docs/EDITORIAL-COMPANION.md`.
