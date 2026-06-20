const conditions = {
  mayor: {
    title: "A > B",
    pseudo: [
      "Si A > B Entonces",
      "  Escribir \"A es mayor que B\"",
      "SiNo",
      "  Escribir \"A no es mayor que B\"",
      "FinSi"
    ],
    eval: ({ a, b }) => ({
      rows: [["A > B", `${a} > ${b}`, a > b]],
      result: a > b,
      trueText: "A es mayor que B",
      falseText: "A no es mayor que B"
    })
  },
  rango: {
    title: "A >= B Y A <= C",
    pseudo: [
      "Si A >= B Y A <= C Entonces",
      "  Escribir \"A está dentro del rango\"",
      "SiNo",
      "  Escribir \"A está fuera del rango\"",
      "FinSi"
    ],
    eval: ({ a, b, c }) => {
      const left = a >= b;
      const right = a <= c;
      return {
        rows: [
          ["A >= B", `${a} >= ${b}`, left],
          ["A <= C", `${a} <= ${c}`, right],
          ["Y", `${left} Y ${right}`, left && right]
        ],
        result: left && right,
        trueText: "A está dentro del rango",
        falseText: "A está fuera del rango"
      };
    }
  },
  parpositivo: {
    title: "A MOD 2 = 0 Y A > 0",
    pseudo: [
      "Si A MOD 2 = 0 Y A > 0 Entonces",
      "  Escribir \"A es par positivo\"",
      "SiNo",
      "  Escribir \"A no cumple\"",
      "FinSi"
    ],
    eval: ({ a }) => {
      const even = a % 2 === 0;
      const positive = a > 0;
      return {
        rows: [
          ["A MOD 2 = 0", `${a} MOD 2 = ${a % 2}`, even],
          ["A > 0", `${a} > 0`, positive],
          ["Y", `${even} Y ${positive}`, even && positive]
        ],
        result: even && positive,
        trueText: "A es par positivo",
        falseText: "A no cumple"
      };
    }
  },
  fuera: {
    title: "A < B O A > C",
    pseudo: [
      "Si A < B O A > C Entonces",
      "  Escribir \"A está fuera\"",
      "SiNo",
      "  Escribir \"A está dentro\"",
      "FinSi"
    ],
    eval: ({ a, b, c }) => {
      const less = a < b;
      const greater = a > c;
      return {
        rows: [
          ["A < B", `${a} < ${b}`, less],
          ["A > C", `${a} > ${c}`, greater],
          ["O", `${less} O ${greater}`, less || greater]
        ],
        result: less || greater,
        trueText: "A está fuera",
        falseText: "A está dentro"
      };
    }
  },
  negacion: {
    title: "NO(A = B)",
    pseudo: [
      "Si NO(A = B) Entonces",
      "  Escribir \"A y B son diferentes\"",
      "SiNo",
      "  Escribir \"A y B son iguales\"",
      "FinSi"
    ],
    eval: ({ a, b }) => {
      const equal = a === b;
      return {
        rows: [
          ["A = B", `${a} = ${b}`, equal],
          ["NO(A = B)", `NO(${equal})`, !equal]
        ],
        result: !equal,
        trueText: "A y B son diferentes",
        falseText: "A y B son iguales"
      };
    }
  }
};

function evaluate() {
  const values = {
    a: readNumber("#aInput", 0),
    b: readNumber("#bInput", 0),
    c: readNumber("#cInput", 0)
  };

  const item = conditions[qs("#conditionSelect").value];
  const result = item.eval(values);

  renderCode(qs("#codePanel"), item.pseudo, result.result ? 1 : 3);
  qs("#resultBox").className = result.result ? "feedback success" : "feedback error";
  qs("#resultBox").innerHTML = `<strong>${item.title}</strong><br>Resultado: ${result.result ? "Verdadero" : "Falso"}`;
  qs("#outputBox").textContent = result.result ? result.trueText : result.falseText;

  qs("#evaluationTable").innerHTML = tableFromRows(
    ["Paso", "Evaluación", "Resultado"],
    result.rows.map(row => [row[0], row[1], row[2] ? "Verdadero" : "Falso"])
  );
}

qs("#evalBtn").addEventListener("click", evaluate);
qs("#conditionSelect").addEventListener("change", evaluate);
evaluate();
