/* yaad card - Core Application Logic with Window Manager & Importer */

// State Management
let deck = {
  name: "Showcase Deck",
  subject: "Feature Showcase",
  website: "yaad card",
  mrp: "250",
  printMode: "duplex",
  indexCard: true,
  cardCornerRadius: "12px",
  packaging: {
    title: "SHOWCASE PACK",
    subtitle: "ALL CAPABILITIES DEMO",
    mrp: "250",
    website: "yaad card",
    coverImage: "",
    description: "This is a feature-rich showcase deck that demonstrates all capabilities of the yaad card editor.",
    footnote: "Premium cards. Made in India.",
    stripeColors: ["#06b6d4", "#f97316", "#a855f7", "#10b981", "#eab308"],
    fullBleed: false
  },
  cards: []
};

let templates = {};
let activeCardIndex = -1;
let packagingSlots = [true, true, true, true]; // 4 slots on A3 sheet

// Default window positions for reset layout
const DEFAULT_WINDOW_POSITIONS = {
  "win-cards": { left: "10px", top: "50px", width: "280px", height: "500px", open: true },
  "win-card-editor": { left: "300px", top: "50px", width: "500px", height: "550px", open: true },
  "win-anki": { left: "815px", top: "50px", width: "350px", height: "500px", open: true },
  
  // Display packaging preview by default now!
  "win-packaging-preview": { left: "1175px", top: "50px", width: "350px", height: "320px", open: true },
  
  // Hidden by default
  "win-packaging-editor": { left: "300px", top: "100px", width: "420px", height: "550px", open: false },
  "win-packaging-planner": { left: "735px", top: "100px", width: "420px", height: "450px", open: false },
  "win-style-inspector": { left: "735px", top: "100px", width: "420px", height: "480px", open: false },
  "win-prompt-manager": { left: "400px", top: "80px", width: "520px", height: "500px", open: false },
  "win-template-designer": { left: "350px", top: "100px", width: "500px", height: "500px", open: false },
  "win-print-preview": { left: "305px", top: "450px", width: "850px", height: "320px", open: false },
  "win-shortcuts": { left: "550px", top: "150px", width: "400px", height: "320px", open: false }
};

// DOM Elements cache
const elements = {
  // Menu and Top Bar Actions
  menuNewDeck: document.getElementById('menu-new-deck'),
  menuImportAi: document.getElementById('menu-import-ai'),
  menuSaveDeck: document.getElementById('menu-save-deck'),
  menuResetWorkspace: document.getElementById('menu-reset-workspace'),
  menuHelpShortcuts: document.getElementById('menu-help-shortcuts'),
  menuHelpAbout: document.getElementById('menu-help-about'),
  activeDeckName: document.getElementById('active-deck-name'),
  duplexToggle: document.getElementById('duplex-toggle'),
  indexCardToggle: document.getElementById('index-card-toggle'),
  btnPrintCards: document.getElementById('btn-print-cards'),
  btnPrintPack: document.getElementById('btn-print-pack'),
  
  // Windows Desktop
  desktopArea: document.getElementById('desktop-area'),
  
  // Cards List / Navigator
  cardSearchInput: document.getElementById('card-search-input'),
  cardsList: document.getElementById('cards-list'),
  addCardBtn: document.getElementById('add-card-btn'),
  addCustomCardBtn: document.getElementById('add-custom-card-btn'),
  addJsonCardBtn: document.getElementById('add-json-card-btn'),
  
  // Main Card Editor
  cardEditorTitle: document.getElementById('card-editor-title'),
  btnDeleteCardTop: document.getElementById('btn-delete-card-top'),
  emptyState: document.getElementById('editor-empty-state'),
  mainEditorFields: document.getElementById('main-editor-fields'),
  cardTemplateSelect: document.getElementById('card-template-select'),
  cardCornerSelect: document.getElementById('card-corner-select'),
  customThemeColor: document.getElementById('custom-theme-color'),
  frontTitleInput: document.getElementById('front-title-input'),
  frontTaglineInput: document.getElementById('front-tagline-input'),
  frontCategoryInput: document.getElementById('front-category-input'),
  backTitleInput: document.getElementById('back-title-input'),
  backHpInput: document.getElementById('back-hp-input'),
  backTaglineInput: document.getElementById('back-tagline-input'),
  backSummaryInput: document.getElementById('back-summary-input'),
  advancedElementSelect: document.getElementById('advanced-element-select'),
  
  // Previews
  digitalAnkiCard: document.getElementById('digital-anki-card'),
  ankiPrevBtn: document.getElementById('anki-prev-btn'),
  ankiNextBtn: document.getElementById('anki-next-btn'),
  ankiFlipBtn: document.getElementById('anki-flip-btn'),
  
  // Advanced Editors
  elKeyPointsEditor: document.getElementById('el-key_points-editor'),
  keyPointsItems: document.getElementById('key-points-items'),
  addKeyPointBtn: document.getElementById('add-key-point-btn'),
  elTableEditor: document.getElementById('el-table-editor'),
  tableRowsContainer: document.getElementById('table-rows-container'),
  addTableRowBtn: document.getElementById('add-table-row-btn'),
  th1: document.getElementById('th-1'),
  th2: document.getElementById('th-2'),
  elTimelineEditor: document.getElementById('el-timeline-editor'),
  timelineNodesContainer: document.getElementById('timeline-nodes-container'),
  addTimelineNodeBtn: document.getElementById('add-timeline-node-btn'),
  elChartEditor: document.getElementById('el-chart-editor'),
  chartBarsContainer: document.getElementById('chart-bars-container'),
  addChartBarBtn: document.getElementById('add-chart-bar-btn'),
  elDiagramEditor: document.getElementById('el-diagram-editor'),
  asciiDiagramInput: document.getElementById('ascii-diagram-input'),
  
  // Image Uploads & Advanced filters
  cardImageUpload: document.getElementById('card-image-upload'),
  removeCardImageBtn: document.getElementById('remove-card-image-btn'),
  cardBleedToggle: document.getElementById('card-bleed-toggle'),
  imageAdjustmentControls: document.getElementById('image-adjustment-controls'),
  imageStyleSelect: document.getElementById('image-style-select'),
  imageFitSelect: document.getElementById('image-fit-select'),
  imageZoomSlider: document.getElementById('image-zoom-slider'),
  imagePosxSlider: document.getElementById('image-posx-slider'),
  imagePosySlider: document.getElementById('image-posy-slider'),
  imageOpacitySlider: document.getElementById('image-opacity-slider'),
  imageGrayscaleSlider: document.getElementById('image-grayscale-slider'),
  imageBrightnessSlider: document.getElementById('image-brightness-slider'),
  imageContrastSlider: document.getElementById('image-contrast-slider'),
  imageRotationSelect: document.getElementById('image-rotation-select'),
  imageBgColorPicker: document.getElementById('image-bg-color-picker'),
  
  zoomVal: document.getElementById('zoom-val'),
  posxVal: document.getElementById('posx-val'),
  posyVal: document.getElementById('posy-val'),
  opacityVal: document.getElementById('opacity-val'),
  grayscaleVal: document.getElementById('grayscale-val'),
  brightnessVal: document.getElementById('brightness-val'),
  contrastVal: document.getElementById('contrast-val'),
  bgOpacityGroup: document.getElementById('bg-opacity-group'),
  
  // Packaging Text
  packBrandInput: document.getElementById('pack-brand-input'),
  packSubjectInput: document.getElementById('pack-subject-input'),
  packMrpInput: document.getElementById('pack-mrp-input'),
  packSubtitleInput: document.getElementById('pack-subtitle-input'),
  packDescInput: document.getElementById('pack-desc-input'),
  packWebsiteInput: document.getElementById('pack-website-input'),
  packFootnoteInput: document.getElementById('pack-footnote-input'),
  stripeC1: document.getElementById('stripe-c1'),
  stripeC2: document.getElementById('stripe-c2'),
  stripeC3: document.getElementById('stripe-c3'),
  stripeC4: document.getElementById('stripe-c4'),
  stripeC5: document.getElementById('stripe-c5'),
  packCoverUpload: document.getElementById('pack-cover-upload'),
  removePackCoverBtn: document.getElementById('remove-pack-cover-btn'),
  packBleedToggle: document.getElementById('pack-bleed-toggle'),
  
  // Packaging Live Preview Container
  singlePackagingPreviewContainer: document.getElementById('single-packaging-preview-container'),

  // Packaging Planner
  fillAllSlots: document.getElementById('fill-all-slots'),
  clearAllSlots: document.getElementById('clear-all-slots'),

  // Style Inspector
  stylerTargetSelect: document.getElementById('styler-target-select'),
  inspectorFontSize: document.getElementById('inspector-font-size'),
  inspectorFontFamily: document.getElementById('inspector-font-family'),
  inspectorTextAlign: document.getElementById('inspector-text-align'),
  inspectorImgFit: document.getElementById('inspector-img-fit'),
  inspectorMarginTop: document.getElementById('inspector-margin-top'),
  inspectorMarginBottom: document.getElementById('inspector-margin-bottom'),
  btnStylerApplyThis: document.getElementById('btn-styler-apply-this'),
  btnStylerApplyAll: document.getElementById('btn-styler-apply-all'),
  
  // Prompt Manager
  promptTaskSelect: document.getElementById('prompt-task-select'),
  copyAiPromptBtn: document.getElementById('copy-ai-prompt-btn'),
  aiPromptInstructions: document.getElementById('ai-prompt-instructions'),
  promptImportTextarea: document.getElementById('prompt-import-textarea'),
  promptImportStatus: document.getElementById('prompt-import-status'),
  promptImportBtn: document.getElementById('prompt-import-btn'),

  // Template Designer
  templateEditSelect: document.getElementById('template-edit-select'),
  templateDisplayName: document.getElementById('template-display-name'),
  templateFrontHtml: document.getElementById('template-front-html'),
  templateBackHtml: document.getElementById('template-back-html'),
  resetTemplateBtn: document.getElementById('reset-template-btn'),
  saveTemplateBtn: document.getElementById('save-template-btn'),

  // Print Preview
  printPreviewMode: document.getElementById('print-preview-mode'),
  estSheetCost: document.getElementById('est-sheet-cost'),
  scaledPrintArea: document.getElementById('scaled-print-area'),

  // Single JSON Paste Dialogue
  winSingleJson: document.getElementById('win-single-json'),
  singleCardJsonTextarea: document.getElementById('single-card-json-textarea'),
  singleImportStatus: document.getElementById('single-import-status'),
  btnDoSingleImport: document.getElementById('btn-do-single-import'),
  btnCloseSingleImport: document.getElementById('btn-close-single-import'),
  
  // Taskbar
  taskbarClock: document.getElementById('taskbar-clock'),
  taskbarApps: document.getElementById('taskbar-apps'),
  taskbarLoadBtn: document.getElementById('taskbar-load-btn'),
  taskbarLoadMenuList: document.getElementById('taskbar-load-menu-list'),
  
  // Print Out Area
  printArea: document.getElementById('print-area')
};

// Initialize Application
document.addEventListener("DOMContentLoaded", async () => {
  setupWindowManager();
  setupAnkiNavigation();
  setupImageControls();
  setupDynamicElementEvents();
  setupPackagingEvents();
  setupMenuActions();
  setupTaskbarLoadMenu();
  setupClock();
  setupStyleInspector();
  setupPromptManager();
  setupTemplatesEvents();
  setupSingleImportDialog();
  setupCardCorners();
  setupAnkiClickInteractivity();

  // Load Templates & Decks
  await loadTemplates();
  await loadDecksList();

  // Load Default Showcase Deck
  await loadSampleData('showcase');

  // Verify and reset layout of windows to defaults
  resetWindowLayout();
  
  // Minimize the initially hidden windows
  Object.keys(DEFAULT_WINDOW_POSITIONS).forEach(winId => {
    if (!DEFAULT_WINDOW_POSITIONS[winId].open) {
      minimizeWindow(winId);
    }
  });

  // Global button binds
  if (elements.addCardBtn) elements.addCardBtn.addEventListener('click', () => addCard('standard'));
  if (elements.addCustomCardBtn) elements.addCustomCardBtn.addEventListener('click', () => addCard('custom'));
  if (elements.cardSearchInput) elements.cardSearchInput.addEventListener('input', renderSidebar);
  if (elements.btnDeleteCardTop) elements.btnDeleteCardTop.addEventListener('click', () => {
    if (activeCardIndex !== -1) deleteCard(activeCardIndex);
  });
});

/* ==========================================================================
   Window Manager Logic (Adobe Desktop Style)
   ========================================================================== */
function setupWindowManager() {
  const windows = document.querySelectorAll('.app-window');
  
  windows.forEach(win => {
    const winId = win.id;
    
    win.addEventListener('mousedown', () => {
      focusWindow(win);
    });

    const minBtn = win.querySelector('.win-min');
    if (minBtn) {
      minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        minimizeWindow(winId);
      });
    }

    const closeBtn = win.querySelector('.win-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWindow(winId);
      });
    }

    // Dragging logic
    const header = win.querySelector('.win-header');
    if (header) {
      header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.win-controls') || e.target.closest('.win-btn')) return;
        
        e.preventDefault();
        focusWindow(win);
        
        const startX = e.clientX;
        const startY = e.clientY;
        const startLeft = parseInt(win.style.left) || 0;
        const startTop = parseInt(win.style.top) || 0;

        function onMouseMove(moveEvent) {
          const deltaX = moveEvent.clientX - startX;
          const deltaY = moveEvent.clientY - startY;
          
          win.style.left = `${startLeft + deltaX}px`;
          win.style.top = `${startTop + deltaY}px`;
        }

        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  });

  // Taskbar window toggles
  document.querySelectorAll('.taskbar-app-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const winId = btn.getAttribute('data-win');
      toggleWindowVisibility(winId);
    });
  });

  // Menu toggles
  document.querySelectorAll('.win-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const winId = btn.getAttribute('data-win');
      toggleWindowVisibility(winId);
    });
  });
}

function focusWindow(win) {
  document.querySelectorAll('.app-window').forEach(w => {
    w.classList.remove('active-window');
  });
  win.classList.add('active-window');
}

function minimizeWindow(winId) {
  const win = document.getElementById(winId);
  if (win) win.classList.add('hidden');
  
  const taskBtn = document.querySelector(`.taskbar-app-btn[data-win="${winId}"]`);
  if (taskBtn) taskBtn.classList.remove('active');

  const menuBtn = document.querySelector(`.win-toggle[data-win="${winId}"]`);
  if (menuBtn) menuBtn.classList.remove('checked');
}

function closeWindow(winId) {
  minimizeWindow(winId);
}

function openWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  win.classList.remove('hidden');
  focusWindow(win);
  
  const taskBtn = document.querySelector(`.taskbar-app-btn[data-win="${winId}"]`);
  if (taskBtn) taskBtn.classList.add('active');

  const menuBtn = document.querySelector(`.win-toggle[data-win="${winId}"]`);
  if (menuBtn) menuBtn.classList.add('checked');

  // Specific panel triggers
  if (winId === 'win-print-preview') {
    updatePrintPreview();
  }
  if (winId === 'win-packaging-preview') {
    updatePackagingPreview();
    scalePackagingPreview();
  }
  if (winId === 'win-packaging-editor') {
    openWindow('win-packaging-preview');
  }
}

