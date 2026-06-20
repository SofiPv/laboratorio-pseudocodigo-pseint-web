const questions = [
  {
    prompt: "En pseudocódigo, ¿para qué se usa MOD?",
    options: ["Para elevar un número", "Para obtener el residuo de una división", "Para leer texto", "Para cerrar un ciclo"],
    correct: "Para obtener el residuo de una división",
    explanation: "MOD devuelve el residuo; por eso sirve para saber si un número es par o impar."
  },
  {
    prompt: "Si n=7, ¿qué salida produce la condición n MOD 2 = 0?",
    options: ["Verdadero", "Falso", "Error", "No definido"],
    correct: "Falso",
    explanation: "7 MOD 2 es 1, por lo tanto no es igual a 0."
  },
  {
    prompt: "¿Qué estructura se recomienda cuando se conoce de antemano cuántas veces repetir?",
    options: ["Para", "SiNo", "Segun", "Leer"],
    correct: "Para",
    explanation: "Para es ideal cuando el número de iteraciones está controlado por un contador."
  },
  {
    prompt: "¿Qué diferencia clave tiene Repetir / Hasta Que?",
    options: ["Nunca ejecuta el bloque", "Ejecuta al menos una vez", "No tiene condición", "Sólo sirve con textos"],
    correct: "Ejecuta al menos una vez",
    explanation: "La condición se evalúa después de ejecutar el bloque."
  },
  {
    prompt: "En división por restas sucesivas, ¿qué variable suele contar las restas realizadas?",
    options: ["residuo", "cociente", "divisor", "entrada"],
    correct: "cociente",
    explanation: "Cada resta completa aumenta el cociente en 1."
  },
  {
    prompt: "Para invertir un número, ¿qué operación permite obtener el último dígito?",
    options: ["n MOD 10", "n * 10", "n + 10", "n MOD 2"],
    correct: "n MOD 10",
    explanation: "El residuo al dividir entre 10 corresponde al último dígito."
  }
];

function renderQuiz() {
  qs("#quizArea").innerHTML = questions.map((question, index) => `
    <article class="quiz-question">
      <h3>Pregunta ${index + 1}</h3>
      <p>${question.prompt}</p>
      <div class="quiz-options">
        ${question.options.map(option => `
          <label>
            <input type="radio" name="q-${index}" value="${escapeHtml(option)}">
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");

  qs("#resultBox").className = "feedback";
  qs("#resultBox").textContent = "Responde todas las preguntas y presiona Calificar.";
}

function gradeQuiz() {
  let score = 0;
  const feedback = [];

  questions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="q-${index}"]:checked`);
    const answer = selected ? selected.value : "";
    const ok = answer === question.correct;

    if (ok) score++;

    feedback.push(`${ok ? "✅" : "❌"} Pregunta ${index + 1}: ${ok ? "correcta" : `respuesta correcta: ${question.correct}`}. ${question.explanation}`);
  });

  const percent = Math.round((score / questions.length) * 100);
  qs("#resultBox").className = percent >= 70 ? "feedback success" : "feedback warning";
  qs("#resultBox").innerHTML = `Puntaje: <strong>${score}/${questions.length}</strong> (${percent}%).<br><br>${feedback.join("<br>")}`;
}

qs("#gradeBtn").addEventListener("click", gradeQuiz);
qs("#resetBtn").addEventListener("click", renderQuiz);
renderQuiz();
