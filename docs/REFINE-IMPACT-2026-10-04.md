# Refine e espaçamento dos passos

O usuário rejeitou o exemplo de eventos duplicados por seu ganho visual fraco.
Ele foi substituído por um pensamento concreto de engenharia/produto:

Antes: `user loses everything if upload fails keep what they typed show clear error let them retry`

Depois: `User loses everything if upload fails. Keep what they typed. Show clear error. Let them retry.`

A escolha torna legíveis quatro partes que estavam em sequência: problema,
preservação do texto, feedback de erro e nova tentativa. Continua sendo uma nota
de trabalho; Refine não investiga um bug nem inventa a solução. O Home usa o
mesmo rascunho, com o título sintético `upload recovery`.

Comparação de produção: 20 candidatos sintéticos, três execuções por candidato,
com provider e guardrails reais no binário Debug existente. Foram rejeitadas
saídas com perda de informações, fortalecimento de hipóteses, interpretação
errada dos fragmentos ou melhora insuficiente. O candidato selecionado teve
duas saídas úteis (capitalização variou) e uma rejeição `no_change`. A saída
selecionada foi observada literalmente. A reprodução pública permanece fixa;
estes resultados não garantem o mesmo resultado em toda execução no app.
Evidência: [hero-refine-impact-evidence-2026-10-04.json](hero-refine-impact-evidence-2026-10-04.json).

O print fornecido mostrou dois problemas de espaçamento:

- Uma legenda visível criava outra linha antes do aviso e do botão. O estado já
  aparece na janela e na explicação lateral; a legenda permanece como figcaption
  acessível com anúncio polite/atomic. O rodapé começa 8px após a demo, com aviso
  à esquerda e continuação à direita, preservando a área de interação de 44px.
- O padding inferior dos passos somava ao padding superior da diferenciação.
  Agora somam 56px no desktop/tablet e 40px no mobile, contra até 224px antes.
  Overrides específicos preservam o espaçamento mesmo após os breakpoints.

Validação: build/lint e harnesses de quatro ciclos, pares observados de Refine,
navegação dos passos, Accept/Keep/foco e reduced motion passaram. A revisão usa
o print enviado como evidência do problema; o resultado final em navegador ainda
não foi inspecionado devido ao bloqueio de acesso existente. Nenhum arquivo
nativo, DMG ou distribuição foi alterado nesta rodada.