function toggleWindowVisibility(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  if (win.classList.contains('hidden')) {
    openWindow(winId);
  } else {
    minimizeWindow(winId);
  }
}

function resetWindowLayout() {
  Object.keys(DEFAULT_WINDOW_POSITIONS).forEach(winId => {
    const win = document.getElementById(winId);
    const pos = DEFAULT_WINDOW_POSITIONS[winId];
    if (win && pos) {
      win.style.left = pos.left;
      win.style.top = pos.top;
      win.style.width = pos.width;
      win.style.height = pos.height;
      if (pos.open) openWindow(winId);
    }
  });
}

function setupClock() {
  const formatTime = () => {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    if (elements.taskbarClock) elements.taskbarClock.textContent = `${hrs}:${mins}`;
  };
  formatTime();
  setInterval(formatTime, 60000);
}

/* ==========================================================================
   Deck Configurations & Dynamic Data Operations
   ========================================================================== */
function newBlankDeck() {
  deck = {
    name: "New Blank Deck",
    subject: "General",
    website: "yaad card",
    mrp: "250",
    printMode: "duplex",
    indexCard: true,
    cardCornerRadius: "12px",
    packaging: {
      title: "YAADCARD",
      subtitle: "DAILY FLASHCARDS",
      mrp: "250",
      website: "yaad card",
      coverImage: "",
      description: "Write a summary of the cards included in this box here...",
      footnote: "Premium cards. Made in India.",
      stripeColors: ["#06b6d4", "#f97316", "#a855f7", "#10b981", "#eab308"],
      fullBleed: false
    },
    cards: []
  };
  activeCardIndex = -1;
  if (elements.duplexToggle) elements.duplexToggle.checked = true;
  if (elements.indexCardToggle) elements.indexCardToggle.checked = true;
  if (elements.activeDeckName) elements.activeDeckName.textContent = deck.name;
  
  if (elements.cardCornerSelect) elements.cardCornerSelect.value = deck.cardCornerRadius;
  applyCornerRadius(deck.cardCornerRadius);

  syncPackagingInputs();
  renderSidebar();
  selectCard(-1);
  updatePrintPreview();
  updatePackagingPreview();
}

async function loadSampleData(sampleKey) {
  try {
    const res = await fetch("sample_data.json");
    const allSamples = await res.json();
    const sample = allSamples[sampleKey];
    if (sample) {
      deck = {
        name: sample.name,
        subject: sample.subject || sample.name,
        website: sample.website || "yaad card",
        mrp: sample.mrp || "250",
        printMode: sample.printMode || "duplex",
        indexCard: sample.indexCard !== undefined ? sample.indexCard : true,
        cardCornerRadius: sample.cardCornerRadius || "12px",
        packaging: sample.packaging || {
          title: sample.name.toUpperCase(),
          subtitle: "DAILY FLASHCARDS",
          mrp: sample.mrp || "250",
          website: sample.website || "yaad card",
          coverImage: "",
          description: "Sample details.",
          footnote: "Premium cards. Made in India.",
          stripeColors: ["#06b6d4", "#f97316", "#a855f7", "#10b981", "#eab308"],
          fullBleed: false
        },
        cards: sample.cards
      };
      
      if (elements.duplexToggle) elements.duplexToggle.checked = (deck.printMode === "duplex");
      if (elements.indexCardToggle) elements.indexCardToggle.checked = deck.indexCard;
      if (elements.activeDeckName) elements.activeDeckName.textContent = deck.name;
      
      if (elements.cardCornerSelect) elements.cardCornerSelect.value = deck.cardCornerRadius;
      applyCornerRadius(deck.cardCornerRadius);

      syncPackagingInputs();
      renderSidebar();
      selectCard(deck.cards.length > 0 ? 0 : -1);
      updatePrintPreview();
      updatePackagingPreview();
      updateAIPromptDisplay();
    }
  } catch (err) {
    alert("Error loading sample: " + err);
  }
}

async function loadDecksList() {
  try {
    const res = await fetch("/api/decks");
    const data = await res.json();
    
    if (elements.taskbarLoadMenuList) {
      elements.taskbarLoadMenuList.innerHTML = '';
      
      if (data.decks && data.decks.length > 0) {
        data.decks.forEach(d => {
          const btn = document.createElement("button");
          btn.textContent = `📁 ${d.replace(/_/g, " ")}`;
          btn.addEventListener('click', () => {
            loadDeckFromServer(d);
            elements.taskbarLoadMenuList.style.display = 'none';
          });
          elements.taskbarLoadMenuList.appendChild(btn);
        });
        
        const div = document.createElement("div");
        div.className = "dropdown-divider";
        elements.taskbarLoadMenuList.appendChild(div);
      }
      
      const samples = [
        { key: "showcase", name: "⭐ Showcase Deck" },
        { key: "shloks", name: "📙 Hindi Shloks" },
        { key: "quotes", name: "Stoic Quotes" },
        { key: "himachal", name: "Himachal Tourism" },
        { key: "games", name: "RPG Beasts Game" },
        { key: "finance", name: "Corporate Finance" }
      ];
      
      samples.forEach(s => {
        const btn = document.createElement("button");
        btn.textContent = s.name;
        btn.addEventListener('click', () => {
          loadSampleData(s.key);
          elements.taskbarLoadMenuList.style.display = 'none';
        });
        elements.taskbarLoadMenuList.appendChild(btn);
      });
    }
  } catch (e) {
    console.error("Failed to load decks list:", e);
  }
}

async function loadDeckFromServer(name) {
  try {
    const res = await fetch(`/api/decks/${name}`);
    if (!res.ok) throw new Error("Deck not found");
    const data = await res.json();
    deck = data;
    
    if (elements.duplexToggle) elements.duplexToggle.checked = (deck.printMode === "duplex");
    if (elements.indexCardToggle) elements.indexCardToggle.checked = deck.indexCard;
    if (elements.activeDeckName) elements.activeDeckName.textContent = deck.name;
    
    if (elements.cardCornerSelect) elements.cardCornerSelect.value = deck.cardCornerRadius || "12px";
    applyCornerRadius(deck.cardCornerRadius || "12px");

    syncPackagingInputs();
    renderSidebar();
    selectCard(deck.cards.length > 0 ? 0 : -1);
    updatePrintPreview();
    updatePackagingPreview();
    updateAIPromptDisplay();
  } catch (err) {
    alert("Error loading deck: " + err);
  }
}

async function saveDeckToServer() {
  const deckName = prompt("Enter a filename to save this deck:", deck.name || "untitled_deck");
  if (!deckName) return;
  
  deck.name = deckName;
  try {
    const res = await fetch("/api/decks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deck)
    });
    const result = await res.json();
    if (result.success) {
      alert("Deck saved successfully!");
      if (elements.activeDeckName) elements.activeDeckName.textContent = deckName;
      await loadDecksList();
    } else {
      alert("Failed to save: " + result.error);
    }
  } catch (err) {
    alert("Error saving deck: " + err);
  }
}

function setupTaskbarLoadMenu() {
  if (elements.taskbarLoadBtn) {
    elements.taskbarLoadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const style = elements.taskbarLoadMenuList.style;
      style.display = style.display === 'block' ? 'none' : 'block';
    });
  }

  document.addEventListener('click', () => {
    if (elements.taskbarLoadMenuList) elements.taskbarLoadMenuList.style.display = 'none';
  });
}

function setupMenuActions() {
  if (elements.menuNewDeck) elements.menuNewDeck.addEventListener('click', newBlankDeck);
  if (elements.menuSaveDeck) elements.menuSaveDeck.addEventListener('click', saveDeckToServer);
  if (elements.menuResetWorkspace) elements.menuResetWorkspace.addEventListener('click', resetWindowLayout);
  
  if (elements.menuImportAi) {
    elements.menuImportAi.addEventListener('click', () => openWindow('win-prompt-manager'));
  }

  if (elements.menuHelpShortcuts) {
    elements.menuHelpShortcuts.addEventListener('click', () => {
      openWindow('win-shortcuts');
    });
  }

  if (elements.menuHelpAbout) {
    elements.menuHelpAbout.addEventListener('click', () => {
      alert("yaad card editor\nA Cost-Optimized Physical Flashcard Desktop Suite.");
    });
  }

  // Print execution triggers
  if (elements.btnPrintCards) elements.btnPrintCards.addEventListener('click', printCardsDeck);
  if (elements.btnPrintPack) elements.btnPrintPack.addEventListener('click', printPackagingSheets);
  
  if (elements.duplexToggle) {
    elements.duplexToggle.addEventListener('change', (e) => {
      deck.printMode = e.target.checked ? "duplex" : "single";
      updatePrintPreview();
    });
  }
  
  if (elements.indexCardToggle) {
    elements.indexCardToggle.addEventListener('change', (e) => {
      deck.indexCard = e.target.checked;
      renderSidebar();
      updatePrintPreview();
    });
  }
}

/* ==========================================================================
   Micro Mustache-like Template Compiler
   ========================================================================== */
function renderTemplate(html, data) {
  let reBlock = /\{\{\#([a-zA-Z0-9_\.]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
  html = html.replace(reBlock, (match, path, content) => {
    const val = path === '.' ? (data['.'] !== undefined ? data['.'] : data) : resolvePath(data, path);
    if (!val) return '';
    if (Array.isArray(val)) {
      return val.map(item => {
        const itemCtx = (typeof item === 'object' && item !== null) ? { ...data, ...item, '.': item } : { ...data, '.': item };
        return renderTemplate(content, itemCtx);
      }).join('');
    }
    if (typeof val === 'object') {
      return renderTemplate(content, { ...data, ...val });
    }
    return renderTemplate(content, data);
  });
  
  let reVal = /\{\{([a-zA-Z0-9_\.\-]+)\}\}/g;
  html = html.replace(reVal, (match, path) => {
    if (path === '.') return data['.'] !== undefined ? data['.'] : '';
    const val = resolvePath(data, path);
    return val !== undefined ? val : '';
  });
  
  return html;
}

function resolvePath(obj, path) {
  if (path === '.') return obj['.'] !== undefined ? obj['.'] : obj;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function compileCardHtml(card, side) {
  const templateId = card.template || "standard";
  const template = templates[templateId];
  if (!template) return `<div>Template ${templateId} not found</div>`;
  
  const data = {
    ...card,
    deck: {
      website: deck.website || "yaad card",
      mrp: deck.mrp || "250"
    }
  };
  
  const frontTitleStyle = card.front.title_style || "font-size: 1.4rem; text-align: center;";
  const backTitleStyle = card.back.title_style || "font-size: 0.85rem;";
  const backTaglineStyle = card.back.tagline_style || "font-size: 0.52rem;";
  const backSummaryStyle = card.back.summary_style || "font-size: 0.6rem;";
  const backContentStyle = card.back.content_style || "font-size: 0.6rem;";
  
  data.front = { ...data.front, title_style: frontTitleStyle };
  data.back = {
    ...data.back,
    title_style: backTitleStyle,
    tagline_style: backTaglineStyle,
    summary_style: backSummaryStyle,
    content_style: backContentStyle
  };

  // Helper to generate custom styled styles for images on either side
  const processImageStyles = (img) => {
    if (!img || !img.url) return null;
    let containerStyle = "";
    let imgStyle = `object-fit: ${img.fit || "cover"}; object-position: ${img.posx || 50}% ${img.posy || 50}%;`;
    
    if (img.style === "icon-top") {
      containerStyle = ""; 
    } else if (img.style === "background") {
      containerStyle = `opacity: ${(img.opacity || 15) / 100};`;
    } else {
      // Content block custom dimensions and vertical margins
      const widthStr = img.width !== undefined ? img.width + "%" : "100%";
      const heightStr = img.height !== undefined ? img.height + "px" : "55px";
      const marginStr = img.margin !== undefined ? img.margin + "px" : "0px";
      containerStyle = `width: ${widthStr}; height: ${heightStr}; margin: ${marginStr} auto;`;
    }
    
    if (img.zoom && img.zoom !== 100) {
      imgStyle += ` transform: scale(${img.zoom / 100});`;
    }
    
    // Custom rotation angle
    if (img.rotation && img.rotation !== "0") {
      imgStyle += ` transform: rotate(${img.rotation}deg);`;
    }
    
    // Background color behind PNG
    if (img.bgColor) {
      containerStyle += ` background-color: ${img.bgColor};`;
    }

    // CSS Filters
    let filters = [];
    if (img.grayscale && img.grayscale !== 0) filters.push(`grayscale(${img.grayscale}%)`);
    if (img.brightness && img.brightness !== 100) filters.push(`brightness(${img.brightness}%)`);
    if (img.contrast && img.contrast !== 100) filters.push(`contrast(${img.contrast}%)`);
    
    if (filters.length > 0) {
      imgStyle += ` filter: ${filters.join(" ")};`;
    }

    let finalStyleClass = img.style || "content";
    if (img.style === "content" && img.outline === false) {
      finalStyleClass += " no-outline";
    }

    return {
      ...img,
      style: finalStyleClass,
      container_style: containerStyle,
      img_style: imgStyle
    };
  };

  // Process Front Image
  if (card.front && card.front.image && card.front.image.url) {
    if (card.front.image.fullBleed) {
      data.card_class_front = "full-bleed";
      card.front.image.style = "background";
      card.front.image.opacity = 100;
    } else {
      data.card_class_front = "";
    }
    data.front.image = processImageStyles(card.front.image);
  }

  // Process Back Image
  if (card.back && card.back.image && card.back.image.url) {
    if (card.back.image.fullBleed) {
      data.card_class_back = "full-bleed";
      card.back.image.style = "background";
      card.back.image.opacity = 100;
    } else {
      data.card_class_back = "";
    }
    data.back.image = processImageStyles(card.back.image);
  }

  const htmlTemplate = side === "front" ? template.html_front : template.html_back;
  let wrappedHtml = renderTemplate(htmlTemplate, data);
  
  // Inject full-bleed class wrapper if needed
  const isFullBleed = side === "front" ? (data.card_class_front === "full-bleed") : (data.card_class_back === "full-bleed");
  if (isFullBleed) {
    wrappedHtml = wrappedHtml.replace('class="card-frame', 'class="card-frame full-bleed');
  }

  setTimeout(() => {
    const selector = side === "front" ? ".face-front" : ".face-back";
    if (elements.digitalAnkiCard) {
      const el = elements.digitalAnkiCard.querySelector(selector);
      if (el && window.renderMathInElement) {
        window.renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    }
  }, 10);

  return wrappedHtml;
}

async function loadTemplates() {
  try {
    const res = await fetch("/api/templates");
    templates = await res.json();
    populateTemplatesDropdown();
  } catch (e) {
    console.error("Error loading templates:", e);
  }
}

/* ==========================================================================
   Cards Navigator Sidebar List
   ========================================================================== */
function renderSidebar() {
  const query = elements.cardSearchInput ? elements.cardSearchInput.value.toLowerCase() : '';
  if (!elements.cardsList) return;
  elements.cardsList.innerHTML = '';
  
  if (deck.indexCard && (query === '' || "index card".includes(query))) {
    const idxItem = document.createElement('div');
    idxItem.className = `card-item ${activeCardIndex === -2 ? 'active' : ''}`;
    idxItem.innerHTML = `
      <div class="card-item-indicator" style="background-color: #06b6d4;"></div>
      <div class="card-item-info">
        <div class="title" style="font-weight: 700;">📁 [Index Card]</div>
        <div class="meta">
          <span>Overview & Contents &bull; idx</span>
        </div>
      </div>
    `;
    idxItem.addEventListener('click', () => {
      activeCardIndex = -2;
      document.querySelectorAll('#cards-list .card-item').forEach(item => item.classList.remove('active'));
      idxItem.classList.add('active');
      if (elements.mainEditorFields) elements.mainEditorFields.style.display = 'none';
      if (elements.cardEditorTitle) elements.cardEditorTitle.textContent = "📁 Index Card View";
      updateDigitalPreview();
    });
    elements.cardsList.appendChild(idxItem);
  }
  
  const filteredCards = deck.cards.filter(c => {
    return c.front.title.toLowerCase().includes(query) || 
           (c.back.title && c.back.title.toLowerCase().includes(query)) ||
           (c.back.summary && c.back.summary.toLowerCase().includes(query));
  });

  filteredCards.forEach((card, index) => {
    const cardIndex = deck.cards.indexOf(card);
    const item = document.createElement('div');
    item.className = `card-item ${cardIndex === activeCardIndex ? 'active' : ''}`;
    
    const accentColor = getThemePrimaryColor(card.theme);
    
    item.innerHTML = `
      <div class="card-item-indicator" style="background-color: ${accentColor};"></div>
      <div class="card-item-info">
        <div class="title">${escapeHtml(card.front.title) || 'Untitled'}</div>
        <div class="meta">
          <span>#${cardIndex + 1} &bull; ${card.template || 'std'}</span>
          <span>${card.theme || 'cyan'}</span>
        </div>
      </div>
      <div class="card-item-actions">
        <button class="action-btn-mini move-up-btn">▲</button>
        <button class="action-btn-mini move-down-btn">▼</button>
        <button class="action-btn-mini duplicate-btn">❐</button>
        <button class="action-btn-mini delete-btn">×</button>
      </div>
    `;
    
    item.addEventListener('click', (e) => {
      if (e.target.closest('.card-item-actions')) return;
      selectCard(cardIndex);
    });
    
    item.querySelector('.move-up-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      moveCard(cardIndex, -1);
    });
    
    item.querySelector('.move-down-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      moveCard(cardIndex, 1);
    });
    
    item.querySelector('.duplicate-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      duplicateCard(cardIndex);
    });
    
    item.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteCard(cardIndex);
    });

    elements.cardsList.appendChild(item);
  });
}

