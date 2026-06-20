const canvas = qs("#flowCanvas");
const ctx = canvas.getContext("2d");
const statusBox = qs("#statusBox");

const algorithms = [
  {
    id: "parimpar",
    title: "Par o impar",
    inputs: [{ id: "n", label: "Número entero", value: 12 }],
    pseudo: [
      "Proceso ParImpar",
      "  Leer n",
      "  residuo <- n MOD 2",
      "  Si residuo = 0 Entonces",
      "    Escribir \"El número es par\"",
      "  SiNo",
      "    Escribir \"El número es impar\"",
      "  FinSi",
      "FinProceso"
    ],
    js: "const residuo = n % 2;\nconst salida = residuo === 0 ? 'El número es par' : 'El número es impar';",
    run: values => {
      const n = Number(values.n);
      const residuo = n % 2;
      const isEven = residuo === 0;
      return [
        { line: 0, memory: {}, output: "" },
        { line: 1, memory: { n }, output: "" },
        { line: 2, memory: { n, residuo }, output: "" },
        { line: 3, memory: { n, residuo, condicion: `${residuo} = 0 → ${isEven ? "Verdadero" : "Falso"}` }, output: "" },
        { line: isEven ? 4 : 6, memory: { n, residuo }, output: isEven ? "El número es par" : "El número es impar" },
        { line: 8, memory: { n, residuo }, output: isEven ? "El número es par" : "El número es impar" }
      ];
    }
  },
  {
    id: "mayortres",
    title: "Mayor de tres números",
    inputs: [
      { id: "a", label: "A", value: 18 },
      { id: "b", label: "B", value: 27 },
      { id: "c", label: "C", value: 14 }
    ],
    pseudo: [
      "Proceso MayorDeTres",
      "  Leer a, b, c",
      "  mayor <- a",
      "  Si b > mayor Entonces",
      "    mayor <- b",
      "  FinSi",
      "  Si c > mayor Entonces",
      "    mayor <- c",
      "  FinSi",
      "  Escribir mayor",
      "FinProceso"
    ],
    js: "let mayor = a;\nif (b > mayor) mayor = b;\nif (c > mayor) mayor = c;\nconsole.log(mayor);",
    run: values => {
      const a = Number(values.a);
      const b = Number(values.b);
      const c = Number(values.c);
      let mayor = a;
      const steps = [
        { line: 0, memory: {}, output: "" },
        { line: 1, memory: { a, b, c }, output: "" },
        { line: 2, memory: { a, b, c, mayor }, output: "" },
        { line: 3, memory: { a, b, c, mayor, condicion: `${b} > ${mayor} → ${b > mayor ? "Verdadero" : "Falso"}` }, output: "" }
      ];

      if (b > mayor) {
        mayor = b;
        steps.push({ line: 4, memory: { a, b, c, mayor }, output: "" });
      }

      steps.push({ line: 6, memory: { a, b, c, mayor, condicion: `${c} > ${mayor} → ${c > mayor ? "Verdadero" : "Falso"}` }, output: "" });

      if (c > mayor) {
        mayor = c;
        steps.push({ line: 7, memory: { a, b, c, mayor }, output: "" });
      }

      steps.push({ line: 9, memory: { a, b, c, mayor }, output: `Mayor: ${mayor}` });
      steps.push({ line: 10, memory: { a, b, c, mayor }, output: `Mayor: ${mayor}` });
      return steps;
    }
  },
  {
    id: "invertir",
    title: "Invertir número",
    inputs: [{ id: "n", label: "Número entero positivo", value: 1234 }],
    pseudo: [
      "Proceso InvertirNumero",
      "  Leer n",
      "  invertido <- 0",
      "  Mientras n > 0 Hacer",
      "    digito <- n MOD 10",
      "    invertido <- invertido * 10 + digito",
      "    n <- trunc(n / 10)",
      "  FinMientras",
      "  Escribir invertido",
      "FinProceso"
    ],
    js: "let invertido = 0;\nwhile (n > 0) {\n  const digito = n % 10;\n  invertido = invertido * 10 + digito;\n  n = Math.trunc(n / 10);\n}",
    run: values => {
      let n = Math.abs(Math.trunc(Number(values.n)));
      let invertido = 0;
      const steps = [
        { line: 0, memory: {}, output: "" },
        { line: 1, memory: { n }, output: "" },
        { line: 2, memory: { n, invertido }, output: "" }
      ];

      let guard = 0;
      while (n > 0 && guard < 12) {
        steps.push({ line: 3, memory: { n, invertido, condicion: `${n} > 0 → Verdadero` }, output: "" });
        const digito = n % 10;
        steps.push({ line: 4, memory: { n, invertido, digito }, output: "" });
        invertido = invertido * 10 + digito;
        steps.push({ line: 5, memory: { n, invertido, digito }, output: "" });
        n = Math.trunc(n / 10);
        steps.push({ line: 6, memory: { n, invertido, digito }, output: "" });
        guard++;
      }

      steps.push({ line: 3, memory: { n, invertido, condicion: `${n} > 0 → Falso` }, output: "" });
      steps.push({ line: 8, memory: { n, invertido }, output: `Invertido: ${invertido}` });
      steps.push({ line: 9, memory: { n, invertido }, output: `Invertido: ${invertido}` });
      return steps;
    }
  },
  {
    id: "divisionrestas",
    title: "División por restas sucesivas",
    inputs: [
      { id: "dividendo", label: "Dividendo", value: 17 },
      { id: "divisor", label: "Divisor", value: 5 }
    ],
    pseudo: [
      "Proceso DivisionPorRestas",
      "  Leer dividendo, divisor",
      "  cociente <- 0",
      "  residuo <- dividendo",
      "  Mientras residuo >= divisor Hacer",
      "    residuo <- residuo - divisor",
      "    cociente <- cociente + 1",
      "  FinMientras",
      "  Escribir cociente, residuo",
      "FinProceso"
    ],
    js: "let cociente = 0;\nlet residuo = dividendo;\nwhile (residuo >= divisor) {\n  residuo -= divisor;\n  cociente++;\n}",
    run: values => {
      const dividendo = Math.abs(Math.trunc(Number(values.dividendo)));
      const divisor = Math.abs(Math.trunc(Number(values.divisor))) || 1;
      let cociente = 0;
      let residuo = dividendo;

      const steps = [
        { line: 0, memory: {}, output: "" },
        { line: 1, memory: { dividendo, divisor }, output: "" },
        { line: 2, memory: { dividendo, divisor, cociente }, output: "" },
        { line: 3, memory: { dividendo, divisor, cociente, residuo }, output: "" }
      ];

      let guard = 0;
      while (residuo >= divisor && guard < 40) {
        steps.push({ line: 4, memory: { dividendo, divisor, cociente, residuo, condicion: `${residuo} >= ${divisor} → Verdadero` }, output: "" });
        residuo -= divisor;
        steps.push({ line: 5, memory: { dividendo, divisor, cociente, residuo }, output: "" });
        cociente++;
        steps.push({ line: 6, memory: { dividendo, divisor, cociente, residuo }, output: "" });
        guard++;
      }

      steps.push({ line: 4, memory: { dividendo, divisor, cociente, residuo, condicion: `${residuo} >= ${divisor} → Falso` }, output: "" });
      steps.push({ line: 8, memory: { dividendo, divisor, cociente, residuo }, output: `Cociente: ${cociente}\nResiduo: ${residuo}` });
      steps.push({ line: 9, memory: { dividendo, divisor, cociente, residuo }, output: `Cociente: ${cociente}\nResiduo: ${residuo}` });
      return steps;
    }
  },
  {
    id: "palabras",
    title: "Comparar palabras por longitud",
    inputs: [
      { id: "palabra1", label: "Palabra 1", value: "algoritmo", type: "text" },
      { id: "palabra2", label: "Palabra 2", value: "codigo", type: "text" }
    ],
    pseudo: [
      "Proceso CompararPalabras",
      "  Leer palabra1, palabra2",
      "  largo1 <- Longitud(palabra1)",
      "  largo2 <- Longitud(palabra2)",
      "  Si largo1 > largo2 Entonces",
      "    Escribir palabra1",
      "  SiNo",
      "    Escribir palabra2",
      "  FinSi",
      "FinProceso"
    ],
    js: "const largo1 = palabra1.length;\nconst largo2 = palabra2.length;\nconst mayor = largo1 > largo2 ? palabra1 : palabra2;",
    run: values => {
      const palabra1 = String(values.palabra1);
      const palabra2 = String(values.palabra2);
      const largo1 = palabra1.length;
      const largo2 = palabra2.length;
      const firstWins = largo1 > largo2;
      const salida = firstWins ? palabra1 : palabra2;

      return [
        { line: 0, memory: {}, output: "" },
        { line: 1, memory: { palabra1, palabra2 }, output: "" },
        { line: 2, memory: { palabra1, palabra2, largo1 }, output: "" },
        { line: 3, memory: { palabra1, palabra2, largo1, largo2 }, output: "" },
        { line: 4, memory: { palabra1, palabra2, largo1, largo2, condicion: `${largo1} > ${largo2} → ${firstWins ? "Verdadero" : "Falso"}` }, output: "" },
        { line: firstWins ? 5 : 7, memory: { palabra1, palabra2, largo1, largo2 }, output: `Palabra mayor: ${salida}` },
        { line: 9, memory: { palabra1, palabra2, largo1, largo2 }, output: `Palabra mayor: ${salida}` }
      ];
    }
  }
];

