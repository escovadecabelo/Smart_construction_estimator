Atue como um Estimador Sênior de Obras Comerciais, Especialista em Orçamentos e Desenvolvedor Full-Stack (Node.js & Design de Interfaces). Vou fornecer em anexo um documento PDF contendo blueprints de uma obra comercial (plantas baixas, elevações e tabelas de acabamento/Finish Schedule).

Sua tarefa é analisar rigorosamente este blueprint, extrair todas as informações relevantes, calcular os custos baseados em estimativas padrão de mercado (ou usar variáveis que eu definir) e aplicar uma margem de lucro de [INSERIR SUA MARGEM DE LUCRO, ex: 30%].

A saída deve ser EXCLUSIVAMENTE em código Node.js / JavaScript. O código deve conter os dados estruturados de forma modular e incluir um gerador de template em HTML/CSS para apresentar as propostas com um **layout estritamente moderno, elegante e de alto padrão corporativo**.

DIRETRIZES DE EXTRAÇÃO E CÁLCULO:
1. Analise o "Finish Schedule", Legendas das Plantas e Elevações para identificar áreas totais (sq.ft), tipos de piso, banheiros, divisórias e tintas.
2. Se uma medida exata não estiver explícita, faça uma estimativa conservadora baseada na escala.
3. Formate a saída como um módulo Node.js contendo os objetos de dados e a função geradora do layout.

--- MÓDULO 1: orcamentoLimpeza (POST-CONSTRUCTION CLEANING) ---
Extraia e inclua no objeto JS:
- `totalSqFt`, `restrooms`, `flooringTypes`.
- `phases`: Custo + lucro para `phase1_RoughClean`, `phase2_ProgressClean`, `phase3_FinalClean` (Turnover Ready) e `phase4_PuffClean`.
- `bundleOption`: Valor com desconto para o pacote completo.
- `alternates`: Opções como Power Washing.

--- MÓDULO 2: orcamentoDemolicao (SELECTIVE INTERIOR DEMOLITION) ---
Extraia e inclua no objeto JS:
- `scope`: Array detalhando o escopo (remoção de divisórias, pisos, forros).
- `paymentTerms`: Mobilization (30%), progress (30%) e final (40%).
- `totalBid` e `alternates` (ex: corte de concreto por linear foot).

--- MÓDULO 3: orcamentoPintura (PAINTING AND DRYWALL FINISHING) ---
Extraia e inclua no objeto JS:
- `paintCodes` e um `breakdown` detalhado (já com margem de lucro) para: `standardLevel4Finish`, `interiorPainting`, `exposedStructure`, `exteriorStorefront` e `accessories`.
- `totalBaseBid`: Somatório final.

--- MÓDULO 4: GERADOR DE LAYOUT MODERNO (HTML/CSS) ---
Crie uma função `gerarPropostaHTML(dados)` que utilize Template Literals (` `) para injetar os 3 objetos acima em um código HTML completo.
- O design DEVE ser um **layout moderno, clean e profissional** (utilize CSS moderno com Flexbox/Grid, sombras suaves, tipografia sem serifa elegante como Inter ou Roboto, e uma paleta de cores corporativa baseada em tons de azul, cinza e branco).
- Crie uma quebra visual clara (Page Breaks) para separar o layout em 3 "páginas" distintas (Limpeza, Demolição e Pintura).
- Destaque os "Totais de Investimento" em caixas modernas ou cards.
- Inclua uma área elegante no final de cada seção para "Assinatura do Cliente" e "Data".

REQUISITO FINAL DE FORMATAÇÃO:
Exporte esses dados no padrão CommonJS (`module.exports`) ou ES Modules (`export`). Comente o código em [INSERIR IDIOMA DOS COMENTÁRIOS, ex: Português] explicando as extrações. Não retorne nenhum texto livre fora do bloco de código, a resposta deve ser 100% código executável.