function selectCard(index) {
  activeCardIndex = index;
  
  document.querySelectorAll('#cards-list .card-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });
  
  if (index === -1) {
    if (elements.emptyState) elements.emptyState.style.display = 'block';
    if (elements.mainEditorFields) elements.mainEditorFields.style.display = 'none';
    if (elements.cardEditorTitle) elements.cardEditorTitle.textContent = "📝 Card Editor";
    return;
  }
  
  if (elements.emptyState) elements.emptyState.style.display = 'none';
  if (elements.mainEditorFields) elements.mainEditorFields.style.display = 'block';
  
  const card = deck.cards[index];
  if (elements.cardEditorTitle) elements.cardEditorTitle.textContent = `📝 Card #${index + 1} Editor`;
  
  if (elements.cardTemplateSelect) elements.cardTemplateSelect.value = card.template || 'standard';
  if (elements.frontTitleInput) elements.frontTitleInput.value = card.front.title || '';
  if (elements.frontTaglineInput) elements.frontTaglineInput.value = card.front.tagline || '';
  if (elements.frontCategoryInput) elements.frontCategoryInput.value = card.front.category || '';
  if (elements.backTitleInput) elements.backTitleInput.value = card.back.title || '';
  if (elements.backHpInput) elements.backHpInput.value = card.back.hp || '';
  if (elements.backTaglineInput) elements.backTaglineInput.value = card.back.tagline || '';
  if (elements.backSummaryInput) elements.backSummaryInput.value = card.back.summary || '';
  
  document.querySelectorAll('.theme-picker-row .theme-dot').forEach(dot => {
    dot.classList.toggle('active', dot.getAttribute('data-theme') === card.theme);
  });
  if (elements.customThemeColor) elements.customThemeColor.value = (card.theme && card.theme.startsWith('#')) ? card.theme : '#06b6d4';

  const hpGroup = document.getElementById('game-hp-group');
  if (hpGroup) hpGroup.style.display = (card.template === 'game') ? 'block' : 'none';

  // Advanced Elements dropdown picker
  let activeElement = 'none';
  const allTypes = [
    'key_points', 'table', 'timeline', 'chart', 'diagram', 
    'qr_code', 'social_badge', 'rating', 'progress_bar', 'console_output', 
    'checklist', 'game_stats', 'numbered_steps', 'audio_bar', 'callout', 
    'tags_row', 'term_lookup', 'citation', 'variable_legend', 'location_pin'
  ];
  for (const t of allTypes) {
    if (card.back[t]) {
      activeElement = t;
      break;
    }
  }
  
  if (elements.advancedElementSelect) elements.advancedElementSelect.value = activeElement;
  showAdvancedElementEditor(activeElement);

  syncImageEditorControls(card);
  updateDigitalPreview();
  syncStyleInspectorValues();
}

function addCard(type) {
  let newCard;
  
  if (type === 'custom') {
    newCard = {
      id: Date.now(),
      theme: "cyan",
      template: "standard",
      front: {
        title: "WELCOME",
        tagline: "Custom Welcome Card",
        category: "INTRO",
        title_style: "font-family: var(--font-display); font-size: 2.0rem; text-align: center; color: var(--theme-color);"
      },
      back: {
        title: "WELCOME TO YAADCARD",
        tagline: "Scan QR below to learn more",
        summary: "This is a welcome note that you can design completely differently. You can upload custom QR codes as images.",
        title_style: "font-family: var(--font-display); font-size: 0.95rem; border-bottom: 2px solid #000000; text-align: center;",
        summary_style: "font-family: var(--font-body); font-size: 0.65rem; line-height: 1.4; text-align: center;"
      }
    };
  } else {
    newCard = {
      id: Date.now(),
      theme: "cyan",
      template: "standard",
      front: {
        title: "New Concept"
      },
      back: {
        title: "Concept Details",
        tagline: "Subject categorization",
        summary: "Summarise the formula or concept details here."
      }
    };
  }
  
  deck.cards.push(newCard);
  renderSidebar();
  selectCard(deck.cards.length - 1);
  updatePrintPreview();
}

function moveCard(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= deck.cards.length) return;
  
  const temp = deck.cards[index];
  deck.cards[index] = deck.cards[targetIndex];
  deck.cards[targetIndex] = temp;
  
  activeCardIndex = targetIndex;
  renderSidebar();
  selectCard(targetIndex);
  updatePrintPreview();
}

function duplicateCard(index) {
  const source = deck.cards[index];
  const copy = JSON.parse(JSON.stringify(source));
  copy.id = Date.now();
  
  deck.cards.splice(index + 1, 0, copy);
  renderSidebar();
  selectCard(index + 1);
  updatePrintPreview();
}

function deleteCard(index) {
  if (!confirm("Are you sure you want to delete this card?")) return;
  deck.cards.splice(index, 1);
  
  let newIndex = activeCardIndex;
  if (deck.cards.length === 0) newIndex = -1;
  else if (activeCardIndex >= deck.cards.length) newIndex = deck.cards.length - 1;
  
  renderSidebar();
  selectCard(newIndex);
  updatePrintPreview();
}

/* ==========================================================================
   Editor Real-Time Sync Controls
   ========================================================================== */
function updateCardField(path, value) {
  if (activeCardIndex === -1) return;
  const card = deck.cards[activeCardIndex];
  
  const parts = path.split('.');
  let current = card;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
  
  updateDigitalPreview();
  if (document.getElementById('win-print-preview').classList.contains('hidden') === false) {
    updatePrintPreview();
  }
}

if (elements.frontTitleInput) elements.frontTitleInput.addEventListener('input', (e) => updateCardField('front.title', e.target.value));
if (elements.frontTaglineInput) elements.frontTaglineInput.addEventListener('input', (e) => updateCardField('front.tagline', e.target.value));
if (elements.frontCategoryInput) elements.frontCategoryInput.addEventListener('input', (e) => updateCardField('front.category', e.target.value));
if (elements.backTitleInput) elements.backTitleInput.addEventListener('input', (e) => updateCardField('back.title', e.target.value));
if (elements.backHpInput) elements.backHpInput.addEventListener('input', (e) => updateCardField('back.hp', e.target.value));
if (elements.backTaglineInput) elements.backTaglineInput.addEventListener('input', (e) => updateCardField('back.tagline', e.target.value));
if (elements.backSummaryInput) elements.backSummaryInput.addEventListener('input', (e) => updateCardField('back.summary', e.target.value));

if (elements.cardTemplateSelect) {
  elements.cardTemplateSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    updateCardField('template', val);
    const hpGroup = document.getElementById('game-hp-group');
    if (hpGroup) hpGroup.style.display = (val === 'game') ? 'block' : 'none';
    selectCard(activeCardIndex);
  });
}

document.querySelector('.theme-picker-row').addEventListener('click', (e) => {
  if (e.target.classList.contains('theme-dot')) {
    const theme = e.target.getAttribute('data-theme');
    updateCardField('theme', theme);
    document.querySelectorAll('.theme-picker-row .theme-dot').forEach(dot => {
      dot.classList.toggle('active', dot === e.target);
    });
    renderSidebar();
  }
});

if (elements.customThemeColor) {
  elements.customThemeColor.addEventListener('input', (e) => {
    const val = e.target.value;
    updateCardField('theme', val);
    renderSidebar();
  });
}

/* ==========================================================================
   Anki Digital Card Click Interaction Target Focus
   ========================================================================== */
function setupAnkiClickInteractivity() {
  if (elements.digitalAnkiCard) {
    elements.digitalAnkiCard.addEventListener('click', (e) => {
      const editableEl = e.target.closest('.editable-element');
      if (editableEl) {
        e.stopPropagation();
        e.preventDefault();
        const field = editableEl.getAttribute('data-editor-target');
        openEditorForField(field);
      }
    });
  }
}

function openEditorForField(field) {
  openWindow('win-card-editor');
  
  document.querySelectorAll('#win-card-editor input, #win-card-editor textarea, #win-card-editor select').forEach(el => {
    el.classList.remove('highlight-input');
  });

  let inputEl = null;
  if (field === 'front.title') inputEl = elements.frontTitleInput;
  else if (field === 'front.tagline') inputEl = elements.frontTaglineInput;
  else if (field === 'front.category') inputEl = elements.frontCategoryInput;
  else if (field === 'back.title') inputEl = elements.backTitleInput;
  else if (field === 'back.tagline') inputEl = elements.backTaglineInput;
  else if (field === 'back.hp') inputEl = elements.backHpInput;
  else if (field === 'back.summary') inputEl = elements.backSummaryInput;
  else if (field === 'back.image') {
    inputEl = elements.cardImageUpload;
  } else if (field.startsWith('back.')) {
    const subType = field.replace('back.', '');
    if (elements.advancedElementSelect) {
      elements.advancedElementSelect.value = subType;
      showAdvancedElementEditor(subType);
      inputEl = elements.advancedElementSelect;
    }
  }

  if (inputEl) {
    inputEl.focus();
    inputEl.classList.add('highlight-input');
    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      inputEl.classList.remove('highlight-input');
    }, 2000);
  }
}

/* ==========================================================================
   Card Corner Radius Setup
   ========================================================================== */
function setupCardCorners() {
  if (elements.cardCornerSelect) {
    elements.cardCornerSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      deck.cardCornerRadius = val;
      applyCornerRadius(val);
      updatePrintPreview();
    });
  }
}

function applyCornerRadius(val) {
  if (elements.desktopArea) {
    elements.desktopArea.style.setProperty('--card-border-radius', val);
  }
  if (elements.printArea) {
    elements.printArea.style.setProperty('--card-border-radius', val);
  }
}

/* ==========================================================================
   Advanced Sub-Element Editor Panes
   ========================================================================== */
function updateActiveElementsBadges() {
  const container = document.getElementById('active-elements-badges');
  if (!container) return;
  container.innerHTML = '';
  
  if (activeCardIndex === -1) return;
  const card = deck.cards[activeCardIndex];
  
  const allTypes = [
    { key: 'key_points', name: 'Bullets' },
    { key: 'table', name: 'Table' },
    { key: 'timeline', name: 'Timeline' },
    { key: 'chart', name: 'Chart' },
    { key: 'diagram', name: 'Diagram' },
    { key: 'qr_code', name: 'QR Code' },
    { key: 'social_badge', name: 'Social Badge' },
    { key: 'rating', name: 'Rating' },
    { key: 'progress_bar', name: 'Progress Bar' },
    { key: 'console_output', name: 'Console' },
    { key: 'checklist', name: 'Checklist' },
    { key: 'game_stats', name: 'Game Stats' },
    { key: 'numbered_steps', name: 'Steps' },
    { key: 'audio_bar', name: 'Audio' },
    { key: 'callout', name: 'Callout' },
    { key: 'tags_row', name: 'Tags' },
    { key: 'term_lookup', name: 'Lookup' },
    { key: 'citation', name: 'Citation' },
    { key: 'variable_legend', name: 'Legend' },
    { key: 'location_pin', name: 'Location' }
  ];
  
  allTypes.forEach(t => {
    if (card.back && card.back[t.key]) {
      const badge = document.createElement('span');
      badge.className = 'tag-chip';
      badge.style.cursor = 'pointer';
      badge.style.background = 'var(--theme-color)';
      badge.style.color = '#ffffff';
      badge.textContent = t.name;
      badge.addEventListener('click', () => {
        if (elements.advancedElementSelect) {
          elements.advancedElementSelect.value = t.key;
          showAdvancedElementEditor(t.key);
        }
      });
      container.appendChild(badge);
    }
  });
}

if (elements.advancedElementSelect) {
  elements.advancedElementSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    showAdvancedElementEditor(type);
  });
}

