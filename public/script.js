//B.1.DEFINIÇÃO DOS DADOS (JSON)

const catalogo = [
  {
    id: 1,
    titulo: "The Flash",
    tipo: "serie",
    ano: 2014,
    generos: ["ficção científica", "herói", "ação"],
    nota: 9.4,
    assistido: true
  },
  {
    id: 2,
    titulo: "Super Natural",
    tipo: "serie",
    ano: 2005,
    generos: ["drama", "fantasia", "suspense"],
    nota: 9.6,
    assistido: true
  },
  {
    id: 3,
    titulo: "Vingadores: Ultimato",
    tipo: "filme",
    ano: 2019,
    generos: ["super-herói,", "ação", "ficção científica"],
    nota: 9.8,
    assistido: true
  },
  {
    id: 4,
    titulo: "Vingadores: Guerra Infinita",
    tipo: "filme",
    ano: 2018,
    generos: ["super-herói,", "ação", "ficção científica"],
    nota: 9.7,
    assistido: true
  },
  {
    id: 5,
    titulo: "Homem-Aranha: Sem Volta para Casa",
    tipo: "filme",
    ano: 2021,
    generos: ["super-herói,", "ação", "ficção científica"],
    nota: 9.8,
    assistido: true
  },
  {
    id: 6,
    titulo: "Homem-Aranha: Longe de Casa (Spider-Man: Far From Home)",
    tipo: "filme",
    ano: 2019,
    generos: ["super-herói,", "ação", "ficção científica"],
    nota: 9.7,
    assistido: true
  },
];

//B.2. ACESSO E LEITURA DOS DADOS

console.log("CATÁLOGO COMPLETO", "font-size:14px; font-weight:bold; color:#e63946");
console.log(catalogo);

console.log("\nACESSO A PROPRIEDADES ESPECÍFICAS", "font-size:14px; font-weight:bold; color:#f4a261");

//Titulo do primeiro item
console.log("Título do primeiro item:", catalogo[0].titulo);

//Ano do ultimo item
console.log("Ano do último item:", catalogo[catalogo.length - 1].ano);

//Segundo genero do terceiro item
const terceiroItem = catalogo[2];
if (terceiroItem.generos.length >= 2) {
  console.log("Segundo gênero do terceiro item:", terceiroItem.generos[1]);
} else {
  console.log(`"${terceiroItem.titulo}" tem apenas ${terceiroItem.generos.length} gênero(s) — segundo gênero não disponível.`);
}

//B.3. ITERAÇÕES COM ITERATORS

console.log("\nITERAÇÕES COM ITERATORS", "font-size:14px; font-weight:bold; color:#2a9d8f");

//A) forEach — Listagem de títulos

console.log("\nA) forEach: Todos os títulos");
catalogo.forEach(item => {
  console.log(`- [${item.tipo}] ${item.titulo} (${item.ano})`);
});

//B) map — Títulos em caixa alta
console.log("\nB) map: Títulos em CAIXA ALTA");
const titulosEmCaixaAlta = catalogo.map(item => item.titulo.toUpperCase());
console.log(titulosEmCaixaAlta);

//C) filter — Não assistidos

console.log("\nC) filter: Não assistidos");
const naoAssistidos = catalogo.filter(item => item.assistido === false);
console.log(`Total de itens não assistidos: ${naoAssistidos.length}`);
naoAssistidos.forEach(item => console.log(`  • ${item.titulo}`));

//D)find — Primeiro item com nota >= 9

console.log("\nD) find: Primeiro item com nota >= 9");
const destaqueNota = catalogo.find(item => item.nota >= 9);
if (destaqueNota) {
  console.log(`Encontrado: "${destaqueNota.titulo}" com nota ${destaqueNota.nota}`);
} else {
  console.log("Nenhum item com nota >= 9 foi encontrado.");
}

//E) reduce — Médias de notas
console.log("\nE) reduce: Médias de notas");

const somaTotal = catalogo.reduce((acc, item) => acc + item.nota, 0);
const mediaGeral = somaTotal / catalogo.length;

const assistidos = catalogo.filter(item => item.assistido === true);
const somaAssistidos = assistidos.reduce((acc, item) => acc + item.nota, 0);
const mediaAssistidos = somaAssistidos / assistidos.length;

console.log(`Média geral de notas:        ${mediaGeral.toFixed(2)}`);
console.log(`Média das notas (assistidos): ${mediaAssistidos.toFixed(2)}`);

//F) some e every — Checagens
console.log("\nF) some / every: Checagens");

const temAntigosome = catalogo.some(item => item.ano < 2000);
console.log(`Existe algum item com ano < 2000? ${temAntigosome ? "✅ Sim" : "❌ Não"}`);

const todosTemGenero = catalogo.every(item => item.generos.length >= 1);
console.log(`Todos os itens têm pelo menos 1 gênero? ${todosTemGenero ? "✅ Sim" : "❌ Não"}`);

//B.4. SAÍDA NA TELA (DOM)

const output = document.getElementById("output");

//Estatísticas gerais
const totalFilmes = catalogo.filter(i => i.tipo === "filme").length;
const totalSeries = catalogo.filter(i => i.tipo === "serie").length;

//Top 3 notas
const top3 = [...catalogo]
  .sort((a, b) => b.nota - a.nota)
  .slice(0, 3);

const medalhas = ["gold", "silver", "bronze"];
const emojis   = ["🥇", "🥈", "🥉"];

const rankingHTML = top3.map((item, i) => `
  <div class="ranking-item">
    <div class="rank-num ${medalhas[i]}">${emojis[i]}</div>
    <div style="flex:1">
      <div class="rank-title">${item.titulo}</div>
      <div class="rank-tipo">${item.tipo} · ${item.ano}</div>
      <div class="nota-bar">
        <div class="nota-fill" style="width:${item.nota * 10}%"></div>
      </div>
    </div>
    <div class="rank-nota">${item.nota}</div>
  </div>
`).join("");

output.innerHTML = `
  <div class="card" style="animation-delay:0.1s">
    <h2>📊 Resumo do Catálogo</h2>
    <div class="stats-grid">
      <div class="stat">
        <div class="value">${catalogo.length}</div>
        <div class="label">Total de itens</div>
      </div>
      <div class="stat">
        <div class="value">${totalFilmes}</div>
        <div class="label">Filmes</div>
      </div>
      <div class="stat">
        <div class="value">${totalSeries}</div>
        <div class="label">Séries</div>
      </div>
      <div class="stat">
        <div class="value">${naoAssistidos.length}</div>
        <div class="label">Não assistidos</div>
      </div>
      <div class="stat">
        <div class="value">${mediaGeral.toFixed(2)}</div>
        <div class="label">Média geral</div>
      </div>
    </div>
  </div>

  <div class="card" style="animation-delay:0.25s">
    <h2>🏆 Top 3 — Maiores Notas</h2>
    ${rankingHTML}
  </div>
`;