
/* ==========================================
   ELEMENTAR — SIMULADOR DE REAÇÕES
   Cenas visuais em SVG
========================================== */

const reactions = {
  water: {
    category: "EXPERIMENTO DE PRESSÃO",
    title: "Vela e água",
    equation: "Variação da pressão do ar",
    explanation:
      "A vela aquece o ar dentro do copo. Quando a chama se apaga, " +
      "o ar esfria e a pressão interna diminui. A pressão atmosférica " +
      "externa empurra a água para dentro do copo. O fenômeno envolve " +
      "mudanças de temperatura, pressão e gases.",
    steps: [
      "A vela está acesa em um prato com água.",
      "O copo é colocado sobre a vela e a chama se apaga.",
      "A água sobe dentro do copo devido à diferença de pressão."
    ]
  },

  vinegar: {
    category: "FORMAÇÃO DE GÁS",
    title: "Vinagre + bicarbonato",
    equation: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂",
    explanation:
      "O ácido acético do vinagre reage com o bicarbonato. " +
      "A reação produz gás carbônico, representado pelas bolhas, " +
      "além de água e acetato de sódio.",
    steps: [
      "Os copos contêm vinagre e bicarbonato.",
      "Os copos se inclinam e os reagentes são misturados.",
      "A mistura libera gás carbônico, formando bolhas."
    ]
  },

  rust: {
    category: "REAÇÃO DE OXIDAÇÃO",
    title: "Formação da ferrugem",
    equation: "4Fe + 3O₂ → 2Fe₂O₃",
    explanation:
      "O ferro reage com o oxigênio e forma óxidos de ferro. " +
      "A ferrugem real é mais complexa e envolve água. " +
      "A animação mostra, de forma simplificada, como manchas " +
      "alaranjadas e marrons podem aparecer na superfície.",
    steps: [
      "O prego começa com aparência metálica.",
      "Pequenas manchas de ferrugem começam a aparecer.",
      "As manchas aumentam e se espalham pela superfície."
    ]
  },

  peroxide: {
    category: "REAÇÃO DE DECOMPOSIÇÃO",
    title: "Decomposição da água oxigenada",
    equation: "2H₂O₂ → 2H₂O + O₂",
    explanation:
      "O peróxido de hidrogênio pode se decompor, formando água " +
      "e gás oxigênio. As bolhas representam o gás liberado. " +
      "A animação é um modelo visual educativo.",
    steps: [
      "A água oxigenada é o reagente.",
      "O peróxido de hidrogênio se decompõe.",
      "Formam-se água e gás oxigênio."
    ]
  }
};

// ------------------------------------------
// ELEMENTOS DA PÁGINA
// ------------------------------------------

const reactionOptions = document.querySelectorAll(".reaction-option");

const reactionCategory = document.getElementById("reactionCategory");
const reactionTitle = document.getElementById("reactionTitle");
const reactionStatus = document.getElementById("reactionStatus");

const reactionSvg = document.getElementById("reactionSvg");
const reactionDiagram = document.getElementById("reactionDiagram");
const reactionPlaceholder = document.getElementById("reactionPlaceholder");

const reactionEquation = document.getElementById("reactionEquation");
const explanationTitle = document.getElementById("explanationTitle");
const explanationText = document.getElementById("explanationText");
const reactionSteps = document.getElementById("reactionSteps");

const startButton = document.getElementById("startReaction");
const resetButton = document.getElementById("resetReaction");

// ------------------------------------------
// ESTADO
// ------------------------------------------

let selectedReaction = "water";
let isAnimating = false;
let animationTimers = [];
let animationId = 0;

const SVG_NS = "http://www.w3.org/2000/svg";

// ------------------------------------------
// SVG HELPERS
// ------------------------------------------

function svg(tag, attrs = {}, content = "") {
  const element = document.createElementNS(SVG_NS, tag);

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (content) element.textContent = content;

  return element;
}