const addElementBtn = document.getElementById('add-element-type-btn');
if (addElementBtn) {
  addElementBtn.addEventListener('click', () => {
    if (activeCardIndex === -1) return;
    const card = deck.cards[activeCardIndex];
    if (!card.back) card.back = {};
    const type = elements.advancedElementSelect.value;
    if (type === 'none') return;
    
    if (type === 'key_points') {
      card.back.key_points = ["Bullet point 1", "Bullet point 2"];
    } else if (type === 'table') {
      card.back.table = {
        headers: ["Header 1", "Header 2"],
        rows: [["Value A", "Value B"]]
      };
    } else if (type === 'timeline') {
      card.back.timeline = {
        items: [{ label: "1. Step", detail: "Timeline progress details." }]
      };
    } else if (type === 'chart') {
      card.back.chart = {
        bars: [
          { x: 10, y: 10, h: 28, color: "#06b6d4", tx: 14, lbl: "A" },
          { x: 30, y: 18, h: 20, color: "#f97316", tx: 34, lbl: "B" }
        ]
      };
    } else if (type === 'diagram') {
      card.back.diagram = "[Block 1] ──> [Block 2]";
    } else if (type === 'qr_code') {
      card.back.qr_code = { url: "https://yaadcard.web.app", label: "Scan to verify" };
    } else if (type === 'social_badge') {
      card.back.social_badge = { platform: "x", handle: "@username" };
    } else if (type === 'rating') {
      card.back.rating = { label: "Difficulty", stars: 4 };
    } else if (type === 'progress_bar') {
      card.back.progress_bar = { label: "Completion", percent: 75 };
    } else if (type === 'console_output') {
      card.back.console_output = { cmd: "python main.py", out: "Hello World!\nProcess exited code 0." };
    } else if (type === 'checklist') {
      card.back.checklist = { items: [{ text: "Task item 1", checked: true }, { text: "Task item 2", checked: false }] };
    } else if (type === 'game_stats') {
      card.back.game_stats = { atk: 75, def: 50, spd: 65, mana: 90 };
    } else if (type === 'numbered_steps') {
      card.back.numbered_steps = { items: [{ num: "1", detail: "First step info" }, { num: "2", detail: "Second step info" }] };
    } else if (type === 'audio_bar') {
      card.back.audio_bar = { label: "Pronunciation", time: "0:15" };
    } else if (type === 'callout') {
      card.back.callout = { type: "warning", text: "Warning: Keep out of reach.", warning: true, info: false, success: false };
    } else if (type === 'tags_row') {
      card.back.tags_row = { items: ["DESIGN", "PRINT", "STUDY"] };
    } else if (type === 'term_lookup') {
      card.back.term_lookup = { phonetic: "/wæk/", class: "noun", origin: "English" };
    } else if (type === 'citation') {
      card.back.citation = { source: "Marcus Aurelius", ref: "Meditations, Book IV" };
    } else if (type === 'variable_legend') {
      card.back.variable_legend = { items: [{ sym: "F", def: "Force vector" }, { sym: "m", def: "Inertial mass" }] };
    } else if (type === 'location_pin') {
      card.back.location_pin = { name: "Rome, Italy", coords: "41.90, 12.49" };
    }
    
    showAdvancedElementEditor(type);
    updateActiveElementsBadges();
    updateDigitalPreview();
  });
}

const removeElementBtn = document.getElementById('remove-element-type-btn');
if (removeElementBtn) {
  removeElementBtn.addEventListener('click', () => {
    if (activeCardIndex === -1) return;
    const card = deck.cards[activeCardIndex];
    if (!card.back) return;
    const type = elements.advancedElementSelect.value;
    if (type === 'none') return;
    
    delete card.back[type];
    
    showAdvancedElementEditor(type);
    updateActiveElementsBadges();
    updateDigitalPreview();
  });
}

const clearAllElementsBtn = document.getElementById('clear-all-elements-btn');
if (clearAllElementsBtn) {
  clearAllElementsBtn.addEventListener('click', () => {
    if (activeCardIndex === -1) return;
    const card = deck.cards[activeCardIndex];
    if (!card.back) return;
    const allTypes = [
      'key_points', 'table', 'timeline', 'chart', 'diagram', 
      'qr_code', 'social_badge', 'rating', 'progress_bar', 'console_output', 
      'checklist', 'game_stats', 'numbered_steps', 'audio_bar', 'callout', 
      'tags_row', 'term_lookup', 'citation', 'variable_legend', 'location_pin'
    ];
    allTypes.forEach(t => delete card.back[t]);
    
    showAdvancedElementEditor('none');
    if (elements.advancedElementSelect) elements.advancedElementSelect.value = 'none';
    updateActiveElementsBadges();
    updateDigitalPreview();
  });
}

function showAdvancedElementEditor(type) {
  const allTypes = [
    'key_points', 'table', 'timeline', 'chart', 'diagram', 
    'qr_code', 'social_badge', 'rating', 'progress_bar', 'console_output', 
    'checklist', 'game_stats', 'numbered_steps', 'audio_bar', 'callout', 
    'tags_row', 'term_lookup', 'citation', 'variable_legend', 'location_pin'
  ];
  allTypes.forEach(t => {
    const el = document.getElementById(`el-${t}-editor`);
    if (el) el.style.display = (type === t) ? 'block' : 'none';
  });
  
  if (activeCardIndex === -1) return;
  const card = deck.cards[activeCardIndex];
  
  if (type === 'key_points') {
    renderKeyPointsList(card.back.key_points || []);
  } else if (type === 'table') {
    renderTableEditor(card.back.table || { headers: ["", ""], rows: [] });
  } else if (type === 'timeline') {
    renderTimelineEditor(card.back.timeline || { items: [] });
  } else if (type === 'chart') {
    renderChartEditor(card.back.chart || { bars: [] });
  } else if (type === 'diagram') {
    if (elements.asciiDiagramInput) elements.asciiDiagramInput.value = card.back.diagram || '';
  } else if (type === 'qr_code') {
    const qr = card.back.qr_code || { url: '', label: '' };
    const linkIn = document.getElementById('qr-link-input');
    const labelIn = document.getElementById('qr-label-input');
    if (linkIn) linkIn.value = qr.url || '';
    if (labelIn) labelIn.value = qr.label || '';
  } else if (type === 'social_badge') {
    const soc = card.back.social_badge || { platform: 'x', handle: '' };
    const platSel = document.getElementById('social-platform-select');
    const handleIn = document.getElementById('social-handle-input');
    if (platSel) platSel.value = soc.platform || 'x';
    if (handleIn) handleIn.value = soc.handle || '';
  } else if (type === 'rating') {
    const rt = card.back.rating || { label: 'Difficulty', stars: 4 };
    const rtLbl = document.getElementById('rating-label-input');
    const rtStars = document.getElementById('rating-stars-input');
    if (rtLbl) rtLbl.value = rt.label || '';
    if (rtStars) rtStars.value = rt.stars || 4;
  } else if (type === 'progress_bar') {
    const pb = card.back.progress_bar || { label: 'Completion', percent: 75 };
    const pbLbl = document.getElementById('progress-label-input');
    const pbPercent = document.getElementById('progress-percent-input');
    if (pbLbl) pbLbl.value = pb.label || '';
    if (pbPercent) pbPercent.value = pb.percent || 75;
  } else if (type === 'console_output') {
    const co = card.back.console_output || { cmd: '', out: '' };
    const coCmd = document.getElementById('console-cmd-input');
    const coOut = document.getElementById('console-out-input');
    if (coCmd) coCmd.value = co.cmd || '';
    if (coOut) coOut.value = co.out || '';
  } else if (type === 'checklist') {
    if (!card.back.checklist) card.back.checklist = { items: [] };
    renderChecklistEditor(card.back.checklist.items);
  } else if (type === 'game_stats') {
    const gs = card.back.game_stats || { atk: 75, def: 50, spd: 65, mana: 90 };
    const atk = document.getElementById('stat-atk');
    const def = document.getElementById('stat-def');
    const spd = document.getElementById('stat-spd');
    const mana = document.getElementById('stat-mana');
    if (atk) atk.value = gs.atk || 75;
    if (def) def.value = gs.def || 50;
    if (spd) spd.value = gs.spd || 65;
    if (mana) mana.value = gs.mana || 90;
  } else if (type === 'numbered_steps') {
    if (!card.back.numbered_steps) card.back.numbered_steps = { items: [] };
    renderStepsEditor(card.back.numbered_steps.items);
  } else if (type === 'audio_bar') {
    const ab = card.back.audio_bar || { label: 'Pronunciation', time: '0:15' };
    const abLbl = document.getElementById('audio-label-input');
    const abTime = document.getElementById('audio-time-input');
    if (abLbl) abLbl.value = ab.label || '';
    if (abTime) abTime.value = ab.time || '';
  } else if (type === 'callout') {
    const co = card.back.callout || { type: 'warning', text: '' };
    const coType = document.getElementById('callout-type-select');
    const coTxt = document.getElementById('callout-text-input');
    if (coType) coType.value = co.type || 'warning';
    if (coTxt) coTxt.value = co.text || '';
  } else if (type === 'tags_row') {
    if (!card.back.tags_row) card.back.tags_row = { items: [] };
    renderTagsEditor(card.back.tags_row.items);
  } else if (type === 'term_lookup') {
    const tl = card.back.term_lookup || { phonetic: '', class: '', origin: '' };
    const tlPh = document.getElementById('lookup-phonetic');
    const tlCl = document.getElementById('lookup-class');
    const tlOr = document.getElementById('lookup-origin');
    if (tlPh) tlPh.value = tl.phonetic || '';
    if (tlCl) tlCl.value = tl.class || '';
    if (tlOr) tlOr.value = tl.origin || '';
  } else if (type === 'citation') {
    const cit = card.back.citation || { source: '', ref: '' };
    const citSrc = document.getElementById('citation-source');
    const citRef = document.getElementById('citation-ref');
    if (citSrc) citSrc.value = cit.source || '';
    if (citRef) citRef.value = cit.ref || '';
  } else if (type === 'variable_legend') {
    if (!card.back.variable_legend) card.back.variable_legend = { items: [] };
    renderLegendEditor(card.back.variable_legend.items);
  } else if (type === 'location_pin') {
    const lp = card.back.location_pin || { name: '', coords: '' };
    const lpName = document.getElementById('loc-name-input');
    const lpCoords = document.getElementById('loc-coords-input');
    if (lpName) lpName.value = lp.name || '';
    if (lpCoords) lpCoords.value = lp.coords || '';
  }
  
  updateActiveElementsBadges();
}

function renderChecklistEditor(items) {
  const container = document.getElementById('checklist-items-container');
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'list-edit-row';
    row.innerHTML = `
      <input type="checkbox" ${item.checked ? 'checked' : ''} style="width: auto; margin-right: 4px;">
      <input type="text" value="${escapeHtml(item.text)}" style="flex:1;">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    row.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      deck.cards[activeCardIndex].back.checklist.items[index].checked = e.target.checked;
      updateDigitalPreview();
    });
    row.querySelector('input[type="text"]').addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.checklist.items[index].text = e.target.value;
      updateDigitalPreview();
    });
    row.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.checklist.items.splice(index, 1);
      renderChecklistEditor(deck.cards[activeCardIndex].back.checklist.items);
      updateDigitalPreview();
    });
    container.appendChild(row);
  });
}

function renderStepsEditor(items) {
  const container = document.getElementById('numbered-steps-container');
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'list-edit-row';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(item.num)}" style="width: 40px; margin-right: 4px;" placeholder="Step">
      <input type="text" value="${escapeHtml(item.detail)}" style="flex:1;" placeholder="Description">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    row.querySelectorAll('input')[0].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.numbered_steps.items[index].num = e.target.value;
      updateDigitalPreview();
    });
    row.querySelectorAll('input')[1].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.numbered_steps.items[index].detail = e.target.value;
      updateDigitalPreview();
    });
    row.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.numbered_steps.items.splice(index, 1);
      renderStepsEditor(deck.cards[activeCardIndex].back.numbered_steps.items);
      updateDigitalPreview();
    });
    container.appendChild(row);
  });
}

function renderTagsEditor(items) {
  const container = document.getElementById('tag-items-container');
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'list-edit-row';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(item)}" style="flex:1;" placeholder="Tag">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    row.querySelector('input').addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.tags_row.items[index] = e.target.value;
      updateDigitalPreview();
    });
    row.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.tags_row.items.splice(index, 1);
      renderTagsEditor(deck.cards[activeCardIndex].back.tags_row.items);
      updateDigitalPreview();
    });
    container.appendChild(row);
  });
}

function renderLegendEditor(items) {
  const container = document.getElementById('legend-items-container');
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'list-edit-row';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(item.sym)}" style="width: 60px; margin-right: 4px;" placeholder="Sym">
      <input type="text" value="${escapeHtml(item.def)}" style="flex:1;" placeholder="Definition">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    row.querySelectorAll('input')[0].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.variable_legend.items[index].sym = e.target.value;
      updateDigitalPreview();
    });
    row.querySelectorAll('input')[1].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.variable_legend.items[index].def = e.target.value;
      updateDigitalPreview();
    });
    row.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.variable_legend.items.splice(index, 1);
      renderLegendEditor(deck.cards[activeCardIndex].back.variable_legend.items);
      updateDigitalPreview();
    });
    container.appendChild(row);
  });
}

function renderKeyPointsList(items) {
  if (!elements.keyPointsItems) return;
  elements.keyPointsItems.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'list-edit-row';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(item)}" style="flex:1;">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    row.querySelector('input').addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.key_points[index] = e.target.value;
      updateDigitalPreview();
    });
    row.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.key_points.splice(index, 1);
      renderKeyPointsList(deck.cards[activeCardIndex].back.key_points);
      updateDigitalPreview();
    });
    elements.keyPointsItems.appendChild(row);
  });
}

function renderTableEditor(tbl) {
  if (!elements.tableRowsContainer) return;
  if (elements.th1) elements.th1.value = tbl.headers[0] || '';
  if (elements.th2) elements.th2.value = tbl.headers[1] || '';
  
  elements.tableRowsContainer.innerHTML = '';
  (tbl.rows || []).forEach((rowCells, rIdx) => {
    const row = document.createElement('div');
    row.className = 'table-edit-row';
    row.innerHTML = `
      <input type="text" value="${escapeHtml(rowCells[0] || '')}" style="flex:1;">
      <input type="text" value="${escapeHtml(rowCells[1] || '')}" style="flex:1;">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    row.querySelectorAll('input')[0].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.table.rows[rIdx][0] = e.target.value;
      updateDigitalPreview();
    });
    row.querySelectorAll('input')[1].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.table.rows[rIdx][1] = e.target.value;
      updateDigitalPreview();
    });
    row.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.table.rows.splice(rIdx, 1);
      renderTableEditor(deck.cards[activeCardIndex].back.table);
      updateDigitalPreview();
    });
    elements.tableRowsContainer.appendChild(row);
  });
}

