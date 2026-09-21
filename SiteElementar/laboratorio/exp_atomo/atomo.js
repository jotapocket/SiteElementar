
/* =========================================
   ELEMENTAR — EXPERIMENTO: MONTE SEU ÁTOMO
========================================= */

// 1. Dados dos elementos
const elementsData = window.elements || [];

if (elementsData.length !== 118) {
  console.warn(
    "Elementar: foram encontrados",
    elementsData.length,
    "elementos em elements.js."
  );
}

// 2. Configurações
const MAX_PROTONS = 118;
const MAX_NEUTRONS = 300;
const MAX_ELECTRONS = 118;

const SHELL_CAPACITIES = [2, 8, 18, 32, 32, 18, 8];

// 3. Estado inicial
let protons = 1;
let neutrons = 0;
let electrons = 1;
let currentModel = "bohr";

// 4. Elementos HTML — IDs adaptados ao seu HTML
const protonValue = document.getElementById("protonCount");
const neutronValue = document.getElementById("neutronCount");
const electronValue = document.getElementById("electronCount");

const protonMinus = document.getElementById("removeProton");
const protonPlus = document.getElementById("addProton");

const neutronMinus = document.getElementById("removeNeutron");
const neutronPlus = document.getElementById("addNeutron");

const electronMinus = document.getElementById("removeElectron");
const electronPlus = document.getElementById("addElectron");

const resetButton = document.getElementById("resetAtom");

const elementName = document.getElementById("elementName");
const elementSymbol = document.getElementById("elementSymbol");
const atomicNumber = document.getElementById("atomicNumber");

const massNumber = document.getElementById("infoA");
const atomCharge = document.getElementById("infoCharge");
const infoZ = document.getElementById("infoZ");
const infoShells = document.getElementById("infoShells");

const atomStatus = document.getElementById("atomStatus");
const atomFact = document.getElementById("atomFact");

const atomNucleus = document.getElementById("nucleusLayer");
const electronShells = document.getElementById("shellsLayer");
const electronCloud = document.getElementById("electronsLayer");

const visualTitle = document.getElementById("visualTitle");
const modelBadge = document.getElementById("modelBadge");

const bohrButton = document.getElementById("bohrButton");
const cloudButton = document.getElementById("cloudButton");

// 5. Funções auxiliares
function getElement(number) {
  return elementsData.find(element => element.n === number);
}

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tag
  );

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

function getElectronDistribution(quantity) {
  const distribution = [];
  let remaining = quantity;

  for (const capacity of SHELL_CAPACITIES) {
    if (remaining <= 0) break;

    const amount = Math.min(remaining, capacity);
    distribution.push(amount);
    remaining -= amount;
  }

  return distribution;
}

// 6. Atualizar informações

function updateValues() {
  const element = getElement(protons);
  const charge = protons - electrons;
  const distribution = getElectronDistribution(electrons);

  if (protonValue) protonValue.value = protons;
  if (neutronValue) neutronValue.value = neutrons;
  if (electronValue) electronValue.value = electrons;

  if (elementName) {
    elementName.textContent = element
      ? element.name
      : "Elemento desconhecido";
  }

  if (elementSymbol) {
    elementSymbol.textContent = element ? element.s : "?";
  }

  if (atomicNumber) atomicNumber.textContent = protons;
  if (infoZ) infoZ.textContent = protons;

  if (massNumber) {
    massNumber.textContent = protons + neutrons;
  }

  if (atomCharge) {
    atomCharge.textContent =
      charge > 0 ? `+${charge}` :
      charge < 0 ? `${charge}` :
      "0";
  }

  if (infoShells) {
    infoShells.textContent = distribution.length;
  }

  if (atomStatus) {
    atomStatus.textContent =
      charge === 0
        ? "Átomo eletricamente neutro."
        : charge > 0
          ? `Íon positivo: carga +${charge}.`
          : `Íon negativo: carga ${charge}.`;
  }

  if (atomFact) {
    atomFact.textContent = element
      ? element.fact
      : "Aumente ou diminua os prótons para escolher um elemento.";
  }
}

function setParticleCount(type, value) {
  const limits = {
    proton: { min: 1, max: 118 },
    neutron: { min: 0, max: 300 },
    electron: { min: 0, max: 118 }
  };

  const limit = limits[type];
  const amount = Number(value);

  if (!limit || !Number.isFinite(amount)) return;

  const count = Math.min(
    limit.max,
    Math.max(limit.min, Math.trunc(amount))
  );

  if (type === "proton") protons = count;
  if (type === "neutron") neutrons = count;
  if (type === "electron") electrons = count;

  updateAtom();
}