function add(parent, tag, attrs = {}, content = "") {
  const element = svg(tag, attrs, content);
  parent.appendChild(element);
  return element;
}

function group(attrs = {}) {
  return svg("g", attrs);
}

function clearScene() {
  reactionDiagram.replaceChildren();
}

function text(parent, x, y, content, size = 16, color = "#52617c") {
  return add(parent, "text", {
    x,
    y,
    fill: color,
    "font-size": size,
    "font-family": "inherit",
    "font-weight": 700,
    "text-anchor": "middle"
  }, content);
}

function line(parent, x1, y1, x2, y2, color = "#7184a5", width = 3) {
  return add(parent, "line", {
    x1, y1, x2, y2,
    stroke: color,
    "stroke-width": width,
    "stroke-linecap": "round"
  });
}

function rect(parent, x, y, width, height, rx, fill, stroke = "none") {
  return add(parent, "rect", {
    x, y, width, height, rx, fill, stroke
  });
}

function circle(parent, cx, cy, r, fill, opacity = 1) {
  return add(parent, "circle", {
    cx, cy, r, fill, opacity
  });
}

// ------------------------------------------
// RECIPIENTE
// ------------------------------------------

function drawBeaker(parent, x, y, width, height, liquidColor, level = 0.65) {
  const g = group({
    transform: `translate(${x} ${y})`
  });

  parent.appendChild(g);

  const liquidHeight = height * level;
  const liquidY = height - liquidHeight;

  rect(
    g, 5, liquidY,
    width - 10, liquidHeight - 4,
    5, liquidColor
  );

  add(g, "path", {
    d: `M 5 ${liquidY} Q ${width / 2} ${liquidY - 7} ${width - 5} ${liquidY}`,
    fill: "none",
    stroke: liquidColor,
    "stroke-width": 3
  });

  add(g, "path", {
    d: `M 0 0 L 8 ${height - 8} Q ${width / 2} ${height + 4} ${width - 8} ${height - 8} L ${width} 0`,
    fill: "rgba(255,255,255,0.10)",
    stroke: "#9aabc5",
    "stroke-width": 4,
    "stroke-linejoin": "round"
  });

  line(g, -3, 0, width + 3, 0, "#9aabc5", 4);
  line(g, 13, 18, 20, height - 20, "rgba(255,255,255,0.9)", 4);

  return g;
}

// ------------------------------------------
// BOLHAS
// ------------------------------------------

function addBubble(parent, x, y, r, delay = 0) {
  const bubble = circle(parent, x, y, r, "rgba(255,255,255,0.7)");

  bubble.setAttribute("stroke", "#77bfe8");
  bubble.setAttribute("stroke-width", "2");
  bubble.classList.add("reaction-bubble");
  bubble.style.animationDelay = `${delay}s`;

  return bubble;
}

function addBubbles(parent, x, y, count = 12) {
  for (let i = 0; i < count; i++) {
    const offsetX = ((i * 37) % 65) - 32;
    const offsetY = ((i * 29) % 115);

    addBubble(
      parent,
      x + offsetX,
      y - offsetY,
      4 + (i % 4),
      (i % 5) * 0.18
    );
  }
}

// ------------------------------------------
// CENA 1 — VELA E ÁGUA
// ------------------------------------------