function renderTimelineEditor(timeline) {
  if (!elements.timelineNodesContainer) return;
  elements.timelineNodesContainer.innerHTML = '';
  (timeline.items || []).forEach((node, idx) => {
    const el = document.createElement('div');
    el.className = 'timeline-edit-node';
    el.innerHTML = `
      <input type="text" value="${escapeHtml(node.label || '')}" placeholder="Label" style="flex:1;">
      <input type="text" value="${escapeHtml(node.detail || '')}" placeholder="Details" style="flex:2;">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    el.querySelectorAll('input')[0].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.timeline.items[idx].label = e.target.value;
      updateDigitalPreview();
    });
    el.querySelectorAll('input')[1].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.timeline.items[idx].detail = e.target.value;
      updateDigitalPreview();
    });
    el.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.timeline.items.splice(idx, 1);
      renderTimelineEditor(deck.cards[activeCardIndex].back.timeline);
      updateDigitalPreview();
    });
    elements.timelineNodesContainer.appendChild(el);
  });
}

function renderChartEditor(chart) {
  if (!elements.chartBarsContainer) return;
  elements.chartBarsContainer.innerHTML = '';
  (chart.bars || []).forEach((bar, idx) => {
    const el = document.createElement('div');
    el.className = 'chart-edit-bar';
    el.innerHTML = `
      <input type="text" value="${escapeHtml(bar.lbl || '')}" placeholder="Lbl" style="width:40px;">
      <input type="number" value="${bar.h}" placeholder="H" style="width:45px;">
      <input type="color" value="${bar.color || '#3b82f6'}" style="width:25px; height:20px; padding:0; border:none; cursor:pointer;">
      <button class="action-btn-mini remove-row-btn">×</button>
    `;
    el.querySelectorAll('input')[0].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.chart.bars[idx].lbl = e.target.value;
      updateDigitalPreview();
    });
    el.querySelectorAll('input')[1].addEventListener('input', (e) => {
      const val = Math.min(30, Math.max(2, parseInt(e.target.value) || 0));
      deck.cards[activeCardIndex].back.chart.bars[idx].h = val;
      deck.cards[activeCardIndex].back.chart.bars[idx].y = 38 - val;
      updateDigitalPreview();
    });
    el.querySelectorAll('input')[2].addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.chart.bars[idx].color = e.target.value;
      updateDigitalPreview();
    });
    el.querySelector('.remove-row-btn').addEventListener('click', () => {
      deck.cards[activeCardIndex].back.chart.bars.splice(idx, 1);
      renderChartEditor(deck.cards[activeCardIndex].back.chart);
      updateDigitalPreview();
    });
    elements.chartBarsContainer.appendChild(el);
  });
}

function setupDynamicElementEvents() {
  if (elements.addKeyPointBtn) {
    elements.addKeyPointBtn.addEventListener('click', () => {
      if (activeCardIndex === -1) return;
      const card = deck.cards[activeCardIndex];
      if (!card.back.key_points) card.back.key_points = [];
      card.back.key_points.push("Bullet");
      renderKeyPointsList(card.back.key_points);
      updateDigitalPreview();
    });
  }
  if (elements.addTableRowBtn) {
    elements.addTableRowBtn.addEventListener('click', () => {
      if (activeCardIndex === -1) return;
      const card = deck.cards[activeCardIndex];
      if (!card.back.table.rows) card.back.table.rows = [];
      card.back.table.rows.push(["Data", "Data"]);
      renderTableEditor(card.back.table);
      updateDigitalPreview();
    });
  }
  if (elements.th1) {
    elements.th1.addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.table.headers[0] = e.target.value;
      updateDigitalPreview();
    });
  }
  if (elements.th2) {
    elements.th2.addEventListener('input', (e) => {
      deck.cards[activeCardIndex].back.table.headers[1] = e.target.value;
      updateDigitalPreview();
    });
  }
  if (elements.addTimelineNodeBtn) {
    elements.addTimelineNodeBtn.addEventListener('click', () => {
      if (activeCardIndex === -1) return;
      const card = deck.cards[activeCardIndex];
      if (!card.back.timeline.items) card.back.timeline.items = [];
      card.back.timeline.items.push({ label: "Step", detail: "Description details." });
      renderTimelineEditor(card.back.timeline);
      updateDigitalPreview();
    });
  }
  if (elements.addChartBarBtn) {
    elements.addChartBarBtn.addEventListener('click', () => {
      if (activeCardIndex === -1) return;
      const card = deck.cards[activeCardIndex];
      if (!card.back.chart.bars) card.back.chart.bars = [];
      const count = card.back.chart.bars.length;
      const barX = 10 + (count * 20);
      card.back.chart.bars.push({ x: barX, y: 18, h: 20, color: "var(--theme-color)", tx: barX + 4, lbl: String.fromCharCode(65 + count) });
      renderChartEditor(card.back.chart);
      updateDigitalPreview();
    });
  }
  if (elements.asciiDiagramInput) {
    elements.asciiDiagramInput.addEventListener('input', (e) => {
      updateCardField('back.diagram', e.target.value);
    });
  }

  // Bind new list buttons and single inputs for 15 elements
  const addBtn = (id, prop, defaultValue, renderFunc) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        if (activeCardIndex === -1) return;
        const card = deck.cards[activeCardIndex];
        if (!card.back[prop]) card.back[prop] = { items: [] };
        if (!card.back[prop].items) card.back[prop].items = [];
        card.back[prop].items.push(JSON.parse(JSON.stringify(defaultValue)));
        renderFunc(card.back[prop].items);
        updateDigitalPreview();
      });
    }
  };

  addBtn('add-checklist-item-btn', 'checklist', { text: 'Task item', checked: false }, renderChecklistEditor);
  addBtn('add-step-btn', 'numbered_steps', { num: '1', detail: 'Description' }, renderStepsEditor);
  
  const addTagBtn = document.getElementById('add-tag-btn');
  if (addTagBtn) {
    addTagBtn.addEventListener('click', () => {
      if (activeCardIndex === -1) return;
      const card = deck.cards[activeCardIndex];
      if (!card.back.tags_row) card.back.tags_row = { items: [] };
      if (!card.back.tags_row.items) card.back.tags_row.items = [];
      card.back.tags_row.items.push("New Tag");
      renderTagsEditor(card.back.tags_row.items);
      updateDigitalPreview();
    });
  }

  addBtn('add-legend-btn', 'variable_legend', { sym: 'x', def: 'Variable definition' }, renderLegendEditor);

  const updateProp = (type, key, val) => {
    if (activeCardIndex === -1) return;
    const card = deck.cards[activeCardIndex];
    if (!card.back[type]) card.back[type] = {};
    card.back[type][key] = val;
    updateDigitalPreview();
  };

  const bind = (id, type, key, isNum = false) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        const val = isNum ? parseInt(e.target.value) || 0 : e.target.value;
        updateProp(type, key, val);
      });
      el.addEventListener('change', (e) => {
        const val = isNum ? parseInt(e.target.value) || 0 : e.target.value;
        updateProp(type, key, val);
      });
    }
  };

  bind('qr-link-input', 'qr_code', 'url');
  bind('qr-label-input', 'qr_code', 'label');

  bind('social-platform-select', 'social_badge', 'platform');
  bind('social-handle-input', 'social_badge', 'handle');

  bind('rating-label-input', 'rating', 'label');
  bind('rating-stars-input', 'rating', 'stars', true);

  bind('progress-label-input', 'progress_bar', 'label');
  bind('progress-percent-input', 'progress_bar', 'percent', true);

  bind('console-cmd-input', 'console_output', 'cmd');
  bind('console-out-input', 'console_output', 'out');

  bind('stat-atk', 'game_stats', 'atk', true);
  bind('stat-def', 'game_stats', 'def', true);
  bind('stat-spd', 'game_stats', 'spd', true);
  bind('stat-mana', 'game_stats', 'mana', true);

  bind('audio-label-input', 'audio_bar', 'label');
  bind('audio-time-input', 'audio_bar', 'time');

  bind('callout-text-input', 'callout', 'text');
  const calloutType = document.getElementById('callout-type-select');
  if (calloutType) {
    calloutType.addEventListener('change', (e) => {
      if (activeCardIndex === -1) return;
      const card = deck.cards[activeCardIndex];
      const type = e.target.value;
      card.back.callout = {
        type: type,
        text: card.back.callout ? card.back.callout.text || '' : '',
        warning: type === 'warning',
        info: type === 'info',
        success: type === 'success'
      };
      updateDigitalPreview();
    });
  }

  bind('lookup-phonetic', 'term_lookup', 'phonetic');
  bind('lookup-class', 'term_lookup', 'class');
  bind('lookup-origin', 'term_lookup', 'origin');

  bind('citation-source', 'citation', 'source');
  bind('citation-ref', 'citation', 'ref');

  bind('loc-name-input', 'location_pin', 'name');
  bind('loc-coords-input', 'location_pin', 'coords');
}

/* ==========================================================================
   Universal Style & Location Inspector Tool Panel
   ========================================================================== */
function setupStyleInspector() {
  if (elements.stylerTargetSelect) {
    elements.stylerTargetSelect.addEventListener('change', syncStyleInspectorValues);
  }

  const applyStyles = (allCards = false) => {
    if (activeCardIndex === -1) return;
    const target = elements.stylerTargetSelect.value;
    const styleObj = {
      'font-size': elements.inspectorFontSize.value,
      'font-family': elements.inspectorFontFamily.value,
      'text-align': elements.inspectorTextAlign.value,
      'margin-top': elements.inspectorMarginTop.value,
      'margin-bottom': elements.inspectorMarginBottom.value
    };

    const styleStr = buildCSSStyleString(styleObj);
    
    const applyToCard = (card) => {
      if (target.startsWith('front.')) {
        const field = target.replace('front.', '');
        if (!card.front) card.front = {};
        card.front[`${field}_style`] = styleStr;
      } else if (target.startsWith('back.')) {
        const field = target.replace('back.', '');
        if (!card.back) card.back = {};
        if (field === 'image') {
          if (card.back.image) {
            card.back.image.fit = elements.inspectorImgFit.value;
          }
        } else {
          card.back[`${field}_style`] = styleStr;
        }
      }
    };

    if (allCards) {
      deck.cards.forEach(applyToCard);
      alert(`Applied styling for ${target} to all cards in the deck!`);
    } else {
      applyToCard(deck.cards[activeCardIndex]);
    }

    updateDigitalPreview();
    updatePrintPreview();
  };

  if (elements.btnStylerApplyThis) {
    elements.btnStylerApplyThis.addEventListener('click', () => applyStyles(false));
  }
  if (elements.btnStylerApplyAll) {
    elements.btnStylerApplyAll.addEventListener('click', () => applyStyles(true));
  }
}

function syncStyleInspectorValues() {
  if (activeCardIndex === -1) return;
  const target = elements.stylerTargetSelect.value;
  const card = deck.cards[activeCardIndex];
  
  let styleStr = "";
  if (target.startsWith('front.')) {
    const field = target.replace('front.', '');
    styleStr = (card.front && card.front[`${field}_style`]) || "";
  } else if (target.startsWith('back.')) {
    const field = target.replace('back.', '');
    styleStr = (card.back && card.back[`${field}_style`]) || "";
  }

  const styleObj = parseCSSStyleString(styleStr);
  
  if (elements.inspectorFontSize) elements.inspectorFontSize.value = styleObj['font-size'] || '';
  if (elements.inspectorFontFamily) elements.inspectorFontFamily.value = styleObj['font-family'] || 'var(--font-display)';
  if (elements.inspectorTextAlign) elements.inspectorTextAlign.value = styleObj['text-align'] || 'left';
  if (elements.inspectorMarginTop) elements.inspectorMarginTop.value = styleObj['margin-top'] || '';
  if (elements.inspectorMarginBottom) elements.inspectorMarginBottom.value = styleObj['margin-bottom'] || '';
  
  if (target === 'back.image' && card.back.image && elements.inspectorImgFit) {
    elements.inspectorImgFit.value = card.back.image.fit || 'cover';
  }
}

function parseCSSStyleString(css) {
  if (!css) return {};
  const obj = {};
  css.split(';').forEach(rule => {
    const parts = rule.split(':');
    if (parts.length === 2) {
      obj[parts[0].trim()] = parts[1].trim();
    }
  });
  return obj;
}

function buildCSSStyleString(obj) {
  return Object.entries(obj)
    .filter(([k, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ') + ';';
}

/* ==========================================================================
   Unified AI Prompt & Importer Manager
   ========================================================================== */
function setupPromptManager() {
  if (elements.promptTaskSelect) {
    elements.promptTaskSelect.addEventListener('change', updateAIPromptDisplay);
  }
  updateAIPromptDisplay();

  if (elements.promptImportBtn) {
    elements.promptImportBtn.addEventListener('click', executePromptBulkImport);
  }
}

function updateAIPromptDisplay() {
  const task = elements.promptTaskSelect ? elements.promptTaskSelect.value : 'decks';
  let promptText = "";

  if (task === 'decks') {
    promptText = `Act as an expert content writer for yaad card physical flashcards.
Create a high-yield flashcard set about the topic: "${deck.name || 'Stoic wisdom'}".
Produce exactly 36 flashcards for cost-optimized printing.

STRICT WRITING & DESIGN RULES:
1. FOCUS ON HIGH-YIELD INFORMATION: Distil complex, dense syllabi into compact facts, rules, formulas, timelines, or diagrams.
2. FRONT SIDE: Main concept name in 'front.title'.
3. BACK SIDE:
   - Back Title ('back.title'): Max 3 words (max 20 characters).
   - Tagline ('back.tagline'): Max 6 words.
   - Summary ('back.summary'): Max 18 words.
4. LATEX FORMULAS: Render math using LaTeX formatting. Wrap inline in $...$ and display in $$...$$. Double-escape backslashes.
5. ADVANCED ELEMENT: Carry exactly one element (key_points, table, timeline, diagram, chart).

Respond ONLY with a valid JSON array of objects conforming to the schema.`;
  } else {
    promptText = `Act as a professional copywriter for yaad card packaging tuck boxes.
Write copy details for the tuck box holding the deck: "${deck.name}".

Provide a raw JSON response matching the following keys:
{
  "title": "DECK SUBJECT TITLE (Max 20 chars)",
  "subtitle": "Short Tagline (Max 30 chars)",
  "description": "Engaging back-side summary describing what this deck contains, how it helps learn, etc. (Max 80 words)"
}`;
  }

  if (elements.aiPromptInstructions) elements.aiPromptInstructions.value = promptText;

  if (elements.copyAiPromptBtn) {
    elements.copyAiPromptBtn.onclick = () => {
      navigator.clipboard.writeText(promptText).then(() => {
        const originalText = elements.copyAiPromptBtn.innerHTML;
        elements.copyAiPromptBtn.textContent = "📋 Prompt Copied!";
        elements.copyAiPromptBtn.style.background = "#10b981";
        setTimeout(() => {
          elements.copyAiPromptBtn.innerHTML = originalText;
          elements.copyAiPromptBtn.style.background = "";
        }, 2000);
      });
    };
  }
}

function executePromptBulkImport() {
  const jsonStr = elements.promptImportTextarea.value.trim();
  const statusEl = elements.promptImportStatus;
  const task = elements.promptTaskSelect.value;
  
  if (!jsonStr) {
    statusEl.style.color = "#ef4444";
    statusEl.textContent = "Input is empty.";
    return;
  }

  try {
    const parsed = JSON.parse(jsonStr);
    
    if (task === 'decks') {
      let cardsArray = Array.isArray(parsed) ? parsed : (parsed.cards || []);
      if (cardsArray.length === 0) throw new Error("No cards array found.");
      
      const normalizedCards = cardsArray.map((card, idx) => {
        const c = {
          id: card.id || (Date.now() + idx),
          theme: card.theme || "cyan",
          template: card.template || "standard",
          front: {
            title: card.front_title || (card.front && card.front.title) || card.keyword || `Card #${idx+1}`,
            tagline: card.front_tagline || (card.front && card.front.tagline) || "",
            category: card.category || (card.front && card.front.category) || ""
          },
          back: {
            title: card.back_title || (card.back && card.back.title) || card.keyword || "",
            tagline: card.back_tagline || (card.back && card.back.tagline) || "",
            summary: card.back_summary || (card.back && card.back.summary) || card.definition || "",
            hp: card.hp || (card.back && card.back.hp) || ""
          }
        };
        
        const b = card.back || card;
        if (b.key_points) c.back.key_points = b.key_points;
        if (b.table) c.back.table = b.table;
        if (b.timeline) c.back.timeline = b.timeline;
        if (b.chart) c.back.chart = b.chart;
        if (b.diagram) c.back.diagram = b.diagram;
        
        return c;
      });

      deck.cards = normalizedCards;
      renderSidebar();
      selectCard(0);
      updatePrintPreview();
      statusEl.style.color = "#10b981";
      statusEl.textContent = `Imported ${normalizedCards.length} cards!`;
    } else {
      deck.packaging.title = parsed.title || deck.packaging.title;
      deck.packaging.subtitle = parsed.subtitle || deck.packaging.subtitle;
      deck.packaging.description = parsed.description || deck.packaging.description;
      syncPackagingInputs();
      updatePrintPreview();
      updatePackagingPreview();
      statusEl.style.color = "#10b981";
      statusEl.textContent = "Imported packaging details successfully!";
    }
  } catch (err) {
    statusEl.style.color = "#ef4444";
    statusEl.textContent = `Error: ${err.message}`;
  }
}

