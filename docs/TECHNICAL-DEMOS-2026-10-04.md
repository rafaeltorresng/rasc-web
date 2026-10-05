# Exemplos técnicos e Searching

Atualização: o exemplo de eventos duplicados abaixo foi rejeitado pelo usuário e
substituído por recuperação de input após falha de upload. A seleção e o ajuste
de espaçamento estão em [Refine impact](REFINE-IMPACT-2026-10-04.md).
Searching e o exemplo de produto/design continuam como descritos aqui.

Dois dos quatro ciclos da Hero foram substituídos, mantendo o follow-up geral e
o lembrete pessoal. Rasc continua sendo um scratchpad amplo; os novos pensamentos
mostram seu uso no trabalho sem transformá-lo numa ferramenta exclusiva para devs.

- Engenharia: `retry might be sending the same event twice check the handler before adding another guard`.
  Refine observado: `retry might be sending the same event twice. check the handler before adding another guard`.
  A hipótese e os termos técnicos permanecem; a mudança separa as duas ideias.
- Produto/design: `people may miss the required fields show whats missing before they submit`.
  Refine observado: `People may miss the required fields. Show what's missing before they submit.`
  Mantém a observação cautelosa e torna a ação legível.

Os mesmos pensamentos originais aparecem entre as notas inacabadas do Home da
demo. Capture/Refine/Keep e a busca por `draft` continuam o primeiro pensamento.
O contexto ChatGPT permanece estável e claro.

Foram executados quatro candidatos sintéticos, três vezes cada, com o provider
on-device e os guardrails de produção do Rasc. Engenharia selecionada teve três
saídas iguais; produto/design variou apenas a pontuação final. Duas alternativas
foram descartadas porque algumas saídas retiraram a incerteza ou a hipótese.
Evidência: [hero-technical-evidence-2026-10-04.json](hero-technical-evidence-2026-10-04.json).
O site reproduz fixtures fixas e não executa inferência pública.

Na janela de ⌘P, a Orb usa Searching, como
`Rasc/Features/Search/HistorySearchView.swift`: preset globe px20 de Lattice.swift,
54 pontos, speed 2.665 × multiplicador Rasc 0.68. Paleta, tamanho e profundidade
existentes preservados. Movimento acompanha a cena; pausa fora da viewport,
com documento oculto, pausa explícita ou término. Reduced motion usa o frame
nativo estático em t = 0.6 × 2.665 × 0.68. Home continua Composing.

Validação: os seis frames Searching foram comparados ponto a ponto com Swift
(erro máximo 3.55e-15, tolerância 1e-4). Harnesses React/Canvas passaram para
quatro ciclos e propostas observadas, Searching, visibilidade, pausa, reduced
motion e cleanup. Build e lint passaram. Inspeção visual da página continua
bloqueada pela política de acesso do navegador; estes testes não avaliam layout.

Nenhum arquivo do repositório nativo foi modificado nesta rodada. O binário Debug
existente foi usado apenas no corpus sintético isolado em diretório temporário.
DMG, distribuição e GitHub permanecem inalterados.
