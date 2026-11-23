// ==========================================================================
// DADOS E ESTADO DO PROTÓTIPO TRILHA (2026)
// ==========================================================================
const state = {
  selectedSubjectId: "matematica",
  dailyGoalDone: 2,
  dailyGoalTotal: 3,
  completedActivities: 24,
  showOptionalHolidays: false,
  searchQuery: "",
  activeFilter: "all",
  currentSlide: 0,
  a11y: {
    theme: "light",
    highContrast: false,
    fontScale: 100
  },
  subjects: [
    {
      id: "matematica",
      name: "Matemática",
      professor: "Prof. Rafael Costa",
      daysLabel: "SEG · QUA",
      scheduleFull: "Segunda e quarta · 16h às 17h",
      colorKey: "blue",
      dotColor: "#2563eb",
      completedSteps: 12,
      totalSteps: 20,
      nextStepLabel: "Próximo: funções do 2º grau",
      objective: "Ganhar confiança em funções e resolver questões do ENEM.",
      material: "Apostila de Matemática",
      steps: [
        { num: 13, tag: "PRÓXIMO PASSO", title: "Funções do 2º grau", meta: "Leitura + prática · 30 min", active: true },
        { num: 14, tag: "NA SEQUÊNCIA", title: "Gráficos e vértice da parábola", meta: "Estudo orientado · 25 min", active: false },
        { num: 15, tag: "NA SEQUÊNCIA", title: "Lista de exercícios", meta: "Estudo orientado · 25 min", active: false }
      ]
    },
    {
      id: "biologia",
      name: "Biologia",
      professor: "Profa. Marina Lima",
      daysLabel: "TER · QUI",
      scheduleFull: "Terça e quinta · 14h às 15h",
      colorKey: "green",
      dotColor: "#059669",
      completedSteps: 7,
      totalSteps: 20,
      nextStepLabel: "Próximo: divisão celular",
      objective: "Compreender citologia, genética e ecologia com mapas mentais.",
      material: "Apostila de Biologia",
      steps: [
        { num: 8, tag: "PRÓXIMO PASSO", title: "Divisão celular (Mitose e Meiose)", meta: "Leitura + resumo · 30 min", active: true },
        { num: 9, tag: "NA SEQUÊNCIA", title: "Síntese proteica e DNA", meta: "Estudo orientado · 25 min", active: false },
        { num: 10, tag: "NA SEQUÊNCIA", title: "Questões comentadas", meta: "Prática · 25 min", active: false }
      ]
    },
    {
      id: "redacao",
      name: "Redação",
      professor: "Profa. Júlia Alves",
      daysLabel: "SEXTA",
      scheduleFull: "Sexta-feira · 15h às 16h30",
      colorKey: "purple",
      dotColor: "#7c3aed",
      completedSteps: 9,
      totalSteps: 12,
      nextStepLabel: "Próximo: repertório sociocultural",
      objective: "Estruturar argumentação dissertativa e alcançar nota máxima.",
      material: "Guia de Redação Nota 1000",
      steps: [
        { num: 10, tag: "PRÓXIMO PASSO", title: "Repertório sociocultural produtivo", meta: "Leitura + fichamento · 30 min", active: true },
        { num: 11, tag: "NA SEQUÊNCIA", title: "Coesão e conectivos interparágrafos", meta: "Estudo orientado · 25 min", active: false },
        { num: 12, tag: "NA SEQUÊNCIA", title: "Proposta de intervenção completa", meta: "Prática escrita · 40 min", active: false }
      ]
    }
  ],
  agenda: [
    {
      day: "19",
      month: "NOV",
      badgeClass: "blue",
      title: "Revisão de funções",
      subtitle: "Matemática · 16h às 17h"
    },
    {
      day: "20",
      month: "NOV",
      badgeClass: "orange",
      title: "Consciência Negra",
      subtitle: "Feriado nacional · dia de descanso"
    }
  ]
};