/* ==========================================================================
   Pasting Single Card JSON Operations
   ========================================================================== */
function setupSingleImportDialog() {
  if (elements.addJsonCardBtn) {
    elements.addJsonCardBtn.addEventListener('click', () => {
      openWindow('win-single-json');
    });
  }

  if (elements.btnCloseSingleImport) {
    elements.btnCloseSingleImport.addEventListener('click', () => {
      minimizeWindow('win-single-json');
    });
  }

  if (elements.btnDoSingleImport) {
    elements.btnDoSingleImport.addEventListener('click', () => {
      const val = elements.singleCardJsonTextarea.value.trim();
      const statusEl = elements.singleImportStatus;
      
      try {
        const cardObj = JSON.parse(val);
        const c = {
          id: cardObj.id || Date.now(),
          theme: cardObj.theme || "cyan",
          template: cardObj.template || "standard",
          front: {
            title: cardObj.front_title || (cardObj.front && cardObj.front.title) || "Single concept",
            tagline: (cardObj.front && cardObj.front.tagline) || "",
            category: (cardObj.front && cardObj.front.category) || ""
          },
          back: {
            title: cardObj.back_title || (cardObj.back && cardObj.back.title) || "",
            tagline: (cardObj.back && cardObj.back.tagline) || "",
            summary: cardObj.back_summary || (cardObj.back && cardObj.back.summary) || cardObj.definition || ""
          }
        };
        
        const b = cardObj.back || cardObj;
        if (b.key_points) c.back.key_points = b.key_points;
        if (b.table) c.back.table = b.table;
        if (b.timeline) c.back.timeline = b.timeline;
        if (b.chart) c.back.chart = b.chart;
        if (b.diagram) c.back.diagram = b.diagram;

        deck.cards.push(c);
        renderSidebar();
        selectCard(deck.cards.length - 1);
        updatePrintPreview();
        
        statusEl.style.color = "#10b981";
        statusEl.textContent = "Added successfully!";
        setTimeout(() => {
          minimizeWindow('win-single-json');
          elements.singleCardJsonTextarea.value = '';
          statusEl.textContent = '';
        }, 1000);
      } catch (err) {
        statusEl.style.color = "#ef4444";
        statusEl.textContent = `Error: ${err.message}`;
      }
    });
  }
}

/* ==========================================================================
   Image Loader Operations
   ========================================================================== */
function syncImageEditorControls(card) {
  const getPrefixElement = (pref, key) => {
    if (pref === 'front') {
      return document.getElementById(`front-${key}`);
    }
    if (key === 'image-upload') return document.getElementById('card-image-upload');
    if (key === 'image-btn') return document.getElementById('remove-card-image-btn');
    if (key === 'image-url') return document.getElementById('card-image-url');
    if (key === 'bleed-toggle') return document.getElementById('card-bleed-toggle');
    if (key === 'image-adjustment-controls') return document.getElementById('image-adjustment-controls');
    if (key === 'bg-opacity-group') return document.getElementById('bg-opacity-group');
    if (key === 'image-style-select') return document.getElementById('image-style-select');
    if (key === 'image-fit-select') return document.getElementById('image-fit-select');
    if (key === 'image-zoom-slider') return document.getElementById('image-zoom-slider');
    if (key === 'image-posx-slider') return document.getElementById('image-posx-slider');
    if (key === 'image-posy-slider') return document.getElementById('image-posy-slider');
    if (key === 'image-opacity-slider') return document.getElementById('image-opacity-slider');
    if (key === 'image-grayscale-slider') return document.getElementById('image-grayscale-slider');
    if (key === 'image-brightness-slider') return document.getElementById('image-brightness-slider');
    if (key === 'image-contrast-slider') return document.getElementById('image-contrast-slider');
    if (key === 'image-rotation-select') return document.getElementById('image-rotation-select');
    if (key === 'image-bg-color-picker') return document.getElementById('image-bg-color-picker');
    if (key.includes('width') || key.includes('height') || key.includes('margin') || key.includes('outline')) {
      return document.getElementById(`back-${key}`);
    }
    return document.getElementById(key);
  };

  // Helper to sync single side image controls
  const syncSide = (img, prefix) => {
    const removeBtn = getPrefixElement(prefix, 'image-btn');
    const adjustPane = getPrefixElement(prefix, 'image-adjustment-controls');
    const bleedToggle = getPrefixElement(prefix, 'bleed-toggle');
    const urlInput = getPrefixElement(prefix, 'image-url');
    
    if (img && img.url) {
      if (removeBtn) removeBtn.style.display = 'inline-block';
      if (adjustPane) adjustPane.style.display = 'block';
      if (bleedToggle) bleedToggle.checked = img.fullBleed || false;
      if (urlInput) urlInput.value = img.url || '';
      
      const styleSelect = getPrefixElement(prefix, 'image-style-select');
      const fitSelect = getPrefixElement(prefix, 'image-fit-select');
      const zoomSlider = getPrefixElement(prefix, 'image-zoom-slider');
      const posxSlider = getPrefixElement(prefix, 'image-posx-slider');
      const posySlider = getPrefixElement(prefix, 'image-posy-slider');
      const opacitySlider = getPrefixElement(prefix, 'image-opacity-slider');
      const grayscaleSlider = getPrefixElement(prefix, 'image-grayscale-slider');
      const brightnessSlider = getPrefixElement(prefix, 'image-brightness-slider');
      const contrastSlider = getPrefixElement(prefix, 'image-contrast-slider');
      const rotationSelect = getPrefixElement(prefix, 'image-rotation-select');
      const bgColorPicker = getPrefixElement(prefix, 'image-bg-color-picker');
      
      // Content block specific
      const widthSlider = getPrefixElement(prefix, 'image-width-slider');
      const heightSlider = getPrefixElement(prefix, 'image-height-slider');
      const marginSlider = getPrefixElement(prefix, 'image-margin-slider');
      const outlineToggle = getPrefixElement(prefix, 'image-outline-toggle');
      
      if (styleSelect) styleSelect.value = img.style || 'content';
      if (fitSelect) fitSelect.value = img.fit || 'cover';
      if (zoomSlider) zoomSlider.value = img.zoom || 100;
      if (posxSlider) posxSlider.value = img.posx || 50;
      if (posySlider) posySlider.value = img.posy || 50;
      if (opacitySlider) opacitySlider.value = img.opacity || 15;
      if (grayscaleSlider) grayscaleSlider.value = img.grayscale || 0;
      if (brightnessSlider) brightnessSlider.value = img.brightness || 100;
      if (contrastSlider) contrastSlider.value = img.contrast || 100;
      if (rotationSelect) rotationSelect.value = img.rotation || "0";
      if (bgColorPicker) bgColorPicker.value = img.bgColor || "#ffffff";
      
      if (widthSlider) widthSlider.value = img.width !== undefined ? img.width : 100;
      if (heightSlider) heightSlider.value = img.height !== undefined ? img.height : 55;
      if (marginSlider) marginSlider.value = img.margin !== undefined ? img.margin : 0;
      if (outlineToggle) outlineToggle.checked = img.outline !== undefined ? img.outline : true;

      // Labels
      const zoomVal = getPrefixElement(prefix, 'zoom-val');
      const posxVal = getPrefixElement(prefix, 'posx-val');
      const posyVal = getPrefixElement(prefix, 'posy-val');
      const opacityVal = getPrefixElement(prefix, 'opacity-val');
      const grayscaleVal = getPrefixElement(prefix, 'grayscale-val');
      const brightnessVal = getPrefixElement(prefix, 'brightness-val');
      const contrastVal = getPrefixElement(prefix, 'contrast-val');
      
      const widthVal = getPrefixElement(prefix, 'width-val');
      const heightVal = getPrefixElement(prefix, 'height-val');
      const marginVal = getPrefixElement(prefix, 'margin-val');

      if (zoomVal) zoomVal.textContent = (img.zoom || 100) + '%';
      if (posxVal) posxVal.textContent = (img.posx || 50) + '%';
      if (posyVal) posyVal.textContent = (img.posy || 50) + '%';
      if (opacityVal) opacityVal.textContent = ((img.opacity || 15) / 100).toFixed(2);
      if (grayscaleVal) grayscaleVal.textContent = (img.grayscale || 0) + '%';
      if (brightnessVal) brightnessVal.textContent = (img.brightness || 100) + '%';
      if (contrastVal) contrastVal.textContent = (img.contrast || 100) + '%';
      
      if (widthVal) widthVal.textContent = (img.width !== undefined ? img.width : 100) + '%';
      if (heightVal) heightVal.textContent = (img.height !== undefined ? img.height : 55) + 'px';
      if (marginVal) marginVal.textContent = (img.margin !== undefined ? img.margin : 0) + 'px';

      const bgOpacityGrp = getPrefixElement(prefix, 'bg-opacity-group');
      if (bgOpacityGrp) bgOpacityGrp.style.display = (img.style === 'background') ? 'block' : 'none';

      // Hide content block controls if style is background or icon
      const contentControls = document.querySelector(`.${prefix}-content-block-only-controls`);
      if (contentControls) contentControls.style.display = (img.style === 'content') ? 'flex' : 'none';
      
    } else {
      if (removeBtn) removeBtn.style.display = 'none';
      if (adjustPane) adjustPane.style.display = 'none';
      if (bleedToggle) bleedToggle.checked = false;
      if (urlInput) urlInput.value = '';
    }
  };

  syncSide(card.front.image, 'front');
  syncSide(card.back.image, 'back');
}

function setupImageControls() {
  const getPrefixElement = (pref, key) => {
    if (pref === 'front') {
      return document.getElementById(`front-${key}`);
    }
    if (key === 'image-upload') return document.getElementById('card-image-upload');
    if (key === 'image-btn') return document.getElementById('remove-card-image-btn');
    if (key === 'image-url') return document.getElementById('card-image-url');
    if (key === 'bleed-toggle') return document.getElementById('card-bleed-toggle');
    if (key === 'image-adjustment-controls') return document.getElementById('image-adjustment-controls');
    if (key === 'bg-opacity-group') return document.getElementById('bg-opacity-group');
    if (key === 'image-style-select') return document.getElementById('image-style-select');
    if (key === 'image-fit-select') return document.getElementById('image-fit-select');
    if (key === 'image-zoom-slider') return document.getElementById('image-zoom-slider');
    if (key === 'image-posx-slider') return document.getElementById('image-posx-slider');
    if (key === 'image-posy-slider') return document.getElementById('image-posy-slider');
    if (key === 'image-opacity-slider') return document.getElementById('image-opacity-slider');
    if (key === 'image-grayscale-slider') return document.getElementById('image-grayscale-slider');
    if (key === 'image-brightness-slider') return document.getElementById('image-brightness-slider');
    if (key === 'image-contrast-slider') return document.getElementById('image-contrast-slider');
    if (key === 'image-rotation-select') return document.getElementById('image-rotation-select');
    if (key === 'image-bg-color-picker') return document.getElementById('image-bg-color-picker');
    if (key.includes('width') || key.includes('height') || key.includes('margin') || key.includes('outline')) {
      return document.getElementById(`back-${key}`);
    }
    return document.getElementById(key);
  };

  const registerSideEvents = (prefix, faceName) => {
    const uploadEl = getPrefixElement(prefix, 'image-upload');
    const removeBtn = getPrefixElement(prefix, 'image-btn');
    const urlInput = getPrefixElement(prefix, 'image-url');
    const bleedToggle = getPrefixElement(prefix, 'bleed-toggle');
    
    if (uploadEl) {
      uploadEl.addEventListener('change', async (e) => {
        if (activeCardIndex === -1) return;
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.success) {
            deck.cards[activeCardIndex][faceName].image = {
              url: data.url,
              style: "content",
              fit: "cover",
              zoom: 100,
              posx: 50,
              posy: 50,
              opacity: 15,
              grayscale: 0,
              brightness: 100,
              contrast: 100,
              rotation: "0",
              bgColor: "#ffffff",
              fullBleed: false,
              width: 100,
              height: 55,
              margin: 0,
              outline: true
            };
            selectCard(activeCardIndex);
            updateDigitalPreview();
          }
        } catch (err) {
          alert("Upload error: " + err);
        }
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        if (activeCardIndex === -1) return;
        delete deck.cards[activeCardIndex][faceName].image;
        selectCard(activeCardIndex);
        updateDigitalPreview();
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', (e) => {
        if (activeCardIndex === -1) return;
        const imgVal = e.target.value.trim();
        if (imgVal === '') {
          delete deck.cards[activeCardIndex][faceName].image;
        } else {
          if (!deck.cards[activeCardIndex][faceName].image) {
            deck.cards[activeCardIndex][faceName].image = {
              style: "content",
              fit: "cover",
              zoom: 100,
              posx: 50,
              posy: 50,
              opacity: 15,
              grayscale: 0,
              brightness: 100,
              contrast: 100,
              rotation: "0",
              bgColor: "#ffffff",
              fullBleed: false,
              width: 100,
              height: 55,
              margin: 0,
              outline: true
            };
          }
          deck.cards[activeCardIndex][faceName].image.url = imgVal;
        }
        selectCard(activeCardIndex);
        updateDigitalPreview();
      });
    }

    if (bleedToggle) {
      bleedToggle.addEventListener('change', (e) => {
        if (activeCardIndex === -1) return;
        const img = deck.cards[activeCardIndex][faceName].image;
        if (img) {
          img.fullBleed = e.target.checked;
          if (e.target.checked) {
            img.style = "background";
            img.opacity = 100;
          } else {
            img.style = "content";
            img.opacity = 15;
          }
          selectCard(activeCardIndex);
        }
      });
    }

    const updateImageProp = (prop, val) => {
      if (activeCardIndex === -1) return;
      const img = deck.cards[activeCardIndex][faceName].image;
      if (img) {
        img[prop] = val;
        updateDigitalPreview();
      }
    };

    const styleSelect = getPrefixElement(prefix, 'image-style-select');
    if (styleSelect) {
      styleSelect.addEventListener('change', (e) => {
        updateImageProp('style', e.target.value);
        selectCard(activeCardIndex);
      });
    }

    const fitSelect = getPrefixElement(prefix, 'image-fit-select');
    if (fitSelect) {
      fitSelect.addEventListener('change', (e) => updateImageProp('fit', e.target.value));
    }

    const bindSlider = (sliderId, labelId, prop, suffix = '') => {
      const slider = getPrefixElement(prefix, sliderId);
      const label = getPrefixElement(prefix, labelId);
      if (slider) {
        slider.addEventListener('input', (e) => {
          const val = parseInt(e.target.value);
          updateImageProp(prop, val);
          if (label) label.textContent = val + suffix;
        });
      }
    };

    bindSlider('image-zoom-slider', 'zoom-val', 'zoom', '%');
    bindSlider('image-posx-slider', 'posx-val', 'posx', '%');
    bindSlider('image-posy-slider', 'posy-val', 'posy', '%');
    bindSlider('image-grayscale-slider', 'grayscale-val', 'grayscale', '%');
    bindSlider('image-brightness-slider', 'brightness-val', 'brightness', '%');
    bindSlider('image-contrast-slider', 'contrast-val', 'contrast', '%');
    
    bindSlider('image-width-slider', 'width-val', 'width', '%');
    bindSlider('image-height-slider', 'height-val', 'height', 'px');
    bindSlider('image-margin-slider', 'margin-val', 'margin', 'px');

    const outlineToggle = getPrefixElement(prefix, 'image-outline-toggle');
    if (outlineToggle) {
      outlineToggle.addEventListener('change', (e) => {
        updateImageProp('outline', e.target.checked);
      });
    }

    const opacitySlider = getPrefixElement(prefix, 'image-opacity-slider');
    if (opacitySlider) {
      opacitySlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        updateImageProp('opacity', val);
        const lbl = getPrefixElement(prefix, 'opacity-val');
        if (lbl) lbl.textContent = (val / 100).toFixed(2);
      });
    }

    const rotationSelect = getPrefixElement(prefix, 'image-rotation-select');
    if (rotationSelect) {
      rotationSelect.addEventListener('change', (e) => updateImageProp('rotation', e.target.value));
    }

    const bgColorPicker = getPrefixElement(prefix, 'image-bg-color-picker');
    if (bgColorPicker) {
      bgColorPicker.addEventListener('input', (e) => updateImageProp('bgColor', e.target.value));
    }
  };

  registerSideEvents('front', 'front');
  registerSideEvents('back', 'back');
}