let activeAlgorithm = algorithms[0];
let steps = [];
let activeStep = 0;

function getAlgorithmFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("algoritmo");
}

function init() {
  algorithms.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.title;
    qs("#algorithmSelect").appendChild(option);
  });

  qs("#algorithmSelect").addEventListener("change", () => {
    activeAlgorithm = algorithms.find(item => item.id === qs("#algorithmSelect").value) || algorithms[0];
    activeStep = 0;
    steps = [];
    renderInputs();
    renderStatic();
    updateUrl(activeAlgorithm.id);
  });

  qs("#runBtn").addEventListener("click", runAlgorithm);
  qs("#resetTraceBtn").addEventListener("click", resetTrace);
  qs("#prevBtn").addEventListener("click", () => setStep(activeStep - 1));
  qs("#nextBtn").addEventListener("click", () => setStep(activeStep + 1));
  qs("#copyJsBtn").addEventListener("click", copyJs);

  const requestedId = getAlgorithmFromUrl();
  const requestedAlgorithm = algorithms.find(item => item.id === requestedId);

  if (requestedAlgorithm) {
    activeAlgorithm = requestedAlgorithm;
    qs("#algorithmSelect").value = requestedAlgorithm.id;
  }

  renderInputs();
  runAlgorithm();
}

function updateUrl(id) {
  const url = new URL(window.location.href);
  url.searchParams.set("algoritmo", id);
  window.history.replaceState({}, "", url);
}