// ==========================================================================
// CONTROLE DE ACESSIBILIDADE (WCAG: TEMA, ALTO CONTRASTE E FONTE)
// ==========================================================================
function applyAccessibilitySettings() {
  const htmlEl = document.documentElement;
  htmlEl.setAttribute("data-theme", state.a11y.theme);
  htmlEl.setAttribute("data-contrast", state.a11y.highContrast ? "high" : "normal");
  htmlEl.style.fontSize = `${state.a11y.fontScale}%`;

  document.getElementById("font-scale-indicator").textContent = `${state.a11y.fontScale}%`;
  document.getElementById("btn-theme-light").setAttribute("aria-pressed", String(state.a11y.theme === "light" && !state.a11y.highContrast));
  document.getElementById("btn-theme-dark").setAttribute("aria-pressed", String(state.a11y.theme === "dark" && !state.a11y.highContrast));
  document.getElementById("btn-contrast-toggle").setAttribute("aria-pressed", String(state.a11y.highContrast));

  try {
    localStorage.setItem("trilha_a11y", JSON.stringify(state.a11y));
  } catch (e) {
    // Ignora caso localStorage esteja bloqueado
  }
}

function loadAccessibilitySettings() {
  try {
    const saved = localStorage.getItem("trilha_a11y");
    if (saved) {
      const parsed = JSON.parse(saved);
      state.a11y = { ...state.a11y, ...parsed };
    }
  } catch (e) {
    // Usa padrões
  }
  applyAccessibilitySettings();
}

