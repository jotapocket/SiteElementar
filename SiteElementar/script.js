
/* =================================
   ELEMENTOS HTML
================================= */

const table = document.querySelector("#periodicTable");
const searchInput = document.querySelector("#searchInput");
const clearSearch = document.querySelector("#clearSearch");
const details = document.querySelector("#elementDetails");
const status = document.querySelector("#resultsStatus");

const filterButtons = [
  ...document.querySelectorAll(".filter-button")
];

const themeToggle = document.querySelector("#themeToggle");

const accessibilityToggle =
  document.querySelector("#accessibilityToggle");

const accessibilityPanel =
  document.querySelector("#accessibilityPanel");

const closeAccessibility =
  document.querySelector("#closeAccessibility");

const decreaseText =
  document.querySelector("#decreaseText");

const increaseText =
  document.querySelector("#increaseText");

const resetText =
  document.querySelector("#resetText");

const textSizeValue =
  document.querySelector("#textSizeValue");

const contrastToggle =
  document.querySelector("#contrastToggle");

const comparisonStatus =
  document.querySelector("#comparisonStatus");

const compareButton =
  document.querySelector("#compareButton");

const clearComparison =
  document.querySelector("#clearComparison");

const comparisonResult =
  document.querySelector("#comparisonResult");


/* =================================
   ESTADO ATUAL DA PÁGINA
================================= */

let activeFilter = "all";
let selectedNumber = null;

let textScale =
  Number(
    localStorage.getItem("elementar-text-scale")
  ) || 100;

let comparisonSelection = [];


/* =================================
   PAINEL DE ACESSIBILIDADE
================================= */

function openAccessibility() {
  accessibilityPanel.hidden = false;

  accessibilityToggle.setAttribute(
    "aria-expanded",
    "true"
  );
}

function closeAccessibilityPanel(returnFocus = true) {
  accessibilityPanel.hidden = true;

  accessibilityToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  if (returnFocus) {
    accessibilityToggle.focus();
  }
}

accessibilityToggle.addEventListener("click", () => {
  const isOpen =
    accessibilityToggle.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeAccessibilityPanel(false);
  } else {
    openAccessibility();
  }
});

closeAccessibility.addEventListener("click", () => {
  closeAccessibilityPanel();
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !accessibilityPanel.hidden
  ) {
    closeAccessibilityPanel();
  }
});


/* =================================
   TAMANHO DO TEXTO
================================= */

function updateTextSize() {
  document.documentElement.style.setProperty(
    "--text-scale",
    `${textScale / 100}`
  );

  localStorage.setItem(
    "elementar-text-scale",
    String(textScale)
  );

  textSizeValue.textContent = `${textScale}%`;

  decreaseText.disabled = textScale <= 80;
  increaseText.disabled = textScale >= 150;
}

decreaseText.addEventListener("click", () => {
  textScale = Math.max(80, textScale - 10);
  updateTextSize();
});

increaseText.addEventListener("click", () => {
  textScale = Math.min(150, textScale + 10);
  updateTextSize();
});

resetText.addEventListener("click", () => {
  textScale = 100;
  updateTextSize();
});


/* =================================
   ALTO CONTRASTE
================================= */

contrastToggle.addEventListener("click", () => {
  const enabled =
    document.documentElement.dataset.contrast !== "high";

  const contrast =
    enabled ? "high" : "normal";

  document.documentElement.dataset.contrast = contrast;

  localStorage.setItem(
    "elementar-contrast",
    contrast
  );

  contrastToggle.setAttribute(
    "aria-pressed",
    String(enabled)
  );

  contrastToggle.textContent =
    enabled
      ? "Desativar alto contraste"
      : "Ativar alto contraste";
});


/* =================================
   TEMA CLARO / ESCURO
================================= */

themeToggle.addEventListener("click", () => {
  const dark =
    document.documentElement.dataset.theme !== "dark";

  const theme =
    dark ? "dark" : "light";

  document.documentElement.dataset.theme = theme;

  localStorage.setItem(
    "elementar-theme",
    theme
  );

  themeToggle.setAttribute(
    "aria-pressed",
    String(dark)
  );

  themeToggle.textContent =
    dark ? "☀️ Tema claro" : "🌙 Tema escuro";
});


/* =================================
   IDENTIFICA A FAMÍLIA VISUAL
================================= */

function getVisualClass(el) {
  const n = el.n;

  if (n >= 57 && n <= 71) {
    return "lanthanide";
  }

  if (n >= 89 && n <= 103) {
    return "actinide";
  }

  if (
    (n >= 21 && n <= 30) ||
    (n >= 39 && n <= 48) ||
    (n >= 72 && n <= 80) ||
    (n >= 104 && n <= 112)
  ) {
    return "transition";
  }

  if (
    [13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116]
      .includes(n)
  ) {
    return "post-transition";
  }

  return el.type;
}

