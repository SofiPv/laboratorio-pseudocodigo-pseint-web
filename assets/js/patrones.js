let currentPattern = "";

const configs = {
  triangulo: {
    explanation: "Cada fila imprime tantos asteriscos como indica el número de fila.",
    pseudo: size => [
      "Proceso TrianguloCreciente",
      `  Para fila <- 1 Hasta ${size} Hacer`,
      "    linea <- \"\"",
      "    Para columna <- 1 Hasta fila Hacer",
      "      linea <- linea + \"*\"",
      "    FinPara",
      "    Escribir linea",
      "  FinPara",
      "FinProceso"
    ],
    build: size => {
      const rows = [];
      for (let fila = 1; fila <= size; fila++) {
        rows.push("*".repeat(fila));
      }
      return rows;
    }
  },
  invertido: {
    explanation: "Cada fila imprime una cantidad decreciente de asteriscos.",
    pseudo: size => [
      "Proceso TrianguloInvertido",
      `  Para fila <- ${size} Hasta 1 Con Paso -1 Hacer`,
      "    linea <- \"\"",
      "    Para columna <- 1 Hasta fila Hacer",
      "      linea <- linea + \"*\"",
      "    FinPara",
      "    Escribir linea",
      "  FinPara",
      "FinProceso"
    ],
    build: size => {
      const rows = [];
      for (let fila = size; fila >= 1; fila--) {
        rows.push("*".repeat(fila));
      }
      return rows;
    }
  },
  cuadrado: {
    explanation: "Usa dos ciclos: uno para filas y otro para columnas.",
    pseudo: size => [
      "Proceso CuadradoLleno",
      `  Para fila <- 1 Hasta ${size} Hacer`,
      "    linea <- \"\"",
      `    Para columna <- 1 Hasta ${size} Hacer`,
      "      linea <- linea + \"*\"",
      "    FinPara",
      "    Escribir linea",
      "  FinPara",
      "FinProceso"
    ],
    build: size => Array.from({ length: size }, () => "*".repeat(size))
  },
  hueco: {
    explanation: "Imprime asterisco sólo si la posición está en el borde; si no, imprime espacio.",
    pseudo: size => [
      "Proceso CuadradoHueco",
      `  Para fila <- 1 Hasta ${size} Hacer`,
      "    linea <- \"\"",
      `    Para columna <- 1 Hasta ${size} Hacer`,
      "      Si fila = 1 O fila = n O columna = 1 O columna = n Entonces",
      "        linea <- linea + \"*\"",
      "      SiNo",
      "        linea <- linea + \" \"",
      "      FinSi",
      "    FinPara",
      "    Escribir linea",
      "  FinPara",
      "FinProceso"
    ],
    build: size => {
      const rows = [];
      for (let fila = 1; fila <= size; fila++) {
        let line = "";
        for (let col = 1; col <= size; col++) {
          line += fila === 1 || fila === size || col === 1 || col === size ? "*" : " ";
        }
        rows.push(line);
      }
      return rows;
    }
  },
  piramide: {
    explanation: "Combina espacios y asteriscos para centrar la figura.",
    pseudo: size => [
      "Proceso Piramide",
      `  Para fila <- 1 Hasta ${size} Hacer`,
      "    espacios <- n - fila",
      "    asteriscos <- 2 * fila - 1",
      "    Escribir espacios + asteriscos",
      "  FinPara",
      "FinProceso"
    ],
    build: size => {
      const rows = [];
      for (let fila = 1; fila <= size; fila++) {
        rows.push(" ".repeat(size - fila) + "*".repeat(2 * fila - 1));
      }
      return rows;
    }
  }
};

function loadPatternFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const patron = params.get("patron");

  if (patron && configs[patron]) {
    qs("#patternSelect").value = patron;
  }
}

function generate() {
  const type = qs("#patternSelect").value;
  const size = Math.max(2, Math.min(20, Math.trunc(readNumber("#sizeInput", 6))));
  qs("#sizeInput").value = size;

  const config = configs[type];
  const rows = config.build(size);
  currentPattern = rows.join("\n");

  qs("#patternOutput").textContent = currentPattern;
  qs("#explanationBox").className = "feedback success";
  qs("#explanationBox").textContent = config.explanation;
  renderCode(qs("#codePanel"), config.pseudo(size));
  qs("#patternTable").innerHTML = tableFromRows(
    ["Fila", "Contenido", "Longitud"],
    rows.map((row, index) => [index + 1, escapeHtml(row).replaceAll(" ", "·"), row.length])
  );
}

async function copyPattern() {
  await navigator.clipboard.writeText(currentPattern);
  qs("#copyBtn").textContent = "Copiado";
  setTimeout(() => qs("#copyBtn").textContent = "Copiar patrón", 1200);
}

loadPatternFromUrl();

qs("#drawBtn").addEventListener("click", generate);
qs("#patternSelect").addEventListener("change", generate);
qs("#copyBtn").addEventListener("click", copyPattern);
generate();
