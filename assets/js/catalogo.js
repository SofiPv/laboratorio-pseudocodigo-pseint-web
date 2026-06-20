
const algorithms = [
  {
    id: "parimpar",
    title: "Par o impar",
    category: "condicionales",
    level: "Inicial",
    structure: "Si / SiNo",
    description: "Evalúa un número entero usando MOD 2.",
    runnable: true
  },
  {
    id: "mayortres",
    title: "Mayor de tres números",
    category: "condicionales",
    level: "Inicial",
    structure: "Condicional anidado",
    description: "Compara tres valores y determina el mayor.",
    runnable: true
  },
  {
    id: "clasificador-signo",
    title: "Clasificador de signo",
    category: "condicionales",
    level: "Inicial",
    structure: "Si múltiple",
    description: "Clasifica un valor como positivo, negativo o cero.",
    runnable: false,
    targetPage: "condicionales.html"
  },
  {
    id: "divisionrestas",
    title: "División por restas sucesivas",
    category: "ciclos",
    level: "Intermedio",
    structure: "Mientras",
    description: "Obtiene cociente y residuo sin usar el operador de división.",
    runnable: true
  },
  {
    id: "tabla-multiplicar",
    title: "Tabla de multiplicar",
    category: "ciclos",
    level: "Inicial",
    structure: "Para",
    description: "Genera productos desde 1 hasta N.",
    runnable: false,
    targetPage: "ciclos.html"
  },
  {
    id: "invertir",
    title: "Invertir número",
    category: "numeros",
    level: "Intermedio",
    structure: "Mientras + MOD",
    description: "Descompone un entero en dígitos y construye su inverso.",
    runnable: true
  },
  {
    id: "divisores",
    title: "Divisores de un número",
    category: "numeros",
    level: "Intermedio",
    structure: "Para + MOD",
    description: "Recorre candidatos y muestra divisores exactos.",
    runnable: false,
    targetPage: "ciclos.html"
  },
  {
    id: "reciprocos",
    title: "Recíprocos",
    category: "numeros",
    level: "Inicial",
    structure: "Para",
    description: "Muestra 1/n para una serie de valores.",
    runnable: false,
    targetPage: "ciclos.html"
  },
  {
    id: "palabras",
    title: "Comparar palabras",
    category: "cadenas",
    level: "Inicial",
    structure: "Longitud",
    description: "Compara dos cadenas usando su cantidad de caracteres.",
    runnable: true
  },
  {
    id: "fechas",
    title: "Diferencia de fechas",
    category: "numeros",
    level: "Intermedio",
    structure: "Fórmula simplificada",
    description: "Transforma fechas a días aproximados para comparar.",
    runnable: false,
    targetPage: "visualizador.html?algoritmo=mayortres"
  },
  {
    id: "triangulo",
    title: "Triángulo de asteriscos",
    category: "patrones",
    level: "Inicial",
    structure: "Para anidado",
    description: "Imprime filas crecientes de símbolos.",
    runnable: false,
    targetPage: "patrones.html?patron=triangulo"
  },
  {
    id: "hueco",
    title: "Cuadrado hueco",
    category: "patrones",
    level: "Intermedio",
    structure: "Para + condición",
    description: "Dibuja borde usando asteriscos y espacios internos.",
    runnable: false,
    targetPage: "patrones.html?patron=hueco"
  }
];

function targetFor(item) {
  if (item.runnable) {
    return `visualizador.html?algoritmo=${encodeURIComponent(item.id)}`;
  }

  return item.targetPage || "visualizador.html";
}

function render(filter = "todos") {
  const visible = filter === "todos" ? algorithms : algorithms.filter(item => item.category === filter);

  qs("#algorithmGrid").innerHTML = visible.map(item => `
    <a class="algorithm-card" href="${targetFor(item)}" aria-label="Abrir ${escapeHtml(item.title)}">
      <p class="section-label">${item.category}</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="pill-list" style="margin-top:12px">
        <span class="pill">${item.level}</span>
        <span class="pill">${item.structure}</span>
      </div>
      <span class="open-hint">${item.runnable ? "Abrir en visualizador →" : "Abrir módulo →"}</span>
    </a>
  `).join("");
}

qsa("[data-filter]").forEach(button => {
  button.addEventListener("click", () => render(button.dataset.filter));
});

render();