/* ==========================================================================
   Packaging Design Details Synchronisation & Live Previews
   ========================================================================== */
function syncPackagingInputs() {
  const p = deck.packaging;
  if (elements.packBrandInput) elements.packBrandInput.value = p.brand || p.website || 'yaad card';
  if (elements.packSubjectInput) elements.packSubjectInput.value = p.title || '';
  if (elements.packSubtitleInput) elements.packSubtitleInput.value = p.subtitle || '';
  if (elements.packMrpInput) elements.packMrpInput.value = p.mrp || '';
  if (elements.packDescInput) elements.packDescInput.value = p.description || '';
  if (elements.packWebsiteInput) elements.packWebsiteInput.value = p.website || '';
  if (elements.packFootnoteInput) elements.packFootnoteInput.value = p.footnote || '';
  if (elements.packBleedToggle) elements.packBleedToggle.checked = p.fullBleed || false;
  
  if (p.stripeColors && p.stripeColors.length === 5) {
    if (elements.stripeC1) elements.stripeC1.value = p.stripeColors[0];
    if (elements.stripeC2) elements.stripeC2.value = p.stripeColors[1];
    if (elements.stripeC3) elements.stripeC3.value = p.stripeColors[2];
    if (elements.stripeC4) elements.stripeC4.value = p.stripeColors[3];
    if (elements.stripeC5) elements.stripeC5.value = p.stripeColors[4];
  }

  const updateUrlVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };
  updateUrlVal('pack-cover-url-front', p.coverImage);
  updateUrlVal('pack-cover-url-back', p.coverImageBack);
  updateUrlVal('pack-cover-url-left', p.coverImageLeft);
  updateUrlVal('pack-cover-url-right', p.coverImageRight);
  updateUrlVal('pack-cover-url-top', p.coverImageTop);
  updateUrlVal('pack-cover-url-bottom', p.coverImageBottom);
}

function updatePackagingPreview() {
  if (elements.singlePackagingPreviewContainer) {
    elements.singlePackagingPreviewContainer.innerHTML = '';
    elements.singlePackagingPreviewContainer.appendChild(createTuckBoxNetHtml());
  }
}

function scalePackagingPreview() {
  const container = document.getElementById('single-packaging-preview-container');
  const win = document.getElementById('win-packaging-preview');
  if (!container || !win) return;
  const winBody = win.querySelector('.win-body');
  const targetWidth = winBody.clientWidth - 40;
  const scale = targetWidth / 680; 
  container.style.transform = `scale(${Math.min(1, scale)})`;
}
window.addEventListener('resize', scalePackagingPreview);

function setupPackagingEvents() {
  const updatePackProp = (prop, val) => {
    deck.packaging[prop] = val;
    updatePackagingPreview();
    if (elements.printPreviewMode && elements.printPreviewMode.value === 'packaging') {
      updatePrintPreview();
    }
  };

  if (elements.packBrandInput) elements.packBrandInput.addEventListener('input', (e) => updatePackProp('brand', e.target.value));
  if (elements.packSubjectInput) elements.packSubjectInput.addEventListener('input', (e) => updatePackProp('title', e.target.value));
  if (elements.packSubtitleInput) elements.packSubtitleInput.addEventListener('input', (e) => updatePackProp('subtitle', e.target.value));
  if (elements.packMrpInput) elements.packMrpInput.addEventListener('input', (e) => updatePackProp('mrp', e.target.value));
  if (elements.packDescInput) elements.packDescInput.addEventListener('input', (e) => updatePackProp('description', e.target.value));
  if (elements.packWebsiteInput) elements.packWebsiteInput.addEventListener('input', (e) => updatePackProp('website', e.target.value));
  if (elements.packFootnoteInput) elements.packFootnoteInput.addEventListener('input', (e) => updatePackProp('footnote', e.target.value));
  
  if (elements.packBleedToggle) {
    elements.packBleedToggle.addEventListener('change', (e) => {
      updatePackProp('fullBleed', e.target.checked);
    });
  }

  const colors = [elements.stripeC1, elements.stripeC2, elements.stripeC3, elements.stripeC4, elements.stripeC5];
  colors.forEach((col, idx) => {
    if (col) {
      col.addEventListener('input', (e) => {
        deck.packaging.stripeColors[idx] = e.target.value;
        updatePackagingPreview();
        if (elements.printPreviewMode && elements.printPreviewMode.value === 'packaging') updatePrintPreview();
      });
    }
  });

  const registerPackPanelEvents = (sideName, uploadId, urlId, stateKey) => {
    const uploadEl = document.getElementById(uploadId);
    const urlEl = document.getElementById(urlId);
    
    if (uploadEl) {
      uploadEl.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.success) {
            deck.packaging[stateKey] = data.url;
            if (urlEl) urlEl.value = data.url;
            updatePackagingPreview();
            if (elements.printPreviewMode && elements.printPreviewMode.value === 'packaging') updatePrintPreview();
          }
        } catch (err) {
          alert(`Error uploading ${sideName} artwork: ` + err);
        }
      });
    }
    
    if (urlEl) {
      urlEl.addEventListener('input', (e) => {
        deck.packaging[stateKey] = e.target.value;
        updatePackagingPreview();
        if (elements.printPreviewMode && elements.printPreviewMode.value === 'packaging') updatePrintPreview();
      });
    }
  };

  registerPackPanelEvents('front', 'pack-cover-upload', 'pack-cover-url-front', 'coverImage');
  registerPackPanelEvents('back', 'pack-cover-upload-back', 'pack-cover-url-back', 'coverImageBack');
  registerPackPanelEvents('left', 'pack-cover-upload-left', 'pack-cover-url-left', 'coverImageLeft');
  registerPackPanelEvents('right', 'pack-cover-upload-right', 'pack-cover-url-right', 'coverImageRight');
  registerPackPanelEvents('top', 'pack-cover-upload-top', 'pack-cover-url-top', 'coverImageTop');
  registerPackPanelEvents('bottom', 'pack-cover-upload-bottom', 'pack-cover-url-bottom', 'coverImageBottom');

  // 4 Packaging Slots clicks
  document.querySelectorAll('.packaging-grid-selector .grid-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      const slotNum = parseInt(slot.getAttribute('data-slot')) - 1;
      packagingSlots[slotNum] = !packagingSlots[slotNum];
      slot.classList.toggle('occupied', packagingSlots[slotNum]);
      slot.querySelector('.slot-status').textContent = packagingSlots[slotNum] ? 'Printed' : 'Empty (No Print)';
      if (elements.printPreviewMode && elements.printPreviewMode.value === 'packaging') updatePrintPreview();
    });
  });

  if (elements.fillAllSlots) {
    elements.fillAllSlots.addEventListener('click', () => {
      packagingSlots = [true, true, true, true];
      document.querySelectorAll('.packaging-grid-selector .grid-slot').forEach(slot => {
        slot.classList.add('occupied');
        slot.querySelector('.slot-status').textContent = 'Printed';
      });
      if (elements.printPreviewMode && elements.printPreviewMode.value === 'packaging') updatePrintPreview();
    });
  }

  if (elements.clearAllSlots) {
    elements.clearAllSlots.addEventListener('click', () => {
      packagingSlots = [false, false, false, false];
      document.querySelectorAll('.packaging-grid-selector .grid-slot').forEach(slot => {
        slot.classList.remove('occupied');
        slot.querySelector('.slot-status').textContent = 'Empty (No Print)';
      });
      if (elements.printPreviewMode && elements.printPreviewMode.value === 'packaging') updatePrintPreview();
    });
  }
}

/* ==========================================================================
   HTML/CSS Custom template designer
   ========================================================================== */
function populateTemplatesDropdown() {
  const populate = (dropdown) => {
    if (dropdown) {
      dropdown.innerHTML = '';
      Object.keys(templates).forEach(key => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = templates[key].name || key;
        dropdown.appendChild(opt);
      });
    }
  };
  populate(elements.templateEditSelect);
  populate(elements.cardTemplateSelect);
}

function loadTemplateEditorContent(key) {
  const t = templates[key];
  if (t) {
    if (elements.templateDisplayName) elements.templateDisplayName.value = t.name || key;
    if (elements.templateFrontHtml) elements.templateFrontHtml.value = t.html_front || '';
    if (elements.templateBackHtml) elements.templateBackHtml.value = t.html_back || '';
  }
}

function setupTemplatesEvents() {
  if (elements.templateEditSelect) {
    elements.templateEditSelect.addEventListener('change', (e) => {
      loadTemplateEditorContent(e.target.value);
    });
  }

  if (elements.saveTemplateBtn) {
    elements.saveTemplateBtn.addEventListener('click', async () => {
      const key = elements.templateEditSelect.value;
      if (!templates[key]) return;
      
      templates[key].name = elements.templateDisplayName.value;
      templates[key].html_front = elements.templateFrontHtml.value;
      templates[key].html_back = elements.templateBackHtml.value;
      
      try {
        const res = await fetch("/api/templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(templates)
        });
        const data = await res.json();
        if (data.success) {
          alert("Custom template saved successfully!");
          updateDigitalPreview();
        }
      } catch (err) {
        alert("Error saving: " + err);
      }
    });
  }

  if (elements.resetTemplateBtn) {
    elements.resetTemplateBtn.addEventListener('click', async () => {
      if (confirm("Reset card templates to factory defaults?")) {
        const res = await fetch("/api/templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {} 
        });
        if (res.ok) {
          location.reload();
        }
      }
    });
  }
}

/* ==========================================================================
   Anki Navigation Controls
   ========================================================================== */
function setupAnkiNavigation() {
  if (elements.ankiFlipBtn) elements.ankiFlipBtn.addEventListener('click', flipAnkiCard);
  if (elements.ankiPrevBtn) elements.ankiPrevBtn.addEventListener('click', () => navigateAnki(-1));
  if (elements.ankiNextBtn) elements.ankiNextBtn.addEventListener('click', () => navigateAnki(1));
}

function flipAnkiCard() {
  if (elements.digitalAnkiCard) elements.digitalAnkiCard.classList.toggle('flipped');
}

function navigateAnki(dir) {
  if (deck.cards.length === 0) return;
  let nextIdx = activeCardIndex + dir;
  if (nextIdx < 0) nextIdx = deck.cards.length - 1;
  if (nextIdx >= deck.cards.length) nextIdx = 0;
  
  if (elements.digitalAnkiCard) elements.digitalAnkiCard.classList.remove('flipped');
  setTimeout(() => {
    selectCard(nextIdx);
  }, 100);
}

function getIndexCardObject() {
  const listHtmlFront = [];
  const listHtmlBack = [];
  
  deck.cards.forEach((c, idx) => {
    const title = c.front.title || 'Untitled';
    const li = `<li><span>#${idx+1} ${escapeHtml(title)}</span><span class="dot"></span><span>p. 1</span></li>`;
    if (idx < 17) listHtmlFront.push(li);
    else listHtmlBack.push(li);
  });
  
  return {
    id: 'IDX',
    theme: 'cyan',
    template: 'standard',
    front: { indexHtml: listHtmlFront.join('') },
    back: { indexHtml: listHtmlBack.join('') }
  };
}

function updateDigitalPreview() {
  if (!elements.digitalAnkiCard) return;
  const frontFace = elements.digitalAnkiCard.querySelector('.face-front');
  const backFace = elements.digitalAnkiCard.querySelector('.face-back');
  if (!frontFace || !backFace) return;

  if (activeCardIndex === -1 || deck.cards.length === 0) {
    frontFace.innerHTML = '<div class="card-frame flex-center">No Cards</div>';
    backFace.innerHTML = '<div class="card-frame flex-center">No Cards</div>';
    return;
  }
  
  if (activeCardIndex === -2) {
    const idxCard = getIndexCardObject();
    
    frontFace.style.setProperty('--theme-color', '#06b6d4');
    frontFace.style.setProperty('--theme-color-rgb', '6, 182, 212');
    backFace.style.setProperty('--theme-color', '#06b6d4');
    backFace.style.setProperty('--theme-color-rgb', '6, 182, 212');

    frontFace.innerHTML = createSinglePrintCard(idxCard, 'front').innerHTML;
    backFace.innerHTML = createSinglePrintCard(idxCard, 'back').innerHTML;
    return;
  }
  
  const card = deck.cards[activeCardIndex];
  const accentColor = getThemePrimaryColor(card.theme);
  const accentColorRgb = getThemeRgb(card.theme);
  
  frontFace.style.setProperty('--theme-color', accentColor);
  frontFace.style.setProperty('--theme-color-rgb', accentColorRgb);
  backFace.style.setProperty('--theme-color', accentColor);
  backFace.style.setProperty('--theme-color-rgb', accentColorRgb);

  frontFace.innerHTML = compileCardHtml(card, 'front');
  backFace.innerHTML = compileCardHtml(card, 'back');
}

/* ==========================================================================
   A3 Print Preview Rendering Page
   ========================================================================== */
if (elements.printPreviewMode) {
  elements.printPreviewMode.addEventListener('change', updatePrintPreview);
}