function bindCounter(input, type, minus, plus) {
  if (!input) return;

  input.addEventListener("change", () => {
    setParticleCount(type, input.value);
  });

  minus?.addEventListener("click", () => {
    setParticleCount(type, Number(input.value) - 1);
  });

  plus?.addEventListener("click", () => {
    setParticleCount(type, Number(input.value) + 1);
  });
}

bindCounter(protonValue, "proton", protonMinus, protonPlus);
bindCounter(neutronValue, "neutron", neutronMinus, neutronPlus);
bindCounter(electronValue, "electron", electronMinus, electronPlus);

// 7. Desenhar núcleo

function drawNucleus() {
  if (!atomNucleus) return;

  atomNucleus.innerHTML = "";

  const total = protons + neutrons;
  if (total === 0) return;

  const centerX = 300;
  const centerY = 300;

  // O núcleo nunca ultrapassa esta área.
  const maxNucleusRadius = 42;

  // Distribuição compacta das partículas.
  const spacing = maxNucleusRadius / Math.sqrt(total);

  // As partículas diminuem conforme o núcleo ganha partículas.
  const particleRadius = Math.max(
    0.8,
    Math.min(7, spacing * 0.48)
  );

  for (let i = 0; i < total; i++) {
    const angle = i * 2.399;
    const distance = spacing * Math.sqrt(i);

    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    const isProton = i < protons;

    const particle = createSvgElement("circle", {
      cx: x,
      cy: y,
      r: particleRadius,
      class: isProton
        ? "proton-particle"
        : "neutron-particle"
    });

    atomNucleus.appendChild(particle);
  }
}

// 8. Desenhar modelo de Bohr
function drawBohrModel() {
  if (!electronShells) return;

  electronShells.innerHTML = "";

  const distribution = getElectronDistribution(electrons);

  const centerX = 300;
  const centerY = 300;

  const baseRadius = 55;
  const radiusStep = 35;

  distribution.forEach((amount, shellIndex) => {
    const radius = baseRadius + shellIndex * radiusStep;

    const orbit = createSvgElement("circle", {
      cx: centerX,
      cy: centerY,
      r: radius,
      class: "shell-orbit"
    });

    electronShells.appendChild(orbit);

    for (let i = 0; i < amount; i++) {
      const angle =
        (2 * Math.PI * i) / amount - Math.PI / 2;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      const electron = createSvgElement("circle", {
        cx: x,
        cy: y,
        r: 7,
        class: "electron-particle"
      });

      electronShells.appendChild(electron);
    }
  });
}

// 9. Desenhar nuvem eletrônica simplificada

function drawElectronCloud() {
  if (!electronCloud) return;

  electronCloud.innerHTML = "";

  const centerX = 300;
  const centerY = 300;

  // A nuvem é uma representação ilustrativa.
  const visibleElectrons = Math.min(electrons, 118);

  for (let i = 0; i < visibleElectrons; i++) {
    const angle = i * 2.399;
    const distance = 55 + Math.sqrt(i) * 3.5;

    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    const dot = createSvgElement("circle", {
      cx: x,
      cy: y,
      r: 3,
      class: "cloud-electron"
    });

    electronCloud.appendChild(dot);
  }
}

function setModel(model) {
  currentModel = model;

  const isBohr = currentModel === "bohr";

  if (visualTitle) {
    visualTitle.textContent = isBohr
      ? "Modelo de Bohr"
      : "Nuvem eletrônica";
  }

  if (modelBadge) {
    modelBadge.textContent = isBohr
      ? "Modelo 1 de 2"
      : "Modelo 2 de 2";
  }

  if (bohrButton) {
    bohrButton.classList.toggle("active", isBohr);
    bohrButton.setAttribute("aria-pressed", String(isBohr));
  }

  if (cloudButton) {
    cloudButton.classList.toggle("active", !isBohr);
    cloudButton.setAttribute("aria-pressed", String(!isBohr));
  }

  if (electronShells) {
    electronShells.style.display = isBohr ? "" : "none";
  }

  if (electronCloud) {
    electronCloud.style.display = isBohr ? "none" : "";
  }

  if (atomNucleus) {
    atomNucleus.style.display = "";
  }
}
// 10. Atualizar o experimento
function updateAtom() {
  updateValues();
  drawNucleus();
  drawBohrModel();
  drawElectronCloud();
  setModel(currentModel);
}

bohrButton?.addEventListener("click", () => {
  setModel("bohr");
});

cloudButton?.addEventListener("click", () => {
  setModel("cloud");
});

// 11. Reiniciar átomo
resetButton?.addEventListener("click", () => {
  protons = 1;
  neutrons = 0;
  electrons = 1;

  updateAtom();
});

// 15. Inicialização
updateAtom();