function renderInputs() {
  qs("#inputArea").innerHTML = activeAlgorithm.inputs.map(input => `
    <label>
      ${input.label}
      <input id="input-${input.id}" type="${input.type || "number"}" value="${input.value}">
    </label>
  `).join("");
}

function readValues() {
  const values = {};
  activeAlgorithm.inputs.forEach(input => {
    values[input.id] = qs(`#input-${input.id}`).value;
  });
  return values;
}

function resetTrace() {
  steps = activeAlgorithm.run(readValues());
  activeStep = 0;
  renderStep();
  renderStatus("warning", "Traza iniciada. Usa Siguiente para avanzar línea por línea.");
}

function renderStatus(type, message) {
  if (!statusBox) {
    return;
  }

  statusBox.className = `feedback ${type}`;
  statusBox.textContent = message;
}

function runAlgorithm() {
  steps = activeAlgorithm.run(readValues());
  activeStep = Math.max(0, steps.length - 1);
  renderStep();
  renderStatus("success", "Ejecución completa. La memoria y la salida muestran el resultado final.");
}

function setStep(index) {
  if (!steps.length) return;
  activeStep = Math.max(0, Math.min(steps.length - 1, index));
  renderStep();

  if (activeStep === steps.length - 1) {
    renderStatus("success", "Llegaste al resultado final de la traza.");
  } else {
    renderStatus("warning", `Paso ${activeStep + 1} de ${steps.length}.`);
  }
}