function updatePrintPreview() {
  if (!elements.printPreviewMode || !elements.scaledPrintArea) return;
  const viewMode = elements.printPreviewMode.value;
  elements.scaledPrintArea.innerHTML = '';
  
  const printCards = getPrintReadyCards();
  
  if (viewMode === 'cards') {
    const totalSheets = Math.ceil(printCards.length / 18);
    if (elements.estSheetCost) elements.estSheetCost.textContent = `Est. Cost: ₹${(totalSheets * 38).toFixed(2)} (${totalSheets} A3 Duplex)`;
    
    for (let i = 0; i < printCards.length; i += 18) {
      const pageCards = printCards.slice(i, i + 18);
      while (pageCards.length < 18) pageCards.push(null);
      
      const frontsPage = createScaledPage(`SHEET ${Math.floor(i/18) + 1} (FRONTS)`);
      const frontsGrid = frontsPage.querySelector('.print-grid');
      pageCards.forEach(c => {
        frontsGrid.appendChild(createSinglePrintCard(c, 'front'));
      });
      elements.scaledPrintArea.appendChild(frontsPage);
      
      if (deck.printMode === "duplex") {
        const backsPage = createScaledPage(`SHEET ${Math.floor(i/18) + 1} (BACKS)`);
        backsPage.classList.add('back-page');
        const backsGrid = backsPage.querySelector('.print-grid');
        
        const mirroredCards = [];
        for (let r = 0; r < 3; r++) {
          const rowCards = pageCards.slice(r * 6, (r + 1) * 6);
          rowCards.reverse();
          mirroredCards.push(...rowCards);
        }
        
        mirroredCards.forEach(c => {
          backsGrid.appendChild(createSinglePrintCard(c, 'back'));
        });
        elements.scaledPrintArea.appendChild(backsPage);
      }
    }
  } else {
    const activeSlots = packagingSlots.filter(s => s).length;
    if (elements.estSheetCost) elements.estSheetCost.textContent = `Est. Cost: ₹19.00 (${activeSlots}/4 slot usage)`;
    
    const page = createScaledPage("A3 PACKAGING MASTER (SINGLE-SIDED)");
    const grid = document.createElement('div');
    grid.className = 'print-packaging-grid';
    
    packagingSlots.forEach(slot => {
      const slotEl = document.createElement('div');
      slotEl.className = 'packaging-slot-wrapper';
      if (slot) {
        slotEl.appendChild(createTuckBoxNetHtml());
      } else {
        slotEl.className += ' empty';
      }
      grid.appendChild(slotEl);
    });
    
    page.appendChild(grid);
    elements.scaledPrintArea.appendChild(page);
  }
  
  scalePreviews();
  
  if (window.renderMathInElement) {
    window.renderMathInElement(elements.scaledPrintArea, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
}

function scalePreviews() {
  const scrollContainer = document.querySelector('.scaled-print-view-scroll');
  if (!scrollContainer || !elements.scaledPrintArea) return;
  const panelWidth = scrollContainer.clientWidth - 30;
  const scale = panelWidth / 1588;
  elements.scaledPrintArea.style.transform = `scale(${Math.min(1, scale)})`;
}
window.addEventListener('resize', scalePreviews);

function createScaledPage(headerTitle) {
  const page = document.createElement('div');
  page.className = 'scaled-print-page';
  page.innerHTML = `
    <div class="print-page-header">${headerTitle}</div>
    <div class="print-grid"></div>
    <div class="print-page-footer">yaad card — print, cut, fold, and pack</div>
  `;
  return page;
}

function createSinglePrintCard(card, side) {
  const wrapper = document.createElement('div');
  wrapper.className = 'print-card-wrapper';
  
  if (!card) {
    wrapper.style.border = 'none';
    return wrapper;
  }
  
  const accentColor = getThemePrimaryColor(card.theme);
  const accentColorRgb = getThemeRgb(card.theme);
  wrapper.style.setProperty('--theme-color', accentColor);
  wrapper.style.setProperty('--theme-color-rgb', accentColorRgb);
  
  if (card.id === 'IDX') {
    const title = side === 'front' ? 'DECK INDEX • PART 1' : 'DECK INDEX • PART 2';
    const listHtml = side === 'front' ? card.front.indexHtml : card.back.indexHtml;
    wrapper.innerHTML = `
      <div class="card-frame" style="justify-content: flex-start; align-items: stretch; padding: 10px;">
        <div class="index-card-header">${title}</div>
        <ul class="index-card-list">
          ${listHtml}
        </ul>
        <div class="card-front-watermark">${deck.website || 'yaad card'}</div>
      </div>
    `;
  } else {
    wrapper.innerHTML = compileCardHtml(card, side);
  }
  
  setTimeout(() => {
    if (window.renderMathInElement) {
      window.renderMathInElement(wrapper, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }, 10);
  
  return wrapper;
}

/* ==========================================================================
   Deck Compilation with Index Card
   ========================================================================== */
function getPrintReadyCards() {
  const list = [...deck.cards];
  if (deck.indexCard && list.length > 0) {
    const listHtmlFront = [];
    const listHtmlBack = [];
    
    list.forEach((c, idx) => {
      const title = c.front.title || 'Untitled';
      const li = `<li><span>#${idx+1} ${escapeHtml(title)}</span><span class="dot"></span><span>p. 1</span></li>`;
      if (idx < 17) listHtmlFront.push(li);
      else listHtmlBack.push(li);
    });
    
    const indexCardObj = {
      id: 'IDX',
      theme: 'cyan',
      template: 'standard',
      front: { indexHtml: listHtmlFront.join('') },
      back: { indexHtml: listHtmlBack.join('') }
    };
    list.unshift(indexCardObj);
  }
  return list;
}

/* ==========================================================================
   Tuck Box Net Builder
   ========================================================================== */
function createTuckBoxNetHtml() {
  const p = deck.packaging;
  const c = p.stripeColors || ["#06b6d4", "#f97316", "#a855f7", "#10b981", "#eab308"];
  
  const container = document.createElement('div');
  container.className = 'tuck-box-container';
  
  let coverOverlay = '';
  if (p.coverImage) {
    coverOverlay = `<div class="tuck-custom-cover-image" style="background-image: none !important; overflow: hidden;"><img src="${p.coverImage}" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`;
  }
  
  const frontClass = p.fullBleed ? "tuck-panel tuck-front full-bleed" : "tuck-panel tuck-front";

  container.innerHTML = `
    <div class="tuck-box-net">
      
      <!-- Dust Flaps and Flaps -->
      <div class="tuck-dust-flap tuck-dust-flap-top-left"></div>
      <div class="tuck-dust-flap tuck-dust-flap-top-right"></div>
      <div class="tuck-dust-flap tuck-dust-flap-bottom-left"></div>
      <div class="tuck-dust-flap tuck-dust-flap-bottom-right"></div>
      
      ${p.coverImageTop 
        ? `<div class="tuck-top-flap" style="padding:0; border:none; overflow:hidden;"><img src="${p.coverImageTop}" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`
        : `<div class="tuck-top-flap">
             <div class="tuck-logo">${escapeHtml(p.brand || 'yaad card')}</div>
             <div class="tuck-badge">OPEN</div>
           </div>`
      }
      
      ${p.coverImageBottom 
        ? `<div class="tuck-bottom-flap" style="padding:0; border:none; overflow:hidden;"><img src="${p.coverImageBottom}" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`
        : `<div class="tuck-bottom-flap">
             <div class="tuck-logo">${escapeHtml(p.brand || 'yaad card')}</div>
             <div class="tuck-badge">CLOSE</div>
           </div>`
      }
      
      <!-- Side Panels and Glue Tab -->
      ${p.coverImageLeft 
        ? `<div class="tuck-panel tuck-left-side" style="padding:0; border:none; overflow:hidden;"><img src="${p.coverImageLeft}" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`
        : `<div class="tuck-panel tuck-left-side">
             <span class="tuck-side-text" style="transform: rotate(180deg);">${escapeHtml(p.title || '')} — ${escapeHtml(p.subtitle || '')}</span>
           </div>`
      }
      
      ${p.coverImageRight 
        ? `<div class="tuck-panel tuck-right-side" style="padding:0; border:none; overflow:hidden;"><img src="${p.coverImageRight}" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`
        : `<div class="tuck-panel tuck-right-side">
             <span class="tuck-side-text">${escapeHtml(p.title || '')} — ${escapeHtml(p.subtitle || '')}</span>
           </div>`
      }
      
      <div class="tuck-glue-tab"></div>
      
      <!-- Front Panel -->
      <div class="${frontClass}">
        <div class="card-frame" style="border: 2px solid #000000; padding:12px; justify-content:center; align-items:center;">
          ${coverOverlay}
          
          <div class="tuck-color-stripe" style="display: ${p.coverImage ? 'none' : 'flex'};">
            <span class="stripe-bar" style="background-color: ${c[0]};"></span>
            <span class="stripe-bar" style="background-color: ${c[1]};"></span>
            <span class="stripe-bar" style="background-color: ${c[2]};"></span>
            <span class="stripe-bar" style="background-color: ${c[3]};"></span>
            <span class="stripe-bar" style="background-color: ${c[4]};"></span>
          </div>
          
          <div class="tuck-logo" style="margin-top: 15px; display: ${p.coverImage ? 'none' : 'block'};">${escapeHtml(p.brand || 'yaad card')}</div>
          <div class="tuck-subtitle" style="display: ${p.coverImage ? 'none' : 'block'};">${escapeHtml(p.subtitle || 'DAILY')}</div>
          
          <div class="tuck-card-icon" style="display: ${p.coverImage ? 'none' : 'block'};">
            <span class="tuck-icon-shape card-1" style="border-color: ${c[0]};"></span>
            <span class="tuck-icon-shape card-2" style="border-color: ${c[2]};"></span>
          </div>
          
          <div class="tuck-subject-title" style="display: ${p.coverImage ? 'none' : 'block'};">${escapeHtml(p.title || 'FLASHCARDS')}</div>
          <div class="tuck-badge" style="margin-top: auto; display: ${p.coverImage ? 'none' : 'inline-block'};">₹ ${escapeHtml(p.mrp || '250')} MRP</div>
        </div>
      </div>
      
      <!-- Back Panel -->
      ${p.coverImageBack 
        ? `<div class="tuck-panel tuck-back" style="padding:0; border:none; overflow:hidden;"><img src="${p.coverImageBack}" style="width:100%; height:100%; object-fit:cover; display:block;"></div>`
        : `<div class="tuck-panel tuck-back">
             <div class="tuck-back-inset"></div>
             <div class="tuck-back-header">${escapeHtml(p.title || 'DETAILS')}</div>
             <p class="tuck-back-paragraph">${escapeHtml(p.description || '')}</p>
             
             <div class="tuck-back-details">
               <strong>MRP:</strong> ₹${escapeHtml(p.mrp || '250')} (incl. taxes)<br>
               <strong>Count:</strong> ${deck.cards.length} Cards<br>
               <strong>Format:</strong> A3 Landscape sheet cuts
             </div>
             
             <div class="tuck-back-footer">
               <div class="tuck-legal-info">
                 ${escapeHtml(p.footnote || 'Premium learning aids.')}<br>
                 <strong>Web:</strong> ${escapeHtml(p.website || 'yaadcard.web.app')}
               </div>
               <div class="tuck-barcode">
                 <svg width="45" height="22" viewBox="0 0 45 22">
                   <rect x="0" y="0" width="2" height="20" fill="#000"/><rect x="3" y="0" width="1" height="20" fill="#000"/>
                   <rect x="6" y="0" width="3" height="20" fill="#000"/><rect x="11" y="0" width="1" height="20" fill="#000"/>
                   <rect x="13" y="0" width="2" height="20" fill="#000"/><rect x="17" y="0" width="1" height="20" fill="#000"/>
                   <rect x="19" y="0" width="3" height="20" fill="#000"/><rect x="24" y="0" width="2" height="20" fill="#000"/>
                   <rect x="27" y="0" width="1" height="20" fill="#000"/><rect x="30" y="0" width="3" height="20" fill="#000"/>
                   <rect x="34" y="0" width="1" height="20" fill="#000"/><rect x="37" y="0" width="2" height="20" fill="#000"/>
                   <rect x="40" y="0" width="3" height="20" fill="#000"/>
                 </svg>
                 <span>YAADCARD</span>
               </div>
             </div>
           </div>`
      }
      
    </div>
  `;
  
  return container;
}

/* ==========================================================================
   Executing Print Actions
   ========================================================================== */
function printCardsDeck() {
  if (!elements.printArea) return;
  elements.printArea.innerHTML = '';
  const printCards = getPrintReadyCards();
  
  if (printCards.length === 0) {
    alert("Add some cards first!");
    return;
  }
  
  for (let i = 0; i < printCards.length; i += 18) {
    const pageCards = printCards.slice(i, i + 18);
    while (pageCards.length < 18) pageCards.push(null);
    
    // Fronts page
    const frontsPage = document.createElement('div');
    frontsPage.className = 'print-page';
    frontsPage.innerHTML = `
      <div class="print-page-header">${deck.name.toUpperCase()} — SHEET ${Math.floor(i/18) + 1} (FRONTS)</div>
      <div class="print-grid"></div>
      <div class="print-page-footer">yaad card — learn faster, remember longer</div>
    `;
    
    const frontsGrid = frontsPage.querySelector('.print-grid');
    pageCards.forEach(c => {
      frontsGrid.appendChild(createSinglePrintCard(c, 'front'));
    });
    elements.printArea.appendChild(frontsPage);
    
    // Backs page (mirrored)
    if (deck.printMode === "duplex") {
      const backsPage = document.createElement('div');
      backsPage.className = 'print-page';
      backsPage.innerHTML = `
        <div class="print-page-header">${deck.name.toUpperCase()} — SHEET ${Math.floor(i/18) + 1} (BACKS)</div>
        <div class="print-grid"></div>
        <div class="print-page-footer">yaad card — learn faster, remember longer</div>
      `;
      
      const backsGrid = backsPage.querySelector('.print-grid');
      const mirroredCards = [];
      for (let r = 0; r < 3; r++) {
        const rowCards = pageCards.slice(r * 6, (r + 1) * 6);
        rowCards.reverse();
        mirroredCards.push(...rowCards);
      }
      
      mirroredCards.forEach(c => {
        backsGrid.appendChild(createSinglePrintCard(c, 'back'));
      });
      elements.printArea.appendChild(backsPage);
    }
  }
  if (window.renderMathInElement) {
    window.renderMathInElement(elements.printArea, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
  
  window.print();
}

function printPackagingSheets() {
  if (!elements.printArea) return;
  elements.printArea.innerHTML = '';
  
  const page = document.createElement('div');
  page.className = 'print-page';
  page.innerHTML = `
    <div class="print-page-header">A3 PACKAGING MASTER (4-UP SINGLE-SIDED)</div>
    <div class="print-packaging-grid"></div>
    <div class="print-page-footer">yaad card packaging system — print, cut, fold, and glue</div>
  `;
  
  const grid = page.querySelector('.print-packaging-grid');
  packagingSlots.forEach(slot => {
    const slotEl = document.createElement('div');
    slotEl.className = 'packaging-slot-wrapper';
    if (slot) {
      slotEl.appendChild(createTuckBoxNetHtml());
    } else {
      slotEl.className += ' empty';
    }
    grid.appendChild(slotEl);
  });
  
  elements.printArea.appendChild(page);
  window.print();
}

/* ==========================================================================
   Colors / Utilities
   ========================================================================== */
function getThemePrimaryColor(theme) {
  if (!theme) return '#06b6d4';
  if (theme.startsWith('#')) return theme;
  const colors = {
    cyan: '#06b6d4',
    orange: '#f97316',
    purple: '#a855f7',
    emerald: '#10b981',
    gold: '#eab308'
  };
  return colors[theme] || '#06b6d4';
}

function getThemeRgb(theme) {
  if (!theme) return '6, 182, 212';
  if (theme.startsWith('#')) {
    const hex = theme.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  const rgbs = {
    cyan: '6, 182, 212',
    orange: '249, 115, 22',
    purple: '168, 85, 247',
    emerald: '16, 185, 129',
    gold: '234, 179, 8'
  };
  return rgbs[theme] || '6, 182, 212';
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
