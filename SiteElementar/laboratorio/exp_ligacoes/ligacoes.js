
/* =====================================================
   ELEMENTAR — CONSTRUTOR DE LIGAÇÕES
   Primeira versão: NaCl, MgCl2, H2 e H2O
===================================================== */

const valenceElectrons = {
  H: 1,
  O: 6,
  Na: 1,
  Cl: 7,
  Mg: 2
};

// Elementos disponíveis nesta versão
const supportedElements = ["H", "O", "Na", "Cl", "Mg"];

// Combinações que possuem modelos explicativos
const bondModels = {
  "Cl-Na": {
    type: "ionic",
    formula: "NaCl",
    title: "Ligação iônica — NaCl",
    badge: "Ligação iônica",
    explanation:
      "O sódio possui 1 elétron de valência e o cloro possui 7. " +
      "O sódio transfere 1 elétron para o cloro. " +
      "Assim, formam-se os íons Na⁺ e Cl⁻, que se atraem por terem cargas opostas.",
    caption:
      "Modelo simplificado de um par de íons. No sal sólido, os íons formam uma rede cristalina.",
    steps: [
      "O sódio tem 1 elétron na camada de valência.",
      "O cloro tem 7 elétrons na camada de valência.",
      "O sódio transfere 1 elétron para o cloro.",
      "Formam-se Na⁺ e Cl⁻, que se atraem."
    ]
  },

  "Cl-Mg": {
    type: "ionic",
    formula: "MgCl₂",
    title: "Ligação iônica — MgCl₂",
    badge: "Ligação iônica",
    explanation:
      "O magnésio possui 2 elétrons de valência. " +
      "Cada átomo de cloro precisa receber 1 elétron para completar sua camada de valência. " +
      "O magnésio transfere seus 2 elétrons, um para cada cloro. " +
      "Formam-se Mg²⁺ e dois Cl⁻, que se atraem.",
    caption:
      "Modelo simplificado dos íons na proporção 1 Mg²⁺ para 2 Cl⁻. O sólido forma uma rede iônica.",
    steps: [
      "O magnésio tem 2 elétrons de valência.",
      "Cada cloro tem 7 elétrons de valência.",
      "O magnésio transfere 1 elétron para cada cloro.",
      "Formam-se Mg²⁺ e 2 Cl⁻.",
      "As cargas se equilibram: +2 + (−1) + (−1) = 0."
    ]
  },

  "H-H": {
    type: "covalent",
    formula: "H₂",
    title: "Ligação covalente — H₂",
    badge: "Ligação covalente",
    explanation:
      "Cada hidrogênio possui 1 elétron. " +
      "Os dois átomos compartilham um par de elétrons. " +
      "Assim, cada hidrogênio passa a contar com 2 elétrons na sua primeira camada.",
    caption:
      "O par compartilhado representa a ligação covalente simples entre os dois hidrogênios.",
    steps: [
      "Cada hidrogênio possui 1 elétron.",
      "Os átomos aproximam-se e compartilham seus elétrons.",
      "O par compartilhado forma uma ligação covalente simples.",
      "Cada hidrogênio passa a contar com 2 elétrons na primeira camada."
    ]
  },

  "H-O": {
    type: "covalent",
    formula: "H₂O",
    title: "Ligações covalentes — H₂O",
    badge: "Ligação covalente",
    explanation:
      "O oxigênio possui 6 elétrons de valência, enquanto cada hidrogênio possui 1. " +
      "O oxigênio compartilha um par de elétrons com cada hidrogênio. " +
      "Assim, formam-se duas ligações covalentes simples. " +
      "O oxigênio fica com dois pares de elétrons não compartilhados.",
    caption:
      "A água possui duas ligações O–H e geometria angular. O desenho é um modelo simplificado.",
    steps: [
      "O oxigênio possui 6 elétrons de valência.",
      "Cada hidrogênio possui 1 elétron.",
      "O oxigênio compartilha um par com cada hidrogênio.",
      "Formam-se duas ligações covalentes simples.",
      "A molécula de água tem formato angular."
    ]
  }
};