/* =================================
   COMPARAÇÃO DE ELEMENTOS
================================= */

// Atualiza o contador e os botões
function updateComparisonStatus() {
  const count = comparisonSelection.length;

  comparisonStatus.textContent =
    count === 0
      ? "Nenhum elemento selecionado para comparação."
      : count === 1
        ? "1 de 2 elementos selecionados. Escolha mais um."
        : "2 de 2 elementos selecionados. Pronto para comparar!";

  compareButton.disabled = count !== 2;
  clearComparison.disabled = count === 0;
}


// Seleciona ou remove um elemento
function toggleComparison(el) {
  const alreadySelected =
    comparisonSelection.includes(el.n);

  if (alreadySelected) {
    comparisonSelection =
      comparisonSelection.filter((n) => n !== el.n);
  } else {
    if (comparisonSelection.length >= 2) {
      comparisonStatus.textContent =
        "Você já selecionou 2 elementos. Remova um antes de escolher outro.";
      return;
    }

    comparisonSelection.push(el.n);
  }

  updateComparisonStatus();
  renderTable();
}


// Limpa a seleção e o resultado
function resetComparison() {
  comparisonSelection = [];

  comparisonResult.innerHTML = `
    <p>
      Escolha dois elementos na tabela para começar a comparação.
    </p>
  `;

  updateComparisonStatus();
  renderTable();
}


// Cria a comparação lado a lado
function renderComparison() {
  if (comparisonSelection.length !== 2) {
    comparisonStatus.textContent =
      "Selecione exatamente 2 elementos para comparar.";
    return;
  }

  const first = elements.find(
    (el) => el.n === comparisonSelection[0]
  );

  const second = elements.find(
    (el) => el.n === comparisonSelection[1]
  );

  if (!first || !second) {
    comparisonStatus.textContent =
      "Não foi possível encontrar os elementos selecionados.";
    return;
  }

  const properties = [
    ["Número atômico", first.n, second.n],
    ["Símbolo", first.s, second.s],
    ["Família", first.family, second.family],
    ["Estado físico", first.state, second.state],
    ["Onde aparece", first.where, second.where],
    ["Você sabia?", first.fact, second.fact]
  ];

  comparisonResult.innerHTML = `
    <div class="comparison-grid">
      <div class="comparison-element">
        <span class="detail-symbol ${getVisualClass(first)}"
          aria-hidden="true">${first.s}</span>
        <h3>${first.name}</h3>
        <p>Número atômico: ${first.n}</p>
      </div>

      <div class="comparison-element">
        <span class="detail-symbol ${getVisualClass(second)}"
          aria-hidden="true">${second.s}</span>
        <h3>${second.name}</h3>
        <p>Número atômico: ${second.n}</p>
      </div>
    </div>

    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th scope="col">Propriedade</th>
            <th scope="col">${first.name}</th>
            <th scope="col">${second.name}</th>
          </tr>
        </thead>

        <tbody>
          ${properties.map(([label, value1, value2]) => `
            <tr>
              <th scope="row">${label}</th>
              <td>${value1}</td>
              <td>${value2}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  comparisonStatus.textContent =
    `Comparando ${first.name} e ${second.name}.`;
}


// Eventos dos botões de comparação
compareButton.addEventListener("click", renderComparison);

clearComparison.addEventListener("click", resetComparison);

/* =================================
   DESENHA A TABELA
================================= */

function renderTable() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  const filtered = elements.filter((el) => {
    const name = el.name.toLocaleLowerCase("pt-BR");
    const symbol = el.s.toLocaleLowerCase("pt-BR");

    return (
      !query ||
      name.includes(query) ||
      symbol.includes(query) ||
      String(el.n) === query
    );
  });

  table.replaceChildren();

  for (const el of elements) {
    const button = document.createElement("button");

    button.type = "button";

    button.className =
      `element-card ${el.type} ${getVisualClass(el)}`;

    button.style.gridColumn = String(el.col);
    button.style.gridRow = String(el.row);

    button.dataset.number = String(el.n);

    button.setAttribute(
      "aria-label",
      `${el.n}, ${el.name}, símbolo ${el.s}`
    );


    button.setAttribute(
      "aria-pressed",
      String(comparisonSelection.includes(el.n))
    );

    button.classList.toggle(
      "is-selected",
      comparisonSelection.includes(el.n)
    );

    button.innerHTML = `
      <span class="atomic-number">${el.n}</span>
      <span class="symbol">${el.s}</span>
      <span class="element-name">${el.name}</span>
    `;

    const matchesQuery = filtered.some(
      (item) => item.n === el.n
    );

    const matchesFilter =
      activeFilter === "all" ||
      el.type === activeFilter;

    button.hidden = !matchesQuery;

    button.classList.toggle(
      "is-dimmed",
      activeFilter !== "all" && !matchesFilter
    );

    button.classList.toggle(
      "is-match",
      activeFilter !== "all" && matchesFilter
    );


    button.addEventListener("click", () => {
      toggleComparison(el);
      showDetails(el);
    });

    table.append(button);
  }

  status.textContent =
    `${filtered.length} de ${elements.length} elementos encontrados.`;
}

