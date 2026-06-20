let tableText = "";

function simulate() {
  const type = qs("#loopType").value;
  const start = readNumber("#startInput", 1);
  const end = readNumber("#endInput", 10);
  let step = readNumber("#stepInput", 1);
  const number = readNumber("#tableInput", 7);

  if (step === 0) step = 1;

  const rows = [];
  const output = [];
  let accumulator = 0;

  if (type === "para") {
    for (let i = start, iteration = 1; step > 0 ? i <= end : i >= end; i += step, iteration++) {
      const product = i * number;
      accumulator += product;
      rows.push([iteration, i, `${number} x ${i}`, product, accumulator, "Dentro del rango"]);
      output.push(`${number} x ${i} = ${product}`);
      if (iteration > 100) break;
    }
  } else if (type === "mientras") {
    let i = start;
    let iteration = 1;
    while ((step > 0 ? i <= end : i >= end) && iteration <= 100) {
      const product = i * number;
      accumulator += product;
      rows.push([iteration, i, `${number} x ${i}`, product, accumulator, "Condición verdadera"]);
      output.push(`${number} x ${i} = ${product}`);
      i += step;
      iteration++;
    }
  } else {
    let i = start;
    let iteration = 1;
    do {
      const product = i * number;
      accumulator += product;
      rows.push([iteration, i, `${number} x ${i}`, product, accumulator, "Ejecuta al menos una vez"]);
      output.push(`${number} x ${i} = ${product}`);
      i += step;
      iteration++;
    } while ((step > 0 ? i <= end : i >= end) && iteration <= 100);
  }

  renderCode(qs("#codePanel"), pseudoFor(type, start, end, step, number));
  qs("#loopTable").innerHTML = tableFromRows(["Iteración", "i", "Operación", "Resultado", "Acumulador", "Estado"], rows);
  qs("#outputBox").textContent = output.join("\n");
  qs("#iterationsStat").textContent = rows.length;
  qs("#accumulatorStat").textContent = accumulator;
  qs("#typeStat").textContent = type[0].toUpperCase() + type.slice(1);

  tableText = [
    "Iteración\ti\tOperación\tResultado\tAcumulador\tEstado",
    ...rows.map(row => row.join("\t"))
  ].join("\n");
}

function pseudoFor(type, start, end, step, number) {
  if (type === "para") {
    return [
      "Proceso TablaConPara",
      `  Para i <- ${start} Hasta ${end} Con Paso ${step} Hacer`,
      `    resultado <- ${number} * i`,
      "    acumulador <- acumulador + resultado",
      "    Escribir resultado",
      "  FinPara",
      "FinProceso"
    ];
  }

  if (type === "mientras") {
    return [
      "Proceso TablaConMientras",
      `  i <- ${start}`,
      `  Mientras i <= ${end} Hacer`,
      `    resultado <- ${number} * i`,
      "    acumulador <- acumulador + resultado",
      "    Escribir resultado",
      `    i <- i + ${step}`,
      "  FinMientras",
      "FinProceso"
    ];
  }

  return [
    "Proceso TablaConRepetir",
    `  i <- ${start}`,
    "  Repetir",
    `    resultado <- ${number} * i`,
    "    acumulador <- acumulador + resultado",
    "    Escribir resultado",
    `    i <- i + ${step}`,
    `  Hasta Que i > ${end}`,
    "FinProceso"
  ];
}

async function copyTable() {
  await navigator.clipboard.writeText(tableText);
  qs("#copyBtn").textContent = "Copiado";
  setTimeout(() => qs("#copyBtn").textContent = "Copiar tabla", 1200);
}

qs("#simulateBtn").addEventListener("click", simulate);
qs("#copyBtn").addEventListener("click", copyTable);
qs("#loopType").addEventListener("change", simulate);

simulate();