// -----------------------------------------------------
// ELEMENTOS DA PÁGINA
// -----------------------------------------------------

const elementASelect = document.getElementById("elementA");
const elementBSelect = document.getElementById("elementB");
const buildButton = document.getElementById("buildBond");
const resetButton = document.getElementById("resetBond");

const visualTitle = document.getElementById("visualTitle");
const bondBadge = document.getElementById("bondBadge");
const bondStage = document.getElementById("bondStage");
const stagePlaceholder = document.getElementById("stagePlaceholder");
const bondDiagram = document.getElementById("bondDiagram");
const visualCaption = document.getElementById("visualCaption");

const explanationTitle = document.getElementById("explanationTitle");
const explanationText = document.getElementById("explanationText");

// -----------------------------------------------------
// UTILITÁRIOS
// -----------------------------------------------------

function getElement(symbol) {
  return window.elements?.find(element => element.s === symbol);
}

function getElementName(symbol) {
  return getElement(symbol)?.name || symbol;
}

function getElementNumber(symbol) {
  return getElement(symbol)?.n || "";
}

function getPairKey(a, b) {
  return [a, b].sort().join("-");
}

function clearDiagram() {
  bondDiagram.innerHTML = "";
}

function addSvgElement(tag, attributes = {}, text = "") {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tag
  );

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (text) {
    element.textContent = text;
  }

  bondDiagram.appendChild(element);
  return element;
}

function addAtom(x, y, symbol, charge = "") {
  const elementName = getElementName(symbol);
  const label = charge ? `${symbol}${charge}` : symbol;

  addSvgElement("circle", {
    cx: x,
    cy: y,
    r: 48,
    class: "atom-circle"
  });

  addSvgElement("text", {
    x,
    y: y + 8,
    "text-anchor": "middle",
    class: "atom-label"
  }, label);

  addSvgElement("text", {
    x,
    y: y + 68,
    "text-anchor": "middle",
    class: "atom-name"
  }, elementName);
}

function addElectron(x, y, extraClass = "") {
  addSvgElement("circle", {
    cx: x,
    cy: y,
    r: 6,
    class: `electron-dot ${extraClass}`.trim()
  });
}

function addArrow(x1, y1, x2, y2) {
  addSvgElement("line", {
    x1,
    y1,
    x2,
    y2,
    class: "bond-line",
    "marker-end": "url(#arrowHead)"
  });
}

function addArrowMarker() {
  const defs = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "defs"
  );

  defs.innerHTML = `
    <marker
      id="arrowHead"
      markerWidth="10"
      markerHeight="10"
      refX="8"
      refY="3"
      orient="auto"
    >
      <path d="M0,0 L0,6 L9,3 z" fill="currentColor"></path>
    </marker>
  `;

  bondDiagram.appendChild(defs);
}

function showPlaceholder(message) {
  clearDiagram();

  stagePlaceholder.textContent = message;
  stagePlaceholder.hidden = false;
  stagePlaceholder.style.display = "flex";

  bondSvgVisibility(false);
}

function bondSvgVisibility(visible) {
  const svg = document.getElementById("bondSvg");
  if (svg) svg.hidden = !visible;
}

function showDiagram() {
  stagePlaceholder.hidden = true;
  stagePlaceholder.style.display = "none";

  bondSvgVisibility(true);

  clearDiagram();
  addArrowMarker();
}

// -----------------------------------------------------
// MODELOS VISUAIS
// -----------------------------------------------------