// ==========================================================================
// CARROSSEL DE IMAGENS (SEÇÃO SOBRE NÓS)
// ==========================================================================
function setupCarouselPlaceholders() {
  document.querySelectorAll(".carousel-media img").forEach((img) => {
    img.addEventListener("error", () => {
      const label = img.dataset.placeholder || "Adicione sua imagem na pasta img/";
      const svgFallback = `
        <svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
          <rect width="640" height="400" fill="#ffedd5"/>
          <rect x="24" y="24" width="592" height="352" rx="16" fill="none" stroke="#c2380c" stroke-width="2" stroke-dasharray="8 6"/>
          <circle cx="320" cy="155" r="34" fill="#c2380c" opacity="0.15"/>
          <path d="M292 175 L312 150 L328 168 L340 156 L354 175 Z" fill="#c2380c"/>
          <circle cx="336" cy="144" r="6" fill="#c2380c"/>
          <text x="320" y="222" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="#7c2d12" text-anchor="middle">${label}</text>
          <text x="320" y="248" font-family="Inter, sans-serif" font-size="13" fill="#9a2b08" text-anchor="middle">Salve o arquivo na pasta img/ para exibir sua foto aqui</text>
        </svg>
      `;
      img.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgFallback)}`;
    }, { once: true });
  });
}

function updateCarousel(index) {
  const track = document.getElementById("about-carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  const counter = document.getElementById("carousel-counter");

  if (!track || slides.length === 0) return;

  const total = slides.length;
  state.currentSlide = (index + total) % total;

  track.style.transform = `translateX(-${state.currentSlide * 100}%)`;

  slides.forEach((slide, i) => {
    slide.setAttribute("aria-hidden", String(i !== state.currentSlide));
  });

  dots.forEach((dot, i) => {
    const isActive = i === state.currentSlide;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
  });

  if (counter) {
    counter.textContent = `${state.currentSlide + 1} / ${total}`;
  }
}

// ==========================================================================
// FILTRAGEM E RENDERIZAÇÃO DE MATÉRIAS
// ==========================================================================
function getFilteredSubjects() {
  return state.subjects.filter((subj) => {
    const percent = Math.round((subj.completedSteps / subj.totalSteps) * 100);
    const query = state.searchQuery.toLowerCase();

    const matchesSearch =
      !query ||
      subj.name.toLowerCase().includes(query) ||
      subj.professor.toLowerCase().includes(query) ||
      subj.nextStepLabel.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (state.activeFilter === "seg-qua") {
      return subj.daysLabel.includes("SEG") || subj.daysLabel.includes("QUA");
    }
    if (state.activeFilter === "ter-qui") {
      return subj.daysLabel.includes("TER") || subj.daysLabel.includes("QUI");
    }
    if (state.activeFilter === "sexta") {
      return subj.daysLabel.includes("SEX") || subj.daysLabel.includes("SÁB") || subj.daysLabel.includes("DOM");
    }
    if (state.activeFilter === "in-progress") {
      return percent < 70;
    }

    return true;
  });
}

function renderSubjects() {
  const sidebarList = document.getElementById("sidebar-subject-list");
  const grid = document.getElementById("subjects-grid");
  const counter = document.getElementById("subjects-counter");

  sidebarList.innerHTML = "";
  grid.innerHTML = "";

  state.subjects.forEach((subj) => {
    const li = document.createElement("li");
    const sideBtn = document.createElement("button");
    sideBtn.type = "button";
    sideBtn.innerHTML = `<span class="subject-dot" style="background:${subj.dotColor}"></span><span>${subj.name}</span>`;
    sideBtn.addEventListener("click", () => openSubjectDetail(subj.id));
    li.appendChild(sideBtn);
    sidebarList.appendChild(li);
  });

  const filtered = getFilteredSubjects();

  if (filtered.length === 0) {
    const emptyMsg = document.createElement("div");
    emptyMsg.className = "empty-search-state";
    emptyMsg.textContent = "Nenhuma matéria encontrada para esse filtro ou termo de pesquisa.";
    grid.appendChild(emptyMsg);
  } else {
    filtered.forEach((subj) => {
      const percent = Math.round((subj.completedSteps / subj.totalSteps) * 100);

      const card = document.createElement("article");
      card.className = "subject-card";
      card.setAttribute("tabindex", "0");
      card.innerHTML = `
        <div>
          <div class="subject-card-top">
            <div class="subject-title-wrap">
              <div class="subject-book-icon" style="background: var(--${subj.colorKey}-tint); color: var(--${subj.colorKey}-text);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <div>
                <h3>${subj.name}</h3>
                <span class="subject-prof">${subj.professor}</span>
              </div>
            </div>
            <span class="schedule-badge" style="background: var(--${subj.colorKey}-tint); color: var(--${subj.colorKey}-text);">
              ${subj.daysLabel}
            </span>
          </div>

          <div class="subject-progress-area">
            <div class="progress-labels">
              <span>Trilha de estudos</span>
              <strong>${percent}%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${percent}%; background: var(--${subj.colorKey});"></div>
            </div>
            <span class="steps-caption">${subj.completedSteps} de ${subj.totalSteps} etapas concluídas</span>
          </div>
        </div>

        <div class="subject-card-footer" style="color: var(--${subj.colorKey}-text);">
          <span>${subj.nextStepLabel}</span>
          <span aria-hidden="true">›</span>
        </div>
      `;

      card.addEventListener("click", () => openSubjectDetail(subj.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openSubjectDetail(subj.id);
        }
      });

      grid.appendChild(card);
    });
  }

  const addCard = document.createElement("button");
  addCard.type = "button";
  addCard.className = "add-subject-placeholder-card";
  addCard.innerHTML = `
    <span class="plus-big" aria-hidden="true">+</span>
    <strong>Uma nova matéria, um novo começo.</strong>
    <p>Monte sua próxima trilha de estudos.</p>
    <span class="cta-link">Adicionar matéria →</span>
  `;
  addCard.addEventListener("click", () => openModal("modal-add-subject"));
  grid.appendChild(addCard);

  counter.textContent =
    filtered.length === state.subjects.length
      ? `${state.subjects.length} matérias ativas`
      : `Exibindo ${filtered.length} de ${state.subjects.length} matérias`;
}

// ==========================================================================
// NAVEGAÇÃO ENTRE VIEWS
// ==========================================================================
function switchView(viewName) {
  document.querySelectorAll(".view-section").forEach((sec) => sec.classList.remove("active"));
  document.querySelectorAll(".sidebar .nav-item").forEach((btn) => btn.classList.remove("active"));

  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add("active");

  const navBtn = document.querySelector(`.sidebar .nav-item[data-view="${viewName}"]`);
  if (navBtn) navBtn.classList.add("active");

  const breadcrumb = document.getElementById("topbar-breadcrumb");
  if (viewName === "dashboard") {
    breadcrumb.innerHTML = `<strong>Meu espaço</strong><span>/</span><span>Visão geral</span>`;
  } else if (viewName === "how-to-study") {
    breadcrumb.innerHTML = `<strong>Meu espaço</strong><span>/</span><span>Como estudar</span>`;
  } else if (viewName === "about-us") {
    breadcrumb.innerHTML = `<strong>Meu espaço</strong><span>/</span><span>Sobre nós</span>`;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSubjectDetail(subjectId) {
  const subj = state.subjects.find((s) => s.id === subjectId);
  if (!subj) return;

  state.selectedSubjectId = subjectId;
  const percent = Math.round((subj.completedSteps / subj.totalSteps) * 100);

  document.getElementById("topbar-breadcrumb").innerHTML = `
    <strong>Minhas matérias</strong><span>/</span><span>${subj.name}</span>
  `;
  document.getElementById("detail-breadcrumb").textContent = `MINHAS MATÉRIAS / ${subj.name.toUpperCase()}`;
  document.getElementById("detail-title").textContent = subj.name;
  document.getElementById("detail-meta").textContent = `${subj.professor} · ${subj.scheduleFull}`;
  document.getElementById("detail-objective").textContent = subj.objective;
  document.getElementById("detail-percent").textContent = `${percent}%`;
  document.getElementById("detail-steps-summary").textContent = `${subj.completedSteps} de ${subj.totalSteps} etapas concluídas`;
  document.getElementById("detail-progress-bar").style.width = `${percent}%`;
  document.getElementById("detail-material-name").textContent = subj.material;

  const stepsContainer = document.getElementById("detail-steps-list");
  stepsContainer.innerHTML = "";

  subj.steps.forEach((step, idx) => {
    const item = document.createElement("div");
    item.className = "step-item-card";
    item.innerHTML = `
      <div class="step-item-left">
        <div class="step-number-box">${step.num}</div>
        <div>
          <span class="step-tag">${step.tag}</span>
          <strong>${step.title}</strong>
          <small>${step.meta}</small>
        </div>
      </div>
      ${
        step.active
          ? `<button type="button" class="btn-step-start" data-step-index="${idx}">Começar esta etapa →</button>`
          : ""
      }
    `;
    stepsContainer.appendChild(item);
  });

  stepsContainer.querySelectorAll(".btn-step-start").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (subj.completedSteps < subj.totalSteps) {
        subj.completedSteps += 1;
        state.completedActivities += 1;
        document.getElementById("completed-activities-count").textContent = `${state.completedActivities} atividades`;
        renderSubjects();
        openSubjectDetail(subj.id);
      }
    });
  });

  switchView("subject-detail");
}

// ==========================================================================
// CALENDÁRIO DE NOVEMBRO 2026 & AGENDA
// ==========================================================================
function renderMiniCalendar() {
  const container = document.getElementById("mini-cal-days");
  container.innerHTML = "";

  const holidays = [2, 15, 20];
  const eventDays = [19, 21];

  for (let day = 1; day <= 30; day++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cal-day-btn";
    btn.textContent = day;

    if (day === 18) btn.classList.add("today");
    else if (holidays.includes(day)) btn.classList.add("holiday");

    if (eventDays.includes(day)) btn.classList.add("has-event");

    btn.addEventListener("click", () => {
      const weekNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
      const weekDay = weekNames[(day - 1) % 7];
      document.getElementById("event-selected-date").textContent = `${weekDay}, ${day} de novembro de 2026`;
      openModal("modal-add-event");
    });

    container.appendChild(btn);
  }
}

function renderAgenda() {
  const list = document.getElementById("agenda-list");
  list.innerHTML = "";

  state.agenda.forEach((item) => {
    const row = document.createElement("div");
    row.className = "agenda-item";
    row.innerHTML = `
      <div class="agenda-date-badge ${item.badgeClass}">
        ${item.day}
        <span>${item.month}</span>
      </div>
      <div class="agenda-item-info">
        <strong>${item.title}</strong>
        <span>${item.subtitle}</span>
      </div>
    `;
    list.appendChild(row);
  });
}

// ==========================================================================
// CALENDÁRIO ANUAL 2026 (12 MESES)
// ==========================================================================
function renderAnnualCalendar() {
  const grid = document.getElementById("annual-calendar-grid");
  grid.innerHTML = "";

  const months = [
    { name: "Janeiro", holidays: [1], optional: [] },
    { name: "Fevereiro", holidays: [], optional: [16, 17] },
    { name: "Março", holidays: [], optional: [] },
    { name: "Abril", holidays: [3, 21], optional: [] },
    { name: "Maio", holidays: [1], optional: [] },
    { name: "Junho", holidays: [], optional: [4] },
    { name: "Julho", holidays: [], optional: [] },
    { name: "Agosto", holidays: [], optional: [] },
    { name: "Setembro", holidays: [7], optional: [] },
    { name: "Outubro", holidays: [12], optional: [28] },
    { name: "Novembro", holidays: [2, 15, 20], optional: [] },
    { name: "Dezembro", holidays: [25], optional: [] }
  ];

  const weekHeaders = ["D", "S", "T", "Q", "Q", "S", "S"];

  months.forEach((m, monthIdx) => {
    const firstDay = new Date(2026, monthIdx, 1).getDay();
    const totalDays = new Date(2026, monthIdx + 1, 0).getDate();

    const box = document.createElement("div");
    box.className = "month-box";

    let daysHtml = weekHeaders.map((w) => `<span class="w-head">${w}</span>`).join("");

    for (let blank = 0; blank < firstDay; blank++) {
      daysHtml += `<span></span>`;
    }

    for (let d = 1; d <= totalDays; d++) {
      let cls = "";
      if (m.holidays.includes(d)) cls = "is-holiday";
      else if (state.showOptionalHolidays && m.optional.includes(d)) cls = "is-optional";
      daysHtml += `<span class="${cls}">${d}</span>`;
    }

    box.innerHTML = `
      <h3>${m.name}</h3>
      <div class="month-days-grid">${daysHtml}</div>
    `;
    grid.appendChild(box);
  });
}

// ==========================================================================
// CONTROLE DE MODAIS, CARROSSEL, FILTROS, ACESSIBILIDADE E FORMULÁRIOS
// ==========================================================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = false;
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop").forEach((m) => {
    m.hidden = true;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadAccessibilitySettings();
  setupCarouselPlaceholders();
  renderSubjects();
  renderMiniCalendar();
  renderAgenda();
  renderAnnualCalendar();

  // Controles do Carrossel (Sobre nós)
  document.getElementById("carousel-prev").addEventListener("click", () => {
    updateCarousel(state.currentSlide - 1);
  });

  document.getElementById("carousel-next").addEventListener("click", () => {
    updateCarousel(state.currentSlide + 1);
  });

  document.querySelectorAll(".carousel-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.slide, 10) || 0;
      updateCarousel(idx);
    });
  });

  // Navegação por teclado nas setas quando a aba Sobre nós estiver ativa
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
      return;
    }

    const aboutView = document.getElementById("view-about-us");
    if (aboutView && aboutView.classList.contains("active")) {
      if (e.key === "ArrowLeft") updateCarousel(state.currentSlide - 1);
      if (e.key === "ArrowRight") updateCarousel(state.currentSlide + 1);
    }
  });

  // Toggle da barra de acessibilidade
  document.getElementById("btn-toggle-a11y").addEventListener("click", (e) => {
    const panel = document.getElementById("accessibility-panel");
    const isHidden = panel.hidden;
    panel.hidden = !isHidden;
    e.currentTarget.setAttribute("aria-expanded", String(isHidden));
  });

  // Controles de Tema e Contraste
  document.getElementById("btn-theme-light").addEventListener("click", () => {
    state.a11y.theme = "light";
    state.a11y.highContrast = false;
    applyAccessibilitySettings();
  });

  document.getElementById("btn-theme-dark").addEventListener("click", () => {
    state.a11y.theme = "dark";
    state.a11y.highContrast = false;
    applyAccessibilitySettings();
  });

  document.getElementById("btn-contrast-toggle").addEventListener("click", () => {
    state.a11y.highContrast = !state.a11y.highContrast;
    applyAccessibilitySettings();
  });

  // Controles de Tamanho da Fonte (-A / A / +A)
  document.getElementById("btn-font-decrease").addEventListener("click", () => {
    if (state.a11y.fontScale > 85) {
      state.a11y.fontScale -= 5;
      applyAccessibilitySettings();
    }
  });

  document.getElementById("btn-font-reset").addEventListener("click", () => {
    state.a11y.fontScale = 100;
    applyAccessibilitySettings();
  });

  document.getElementById("btn-font-increase").addEventListener("click", () => {
    if (state.a11y.fontScale < 130) {
      state.a11y.fontScale += 5;
      applyAccessibilitySettings();
    }
  });

  // Pesquisa em tempo real de matérias
  document.getElementById("subject-search-input").addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    renderSubjects();
  });

  // Abas de filtro de matérias
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      state.activeFilter = tab.dataset.filter;
      renderSubjects();
    });
  });

  // Navegação por views
  document.querySelectorAll("[data-view]").forEach((el) => {
    el.addEventListener("click", () => switchView(el.getAttribute("data-view")));
  });

  // Botão "Continuar de onde parei"
  document.getElementById("btn-continue-study").addEventListener("click", () => {
    openSubjectDetail("matematica");
  });

  // Acordeão "Minhas matérias"
  document.getElementById("toggle-subjects-menu").addEventListener("click", (e) => {
    const list = document.getElementById("sidebar-subject-list");
    const isCollapsed = list.classList.toggle("collapsed");
    e.currentTarget.setAttribute("aria-expanded", String(!isCollapsed));
  });

  // Abertura e fechamento de modais
  document.querySelectorAll("[data-modal]").forEach((el) => {
    el.addEventListener("click", () => openModal(el.getAttribute("data-modal")));
  });

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeAllModals);
  });

  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  // Seleção de dias da semana no modal de matéria
  document.querySelectorAll("#subject-days-selector .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => btn.classList.toggle("active"));
  });

  // Submit: Criar nova matéria
  document.getElementById("form-add-subject").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("input-subject-name").value.trim();
    const prof = document.getElementById("input-subject-prof").value.trim();
    const goal = document.getElementById("input-subject-goal").value.trim();

    const selectedDays = Array.from(document.querySelectorAll("#subject-days-selector .pill-btn.active"))
      .map((b) => b.dataset.day.toUpperCase());

    const daysLabel = selectedDays.length ? selectedDays.join(" · ") : "QUI";
    const id = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

    state.subjects.push({
      id: `${id}-${Date.now()}`,
      name,
      professor: `Prof. ${prof}`,
      daysLabel,
      scheduleFull: `${daysLabel} · Horário flexível`,
      colorKey: "teal",
      dotColor: "#0f766e",
      completedSteps: 1,
      totalSteps: 10,
      nextStepLabel: "Próximo: Estrutura atômica",
      objective: goal || `Dominar os fundamentos de ${name}.`,
      material: `Apostila de ${name} — fundamentos.pdf`,
      steps: [
        { num: 1, tag: "PRÓXIMO PASSO", title: "Estrutura atômica", meta: "Leitura + prática · 30 min", active: true },
        { num: 2, tag: "NA SEQUÊNCIA", title: "Tabela periódica", meta: "Estudo orientado · 25 min", active: false },
        { num: 3, tag: "NA SEQUÊNCIA", title: "Exercícios", meta: "Prática · 25 min", active: false }
      ]
    });

    renderSubjects();
    closeAllModals();
  });

  // Seleção de tipo de evento
  document.querySelectorAll("#event-type-selector .pill-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#event-type-selector .pill-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Submit: Salvar evento na agenda
  document.getElementById("form-add-event").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("input-event-title").value.trim();
    const subject = document.getElementById("input-event-subject").value.trim();
    const time = document.getElementById("input-event-time").value.trim();
    const dateText = document.getElementById("event-selected-date").textContent;
    const dayMatch = dateText.match(/(\d+)/);
    const dayNum = dayMatch ? dayMatch[1] : "21";

    state.agenda.push({
      day: dayNum,
      month: "NOV",
      badgeClass: "blue",
      title,
      subtitle: `${subject} · ${time}`
    });

    renderAgenda();
    closeAllModals();
  });

  // Submit: Formulário de Contato (Fale com a gente)
  document.getElementById("form-contact-support").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const topic = document.getElementById("contact-topic").value;
    const protocol = Math.floor(100000 + Math.random() * 900000);

    const feedbackEl = document.getElementById("contact-feedback");
    feedbackEl.textContent = `Mensagem enviada com sucesso, ${name}! Protocolo #${protocol} (${topic}). Responderemos em breve para ${email}.`;
    feedbackEl.hidden = false;

    e.target.reset();
  });

  // Toggle feriados facultativos no calendário anual
  document.getElementById("btn-toggle-optional-holidays").addEventListener("click", (e) => {
    state.showOptionalHolidays = !state.showOptionalHolidays;
    e.currentTarget.textContent = state.showOptionalHolidays
      ? "Ocultar pontos facultativos →"
      : "Ver feriados e pontos facultativos →";
    renderAnnualCalendar();
  });

  // Salvar configurações
  document.getElementById("form-settings").addEventListener("submit", (e) => {
    e.preventDefault();
    const newGoal = parseInt(document.getElementById("setting-daily-sessions").value, 10) || 3;
    state.dailyGoalTotal = newGoal;
    const pct = Math.min(100, Math.round((state.dailyGoalDone / state.dailyGoalTotal) * 100));
    document.getElementById("daily-goal-display").textContent = `${state.dailyGoalDone} de ${state.dailyGoalTotal}`;
    document.getElementById("daily-goal-bar").style.width = `${pct}%`;
    closeAllModals();
  });

  // Botão FAQ -> Guia de estudos
  document.getElementById("btn-faq-to-guide").addEventListener("click", () => {
    closeAllModals();
    switchView("how-to-study");
  });

  // Resumo da etapa na matéria
  document.getElementById("btn-open-summary").addEventListener("click", () => {
    switchView("how-to-study");
  });
});