function drawCandleScene(stage = 0) {
  clearScene();

  const scene = group();
  reactionDiagram.appendChild(scene);

  text(scene, 350, 35, "A água sobe dentro do copo", 16);

  // Prato
  add(scene, "ellipse", {
    cx: 350, cy: 270,
    rx: 205, ry: 28,
    fill: "#e8edf5",
    stroke: "#9aabc5",
    "stroke-width": 3
  });

  // Água no prato
  add(scene, "ellipse", {
    cx: 350, cy: 263,
    rx: 190, ry: 19,
    fill: "#9ddcf4",
    opacity: 0.85
  });

  // Vela
  rect(scene, 333, 170, 34, 88, 7, "#fff3d6", "#d7c9a9");
  line(scene, 350, 170, 350, 155, "#665a4e", 3);

  // Chama
  const flame = group({ class: "candle-flame" });
  scene.appendChild(flame);

  add(flame, "path", {
    d: "M 350 157 C 326 137 350 112 352 99 C 374 128 374 143 350 157 Z",
    fill: "#ffb347",
    stroke: "#f18b35",
    "stroke-width": 2
  });

  add(flame, "path", {
    d: "M 350 151 C 340 139 352 128 354 121 C 365 138 360 147 350 151 Z",
    fill: "#fff0a6"
  });

  // Copo transparente
  const glass = group({
    class: "candle-glass" + (stage >= 1 ? " lowered" : "")
  });

  scene.appendChild(glass);

  // Água dentro do copo, começa baixa e sobe
  const waterY = stage >= 3 ? 155 : 235;
  const waterHeight = stage >= 3 ? 90 : 10;

  add(glass, "rect", {
    x: 275,
    y: waterY,
    width: 150,
    height: waterHeight,
    rx: 4,
    fill: "#8bd5f2",
    opacity: 0.78,
    class: "candle-water"
  });

  // Contorno do copo invertido
  add(glass, "path", {
    d: "M 270 55 L 282 250 Q 350 266 418 250 L 430 55",
    fill: "rgba(255,255,255,0.12)",
    stroke: "#91a7c6",
    "stroke-width": 5,
    "stroke-linejoin": "round"
  });

  line(glass, 264, 55, 436, 55, "#91a7c6", 5);

  // A chama apaga na etapa final
  if (stage >= 2) {
    flame.classList.add("extinguished");
  }

  if (stage >= 3) {
    text(scene, 350, 310, "A água subiu!", 16, "#416b9b");
  } else if (stage >= 2) {
    text(scene, 350, 310, "A chama se apagou", 16, "#65758e");
  } else {
    text(scene, 350, 310, "Vela acesa em um prato com água", 14);
  }
}

// ------------------------------------------
// CENA 2 — VINAGRE + BICARBONATO
// ------------------------------------------

function drawVinegarScene(stage = 0) {
  clearScene();

  const scene = group();
  reactionDiagram.appendChild(scene);

  text(scene, 160, 58, "Vinagre", 16);
  text(scene, 540, 58, "Bicarbonato", 16);

  // Copo esquerdo: o grupo externo mantém a posição
  const leftCupPosition = group({
    transform: "translate(95 90)"
  });
  scene.appendChild(leftCupPosition);

  // O grupo interno faz apenas a inclinação
  const leftCup = group({
    class: stage >= 1 ? "pour-left" : ""
  });
  leftCupPosition.appendChild(leftCup);

  drawBeaker(leftCup, 0, 0, 115, 160, "#e8d9a5", 0.55);

  // Copo direito: também separado em dois grupos
  const rightCupPosition = group({
    transform: "translate(490 90)"
  });
  scene.appendChild(rightCupPosition);

  const rightCup = group({
    class: stage >= 1 ? "pour-right" : ""
  });
  rightCupPosition.appendChild(rightCup);

  drawBeaker(rightCup, 0, 0, 115, 160, "#e7edf5", 0.45);

  // Recipiente central
  const finalBeaker = drawBeaker(
    scene,
    290,
    105,
    120,
    170,
    stage >= 2 ? "#b5e4f4" : "#d5e9f4",
    stage >= 2 ? 0.68 : 0.35
  );

  if (stage >= 1) {
    line(scene, 195, 210, 300, 220, "#d8c58d", 8);
    line(scene, 505, 210, 400, 220, "#d8dfe9", 8);
  }

  if (stage >= 2) {
    addBubbles(finalBeaker, 60, 145, 22);

    circle(scene, 350, 85, 9, "#d9f2ff");
    circle(scene, 390, 95, 6, "#d9f2ff");
    circle(scene, 315, 75, 7, "#d9f2ff");
  }

  text(
    scene,
    350,
    305,
    stage >= 2
      ? "Mistura com liberação de gás"
      : stage >= 1
        ? "Os reagentes estão sendo misturados"
        : "Dois reagentes separados",
    14
  );
}