function drawNaCl() {
  showDiagram();

  // Título das etapas
  addSvgElement("text", {
    x: 300,
    y: 30,
    "text-anchor": "middle",
    class: "diagram-step-title"
  }, "Como o NaCl se forma");

  // Átomos antes da transferência
  addSvgElement("text", {
    x: 150,
    y: 75,
    "text-anchor": "middle",
    class: "diagram-label"
  }, "Antes");

  addAtom(150, 145, "Na");
  addAtom(450, 145, "Cl");

  // Elétrons de valência: 1 do sódio
  addElectron(150, 80);

  // Sete elétrons do cloro
  const chlorineElectrons = [
    [450, 80],
    [485, 95],
    [500, 130],
    [500, 165],
    [485, 195],
    [415, 195],
    [400, 165]
  ];

  chlorineElectrons.forEach(([x, y]) => {
    addElectron(x, y);
  });

  // Indicação da transferência
  addSvgElement("path", {
    d: "M 205 100 C 270 45, 330 45, 390 100",
    class: "electron-transfer-path"
  });

  addSvgElement("text", {
    x: 300,
    y: 62,
    "text-anchor": "middle",
    class: "diagram-label"
  }, "1 elétron transferido");

  // Separador visual
  addSvgElement("line", {
    x1: 70,
    y1: 245,
    x2: 530,
    y2: 245,
    class: "diagram-divider"
  });

  // Resultado
  addSvgElement("text", {
    x: 300,
    y: 275,
    "text-anchor": "middle",
    class: "diagram-step-title"
  }, "Depois");

  addAtom(150, 335, "Na", "⁺");
  addAtom(450, 335, "Cl", "⁻");

  addSvgElement("text", {
    x: 300,
    y: 390,
    "text-anchor": "middle",
    class: "diagram-result"
  }, "Na⁺ e Cl⁻ se atraem");
}


function drawMgCl2() {
  showDiagram();

  addSvgElement("text", {
    x: 300, y: 30,
    "text-anchor": "middle",
    class: "diagram-step-title"
  }, "Como o MgCl₂ se forma");

  // Etapa 1
  addSvgElement("text", {
    x: 300, y: 65,
    "text-anchor": "middle",
    class: "diagram-label"
  }, "O magnésio transfere 2 elétrons");

  addAtom(300, 145, "Mg");

  // Dois elétrons de valência do magnésio
  addElectron(280, 80);
  addElectron(320, 80);

  // Cloros separados
  addAtom(150, 290, "Cl");
  addAtom(450, 290, "Cl");

  // Setas de transferência
  addSvgElement("path", {
    d: "M 270 185 Q 210 210 170 235",
    class: "electron-transfer-path"
  });

  addSvgElement("path", {
    d: "M 330 185 Q 390 210 430 235",
    class: "electron-transfer-path"
  });

  // Resultado
  addSvgElement("line", {
    x1: 70, y1: 375,
    x2: 530, y2: 375,
    class: "diagram-divider"
  });

  addSvgElement("text", {
    x: 300, y: 405,
    "text-anchor": "middle",
    class: "diagram-result"
  }, "Mg²⁺ + 2 Cl⁻ — cargas equilibradas");
}


function drawH2() {
  showDiagram();

  addSvgElement("text", {
    x: 300, y: 35,
    "text-anchor": "middle",
    class: "diagram-step-title"
  }, "Como o H₂ se forma");

  addSvgElement("text", {
    x: 300, y: 75,
    "text-anchor": "middle",
    class: "diagram-label"
  }, "Cada hidrogênio contribui com 1 elétron");

  // Átomos
  addAtom(190, 190, "H");
  addAtom(410, 190, "H");

  // Região de compartilhamento
  addSvgElement("rect", {
    x: 255, y: 145,
    width: 90, height: 90,
    rx: 18,
    class: "shared-electron-area"
  });

  // Par compartilhado
  addElectron(280, 190, "electron-shared");
  addElectron(320, 190, "electron-shared");

  addSvgElement("text", {
    x: 300, y: 290,
    "text-anchor": "middle",
    class: "diagram-result"
  }, "1 par de elétrons compartilhado");

  addSvgElement("text", {
    x: 300, y: 330,
    "text-anchor": "middle",
    class: "diagram-label"
  }, "Ligação covalente simples");
}