/* =================================
   LINKS DA WIKIPÉDIA
================================= */

const wikipediaLinks = {
  "Rádio": "Rádio_(elemento_químico)",
  "Índio": "Índio_(elemento_químico)"
};

/* =================================
   MOSTRA INFORMAÇÕES DO ELEMENTO
================================= */

function showDetails(el) {
  selectedNumber = el.n;

  renderTable();

  const wikipediaPage =
  wikipediaLinks[el.name] ||
  el.name.replaceAll(" ", "_");

const wikipediaUrl =
  `https://pt.wikipedia.org/wiki/${encodeURIComponent(
    wikipediaPage
  )}`;

  details.innerHTML = `
    <div class="detail-top">
      <span class="detail-symbol ${getVisualClass(el)}" aria-hidden="true">
        ${el.s}
      </span>

      <div>
        <p class="small-note">Elemento ${el.n}</p>
        <h3 id="detailTitle">${el.name}</h3>
        <p>${el.family}</p>
      </div>
    </div>

    <ul class="detail-facts">
      <li>
        <strong>Número atômico:</strong>
        ${el.n}
      </li>

      <li>
        <strong>Símbolo:</strong>
        ${el.s}
      </li>

      <li>
        <strong>Família:</strong>
        ${el.family}
      </li>

      <li>
        <strong>Estado à temperatura ambiente:</strong>
        ${el.state}
      </li>

      <li>
        <strong>Onde aparece:</strong>
        ${el.where}
      </li>

      <li>
        <strong>Você sabia?</strong>
        ${el.fact}
      </li>
    </ul>

    <div class="detail-actions">
      <button
        class="button button-primary"
        id="speakButton"
        type="button"
      >
        🔊 Ouvir informações
      </button>

      <a
        class="button button-secondary"
        href="${wikipediaUrl}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Saiba mais ↗
      </a>

      <button
        class="button button-secondary"
        id="closeDetails"
        type="button"
      >
        Fechar
      </button>
    </div>
  `;

  document
    .querySelector("#speakButton")
    .addEventListener("click", () => {
      speakElement(el);
    });

  document
    .querySelector("#closeDetails")
    .addEventListener("click", clearDetails);
}


/* =================================
   LIMPA O PAINEL DE INFORMAÇÕES
================================= */

function clearDetails() {
  selectedNumber = null;

  details.innerHTML = `
    <div class="empty-detail">
      <span class="detail-symbol" aria-hidden="true">?</span>
      <h3 id="detailTitle">Escolha um elemento</h3>
      <p>As informações aparecerão aqui.</p>
    </div>
  `;

  renderTable();
}


/* =================================
   LEITURA EM VOZ ALTA
================================= */

function speakElement(el) {
  if (!("speechSynthesis" in window)) {
    status.textContent =
      "A leitura em voz alta não está disponível neste navegador.";

    return;
  }

  window.speechSynthesis.cancel();

  const text = `
    ${el.name}.
    Símbolo ${el.s}.
    Número atômico ${el.n}.
    Família: ${el.family}.
    Estado: ${el.state}.
    Onde aparece: ${el.where}
    Você sabia? ${el.fact}
  `;

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "pt-BR";

  window.speechSynthesis.speak(utterance);
}


/* =================================
   BUSCA
================================= */

searchInput.addEventListener("input", renderTable);


/* =================================
   LIMPAR BUSCA
================================= */

clearSearch.addEventListener("click", () => {
  searchInput.value = "";

  renderTable();

  searchInput.focus();
});


/* =================================
   FILTROS POR FAMÍLIA
================================= */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.setAttribute(
        "aria-pressed",
        String(item === button)
      );
    });

    renderTable();
  });
});

/* =================================
   RESTAURA ESTADO DOS CONTROLES
================================= */

function restoreAccessibilityControls() {
  const root = document.documentElement;

  /* Tema */

  const dark =
    root.dataset.theme === "dark";

  themeToggle.setAttribute(
    "aria-pressed",
    String(dark)
  );

  themeToggle.textContent =
    dark
      ? "☀️ Tema claro"
      : "🌙 Tema escuro";


  /* Alto contraste */

  const highContrast =
    root.dataset.contrast === "high";

  contrastToggle.setAttribute(
    "aria-pressed",
    String(highContrast)
  );

  contrastToggle.textContent =
    highContrast
      ? "Desativar alto contraste"
      : "Ativar alto contraste";


  /* Tamanho do texto */

  textScale =
    Number(
      localStorage.getItem("elementar-text-scale")
    ) || 100;

  updateTextSize();
}

/* =================================
   INICIA A PÁGINA
================================= */

restoreAccessibilityControls();
updateComparisonStatus();
renderTable();