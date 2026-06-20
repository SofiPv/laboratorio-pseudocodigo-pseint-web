function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function format(value, digits = 4) {
  if (!Number.isFinite(value)) return "No definido";
  const rounded = Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
  if (Object.is(rounded, -0)) return "0";
  return String(rounded);
}

function readNumber(selector, fallback = 0) {
  const value = Number(qs(selector).value);
  return Number.isFinite(value) ? value : fallback;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderCode(container, lines, activeIndex = -1) {
  container.innerHTML = lines.map((line, index) => `
    <div class="code-line ${index === activeIndex ? "active" : ""}">
      <span>${index + 1}</span>
      <span>${escapeHtml(line)}</span>
    </div>
  `).join("");
}

function drawBase(ctx, canvas, title) {
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#f3e3d4";
  ctx.lineWidth = 1;

  for (let x = 50; x <= width - 50; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 50);
    ctx.lineTo(x, height - 50);
    ctx.stroke();
  }

  for (let y = 50; y <= height - 50; y += 50) {
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(width - 50, y);
    ctx.stroke();
  }

  ctx.fillStyle = "#23170f";
  ctx.font = "bold 18px Segoe UI";
  ctx.fillText(title, 22, 34);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke = "#ead7c5") {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function arrow(ctx, x1, y1, x2, y2, color = "#92400e") {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 12 * Math.cos(angle - Math.PI / 6), y2 - 12 * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - 12 * Math.cos(angle + Math.PI / 6), y2 - 12 * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawNode(ctx, x, y, w, h, text, type = "process") {
  const fill = type === "decision" ? "#fef3c7" : type === "io" ? "#dcfce7" : "#fff7ed";
  const stroke = type === "decision" ? "#f97316" : type === "io" ? "#15803d" : "#d97706";

  if (type === "decision") {
    ctx.save();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w, y + h / 2);
    ctx.lineTo(x + w / 2, y + h);
    ctx.lineTo(x, y + h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  } else {
    roundRect(ctx, x, y, w, h, 16, fill, stroke);
  }

  ctx.save();
  ctx.fillStyle = "#23170f";
  ctx.font = "bold 13px Segoe UI";
  wrapText(ctx, text, x + 14, y + h / 2 - 8, w - 28, 17);
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = test;
    }
  }

  if (line) ctx.fillText(line, x, currentY);
}

function tableFromRows(headers, rows) {
  return `
    <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
    <tbody>
      ${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}
    </tbody>
  `;
}