function drawH2O() {
  showDiagram();

  addSvgElement("text", {
    x: 300, y: 30,
    "text-anchor": "middle",
    class: "diagram-step-title"
  }, "Como a molécula de água se forma");

  addSvgElement("text", {
    x: 300, y: 65,
    "text-anchor": "middle",
    class: "diagram-label"
  }, "O oxigênio compartilha elétrons com 2 hidrogênios");

  // Ligações atrás dos átomos
  addSvgElement("line", {
    x1: 275, y1: 175,
    x2: 180, y2: 285,
    class: "bond-line"
  });

  addSvgElement("line", {
    x1: 325, y1: 175,
    x2: 420, y2: 285,
    class: "bond-line"
  });

  // Átomos
  addAtom(300, 140, "O");
  addAtom(160, 300, "H");
  addAtom(440, 300, "H");

  // Pares compartilhados nas ligações
  addElectron(225, 225, "electron-shared");
  addElectron(240, 240, "electron-shared");

  addElectron(375, 225, "electron-shared");
  addElectron(360, 240, "electron-shared");

  // Pares não compartilhados do oxigênio
  addElectron(280, 75);
  addElectron(300, 75);

  addElectron(320, 75);
  addElectron(340, 75);

  addSvgElement("text", {
    x: 300, y: 390,
    "text-anchor": "middle",
    class: "diagram-result"
  }, "2 ligações covalentes simples — formato angular");
}

// -----------------------------------------------------
// EXPLICAÇÃO
// -----------------------------------------------------

function renderSteps(steps) {
  const list = document.createElement("ol");
  list.className = "bond-steps";

  steps.forEach(step => {
    const item = document.createElement("li");
    item.textContent = step;
    list.appendChild(item);
  });

  explanationText.replaceChildren(list);
}

function showModel(model) {
  visualTitle.textContent = model.title;
  bondBadge.textContent = model.badge;
  visualCaption.textContent = model.caption;
  explanationTitle.textContent = model.formula;

  renderSteps(model.steps);

  switch (model.formula) {
    case "NaCl":
      drawNaCl();
      break;
    case "MgCl₂":
      drawMgCl2();
      break;
    case "H₂":
      drawH2();
      break;
    case "H₂O":
      drawH2O();
      break;
  }
}

// -----------------------------------------------------
// CONSTRUIR LIGAÇÃO
// -----------------------------------------------------

function buildBond() {
  const a = elementASelect.value;
  const b = elementBSelect.value;

  if (!a || !b) {
    showPlaceholder("Escolha dois elementos para começar.");
    return;
  }

  const key = getPairKey(a, b);
  const model = bondModels[key];

  if (!model) {
    visualTitle.textContent = "Combinação ainda não disponível";
    bondBadge.textContent = "Em desenvolvimento";
    visualCaption.textContent =
      "Esta combinação ainda não possui um modelo explicado nesta versão.";

    explanationTitle.textContent =
      `${getElementName(a)} + ${getElementName(b)}`;

    explanationText.textContent =
      "Estamos começando com algumas ligações para explicar cada etapa com cuidado. " +
      "Escolha Na + Cl, Mg + Cl, H + H ou H + O para explorar um modelo disponível.";

    showPlaceholder(
      "Ainda não temos um modelo visual para essa combinação."
    );

    return;
  }

  showModel(model);
}

// -----------------------------------------------------
// REINICIAR
// -----------------------------------------------------

function resetBond() {
  elementASelect.value = "Na";
  elementBSelect.value = "Cl";

  visualTitle.textContent = "Seu modelo aparecerá aqui";
  bondBadge.textContent = "Escolha os elementos";
  visualCaption.textContent = "";

  explanationTitle.textContent = "Como funciona?";
  explanationText.textContent =
    "Escolha dois elementos e clique em “Construir ligação” para ver o modelo.";

  showPlaceholder("Escolha os elementos e construa uma ligação.");
}

// -----------------------------------------------------
// INICIALIZAÇÃO
// -----------------------------------------------------

function initializeBondBuilder() {
  if (
    !elementASelect ||
    !elementBSelect ||
    !buildButton ||
    !resetButton ||
    !bondDiagram ||
    !stagePlaceholder
  ) {
    console.error(
      "Elementar: não foi possível encontrar todos os elementos do construtor."
    );
    return;
  }

  buildButton.addEventListener("click", buildBond);
  resetButton.addEventListener("click", resetBond);

  resetBond();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeBondBuilder);
} else {
  initializeBondBuilder();
}