function renderStatic() {
  renderCode(qs("#codePanel"), activeAlgorithm.pseudo, -1);
  qs("#memoryGrid").innerHTML = "";
  qs("#outputConsole").textContent = "";
  renderStatus("warning", "Algoritmo cargado. Presiona Ejecutar completo para ver el resultado o Iniciar traza para recorrerlo paso a paso.");
  drawFlow();
}

function renderStep() {
  const step = steps[activeStep] || { line: -1, memory: {}, output: "" };
  renderCode(qs("#codePanel"), activeAlgorithm.pseudo, step.line);
  renderMemory(step.memory);
  qs("#outputConsole").textContent = step.output || "Sin salida todavía."; 
  drawFlow(step.line);
}

function renderMemory(memory) {
  const entries = Object.entries(memory);
  qs("#memoryGrid").innerHTML = entries.length
    ? entries.map(([key, value]) => `<div class="memory-item"><span>${key}</span><strong>${escapeHtml(value)}</strong></div>`).join("")
    : `<div class="feedback">Sin variables cargadas todavía.</div>`;
}

function drawFlow(activeLine = -1) {
  drawBase(ctx, canvas, "Diagrama de flujo");

  const nodes = [
    { line: 0, x: 410, y: 70, w: 160, h: 58, text: "Inicio", type: "process" },
    { line: 1, x: 380, y: 165, w: 220, h: 68, text: "Leer entradas", type: "io" },
    { line: 2, x: 365, y: 270, w: 250, h: 70, text: "Asignar variables", type: "process" },
    { line: 3, x: 385, y: 380, w: 210, h: 90, text: "Evaluar condición / ciclo", type: "decision" },
    { line: 8, x: 380, y: 520, w: 220, h: 68, text: "Escribir salida", type: "io" }
  ];

  nodes.forEach((node, index) => {
    const fill = node.line === activeLine ? "#fed7aa" : undefined;
    drawNode(ctx, node.x, node.y, node.w, node.h, node.text, node.type);
    if (fill) {
      ctx.save();
      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 4;
      if (node.type === "decision") {
        ctx.beginPath();
        ctx.moveTo(node.x + node.w / 2, node.y - 5);
        ctx.lineTo(node.x + node.w + 5, node.y + node.h / 2);
        ctx.lineTo(node.x + node.w / 2, node.y + node.h + 5);
        ctx.lineTo(node.x - 5, node.y + node.h / 2);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.strokeRect(node.x - 5, node.y - 5, node.w + 10, node.h + 10);
      }
      ctx.restore();
    }

    if (index < nodes.length - 1) {
      const current = node;
      const next = nodes[index + 1];
      arrow(ctx, current.x + current.w / 2, current.y + current.h, next.x + next.w / 2, next.y);
    }
  });

  ctx.fillStyle = "#77685e";
  ctx.font = "13px Segoe UI";
  ctx.fillText("El diagrama resume el flujo general; la traza del pseudocódigo muestra el detalle línea por línea.", 26, 610);
}

async function copyJs() {
  await navigator.clipboard.writeText(activeAlgorithm.js);
  qs("#copyJsBtn").textContent = "Copiado";
  setTimeout(() => qs("#copyJsBtn").textContent = "Copiar JS equivalente", 1200);
}

init();