// ------------------------------------------
// CENA 3 — FERRUGEM GRADUAL
// ------------------------------------------

function drawRustScene(stage = 0) {
  clearScene();

  const scene = group();
  reactionDiagram.appendChild(scene);

  text(scene, 350, 55, "Transformação do ferro", 17);

  const nail = group({
    transform: "translate(190 160) rotate(-8 160 0)"
  });

  scene.appendChild(nail);

  rect(nail, 12, -8, 300, 25, 12, "rgba(40,50,70,0.12)");

  rect(
    nail, 25, -18, 270, 28, 12,
    "#aeb9c7", "#8c9bb0"
  );

  add(nail, "path", {
    d: "M 25 -25 L 0 -18 L 0 10 L 25 17 Z",
    fill: "#9ba9bb",
    stroke: "#8c9bb0",
    "stroke-width": 2
  });

  add(nail, "path", {
    d: "M 295 -18 L 325 -4 L 295 10 Z",
    fill: "#8c9bb0"
  });

  const spots = [
    [45, -8, 7],
    [65, 2, 9],
    [95, -10, 8],
    [120, 3, 11],
    [145, -8, 7],
    [170, 2, 10],
    [195, -10, 12],
    [220, 2, 8],
    [245, -8, 10],
    [270, 2, 7]
  ];

  spots.forEach(([x, y, r], index) => {
    if (index < stage * 3 + (stage > 0 ? 1 : 0)) {
      const spot = circle(nail, x, y, r, index % 2 ? "#a85b39" : "#c47a4d");
      spot.classList.add("rust-spot", "visible");
    }
  });

  if (stage === 0) {
    text(scene, 350, 255, "Ferro metálico", 15, "#65758e");
  } else if (stage === 1) {
    text(scene, 350, 255, "Pequenas manchas aparecem", 15, "#a65a3b");
  } else {
    text(scene, 350, 255, "A ferrugem se espalha", 15, "#a65a3b");
  }

  text(scene, 350, 310, "Uma transformação que ocorre ao longo do tempo", 14);
}

// ------------------------------------------
// CENA 4 — ÁGUA OXIGENADA
// ------------------------------------------

function drawPeroxideScene(animated = false) {
  clearScene();

  const scene = group();
  reactionDiagram.appendChild(scene);

  text(scene, 170, 58, "Água oxigenada", 16);
  text(scene, 530, 58, "Produtos", 16);

  drawBeaker(scene, 105, 85, 130, 180, "#d7e9f4", 0.62);

  line(scene, 260, 170, 405, 170, "#8398c5", 4);

  add(scene, "path", {
    d: "M 395 160 L 410 170 L 395 180",
    fill: "none",
    stroke: "#8398c5",
    "stroke-width": 4,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });

  const productBeaker = drawBeaker(
    scene, 465, 85, 130, 180, "#b5e4f4", 0.62
  );

  if (animated) {
    addBubbles(productBeaker, 65, 150, 24);
    circle(scene, 540, 75, 9, "#d9f2ff");
    circle(scene, 570, 62, 6, "#d9f2ff");
    circle(scene, 505, 67, 7, "#d9f2ff");
  }

  text(
    scene, 350, 310,
    animated ? "Água + gás oxigênio" : "Aguardando decomposição",
    15
  );
}

// ------------------------------------------
// DESENHAR CENA
// ------------------------------------------

function renderScene(stage = 0) {
  switch (selectedReaction) {
    case "water":
      drawCandleScene(stage);
      break;

    case "vinegar":
      drawVinegarScene(stage);
      break;

    case "rust":
      drawRustScene(stage);
      break;

    case "peroxide":
      drawPeroxideScene(stage >= 2);
      break;
  }
}

// ------------------------------------------
// ETAPAS
// ------------------------------------------

function renderSteps(steps, activeStep = -1) {
  reactionSteps.replaceChildren();

  steps.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "reaction-step";

    if (index === activeStep) {
      item.classList.add("active");
    }

    const number = document.createElement("span");
    number.textContent = index + 1;

    const paragraph = document.createElement("p");
    paragraph.textContent = step;

    item.append(number, paragraph);
    reactionSteps.appendChild(item);
  });
}

// ------------------------------------------
// ESPERA CANCELÁVEL
// ------------------------------------------

function wait(ms, id) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      animationTimers = animationTimers.filter(t => t !== timer);
      resolve(id === animationId);
    }, ms);

    animationTimers.push(timer);
  });
}

function stopAnimation() {
  animationId++;

  animationTimers.forEach(clearTimeout);
  animationTimers = [];

  isAnimating = false;
}

// ------------------------------------------
// SELEÇÃO
// ------------------------------------------

function selectReaction(key) {
  if (!reactions[key]) return;

  stopAnimation();
  selectedReaction = key;

  const reaction = reactions[key];

  reactionOptions.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.reaction === key
    );
  });

  reactionCategory.textContent = reaction.category;
  reactionTitle.textContent = reaction.title;
  reactionStatus.textContent = "Pronto para começar";
  reactionStatus.classList.remove("finished");

  reactionEquation.textContent = reaction.equation;
  explanationTitle.textContent = "O que está acontecendo?";
  explanationText.textContent = reaction.explanation;

  startButton.disabled = false;
  startButton.textContent = "▶ Iniciar reação";

  reactionPlaceholder.hidden = true;
  reactionSvg.hidden = false;

  renderScene(0);
  renderSteps(reaction.steps);
}

// ------------------------------------------
// INICIAR ANIMAÇÃO
// ------------------------------------------

async function startReaction() {
  if (isAnimating) return;

  isAnimating = true;
  const currentId = animationId;

  startButton.disabled = true;

  const reaction = reactions[selectedReaction];

  reactionStatus.textContent = "Reação em andamento…";
  reactionStatus.classList.remove("finished");

  // Etapa 1
  renderSteps(reaction.steps, 0);

  if (!(await wait(700, currentId))) return;

  // Etapa 2
  renderSteps(reaction.steps, 1);

  if (selectedReaction === "water") {
    renderScene(1);

    if (!(await wait(1300, currentId))) return;

    renderScene(2);

    if (!(await wait(900, currentId))) return;

    renderScene(3);
  } else if (selectedReaction === "vinegar") {
    renderScene(1);

    if (!(await wait(1500, currentId))) return;

    renderScene(2);
  } else if (selectedReaction === "rust") {
    renderScene(1);

    if (!(await wait(1200, currentId))) return;

    renderScene(2);
  } else {
    renderScene(2);
  }

  renderSteps(reaction.steps, 2);

  if (!(await wait(900, currentId))) return;

  reactionStatus.textContent = "Simulação concluída";
  reactionStatus.classList.add("finished");

  explanationTitle.textContent = "O que aconteceu?";
  explanationText.textContent = reaction.explanation;

  startButton.textContent = "✓ Simulação concluída";
  isAnimating = false;
  startButton.disabled = false;
}

// ------------------------------------------
// REINICIAR
// ------------------------------------------

function resetReaction() {
  stopAnimation();
  selectReaction(selectedReaction);
}

// ------------------------------------------
// INICIALIZAÇÃO
// ------------------------------------------

function initializeReactionSimulator() {
  reactionOptions.forEach(button => {
    button.addEventListener("click", () => {
      selectReaction(button.dataset.reaction);
    });
  });

  startButton.addEventListener("click", startReaction);
  resetButton.addEventListener("click", resetReaction);

  selectReaction("water");
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeReactionSimulator
  );
} else {
  initializeReactionSimulator();
}